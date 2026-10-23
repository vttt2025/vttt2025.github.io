-- ======================================================================
-- SEED DATA: 10 CHỦ ĐỀ & 333 TỪ VỰNG TIẾNG NGA
-- ======================================================================

-- 1. CHÈN BẢNG CHỦ ĐỀ (VOCAB_JARS)
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'Nghề nghiệp', 'nghe_nghiep', 'A1', '💼', 'Từ vựng các ngành nghề, chức vụ, nơi làm việc, các hành động nghiệp vụ và mẫu câu giao tiếp.', true,
  '["Chủ đề nghề nghiệp"]'::jsonb, 26, '[{"vocab_id": "41810eb5-1ce2-4741-b9de-44b0440858c9", "ru": "студе́нт — студе́нтка", "stress": "студе́нт — студе́нтка", "vi": "sinh viên nam - sinh viên nữ", "pos": "Noun", "gender": "m/f", "sub_topic": "Nghề nghiệp", "note": "sinh viên nam - sinh viên nữ | Làm việc: ở trường đại học/ học viện | Hành động: học", "ex": "Студе́нт у́чится в университе́те. (Sinh viên đang học ở trường đại học.)"}, {"vocab_id": "0dc52773-0010-47e8-af9e-e50f8a9e1dbe", "ru": "преподава́тель — преподава́тельница", "stress": "преподава́тель — преподава́тельница", "vi": "giảng viên nam - giảng viên nữ", "pos": "Noun", "gender": "f", "sub_topic": "Nghề nghiệp", "note": "giảng viên nam - giảng viên nữ | Làm việc: ở trường đại học/ học viện | Hành động: dạy học", "ex": "Преподава́тель преподаёт ру́сский язы́к в университе́те. (Giảng viên đang dạy tiếng Nga ở trường đại học.)"}, {"vocab_id": "8d56cc41-7c7b-49eb-ae02-3f358baa0355", "ru": "шко́льник — шко́льница", "stress": "шко́льник — шко́льница", "vi": "học sinh nam - học sinh nữ", "pos": "Noun", "gender": "f", "sub_topic": "Nghề nghiệp", "note": "học sinh nam - học sinh nữ | Làm việc: ở trường học | Hành động: học", "ex": "Шко́льница у́чится в шко́ле. (Học sinh đang học ở trường học.)"}, {"vocab_id": "fa7eff8d-507b-4b7d-b00e-5cfa08441c98", "ru": "учи́тель — учи́тельница", "stress": "учи́тель — учи́тельница", "vi": "thầy giáo - cô giáo", "pos": "Noun", "gender": "f", "sub_topic": "Nghề nghiệp", "note": "thầy giáo - cô giáo | Làm việc: ở trường học | Hành động: dạy học", "ex": "Учи́тель преподаёт в шко́ле. (Giáo viên đang dạy học ở trường học.)"}, {"vocab_id": "32d14f2e-157d-45e8-ba8b-45a85677a6f9", "ru": "инжене́р", "stress": "инжене́р", "vi": "kỹ sư", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "kỹ sư | Làm việc: ở nhà máy | Hành động: sửa chữa máy móc", "ex": "Инжене́р ремонти́рует маши́ну на заво́де. (Kỹ sư đang sửa chữa máy móc ở nhà máy.)"}, {"vocab_id": "9924deef-b4b4-4b77-9d0d-b9b2a879205b", "ru": "хи́мик", "stress": "хи́мик", "vi": "nhà hóa học", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhà hóa học | Làm việc: ở phòng thí nghiệm | Hành động: nghiên cứu hóa học", "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии. (Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.)"}, {"vocab_id": "1ed8f1da-2b99-4473-9a63-fb2922c31984", "ru": "био́лог", "stress": "био́лог", "vi": "nhà sinh vật học", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhà sinh vật học | Làm việc: ở phòng thí nghiệm | Hành động: nghiên cứu thực vật", "ex": "Био́лог изуча́ет расте́ния в лаборато́рии. (Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.)"}, {"vocab_id": "9c6dddb6-5afd-4296-9d22-ccb5368328a5", "ru": "программи́ст", "stress": "программи́ст", "vi": "lập trình viên", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "lập trình viên | Làm việc: ở văn phòng - trên máy tính | Hành động: lập trình", "ex": "Программи́ст программи́рует на компью́тере в о́фисе. (Lập trình viên đang lập trình trên máy tính ở cơ quan.)"}, {"vocab_id": "2c5e2b10-4f49-442c-b825-3b2c9708d49c", "ru": "архите́ктор", "stress": "архите́ктор", "vi": "kiến trúc sư", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "kiến trúc sư | Làm việc: ở văn phòng | Hành động: thiết kế tòa nhà", "ex": "Архите́ктор проекти́рует зда́ния в о́фисе. (Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.)"}, {"vocab_id": "cd1f8fde-8797-4a78-a88f-8e796c6c592c", "ru": "экономи́ст", "stress": "экономи́ст", "vi": "nhà kinh tế học/chuyên viên kinh tế", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhà kinh tế học/chuyên viên kinh tế | Làm việc: ở văn phòng | Hành động: thu thập và phân tích dữ liệu", "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе. (Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.)"}, {"vocab_id": "779d292c-6ba8-49f7-b103-3ec900882fb8", "ru": "врач", "stress": "врач", "vi": "bác sĩ", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "bác sĩ | Làm việc: ở bệnh viện/ phòng khám | Hành động: - khám bệnh - chữa bệnh", "ex": "Врач осма́тривает и лечи́т пациéнтов в больни́це. (Bác sĩ đáng khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.)"}, {"vocab_id": "3f670ced-6e08-4154-b662-d81b7b7b896d", "ru": "фе́рмер", "stress": "фе́рмер", "vi": "nông dân", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nông dân | Làm việc: ở trang trại | Hành động: - trông rau - chăn nuôi gia súc", "ex": "Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме. (Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.)"}, {"vocab_id": "21fdb6a0-b3f3-42f1-afc6-df87268ec049", "ru": "домохозя́йка", "stress": "домохозя́йка", "vi": "nội trợ", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nội trợ | Làm việc: ở nhà | Hành động: - nấu ăn - dọn dẹp nhà cửa", "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом. (Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.)"}, {"vocab_id": "af769b0a-fd8c-4bb6-8b87-6be375487a0a", "ru": "дире́ктор", "stress": "дире́ктор", "vi": "giám đốc/ hiệu trưởng", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "giám đốc/ hiệu trưởng | Làm việc: ở công ty; ở trường học; ở đại học; ở học viện | Hành động: lãnh đạo", "ex": "Дире́ктор руководи́т рабо́той в фирме. (Giám đốc đang lãnh đạo công việc ở công ty.)"}, {"vocab_id": "eb11201f-2848-4a29-8507-99d9fc6309f9", "ru": "юри́ст", "stress": "юри́ст", "vi": "luật sư", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "luật sư | Làm việc: ở công ty/ văn phòng luật | Hành động: tư vấn khách hàng", "ex": "Юри́ст консульти́рует клие́нта в юриди́ческой фирме. (Luật sư đang tư vấn cho khách hàng ở công ty luật.)"}, {"vocab_id": "c60b9a5d-283e-4504-892d-8a9f47967919", "ru": "бизнесме́н", "stress": "бизнесме́н", "vi": "doanh nhân", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "doanh nhân | Làm việc: ở công ty | Hành động: gặp gỡ đối tác", "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме. (Người doanh nhân đang gặp gỡ đối tác ở công ty.)"}, {"vocab_id": "69a376a1-3081-49fd-b415-2dc470e1b7f7", "ru": "служа́щий", "stress": "служа́щий", "vi": "nhân viên/ công chức", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhân viên/ công chức | Làm việc: ở văn phòng/ cơ quan | Hành động: làm việc với giấy tờ", "ex": "Служа́щий рабо́тает с документа́ми в о́фисе. (Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.)"}, {"vocab_id": "be57a924-f719-44a1-8f71-46467d51f99c", "ru": "продаве́ц", "stress": "продаве́ц", "vi": "người bán hàng nam", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "người bán hàng nam | Làm việc: ở cửa hàng | Hành động: bán hàng", "ex": "Продаве́ц продаёт това́ры в магази́не. (Người bán hàng đang bán hàng hóa ở cửa hàng.)"}, {"vocab_id": "0cf79cd7-d236-4040-a744-76acdd7912d0", "ru": "журнали́ст — журнали́стка", "stress": "журнали́ст — журнали́стка", "vi": "nhà báo nam - nhà báo nữ", "pos": "Noun", "gender": "m/f", "sub_topic": "Nghề nghiệp", "note": "nhà báo nam - nhà báo nữ | Làm việc: ở tòa soạn | Hành động: viết báo", "ex": "Журнали́ст пи́шет ста́тьи в редаќции. (Nhà báo đang viết báo ở tòa soạn.)"}, {"vocab_id": "0226867d-f80f-404b-8509-0e793bfcafd9", "ru": "поэ́т", "stress": "поэ́т", "vi": "nhà thơ", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhà thơ | Làm việc: ở nhà | Hành động: viết thơ", "ex": "Поэ́т пи́шет стихи́ до́ма. (Nhà thơ đang viết thơ ở nhà.)"}, {"vocab_id": "6441694c-c2db-4650-9daa-bba1fc810422", "ru": "худо́жник — худо́жница", "stress": "худо́жник — худо́жница", "vi": "họa sĩ nam - họa sĩ nữ", "pos": "Noun", "gender": "f", "sub_topic": "Nghề nghiệp", "note": "họa sĩ nam - họa sĩ nữ | Làm việc: ở xưởng vẽ | Hành động: vẽ tranh", "ex": "Худо́жница рису́ет карти́ны в мастерско́й. (Họa sĩ đang vẽ tranh ở xưởng vẽ.)"}, {"vocab_id": "9b40d429-be05-4476-9c30-eda27ffc9cb5", "ru": "арти́ст — арти́стка", "stress": "арти́ст — арти́стка", "vi": "nghệ sĩ nam - nghệ sĩ nữ", "pos": "Noun", "gender": "m/f", "sub_topic": "Nghề nghiệp", "note": "nghệ sĩ nam - nghệ sĩ nữ | Làm việc: ở nhà hát/ trên buổi hòa nhà (concert) | Hành động: biểu diễn", "ex": "Арти́ст выступа́ет в теа́тре. (Người nghệ sĩ đang biểu diễn ở nhà hát.)"}, {"vocab_id": "3ded112d-2585-4f39-b124-83a14bb52470", "ru": "переводчи́к — переводчи́ца", "stress": "переводчи́к — переводчи́ца", "vi": "phiên dịch viên nam - phiên dịch viên nữ", "pos": "Noun", "gender": "m/f", "sub_topic": "Nghề nghiệp", "note": "phiên dịch viên nam - phiên dịch viên nữ | Làm việc: ở văn phòng dịch thuật | Hành động: dịch văn bản", "ex": "Переводчи́к перево́дит те́ксты в бюро́ перево́дов. (Phiên dịch viên đang dịch các văn bản ở văn phòng dịch thuật.)"}, {"vocab_id": "9f32398b-b503-4032-b8a9-24ab0d294367", "ru": "моделье́р", "stress": "моделье́р", "vi": "nhà thiết kế thời trang", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhà thiết kế thời trang | Làm việc: ở xưởng may/ nhà may | Hành động: thiết kế quần áo", "ex": "Моделье́р создаёт моде́ли оде́жды в ателье́. (Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.)"}, {"vocab_id": "b7b5bad1-3602-4018-b556-beaa94d924f2", "ru": "музыка́нт", "stress": "музыка́нт", "vi": "nhạc sĩ/ nhạc công", "pos": "Noun", "gender": "m", "sub_topic": "Nghề nghiệp", "note": "nhạc sĩ/ nhạc công | Làm việc: ở nhà hát/ trên buổi hòa nhà (concert) | Hành động: chơi nhạc cụ", "ex": "Музыка́нт игра́ет на пиа́нино на конце́рте. (Nhạc công đang chơi nhạc cụ trên buổi concert.)"}, {"vocab_id": "68b71bec-0642-45bb-9fba-0a7d088ddcba", "ru": "спортсме́н — спортсме́нка", "stress": "спортсме́н — спортсме́нка", "vi": "vận động viên nam - vận động viên nữ", "pos": "Noun", "gender": "m/f", "sub_topic": "Nghề nghiệp", "note": "vận động viên nam - vận động viên nữ | Làm việc: ở phòng tập thể thao | Hành động: luyện tập", "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле. (Vận động viên đang luyện tập thể thao ở phòng tập thể thao.)"}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'Quần áo, giày dép', 'quan_ao', 'A1', '👗', 'Trang phục theo mùa nóng/lạnh, các động từ mặc/tháo/chăm sóc quần áo và chuỗi hành động mua sắm.', true,
  '["Học theo thời tiết", "Học theo hành động liên tiếp nhau"]'::jsonb, 32, '[{"vocab_id": "59d79ff6-d489-49e7-9f28-9bc2e3103a16", "ru": "Пальто́", "stress": "Пальто́", "vi": "Áo măng tô", "pos": "Noun", "gender": "n", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Áo măng tô (Trang phục mùa lạnh)", "ex": "- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку. - Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф. (- Khi trời lạnh, tôi thường mặc áo len, quần dài với áo khoác - Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn.)"}, {"vocab_id": "17f41b25-a137-4796-8394-93e46eef8015", "ru": "Ку́ртка", "stress": "Ку́ртка", "vi": "Áo khoác", "pos": "Noun", "gender": "f", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Áo khoác (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ куртка. (Khi trời lạnh, tôi thường mặc/mang áo khoác.)"}, {"vocab_id": "5eee991c-cfe1-4a44-af50-f675e7e1f014", "ru": "Сви́тер", "stress": "Сви́тер", "vi": "Áo len chui đầu", "pos": "Noun", "gender": "m", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Áo len chui đầu (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ свитер. (Khi trời lạnh, tôi thường mặc/mang áo len chui đầu.)"}, {"vocab_id": "06eca6da-5e32-48ad-b215-639e516577be", "ru": "Брю́ки", "stress": "Брю́ки", "vi": "Quần dài", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Quần dài (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ брюки. (Khi trời lạnh, tôi thường mặc/mang quần dài.)"}, {"vocab_id": "4e07d999-120a-4fc0-9fa1-5bbd48a85f13", "ru": "Ша́пка", "stress": "Ша́пка", "vi": "Mũ len", "pos": "Noun", "gender": "f", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Mũ len (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ шапка. (Khi trời lạnh, tôi thường mặc/mang mũ len.)"}, {"vocab_id": "eeb82b18-0a8d-4b75-92af-c5b068d75a96", "ru": "Шарф", "stress": "Шарф", "vi": "Khăn quàng", "pos": "Noun", "gender": "m", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Khăn quàng (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ шарф. (Khi trời lạnh, tôi thường mặc/mang khăn quàng.)"}, {"vocab_id": "8874f4ab-09ae-4afb-aa18-cafa21dccb22", "ru": "Перча́тки", "stress": "Перча́тки", "vi": "Găng tay", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Găng tay (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ перчатки. (Khi trời lạnh, tôi thường mặc/mang găng tay.)"}, {"vocab_id": "c13064e9-02c1-430c-8e48-8ddd997f509e", "ru": "Носки́", "stress": "Носки́", "vi": "Tất", "pos": "Noun", "gender": "m", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Tất (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ носки. (Khi trời lạnh, tôi thường mặc/mang tất.)"}, {"vocab_id": "9edc890b-5fb5-430e-9ebd-27a994c10a86", "ru": "Боти́нки", "stress": "Боти́нки", "vi": "Giày bốt thấp cổ", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Giày bốt thấp cổ (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ ботинки. (Khi trời lạnh, tôi thường mặc/mang giày bốt thấp cổ.)"}, {"vocab_id": "85f1eb06-62fb-4dab-aae3-798984e3c509", "ru": "Сапоги́", "stress": "Сапоги́", "vi": "Giày bốt cao cổ", "pos": "Noun", "gender": "m", "sub_topic": "Học theo thời tiết (Trời lạnh)", "note": "Giày bốt cao cổ (Trang phục mùa lạnh)", "ex": "Когда́ хо́лодно, я обы́чно ношу́ сапоги. (Khi trời lạnh, tôi thường mặc/mang giày bốt cao cổ.)"}, {"vocab_id": "7bbacb95-3810-41ba-b71f-7d4109556216", "ru": "Футбо́лка", "stress": "Футбо́лка", "vi": "Áo phông", "pos": "Noun", "gender": "f", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Áo phông (Trang phục mùa hè/nóng)", "ex": "- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки. - Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии. (- Khi trời nóng, tôi thường mặc áo phông, quần soóc và đeo giày thể thao. - Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dép sandal.)"}, {"vocab_id": "c1500a58-4227-4d84-bda1-b96ec75c2164", "ru": "Шо́рты", "stress": "Шо́рты", "vi": "Quần đùi", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Quần đùi (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ шорты. (Khi trời nóng, tôi thường mặc/mang quần đùi.)"}, {"vocab_id": "a3c9b546-e2c9-45ce-895e-807fc5403cdf", "ru": "Джи́нсы", "stress": "Джи́нсы", "vi": "Quần jean", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Quần jean (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ джинсы. (Khi trời nóng, tôi thường mặc/mang quần jean.)"}, {"vocab_id": "a25246c6-2695-4137-8068-c3ae15221469", "ru": "Пла́тье", "stress": "Пла́тье", "vi": "Đầm (váy liền)", "pos": "Noun", "gender": "n", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Đầm (váy liền) (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ платье. (Khi trời nóng, tôi thường mặc/mang đầm (váy liền).)"}, {"vocab_id": "b8a4fc28-2a2c-47f0-b61e-36c1fe9dfc13", "ru": "Ю́бка", "stress": "Ю́бка", "vi": "Chân váy", "pos": "Noun", "gender": "f", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Chân váy (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ юбка. (Khi trời nóng, tôi thường mặc/mang chân váy.)"}, {"vocab_id": "8c801d39-1010-4aae-89e5-0306d75586f8", "ru": "Руба́шка", "stress": "Руба́шка", "vi": "Áo sơ mi", "pos": "Noun", "gender": "f", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Áo sơ mi (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ рубашка. (Khi trời nóng, tôi thường mặc/mang áo sơ mi.)"}, {"vocab_id": "aade6046-8116-4c79-900f-bd5eb0787b12", "ru": "Санда́лии", "stress": "Санда́лии", "vi": "Dép sandal", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Dép sandal (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ сандалии. (Khi trời nóng, tôi thường mặc/mang dép sandal.)"}, {"vocab_id": "fba5644c-c68b-4e45-a102-b15a97e1a230", "ru": "Кроссо́вки", "stress": "Кроссо́вки", "vi": "Giày thể thao", "pos": "Noun", "gender": "pl", "sub_topic": "Học theo thời tiết (Trời nóng)", "note": "Giày thể thao (Trang phục mùa hè/nóng)", "ex": "Когда́ жа́рко, я обы́чно ношу́ кроссовки. (Khi trời nóng, tôi thường mặc/mang giày thể thao.)"}, {"vocab_id": "9b54d22f-331f-4752-bfa1-ee80beb385ee", "ru": "гря́зная оде́жда", "stress": "гря́зная оде́жда", "vi": "quần áo bẩn", "pos": "Phrase", "gender": null, "sub_topic": "Giặt giũ & Bảo quản quần áo", "note": "quần áo bẩn (Giặt giũ & Bảo quản quần áo)", "ex": "Э́то гря́зная оде́жда, я постира́ю её в стира́льной маши́не. По́сле стирки́ я сушу́ её на суши́лке для белья́. Когда́ оде́жда вы́сохнет, я сложу́ её и пове́шу на ве́шалки. Затем я уберу́ её в шкаф. (Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.)"}, {"vocab_id": "938aec1f-4bad-42d3-b7f1-4f17da0de633", "ru": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не", "stress": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не", "vi": "giặt bằng máy giặt", "pos": "Verb", "gender": null, "sub_topic": "Giặt giũ & Bảo quản quần áo", "note": "giặt bằng máy giặt (Giặt giũ & Bảo quản quần áo)", "ex": ""}, {"vocab_id": "f88ee476-a9ef-4c64-988c-0bb0773fc278", "ru": "суши́ть (оде́жду) на суши́лке", "stress": "суши́ть (оде́жду) на суши́лке", "vi": "phơi (quần áo) trên giàn phơi đồ", "pos": "Verb", "gender": null, "sub_topic": "Giặt giũ & Bảo quản quần áo", "note": "phơi (quần áo) trên giàn phơi đồ (Giặt giũ & Bảo quản quần áo)", "ex": ""}, {"vocab_id": "c3fbdec0-c301-4943-b680-69c39b28ae3c", "ru": "скла́дывать / сло́жить (оде́жду)", "stress": "скла́дывать / сло́жить (оде́жду)", "vi": "gấp (quần áo)", "pos": "Verb", "gender": null, "sub_topic": "Giặt giũ & Bảo quản quần áo", "note": "gấp (quần áo) (Giặt giũ & Bảo quản quần áo)", "ex": ""}, {"vocab_id": "ccb7274e-d7bb-422a-8983-04272895d40e", "ru": "ве́шать / повéсить (оде́жду) на ве́шалку", "stress": "ве́шать / повéсить (оде́жду) на ве́шалку", "vi": "treo (quần áo) lên móc", "pos": "Verb", "gender": null, "sub_topic": "Giặt giũ & Bảo quản quần áo", "note": "treo (quần áo) lên móc (Giặt giũ & Bảo quản quần áo)", "ex": ""}, {"vocab_id": "d1681e1b-4393-462b-bd21-88a34dc30f9d", "ru": "убира́ть / убра́ть (оде́жду) в шкаф", "stress": "убира́ть / убра́ть (оде́жду) в шкаф", "vi": "cất (quần áo) vào tủ", "pos": "Verb", "gender": null, "sub_topic": "Giặt giũ & Bảo quản quần áo", "note": "cất (quần áo) vào tủ (Giặt giũ & Bảo quản quần áo)", "ex": ""}, {"vocab_id": "d2ade49c-7b9d-4be4-b56e-39ecb20ac06e", "ru": "покупа́ть / купи́ть (оде́жду)", "stress": "покупа́ть / купи́ть (оде́жду)", "vi": "mua (quần áo)", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "mua (quần áo) (Mua sắm quần áo giày dép)", "ex": "Я хочу́ купи́ть оде́жду, поэ́тому я иду́ в магази́н оде́жды. Снача́ла я выбира́ю ве́щи, а зате́м примеря́ю их в приме́рочной. Оде́жда мне о́чень подхо́дит, поэ́тому я иду́ на ка́ссу, что́бы оплати́ть покупку. Я плачу́ продавцу́ ба́нковской ка́ртой. (Tôi muốn mua quần áo. Chính vì vậy, tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi thanh toán cho người bán hàng bằng thẻ.)"}, {"vocab_id": "556643f1-35a4-4a89-a12a-5ce1ed907c9f", "ru": "идти́ / е́хать магази́н оде́жды", "stress": "идти́ / е́хать магази́н оде́жды", "vi": "đi đến cửa hàng quần áo", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "đi đến cửa hàng quần áo (Mua sắm quần áo giày dép)", "ex": ""}, {"vocab_id": "48845698-fe6e-433a-a203-d4a3bc0ba3c2", "ru": "выбира́ть / вы́брать (оде́жду)", "stress": "выбира́ть / вы́брать (оде́жду)", "vi": "chọn (quần áo)", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "chọn (quần áo) (Mua sắm quần áo giày dép)", "ex": ""}, {"vocab_id": "3bb41551-2469-4d6d-aa10-51022a6e1c05", "ru": "примеря́ть / приме́рить (оде́жду) в приме́рочной", "stress": "примеря́ть / приме́рить (оде́жду) в приме́рочной", "vi": "thử (quần áo) trong phòng thay đồ", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "thử (quần áo) trong phòng thay đồ (Mua sắm quần áo giày dép)", "ex": ""}, {"vocab_id": "a2648a7a-aa5a-4447-b480-8d0a161a80bd", "ru": "(оде́жда) подходи́ть / подойти́ мне", "stress": "(оде́жда) подходи́ть / подойти́ мне", "vi": "(quần áo) vừa với tôi", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "(quần áo) vừa với tôi (Mua sắm quần áo giày dép)", "ex": ""}, {"vocab_id": "0a721899-8d64-4080-bfa0-9933c51768c3", "ru": "идти́ на ка́ссу", "stress": "идти́ на ка́ссу", "vi": "thanh toán ở quầy bán hàng", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "thanh toán ở quầy bán hàng (Mua sắm quần áo giày dép)", "ex": ""}, {"vocab_id": "afa8ece1-255c-42b5-b54d-235f928a4ec4", "ru": "плати́ть / заплати́ть продавцу́", "stress": "плати́ть / заплати́ть продавцу́", "vi": "thanh toán cho người bán hàng", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "thanh toán cho người bán hàng (Mua sắm quần áo giày dép)", "ex": ""}, {"vocab_id": "3837e2b5-68f7-469e-9ae4-d35f5bcc7b7d", "ru": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными", "stress": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными", "vi": "thanh toán bằng thẻ/ tiền mặt", "pos": "Verb", "gender": null, "sub_topic": "Mua sắm quần áo giày dép", "note": "thanh toán bằng thẻ/ tiền mặt (Mua sắm quần áo giày dép)", "ex": ""}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'Đồ dùng gia đình', 'do_dung_gia_dinh', 'A1', '🛋️', 'Nội thất, đồ gia dụng trong phòng khách, phòng bếp, phòng ngủ, phòng tắm, phòng giặt kèm thao tác sử dụng.', true,
  '["Trong phòng khách", "Trong phòng bếp", "Trong phòng ngủ", "Trong phòng tắm", "Trong phòng giặt", "Động từ thao tác & công dụng"]'::jsonb, 73, '[{"vocab_id": "28804b07-56ab-4ccc-b88d-a00af99e748d", "ru": "Дива́н", "stress": "Дива́н", "vi": "ghế sopha", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "ghế sopha (Trong phòng khách) | Thao tác: đặt để | Công dụng: ngồi, nằm, ngủ, nghỉ ngơi", "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть на нём и смотре́ть фильм. (Tôi đặt sopha ở phòng khách để ngồi trên nó xem phim)"}, {"vocab_id": "9ed6dab7-81c7-4023-bf54-ed2075dc8b21", "ru": "Стол", "stress": "Стол", "vi": "bàn", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "bàn (Trong phòng khách) | Thao tác: đặt để, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: làm việc, ăn, đặt đồ", "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу. (Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó.)"}, {"vocab_id": "b5fae03c-b72e-49df-b181-d4a730dda85a", "ru": "Ва́за", "stress": "Ва́за", "vi": "bình hoa", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng khách", "note": "bình hoa (Trong phòng khách) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt đứng/đặt nằm, - rửa >< lau khô (loại bỏ nước), - lau chùi (loại bỏ bụi bẩn) | Công dụng: trang trí, cắm hoa", "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́. (Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào nó.)"}, {"vocab_id": "ac21938b-9f9f-444b-b542-2340065023e8", "ru": "Ту́мба", "stress": "Ту́мба", "vi": "tủ/kệ nhỏ có ngăn kéo", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng khách", "note": "tủ/kệ nhỏ có ngăn kéo (Trong phòng khách) | Thao tác: đặt để, lau chùi (loại bỏ bụi bẩn) | Công dụng: cất đồ, đặt đứng/đặt nằm", "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор. (Tôi đặt tủ ở phòng khách để đặt tivi lên nó.)"}, {"vocab_id": "91e3b49d-a18b-4617-96fa-7ad99e294c27", "ru": "Телеви́зор", "stress": "Телеви́зор", "vi": "ti vi", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "ti vi (Trong phòng khách) | Thao tác: - đặt để, - bật >< tắt | Công dụng: xem", "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм. (Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim.)"}, {"vocab_id": "fe96cd3d-a17f-4e83-866b-df69507dbeaa", "ru": "Цвето́чный горшо́к", "stress": "Цвето́чный горшо́к", "vi": "chậu cây", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "chậu cây (Trong phòng khách) | Thao tác: đặt để | Công dụng: trồng hoa, trang trí", "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную. (Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách.)"}, {"vocab_id": "9976af2c-9452-4886-b0b3-58d61832dd7d", "ru": "Ковёр", "stress": "Ковёр", "vi": "thảm", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "thảm (Trong phòng khách) | Thao tác: - lấy ra >< cất vào, - trải ra >< cuộn vào, - giặt >< phơi khô | Công dụng: ngồi", "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф. (Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ.)"}, {"vocab_id": "8a575d70-5a67-4676-ab20-c1bf632d0c26", "ru": "Дверь", "stress": "Дверь", "vi": "cửa ra vào", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "cửa ra vào (Trong phòng khách) | Thao tác: mở >< đóng | Công dụng: vào, ra", "ex": "Я открыва́ю дверь, что́бы войти́ в дом. (Tôi mở cửa để đi vào trong nhà.)"}, {"vocab_id": "eacb1550-7db8-4d56-b285-e8098d5d4f92", "ru": "Окно́", "stress": "Окно́", "vi": "cửa sổ", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng khách", "note": "cửa sổ (Trong phòng khách) | Thao tác: mở >< đóng | Công dụng: thông gió phòng", "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату. (Tôi mở cửa sổ vào buổi sáng để thông gió phòng.)"}, {"vocab_id": "55ae5d7e-3c27-416c-9831-decc99d1c46a", "ru": "Стол", "stress": "Стол", "vi": "Bàn", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Bàn (Trong phòng bếp) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: làm việc, ăn, đặt đứng/đặt nằm", "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним (3). (Tôi đặt bàn ở phòng bếp để ăn trên nó.)"}, {"vocab_id": "684629ca-8692-437f-b4ab-eb31c04d62c3", "ru": "(Кухо́нный) шкаф", "stress": "(Кухо́нный) шкаф", "vi": "Tủ bếp", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Tủ bếp (Trong phòng bếp) | Thao tác: - đặt đứng, treo, - mở >< đóng | Công dụng: đựng bát đĩa", "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и доста́ть кастрю́лю, а пото́м закрыва́ю его́. (Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại.)"}, {"vocab_id": "62dc89ab-473d-4768-af26-7163753f8d92", "ru": "Холоди́льник", "stress": "Холоди́льник", "vi": "Tủ lạnh", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Tủ lạnh (Trong phòng bếp) | Thao tác: - đặt đứng, - mở >< đóng | Công dụng: bảo quản thực phẩm", "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими. (Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon.)"}, {"vocab_id": "3ba1718d-91cc-472c-9eb7-204bd1c55ca1", "ru": "Плита́", "stress": "Плита́", "vi": "Bếp", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Bếp (Trong phòng bếp) | Thao tác: - đặt đứng, - bật >< tắt, - lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: nấu, luộc, rán", "ex": "Я варю́ суп на плите́. (Tôi nấu súp trên bếp.)"}, {"vocab_id": "ade6e3a2-3f71-4eab-9932-69a31b10d890", "ru": "Кастрю́ля", "stress": "Кастрю́ля", "vi": "Nồi", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Nồi (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - đặt xuống >< nhấc lên, - rửa >< lau khô, - treo lên | Công dụng: luộc, nấu", "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть в ней суп. (Tôi đặt nồi lên bếp để nấu súp trên nó.)"}, {"vocab_id": "239e781e-fadd-4529-ae72-db7f9ddb2db8", "ru": "Сковорода́", "stress": "Сковорода́", "vi": "Chảo", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Chảo (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - đặt xuống >< nhấc lên, - rửa >< lau khô, - treo lên | Công dụng: rán, nấu", "ex": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою её и уберу́ в шкаф. (Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa nó và cất vào trong tủ.)"}, {"vocab_id": "4e1361b5-ea65-41e8-8ca3-87ee9a393e52", "ru": "Нож", "stress": "Нож", "vi": "Dao", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Dao (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên | Công dụng: cắt, thái, gọt, bổ", "ex": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м. (Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao.)"}, {"vocab_id": "ed5a7d0b-d2e3-4eaa-b921-6456b5bb0537", "ru": "Ло́жка", "stress": "Ло́жка", "vi": "Thìa", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Thìa (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên | Công dụng: ăn", "ex": "Я ем суп ло́жкой. (Tôi ăn súp bằng thìa.)"}, {"vocab_id": "a3935754-ae5b-4966-b8b4-a910857a83b5", "ru": "Ви́лка", "stress": "Ви́лка", "vi": "Dĩa", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Dĩa (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên | Công dụng: ăn", "ex": "Я ем мя́со ви́лкой. (Tôi ăn thịt bằng dĩa.)"}, {"vocab_id": "a4d23244-c2f4-4b53-9c2d-a7f91f7f08d2", "ru": "Таре́лка", "stress": "Таре́лка", "vi": "Đĩa", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Đĩa (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: ăn, đặt (đồ ăn) lên", "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́. (Tôi đặt đĩa lên bàn và đặt trứng rán lên nó.)"}, {"vocab_id": "45671fcb-c09f-4551-b10a-4667806e3aec", "ru": "Ми́ска", "stress": "Ми́ска", "vi": "Bát", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Bát (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: ăn", "ex": "Я налива́ю суп в ми́ску. (Tôi đổ súp và bát.)"}, {"vocab_id": "716fb49f-09a1-4571-bd5b-ab16f6af7d9e", "ru": "Ча́шка", "stress": "Ча́шка", "vi": "Tách, chén", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Tách, chén (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: uống", "ex": "Я налива́ю чай в ча́шку, что́бы пить. (Tôi rót trà vào tách để uống)"}, {"vocab_id": "960783cb-1bbc-4f3d-b00a-b78337abdc5a", "ru": "Стака́н", "stress": "Стака́н", "vi": "Cốc", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Cốc (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: uống", "ex": "Я налива́ю во́ду в стака́не, что́бы пить. (Tôi rót nước vào cốc để uống)"}, {"vocab_id": "0a30c0e1-3aaa-44e4-84bd-a7ed52c89b61", "ru": "(Раздело́чная) доска́", "stress": "(Раздело́чная) доска́", "vi": "Thớt", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng bếp", "note": "Thớt (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô | Công dụng: thái, bổ", "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней. (Tôi đặt thớt lên bàn để thái rau trên thớt.)"}, {"vocab_id": "f6fe461c-589a-4838-a40b-a0c0816a99d2", "ru": "Рако́вина", "stress": "Рако́вина", "vi": "Bồn rửa", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Bồn rửa (Trong phòng bếp) | Thao tác: mở vòi nước >< đóng vòi nước, lau chùi (loại bỏ nước) | Công dụng: rửa (bát đĩa,...)", "ex": "Я мо́ю посу́ду в рако́вине. (Tôi rửa bát đĩa trong bồn rửa.)"}, {"vocab_id": "bc41c504-dcfc-41ca-8888-4800dc0bffb2", "ru": "Корзи́на", "stress": "Корзи́на", "vi": "Giỏ", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng bếp", "note": "Giỏ (Trong phòng bếp) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt đứng | Công dụng: đựng (thực phẩm,...)", "ex": "Я сохраню́ проду́кты в корзи́ну. (Tôi đựng thực phẩm trong giỏ.)"}, {"vocab_id": "5145ca73-7c56-463b-910c-a1da6441a290", "ru": "Крова́ть", "stress": "Крова́ть", "vi": "Giường", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng ngủ", "note": "Giường (Trong phòng ngủ) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn) | Công dụng: ngủ, nằm, nghỉ ngơi", "ex": "Я ложу́сь спать на крова́ти. (Tôi ngủ trên giường.)"}, {"vocab_id": "f502e813-eafb-4c73-b17e-90bfaad27bf0", "ru": "Шкаф", "stress": "Шкаф", "vi": "Tủ quần áo", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng ngủ", "note": "Tủ quần áo (Trong phòng ngủ) | Thao tác: - đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: cất quần áo, treo quần áo", "ex": "Я открыва́ю шкаф, что́бы убра́ть в него́ оде́жду. (Tôi mở tủ quần áo ra để cất quần áo vào trong nó.)"}, {"vocab_id": "9efbc541-c0c1-4289-91c5-51d11a0af66e", "ru": "Компью́тер", "stress": "Компью́тер", "vi": "Máy tính", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng ngủ", "note": "Máy tính (Trong phòng ngủ) | Thao tác: - đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: làm việc, học, chơi điện tử", "ex": "Я включа́ю компью́тер, что́бы рабо́тать. (Tôi bật máy tính lên để làm việc.)"}, {"vocab_id": "7a2a6c02-d012-48ce-af29-f23ab2a027d8", "ru": "Ла́мпа", "stress": "Ла́мпа", "vi": "Đèn ngủ, đèn học", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng ngủ", "note": "Đèn ngủ, đèn học (Trong phòng ngủ) | Thao tác: - đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: đọc, làm việc", "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу. (Tôi bật đèn lên để đọc sách.)"}, {"vocab_id": "844242fa-e452-4b17-b332-1fdd92bfb0b3", "ru": "Окно́", "stress": "Окно́", "vi": "Cửa sổ", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng ngủ", "note": "Cửa sổ (Trong phòng ngủ) | Thao tác: - mở >< đóng, - lau chùi (loại bỏ bụi bẩn) | Công dụng: thông gió phòng", "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату. (Tôi mở cửa sổ vào mỗi sáng để thông gió phòng.)"}, {"vocab_id": "ec5d2685-30d4-41c1-9a69-2e5402e9b780", "ru": "(Письме́нный) стол", "stress": "(Письме́нный) стол", "vi": "Bàn làm việc", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng ngủ", "note": "Bàn làm việc (Trong phòng ngủ) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: học, viết, làm việc", "ex": "Я учу́сь за (письме́нным) столо́м. (Tôi học tại bàn.)"}, {"vocab_id": "955b2240-9c17-4476-89ca-2f9fc70fbeeb", "ru": "Стул", "stress": "Стул", "vi": "Ghế", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng ngủ", "note": "Ghế (Trong phòng ngủ) | Thao tác: đặt đứng, lau chùi (loại bỏ bụi bẩn) | Công dụng: ngồi", "ex": "Я сижу́ за сту́лом, что́бы рабо́тать. (Tôi ngồi vào ghế để làm việc.)"}, {"vocab_id": "004d38b3-7c93-45ac-a925-f52711934282", "ru": "Зе́ркало", "stress": "Зе́ркало", "vi": "Gương", "pos": "Noun", "gender": "n", "sub_topic": "Trong phòng tắm", "note": "Gương (Trong phòng tắm) | Thao tác: treo, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước) | Công dụng: soi gương", "ex": "Я вешаю́ зе́ркало на стену́, что́бы смотре́ть (в него́). (Tôi treo gương lên tường để soi gương.)"}, {"vocab_id": "2291bc90-82f1-4b31-875e-275627221bd0", "ru": "По́лка", "stress": "По́лка", "vi": "Kệ", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng tắm", "note": "Kệ (Trong phòng tắm) | Thao tác: treo | Công dụng: đặt đứng/ đặt nằm (đồ vật)", "ex": "Я вешаю́ по́лку в ва́нной ко́мнате, что́бы поста́вить на неё шампу́нь. (Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên kệ.)"}, {"vocab_id": "d5ac47dd-56d9-4c53-bf23-2d1fefadc1c5", "ru": "Ва́нна", "stress": "Ва́нна", "vi": "Bồn tắm", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng tắm", "note": "Bồn tắm (Trong phòng tắm) | Thao tác: đặt đứng, cọ rửa | Công dụng: tằm (bồn)", "ex": "Я принима́ю ва́нну. (Tôi đang tắm.)"}, {"vocab_id": "c80acc7e-6410-4114-9230-3aab81ef73a2", "ru": "Крючо́к", "stress": "Крючо́к", "vi": "Móc treo", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng tắm", "note": "Móc treo (Trong phòng tắm) | Thao tác: treo | Công dụng: treo khăn, treo quần áo", "ex": "Я ве́шаю крючо́к на стену́, что́бы веша́ть на него́ полоте́нце. (Tôi treo móc lên tường để treo khăn tắm lên nó.)"}, {"vocab_id": "0869b03d-8f67-499f-a792-374316c12036", "ru": "Полоте́нце", "stress": "Полоте́нце", "vi": "Khăn tắm", "pos": "Noun", "gender": "n", "sub_topic": "Trong phòng tắm", "note": "Khăn tắm (Trong phòng tắm) | Thao tác: treo, lấy, gấp | Công dụng: lau người, lau mặt", "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться. (Tôi lấy khăn từ móc treo để lau người.)"}, {"vocab_id": "e0f37bc5-929d-4607-aabf-50124e88c455", "ru": "Унита́з", "stress": "Унита́з", "vi": "Bồn cầu", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng tắm", "note": "Bồn cầu (Trong phòng tắm) | Thao tác: đặt đứng, cọ rửa | Công dụng: đi vệ sinh", "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з. (Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn.)"}, {"vocab_id": "df7acaa3-92b0-4704-b5b2-6d8ce9a43cd8", "ru": "Рако́вина", "stress": "Рако́вина", "vi": "Bồn rửa", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng tắm", "note": "Bồn rửa (Trong phòng tắm) | Thao tác: đặt đứng, cọ rửa | Công dụng: rửa mặt, rửa tay", "ex": "Я мо́ю лицо́ в рако́вине. (Tôi rửa mặt trong bồn rửa.)"}, {"vocab_id": "d37320de-416a-45b2-a876-300364954ef5", "ru": "Стира́льная маши́на", "stress": "Стира́льная маши́на", "vi": "máy giặt", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng giặt", "note": "máy giặt (Trong phòng giặt) | Thao tác: - đặt đứng, - mở >< đóng, - bật >< tắt | Công dụng: giặt quần áo", "ex": "Я стира́ю оде́жду в стира́льной маши́не. (Tôi giặt quần áo bằng máy giặt.)"}, {"vocab_id": "cdd7d8e4-2b0b-43b0-8612-e2609126a131", "ru": "Утю́г", "stress": "Утю́г", "vi": "bàn là", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng giặt", "note": "bàn là (Trong phòng giặt) | Thao tác: - lấy ra >< cất vào, - cầm >< đặt đứng, - bật lên >< tắt đi | Công dụng: là quần áo", "ex": "Я гла́жу руба́шку утюго́м. (Tôi là áo sơ mi bằng bàn là.)"}, {"vocab_id": "6ebc7287-0915-4dcc-b34f-76318b0d8d1e", "ru": "Глади́льная доска́", "stress": "Глади́льная доска́", "vi": "cầu là (bàn để là quần áo)", "pos": "Noun", "gender": "m", "sub_topic": "Trong phòng giặt", "note": "cầu là (bàn để là quần áo) (Trong phòng giặt) | Thao tác: - lấy ra >< cất vào, - đặt đứng, - mở ra >< gấp lại | Công dụng: là quần áo", "ex": "Я гла́жу оде́жду на глади́льной доске́. (Tôi là quần áo trên cầu là.)"}, {"vocab_id": "0249d1aa-8644-46d4-9e59-c0935aed20c2", "ru": "Су́шилка", "stress": "Су́шилка", "vi": "giàn phơi", "pos": "Noun", "gender": "f", "sub_topic": "Trong phòng giặt", "note": "giàn phơi (Trong phòng giặt) | Thao tác: - lấy ra >< cất vào, - đặt đứng, - mở ra >< gấp lại | Công dụng: phơi khô quần áo", "ex": "Я сушу́ оде́жду на су́шилке. (Tôi phơi quần áo trên giàn phơi đồ.)"}, {"vocab_id": "b12b3c0d-c878-43b0-9f16-b03362cb55a3", "ru": "мыть / вы́мыть >< вытира́ть / вы́тереть", "stress": "мыть / вы́мыть >< вытира́ть / вы́тереть", "vi": "rửa >< lau khô (loại bỏ nước)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "rửa >< lau khô (loại bỏ nước) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "9419ebc5-24c5-441d-a427-b87225ab1ee5", "ru": "держа́ть / подержа́ть", "stress": "держа́ть / подержа́ть", "vi": "cầm", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "cầm (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "210c5df5-4c53-476b-b878-7d2288cc0292", "ru": "брать / взять >< убира́ть / убра́ть", "stress": "брать / взять >< убира́ть / убра́ть", "vi": "lấy >< cất", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "lấy >< cất (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "86cbc395-a8a6-4173-81ad-28357de6e872", "ru": "открыва́ть / откры́ть >< закрыва́ть / закры́ть", "stress": "открыва́ть / откры́ть >< закрыва́ть / закры́ть", "vi": "mở >< đóng", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "mở >< đóng (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "363d27e6-456b-471c-93fa-583a022e77a8", "ru": "включа́ть / включи́ть >< выключа́ть / вы́ключить", "stress": "включа́ть / включи́ть >< выключа́ть / вы́ключить", "vi": "bật >< tắt", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "bật >< tắt (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "1a08104f-c11f-42d4-a8d1-07737d111e18", "ru": "стели́ть / постели́ть >< свора́чивать / сверну́ть", "stress": "стели́ть / постели́ть >< свора́чивать / сверну́ть", "vi": "trải >< cuộn", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "trải >< cuộn (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "2f392fff-03ea-48da-935a-bf70e5a1a502", "ru": "стира́ть / постира́ть >< суши́ть / вы́сушить", "stress": "стира́ть / постира́ть >< суши́ть / вы́сушить", "vi": "giặt >< phơi", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "giặt >< phơi (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "f658ddff-371a-4c69-ac23-6b9407c97c0a", "ru": "раскла́дывать / разложи́ть >< скла́дывать / сложи́ть", "stress": "раскла́дывать / разложи́ть >< скла́дывать / сложи́ть", "vi": "bày ra >< xếp lại", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "bày ra >< xếp lại (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "4aa504f3-db94-442e-b77c-b1915c632a7f", "ru": "- ста́вить / поста́вить - класть / положи́ть", "stress": "- ста́вить / поста́вить - класть / положи́ть", "vi": "- đặt đứng - đặt nằm", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "- đặt đứng - đặt nằm (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "34124de6-0195-4ef2-b556-d62500645e1a", "ru": "снима́ть / снять", "stress": "снима́ть / снять", "vi": "cởi; nhấc ra", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "cởi; nhấc ra (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "6d9e5a79-9fba-4b07-89d9-f63ba708455d", "ru": "гла́дить / погла́дить (оде́жду)", "stress": "гла́дить / погла́дить (оде́жду)", "vi": "ủi (quần áo)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "ủi (quần áo) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "4f05e3e1-86b2-4ef0-9787-8a53580b9319", "ru": "протира́ть / протере́ть", "stress": "протира́ть / протере́ть", "vi": "lau chùi (loại bỏ bụi bẩn)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "lau chùi (loại bỏ bụi bẩn) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "d9e1a93f-c964-42b2-990a-17b10fecc19b", "ru": "ве́шать / пове́сить", "stress": "ве́шать / пове́сить", "vi": "treo", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "treo (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "5b13ed3d-b839-47cc-b5b2-1a4e02eeae03", "ru": "чи́стить / почи́стить", "stress": "чи́стить / почи́стить", "vi": "cọ rửa, làm sạch", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "cọ rửa, làm sạch (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "bfd5b53d-c32e-4a07-99c7-a03932c56ef2", "ru": "сиде́ть", "stress": "сиде́ть", "vi": "ngồi", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "ngồi (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "26ab179d-0f9d-4602-bf12-30e9f71b37da", "ru": "украша́ть / укра́сить", "stress": "украша́ть / укра́сить", "vi": "trang trí", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "trang trí (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "7e97d4c6-7c64-4495-be80-e014f24b1280", "ru": "лежа́ть", "stress": "лежа́ть", "vi": "nằm", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "nằm (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "50974908-c94b-4f5b-96b0-4dd3f2b4eb33", "ru": "храни́ть / сохрани́ть", "stress": "храни́ть / сохрани́ть", "vi": "giữ gìn, cất giữ, lưu trữ", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "giữ gìn, cất giữ, lưu trữ (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "ddf34abf-0814-44cd-9e11-98a2df87ad75", "ru": "ложи́ться / лечь спать", "stress": "ложи́ться / лечь спать", "vi": "ngủ", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "ngủ (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "1af74271-dd1a-407d-8d53-a1f960dcffc2", "ru": "смотре́ть / посмотре́ть", "stress": "смотре́ть / посмотре́ть", "vi": "xem", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "xem (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "3038c747-80d1-4152-9e31-51392c5409cd", "ru": "отдыха́ть / отдохну́ть", "stress": "отдыха́ть / отдохну́ть", "vi": "nghỉ ngơi", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "nghỉ ngơi (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "3ea765dd-755c-4aa2-935d-dadc9423420b", "ru": "сажа́ть / посади́ть (цветы́)", "stress": "сажа́ть / посади́ть (цветы́)", "vi": "trồng (hoa)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "trồng (hoa) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "454d0388-42e1-4b1e-9b59-adc8e440e28f", "ru": "рабо́тать", "stress": "рабо́тать", "vi": "làm việc", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "làm việc (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "b59a3d69-8a08-425a-b062-34d8b4745ae7", "ru": "прове́тривать / прове́трить (ко́мнату)", "stress": "прове́тривать / прове́трить (ко́мнату)", "vi": "thông gió (phòng)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "thông gió (phòng) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "ceb44524-488a-483e-8ed9-b9baa65a6144", "ru": "есть / съесть (блю́до)", "stress": "есть / съесть (блю́до)", "vi": "ăn (món ăn)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "ăn (món ăn) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "acb1f7c1-654a-4b98-ac2a-7bd8cd2b9e96", "ru": "гото́вить / приготов́ить (блю́до)", "stress": "гото́вить / приготов́ить (блю́до)", "vi": "nấu (món ăn)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "nấu (món ăn) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "b9f940bf-3be7-4310-84cf-fd680492d585", "ru": "вари́ть / сва́рить", "stress": "вари́ть / сва́рить", "vi": "luộc (nấu với nước)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "luộc (nấu với nước) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "257a9a17-4d30-42df-8e66-4cfb12efab56", "ru": "пить / вы́пить (воду́, чай)", "stress": "пить / вы́пить (воду́, чай)", "vi": "uống (nước, trà)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "uống (nước, trà) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "3c2763c4-b1dc-4932-b206-f6cb1ba7cca8", "ru": "жа́рить / поджа́рить (мя́со, ры́бу)", "stress": "жа́рить / поджа́рить (мя́со, ры́бу)", "vi": "rán (thịt, cá)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "rán (thịt, cá) (Động từ đồ dùng gia đình)", "ex": ""}, {"vocab_id": "79869d94-06e8-4bba-ae65-861a6476de47", "ru": "принима́ть / приня́ть (ванну)", "stress": "принима́ть / приня́ть (ванну)", "vi": "tắm bồn", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & công dụng", "note": "tắm bồn (Động từ đồ dùng gia đình)", "ex": ""}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  'b464e205-c487-4c96-b66a-be27b745a400', 'Đồ dùng học tập', 'do_dung_hoc_tap', 'A1', '🎒', 'Dụng cụ học tập, sách vở, tài liệu, thiết bị giảng đường và bảng lớp.', true,
  '["Nhóm sách và tài liệu", "Nhóm dụng cụ học tập trong cặp", "Thiết bị & dụng cụ lớp học", "Động từ thao tác học tập"]'::jsonb, 29, '[{"vocab_id": "36bdd998-c5af-492d-99d3-1937a3ecc0db", "ru": "Рюкза́к", "stress": "Рюкза́к", "vi": "cặp sách", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm sách và tài liệu", "note": "cặp sách (Nhóm sách và tài liệu)", "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́. (Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp sách lại và đeo nó lên.)"}, {"vocab_id": "96c99871-b754-4b88-9c95-b363094052db", "ru": "Кни́га", "stress": "Кни́га", "vi": "Sách", "pos": "Noun", "gender": "f", "sub_topic": "Nhóm sách và tài liệu", "note": "Sách (Nhóm sách và tài liệu)", "ex": "Я достаю́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к (1). (Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.)"}, {"vocab_id": "d4cf1438-a793-44e5-ba16-3bd2228fcd7b", "ru": "Тетра́дь", "stress": "Тетра́дь", "vi": "Vở", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm sách và tài liệu", "note": "Vở (Nhóm sách và tài liệu)", "ex": "Я достаю́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к. (Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp.)"}, {"vocab_id": "6fef2a22-f9b7-448c-ad5e-277dd0c06f34", "ru": "Слова́рь", "stress": "Слова́рь", "vi": "Từ điển", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm sách và tài liệu", "note": "Từ điển (Nhóm sách và tài liệu)", "ex": "Я беру́ слова́рь в библиоте́ке, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ слова́рь. (Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại.)"}, {"vocab_id": "79965afd-2b2b-4266-8dab-3060dafe6a7b", "ru": "Бума́га", "stress": "Бума́га", "vi": "Giấy", "pos": "Noun", "gender": "f", "sub_topic": "Nhóm sách và tài liệu", "note": "Giấy (Nhóm sách và tài liệu)", "ex": "Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик. (Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay.)"}, {"vocab_id": "d8a1aff3-6ccf-45ed-a1d5-9d5f74ee9f53", "ru": "Пена́л", "stress": "Пена́л", "vi": "Hộp bút", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Hộp bút (Nhóm dụng cụ học tập trong cặp)", "ex": "Я достаю́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к. (Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp.)"}, {"vocab_id": "80e56c40-4477-415c-9535-69a00f62a52d", "ru": "Пена́л", "stress": "Пена́л", "vi": "Bút bi", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Bút bi (Nhóm dụng cụ học tập trong cặp)", "ex": "Я достаю́ ру́чку из пенала́, что́бы писа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л. (Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút.)"}, {"vocab_id": "7764da51-f813-4516-8259-1716df669493", "ru": "Каранда́ш - Точи́лка", "stress": "Каранда́ш - Точи́лка", "vi": "Bút chì - gọt bút chì", "pos": "Noun", "gender": "f", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Bút chì - gọt bút chì (Nhóm dụng cụ học tập trong cặp)", "ex": "Я достаю́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л. (Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút.)"}, {"vocab_id": "03f08c07-b020-46ae-a21a-0db2238aa585", "ru": "Ла́стик", "stress": "Ла́стик", "vi": "Tẩy", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Tẩy (Nhóm dụng cụ học tập trong cặp)", "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть. (Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy.)"}, {"vocab_id": "f3f8e771-586d-4851-826f-05ddbb21be77", "ru": "Лине́йка", "stress": "Лине́йка", "vi": "Thước kẻ", "pos": "Noun", "gender": "f", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Thước kẻ (Nhóm dụng cụ học tập trong cặp)", "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её. (Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ.)"}, {"vocab_id": "97426807-f625-4969-b6ff-07ecc95f5056", "ru": "Цветны́е карандаши́", "stress": "Цветны́е карандаши́", "vi": "Bút chì màu", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Bút chì màu (Nhóm dụng cụ học tập trong cặp)", "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я достаю́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок. (Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này.)"}, {"vocab_id": "4f4820e9-51d1-4277-ba6e-720a2fc606e9", "ru": "Маркёр", "stress": "Маркёр", "vi": "Bút dạ", "pos": "Noun", "gender": "m", "sub_topic": "Nhóm dụng cụ học tập trong cặp", "note": "Bút dạ (Nhóm dụng cụ học tập trong cặp)", "ex": "Мне ну́жно писа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы писа́ть им на бе́лой доске́. (Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó.)"}, {"vocab_id": "16f8d02c-e024-42fa-83d2-7a01d171a822", "ru": "Тря́пка", "stress": "Тря́пка", "vi": "Khăn lau", "pos": "Noun", "gender": "f", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Khăn lau (Thiết bị & dụng cụ lớp học)", "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол. (Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn.)"}, {"vocab_id": "0224cf11-1eab-4748-9d67-fb1cce458085", "ru": "Чёрная доска́", "stress": "Чёрная доска́", "vi": "Bảng đen", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Bảng đen (Thiết bị & dụng cụ lớp học)", "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка, ученики́ бу́дут протира́ть доску́ тря́пкой. (Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.)"}, {"vocab_id": "ebe9c649-a271-48f7-916b-0fe9da1ab033", "ru": "Мел - Коробка (для ме́ла)", "stress": "Мел - Коробка (для ме́ла)", "vi": "Phấn - Hộp (phấn)", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Phấn - Hộp (phấn) (Thiết bị & dụng cụ lớp học)", "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на чёрной доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку. (Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn.)"}, {"vocab_id": "7ca4c91b-d83e-4080-8152-225194d86423", "ru": "Бе́лая доска́", "stress": "Бе́лая доска́", "vi": "Bảng trắng", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Bảng trắng (Thiết bị & dụng cụ lớp học)", "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. После заня́тия, студе́нты бу́дут протира́ть доску́ гу́бкой. (Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.)"}, {"vocab_id": "7b9555d0-b939-4a9c-bdcc-c3e2bc191825", "ru": "Губка́ (для доски́)", "stress": "Губка́ (для доски́)", "vi": "Mút lau (bảng)", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Mút lau (bảng) (Thiết bị & dụng cụ lớp học)", "ex": "Я протира́ю бе́лую доску́ губко́й. (Tôi đang lau bảng trắng bằng mút lau.)"}, {"vocab_id": "b6fdf72b-8726-4f16-9438-13b4ca44d67b", "ru": "Маркёр", "stress": "Маркёр", "vi": "Bút dạ", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Bút dạ (Thiết bị & dụng cụ lớp học)", "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром. (Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ.)"}, {"vocab_id": "b517937c-5cf3-44b8-9a01-ed24ad2a67a4", "ru": "Прое́ктор", "stress": "Прое́ктор", "vi": "Máy chiếu", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Máy chiếu (Thiết bị & dụng cụ lớp học)", "ex": "Преподава́тель обы́чно показыва́ет презента́цию прое́ктором. (Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu.)"}, {"vocab_id": "cce83641-ae9a-471d-8e34-8db14f925f3d", "ru": "Компью́тер", "stress": "Компью́тер", "vi": "Máy tính", "pos": "Noun", "gender": "m", "sub_topic": "Thiết bị & dụng cụ lớp học", "note": "Máy tính (Thiết bị & dụng cụ lớp học)", "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера. (Giảng viên bật máy tính và xem bài giảng trên màn hình (của) máy tính.)"}, {"vocab_id": "aac9dcd4-1613-43c9-a756-ff0ecdf62df6", "ru": "брать / взять >< убира́ть / убра́ть", "stress": "брать / взять >< убира́ть / убра́ть", "vi": "lấy ra >< cất vào", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "lấy ra >< cất vào (Động từ học tập)", "ex": ""}, {"vocab_id": "580914c0-93ac-4e5e-aba7-64e5f2472a42", "ru": "держа́ть / подержа́ть", "stress": "держа́ть / подержа́ть", "vi": "cầm", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "cầm (Động từ học tập)", "ex": ""}, {"vocab_id": "594b98e6-98e6-407c-8c17-b24c1bbb951f", "ru": "- ста́вить / поста́вить - класть / положи́ть", "stress": "- ста́вить / поста́вить - класть / положи́ть", "vi": "- đặt đứng - đặt nằm", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "- đặt đứng - đặt nằm (Động từ học tập)", "ex": ""}, {"vocab_id": "81cd4e3e-3dcc-4e61-b7e4-773215c32942", "ru": "открыва́ть / откры́ть (колпачо́к) >< закрыва́ть / закры́ть (колпачо́к)", "stress": "открыва́ть / откры́ть (колпачо́к) >< закрыва́ть / закры́ть (колпачо́к)", "vi": "mở (nắp) >< đóng (nắp)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "mở (nắp) >< đóng (nắp) (Động từ học tập)", "ex": ""}, {"vocab_id": "659808af-f9f5-4357-8b75-7e44ec203a52", "ru": "включа́ть / включа́ть >< выключа́ть / выклю́чить", "stress": "включа́ть / включа́ть >< выключа́ть / выклю́чить", "vi": "bật >< tắt", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "bật >< tắt (Động từ học tập)", "ex": ""}, {"vocab_id": "62edad5f-2e6e-4025-9d37-7aca6b36bd25", "ru": "складыва́ть >< сложи́ть", "stress": "складыва́ть >< сложи́ть", "vi": "gấp lại", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "gấp lại (Động từ học tập)", "ex": ""}, {"vocab_id": "c6ff789d-03ab-4f22-bc04-25de8ff3d9bb", "ru": "протира́ть >< протере́ть доску́", "stress": "протира́ть >< протере́ть доску́", "vi": "lau bảng", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "lau bảng (Động từ học tập)", "ex": ""}, {"vocab_id": "3a240ccc-e420-45b6-9645-298bab5e5b63", "ru": "надева́ть / наде́ть", "stress": "надева́ть / наде́ть", "vi": "đeo, mặc, đội", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "đeo, mặc, đội (Động từ học tập)", "ex": ""}, {"vocab_id": "2ffc9497-9c07-4b97-b251-aa4fa538e574", "ru": "веша́ть / пове́сить", "stress": "веша́ть / пове́сить", "vi": "treo", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác học tập", "note": "treo (Động từ học tập)", "ex": ""}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  'b7398459-c824-493f-bf4a-3b96f509077b', 'Phương tiện giao thông', 'phuong_tien_giao_thong', 'A1', '🚌', 'Phương tiện công cộng và cá nhân, động từ chuyển động và bến bãi, nhà ga tại Nga.', true,
  '["Phương tiện công cộng", "Phương tiện cá nhân"]'::jsonb, 9, '[{"vocab_id": "5009b8bc-bee7-4986-85f1-1a9bda448e6c", "ru": "Авто́бус — остановка", "stress": "Авто́бус — остановка", "vi": "Xe buýt - điểm dừng", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện công cộng", "note": "Xe buýt - điểm dừng (Phương tiện công cộng) | Động từ: е́хать / е́здить", "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я е́ду в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе. (Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.)"}, {"vocab_id": "0e25bfa7-dcbb-407b-9f03-33fe8d2761ba", "ru": "Трамва́й — остановка", "stress": "Трамва́й — остановка", "vi": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện công cộng", "note": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng (Phương tiện công cộng) | Động từ: ехать / ездить", "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня е́ду домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е. (Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng xe điện.)"}, {"vocab_id": "7cda5e5d-5ceb-4452-be9f-cf6a1aa6cb78", "ru": "Тролле́йбус — остановка", "stress": "Тролле́йбус — остановка", "vi": "Xe điện (loại không có đường ray riêng) - điểm dừng", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện công cộng", "note": "Xe điện (loại không có đường ray riêng) - điểm dừng (Phương tiện công cộng) | Động từ: ехать / ездить", "ex": "Я иду́ (пешко́м) на остано́вку от до́ма, потому́ что сего́дня я е́ду на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе. (Tôi đang đi bộ đến điểm dừng xe điện bánh hơi từ nhà, vì hôm nay tôi đi đến quảng trường bằng xe điện bánh hơi. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện.)"}, {"vocab_id": "68cce411-a8a3-489a-9c50-8872b3a83f76", "ru": "Метро́ — ста́нция метро́", "stress": "Метро́ — ста́нция метро́", "vi": "Tàu điện ngầm - ga tàu điện ngầm", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện công cộng", "note": "Tàu điện ngầm - ga tàu điện ngầm (Phương tiện công cộng) | Động từ: ехать / ездить", "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что сейча́с я е́ду на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты, я е́зжу на центра́льный ры́нок на метро́. (Tôi đang đi bộ đến ga tàu điện ngầm từ công ty, vì bây giờ tôi đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.)"}, {"vocab_id": "0b5461e4-a495-4594-a605-3f5ce6bfcbd3", "ru": "По́езд — вокза́л", "stress": "По́езд — вокза́л", "vi": "Tàu hỏa - ga tàu hỏa", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện công cộng", "note": "Tàu hỏa - ga tàu hỏa (Phương tiện công cộng) | Động từ: ехать / ездить", "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я е́ду в Москву́ на по́езде. Ка́ждую неде́лю, я е́зжу в Москву́ на по́езде и обра́тно. (Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.)"}, {"vocab_id": "23874003-c1df-4f0c-bf56-731e926ad262", "ru": "Самолёт — аэропо́рт", "stress": "Самолёт — аэропо́рт", "vi": "Máy bay - sân bay", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện công cộng", "note": "Máy bay - sân bay (Phương tiện công cộng) | Động từ: лете́ть / лета́ть", "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я лечу́ в Казань на самолёте. Ка́ждый ме́сяц, я лета́ю в Казань на самолёте и обра́тно. (Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về.)"}, {"vocab_id": "391f112b-dbf4-40e9-94dc-839b79402e1b", "ru": "Маши́на — гара́ж", "stress": "Маши́на — гара́ж", "vi": "ô tô - gara", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện cá nhân", "note": "ô tô - gara (Phương tiện cá nhân) | Động từ: е́хать / е́здить", "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня е́ду на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не. (Tôi đi đến gara để lấy ô tô, vì hôm nay tôi đi làm bằng ô tô. Hằng ngày, tôi đều đi làm bằng ô tô.)"}, {"vocab_id": "8040b45c-d60c-49f4-980a-7181530e58f8", "ru": "Мотоци́кл — гара́ж", "stress": "Мотоци́кл — гара́ж", "vi": "xe máy - gara", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện cá nhân", "note": "xe máy - gara (Phương tiện cá nhân) | Động từ: ехать / ездить", "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня е́ду в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле. (Tôi đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy.)"}, {"vocab_id": "08c008a0-c59f-4f0a-9229-c928f85ec46e", "ru": "Велосипе́д — гара́ж", "stress": "Велосипе́д — гара́ж", "vi": "xe đạp - gara", "pos": "Noun", "gender": "m", "sub_topic": "Phương tiện cá nhân", "note": "xe đạp - gara (Phương tiện cá nhân) | Động từ: ехать / ездить", "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня е́ду в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку. (Tôi đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên.)"}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'Địa điểm nơi chốn', 'dia_diem_noi_chon', 'A1', '🏛️', 'Cơ sở học tập, y tế, thương mại dịch vụ, vui chơi giải trí, giao thông và các cảnh quan thiên nhiên.', true,
  '["Cơ sở học tập", "Cơ sở y tế", "Cơ sở vui chơi giải trí, thể thao", "Cơ sở thương mại, dịch vụ, kinh tế", "Liên quan đến phương tiện giao thông", "Liên quan đến thiên nhiên", "Động từ thao tác & nơi chốn"]'::jsonb, 67, '[{"vocab_id": "40d5cb0a-f970-4612-87f5-ae1677ebc034", "ru": "- В шко́ле (шко́ла) - В акаде́мии (акаде́мия) - В институ́те (институ́т) - В университе́те (университе́т)", "stress": "- В шко́ле (шко́ла) - В акаде́мии (акаде́мия) - В институ́те (институ́т) - В университе́те (университе́т)", "vi": "- Trường học - Học viện - Viện - Đại học", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "- Trường học - Học viện - Viện - Đại học (Cơ sở học tập) | Hoạt động: học tập, học, nghiên cứu (học chuyên sâu)", "ex": "Я иду́ в шко́лу/ акаде́мию/ институ́т/ университе́т, что́бы учи́ться. Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те. (Tôi đi đến trường học/ học viện/ viện/ đại học để học. Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học.)"}, {"vocab_id": "1cb43a25-116f-4607-9f33-48124d19e795", "ru": "В библиоте́ке (библиоте́ка)", "stress": "В библиоте́ке (библиоте́ка)", "vi": "Thư viện", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "Thư viện (Cơ sở học tập) | Hoạt động: đọc", "ex": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке. (Tôi đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện.)"}, {"vocab_id": "cc412c17-6e73-47e5-a0a1-4b606217dae1", "ru": "На ка́федре (ка́федра)", "stress": "На ка́федре (ка́федра)", "vi": "Phòng chuyên môn", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "Phòng chuyên môn (Cơ sở học tập) | Hoạt động: gặp mặt, họp mặt", "ex": "Преподава́тели иду́т на кафе́дру, что́бы встре́титься. Они́ ча́сто встреча́ются на кафе́дре. (Các giảng viên đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn.)"}, {"vocab_id": "a5189af1-7be7-4adc-8899-9422814481e0", "ru": "В декана́те (декана́т)", "stress": "В декана́те (декана́т)", "vi": "Văn phòng khoa", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "Văn phòng khoa (Cơ sở học tập) | Hoạt động: nộp (giấy tờ), nhận (giấy tờ)", "ex": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческие биле́ты. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те. (Các sinh viên đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.)"}, {"vocab_id": "04cd927f-0ba1-4c07-81ea-0e45a56d059f", "ru": "В общежи́тии (общежи́тие)", "stress": "В общежи́тии (общежи́тие)", "vi": "Ký túc xá", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "Ký túc xá (Cơ sở học tập) | Hoạt động: ở", "ex": "Я живу́ в общежи́тии № 5. (Tôi sống ở ký túc xá số 5.)"}, {"vocab_id": "9979f43d-f3d6-4a0a-884d-10ecfec0e420", "ru": "- На заня́тии (заня́тие): + На ле́кции (ле́кция) + На семина́ре (семина́р)", "stress": "- На заня́тии (заня́тие): + На ле́кции (ле́кция) + На семина́ре (семина́р)", "vi": "- Buổi học: + Giảng đường + Buổi thảo luận chuyên đề (seminar)", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "- Buổi học: + Giảng đường + Buổi thảo luận chuyên đề (seminar) (Cơ sở học tập) | Hoạt động: nghe giảng - thuyết trình", "ex": "- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́. - Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях. - Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах. (- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm. - Tôi đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường. - Tôi đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar.)"}, {"vocab_id": "fc9b14d5-c44b-4b45-ac80-c3370d52edc8", "ru": "В лаборато́рии (лаборато́рия)", "stress": "В лаборато́рии (лаборато́рия)", "vi": "Phòng thí nghiệm", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở học tập", "note": "Phòng thí nghiệm (Cơ sở học tập) | Hoạt động: nghiên cứu", "ex": "Сего́дня я иду́ в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии. (Hôm nay tôi đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm.)"}, {"vocab_id": "bf67069b-c8e4-45cd-b97f-2fb40100becd", "ru": "В апте́ке (апте́ка)", "stress": "В апте́ке (апте́ка)", "vi": "Hiệu thuốc", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở y tế", "note": "Hiệu thuốc (Cơ sở y tế) | Hoạt động: mua thuốc", "ex": "Когда я боле́ю, я иду́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це. (Khi tôi ốm, tôi đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.)"}, {"vocab_id": "e92ff294-e6e5-494a-8f76-38e244224854", "ru": "- В поликли́нике (поликли́ника) - В больни́це (больни́ца)", "stress": "- В поликли́нике (поликли́ника) - В больни́це (больни́ца)", "vi": "- Phòng khám - Bệnh viện", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở y tế", "note": "- Phòng khám - Bệnh viện (Cơ sở y tế) | Hoạt động: đi gặp bác sĩ (đi khám bệnh)", "ex": ""}, {"vocab_id": "c5cdcd77-258c-4958-a0c1-c1238aa41133", "ru": "- В музе́е (музе́й) - На вы́ставке (вы́ставка)", "stress": "- В музе́е (музе́й) - На вы́ставке (вы́ставка)", "vi": "- Bảo tàng - Buổi triển lãm", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "- Bảo tàng - Buổi triển lãm (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem tranh", "ex": "Я иду́ в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках. (Tôi đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng ở những buổi triển lãm.)"}, {"vocab_id": "56d9949a-c0b7-445c-8733-dc6992bd7b5f", "ru": "В теа́тре (теа́тр)", "stress": "В теа́тре (теа́тр)", "vi": "Nhà hát", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Nhà hát (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem vở kịch", "ex": "Я иду́ в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре. (Tôi đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát.)"}, {"vocab_id": "58a926de-c115-42ae-b401-4a44128d052b", "ru": "На конце́рте (конце́рт)", "stress": "На конце́рте (конце́рт)", "vi": "Buổi hòa nhạc", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Buổi hòa nhạc (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: nghe nhạc, xem biểu diễn", "ex": "Я иду́ на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах. (Tôi đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc.)"}, {"vocab_id": "929e1b79-eea9-4658-9a26-aedd33da13ff", "ru": "В кинотеа́тре (кинотеа́тр)", "stress": "В кинотеа́тре (кинотеа́тр)", "vi": "Rạp chiếu phim", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Rạp chiếu phim (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem phim", "ex": "Я иду́ в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре. (Tôi đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim.)"}, {"vocab_id": "eb569da6-0901-40bd-b046-6d6b72d17145", "ru": "В клу́бе (клуб)", "stress": "В клу́бе (клуб)", "vi": "Câu lạc bộ", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Câu lạc bộ (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: gặp gỡ ai?", "ex": "Я иду́ в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе. (Tôi đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ.)"}, {"vocab_id": "aa87dad3-67f6-4fc7-a0ee-fd0a6c964d89", "ru": "На дискоте́ке (дискоте́ка)", "stress": "На дискоте́ке (дискоте́ка)", "vi": "Vũ trường", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Vũ trường (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: nhảy, nghe nhạc", "ex": "Я иду́ на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке. (Tôi đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường.)"}, {"vocab_id": "3d5de706-9ed4-4958-a682-ce5a02e0312d", "ru": "В ци́рке (цирк)", "stress": "В ци́рке (цирк)", "vi": "Rạp xiếc", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Rạp xiếc (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem xiếc", "ex": "Я иду́ в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке. (Tôi đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc.)"}, {"vocab_id": "ebb22024-7701-43db-be12-04044b2f08e8", "ru": "В зоопа́рке (зоопа́рк)", "stress": "В зоопа́рке (зоопа́рк)", "vi": "Sở thú", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Sở thú (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem động vật", "ex": "Я иду́ в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке. (Tôi đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú.)"}, {"vocab_id": "b641abf4-aa95-4830-abee-c1dd17dbcc74", "ru": "На стадио́не (стадио́н)", "stress": "На стадио́не (стадио́н)", "vi": "Sân vận động", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Sân vận động (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: xem trận đấu, chơi cái gì?", "ex": "Я иду́ на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не. (Tôi đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động.)"}, {"vocab_id": "db3ba353-114a-4a29-b2e0-7be05960b88b", "ru": "На экску́рсии (экску́рсия)", "stress": "На экску́рсии (экску́рсия)", "vi": "Chuyến tham quan", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở vui chơi giải trí, thể thao", "note": "Chuyến tham quan (Cơ sở vui chơi giải trí, thể thao) | Hoạt động: tham quan", "ex": "Я иду́ на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии. (Tôi đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan.)"}, {"vocab_id": "5f925e58-1e66-49fd-a0bd-4cb3ea98da0d", "ru": "В магази́не (магази́н)", "stress": "В магази́не (магази́н)", "vi": "Cửa hàng", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Cửa hàng (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: mua", "ex": "Я иду́ в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не. (Tôi đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng.)"}, {"vocab_id": "90893123-b19a-4e90-bec6-37cfd4a6ed33", "ru": "В ба́нке (банк)", "stress": "В ба́нке (банк)", "vi": "Ngân hàng", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Ngân hàng (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: đổi tiền", "ex": "Я иду́ в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке. (Tôi đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng.)"}, {"vocab_id": "edbe8b03-d316-4ee1-bb56-c10eb9f700f4", "ru": "На по́чте (по́чта)", "stress": "На по́чте (по́чта)", "vi": "Bưu điện", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Bưu điện (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: gửi - nhận", "ex": "Я иду́ на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я опя́ть иду́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте. (Tôi đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày tôi lại đến bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện.)"}, {"vocab_id": "8d101837-c2b5-4b78-bcec-a9d89e6a4d41", "ru": "В па́рке (парк) - В кио́ске (кио́ск)", "stress": "В па́рке (парк) - В кио́ске (кио́ск)", "vi": "Công viên - Киоск", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Công viên - Киоск (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: mua", "ex": "Я иду́ в парк, что́бы гуля́ть, я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я иду́ в кио́ск, что́бы купи́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке. (Tôi đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên.)"}, {"vocab_id": "021e6aa3-9c93-4976-abce-54f76c11561e", "ru": "В рестора́не (рестора́н)", "stress": "В рестора́не (рестора́н)", "vi": "Nhà hàng", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Nhà hàng (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: ăn", "ex": "Я иду́ в рестора́н, что́бы поу́жинать с де́вушкой. Я ча́сто у́жинаю с де́вушкой в рестора́не. (Tôi đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng.)"}, {"vocab_id": "8ea58219-a067-4cbb-9cfe-80492ba53f6b", "ru": "В столово́й (столо́вая)", "stress": "В столово́й (столо́вая)", "vi": "Nhà ăn", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Nhà ăn (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: ăn", "ex": "По́сле заня́тий, я иду́ в столову́ю, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой. (Sau buổi học, tôi đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn.)"}, {"vocab_id": "19bedf55-0995-463a-bb80-68bb66649f3d", "ru": "В кафе́ (кафе́)", "stress": "В кафе́ (кафе́)", "vi": "Cafe", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Cafe (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: uống", "ex": "Сего́дня у́тром я иду́ в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро. (Sáng hôm nay tôi đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng.)"}, {"vocab_id": "c485540d-f161-4d8c-8ff4-c3c86dafc49f", "ru": "- В фи́рме (фи́рма) - На заво́де (заво́д) - На фа́брике (фа́брика)", "stress": "- В фи́рме (фи́рма) - На заво́де (заво́д) - На фа́брике (фа́брика)", "vi": "- Công ty - Nhà máy - Xưởng sản xuất", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "- Công ty - Nhà máy - Xưởng sản xuất (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: làm việc", "ex": "Я иду́ в фи́рму/ на заво́д/ на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день. (Tôi đi đến công ty/ nhà máy/ xưởng để làm việc. Tôi thường làm việc ở công ty/ ở nhà máy/ ở xưởng mỗi ngày.)"}, {"vocab_id": "dab5dd54-0b89-4e35-9b4a-aa6551671731", "ru": "В гости́нице (гости́ница)", "stress": "В гости́нице (гости́ница)", "vi": "Khách sạn", "pos": "Noun", "gender": null, "sub_topic": "Cơ sở thương mại, dịch vụ, kinh tế", "note": "Khách sạn (Cơ sở thương mại, dịch vụ, kinh tế) | Hoạt động: ở", "ex": "Я живу́ в гости́нице. (Tôi đang ở khách sạn.)"}, {"vocab_id": "fab4792c-4592-4337-8e47-aa36f745170b", "ru": "В гараже́ (гара́ж)", "stress": "В гараже́ (гара́ж)", "vi": "Ga-ra", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến phương tiện giao thông", "note": "Ga-ra (Liên quan đến phương tiện giao thông) | Hoạt động: lấy (ô tô), cát (ô tô)", "ex": "Я иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто храню́ их в гара́же. (Tôi đi đến ga-ra để lấy ô tô / xe máy / xe đạp. Tôi thường cất giữ chúng ở ga-ra.)"}, {"vocab_id": "dc4d2618-0f13-4811-88d2-d4cd1e4bba75", "ru": "На остано́вке (остано́вка)", "stress": "На остано́вке (остано́вка)", "vi": "Trạm buýt", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến phương tiện giao thông", "note": "Trạm buýt (Liên quan đến phương tiện giao thông) | Hoạt động: đợi", "ex": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус/ тролле́йбус/ трамва́й . Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке. (Tôi đi đến trạm dừng để đợi xe buýt / xe điện bánh hơi / tàu điện. Tôi thường đợi xe buýt / xe điện bánh hơi / tàu điện ở trạm dừng.)"}, {"vocab_id": "7c5fd98d-0e51-453a-9c13-b00d35753d64", "ru": "На ста́нции (ста́нция)", "stress": "На ста́нции (ста́нция)", "vi": "Trạm tàu điện ngầm", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến phương tiện giao thông", "note": "Trạm tàu điện ngầm (Liên quan đến phương tiện giao thông) | Hoạt động: đợi", "ex": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции метро́. (Tôi đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm.)"}, {"vocab_id": "2f13becf-b378-4994-8696-e6af9d912648", "ru": "На вокза́ле (вокза́л)", "stress": "На вокза́ле (вокза́л)", "vi": "Nhà ga", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến phương tiện giao thông", "note": "Nhà ga (Liên quan đến phương tiện giao thông) | Hoạt động: đợi", "ex": "Я иду́ на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде. (Tôi đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa.)"}, {"vocab_id": "5618e40b-82cd-4ba6-8e50-abd81194f645", "ru": "На реке́ (река́), на о́зере (о́зеро)", "stress": "На реке́ (река́), на о́зере (о́зеро)", "vi": "Sông, hồ", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến thiên nhiên", "note": "Sông, hồ (Liên quan đến thiên nhiên) | Hoạt động: câu cá, bơi", "ex": "- Я иду́ на ре́ку, что́бы пойма́ть ры́бу. Я ча́сто ловлю́ ры́бу на реке́. - Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю на о́зере. (- Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông. - Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ.)"}, {"vocab_id": "d3d0b06c-a5f5-4ab0-846d-52c61b3d1919", "ru": "На мо́ре (мо́ре)", "stress": "На мо́ре (мо́ре)", "vi": "Biển", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến thiên nhiên", "note": "Biển (Liên quan đến thiên nhiên) | Hoạt động: ngắm hoàng hôn", "ex": "Я иду́ на мо́ре, что́бы смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре. (Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển.)"}, {"vocab_id": "68248cde-1f5b-4663-b473-aeac28fff308", "ru": "В саду́ (сад)", "stress": "В саду́ (сад)", "vi": "Vườn", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến thiên nhiên", "note": "Vườn (Liên quan đến thiên nhiên) | Hoạt động: trồng hoa, trồng rau", "ex": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́. (Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn.)"}, {"vocab_id": "089732cd-ca15-4d17-8f00-586182535135", "ru": "В гора́х (гора́)", "stress": "В гора́х (гора́)", "vi": "Núi", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến thiên nhiên", "note": "Núi (Liên quan đến thiên nhiên) | Hoạt động: leo núi", "ex": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры. (Tôi đi lên núi để leo núi. Tôi rất thích leo núi.)"}, {"vocab_id": "5208fe8b-5c37-4f24-a676-ab5e1005232d", "ru": "В лесу́ (лес)", "stress": "В лесу́ (лес)", "vi": "Rừng", "pos": "Noun", "gender": null, "sub_topic": "Liên quan đến thiên nhiên", "note": "Rừng (Liên quan đến thiên nhiên) | Hoạt động: hái nấm", "ex": "Я иду́ в лес, что́бы собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́. (Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng.)"}, {"vocab_id": "98bf535f-6d69-4e4a-a06c-c680e7193a98", "ru": "- учи́ться в/на где?(С6) - учи́ть что?(С4)", "stress": "- учи́ться в/на где?(С6) - учи́ть что?(С4)", "vi": "- học ở đâu? (C6) - học cái gì? (C4)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "- học ở đâu? (C6) - học cái gì? (C4) (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "ca8b07b6-f263-45a6-8964-a59b9198d23f", "ru": "изуча́ть / изучи́ть", "stress": "изуча́ть / изучи́ть", "vi": "nghiên cứu", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "nghiên cứu (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "a347ccf7-6ad3-4ae4-86d4-9fae0d44dc28", "ru": "чита́ть / прочита́ть", "stress": "чита́ть / прочита́ть", "vi": "đọc", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "đọc (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "c7286fde-64f2-47db-b122-80e1398fca89", "ru": "встреча́ться / встре́титься с кем?", "stress": "встреча́ться / встре́титься с кем?", "vi": "gặp gỡ với ai?", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "gặp gỡ với ai? (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "39a6f8d8-0ab1-44cc-a62c-0a868e8377b0", "ru": "подава́ть / прода́ть (докуме́нты)", "stress": "подава́ть / прода́ть (докуме́нты)", "vi": "nộp (tài liệu)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "nộp (tài liệu) (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "10ff874d-fa35-4570-b8f7-da0cc16c1833", "ru": "получа́ть / получи́ть (докуме́нты)", "stress": "получа́ть / получи́ть (докуме́нты)", "vi": "nhận (tài liệu)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "nhận (tài liệu) (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "85638859-15b1-4829-b7d2-6db234071c73", "ru": "жить", "stress": "жить", "vi": "sống", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "sống (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "66ff2e26-4637-4d4d-9de7-6cf23233a35c", "ru": "слу́шать (ле́кцию, му́зыку)", "stress": "слу́шать (ле́кцию, му́зыку)", "vi": "nghe (bài giảng, nhạc)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "nghe (bài giảng, nhạc) (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "8f1d5a4a-071e-4810-9336-8a94dfd0c950", "ru": "выступа́ть / вы́ступить", "stress": "выступа́ть / вы́ступить", "vi": "phát biểu", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "phát biểu (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "3ae9249e-266a-4d49-9d9c-555a6543e43f", "ru": "иссле́довать", "stress": "иссле́довать", "vi": "nghiên cứu", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "nghiên cứu (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "474dec24-de9f-401e-b0f2-a7e91dcd91a2", "ru": "покупа́ть / купи́ть лека́рства", "stress": "покупа́ть / купи́ть лека́рства", "vi": "mua thuốc", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "mua thuốc (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "48729cf8-335c-42fd-b54b-e4dfe9b14582", "ru": "идти́/е́хать к врачу́", "stress": "идти́/е́хать к врачу́", "vi": "đi đến chỗ bác sĩ", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "đi đến chỗ bác sĩ (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "a278e8e8-1d52-4d5a-8acc-ae3c09fc4142", "ru": "смотре́ть / посмотре́ть карти́ны", "stress": "смотре́ть / посмотре́ть карти́ны", "vi": "xem tranh", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem tranh (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "90d192dc-b1e1-4a04-b4c7-13adfc305879", "ru": "смотре́ть / посмотре́ть спекта́кль", "stress": "смотре́ть / посмотре́ть спекта́кль", "vi": "xem vở kịch", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem vở kịch (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "ca769eaf-86ae-4422-b99b-5bfd444e4a9d", "ru": "смотре́ть / посмотре́ть выступле́ние", "stress": "смотре́ть / посмотре́ть выступле́ние", "vi": "xem buổi biểu diễn", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem buổi biểu diễn (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "231f4156-36e0-4e9b-9862-7c1b7e3463dd", "ru": "смотре́ть / посмотре́ть фильм", "stress": "смотре́ть / посмотре́ть фильм", "vi": "xem phim", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem phim (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "24e7450c-21f1-401a-bcd3-d6ced5336acb", "ru": "посеща́ть / посети́ть", "stress": "посеща́ть / посети́ть", "vi": "thăm", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "thăm (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "df07ccf8-ffaa-495f-83b5-ff6649748096", "ru": "танцева́ть", "stress": "танцева́ть", "vi": "nhảy múa", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "nhảy múa (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "c94a70ce-83f4-40fd-b9b7-3b492adaabc3", "ru": "смотре́ть / посмотре́ть цирк", "stress": "смотре́ть / посмотре́ть цирк", "vi": "xem xiếc", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem xiếc (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "9a83ed5f-76bc-4eb4-bff9-d1b28771c54f", "ru": "смотре́ть / посмотре́ть живо́тных", "stress": "смотре́ть / посмотре́ть живо́тных", "vi": "xem động vật", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem động vật (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "11fdcbb3-7c7e-4632-8a40-29642417a75f", "ru": "смотре́ть / посмотре́ть матч", "stress": "смотре́ть / посмотре́ть матч", "vi": "xem trận đấu", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "xem trận đấu (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "61504da0-3198-485d-9c60-78228db4d206", "ru": "игра́ть / сыгра́ть в что?", "stress": "игра́ть / сыгра́ть в что?", "vi": "chơi cái gì?", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "chơi cái gì? (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "cbbc3768-9109-42f0-af99-cb1bef081c9c", "ru": "меня́ть / поменя́ть де́ньги", "stress": "меня́ть / поменя́ть де́ньги", "vi": "đổi tiền", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "đổi tiền (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "746100da-102a-40a5-bcba-43b12b29854b", "ru": "отправля́ть / отпра́вить (письмо́)", "stress": "отправля́ть / отпра́вить (письмо́)", "vi": "gửi (thư)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "gửi (thư) (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "e1a29c5f-30d1-4496-ad9b-5ac2ed35fb8a", "ru": "гуля́ть / погуля́ть", "stress": "гуля́ть / погуля́ть", "vi": "đi dạo", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "đi dạo (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "d1936fc3-d4fb-49e3-a61a-f492b810c615", "ru": "есть / съесть", "stress": "есть / съесть", "vi": "ăn", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "ăn (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "1d337589-d1ef-4ca0-b670-7501312b736f", "ru": "пить / вы́пить", "stress": "пить / вы́пить", "vi": "uống", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "uống (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "40d6cd80-78db-47e6-83b5-c73f5cc1cb2a", "ru": "рабо́тать", "stress": "рабо́тать", "vi": "làm việc", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "làm việc (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "9c43bf1b-f1b0-40e5-9e8e-700463c4022d", "ru": "брать / взять (маши́ну)", "stress": "брать / взять (маши́ну)", "vi": "lấy (xe)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "lấy (xe) (Động từ nơi chốn)", "ex": ""}, {"vocab_id": "21754774-7335-4a76-9bd0-2708ee883fb9", "ru": "храни́ть / сохрани́ть (маши́ну)", "stress": "храни́ть / сохрани́ть (маши́ну)", "vi": "cất (xe)", "pos": "Verb", "gender": null, "sub_topic": "Động từ thao tác & nơi chốn", "note": "cất (xe) (Động từ nơi chốn)", "ex": ""}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'Đồ ăn - Đồ uống', 'do_an_uong', 'A1', '🍲', 'Món ăn chính, món tráng miệng, hoa quả, rau củ quả, đồ uống, phương tiện chế biến và thao tác nấu ăn.', true,
  '["Món chính và món phụ", "Món tráng miệng, ăn nhẹ", "Hoa quả", "Rau củ quả", "Đồ uống", "Động từ nấu nướng & chế biến"]'::jsonb, 46, '[{"vocab_id": "864d4459-c5ec-4912-a182-9c7c8a33321d", "ru": "суп", "stress": "суп", "vi": "súp", "pos": "Noun", "gender": "m", "sub_topic": "Món chính và món phụ", "note": "súp (Món chính/phụ) | Nấu bằng: - в кастрю́ле (bằng nồi) - на сковороде́ (bằng chảo) - в рисова́рке (bằng nồi cơm điện)", "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом, потому́ что сего́дня хочу́ съесть суп с хле́бом. (Tôi đang nấu súp bằng nồi trên bếp. Tôi nấu súp để ăn với bánh mì, vì hôm nay tôi muốn ăn súp với bánh mì.)"}, {"vocab_id": "0c3cb11d-a702-4f43-bc90-374b839b444e", "ru": "рис", "stress": "рис", "vi": "cơm", "pos": "Noun", "gender": "m", "sub_topic": "Món chính và món phụ", "note": "cơm (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой, потому́ что я обы́чно у́жинаю рисом с ры́бой. (Tôi đang nấu cơm bằng nồi cơm điện. Tôi nấu cơm để ăn với cá, vì tôi thường ăn tối bằng cơm với cá.)"}, {"vocab_id": "23e08ab5-def3-444d-aa95-ae745716f013", "ru": "мя́со", "stress": "мя́со", "vi": "thịt", "pos": "Noun", "gender": "n", "sub_topic": "Món chính và món phụ", "note": "thịt (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой, потому́ что я обы́чно ем мя́со с рисом и ры́бой на у́жин. (Tôi đang luộc thịt bằng nồi trên bếp. Tôi nấu thịt để ăn với cơm và với cá, vì tôi thường ăn thịt với cơm và với cá vào bữa tối.)"}, {"vocab_id": "4b4c6aac-b81c-4f52-875b-64dff62adf80", "ru": "пельме́ни", "stress": "пельме́ни", "vi": "sủi cảo Nga", "pos": "Noun", "gender": "pl", "sub_topic": "Món chính và món phụ", "note": "sủi cảo Nga (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом, потому́ что я обы́чно завтра́каю пельме́нями с хле́бом. (Tôi đang luộc pelmeni bằng nồi trên bếp. Tôi nấu pelmeni để ăn với bánh mì, vì tôi thường ăn sáng bằng pelmeni với bánh mì.)"}, {"vocab_id": "e7b38283-46f8-4511-a275-c61075110847", "ru": "ка́ша", "stress": "ка́ша", "vi": "cháo", "pos": "Noun", "gender": "f", "sub_topic": "Món chính và món phụ", "note": "cháo (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы есть её на за́втрак с тёплым молоко́м, потому́ что я обы́чно завтра́каю ка́шей с тёплым молоко́м. (Tôi đang nấu cháo bằng nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm, vì tôi thường ăn sáng bằng cháo với sữa ấm.)"}, {"vocab_id": "f28a367a-1119-4b8c-bcf1-79b14144d419", "ru": "ры́ба", "stress": "ры́ба", "vi": "cá", "pos": "Noun", "gender": "f", "sub_topic": "Món chính và món phụ", "note": "cá (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом, потому́ что я обы́чно обе́даю ры́бой с рисом и мя́сом. (Tôi đang rán cá bằng chảo trên bếp. Tôi nấu cá để ăn với cơm và với thịt, vì tôi thường ăn trưa bằng cá với cơm và với thịt.)"}, {"vocab_id": "213a487d-6fd6-4343-9f9c-3dd8106c3ba9", "ru": "ку́рица", "stress": "ку́рица", "vi": "gà", "pos": "Noun", "gender": "f", "sub_topic": "Món chính và món phụ", "note": "gà (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том, потому́ что я обы́чно ем ку́рицу с сала́том на обе́д. (Tôi đang luộc gà bằng nồi trên bếp. Tôi luộc gà để ăn với salad, vì tôi thường ăn gà với salad vào bữa trưa.)"}, {"vocab_id": "27074322-608f-4acb-ba88-c40cd6eed477", "ru": "яйцо́", "stress": "яйцо́", "vi": "trứng", "pos": "Noun", "gender": "pl", "sub_topic": "Món chính và món phụ", "note": "trứng (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом, потому́ что я люблю́ есть яйца́ с хле́бом. (Tôi đang luộc trứng bằng nồi trên bếp. Tôi luộc trứng để ăn với bánh mì, vì tôi thích ăn trứng với bánh mì.)"}, {"vocab_id": "63911cb9-74d4-43ee-b9ea-77ae1832193f", "ru": "сала́т", "stress": "сала́т", "vi": "salad", "pos": "Noun", "gender": "m", "sub_topic": "Món chính và món phụ", "note": "salad (Món chính/phụ) | Nấu bằng: ", "ex": "Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м, потому́ что я люблю́ есть сала́т с яйцо́м. (Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng, vì tôi thích ăn salad với trứng.)"}, {"vocab_id": "f45e9927-48ca-46c9-a301-299336277bf7", "ru": "Шокола́д", "stress": "Шокола́д", "vi": "So cô la", "pos": "Noun", "gender": "m", "sub_topic": "Món tráng miệng, ăn nhẹ", "note": "So cô la (Tráng miệng & Ăn nhẹ)", "ex": "После за́втрака (1) я обы́чно переку́сываю шоколáдом с йогу́ртом. (Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua)"}, {"vocab_id": "03995c22-f5c3-40c0-9904-ec79bdb27eb0", "ru": "Моро́женое", "stress": "Моро́женое", "vi": "Kem", "pos": "Noun", "gender": "n", "sub_topic": "Món tráng miệng, ăn nhẹ", "note": "Kem (Tráng miệng & Ăn nhẹ)", "ex": "Ле́том (2) я обы́чно ем моро́женое. (Vào mùa hè, tôi thường ăn kem.)"}, {"vocab_id": "d7f717df-c0e1-48a7-af23-5c4497f13007", "ru": "Торт", "stress": "Торт", "vi": "Bánh kem", "pos": "Noun", "gender": "m", "sub_topic": "Món tráng miệng, ăn nhẹ", "note": "Bánh kem (Tráng miệng & Ăn nhẹ)", "ex": "На ка́ждый мой день (3) рожде́ния мама покупа́ет мне торт. (Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi)"}, {"vocab_id": "b43b80e1-ed5e-4b55-9617-beeda97382c3", "ru": "Йогу́рт", "stress": "Йогу́рт", "vi": "Sữa chua", "pos": "Noun", "gender": "m", "sub_topic": "Món tráng miệng, ăn nhẹ", "note": "Sữa chua (Tráng miệng & Ăn nhẹ)", "ex": "Я обы́чно ем йогу́рт на полдни́к. (Tôi thường ăn nhẹ sữa chua vào bữa phụ.)"}, {"vocab_id": "84495d5f-fdab-42e5-974d-a6fc92f06e90", "ru": "Я́блоко", "stress": "Я́блоко", "vi": "táo", "pos": "Noun", "gender": "n", "sub_topic": "Hoa quả", "note": "táo (Hoa quả)", "ex": "Я мо́ю я́блоки, гру́ши и манго́, чищу́ их, а зате́м нареза́ю их, что́бы съесть. (Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.)"}, {"vocab_id": "433c8a35-867d-47b7-8274-c98053ea3662", "ru": "Гру́ша", "stress": "Гру́ша", "vi": "lê", "pos": "Noun", "gender": "f", "sub_topic": "Hoa quả", "note": "lê (Hoa quả)", "ex": "Я люблю́ есть груша ка́ждый день. (Tôi thích ăn lê mỗi ngày.)"}, {"vocab_id": "83cffcff-3d43-42f3-b33f-1062b7ba0275", "ru": "Манго́", "stress": "Манго́", "vi": "xoài", "pos": "Noun", "gender": "m", "sub_topic": "Hoa quả", "note": "xoài (Hoa quả)", "ex": "Я люблю́ есть манго ка́ждый день. (Tôi thích ăn xoài mỗi ngày.)"}, {"vocab_id": "51e20180-5610-4d9b-bdb0-7eb3b289fa2d", "ru": "Апельси́н", "stress": "Апельси́н", "vi": "cam", "pos": "Noun", "gender": "m", "sub_topic": "Hoa quả", "note": "cam (Hoa quả)", "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина. (Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.)"}, {"vocab_id": "19109965-228e-4187-9af7-68f37b0549c9", "ru": "Мандари́н", "stress": "Мандари́н", "vi": "quýt", "pos": "Noun", "gender": "m", "sub_topic": "Hoa quả", "note": "quýt (Hoa quả)", "ex": "Я люблю́ есть мандарин ка́ждый день. (Tôi thích ăn quýt mỗi ngày.)"}, {"vocab_id": "e3244185-27f6-4d90-824c-5558ddd1190f", "ru": "Бана́н", "stress": "Бана́н", "vi": "chuối", "pos": "Noun", "gender": "m", "sub_topic": "Hoa quả", "note": "chuối (Hoa quả)", "ex": "Я люблю́ есть банан ка́ждый день. (Tôi thích ăn chuối mỗi ngày.)"}, {"vocab_id": "14777c3f-e795-4d99-a143-8fa3938af0e7", "ru": "Арбу́з", "stress": "Арбу́з", "vi": "dưa hấu", "pos": "Noun", "gender": "m", "sub_topic": "Hoa quả", "note": "dưa hấu (Hoa quả)", "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й. (Tôi bổ quả dưa hấu để mời khách ăn.)"}, {"vocab_id": "92c1e4a3-cac1-4ff7-bf61-3cd36ef2c9ef", "ru": "Виногра́д", "stress": "Виногра́д", "vi": "nho", "pos": "Noun", "gender": "m", "sub_topic": "Hoa quả", "note": "nho (Hoa quả)", "ex": "Я мо́ю виногра́д и кладу́ его́ на таре́лку. (Tôi rửa sạch nho và đặt lên đĩa.)"}, {"vocab_id": "2ebcd15b-54df-4269-9dc0-83ec2f754898", "ru": "Карто́фель", "stress": "Карто́фель", "vi": "khoai tây", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "khoai tây (Rau củ quả) | Chế biến: rửa sạch --> gọt vỏ --> thái", "ex": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть. (Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ.)"}, {"vocab_id": "4552c1b8-5b22-4d01-a6cc-1cde35d73e8a", "ru": "Помидо́р", "stress": "Помидо́р", "vi": "cà chua", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "cà chua (Rau củ quả) | Chế biến: rửa sạch --> thái --> băm nhỏ", "ex": "Помо́йте помидо́ры, пото́м нарежьте их и измельчи́те. (Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng.)"}, {"vocab_id": "bfb5a9b3-d17f-40eb-8b02-ff4a9ac7c252", "ru": "Бата́т", "stress": "Бата́т", "vi": "khoai lang", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "khoai lang (Rau củ quả) | Chế biến: rửa sạch --> thái", "ex": "Я мо́ю карто́шку, пото́м кладу́ её в кастрю́лю с водо́й и варю́. (Tôi rửa sạch khoai, sau đó cho vào nồi cùng với nước và nấu.)"}, {"vocab_id": "6d09113f-1787-4a8c-bf31-41db7a42d1f2", "ru": "Огуре́ц", "stress": "Огуре́ц", "vi": "dưa chuột", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "dưa chuột (Rau củ quả) | Chế biến: rửa sạch --> thái", "ex": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом. (Tôi đang rửa sạch dưa chuột, sau đó tôi cắt nhỏ dưa chuột bằng dao.)"}, {"vocab_id": "96d657bc-ad2a-43d3-ae8b-0e5864a56af9", "ru": "Зелёный лук", "stress": "Зелёный лук", "vi": "hành lá", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "hành lá (Rau củ quả) | Chế biến: rửa sạch --> thái", "ex": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом. (Tôi đang rửa sạch hành lá, sau đó thái nhỏ bằng dao.)"}, {"vocab_id": "a311be04-1cac-407f-abdf-af71ee4fbdcb", "ru": "Лук", "stress": "Лук", "vi": "hành tây", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "hành tây (Rau củ quả) | Chế biến: bóc vỏ --> thái --> băm nhỏ", "ex": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом. (Tôi đang bóc vỏ hành tây, sau đó bổ chúng và băm nhỏ chúng bằng dao.)"}, {"vocab_id": "8c94d8e3-6b76-47bf-a7c5-586ddca448df", "ru": "Чесно́к", "stress": "Чесно́к", "vi": "tỏi", "pos": "Noun", "gender": "m", "sub_topic": "Rau củ quả", "note": "tỏi (Rau củ quả) | Chế biến: bóc vỏ --> đập --> băm nhỏ", "ex": "Я чищу́ чесно́к, пото́м раздавлива́ю его́ но́жом и измельча́ю. (Tôi bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng.)"}, {"vocab_id": "b7b15f7d-2961-43ac-81a8-dfbd36903caa", "ru": "Капу́ста", "stress": "Капу́ста", "vi": "bắp tỏi", "pos": "Noun", "gender": "f", "sub_topic": "Rau củ quả", "note": "bắp tỏi (Rau củ quả) | Chế biến: rửa sạch --> bổ --> thái nhỏ", "ex": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю её и нареза́ю. (Tôi đang rửa sạch bắp cải, sau đó bổ chúng và thái nhỏ chúng.)"}, {"vocab_id": "d7b78f5f-ac35-4961-afdd-b0679299853a", "ru": "Ты́ква", "stress": "Ты́ква", "vi": "bí đỏ", "pos": "Noun", "gender": "f", "sub_topic": "Rau củ quả", "note": "bí đỏ (Rau củ quả) | Chế biến: rửa sạch --> gọt vỏ --> bổ --> thái nhỏ.", "ex": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю её и нареза́ю. (Tôi đang rửa sạch bí đỏ và gọt vỏ chúng, sau đó bổ chúng và thái nhỏ chúng.)"}, {"vocab_id": "b16b10f9-2a99-46e3-9abd-24a269b829c1", "ru": "Чай", "stress": "Чай", "vi": "trà", "pos": "Noun", "gender": "m", "sub_topic": "Đồ uống", "note": "trà (Đồ uống)", "ex": "Я налива́ю чай в стака́н и пью чай из стака́на. (Tôi rót trà vào cốc và uống trà bằng cốc.)"}, {"vocab_id": "21585116-ff26-4518-a473-0d255d319aff", "ru": "Молоко́", "stress": "Молоко́", "vi": "sữa", "pos": "Noun", "gender": "m", "sub_topic": "Đồ uống", "note": "sữa (Đồ uống)", "ex": "Я налива́ю молоко в стака́н и пью молоко из стака́на. (Tôi rót sữa vào cốc và uống sữa từ cốc.)"}, {"vocab_id": "df793e21-3b65-466a-bd07-c95e763276db", "ru": "Кока-ко́ла", "stress": "Кока-ко́ла", "vi": "Coca-cola", "pos": "Noun", "gender": "f", "sub_topic": "Đồ uống", "note": "Coca-cola (Đồ uống)", "ex": "Я налива́ю кока-кола в стака́н и пью кока-кола из стака́на. (Tôi rót coca-cola vào cốc và uống coca-cola từ cốc.)"}, {"vocab_id": "e6306cbb-2cc8-487b-88d1-5aa19232a369", "ru": "Пи́во", "stress": "Пи́во", "vi": "bia", "pos": "Noun", "gender": "n", "sub_topic": "Đồ uống", "note": "bia (Đồ uống)", "ex": "Я налива́ю пиво в стака́н и пью пиво из стака́на. (Tôi rót bia vào cốc và uống bia từ cốc.)"}, {"vocab_id": "24ae9ab5-3f71-48a1-9629-3f34a04910e0", "ru": "Сок", "stress": "Сок", "vi": "nước ép", "pos": "Noun", "gender": "m", "sub_topic": "Đồ uống", "note": "nước ép (Đồ uống)", "ex": "Я налива́ю сок в стака́н и пью сок из стака́на. (Tôi rót nước ép vào cốc và uống nước ép từ cốc.)"}, {"vocab_id": "f9fd3142-10ca-407a-9dec-230281162d39", "ru": "Вода́", "stress": "Вода́", "vi": "nước", "pos": "Noun", "gender": "m", "sub_topic": "Đồ uống", "note": "nước (Đồ uống)", "ex": "Я налива́ю вода в стака́н и пью вода из стака́на. (Tôi rót nước vào cốc và uống nước từ cốc.)"}, {"vocab_id": "dab0d9f2-913e-45c8-bfee-6664d91e1a17", "ru": "Алкого́ль / Вино́", "stress": "Алкого́ль / Вино́", "vi": "rượu/ rượu vang", "pos": "Noun", "gender": "m", "sub_topic": "Đồ uống", "note": "rượu/ rượu vang (Đồ uống)", "ex": "Я налива́ю вино́ в ча́шку и пью вино́ из ча́шки. (Tôi rót rượu vang vào chén và uống rượu bằng chén.)"}, {"vocab_id": "9c9b5d99-388e-4286-87b3-c7a18a802a7d", "ru": "гото́вить / пригото́вить", "stress": "гото́вить / пригото́вить", "vi": "nấu", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "nấu (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "c99173ac-54bc-424a-98fc-992b96dc0ca8", "ru": "вари́ть / свари́ть", "stress": "вари́ть / свари́ть", "vi": "luộc", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "luộc (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "f1a9ce3c-7c52-4cfb-96fb-a819a34f4e3e", "ru": "жа́рить / изжа́рить", "stress": "жа́рить / изжа́рить", "vi": "rán, chiên", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "rán, chiên (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "1a112dd4-0b91-4177-8d29-f9def0704394", "ru": "переку́сывать / перекуси́ть", "stress": "переку́сывать / перекуси́ть", "vi": "ăn nhẹ", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "ăn nhẹ (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "7b1dd164-1f9e-4f74-ac78-f21af9350899", "ru": "мыть / помы́ть", "stress": "мыть / помы́ть", "vi": "rửa", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "rửa (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "f34a3683-2d2e-4bb2-9159-bdd4117d7784", "ru": "чи́стить / почи́стить", "stress": "чи́стить / почи́стить", "vi": "gọt vỏ, làm sạch", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "gọt vỏ, làm sạch (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "089fb8d2-f82f-47d0-927d-859c1f4e849b", "ru": "ре́зать — разре́зать — нареза́ть — измельча́ть", "stress": "ре́зать — разре́зать — нареза́ть — измельча́ть", "vi": "cắt - cắt đôi - thái lát - băm nhỏ", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "cắt - cắt đôi - thái lát - băm nhỏ (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "62e228ca-c717-4a81-a712-ed50ece28158", "ru": "есть / съесть", "stress": "есть / съесть", "vi": "ăn", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "ăn (Động từ nấu ăn)", "ex": ""}, {"vocab_id": "7648b91f-c2b7-42ec-8e9d-208743343ab5", "ru": "измельча́ть / измельчи́ть", "stress": "измельча́ть / измельчи́ть", "vi": "băm nhỏ, nghiền nhỏ", "pos": "Verb", "gender": null, "sub_topic": "Động từ nấu nướng & chế biến", "note": "băm nhỏ, nghiền nhỏ (Động từ nấu ăn)", "ex": ""}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'Thể thao - Âm nhạc', 'the_thao_am_nhac', 'A1', '⚽', 'Các môn thể thao phổ biến, sân bãi luyện tập, các loại nhạc cụ và lớp học âm nhạc.', true,
  '["Các môn thể thao", "Dụng cụ âm nhạc"]'::jsonb, 11, '[{"vocab_id": "0f872af8-179a-4a4c-9f25-529aa3b777d8", "ru": "электро́нные и́гры", "stress": "электро́нные и́гры", "vi": "điện tử", "pos": "Noun", "gender": "pl", "sub_topic": "Các môn thể thao", "note": "điện tử (Môn thể thao) | Địa điểm: на компью́тере (trên máy tính), на телефо́не (trên điện thoại)", "ex": "Я сейча́с игра́ю в электро́нные и́гры на компью́тере. (Tôi đang chơi điện tử trên máy tính.)"}, {"vocab_id": "e11bf836-1c5f-4d34-9b80-47377f13ed4a", "ru": "шахма́ты", "stress": "шахма́ты", "vi": "cờ vua", "pos": "Noun", "gender": "pl", "sub_topic": "Các môn thể thao", "note": "cờ vua (Môn thể thao) | Địa điểm: до́ма (ở nhà), в шахма́тном клубе (ở câu lạc bộ cờ vua)", "ex": "Я сейча́с игра́ю в шахма́ты с дру́гом в шахма́тном клубе. (Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua.)"}, {"vocab_id": "3810e7ca-b3c4-4946-92ef-db0cb781c2ea", "ru": "футбо́л", "stress": "футбо́л", "vi": "bóng đá", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "bóng đá (Môn thể thao) | Địa điểm: на футбо́льном поле́ (ở sân cỏ), на футбо́льной площа́дке (ở sân bóng đá), на стадио́не (ở sân vận động)", "ex": "Я сейча́с занима́юсь (1) футбо́лом со свои́ми друзья́ми на футбо́льном по́ле. (Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ.)"}, {"vocab_id": "493f85b5-95c1-496f-8775-39aee7879f16", "ru": "хокке́й", "stress": "хокке́й", "vi": "khúc côn cầu", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "khúc côn cầu (Môn thể thao) | Địa điểm: на хокке́йной площа́дке (ở sân khúc côn cầu)", "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке. (Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.)"}, {"vocab_id": "6f4d7ebf-f1b2-40aa-b4e7-6d16a39d7155", "ru": "бадминто́н", "stress": "бадминто́н", "vi": "cầu lồng", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "cầu lồng (Môn thể thao) | Địa điểm: - на спорти́вной площа́дке (ở sân vận động đa năng) - в спортза́ле (ở phòng tập thể thao)", "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке. (Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng.)"}, {"vocab_id": "dc76d694-bea0-43c3-a148-2511fa15f425", "ru": "насто́льный тенни́с", "stress": "насто́льный тенни́с", "vi": "bóng bàn", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "bóng bàn (Môn thể thao) | Địa điểm: ", "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке. (Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng.)"}, {"vocab_id": "dc827aa9-97aa-47b2-aaec-687e2b613992", "ru": "те́ннис", "stress": "те́ннис", "vi": "bóng quần vợt - tennis", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "bóng quần vợt - tennis (Môn thể thao) | Địa điểm: на те́ннисном ко́рте (ở sân tennis)", "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке. (Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng.)"}, {"vocab_id": "0ca35216-adb3-4e14-bef8-8ffc51cdbe10", "ru": "баскетбо́л", "stress": "баскетбо́л", "vi": "bóng rổ", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "bóng rổ (Môn thể thao) | Địa điểm: на баскетбо́льной площа́дке (ở sân bóng rổ)", "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке. (Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ.)"}, {"vocab_id": "d201b667-8ac1-4661-bff2-d26a364a4830", "ru": "волейбо́л", "stress": "волейбо́л", "vi": "bóng chuyền", "pos": "Noun", "gender": "m", "sub_topic": "Các môn thể thao", "note": "bóng chuyền (Môn thể thao) | Địa điểm: ", "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле. (Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao.)"}, {"vocab_id": "dff3c6c6-84de-4dcb-b382-24055b465e66", "ru": "пиани́но", "stress": "пиани́но", "vi": "piano", "pos": "Noun", "gender": "n", "sub_topic": "Dụng cụ âm nhạc", "note": "piano (Dụng cụ âm nhạc)", "ex": "Я занима́юсь на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате. (Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc.)"}, {"vocab_id": "70a7e6df-22f4-4c8d-94da-ac20b15222df", "ru": "гита́ра", "stress": "гита́ра", "vi": "guitar", "pos": "Noun", "gender": "f", "sub_topic": "Dụng cụ âm nhạc", "note": "guitar (Dụng cụ âm nhạc)", "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клубе университе́та. (Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường.)"}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'Con vật', 'con_vat', 'A1', '🐾', 'Vật nuôi gia súc, động vật hoang dã, loài chim biết bay và động vật dưới nước.', true,
  '["Vật nuôi, gia súc", "Động vật hoang dã", "Con vật biết bay", "Con vật biết bơi"]'::jsonb, 11, '[{"vocab_id": "b1b5c2b8-03fd-43b7-83e6-31c0c5afa4d5", "ru": "Кот — Ко́шка", "stress": "Кот — Ко́шка", "vi": "mèo đực - mèo cái", "pos": "Noun", "gender": "f", "sub_topic": "Vật nuôi, gia súc", "note": "mèo đực - mèo cái (Vật nuôi, gia súc) | Môi trường: до́ма (ở nhà), в ко́мнате (ở trong phòng), в па́рке (ở công viên),...", "ex": "Кошка до́ма. Она́ хо́дит по до́му. (Con mèo đang ở nhà. Nó đang đi quanh nhà.)"}, {"vocab_id": "15f4b760-a57f-49a9-b7d9-499a8d0ede44", "ru": "Соба́ка", "stress": "Соба́ка", "vi": "chó đực,cái", "pos": "Noun", "gender": "f", "sub_topic": "Vật nuôi, gia súc", "note": "chó đực,cái (Vật nuôi, gia súc) | Môi trường: ", "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку. (Con chó đang ở công viên. Nó đang đi dạo quanh công viên.)"}, {"vocab_id": "99d180c5-f901-4f3c-a5a9-7af9f4615768", "ru": "Свинья́ (con lợn", "stress": "Свинья́ (con lợn", "vi": "Свинья́ (con lợn", "pos": "Noun", "gender": "m", "sub_topic": "Vật nuôi, gia súc", "note": "Свинья́ (con lợn (Vật nuôi, gia súc) | Môi trường: на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng)", "ex": "Свиньи́ на фе́рме. Они́ едя́т в хлеву́. (Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.)"}, {"vocab_id": "899a03d3-8c47-4a2e-b591-726b48760741", "ru": "Кури́ца", "stress": "Кури́ца", "vi": "con gà", "pos": "Noun", "gender": "f", "sub_topic": "Vật nuôi, gia súc", "note": "con gà (Vật nuôi, gia súc) | Môi trường: на фе́рме (ở trang trại), в куря́тнике (ở trong chuồng gà), в саду́ (ở trong vườn)", "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́. (Những con gà đang ở vườn. Chúng đang chạy quanh vườn.)"}, {"vocab_id": "431c0d98-be68-464c-b788-1a49de240d14", "ru": "Коро́ва", "stress": "Коро́ва", "vi": "con bò", "pos": "Noun", "gender": "f", "sub_topic": "Vật nuôi, gia súc", "note": "con bò (Vật nuôi, gia súc) | Môi trường: на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng), на поле́ (trên cánh đồng)", "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле. (Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.)"}, {"vocab_id": "37224e6b-4298-4a0a-a61f-e8242e7b3a70", "ru": "Медве́дь — Медве́дица", "stress": "Медве́дь — Медве́дица", "vi": "gấu đực - gấu cái", "pos": "Noun", "gender": "f", "sub_topic": "Động vật hoang dã", "note": "gấu đực - gấu cái (Động vật hoang dã) | Môi trường: в лесу́ (ở trong rừng)", "ex": "Медве́дь ест, а пото́м спит. (Gấu ăn, sau đó ngủ.)"}, {"vocab_id": "2666c34d-e820-4cb9-9bbe-7396c4f6baad", "ru": "Тигр", "stress": "Тигр", "vi": "hổ", "pos": "Noun", "gender": "m", "sub_topic": "Động vật hoang dã", "note": "hổ (Động vật hoang dã) | Môi trường: ", "ex": "Тигр бега́ет по лесу́, что́бы охо́титься. (Hổ đang chạy quanh khu rừng để săn mồi.)"}, {"vocab_id": "79ef252d-4f89-4d07-82b3-c11cd1556768", "ru": "Лев", "stress": "Лев", "vi": "sư tử", "pos": "Noun", "gender": "m", "sub_topic": "Động vật hoang dã", "note": "sư tử (Động vật hoang dã) | Môi trường: ", "ex": "Лев гуля́ет по лесу́. (Sư rử đang đi dạo quanh khu rừng.)"}, {"vocab_id": "ed50c50e-380c-4718-82f6-83e17a1515a2", "ru": "Пти́ца", "stress": "Пти́ца", "vi": "con chim", "pos": "Noun", "gender": "f", "sub_topic": "Con vật biết bay", "note": "con chim (Con vật biết bay) | Môi trường: в не́бе (trên bầu trờ), на ве́тке (trên cành cây)", "ex": "Пти́ца лети́т по не́бу. (Con chim đang bay trên bầu trời)"}, {"vocab_id": "0195e893-01a5-4a12-85ec-67e689c26fb7", "ru": "Попуга́й", "stress": "Попуга́й", "vi": "con vẹt", "pos": "Noun", "gender": "m", "sub_topic": "Con vật biết bay", "note": "con vẹt (Con vật biết bay) | Môi trường: ", "ex": "Попуга́й стои́т на ве́тке. (Con vẹt đang đứng trên cành cây)"}, {"vocab_id": "b560d935-448b-4af1-8bd7-b4e10a3dcb8b", "ru": "Ры́ба", "stress": "Ры́ба", "vi": "cá", "pos": "Noun", "gender": "f", "sub_topic": "Con vật biết bơi", "note": "cá (Con vật biết bơi) | Môi trường: в озере (ở hồ), в реке́ (ở sông), в мо́ре (ở biển)", "ex": "Ры́ба плывёт в реке́. (Con cá đang bơi ở sông.)"}]'::jsonb, NOW()
);
INSERT INTO vocab_jars (
  id, jar_name, code, level, icon, description, is_system,
  sub_topics, word_count, words, created_at
) VALUES (
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'Bộ phận cơ thể người', 'bo_phan_co_the', 'A1', '👤', 'Các bộ phận trên khuôn mặt, thân thể và các tính từ mô tả đặc điểm hình dáng, ngoại hình.', true,
  '["Bộ phận trên khuôn mặt", "Bộ phận trên cơ thể", "Tính từ miêu tả ngoại hình"]'::jsonb, 29, '[{"vocab_id": "b06422c2-a090-4867-9c0a-a2f5f8720e99", "ru": "голова́", "stress": "голова́", "vi": "đầu", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên khuôn mặt", "note": "đầu (Bộ phận khuôn mặt) | Miêu tả: to >< nhỏ", "ex": "У меня́ больша́я голова́. (Tôi có đầu to.)"}, {"vocab_id": "aff89385-810c-4df0-b323-ba88d815322f", "ru": "во́лосы", "stress": "во́лосы", "vi": "tóc", "pos": "Noun", "gender": "pl", "sub_topic": "Bộ phận trên khuôn mặt", "note": "tóc (Bộ phận khuôn mặt) | Miêu tả: dài >< ngắn, dày >< thưa", "ex": "У неё дли́нные густы́е во́лосы. (Cô ấy có mái tóc dài dày.)"}, {"vocab_id": "3c6af0d8-4889-405a-9210-00f7d82f84f3", "ru": "лицо́", "stress": "лицо́", "vi": "mặt", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên khuôn mặt", "note": "mặt (Bộ phận khuôn mặt) | Miêu tả: đẹp, nhỏ >< to", "ex": "У него́ ма́ленькое краси́вое лицо́. (Anh ấy có khuôn mặt nhỏ đẹp.)"}, {"vocab_id": "5b5b21d1-ede2-4473-88bf-e77132f5b77b", "ru": "лоб", "stress": "лоб", "vi": "trán", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên khuôn mặt", "note": "trán (Bộ phận khuôn mặt) | Miêu tả: cao >< thấp", "ex": "У него́ высо́кий лоб. (Anh ấy có trán cao.)"}, {"vocab_id": "c731c0c8-ee6b-442e-80d4-a76d7017ad7d", "ru": "бро́ви", "stress": "бро́ви", "vi": "2 hàng lông mày", "pos": "Noun", "gender": "pl", "sub_topic": "Bộ phận trên khuôn mặt", "note": "2 hàng lông mày (Bộ phận khuôn mặt) | Miêu tả: dày >< thưa", "ex": "У неё гу́стые бро́ви. (Cô ấy có lông mày dày.)"}, {"vocab_id": "4a435f9e-1c5e-4d3b-9849-6905fb2b616e", "ru": "глаза́", "stress": "глаза́", "vi": "đôi mắt", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên khuôn mặt", "note": "đôi mắt (Bộ phận khuôn mặt) | Miêu tả: to >< nhỏ, đẹp", "ex": "У неё больши́е краси́вые глаза́. (Cô ấy có đôi mắt to đẹp.)"}, {"vocab_id": "f190c0eb-7701-448d-ae31-1f58241d23d7", "ru": "но́с", "stress": "но́с", "vi": "mũi", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên khuôn mặt", "note": "mũi (Bộ phận khuôn mặt) | Miêu tả: cao >< thấp, thẳng", "ex": "У него́ высо́кий пря́мой нос. (Anh ấy có mũi cao thẳng.)"}, {"vocab_id": "1ab32ef6-97e5-4af8-8353-915ea2af2be9", "ru": "щёки", "stress": "щёки", "vi": "2 bên má", "pos": "Noun", "gender": "pl", "sub_topic": "Bộ phận trên khuôn mặt", "note": "2 bên má (Bộ phận khuôn mặt) | Miêu tả: hồng hào", "ex": "У неё румя́ные щёки. (Cô ấy có đôi má hồng hào.)"}, {"vocab_id": "e3e3f5b1-bc53-423e-b1a7-6ba9bb1e2c88", "ru": "рот", "stress": "рот", "vi": "khuôn miệng", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên khuôn mặt", "note": "khuôn miệng (Bộ phận khuôn mặt) | Miêu tả: nhỏ, rộng", "ex": "У неё ма́ленький рот. (Cô ấy có khuôn miệng nhỏ.)"}, {"vocab_id": "33c19abf-3db8-4958-9861-2dbabc907a94", "ru": "гу́бы", "stress": "гу́бы", "vi": "đôi môi", "pos": "Noun", "gender": "pl", "sub_topic": "Bộ phận trên khuôn mặt", "note": "đôi môi (Bộ phận khuôn mặt) | Miêu tả: dày, mỏng, đẹp", "ex": "У неё то́нкая краси́вые гу́бы. (Cô ấy có đôi môi mỏng đẹp.)"}, {"vocab_id": "499e6113-0e44-4e51-b080-28c4f232c42e", "ru": "зу́бы", "stress": "зу́бы", "vi": "hàm răng", "pos": "Noun", "gender": "pl", "sub_topic": "Bộ phận trên khuôn mặt", "note": "hàm răng (Bộ phận khuôn mặt) | Miêu tả: trắng, đẹp, khỏe", "ex": "У неё бе́лые здоро́вые зу́бы. (Cô ấy có hàm răng trắng khỏe.)"}, {"vocab_id": "61f24497-f107-455d-8bd2-2c5112dd16ad", "ru": "у́ши", "stress": "у́ши", "vi": "đôi tai", "pos": "Noun", "gender": "pl", "sub_topic": "Bộ phận trên khuôn mặt", "note": "đôi tai (Bộ phận khuôn mặt) | Miêu tả: nhỏ, to", "ex": "У него́ ма́ленькие у́ши. (Anh ấy có đôi tai nhỏ.)"}, {"vocab_id": "b4c024f7-ea48-49f4-a9bf-29c7ba64552c", "ru": "голова́", "stress": "голова́", "vi": "đầu", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên cơ thể", "note": "đầu (Bộ phận cơ thể) | Miêu tả: to >< nhỏ", "ex": "У меня́ больша́я голова́. (Tôi có đầu to.)"}, {"vocab_id": "d0cff6c6-63c1-4843-a531-2fbef2554454", "ru": "ле́вая рука́ >< пра́вая рука́ - руки́", "stress": "ле́вая рука́ >< пра́вая рука́ - руки́", "vi": "tay trái >< tay phải - hai tay", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên cơ thể", "note": "tay trái >< tay phải - hai tay (Bộ phận cơ thể) | Miêu tả: khỏe mạnh mẽ", "ex": "У неё здоро́вые и си́льные ру́ки. (Cô ấy có đôi tay khỏe và mạnh mẽ.)"}, {"vocab_id": "eeaa9174-fa00-43be-aa90-6f2cafa0c141", "ru": "ле́вая нога́ >< пра́вая нога́ - ноги́", "stress": "ле́вая нога́ >< пра́вая нога́ - ноги́", "vi": "chân trái >< chân phải - hai chân", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên cơ thể", "note": "chân trái >< chân phải - hai chân (Bộ phận cơ thể) | Miêu tả: ", "ex": "У него́ здоро́вые и си́льные но́ги. (Anh ấy có đôi chân khỏe và mạnh mẽ)"}, {"vocab_id": "5188040e-c0c4-4024-8b16-fdb58a58e52f", "ru": "грудь", "stress": "грудь", "vi": "ngực", "pos": "Noun", "gender": "f", "sub_topic": "Bộ phận trên cơ thể", "note": "ngực (Bộ phận cơ thể) | Miêu tả: ", "ex": "У меня́ боли́т грудь. (Tôi đang đau ngực.)"}, {"vocab_id": "4b04a4a3-29b1-4893-a7f0-0833a6f6b5a1", "ru": "живо́т", "stress": "живо́т", "vi": "bụng", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên cơ thể", "note": "bụng (Bộ phận cơ thể) | Miêu tả: ", "ex": "У меня́ о́чень боли́т живо́т. (Tôi đang rất đau bụng)"}, {"vocab_id": "d15c2193-d872-40c1-be38-10cb927349c0", "ru": "спина́", "stress": "спина́", "vi": "lưng", "pos": "Noun", "gender": "m", "sub_topic": "Bộ phận trên cơ thể", "note": "lưng (Bộ phận cơ thể) | Miêu tả: dày >< mỏng, rộng >< hẹp", "ex": "У него́ то́лстая и широ́кая спина́. (Anh ấy có tấm lưng dày và rộng.)"}, {"vocab_id": "4555d447-694e-4a4f-971e-d9c47ef4b76a", "ru": "большо́й >< ма́ленький", "stress": "большо́й >< ма́ленький", "vi": "to >< nhỏ", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "to >< nhỏ (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "5393af0e-c04e-4c59-b028-b556cf9d8893", "ru": "дли́нный >< коро́ткий", "stress": "дли́нный >< коро́ткий", "vi": "dài >< ngắn", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "dài >< ngắn (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "a299082b-2f7d-4993-b305-af6f01818f05", "ru": "густо́й >< ре́дкий", "stress": "густо́й >< ре́дкий", "vi": "dày >< thưa (nhấn mạnh mật độ, số lượng của vật)", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "dày >< thưa (nhấn mạnh mật độ, số lượng của vật) (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "5f08ff90-36c5-4ba0-bbc1-81fb3f672735", "ru": "высо́кий >< ни́зкий", "stress": "высо́кий >< ни́зкий", "vi": "cao >< thấp", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "cao >< thấp (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "3044f72d-b8fa-4541-8e4f-4ea21ca4df6e", "ru": "прямо́й", "stress": "прямо́й", "vi": "thẳng", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "thẳng (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "ebf1ede1-9b80-4899-bf87-25d6e07cd5aa", "ru": "румя́ный", "stress": "румя́ный", "vi": "hồng hào", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "hồng hào (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "64fdd68b-5a9a-4749-845a-20c7eea0fc99", "ru": "краси́вый", "stress": "краси́вый", "vi": "đẹp", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "đẹp (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "c7a2cbb4-3361-4b06-8b72-40cad4ecb4b3", "ru": "широ́кий >< у́зкий", "stress": "широ́кий >< у́зкий", "vi": "rộng >< hẹp", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "rộng >< hẹp (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "1898476f-afd9-4a65-8b66-ba9585fb69d2", "ru": "то́лстый >< то́нкий", "stress": "то́лстый >< то́нкий", "vi": "dày >< mỏng (nhấn mạnh độ dày, độ lớn theo chiều ngang của vật)", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "dày >< mỏng (nhấn mạnh độ dày, độ lớn theo chiều ngang của vật) (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "ee02037b-de59-4790-9e0c-a80011f36b60", "ru": "здоро́вый", "stress": "здоро́вый", "vi": "khỏe mạnh", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "khỏe mạnh (Tính từ miêu tả)", "ex": ""}, {"vocab_id": "e9b1f30b-bcbd-4e1e-a59e-21392d42a974", "ru": "си́льный", "stress": "си́льный", "vi": "mạnh", "pos": "Adj", "gender": "m", "sub_topic": "Tính từ miêu tả ngoại hình", "note": "mạnh (Tính từ miêu tả)", "ex": ""}]'::jsonb, NOW()
);

-- 2. CHÈN BẢNG TỪ VỰNG (VOCABULARIES)
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '41810eb5-1ce2-4741-b9de-44b0440858c9', 'студе́нт — студе́нтка', 'студент  студентка', 'Noun', 'm/f', NULL, 'sinh viên nam - sinh viên nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Студе́нт у́чится в университе́те.", "vi": "Sinh viên đang học ở trường đại học."}]'::jsonb, 'Студе́нт у́чится в университе́те.', 'Sinh viên đang học ở trường đại học.',
  '{"action": "учи́ться", "action_vi": "học", "workplace": "в университе́те/ институ́те", "workplace_vi": "ở trường đại học/ học viện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0dc52773-0010-47e8-af9e-e50f8a9e1dbe', 'преподава́тель — преподава́тельница', 'преподаватель  преподавательница', 'Noun', 'f', NULL, 'giảng viên nam - giảng viên nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Преподава́тель преподаёт ру́сский язы́к в университе́те.", "vi": "Giảng viên đang dạy tiếng Nga ở trường đại học."}]'::jsonb, 'Преподава́тель преподаёт ру́сский язы́к в университе́те.', 'Giảng viên đang dạy tiếng Nga ở trường đại học.',
  '{"action": "преподава́ть / препода́ть", "action_vi": "dạy học", "workplace": "в университе́те/ институ́те", "workplace_vi": "ở trường đại học/ học viện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8d56cc41-7c7b-49eb-ae02-3f358baa0355', 'шко́льник — шко́льница', 'школьник  школьница', 'Noun', 'f', NULL, 'học sinh nam - học sinh nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Шко́льница у́чится в шко́ле.", "vi": "Học sinh đang học ở trường học."}]'::jsonb, 'Шко́льница у́чится в шко́ле.', 'Học sinh đang học ở trường học.',
  '{"action": "учи́ться", "action_vi": "học", "workplace": "в шко́ле", "workplace_vi": "ở trường học"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'fa7eff8d-507b-4b7d-b00e-5cfa08441c98', 'учи́тель — учи́тельница', 'учитель  учительница', 'Noun', 'f', NULL, 'thầy giáo - cô giáo',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Учи́тель преподаёт в шко́ле.", "vi": "Giáo viên đang dạy học ở trường học."}]'::jsonb, 'Учи́тель преподаёт в шко́ле.', 'Giáo viên đang dạy học ở trường học.',
  '{"action": "преподава́ть / препода́ть", "action_vi": "dạy học", "workplace": "в шко́ле", "workplace_vi": "ở trường học"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '32d14f2e-157d-45e8-ba8b-45a85677a6f9', 'инжене́р', 'инженер', 'Noun', 'm', NULL, 'kỹ sư',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."}]'::jsonb, 'Инжене́р ремонти́рует маши́ну на заво́де.', 'Kỹ sư đang sửa chữa máy móc ở nhà máy.',
  '{"action": "ремонти́ровать / отремонти́ровать маши́ну", "action_vi": "sửa chữa máy móc", "workplace": "на заво́де", "workplace_vi": "ở nhà máy"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9924deef-b4b4-4b77-9d0d-b9b2a879205b', 'хи́мик', 'химик', 'Noun', 'm', NULL, 'nhà hóa học',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb, 'Хи́мик изуча́ет хи́мию в лаборато́рии.', 'Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '{"action": "изуча́ть / изучи́ть хи́мию", "action_vi": "nghiên cứu hóa học", "workplace": "в лаборато́рии", "workplace_vi": "ở phòng thí nghiệm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1ed8f1da-2b99-4473-9a63-fb2922c31984', 'био́лог', 'биолог', 'Noun', 'm', NULL, 'nhà sinh vật học',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Био́лог изуча́ет расте́ния в лаборато́рии.", "vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}]'::jsonb, 'Био́лог изуча́ет расте́ния в лаборато́рии.', 'Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.',
  '{"action": "изуча́ть / изучи́ть расте́ния", "action_vi": "nghiên cứu thực vật", "workplace": "в лаборато́рии", "workplace_vi": "ở phòng thí nghiệm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9c6dddb6-5afd-4296-9d22-ccb5368328a5', 'программи́ст', 'программист', 'Noun', 'm', NULL, 'lập trình viên',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên máy tính ở cơ quan."}]'::jsonb, 'Программи́ст программи́рует на компью́тере в о́фисе.', 'Lập trình viên đang lập trình trên máy tính ở cơ quan.',
  '{"action": "программи́ровать / запрограмми́ровать", "action_vi": "lập trình", "workplace": "на компью́тере - в о́фисе", "workplace_vi": "ở văn phòng - trên máy tính"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2c5e2b10-4f49-442c-b825-3b2c9708d49c', 'архите́ктор', 'архитектор', 'Noun', 'm', NULL, 'kiến trúc sư',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Архите́ктор проекти́рует зда́ния в о́фисе.", "vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}]'::jsonb, 'Архите́ктор проекти́рует зда́ния в о́фисе.', 'Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.',
  '{"action": "проекти́ровать / спроекти́ровать зда́ния", "action_vi": "thiết kế tòa nhà", "workplace": "в о́фисе", "workplace_vi": "ở văn phòng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'cd1f8fde-8797-4a78-a88f-8e796c6c592c', 'экономи́ст', 'экономист', 'Noun', 'm', NULL, 'nhà kinh tế học/chuyên viên kinh tế',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}]'::jsonb, 'Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.', 'Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.',
  '{"action": "- собира́ть / собра́ть данны - анализи́ровать / проанализи́ровать данны", "action_vi": "thu thập và phân tích dữ liệu", "workplace": "в о́фисе", "workplace_vi": "ở văn phòng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '779d292c-6ba8-49f7-b103-3ec900882fb8', 'врач', 'врач', 'Noun', 'm', NULL, 'bác sĩ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Врач осма́тривает и лечи́т пациéнтов в больни́це.", "vi": "Bác sĩ đáng khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."}]'::jsonb, 'Врач осма́тривает и лечи́т пациéнтов в больни́це.', 'Bác sĩ đáng khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.',
  '{"action": "- осма́тривать / осмотре́ть - лечи́ть / вы́лечить", "action_vi": "- khám bệnh - chữa bệnh", "workplace": "в больни́це/ поликли́нике", "workplace_vi": "ở bệnh viện/ phòng khám"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3f670ced-6e08-4154-b662-d81b7b7b896d', 'фе́рмер', 'фермер', 'Noun', 'm', NULL, 'nông dân',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb, 'Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме.', 'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '{"action": "- выра́щивать / вы́растить овощи́ - разво́дить / развести́ скот", "action_vi": "- trông rau - chăn nuôi gia súc", "workplace": "на фе́рме", "workplace_vi": "ở trang trại"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '21fdb6a0-b3f3-42f1-afc6-df87268ec049', 'домохозя́йка', 'домохозяика', 'Noun', 'm', NULL, 'nội trợ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb, 'Домохозя́йка гото́вит еду́ и убира́ет дом.', 'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '{"action": "- гото́вить / пригото́вить еду́ - убира́ть / убра́ть дом", "action_vi": "- nấu ăn - dọn dẹp nhà cửa", "workplace": "до́ма", "workplace_vi": "ở nhà"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'af769b0a-fd8c-4bb6-8b87-6be375487a0a', 'дире́ктор', 'директор', 'Noun', 'm', NULL, 'giám đốc/ hiệu trưởng',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Дире́ктор руководи́т рабо́той в фирме.", "vi": "Giám đốc đang lãnh đạo công việc ở công ty."}]'::jsonb, 'Дире́ктор руководи́т рабо́той в фирме.', 'Giám đốc đang lãnh đạo công việc ở công ty.',
  '{"action": "руководи́ть", "action_vi": "lãnh đạo", "workplace": "в фирме; в шко́ле; в университе́те; в институ́те", "workplace_vi": "ở công ty; ở trường học; ở đại học; ở học viện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'eb11201f-2848-4a29-8507-99d9fc6309f9', 'юри́ст', 'юрист', 'Noun', 'm', NULL, 'luật sư',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Юри́ст консульти́рует клие́нта в юриди́ческой фирме.", "vi": "Luật sư đang tư vấn cho khách hàng ở công ty luật."}]'::jsonb, 'Юри́ст консульти́рует клие́нта в юриди́ческой фирме.', 'Luật sư đang tư vấn cho khách hàng ở công ty luật.',
  '{"action": "консульти́ровать / проконсульти́ровать клие́нтов", "action_vi": "tư vấn khách hàng", "workplace": "в юриди́ческой фирме/ о́фисе", "workplace_vi": "ở công ty/ văn phòng luật"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c60b9a5d-283e-4504-892d-8a9f47967919', 'бизнесме́н', 'бизнесмен', 'Noun', 'm', NULL, 'doanh nhân',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."}]'::jsonb, 'Бизнесме́н встреча́ется с партнёром в фи́рме.', 'Người doanh nhân đang gặp gỡ đối tác ở công ty.',
  '{"action": "встреча́ться / встре́титься с партнёрами (2)", "action_vi": "gặp gỡ đối tác", "workplace": "в фи́рме", "workplace_vi": "ở công ty"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '69a376a1-3081-49fd-b415-2dc470e1b7f7', 'служа́щий', 'служащии', 'Noun', 'm', NULL, 'nhân viên/ công chức',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Служа́щий рабо́тает с документа́ми в о́фисе.", "vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng."}]'::jsonb, 'Служа́щий рабо́тает с документа́ми в о́фисе.', 'Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.',
  '{"action": "работа́ть с документа́ми", "action_vi": "làm việc với giấy tờ", "workplace": "в о́фисе", "workplace_vi": "ở văn phòng/ cơ quan"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'be57a924-f719-44a1-8f71-46467d51f99c', 'продаве́ц', 'продавец', 'Noun', 'm', NULL, 'người bán hàng nam',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."}]'::jsonb, 'Продаве́ц продаёт това́ры в магази́не.', 'Người bán hàng đang bán hàng hóa ở cửa hàng.',
  '{"action": "продава́ть / прода́ть", "action_vi": "bán hàng", "workplace": "в магази́не", "workplace_vi": "ở cửa hàng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0cf79cd7-d236-4040-a744-76acdd7912d0', 'журнали́ст — журнали́стка', 'журналист  журналистка', 'Noun', 'm/f', NULL, 'nhà báo nam - nhà báo nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Журнали́ст пи́шет ста́тьи в редаќции.", "vi": "Nhà báo đang viết báo ở tòa soạn."}]'::jsonb, 'Журнали́ст пи́шет ста́тьи в редаќции.', 'Nhà báo đang viết báo ở tòa soạn.',
  '{"action": "писа́ть / написа́ть ста́тьи", "action_vi": "viết báo", "workplace": "в редаќции", "workplace_vi": "ở tòa soạn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0226867d-f80f-404b-8509-0e793bfcafd9', 'поэ́т', 'поэт', 'Noun', 'm', NULL, 'nhà thơ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Поэ́т пи́шет стихи́ до́ма.", "vi": "Nhà thơ đang viết thơ ở nhà."}]'::jsonb, 'Поэ́т пи́шет стихи́ до́ма.', 'Nhà thơ đang viết thơ ở nhà.',
  '{"action": "писа́ть / написа́ть стихи́", "action_vi": "viết thơ", "workplace": "до́ма", "workplace_vi": "ở nhà"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '6441694c-c2db-4650-9daa-bba1fc810422', 'худо́жник — худо́жница', 'художник  художница', 'Noun', 'f', NULL, 'họa sĩ nam - họa sĩ nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Худо́жница рису́ет карти́ны в мастерско́й.", "vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}]'::jsonb, 'Худо́жница рису́ет карти́ны в мастерско́й.', 'Họa sĩ đang vẽ tranh ở xưởng vẽ.',
  '{"action": "рисова́ть / нарисова́ть карти́ны", "action_vi": "vẽ tranh", "workplace": "в мастерско́й", "workplace_vi": "ở xưởng vẽ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9b40d429-be05-4476-9c30-eda27ffc9cb5', 'арти́ст — арти́стка', 'артист  артистка', 'Noun', 'm/f', NULL, 'nghệ sĩ nam - nghệ sĩ nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."}]'::jsonb, 'Арти́ст выступа́ет в теа́тре.', 'Người nghệ sĩ đang biểu diễn ở nhà hát.',
  '{"action": "выступа́ть / выступи́ть", "action_vi": "biểu diễn", "workplace": "в теа́тре/ на конце́рте", "workplace_vi": "ở nhà hát/ trên buổi hòa nhà (concert)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3ded112d-2585-4f39-b124-83a14bb52470', 'переводчи́к — переводчи́ца', 'переводчик  переводчица', 'Noun', 'm/f', NULL, 'phiên dịch viên nam - phiên dịch viên nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Переводчи́к перево́дит те́ксты в бюро́ перево́дов.", "vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng dịch thuật."}]'::jsonb, 'Переводчи́к перево́дит те́ксты в бюро́ перево́дов.', 'Phiên dịch viên đang dịch các văn bản ở văn phòng dịch thuật.',
  '{"action": "переводи́ть / перевести́ те́ксты", "action_vi": "dịch văn bản", "workplace": "в бюро́ перево́дов", "workplace_vi": "ở văn phòng dịch thuật"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9f32398b-b503-4032-b8a9-24ab0d294367', 'моделье́р', 'модельер', 'Noun', 'm', NULL, 'nhà thiết kế thời trang',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Моделье́р создаёт моде́ли оде́жды в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."}]'::jsonb, 'Моделье́р создаёт моде́ли оде́жды в ателье́.', 'Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.',
  '{"action": "создава́ть / созда́ть оде́жду", "action_vi": "thiết kế quần áo", "workplace": "в ателье́", "workplace_vi": "ở xưởng may/ nhà may"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b7b5bad1-3602-4018-b556-beaa94d924f2', 'музыка́нт', 'музыкант', 'Noun', 'm', NULL, 'nhạc sĩ/ nhạc công',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Музыка́нт игра́ет на пиа́нино на конце́рте.", "vi": "Nhạc công đang chơi nhạc cụ trên buổi concert."}]'::jsonb, 'Музыка́нт игра́ет на пиа́нино на конце́рте.', 'Nhạc công đang chơi nhạc cụ trên buổi concert.',
  '{"action": "игра́ть / сыгра́ть на музыка́льном инструме́нте", "action_vi": "chơi nhạc cụ", "workplace": "в теа́тре/ на конце́рте", "workplace_vi": "ở nhà hát/ trên buổi hòa nhà (concert)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '68b71bec-0642-45bb-9fba-0a7d088ddcba', 'спортсме́н — спортсме́нка', 'спортсмен  спортсменка', 'Noun', 'm/f', NULL, 'vận động viên nam - vận động viên nữ',
  '8b4370b6-1b82-4703-81c2-e209bc450a6b', 'nghe_nghiep', 'Nghề nghiệp', '[{"ru": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]'::jsonb, 'Спортсме́н занима́ется спо́ртом в спортза́ле.', 'Vận động viên đang luyện tập thể thao ở phòng tập thể thao.',
  '{"action": "занима́ться (2)", "action_vi": "luyện tập", "workplace": "в спортза́ле", "workplace_vi": "ở phòng tập thể thao"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '59d79ff6-d489-49e7-9f28-9bc2e3103a16', 'Пальто́', 'пальто', 'Noun', 'n', NULL, 'Áo măng tô',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку. - Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф.", "vi": "- Khi trời lạnh, tôi thường mặc áo len, quần dài với áo khoác - Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn."}]'::jsonb, '- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку. - Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф.', '- Khi trời lạnh, tôi thường mặc áo len, quần dài với áo khoác - Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '17f41b25-a137-4796-8394-93e46eef8015', 'Ку́ртка', 'куртка', 'Noun', 'f', NULL, 'Áo khoác',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ куртка.", "vi": "Khi trời lạnh, tôi thường mặc/mang áo khoác."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ куртка.', 'Khi trời lạnh, tôi thường mặc/mang áo khoác.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5eee991c-cfe1-4a44-af50-f675e7e1f014', 'Сви́тер', 'свитер', 'Noun', 'm', NULL, 'Áo len chui đầu',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ свитер.", "vi": "Khi trời lạnh, tôi thường mặc/mang áo len chui đầu."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ свитер.', 'Khi trời lạnh, tôi thường mặc/mang áo len chui đầu.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '06eca6da-5e32-48ad-b215-639e516577be', 'Брю́ки', 'брюки', 'Noun', 'pl', NULL, 'Quần dài',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ брюки.", "vi": "Khi trời lạnh, tôi thường mặc/mang quần dài."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ брюки.', 'Khi trời lạnh, tôi thường mặc/mang quần dài.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4e07d999-120a-4fc0-9fa1-5bbd48a85f13', 'Ша́пка', 'шапка', 'Noun', 'f', NULL, 'Mũ len',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ шапка.", "vi": "Khi trời lạnh, tôi thường mặc/mang mũ len."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ шапка.', 'Khi trời lạnh, tôi thường mặc/mang mũ len.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'eeb82b18-0a8d-4b75-92af-c5b068d75a96', 'Шарф', 'шарф', 'Noun', 'm', NULL, 'Khăn quàng',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ шарф.", "vi": "Khi trời lạnh, tôi thường mặc/mang khăn quàng."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ шарф.', 'Khi trời lạnh, tôi thường mặc/mang khăn quàng.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8874f4ab-09ae-4afb-aa18-cafa21dccb22', 'Перча́тки', 'перчатки', 'Noun', 'pl', NULL, 'Găng tay',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ перчатки.", "vi": "Khi trời lạnh, tôi thường mặc/mang găng tay."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ перчатки.', 'Khi trời lạnh, tôi thường mặc/mang găng tay.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c13064e9-02c1-430c-8e48-8ddd997f509e', 'Носки́', 'носки', 'Noun', 'm', NULL, 'Tất',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ носки.", "vi": "Khi trời lạnh, tôi thường mặc/mang tất."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ носки.', 'Khi trời lạnh, tôi thường mặc/mang tất.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9edc890b-5fb5-430e-9ebd-27a994c10a86', 'Боти́нки', 'ботинки', 'Noun', 'pl', NULL, 'Giày bốt thấp cổ',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ ботинки.", "vi": "Khi trời lạnh, tôi thường mặc/mang giày bốt thấp cổ."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ ботинки.', 'Khi trời lạnh, tôi thường mặc/mang giày bốt thấp cổ.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '85f1eb06-62fb-4dab-aae3-798984e3c509', 'Сапоги́', 'сапоги', 'Noun', 'm', NULL, 'Giày bốt cao cổ',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời lạnh)', '[{"ru": "Когда́ хо́лодно, я обы́чно ношу́ сапоги.", "vi": "Khi trời lạnh, tôi thường mặc/mang giày bốt cao cổ."}]'::jsonb, 'Когда́ хо́лодно, я обы́чно ношу́ сапоги.', 'Khi trời lạnh, tôi thường mặc/mang giày bốt cao cổ.',
  '{"season": "Mùa lạnh", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7bbacb95-3810-41ba-b71f-7d4109556216', 'Футбо́лка', 'футболка', 'Noun', 'f', NULL, 'Áo phông',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки. - Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии.", "vi": "- Khi trời nóng, tôi thường mặc áo phông, quần soóc và đeo giày thể thao. - Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dép sandal."}]'::jsonb, '- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки. - Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии.', '- Khi trời nóng, tôi thường mặc áo phông, quần soóc và đeo giày thể thao. - Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dép sandal.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c1500a58-4227-4d84-bda1-b96ec75c2164', 'Шо́рты', 'шорты', 'Noun', 'pl', NULL, 'Quần đùi',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ шорты.", "vi": "Khi trời nóng, tôi thường mặc/mang quần đùi."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ шорты.', 'Khi trời nóng, tôi thường mặc/mang quần đùi.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a3c9b546-e2c9-45ce-895e-807fc5403cdf', 'Джи́нсы', 'джинсы', 'Noun', 'pl', NULL, 'Quần jean',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ джинсы.", "vi": "Khi trời nóng, tôi thường mặc/mang quần jean."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ джинсы.', 'Khi trời nóng, tôi thường mặc/mang quần jean.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a25246c6-2695-4137-8068-c3ae15221469', 'Пла́тье', 'платье', 'Noun', 'n', NULL, 'Đầm (váy liền)',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ платье.", "vi": "Khi trời nóng, tôi thường mặc/mang đầm (váy liền)."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ платье.', 'Khi trời nóng, tôi thường mặc/mang đầm (váy liền).',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b8a4fc28-2a2c-47f0-b61e-36c1fe9dfc13', 'Ю́бка', 'юбка', 'Noun', 'f', NULL, 'Chân váy',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ юбка.", "vi": "Khi trời nóng, tôi thường mặc/mang chân váy."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ юбка.', 'Khi trời nóng, tôi thường mặc/mang chân váy.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8c801d39-1010-4aae-89e5-0306d75586f8', 'Руба́шка', 'рубашка', 'Noun', 'f', NULL, 'Áo sơ mi',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ рубашка.", "vi": "Khi trời nóng, tôi thường mặc/mang áo sơ mi."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ рубашка.', 'Khi trời nóng, tôi thường mặc/mang áo sơ mi.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'aade6046-8116-4c79-900f-bd5eb0787b12', 'Санда́лии', 'сандалии', 'Noun', 'pl', NULL, 'Dép sandal',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ сандалии.", "vi": "Khi trời nóng, tôi thường mặc/mang dép sandal."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ сандалии.', 'Khi trời nóng, tôi thường mặc/mang dép sandal.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'fba5644c-c68b-4e45-a102-b15a97e1a230', 'Кроссо́вки', 'кроссовки', 'Noun', 'pl', NULL, 'Giày thể thao',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Học theo thời tiết (Trời nóng)', '[{"ru": "Когда́ жа́рко, я обы́чно ношу́ кроссовки.", "vi": "Khi trời nóng, tôi thường mặc/mang giày thể thao."}]'::jsonb, 'Когда́ жа́рко, я обы́чно ношу́ кроссовки.', 'Khi trời nóng, tôi thường mặc/mang giày thể thao.',
  '{"season": "Mùa nóng", "verbs": "носи́ть, надева́ть/наде́ть, снима́ть/снять"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9b54d22f-331f-4752-bfa1-ee80beb385ee', 'гря́зная оде́жда', 'грязная одежда', 'Phrase', NULL, NULL, 'quần áo bẩn',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Giặt giũ & Bảo quản quần áo', '[{"ru": "Э́то гря́зная оде́жда, я постира́ю её в стира́льной маши́не. По́сле стирки́ я сушу́ её на суши́лке для белья́. Когда́ оде́жда вы́сохнет, я сложу́ её и пове́шу на ве́шалки. Затем я уберу́ её в шкаф.", "vi": "Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ."}]'::jsonb, 'Э́то гря́зная оде́жда, я постира́ю её в стира́льной маши́не. По́сле стирки́ я сушу́ её на суши́лке для белья́. Когда́ оде́жда вы́сохнет, я сложу́ её и пове́шу на ве́шалки. Затем я уберу́ её в шкаф.', 'Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.',
  '{"category": "Giặt giũ & Bảo quản quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '938aec1f-4bad-42d3-b7f1-4f17da0de633', 'стира́ть / постира́ть (оде́жду) в стира́льной маши́не', 'стирать  постирать одежду в стиральнои машине', 'Verb', NULL, 'ipfv/pfv', 'giặt bằng máy giặt',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Giặt giũ & Bảo quản quần áo', '[]'::jsonb, '', '',
  '{"category": "Giặt giũ & Bảo quản quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f88ee476-a9ef-4c64-988c-0bb0773fc278', 'суши́ть (оде́жду) на суши́лке', 'сушить одежду на сушилке', 'Verb', NULL, 'pfv', 'phơi (quần áo) trên giàn phơi đồ',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Giặt giũ & Bảo quản quần áo', '[]'::jsonb, '', '',
  '{"category": "Giặt giũ & Bảo quản quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c3fbdec0-c301-4943-b680-69c39b28ae3c', 'скла́дывать / сло́жить (оде́жду)', 'складывать  сложить одежду', 'Verb', NULL, 'ipfv/pfv', 'gấp (quần áo)',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Giặt giũ & Bảo quản quần áo', '[]'::jsonb, '', '',
  '{"category": "Giặt giũ & Bảo quản quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ccb7274e-d7bb-422a-8983-04272895d40e', 'ве́шать / повéсить (оде́жду) на ве́шалку', 'вешать  повeсить одежду на вешалку', 'Verb', NULL, 'ipfv/pfv', 'treo (quần áo) lên móc',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Giặt giũ & Bảo quản quần áo', '[]'::jsonb, '', '',
  '{"category": "Giặt giũ & Bảo quản quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd1681e1b-4393-462b-bd21-88a34dc30f9d', 'убира́ть / убра́ть (оде́жду) в шкаф', 'убирать  убрать одежду в шкаф', 'Verb', NULL, 'ipfv/pfv', 'cất (quần áo) vào tủ',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Giặt giũ & Bảo quản quần áo', '[]'::jsonb, '', '',
  '{"category": "Giặt giũ & Bảo quản quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd2ade49c-7b9d-4be4-b56e-39ecb20ac06e', 'покупа́ть / купи́ть (оде́жду)', 'покупать  купить одежду', 'Verb', NULL, 'ipfv/pfv', 'mua (quần áo)',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[{"ru": "Я хочу́ купи́ть оде́жду, поэ́тому я иду́ в магази́н оде́жды. Снача́ла я выбира́ю ве́щи, а зате́м примеря́ю их в приме́рочной. Оде́жда мне о́чень подхо́дит, поэ́тому я иду́ на ка́ссу, что́бы оплати́ть покупку. Я плачу́ продавцу́ ба́нковской ка́ртой.", "vi": "Tôi muốn mua quần áo. Chính vì vậy, tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi thanh toán cho người bán hàng bằng thẻ."}]'::jsonb, 'Я хочу́ купи́ть оде́жду, поэ́тому я иду́ в магази́н оде́жды. Снача́ла я выбира́ю ве́щи, а зате́м примеря́ю их в приме́рочной. Оде́жда мне о́чень подхо́дит, поэ́тому я иду́ на ка́ссу, что́бы оплати́ть покупку. Я плачу́ продавцу́ ба́нковской ка́ртой.', 'Tôi muốn mua quần áo. Chính vì vậy, tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi thanh toán cho người bán hàng bằng thẻ.',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '556643f1-35a4-4a89-a12a-5ce1ed907c9f', 'идти́ / е́хать магази́н оде́жды', 'идти  ехать магазин одежды', 'Verb', NULL, 'ipfv/pfv', 'đi đến cửa hàng quần áo',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '48845698-fe6e-433a-a203-d4a3bc0ba3c2', 'выбира́ть / вы́брать (оде́жду)', 'выбирать  выбрать одежду', 'Verb', NULL, 'ipfv/pfv', 'chọn (quần áo)',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3bb41551-2469-4d6d-aa10-51022a6e1c05', 'примеря́ть / приме́рить (оде́жду) в приме́рочной', 'примерять  примерить одежду в примерочнои', 'Verb', NULL, 'ipfv/pfv', 'thử (quần áo) trong phòng thay đồ',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a2648a7a-aa5a-4447-b480-8d0a161a80bd', '(оде́жда) подходи́ть / подойти́ мне', 'одежда подходить  подоити мне', 'Verb', NULL, 'ipfv/pfv', '(quần áo) vừa với tôi',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0a721899-8d64-4080-bfa0-9933c51768c3', 'идти́ на ка́ссу', 'идти на кассу', 'Verb', NULL, 'pfv', 'thanh toán ở quầy bán hàng',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'afa8ece1-255c-42b5-b54d-235f928a4ec4', 'плати́ть / заплати́ть продавцу́', 'платить  заплатить продавцу', 'Verb', NULL, 'ipfv/pfv', 'thanh toán cho người bán hàng',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3837e2b5-68f7-469e-9ae4-d35f5bcc7b7d', 'плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными', 'платить  заплатить банковскои картои  наличными', 'Verb', NULL, 'ipfv/pfv', 'thanh toán bằng thẻ/ tiền mặt',
  'e1f0e2ba-0a0a-4436-b60e-e72780842445', 'quan_ao', 'Mua sắm quần áo giày dép', '[]'::jsonb, '', '',
  '{"category": "Mua sắm quần áo giày dép"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '28804b07-56ab-4ccc-b88d-a00af99e748d', 'Дива́н', 'диван', 'Noun', 'm', NULL, 'ghế sopha',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть на нём и смотре́ть фильм.", "vi": "Tôi đặt sopha ở phòng khách để ngồi trên nó xem phim"}]'::jsonb, 'Я ста́влю дива́н в гости́ной, что́бы сиде́ть на нём и смотре́ть фильм.', 'Tôi đặt sopha ở phòng khách để ngồi trên nó xem phim',
  '{"room": "Trong phòng khách", "actions": "ста́вить", "actions_vi": "đặt để", "purposes": "сиде́ть, лежа́ть, ложи́ться спать, отдыха́ть", "purposes_vi": "ngồi, nằm, ngủ, nghỉ ngơi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9ed6dab7-81c7-4023-bf54-ed2075dc8b21', 'Стол', 'стол', 'Noun', 'm', NULL, 'bàn',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.", "vi": "Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó."}]'::jsonb, 'Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.', 'Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó.',
  '{"room": "Trong phòng khách", "actions": "ста́вить, протира́ть/ вытира́ть", "actions_vi": "đặt để, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước)", "purposes": "рабо́тать, есть, класть (ве́щи)", "purposes_vi": "làm việc, ăn, đặt đồ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b5fae03c-b72e-49df-b181-d4a730dda85a', 'Ва́за', 'ваза', 'Noun', 'f', NULL, 'bình hoa',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.", "vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào nó."}]'::jsonb, 'Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.', 'Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào nó.',
  '{"room": "Trong phòng khách", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть (1), - мыть >< вытира́ть, - протира́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/đặt nằm, - rửa >< lau khô (loại bỏ nước), - lau chùi (loại bỏ bụi bẩn)", "purposes": "украша́ть, ста́вить цветы́", "purposes_vi": "trang trí, cắm hoa"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ac21938b-9f9f-444b-b542-2340065023e8', 'Ту́мба', 'тумба', 'Noun', 'f', NULL, 'tủ/kệ nhỏ có ngăn kéo',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.", "vi": "Tôi đặt tủ ở phòng khách để đặt tivi lên nó."}]'::jsonb, 'Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.', 'Tôi đặt tủ ở phòng khách để đặt tivi lên nó.',
  '{"room": "Trong phòng khách", "actions": "ста́вить, протира́ть", "actions_vi": "đặt để, lau chùi (loại bỏ bụi bẩn)", "purposes": "храни́ть (ве́щи), ста́вить/класть (ве́щи)", "purposes_vi": "cất đồ, đặt đứng/đặt nằm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '91e3b49d-a18b-4617-96fa-7ad99e294c27', 'Телеви́зор', 'телевизор', 'Noun', 'm', NULL, 'ti vi',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.", "vi": "Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim."}]'::jsonb, 'Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.', 'Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim.',
  '{"room": "Trong phòng khách", "actions": "- ста́вить, - включа́ть >< выключа́ть", "actions_vi": "- đặt để, - bật >< tắt", "purposes": "смотре́ть", "purposes_vi": "xem"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'fe96cd3d-a17f-4e83-866b-df69507dbeaa', 'Цвето́чный горшо́к', 'цветочныи горшок', 'Noun', 'm', NULL, 'chậu cây',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.", "vi": "Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách."}]'::jsonb, 'Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.', 'Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách.',
  '{"room": "Trong phòng khách", "actions": "ста́вить", "actions_vi": "đặt để", "purposes": "сажа́ть цветы́, украша́ть", "purposes_vi": "trồng hoa, trang trí"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9976af2c-9452-4886-b0b3-58d61832dd7d', 'Ковёр', 'ковер', 'Noun', 'm', NULL, 'thảm',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.", "vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ."}]'::jsonb, 'Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.', 'Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ.',
  '{"room": "Trong phòng khách", "actions": "- брать >< убира́ть, - стели́ть >< свора́чивать, - стира́ть >< суши́ть", "actions_vi": "- lấy ra >< cất vào, - trải ra >< cuộn vào, - giặt >< phơi khô", "purposes": "сиде́ть", "purposes_vi": "ngồi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8a575d70-5a67-4676-ab20-c1bf632d0c26', 'Дверь', 'дверь', 'Noun', 'm', NULL, 'cửa ra vào',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я открыва́ю дверь, что́бы войти́ в дом.", "vi": "Tôi mở cửa để đi vào trong nhà."}]'::jsonb, 'Я открыва́ю дверь, что́бы войти́ в дом.', 'Tôi mở cửa để đi vào trong nhà.',
  '{"room": "Trong phòng khách", "actions": "открыва́ть >< закрыва́ть", "actions_vi": "mở >< đóng", "purposes": "- войти́ - вы́йти - входи́ть - выходи́ть", "purposes_vi": "vào, ra"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'eacb1550-7db8-4d56-b285-e8098d5d4f92', 'Окно́', 'окно', 'Noun', 'm', NULL, 'cửa sổ',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng khách', '[{"ru": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "vi": "Tôi mở cửa sổ vào buổi sáng để thông gió phòng."}]'::jsonb, 'Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.', 'Tôi mở cửa sổ vào buổi sáng để thông gió phòng.',
  '{"room": "Trong phòng khách", "actions": "открыва́ть >< закрыва́ть", "actions_vi": "mở >< đóng", "purposes": "прове́тривать ко́мнату", "purposes_vi": "thông gió phòng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '55ae5d7e-3c27-416c-9831-decc99d1c46a', 'Стол', 'стол', 'Noun', 'm', NULL, 'Bàn',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я ста́влю стол на ку́хне, что́бы есть за ним (3).", "vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó."}]'::jsonb, 'Я ста́влю стол на ку́хне, что́бы есть за ним (3).', 'Tôi đặt bàn ở phòng bếp để ăn trên nó.',
  '{"room": "Trong phòng bếp", "actions": "ста́вить, протира́ть/ вытира́ть", "actions_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước)", "purposes": "рабо́тать, есть, ста́вить/класть (ве́щи)", "purposes_vi": "làm việc, ăn, đặt đứng/đặt nằm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '684629ca-8692-437f-b4ab-eb31c04d62c3', '(Кухо́нный) шкаф', 'кухонныи шкаф', 'Noun', 'm', NULL, 'Tủ bếp',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и доста́ть кастрю́лю, а пото́м закрыва́ю его́.", "vi": "Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại."}]'::jsonb, 'Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и доста́ть кастрю́лю, а пото́м закрыва́ю его́.', 'Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại.',
  '{"room": "Trong phòng bếp", "actions": "- ста́вить, ве́шать, - открыва́ть >< закрыва́ть", "actions_vi": "- đặt đứng, treo, - mở >< đóng", "purposes": "храни́ть посу́ду", "purposes_vi": "đựng bát đĩa"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '62dc89ab-473d-4768-af26-7163753f8d92', 'Холоди́льник', 'холодильник', 'Noun', 'm', NULL, 'Tủ lạnh',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.", "vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon."}]'::jsonb, 'Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.', 'Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon.',
  '{"room": "Trong phòng bếp", "actions": "- ста́вить, - открыва́ть >< закрыва́ть", "actions_vi": "- đặt đứng, - mở >< đóng", "purposes": "храни́ть проду́кты", "purposes_vi": "bảo quản thực phẩm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3ba1718d-91cc-472c-9eb7-204bd1c55ca1', 'Плита́', 'плита', 'Noun', 'm', NULL, 'Bếp',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я варю́ суп на плите́.", "vi": "Tôi nấu súp trên bếp."}]'::jsonb, 'Я варю́ суп на плите́.', 'Tôi nấu súp trên bếp.',
  '{"room": "Trong phòng bếp", "actions": "- ста́вить, - включа́ть >< выключа́ть, - протира́ть/ вытира́ть", "actions_vi": "- đặt đứng, - bật >< tắt, - lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước)", "purposes": "гото́вить, вари́ть, жа́рить", "purposes_vi": "nấu, luộc, rán"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ade6e3a2-3f71-4eab-9932-69a31b10d890', 'Кастрю́ля', 'кастрюля', 'Noun', 'f', NULL, 'Nồi',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть в ней суп.", "vi": "Tôi đặt nồi lên bếp để nấu súp trên nó."}]'::jsonb, 'Я ста́влю кастрю́лю на плиту́, что́бы вари́ть в ней суп.', 'Tôi đặt nồi lên bếp để nấu súp trên nó.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - ста́вить >< снима́ть, - мыть >< вытира́ть, - ве́шать", "actions_vi": "- lấy ra >< cất vào, - đặt xuống >< nhấc lên, - rửa >< lau khô, - treo lên", "purposes": "вари́ть, гото́вить", "purposes_vi": "luộc, nấu"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '239e781e-fadd-4529-ae72-db7f9ddb2db8', 'Сковорода́', 'сковорода', 'Noun', 'm', NULL, 'Chảo',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою её и уберу́ в шкаф.", "vi": "Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa nó và cất vào trong tủ."}]'::jsonb, 'Когда́ я пожарю́ мя́со на сковороде́, я вы́мою её и уберу́ в шкаф.', 'Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa nó và cất vào trong tủ.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - ста́вить >< снима́ть, - мыть >< вытира́ть, - ве́шать", "actions_vi": "- lấy ra >< cất vào, - đặt xuống >< nhấc lên, - rửa >< lau khô, - treo lên", "purposes": "жа́рить, гото́вить", "purposes_vi": "rán, nấu"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4e1361b5-ea65-41e8-8ca3-87ee9a393e52', 'Нож', 'нож', 'Noun', 'm', NULL, 'Dao',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.", "vi": "Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao."}]'::jsonb, 'Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.', 'Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть, - ве́шать", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên", "purposes": "ре́зать, нареза́ть, чистить, разреза́ть (2)", "purposes_vi": "cắt, thái, gọt, bổ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ed5a7d0b-d2e3-4eaa-b921-6456b5bb0537', 'Ло́жка', 'ложка', 'Noun', 'f', NULL, 'Thìa',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я ем суп ло́жкой.", "vi": "Tôi ăn súp bằng thìa."}]'::jsonb, 'Я ем суп ло́жкой.', 'Tôi ăn súp bằng thìa.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть, - ве́шать", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên", "purposes": "есть", "purposes_vi": "ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a3935754-ae5b-4966-b8b4-a910857a83b5', 'Ви́лка', 'вилка', 'Noun', 'f', NULL, 'Dĩa',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я ем мя́со ви́лкой.", "vi": "Tôi ăn thịt bằng dĩa."}]'::jsonb, 'Я ем мя́со ви́лкой.', 'Tôi ăn thịt bằng dĩa.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть, - ве́шать", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô, - treo lên", "purposes": "есть", "purposes_vi": "ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a4d23244-c2f4-4b53-9c2d-a7f91f7f08d2', 'Таре́лка', 'тарелка', 'Noun', 'f', NULL, 'Đĩa',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.", "vi": "Tôi đặt đĩa lên bàn và đặt trứng rán lên nó."}]'::jsonb, 'Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.', 'Tôi đặt đĩa lên bàn và đặt trứng rán lên nó.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô", "purposes": "есть, класть (блю́до)", "purposes_vi": "ăn, đặt (đồ ăn) lên"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '45671fcb-c09f-4551-b10a-4667806e3aec', 'Ми́ска', 'миска', 'Noun', 'f', NULL, 'Bát',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я налива́ю суп в ми́ску.", "vi": "Tôi đổ súp và bát."}]'::jsonb, 'Я налива́ю суп в ми́ску.', 'Tôi đổ súp và bát.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô", "purposes": "есть", "purposes_vi": "ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '716fb49f-09a1-4571-bd5b-ab16f6af7d9e', 'Ча́шка', 'чашка', 'Noun', 'f', NULL, 'Tách, chén',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я налива́ю чай в ча́шку, что́бы пить.", "vi": "Tôi rót trà vào tách để uống"}]'::jsonb, 'Я налива́ю чай в ча́шку, что́бы пить.', 'Tôi rót trà vào tách để uống',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô", "purposes": "пить", "purposes_vi": "uống"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '960783cb-1bbc-4f3d-b00a-b78337abdc5a', 'Стака́н', 'стакан', 'Noun', 'm', NULL, 'Cốc',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я налива́ю во́ду в стака́не, что́бы пить.", "vi": "Tôi rót nước vào cốc để uống"}]'::jsonb, 'Я налива́ю во́ду в стака́не, что́бы пить.', 'Tôi rót nước vào cốc để uống',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô", "purposes": "пить", "purposes_vi": "uống"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0a30c0e1-3aaa-44e4-84bd-a7ed52c89b61', '(Раздело́чная) доска́', 'разделочная доска', 'Noun', 'm', NULL, 'Thớt',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.", "vi": "Tôi đặt thớt lên bàn để thái rau trên thớt."}]'::jsonb, 'Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.', 'Tôi đặt thớt lên bàn để thái rau trên thớt.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< класть, - мыть >< вытира́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt nằm - rửa >< lau khô", "purposes": "реза́ть, нареза́ть", "purposes_vi": "thái, bổ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f6fe461c-589a-4838-a40b-a0c0816a99d2', 'Рако́вина', 'раковина', 'Noun', 'f', NULL, 'Bồn rửa',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я мо́ю посу́ду в рако́вине.", "vi": "Tôi rửa bát đĩa trong bồn rửa."}]'::jsonb, 'Я мо́ю посу́ду в рако́вине.', 'Tôi rửa bát đĩa trong bồn rửa.',
  '{"room": "Trong phòng bếp", "actions": "открыва́ть кран >< закрыва́ть кран, вытира́ть", "actions_vi": "mở vòi nước >< đóng vòi nước, lau chùi (loại bỏ nước)", "purposes": "мыть (посу́ду...)", "purposes_vi": "rửa (bát đĩa,...)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'bc41c504-dcfc-41ca-8888-4800dc0bffb2', 'Корзи́на', 'корзина', 'Noun', 'f', NULL, 'Giỏ',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng bếp', '[{"ru": "Я сохраню́ проду́кты в корзи́ну.", "vi": "Tôi đựng thực phẩm trong giỏ."}]'::jsonb, 'Я сохраню́ проду́кты в корзи́ну.', 'Tôi đựng thực phẩm trong giỏ.',
  '{"room": "Trong phòng bếp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng", "purposes": "храни́ть (проду́кты...)", "purposes_vi": "đựng (thực phẩm,...)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5145ca73-7c56-463b-910c-a1da6441a290', 'Крова́ть', 'кровать', 'Noun', 'm', NULL, 'Giường',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я ложу́сь спать на крова́ти.", "vi": "Tôi ngủ trên giường."}]'::jsonb, 'Я ложу́сь спать на крова́ти.', 'Tôi ngủ trên giường.',
  '{"room": "Trong phòng ngủ", "actions": "ста́вить, протира́ть", "actions_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)", "purposes": "ложи́ться спать, лежа́ть, отдыха́ть", "purposes_vi": "ngủ, nằm, nghỉ ngơi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f502e813-eafb-4c73-b17e-90bfaad27bf0', 'Шкаф', 'шкаф', 'Noun', 'm', NULL, 'Tủ quần áo',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я открыва́ю шкаф, что́бы убра́ть в него́ оде́жду.", "vi": "Tôi mở tủ quần áo ra để cất quần áo vào trong nó."}]'::jsonb, 'Я открыва́ю шкаф, что́бы убра́ть в него́ оде́жду.', 'Tôi mở tủ quần áo ra để cất quần áo vào trong nó.',
  '{"room": "Trong phòng ngủ", "actions": "- ста́вить, - открыва́ть >< закрыва́ть, - протира́ть", "actions_vi": "- đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn)", "purposes": "убира́ть оде́жду, ве́шать оде́жду", "purposes_vi": "cất quần áo, treo quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9efbc541-c0c1-4289-91c5-51d11a0af66e', 'Компью́тер', 'компьютер', 'Noun', 'm', NULL, 'Máy tính',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я включа́ю компью́тер, что́бы рабо́тать.", "vi": "Tôi bật máy tính lên để làm việc."}]'::jsonb, 'Я включа́ю компью́тер, что́бы рабо́тать.', 'Tôi bật máy tính lên để làm việc.',
  '{"room": "Trong phòng ngủ", "actions": "- ста́вить, - открыва́ть >< закрыва́ть, - протира́ть", "actions_vi": "- đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn)", "purposes": "рабо́тать, учи́ться, игра́ть в компью́терные и́гры", "purposes_vi": "làm việc, học, chơi điện tử"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7a2a6c02-d012-48ce-af29-f23ab2a027d8', 'Ла́мпа', 'лампа', 'Noun', 'f', NULL, 'Đèn ngủ, đèn học',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.", "vi": "Tôi bật đèn lên để đọc sách."}]'::jsonb, 'Я включа́ю ла́мпу, что́бы чита́ть кни́гу.', 'Tôi bật đèn lên để đọc sách.',
  '{"room": "Trong phòng ngủ", "actions": "- ста́вить, - открыва́ть >< закрыва́ть, - протира́ть", "actions_vi": "- đặt đứng, - mở >< đóng, - lau chùi (loại bỏ bụi bẩn)", "purposes": "чита́ть, рабо́тать", "purposes_vi": "đọc, làm việc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '844242fa-e452-4b17-b332-1fdd92bfb0b3', 'Окно́', 'окно', 'Noun', 'm', NULL, 'Cửa sổ',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "vi": "Tôi mở cửa sổ vào mỗi sáng để thông gió phòng."}]'::jsonb, 'Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.', 'Tôi mở cửa sổ vào mỗi sáng để thông gió phòng.',
  '{"room": "Trong phòng ngủ", "actions": "- открыва́ть >< закрыва́ть, - протира́ть", "actions_vi": "- mở >< đóng, - lau chùi (loại bỏ bụi bẩn)", "purposes": "прове́тривать ко́мнату", "purposes_vi": "thông gió phòng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ec5d2685-30d4-41c1-9a69-2e5402e9b780', '(Письме́нный) стол', 'письменныи стол', 'Noun', 'm', NULL, 'Bàn làm việc',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я учу́сь за (письме́нным) столо́м.", "vi": "Tôi học tại bàn."}]'::jsonb, 'Я учу́сь за (письме́нным) столо́м.', 'Tôi học tại bàn.',
  '{"room": "Trong phòng ngủ", "actions": "ста́вить, протира́ть/ вытира́ть", "actions_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước)", "purposes": "учи́ться, писа́ть, рабо́тать", "purposes_vi": "học, viết, làm việc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '955b2240-9c17-4476-89ca-2f9fc70fbeeb', 'Стул', 'стул', 'Noun', 'm', NULL, 'Ghế',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng ngủ', '[{"ru": "Я сижу́ за сту́лом, что́бы рабо́тать.", "vi": "Tôi ngồi vào ghế để làm việc."}]'::jsonb, 'Я сижу́ за сту́лом, что́бы рабо́тать.', 'Tôi ngồi vào ghế để làm việc.',
  '{"room": "Trong phòng ngủ", "actions": "ста́вить, протира́ть", "actions_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)", "purposes": "сидéть", "purposes_vi": "ngồi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '004d38b3-7c93-45ac-a925-f52711934282', 'Зе́ркало', 'зеркало', 'Noun', 'n', NULL, 'Gương',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Я вешаю́ зе́ркало на стену́, что́бы смотре́ть (в него́).", "vi": "Tôi treo gương lên tường để soi gương."}]'::jsonb, 'Я вешаю́ зе́ркало на стену́, что́бы смотре́ть (в него́).', 'Tôi treo gương lên tường để soi gương.',
  '{"room": "Trong phòng tắm", "actions": "веша́ть, протира́ть/ вытира́ть", "actions_vi": "treo, lau chùi (loại bỏ bụi bẩn)/ lau khô (loại bỏ nước)", "purposes": "смотре́ть (в зе́ркало)", "purposes_vi": "soi gương"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2291bc90-82f1-4b31-875e-275627221bd0', 'По́лка', 'полка', 'Noun', 'f', NULL, 'Kệ',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Я вешаю́ по́лку в ва́нной ко́мнате, что́бы поста́вить на неё шампу́нь.", "vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên kệ."}]'::jsonb, 'Я вешаю́ по́лку в ва́нной ко́мнате, что́бы поста́вить на неё шампу́нь.', 'Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên kệ.',
  '{"room": "Trong phòng tắm", "actions": "ве́шать", "actions_vi": "treo", "purposes": "ста́вить/ класть (ве́щи)", "purposes_vi": "đặt đứng/ đặt nằm (đồ vật)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd5ac47dd-56d9-4c53-bf23-2d1fefadc1c5', 'Ва́нна', 'ванна', 'Noun', 'f', NULL, 'Bồn tắm',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Я принима́ю ва́нну.", "vi": "Tôi đang tắm."}]'::jsonb, 'Я принима́ю ва́нну.', 'Tôi đang tắm.',
  '{"room": "Trong phòng tắm", "actions": "ста́вить, чи́стить", "actions_vi": "đặt đứng, cọ rửa", "purposes": "принима́ть (ванну)", "purposes_vi": "tằm (bồn)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c80acc7e-6410-4114-9230-3aab81ef73a2', 'Крючо́к', 'крючок', 'Noun', 'm', NULL, 'Móc treo',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Я ве́шаю крючо́к на стену́, что́бы веша́ть на него́ полоте́нце.", "vi": "Tôi treo móc lên tường để treo khăn tắm lên nó."}]'::jsonb, 'Я ве́шаю крючо́к на стену́, что́бы веша́ть на него́ полоте́нце.', 'Tôi treo móc lên tường để treo khăn tắm lên nó.',
  '{"room": "Trong phòng tắm", "actions": "ве́шать", "actions_vi": "treo", "purposes": "веша́ть полоте́нце, веша́ть оде́жду", "purposes_vi": "treo khăn, treo quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0869b03d-8f67-499f-a792-374316c12036', 'Полоте́нце', 'полотенце', 'Noun', 'n', NULL, 'Khăn tắm',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.", "vi": "Tôi lấy khăn từ móc treo để lau người."}]'::jsonb, 'Я беру́ полоте́нце с крючка́, что́бы вытира́ться.', 'Tôi lấy khăn từ móc treo để lau người.',
  '{"room": "Trong phòng tắm", "actions": "ве́шать, брать, складыва́ть", "actions_vi": "treo, lấy, gấp", "purposes": "вытира́ться, вытира́ть лицо́", "purposes_vi": "lau người, lau mặt"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e0f37bc5-929d-4607-aabf-50124e88c455', 'Унита́з', 'унитаз', 'Noun', 'm', NULL, 'Bồn cầu',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.", "vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn."}]'::jsonb, 'Когда́ я хожу́ в туале́т, я чи́щу унита́з.', 'Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn.',
  '{"room": "Trong phòng tắm", "actions": "ста́вить, чи́стить", "actions_vi": "đặt đứng, cọ rửa", "purposes": "ходи́ть в туале́т", "purposes_vi": "đi vệ sinh"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'df7acaa3-92b0-4704-b5b2-6d8ce9a43cd8', 'Рако́вина', 'раковина', 'Noun', 'f', NULL, 'Bồn rửa',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng tắm', '[{"ru": "Я мо́ю лицо́ в рако́вине.", "vi": "Tôi rửa mặt trong bồn rửa."}]'::jsonb, 'Я мо́ю лицо́ в рако́вине.', 'Tôi rửa mặt trong bồn rửa.',
  '{"room": "Trong phòng tắm", "actions": "ста́вить, чи́стить", "actions_vi": "đặt đứng, cọ rửa", "purposes": "мыть лицо́, мыть ру́ки", "purposes_vi": "rửa mặt, rửa tay"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd37320de-416a-45b2-a876-300364954ef5', 'Стира́льная маши́на', 'стиральная машина', 'Noun', 'f', NULL, 'máy giặt',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng giặt', '[{"ru": "Я стира́ю оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần áo bằng máy giặt."}]'::jsonb, 'Я стира́ю оде́жду в стира́льной маши́не.', 'Tôi giặt quần áo bằng máy giặt.',
  '{"room": "Trong phòng giặt", "actions": "- ста́вить, - открыва́ть >< закрыва́ть, - включа́ть >< выключа́ть", "actions_vi": "- đặt đứng, - mở >< đóng, - bật >< tắt", "purposes": "стира́ть оде́жду", "purposes_vi": "giặt quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'cdd7d8e4-2b0b-43b0-8612-e2609126a131', 'Утю́г', 'утюг', 'Noun', 'm', NULL, 'bàn là',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng giặt', '[{"ru": "Я гла́жу руба́шку утюго́м.", "vi": "Tôi là áo sơ mi bằng bàn là."}]'::jsonb, 'Я гла́жу руба́шку утюго́м.', 'Tôi là áo sơ mi bằng bàn là.',
  '{"room": "Trong phòng giặt", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить - включа́ть >< выключа́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng, - bật lên >< tắt đi", "purposes": "гла́дить оде́жду", "purposes_vi": "là quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '6ebc7287-0915-4dcc-b34f-76318b0d8d1e', 'Глади́льная доска́', 'гладильная доска', 'Noun', 'm', NULL, 'cầu là (bàn để là quần áo)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng giặt', '[{"ru": "Я гла́жу оде́жду на глади́льной доске́.", "vi": "Tôi là quần áo trên cầu là."}]'::jsonb, 'Я гла́жу оде́жду на глади́льной доске́.', 'Tôi là quần áo trên cầu là.',
  '{"room": "Trong phòng giặt", "actions": "- брать >< убира́ть, - ста́вить - раскла́дывать >< складыва́ть", "actions_vi": "- lấy ra >< cất vào, - đặt đứng, - mở ra >< gấp lại", "purposes": "гла́дить оде́жду", "purposes_vi": "là quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0249d1aa-8644-46d4-9e59-c0935aed20c2', 'Су́шилка', 'сушилка', 'Noun', 'f', NULL, 'giàn phơi',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Trong phòng giặt', '[{"ru": "Я сушу́ оде́жду на су́шилке.", "vi": "Tôi phơi quần áo trên giàn phơi đồ."}]'::jsonb, 'Я сушу́ оде́жду на су́шилке.', 'Tôi phơi quần áo trên giàn phơi đồ.',
  '{"room": "Trong phòng giặt", "actions": "- брать >< убира́ть, - ста́вить - раскла́дывать >< складыва́ть", "actions_vi": "- lấy ra >< cất vào, - đặt đứng, - mở ra >< gấp lại", "purposes": "суши́ть оде́жду", "purposes_vi": "phơi khô quần áo"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b12b3c0d-c878-43b0-9f16-b03362cb55a3', 'мыть / вы́мыть >< вытира́ть / вы́тереть', 'мыть  вымыть  вытирать  вытереть', 'Verb', NULL, 'ipfv/pfv', 'rửa >< lau khô (loại bỏ nước)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9419ebc5-24c5-441d-a427-b87225ab1ee5', 'держа́ть / подержа́ть', 'держать  подержать', 'Verb', NULL, 'ipfv/pfv', 'cầm',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '210c5df5-4c53-476b-b878-7d2288cc0292', 'брать / взять >< убира́ть / убра́ть', 'брать  взять  убирать  убрать', 'Verb', NULL, 'ipfv/pfv', 'lấy >< cất',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '86cbc395-a8a6-4173-81ad-28357de6e872', 'открыва́ть / откры́ть >< закрыва́ть / закры́ть', 'открывать  открыть  закрывать  закрыть', 'Verb', NULL, 'ipfv/pfv', 'mở >< đóng',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '363d27e6-456b-471c-93fa-583a022e77a8', 'включа́ть / включи́ть >< выключа́ть / вы́ключить', 'включать  включить  выключать  выключить', 'Verb', NULL, 'ipfv/pfv', 'bật >< tắt',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1a08104f-c11f-42d4-a8d1-07737d111e18', 'стели́ть / постели́ть >< свора́чивать / сверну́ть', 'стелить  постелить  сворачивать  свернуть', 'Verb', NULL, 'ipfv/pfv', 'trải >< cuộn',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2f392fff-03ea-48da-935a-bf70e5a1a502', 'стира́ть / постира́ть >< суши́ть / вы́сушить', 'стирать  постирать  сушить  высушить', 'Verb', NULL, 'ipfv/pfv', 'giặt >< phơi',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f658ddff-371a-4c69-ac23-6b9407c97c0a', 'раскла́дывать / разложи́ть >< скла́дывать / сложи́ть', 'раскладывать  разложить  складывать  сложить', 'Verb', NULL, 'ipfv/pfv', 'bày ra >< xếp lại',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4aa504f3-db94-442e-b77c-b1915c632a7f', '- ста́вить / поста́вить - класть / положи́ть', '- ставить  поставить - класть  положить', 'Verb', NULL, 'ipfv/pfv', '- đặt đứng - đặt nằm',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '34124de6-0195-4ef2-b556-d62500645e1a', 'снима́ть / снять', 'снимать  снять', 'Verb', NULL, 'ipfv/pfv', 'cởi; nhấc ra',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '6d9e5a79-9fba-4b07-89d9-f63ba708455d', 'гла́дить / погла́дить (оде́жду)', 'гладить  погладить одежду', 'Verb', NULL, 'ipfv/pfv', 'ủi (quần áo)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4f05e3e1-86b2-4ef0-9787-8a53580b9319', 'протира́ть / протере́ть', 'протирать  протереть', 'Verb', NULL, 'ipfv/pfv', 'lau chùi (loại bỏ bụi bẩn)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd9e1a93f-c964-42b2-990a-17b10fecc19b', 'ве́шать / пове́сить', 'вешать  повесить', 'Verb', NULL, 'ipfv/pfv', 'treo',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5b13ed3d-b839-47cc-b5b2-1a4e02eeae03', 'чи́стить / почи́стить', 'чистить  почистить', 'Verb', NULL, 'ipfv/pfv', 'cọ rửa, làm sạch',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'bfd5b53d-c32e-4a07-99c7-a03932c56ef2', 'сиде́ть', 'сидеть', 'Verb', NULL, 'pfv', 'ngồi',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '26ab179d-0f9d-4602-bf12-30e9f71b37da', 'украша́ть / укра́сить', 'украшать  украсить', 'Verb', NULL, 'ipfv/pfv', 'trang trí',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7e97d4c6-7c64-4495-be80-e014f24b1280', 'лежа́ть', 'лежать', 'Verb', NULL, 'ipfv', 'nằm',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '50974908-c94b-4f5b-96b0-4dd3f2b4eb33', 'храни́ть / сохрани́ть', 'хранить  сохранить', 'Verb', NULL, 'ipfv/pfv', 'giữ gìn, cất giữ, lưu trữ',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ddf34abf-0814-44cd-9e11-98a2df87ad75', 'ложи́ться / лечь спать', 'ложиться  лечь спать', 'Verb', NULL, 'ipfv/pfv', 'ngủ',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1af74271-dd1a-407d-8d53-a1f960dcffc2', 'смотре́ть / посмотре́ть', 'смотреть  посмотреть', 'Verb', NULL, 'ipfv/pfv', 'xem',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3038c747-80d1-4152-9e31-51392c5409cd', 'отдыха́ть / отдохну́ть', 'отдыхать  отдохнуть', 'Verb', NULL, 'ipfv/pfv', 'nghỉ ngơi',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3ea765dd-755c-4aa2-935d-dadc9423420b', 'сажа́ть / посади́ть (цветы́)', 'сажать  посадить цветы', 'Verb', NULL, 'ipfv/pfv', 'trồng (hoa)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '454d0388-42e1-4b1e-9b59-adc8e440e28f', 'рабо́тать', 'работать', 'Verb', NULL, 'ipfv', 'làm việc',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b59a3d69-8a08-425a-b062-34d8b4745ae7', 'прове́тривать / прове́трить (ко́мнату)', 'проветривать  проветрить комнату', 'Verb', NULL, 'ipfv/pfv', 'thông gió (phòng)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ceb44524-488a-483e-8ed9-b9baa65a6144', 'есть / съесть (блю́до)', 'есть  съесть блюдо', 'Verb', NULL, 'ipfv/pfv', 'ăn (món ăn)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'acb1f7c1-654a-4b98-ac2a-7bd8cd2b9e96', 'гото́вить / приготов́ить (блю́до)', 'готовить  приготовить блюдо', 'Verb', NULL, 'ipfv/pfv', 'nấu (món ăn)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b9f940bf-3be7-4310-84cf-fd680492d585', 'вари́ть / сва́рить', 'варить  сварить', 'Verb', NULL, 'ipfv/pfv', 'luộc (nấu với nước)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '257a9a17-4d30-42df-8e66-4cfb12efab56', 'пить / вы́пить (воду́, чай)', 'пить  выпить воду чаи', 'Verb', NULL, 'ipfv/pfv', 'uống (nước, trà)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3c2763c4-b1dc-4932-b206-f6cb1ba7cca8', 'жа́рить / поджа́рить (мя́со, ры́бу)', 'жарить  поджарить мясо рыбу', 'Verb', NULL, 'ipfv/pfv', 'rán (thịt, cá)',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '79869d94-06e8-4bba-ae65-861a6476de47', 'принима́ть / приня́ть (ванну)', 'принимать  принять ванну', 'Verb', NULL, 'ipfv/pfv', 'tắm bồn',
  'e5fb310b-7f5f-4d1a-bf06-cc16d4be4ed4', 'do_dung_gia_dinh', 'Động từ thao tác & công dụng', '[]'::jsonb, '', '',
  '{"type": "Cặp động từ thao tác / công dụng gia đình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '36bdd998-c5af-492d-99d3-1937a3ecc0db', 'Рюкза́к', 'рюкзак', 'Noun', 'm', NULL, 'cặp sách',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm sách và tài liệu', '[{"ru": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.", "vi": "Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp sách lại và đeo nó lên."}]'::jsonb, 'Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.', 'Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp sách lại và đeo nó lên.',
  '{"category": "Nhóm sách và tài liệu", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть >< закрыва́ть, - надева́ть, веша́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở ra >< đóng vào, - đeo lên, treo lên", "purposes": "храни́ть (шко́льные принадле́жности), носи́ть", "purposes_vi": "cất giữ (đồ dùng học tập), mang"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '96c99871-b754-4b88-9c95-b363094052db', 'Кни́га', 'книга', 'Noun', 'f', NULL, 'Sách',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm sách và tài liệu', '[{"ru": "Я достаю́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к (1).", "vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."}]'::jsonb, 'Я достаю́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к (1).', 'Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.',
  '{"category": "Nhóm sách và tài liệu", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть >< закрыва́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở ra >< đóng vào", "purposes": "чита́ть, учи́ть", "purposes_vi": "đọc, học"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd4cf1438-a793-44e5-ba16-3bd2228fcd7b', 'Тетра́дь', 'тетрадь', 'Noun', 'm', NULL, 'Vở',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm sách và tài liệu', '[{"ru": "Я достаю́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.", "vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp."}]'::jsonb, 'Я достаю́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.', 'Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp.',
  '{"category": "Nhóm sách và tài liệu", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть >< закрыва́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở ra >< đóng vào", "purposes": "писа́ть", "purposes_vi": "viết, làm bài tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '6fef2a22-f9b7-448c-ad5e-277dd0c06f34', 'Слова́рь', 'словарь', 'Noun', 'm', NULL, 'Từ điển',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm sách và tài liệu', '[{"ru": "Я беру́ слова́рь в библиоте́ке, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ слова́рь.", "vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại."}]'::jsonb, 'Я беру́ слова́рь в библиоте́ке, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ слова́рь.', 'Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại.',
  '{"category": "Nhóm sách và tài liệu", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть >< закрыва́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở ra >< đóng vào", "purposes": "смотре́ть слова́", "purposes_vi": "tra từ vựng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '79965afd-2b2b-4266-8dab-3060dafe6a7b', 'Бума́га', 'бумага', 'Noun', 'f', NULL, 'Giấy',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm sách và tài liệu', '[{"ru": "Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик.", "vi": "Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay."}]'::jsonb, 'Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик.', 'Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay.',
  '{"category": "Nhóm sách và tài liệu", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - складыва́ть, реза́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - gấp, cắt", "purposes": "писа́ть, рисова́ть, печа́тать", "purposes_vi": "viết, vẽ, in ra"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd8a1aff3-6ccf-45ed-a1d5-9d5f74ee9f53', 'Пена́л', 'пенал', 'Noun', 'm', NULL, 'Hộp bút',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Я достаю́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.", "vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp."}]'::jsonb, 'Я достаю́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.', 'Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть >< закрыва́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở ra >< đóng vào", "purposes": "храни́ть (шко́льные принадле́жности)", "purposes_vi": "cất giữ (đồ dùng học tập)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '80e56c40-4477-415c-9535-69a00f62a52d', 'Пена́л', 'пенал', 'Noun', 'm', NULL, 'Bút bi',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Я достаю́ ру́чку из пенала́, что́бы писа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.", "vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút."}]'::jsonb, 'Я достаю́ ру́чку из пенала́, что́бы писа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.', 'Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть колпачо́к >< закрыва́ть колпачо́к", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở nắp ra >< đóng nắp vào", "purposes": "писа́ть", "purposes_vi": "viết"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7764da51-f813-4516-8259-1716df669493', 'Каранда́ш - Точи́лка', 'карандаш - точилка', 'Noun', 'f', NULL, 'Bút chì - gọt bút chì',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Я достаю́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.", "vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút."}]'::jsonb, 'Я достаю́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.', 'Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm", "purposes": "писа́ть, рисова́ть - точи́ть каранда́ш", "purposes_vi": "viết, vẽ; gọt bút chì"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '03f08c07-b020-46ae-a21a-0db2238aa585', 'Ла́стик', 'ластик', 'Noun', 'm', NULL, 'Tẩy',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.", "vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy."}]'::jsonb, 'Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.', 'Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm", "purposes": "стира́ть", "purposes_vi": "tẩy xóa"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f3f8e771-586d-4851-826f-05ddbb21be77', 'Лине́йка', 'линеика', 'Noun', 'f', NULL, 'Thước kẻ',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.", "vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ."}]'::jsonb, 'Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.', 'Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm", "purposes": "черти́ть", "purposes_vi": "kẻ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '97426807-f625-4969-b6ff-07ecc95f5056', 'Цветны́е карандаши́', 'цветные карандаши', 'Noun', 'm', NULL, 'Bút chì màu',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я достаю́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.", "vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này."}]'::jsonb, 'Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я достаю́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.', 'Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm", "purposes": "раскра́шивать", "purposes_vi": "tô màu"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4f4820e9-51d1-4277-ba6e-720a2fc606e9', 'Маркёр', 'маркер', 'Noun', 'm', NULL, 'Bút dạ',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Nhóm dụng cụ học tập trong cặp', '[{"ru": "Мне ну́жно писа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы писа́ть им на бе́лой доске́.", "vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó."}]'::jsonb, 'Мне ну́жно писа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы писа́ть им на бе́лой доске́.', 'Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó.',
  '{"category": "Nhóm dụng cụ học tập trong cặp", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть колпачо́к >< закрыва́ть колпачо́к", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở nắp ra >< đóng nắp vào", "purposes": "писа́ть, отмеча́ть", "purposes_vi": "viết, đánh dấu (nói chung)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '16f8d02c-e024-42fa-83d2-7a01d171a822', 'Тря́пка', 'тряпка', 'Noun', 'f', NULL, 'Khăn lau',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.", "vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn."}]'::jsonb, 'Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.', 'Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "- держа́ть >< класть, - стира́ть, складыва́ть", "actions_vi": "- cầm >< đặt nằm, - giặt, gấp", "purposes": "протира́ть (доску́)", "purposes_vi": "lau (bảng)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0224cf11-1eab-4748-9d67-fb1cce458085', 'Чёрная доска́', 'черная доска', 'Noun', 'm', NULL, 'Bảng đen',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка, ученики́ бу́дут протира́ть доску́ тря́пкой.", "vi": "Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."}]'::jsonb, 'Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка, ученики́ бу́дут протира́ть доску́ тря́пкой.', 'Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "веша́ть, протира́ть доску́", "actions_vi": "treo, lau bảng", "purposes": "писа́ть, рисова́ть", "purposes_vi": "viết, vẽ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ebe9c649-a271-48f7-916b-0fe9da1ab033', 'Мел - Коробка (для ме́ла)', 'мел - коробка для мела', 'Noun', 'm', NULL, 'Phấn - Hộp (phấn)',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Учи́тельница обы́чно пи́шет материа́л уро́ка на чёрной доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.", "vi": "Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn."}]'::jsonb, 'Учи́тельница обы́чно пи́шет материа́л уро́ка на чёрной доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.', 'Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть >< закрыва́ть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở ra >< đóng vào", "purposes": "писа́ть, рисова́ть", "purposes_vi": "viết, vẽ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7ca4c91b-d83e-4080-8152-225194d86423', 'Бе́лая доска́', 'белая доска', 'Noun', 'm', NULL, 'Bảng trắng',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. После заня́тия, студе́нты бу́дут протира́ть доску́ гу́бкой.", "vi": "Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."}]'::jsonb, 'Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. После заня́тия, студе́нты бу́дут протира́ть доску́ гу́бкой.', 'Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "веша́ть, протира́ть доску́", "actions_vi": "treo, lau bảng", "purposes": "писа́ть, рисова́ть", "purposes_vi": "viết, vẽ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7b9555d0-b939-4a9c-bdcc-c3e2bc191825', 'Губка́ (для доски́)', 'губка для доски', 'Noun', 'm', NULL, 'Mút lau (bảng)',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Я протира́ю бе́лую доску́ губко́й.", "vi": "Tôi đang lau bảng trắng bằng mút lau."}]'::jsonb, 'Я протира́ю бе́лую доску́ губко́й.', 'Tôi đang lau bảng trắng bằng mút lau.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm", "purposes": "протира́ть (доску́)", "purposes_vi": "lau (bảng)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b6fdf72b-8726-4f16-9438-13b4ca44d67b', 'Маркёр', 'маркер', 'Noun', 'm', NULL, 'Bút dạ',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.", "vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ."}]'::jsonb, 'Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.', 'Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "- брать >< убира́ть, - держа́ть >< ста́вить/ класть, - открыва́ть колпачо́к >< закрыва́ть колпачо́к", "actions_vi": "- lấy ra >< cất vào, - cầm >< đặt đứng/ đặt nằm, - mở nắp ra >< đóng nắp vào", "purposes": "писа́ть, отмеча́ть", "purposes_vi": "viết, đánh dấu (nói chung)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b517937c-5cf3-44b8-9a01-ed24ad2a67a4', 'Прое́ктор', 'проектор', 'Noun', 'm', NULL, 'Máy chiếu',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Преподава́тель обы́чно показыва́ет презента́цию прое́ктором.", "vi": "Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu."}]'::jsonb, 'Преподава́тель обы́чно показыва́ет презента́цию прое́ктором.', 'Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "веша́ть, включа́ть >< выключа́ть", "actions_vi": "treo, bật lên >< tắt đi", "purposes": "показыва́ть", "purposes_vi": "trình chiếu"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'cce83641-ae9a-471d-8e34-8db14f925f3d', 'Компью́тер', 'компьютер', 'Noun', 'm', NULL, 'Máy tính',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Thiết bị & dụng cụ lớp học', '[{"ru": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.", "vi": "Giảng viên bật máy tính và xem bài giảng trên màn hình (của) máy tính."}]'::jsonb, 'Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.', 'Giảng viên bật máy tính và xem bài giảng trên màn hình (của) máy tính.',
  '{"category": "Thiết bị & dụng cụ lớp học", "actions": "ста́вить, включа́ть >< выключа́ть", "actions_vi": "đặt đứng, bật lên >< tắt đi", "purposes": "рабо́тать, учи́ться, игра́ть в компью́терные игры́", "purposes_vi": "làm việc, học, chơi điện tử"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'aac9dcd4-1613-43c9-a756-ff0ecdf62df6', 'брать / взять >< убира́ть / убра́ть', 'брать  взять  убирать  убрать', 'Verb', NULL, 'ipfv/pfv', 'lấy ra >< cất vào',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '580914c0-93ac-4e5e-aba7-64e5f2472a42', 'держа́ть / подержа́ть', 'держать  подержать', 'Verb', NULL, 'ipfv/pfv', 'cầm',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '594b98e6-98e6-407c-8c17-b24c1bbb951f', '- ста́вить / поста́вить - класть / положи́ть', '- ставить  поставить - класть  положить', 'Verb', NULL, 'ipfv/pfv', '- đặt đứng - đặt nằm',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '81cd4e3e-3dcc-4e61-b7e4-773215c32942', 'открыва́ть / откры́ть (колпачо́к) >< закрыва́ть / закры́ть (колпачо́к)', 'открывать  открыть колпачок  закрывать  закрыть колпачок', 'Verb', NULL, 'ipfv/pfv', 'mở (nắp) >< đóng (nắp)',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '659808af-f9f5-4357-8b75-7e44ec203a52', 'включа́ть / включа́ть >< выключа́ть / выклю́чить', 'включать  включать  выключать  выключить', 'Verb', NULL, 'ipfv/pfv', 'bật >< tắt',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '62edad5f-2e6e-4025-9d37-7aca6b36bd25', 'складыва́ть >< сложи́ть', 'складывать  сложить', 'Verb', NULL, 'pfv', 'gấp lại',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c6ff789d-03ab-4f22-bc04-25de8ff3d9bb', 'протира́ть >< протере́ть доску́', 'протирать  протереть доску', 'Verb', NULL, 'pfv', 'lau bảng',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3a240ccc-e420-45b6-9645-298bab5e5b63', 'надева́ть / наде́ть', 'надевать  надеть', 'Verb', NULL, 'ipfv/pfv', 'đeo, mặc, đội',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2ffc9497-9c07-4b97-b251-aa4fa538e574', 'веша́ть / пове́сить', 'вешать  повесить', 'Verb', NULL, 'ipfv/pfv', 'treo',
  'b464e205-c487-4c96-b66a-be27b745a400', 'do_dung_hoc_tap', 'Động từ thao tác học tập', '[]'::jsonb, '', '',
  '{"type": "Động từ thao tác đồ dùng học tập"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5009b8bc-bee7-4986-85f1-1a9bda448e6c', 'Авто́бус — остановка', 'автобус  остановка', 'Noun', 'm', NULL, 'Xe buýt - điểm dừng',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện công cộng', '[{"ru": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я е́ду в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.", "vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."}]'::jsonb, 'Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я е́ду в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.', 'Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi (bằng phương tiện) (một chiều/hai chiều) (1 lần/ thường xuyên)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0e25bfa7-dcbb-407b-9f03-33fe8d2761ba', 'Трамва́й — остановка', 'трамваи  остановка', 'Noun', 'm', NULL, 'Xe tàu điện ( loại có đường ray riêng) - điểm dừng',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện công cộng', '[{"ru": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня е́ду домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.", "vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng xe điện."}]'::jsonb, 'Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня е́ду домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.', 'Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng xe điện.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi bằng phương tiện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7cda5e5d-5ceb-4452-be9f-cf6a1aa6cb78', 'Тролле́йбус — остановка', 'троллеибус  остановка', 'Noun', 'm', NULL, 'Xe điện (loại không có đường ray riêng) - điểm dừng',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện công cộng', '[{"ru": "Я иду́ (пешко́м) на остано́вку от до́ма, потому́ что сего́дня я е́ду на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.", "vi": "Tôi đang đi bộ đến điểm dừng xe điện bánh hơi từ nhà, vì hôm nay tôi đi đến quảng trường bằng xe điện bánh hơi. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện."}]'::jsonb, 'Я иду́ (пешко́м) на остано́вку от до́ма, потому́ что сего́дня я е́ду на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.', 'Tôi đang đi bộ đến điểm dừng xe điện bánh hơi từ nhà, vì hôm nay tôi đi đến quảng trường bằng xe điện bánh hơi. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi bằng phương tiện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '68cce411-a8a3-489a-9c50-8872b3a83f76', 'Метро́ — ста́нция метро́', 'метро  станция метро', 'Noun', 'm', NULL, 'Tàu điện ngầm - ga tàu điện ngầm',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện công cộng', '[{"ru": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что сейча́с я е́ду на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты, я е́зжу на центра́льный ры́нок на метро́.", "vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ công ty, vì bây giờ tôi đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."}]'::jsonb, 'Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что сейча́с я е́ду на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты, я е́зжу на центра́льный ры́нок на метро́.', 'Tôi đang đi bộ đến ga tàu điện ngầm từ công ty, vì bây giờ tôi đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi bằng phương tiện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0b5461e4-a495-4594-a605-3f5ce6bfcbd3', 'По́езд — вокза́л', 'поезд  вокзал', 'Noun', 'm', NULL, 'Tàu hỏa - ga tàu hỏa',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện công cộng', '[{"ru": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я е́ду в Москву́ на по́езде. Ка́ждую неде́лю, я е́зжу в Москву́ на по́езде и обра́тно.", "vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."}]'::jsonb, 'Я е́ду на вокза́л на такси́, потому́ что сего́дня я е́ду в Москву́ на по́езде. Ка́ждую неде́лю, я е́зжу в Москву́ на по́езде и обра́тно.', 'Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi bằng phương tiện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '23874003-c1df-4f0c-bf56-731e926ad262', 'Самолёт — аэропо́рт', 'самолет  аэропорт', 'Noun', 'm', NULL, 'Máy bay - sân bay',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện công cộng', '[{"ru": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я лечу́ в Казань на самолёте. Ка́ждый ме́сяц, я лета́ю в Казань на самолёте и обра́тно.", "vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về."}]'::jsonb, 'Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я лечу́ в Казань на самолёте. Ка́ждый ме́сяц, я лета́ю в Казань на самолёте и обра́тно.', 'Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về.',
  '{"verbs": "лете́ть / лета́ть", "verbs_vi": "bay (một chiều/hai chiều) (1 lần/ thường xuyên)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '391f112b-dbf4-40e9-94dc-839b79402e1b', 'Маши́на — гара́ж', 'машина  гараж', 'Noun', 'm', NULL, 'ô tô - gara',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện cá nhân', '[{"ru": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня е́ду на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.", "vi": "Tôi đi đến gara để lấy ô tô, vì hôm nay tôi đi làm bằng ô tô. Hằng ngày, tôi đều đi làm bằng ô tô."}]'::jsonb, 'Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня е́ду на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.', 'Tôi đi đến gara để lấy ô tô, vì hôm nay tôi đi làm bằng ô tô. Hằng ngày, tôi đều đi làm bằng ô tô.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi (bằng phương tiện) (một chiều/hai chiều) (1 lần/ thường xuyên)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8040b45c-d60c-49f4-980a-7181530e58f8', 'Мотоци́кл — гара́ж', 'мотоцикл  гараж', 'Noun', 'm', NULL, 'xe máy - gara',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện cá nhân', '[{"ru": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня е́ду в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.", "vi": "Tôi đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy."}]'::jsonb, 'Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня е́ду в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.', 'Tôi đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi bằng phương tiện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '08c008a0-c59f-4f0a-9229-c928f85ec46e', 'Велосипе́д — гара́ж', 'велосипед  гараж', 'Noun', 'm', NULL, 'xe đạp - gara',
  'b7398459-c824-493f-bf4a-3b96f509077b', 'phuong_tien_giao_thong', 'Phương tiện cá nhân', '[{"ru": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня е́ду в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.", "vi": "Tôi đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên."}]'::jsonb, 'Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня е́ду в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.', 'Tôi đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên.',
  '{"verbs": "е́хать / е́здить", "verbs_vi": "đi bằng phương tiện"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '40d5cb0a-f970-4612-87f5-ae1677ebc034', '- В шко́ле (шко́ла) - В акаде́мии (акаде́мия) - В институ́те (институ́т) - В университе́те (университе́т)', '- в школе школа - в академии академия - в институте институт - в университете университет', 'Noun', NULL, NULL, '- Trường học - Học viện - Viện - Đại học',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "Я иду́ в шко́лу/ акаде́мию/ институ́т/ университе́т, что́бы учи́ться. Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те.", "vi": "Tôi đi đến trường học/ học viện/ viện/ đại học để học. Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học."}]'::jsonb, 'Я иду́ в шко́лу/ акаде́мию/ институ́т/ университе́т, что́бы учи́ться. Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те.', 'Tôi đi đến trường học/ học viện/ viện/ đại học để học. Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học.',
  '{"category": "Cơ sở học tập", "actions": "учи́ться, учи́ть, изуча́ть", "actions_vi": "học tập, học, nghiên cứu (học chuyên sâu)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1cb43a25-116f-4607-9f33-48124d19e795', 'В библиоте́ке (библиоте́ка)', 'в библиотеке библиотека', 'Noun', NULL, NULL, 'Thư viện',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.", "vi": "Tôi đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện."}]'::jsonb, 'Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.', 'Tôi đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện.',
  '{"category": "Cơ sở học tập", "actions": "чита́ть", "actions_vi": "đọc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'cc412c17-6e73-47e5-a0a1-4b606217dae1', 'На ка́федре (ка́федра)', 'на кафедре кафедра', 'Noun', NULL, NULL, 'Phòng chuyên môn',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "Преподава́тели иду́т на кафе́дру, что́бы встре́титься. Они́ ча́сто встреча́ются на кафе́дре.", "vi": "Các giảng viên đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn."}]'::jsonb, 'Преподава́тели иду́т на кафе́дру, что́бы встре́титься. Они́ ча́сто встреча́ются на кафе́дре.', 'Các giảng viên đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn.',
  '{"category": "Cơ sở học tập", "actions": "встреча́ться", "actions_vi": "gặp mặt, họp mặt"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a5189af1-7be7-4adc-8899-9422814481e0', 'В декана́те (декана́т)', 'в деканате деканат', 'Noun', NULL, NULL, 'Văn phòng khoa',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческие биле́ты. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.", "vi": "Các sinh viên đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."}]'::jsonb, 'Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческие биле́ты. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.', 'Các sinh viên đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.',
  '{"category": "Cơ sở học tập", "actions": "подава́ть (докуме́нты), получа́ть (докуме́нты)", "actions_vi": "nộp (giấy tờ), nhận (giấy tờ)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '04cd927f-0ba1-4c07-81ea-0e45a56d059f', 'В общежи́тии (общежи́тие)', 'в общежитии общежитие', 'Noun', NULL, NULL, 'Ký túc xá',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "Я живу́ в общежи́тии № 5.", "vi": "Tôi sống ở ký túc xá số 5."}]'::jsonb, 'Я живу́ в общежи́тии № 5.', 'Tôi sống ở ký túc xá số 5.',
  '{"category": "Cơ sở học tập", "actions": "жить", "actions_vi": "ở"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9979f43d-f3d6-4a0a-884d-10ecfec0e420', '- На заня́тии (заня́тие): + На ле́кции (ле́кция) + На семина́ре (семина́р)', '- на занятии занятие  на лекции лекция  на семинаре семинар', 'Noun', NULL, NULL, '- Buổi học: + Giảng đường + Buổi thảo luận chuyên đề (seminar)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́. - Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях. - Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.", "vi": "- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm. - Tôi đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường. - Tôi đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar."}]'::jsonb, '- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́. - Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях. - Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.', '- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm. - Tôi đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường. - Tôi đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar.',
  '{"category": "Cơ sở học tập", "actions": "слу́шать ле́кцию - выступа́ть", "actions_vi": "nghe giảng - thuyết trình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'fc9b14d5-c44b-4b45-ac80-c3370d52edc8', 'В лаборато́рии (лаборато́рия)', 'в лаборатории лаборатория', 'Noun', NULL, NULL, 'Phòng thí nghiệm',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở học tập', '[{"ru": "Сего́дня я иду́ в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.", "vi": "Hôm nay tôi đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm."}]'::jsonb, 'Сего́дня я иду́ в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.', 'Hôm nay tôi đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm.',
  '{"category": "Cơ sở học tập", "actions": "иссле́довать", "actions_vi": "nghiên cứu"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'bf67069b-c8e4-45cd-b97f-2fb40100becd', 'В апте́ке (апте́ка)', 'в аптеке аптека', 'Noun', NULL, NULL, 'Hiệu thuốc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở y tế', '[{"ru": "Когда я боле́ю, я иду́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це.", "vi": "Khi tôi ốm, tôi đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện."}]'::jsonb, 'Когда я боле́ю, я иду́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це.', 'Khi tôi ốm, tôi đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.',
  '{"category": "Cơ sở y tế", "actions": "покупа́ть лека́рства", "actions_vi": "mua thuốc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e92ff294-e6e5-494a-8f76-38e244224854', '- В поликли́нике (поликли́ника) - В больни́це (больни́ца)', '- в поликлинике поликлиника - в больнице больница', 'Noun', NULL, NULL, '- Phòng khám - Bệnh viện',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở y tế', '[]'::jsonb, '', '',
  '{"category": "Cơ sở y tế", "actions": "идти́/е́хать к врачу́", "actions_vi": "đi gặp bác sĩ (đi khám bệnh)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c5cdcd77-258c-4958-a0c1-c1238aa41133', '- В музе́е (музе́й) - На вы́ставке (вы́ставка)', '- в музее музеи - на выставке выставка', 'Noun', NULL, NULL, '- Bảo tàng - Buổi triển lãm',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "vi": "Tôi đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng ở những buổi triển lãm."}]'::jsonb, 'Я иду́ в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.', 'Tôi đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng ở những buổi triển lãm.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "смотре́ть карти́ны", "actions_vi": "xem tranh"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '56d9949a-c0b7-445c-8733-dc6992bd7b5f', 'В теа́тре (теа́тр)', 'в театре театр', 'Noun', NULL, NULL, 'Nhà hát',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.", "vi": "Tôi đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát."}]'::jsonb, 'Я иду́ в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.', 'Tôi đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "смотре́ть спекта́кль", "actions_vi": "xem vở kịch"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '58a926de-c115-42ae-b401-4a44128d052b', 'На конце́рте (конце́рт)', 'на концерте концерт', 'Noun', NULL, NULL, 'Buổi hòa nhạc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.", "vi": "Tôi đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc."}]'::jsonb, 'Я иду́ на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.', 'Tôi đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "слу́шать му́зыку, смотре́ть выступле́ние", "actions_vi": "nghe nhạc, xem biểu diễn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '929e1b79-eea9-4658-9a26-aedd33da13ff', 'В кинотеа́тре (кинотеа́тр)', 'в кинотеатре кинотеатр', 'Noun', NULL, NULL, 'Rạp chiếu phim',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.", "vi": "Tôi đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim."}]'::jsonb, 'Я иду́ в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.', 'Tôi đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "смотре́ть фильм", "actions_vi": "xem phim"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'eb569da6-0901-40bd-b046-6d6b72d17145', 'В клу́бе (клуб)', 'в клубе клуб', 'Noun', NULL, NULL, 'Câu lạc bộ',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.", "vi": "Tôi đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ."}]'::jsonb, 'Я иду́ в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.', 'Tôi đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "встреча́ться с кем?", "actions_vi": "gặp gỡ ai?"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'aa87dad3-67f6-4fc7-a0ee-fd0a6c964d89', 'На дискоте́ке (дискоте́ка)', 'на дискотеке дискотека', 'Noun', NULL, NULL, 'Vũ trường',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.", "vi": "Tôi đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường."}]'::jsonb, 'Я иду́ на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.', 'Tôi đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "танцева́ть, слу́шать му́зыку", "actions_vi": "nhảy, nghe nhạc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3d5de706-9ed4-4958-a682-ce5a02e0312d', 'В ци́рке (цирк)', 'в цирке цирк', 'Noun', NULL, NULL, 'Rạp xiếc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.", "vi": "Tôi đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc."}]'::jsonb, 'Я иду́ в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.', 'Tôi đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "смотре́ть цирк", "actions_vi": "xem xiếc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ebb22024-7701-43db-be12-04044b2f08e8', 'В зоопа́рке (зоопа́рк)', 'в зоопарке зоопарк', 'Noun', NULL, NULL, 'Sở thú',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.", "vi": "Tôi đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú."}]'::jsonb, 'Я иду́ в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.', 'Tôi đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "смотре́ть живо́тных", "actions_vi": "xem động vật"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b641abf4-aa95-4830-abee-c1dd17dbcc74', 'На стадио́не (стадио́н)', 'на стадионе стадион', 'Noun', NULL, NULL, 'Sân vận động',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.", "vi": "Tôi đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động."}]'::jsonb, 'Я иду́ на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.', 'Tôi đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "смотре́ть матч, игра́ть в что?", "actions_vi": "xem trận đấu, chơi cái gì?"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'db3ba353-114a-4a29-b2e0-7be05960b88b', 'На экску́рсии (экску́рсия)', 'на экскурсии экскурсия', 'Noun', NULL, NULL, 'Chuyến tham quan',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở vui chơi giải trí, thể thao', '[{"ru": "Я иду́ на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.", "vi": "Tôi đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan."}]'::jsonb, 'Я иду́ на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.', 'Tôi đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan.',
  '{"category": "Cơ sở vui chơi giải trí, thể thao", "actions": "посеща́ть", "actions_vi": "tham quan"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5f925e58-1e66-49fd-a0bd-4cb3ea98da0d', 'В магази́не (магази́н)', 'в магазине магазин', 'Noun', NULL, NULL, 'Cửa hàng',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я иду́ в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.", "vi": "Tôi đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng."}]'::jsonb, 'Я иду́ в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.', 'Tôi đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "купи́ть", "actions_vi": "mua"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '90893123-b19a-4e90-bec6-37cfd4a6ed33', 'В ба́нке (банк)', 'в банке банк', 'Noun', NULL, NULL, 'Ngân hàng',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я иду́ в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.", "vi": "Tôi đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng."}]'::jsonb, 'Я иду́ в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.', 'Tôi đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "меня́ть де́ньги", "actions_vi": "đổi tiền"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'edbe8b03-d316-4ee1-bb56-c10eb9f700f4', 'На по́чте (по́чта)', 'на почте почта', 'Noun', NULL, NULL, 'Bưu điện',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я иду́ на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я опя́ть иду́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.", "vi": "Tôi đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày tôi lại đến bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện."}]'::jsonb, 'Я иду́ на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я опя́ть иду́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.', 'Tôi đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày tôi lại đến bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "отправля́ть, получа́ть", "actions_vi": "gửi - nhận"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8d101837-c2b5-4b78-bcec-a9d89e6a4d41', 'В па́рке (парк) - В кио́ске (кио́ск)', 'в парке парк - в киоске киоск', 'Noun', NULL, NULL, 'Công viên - Киоск',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я иду́ в парк, что́бы гуля́ть, я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я иду́ в кио́ск, что́бы купи́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.", "vi": "Tôi đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên."}]'::jsonb, 'Я иду́ в парк, что́бы гуля́ть, я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я иду́ в кио́ск, что́бы купи́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.', 'Tôi đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "гуля́ть - купи́ть", "actions_vi": "mua"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '021e6aa3-9c93-4976-abce-54f76c11561e', 'В рестора́не (рестора́н)', 'в ресторане ресторан', 'Noun', NULL, NULL, 'Nhà hàng',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я иду́ в рестора́н, что́бы поу́жинать с де́вушкой. Я ча́сто у́жинаю с де́вушкой в рестора́не.", "vi": "Tôi đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng."}]'::jsonb, 'Я иду́ в рестора́н, что́бы поу́жинать с де́вушкой. Я ча́сто у́жинаю с де́вушкой в рестора́не.', 'Tôi đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "есть", "actions_vi": "ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8ea58219-a067-4cbb-9cfe-80492ba53f6b', 'В столово́й (столо́вая)', 'в столовои столовая', 'Noun', NULL, NULL, 'Nhà ăn',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "По́сле заня́тий, я иду́ в столову́ю, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.", "vi": "Sau buổi học, tôi đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn."}]'::jsonb, 'По́сле заня́тий, я иду́ в столову́ю, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.', 'Sau buổi học, tôi đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "есть", "actions_vi": "ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '19bedf55-0995-463a-bb80-68bb66649f3d', 'В кафе́ (кафе́)', 'в кафе кафе', 'Noun', NULL, NULL, 'Cafe',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Сего́дня у́тром я иду́ в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.", "vi": "Sáng hôm nay tôi đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng."}]'::jsonb, 'Сего́дня у́тром я иду́ в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.', 'Sáng hôm nay tôi đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "пить", "actions_vi": "uống"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c485540d-f161-4d8c-8ff4-c3c86dafc49f', '- В фи́рме (фи́рма) - На заво́де (заво́д) - На фа́брике (фа́брика)', '- в фирме фирма - на заводе завод - на фабрике фабрика', 'Noun', NULL, NULL, '- Công ty - Nhà máy - Xưởng sản xuất',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я иду́ в фи́рму/ на заво́д/ на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день.", "vi": "Tôi đi đến công ty/ nhà máy/ xưởng để làm việc. Tôi thường làm việc ở công ty/ ở nhà máy/ ở xưởng mỗi ngày."}]'::jsonb, 'Я иду́ в фи́рму/ на заво́д/ на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день.', 'Tôi đi đến công ty/ nhà máy/ xưởng để làm việc. Tôi thường làm việc ở công ty/ ở nhà máy/ ở xưởng mỗi ngày.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "рабо́тать", "actions_vi": "làm việc"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'dab5dd54-0b89-4e35-9b4a-aa6551671731', 'В гости́нице (гости́ница)', 'в гостинице гостиница', 'Noun', NULL, NULL, 'Khách sạn',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Cơ sở thương mại, dịch vụ, kinh tế', '[{"ru": "Я живу́ в гости́нице.", "vi": "Tôi đang ở khách sạn."}]'::jsonb, 'Я живу́ в гости́нице.', 'Tôi đang ở khách sạn.',
  '{"category": "Cơ sở thương mại, dịch vụ, kinh tế", "actions": "жить", "actions_vi": "ở"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'fab4792c-4592-4337-8e47-aa36f745170b', 'В гараже́ (гара́ж)', 'в гараже гараж', 'Noun', NULL, NULL, 'Ga-ra',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến phương tiện giao thông', '[{"ru": "Я иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто храню́ их в гара́же.", "vi": "Tôi đi đến ga-ra để lấy ô tô / xe máy / xe đạp. Tôi thường cất giữ chúng ở ga-ra."}]'::jsonb, 'Я иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто храню́ их в гара́же.', 'Tôi đi đến ga-ra để lấy ô tô / xe máy / xe đạp. Tôi thường cất giữ chúng ở ga-ra.',
  '{"category": "Liên quan đến phương tiện giao thông", "actions": "взять (маши́ну), храни́ть (маши́ну)", "actions_vi": "lấy (ô tô), cát (ô tô)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'dc4d2618-0f13-4811-88d2-d4cd1e4bba75', 'На остано́вке (остано́вка)', 'на остановке остановка', 'Noun', NULL, NULL, 'Trạm buýt',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến phương tiện giao thông', '[{"ru": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус/ тролле́йбус/ трамва́й . Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке.", "vi": "Tôi đi đến trạm dừng để đợi xe buýt / xe điện bánh hơi / tàu điện. Tôi thường đợi xe buýt / xe điện bánh hơi / tàu điện ở trạm dừng."}]'::jsonb, 'Я иду́ на остано́вку, что́бы подожда́ть авто́бус/ тролле́йбус/ трамва́й . Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке.', 'Tôi đi đến trạm dừng để đợi xe buýt / xe điện bánh hơi / tàu điện. Tôi thường đợi xe buýt / xe điện bánh hơi / tàu điện ở trạm dừng.',
  '{"category": "Liên quan đến phương tiện giao thông", "actions": "ждать", "actions_vi": "đợi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7c5fd98d-0e51-453a-9c13-b00d35753d64', 'На ста́нции (ста́нция)', 'на станции станция', 'Noun', NULL, NULL, 'Trạm tàu điện ngầm',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến phương tiện giao thông', '[{"ru": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции метро́.", "vi": "Tôi đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm."}]'::jsonb, 'Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции метро́.', 'Tôi đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm.',
  '{"category": "Liên quan đến phương tiện giao thông", "actions": "ждать", "actions_vi": "đợi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2f13becf-b378-4994-8696-e6af9d912648', 'На вокза́ле (вокза́л)', 'на вокзале вокзал', 'Noun', NULL, NULL, 'Nhà ga',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến phương tiện giao thông', '[{"ru": "Я иду́ на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.", "vi": "Tôi đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa."}]'::jsonb, 'Я иду́ на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.', 'Tôi đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa.',
  '{"category": "Liên quan đến phương tiện giao thông", "actions": "ждать", "actions_vi": "đợi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5618e40b-82cd-4ba6-8e50-abd81194f645', 'На реке́ (река́), на о́зере (о́зеро)', 'на реке река на озере озеро', 'Noun', NULL, NULL, 'Sông, hồ',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến thiên nhiên', '[{"ru": "- Я иду́ на ре́ку, что́бы пойма́ть ры́бу. Я ча́сто ловлю́ ры́бу на реке́. - Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю на о́зере.", "vi": "- Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông. - Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ."}]'::jsonb, '- Я иду́ на ре́ку, что́бы пойма́ть ры́бу. Я ча́сто ловлю́ ры́бу на реке́. - Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю на о́зере.', '- Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông. - Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ.',
  '{"category": "Liên quan đến thiên nhiên", "actions": "лови́ть ры́бу, пла́вать", "actions_vi": "câu cá, bơi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd3d0b06c-a5f5-4ab0-846d-52c61b3d1919', 'На мо́ре (мо́ре)', 'на море море', 'Noun', NULL, NULL, 'Biển',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến thiên nhiên', '[{"ru": "Я иду́ на мо́ре, что́бы смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.", "vi": "Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển."}]'::jsonb, 'Я иду́ на мо́ре, что́бы смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.', 'Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển.',
  '{"category": "Liên quan đến thiên nhiên", "actions": "смотре́ть зака́т", "actions_vi": "ngắm hoàng hôn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '68248cde-1f5b-4663-b473-aeac28fff308', 'В саду́ (сад)', 'в саду сад', 'Noun', NULL, NULL, 'Vườn',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến thiên nhiên', '[{"ru": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.", "vi": "Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn."}]'::jsonb, 'Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.', 'Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn.',
  '{"category": "Liên quan đến thiên nhiên", "actions": "сажа́ть цветы́, сажа́ть о́вощи", "actions_vi": "trồng hoa, trồng rau"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '089732cd-ca15-4d17-8f00-586182535135', 'В гора́х (гора́)', 'в горах гора', 'Noun', NULL, NULL, 'Núi',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến thiên nhiên', '[{"ru": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.", "vi": "Tôi đi lên núi để leo núi. Tôi rất thích leo núi."}]'::jsonb, 'Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.', 'Tôi đi lên núi để leo núi. Tôi rất thích leo núi.',
  '{"category": "Liên quan đến thiên nhiên", "actions": "поднима́ться в го́ры", "actions_vi": "leo núi"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5208fe8b-5c37-4f24-a676-ab5e1005232d', 'В лесу́ (лес)', 'в лесу лес', 'Noun', NULL, NULL, 'Rừng',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Liên quan đến thiên nhiên', '[{"ru": "Я иду́ в лес, что́бы собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "vi": "Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng."}]'::jsonb, 'Я иду́ в лес, что́бы собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.', 'Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng.',
  '{"category": "Liên quan đến thiên nhiên", "actions": "собира́ть грибы́", "actions_vi": "hái nấm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '98bf535f-6d69-4e4a-a06c-c680e7193a98', '- учи́ться в/на где?(С6) - учи́ть что?(С4)', '- учиться вна гдес6 - учить чтос4', 'Verb', NULL, 'pfv', '- học ở đâu? (C6) - học cái gì? (C4)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ca8b07b6-f263-45a6-8964-a59b9198d23f', 'изуча́ть / изучи́ть', 'изучать  изучить', 'Verb', NULL, 'ipfv/pfv', 'nghiên cứu',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a347ccf7-6ad3-4ae4-86d4-9fae0d44dc28', 'чита́ть / прочита́ть', 'читать  прочитать', 'Verb', NULL, 'ipfv/pfv', 'đọc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c7286fde-64f2-47db-b122-80e1398fca89', 'встреча́ться / встре́титься с кем?', 'встречаться  встретиться с кем', 'Verb', NULL, 'ipfv/pfv', 'gặp gỡ với ai?',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '39a6f8d8-0ab1-44cc-a62c-0a868e8377b0', 'подава́ть / прода́ть (докуме́нты)', 'подавать  продать документы', 'Verb', NULL, 'ipfv/pfv', 'nộp (tài liệu)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '10ff874d-fa35-4570-b8f7-da0cc16c1833', 'получа́ть / получи́ть (докуме́нты)', 'получать  получить документы', 'Verb', NULL, 'ipfv/pfv', 'nhận (tài liệu)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '85638859-15b1-4829-b7d2-6db234071c73', 'жить', 'жить', 'Verb', NULL, 'ipfv', 'sống',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '66ff2e26-4637-4d4d-9de7-6cf23233a35c', 'слу́шать (ле́кцию, му́зыку)', 'слушать лекцию музыку', 'Verb', NULL, 'pfv', 'nghe (bài giảng, nhạc)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8f1d5a4a-071e-4810-9336-8a94dfd0c950', 'выступа́ть / вы́ступить', 'выступать  выступить', 'Verb', NULL, 'ipfv/pfv', 'phát biểu',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3ae9249e-266a-4d49-9d9c-555a6543e43f', 'иссле́довать', 'исследовать', 'Verb', NULL, 'pfv', 'nghiên cứu',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '474dec24-de9f-401e-b0f2-a7e91dcd91a2', 'покупа́ть / купи́ть лека́рства', 'покупать  купить лекарства', 'Verb', NULL, 'ipfv/pfv', 'mua thuốc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '48729cf8-335c-42fd-b54b-e4dfe9b14582', 'идти́/е́хать к врачу́', 'идтиехать к врачу', 'Verb', NULL, 'ipfv', 'đi đến chỗ bác sĩ',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a278e8e8-1d52-4d5a-8acc-ae3c09fc4142', 'смотре́ть / посмотре́ть карти́ны', 'смотреть  посмотреть картины', 'Verb', NULL, 'ipfv/pfv', 'xem tranh',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '90d192dc-b1e1-4a04-b4c7-13adfc305879', 'смотре́ть / посмотре́ть спекта́кль', 'смотреть  посмотреть спектакль', 'Verb', NULL, 'ipfv/pfv', 'xem vở kịch',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ca769eaf-86ae-4422-b99b-5bfd444e4a9d', 'смотре́ть / посмотре́ть выступле́ние', 'смотреть  посмотреть выступление', 'Verb', NULL, 'ipfv/pfv', 'xem buổi biểu diễn',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '231f4156-36e0-4e9b-9862-7c1b7e3463dd', 'смотре́ть / посмотре́ть фильм', 'смотреть  посмотреть фильм', 'Verb', NULL, 'ipfv/pfv', 'xem phim',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '24e7450c-21f1-401a-bcd3-d6ced5336acb', 'посеща́ть / посети́ть', 'посещать  посетить', 'Verb', NULL, 'ipfv/pfv', 'thăm',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'df07ccf8-ffaa-495f-83b5-ff6649748096', 'танцева́ть', 'танцевать', 'Verb', NULL, 'ipfv', 'nhảy múa',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c94a70ce-83f4-40fd-b9b7-3b492adaabc3', 'смотре́ть / посмотре́ть цирк', 'смотреть  посмотреть цирк', 'Verb', NULL, 'ipfv/pfv', 'xem xiếc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9a83ed5f-76bc-4eb4-bff9-d1b28771c54f', 'смотре́ть / посмотре́ть живо́тных', 'смотреть  посмотреть животных', 'Verb', NULL, 'ipfv/pfv', 'xem động vật',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '11fdcbb3-7c7e-4632-8a40-29642417a75f', 'смотре́ть / посмотре́ть матч', 'смотреть  посмотреть матч', 'Verb', NULL, 'ipfv/pfv', 'xem trận đấu',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '61504da0-3198-485d-9c60-78228db4d206', 'игра́ть / сыгра́ть в что?', 'играть  сыграть в что', 'Verb', NULL, 'ipfv/pfv', 'chơi cái gì?',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'cbbc3768-9109-42f0-af99-cb1bef081c9c', 'меня́ть / поменя́ть де́ньги', 'менять  поменять деньги', 'Verb', NULL, 'ipfv/pfv', 'đổi tiền',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '746100da-102a-40a5-bcba-43b12b29854b', 'отправля́ть / отпра́вить (письмо́)', 'отправлять  отправить письмо', 'Verb', NULL, 'ipfv/pfv', 'gửi (thư)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e1a29c5f-30d1-4496-ad9b-5ac2ed35fb8a', 'гуля́ть / погуля́ть', 'гулять  погулять', 'Verb', NULL, 'ipfv/pfv', 'đi dạo',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd1936fc3-d4fb-49e3-a61a-f492b810c615', 'есть / съесть', 'есть  съесть', 'Verb', NULL, 'ipfv/pfv', 'ăn',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1d337589-d1ef-4ca0-b670-7501312b736f', 'пить / вы́пить', 'пить  выпить', 'Verb', NULL, 'ipfv/pfv', 'uống',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '40d6cd80-78db-47e6-83b5-c73f5cc1cb2a', 'рабо́тать', 'работать', 'Verb', NULL, 'ipfv', 'làm việc',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9c43bf1b-f1b0-40e5-9e8e-700463c4022d', 'брать / взять (маши́ну)', 'брать  взять машину', 'Verb', NULL, 'ipfv/pfv', 'lấy (xe)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '21754774-7335-4a76-9bd0-2708ee883fb9', 'храни́ть / сохрани́ть (маши́ну)', 'хранить  сохранить машину', 'Verb', NULL, 'ipfv/pfv', 'cất (xe)',
  '3849b73a-7b9c-465e-873c-b2fd5d7e318e', 'dia_diem_noi_chon', 'Động từ thao tác & nơi chốn', '[]'::jsonb, '', '',
  '{"type": "Động từ hoạt động tại các địa điểm"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '864d4459-c5ec-4912-a182-9c7c8a33321d', 'суп', 'суп', 'Noun', 'm', NULL, 'súp',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом, потому́ что сего́дня хочу́ съесть суп с хле́бом.", "vi": "Tôi đang nấu súp bằng nồi trên bếp. Tôi nấu súp để ăn với bánh mì, vì hôm nay tôi muốn ăn súp với bánh mì."}]'::jsonb, 'Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом, потому́ что сего́дня хочу́ съесть суп с хле́бом.', 'Tôi đang nấu súp bằng nồi trên bếp. Tôi nấu súp để ăn với bánh mì, vì hôm nay tôi muốn ăn súp với bánh mì.',
  '{"preparation": "- в кастрю́ле (bằng nồi) - на сковороде́ (bằng chảo) - в рисова́рке (bằng nồi cơm điện)", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0c3cb11d-a702-4f43-bc90-374b839b444e', 'рис', 'рис', 'Noun', 'm', NULL, 'cơm',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой, потому́ что я обы́чно у́жинаю рисом с ры́бой.", "vi": "Tôi đang nấu cơm bằng nồi cơm điện. Tôi nấu cơm để ăn với cá, vì tôi thường ăn tối bằng cơm với cá."}]'::jsonb, 'Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой, потому́ что я обы́чно у́жинаю рисом с ры́бой.', 'Tôi đang nấu cơm bằng nồi cơm điện. Tôi nấu cơm để ăn với cá, vì tôi thường ăn tối bằng cơm với cá.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '23e08ab5-def3-444d-aa95-ae745716f013', 'мя́со', 'мясо', 'Noun', 'n', NULL, 'thịt',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой, потому́ что я обы́чно ем мя́со с рисом и ры́бой на у́жин.", "vi": "Tôi đang luộc thịt bằng nồi trên bếp. Tôi nấu thịt để ăn với cơm và với cá, vì tôi thường ăn thịt với cơm và với cá vào bữa tối."}]'::jsonb, 'Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой, потому́ что я обы́чно ем мя́со с рисом и ры́бой на у́жин.', 'Tôi đang luộc thịt bằng nồi trên bếp. Tôi nấu thịt để ăn với cơm và với cá, vì tôi thường ăn thịt với cơm và với cá vào bữa tối.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4b4c6aac-b81c-4f52-875b-64dff62adf80', 'пельме́ни', 'пельмени', 'Noun', 'pl', NULL, 'sủi cảo Nga',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом, потому́ что я обы́чно завтра́каю пельме́нями с хле́бом.", "vi": "Tôi đang luộc pelmeni bằng nồi trên bếp. Tôi nấu pelmeni để ăn với bánh mì, vì tôi thường ăn sáng bằng pelmeni với bánh mì."}]'::jsonb, 'Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом, потому́ что я обы́чно завтра́каю пельме́нями с хле́бом.', 'Tôi đang luộc pelmeni bằng nồi trên bếp. Tôi nấu pelmeni để ăn với bánh mì, vì tôi thường ăn sáng bằng pelmeni với bánh mì.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e7b38283-46f8-4511-a275-c61075110847', 'ка́ша', 'каша', 'Noun', 'f', NULL, 'cháo',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы есть её на за́втрак с тёплым молоко́м, потому́ что я обы́чно завтра́каю ка́шей с тёплым молоко́м.", "vi": "Tôi đang nấu cháo bằng nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm, vì tôi thường ăn sáng bằng cháo với sữa ấm."}]'::jsonb, 'Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы есть её на за́втрак с тёплым молоко́м, потому́ что я обы́чно завтра́каю ка́шей с тёплым молоко́м.', 'Tôi đang nấu cháo bằng nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm, vì tôi thường ăn sáng bằng cháo với sữa ấm.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f28a367a-1119-4b8c-bcf1-79b14144d419', 'ры́ба', 'рыба', 'Noun', 'f', NULL, 'cá',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом, потому́ что я обы́чно обе́даю ры́бой с рисом и мя́сом.", "vi": "Tôi đang rán cá bằng chảo trên bếp. Tôi nấu cá để ăn với cơm và với thịt, vì tôi thường ăn trưa bằng cá với cơm và với thịt."}]'::jsonb, 'Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом, потому́ что я обы́чно обе́даю ры́бой с рисом и мя́сом.', 'Tôi đang rán cá bằng chảo trên bếp. Tôi nấu cá để ăn với cơm và với thịt, vì tôi thường ăn trưa bằng cá với cơm và với thịt.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '213a487d-6fd6-4343-9f9c-3dd8106c3ba9', 'ку́рица', 'курица', 'Noun', 'f', NULL, 'gà',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том, потому́ что я обы́чно ем ку́рицу с сала́том на обе́д.", "vi": "Tôi đang luộc gà bằng nồi trên bếp. Tôi luộc gà để ăn với salad, vì tôi thường ăn gà với salad vào bữa trưa."}]'::jsonb, 'Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том, потому́ что я обы́чно ем ку́рицу с сала́том на обе́д.', 'Tôi đang luộc gà bằng nồi trên bếp. Tôi luộc gà để ăn với salad, vì tôi thường ăn gà với salad vào bữa trưa.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '27074322-608f-4acb-ba88-c40cd6eed477', 'яйцо́', 'яицо', 'Noun', 'pl', NULL, 'trứng',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом, потому́ что я люблю́ есть яйца́ с хле́бом.", "vi": "Tôi đang luộc trứng bằng nồi trên bếp. Tôi luộc trứng để ăn với bánh mì, vì tôi thích ăn trứng với bánh mì."}]'::jsonb, 'Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом, потому́ что я люблю́ есть яйца́ с хле́бом.', 'Tôi đang luộc trứng bằng nồi trên bếp. Tôi luộc trứng để ăn với bánh mì, vì tôi thích ăn trứng với bánh mì.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '63911cb9-74d4-43ee-b9ea-77ae1832193f', 'сала́т', 'салат', 'Noun', 'm', NULL, 'salad',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món chính và món phụ', '[{"ru": "Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м, потому́ что я люблю́ есть сала́т с яйцо́м.", "vi": "Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng, vì tôi thích ăn salad với trứng."}]'::jsonb, 'Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м, потому́ что я люблю́ есть сала́т с яйцо́м.', 'Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng, vì tôi thích ăn salad với trứng.',
  '{"preparation": "", "actions": "гото́вить, вари́ть, жа́рить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f45e9927-48ca-46c9-a301-299336277bf7', 'Шокола́д', 'шоколад', 'Noun', 'm', NULL, 'So cô la',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món tráng miệng, ăn nhẹ', '[{"ru": "После за́втрака (1) я обы́чно переку́сываю шоколáдом с йогу́ртом.", "vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua"}]'::jsonb, 'После за́втрака (1) я обы́чно переку́сываю шоколáдом с йогу́ртом.', 'Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua',
  '{"actions": "есть, переку́сывать"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '03995c22-f5c3-40c0-9904-ec79bdb27eb0', 'Моро́женое', 'мороженое', 'Noun', 'n', NULL, 'Kem',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món tráng miệng, ăn nhẹ', '[{"ru": "Ле́том (2) я обы́чно ем моро́женое.", "vi": "Vào mùa hè, tôi thường ăn kem."}]'::jsonb, 'Ле́том (2) я обы́чно ем моро́женое.', 'Vào mùa hè, tôi thường ăn kem.',
  '{"actions": "есть, переку́сывать"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd7f717df-c0e1-48a7-af23-5c4497f13007', 'Торт', 'торт', 'Noun', 'm', NULL, 'Bánh kem',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món tráng miệng, ăn nhẹ', '[{"ru": "На ка́ждый мой день (3) рожде́ния мама покупа́ет мне торт.", "vi": "Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi"}]'::jsonb, 'На ка́ждый мой день (3) рожде́ния мама покупа́ет мне торт.', 'Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi',
  '{"actions": "есть, переку́сывать"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b43b80e1-ed5e-4b55-9617-beeda97382c3', 'Йогу́рт', 'иогурт', 'Noun', 'm', NULL, 'Sữa chua',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Món tráng miệng, ăn nhẹ', '[{"ru": "Я обы́чно ем йогу́рт на полдни́к.", "vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ."}]'::jsonb, 'Я обы́чно ем йогу́рт на полдни́к.', 'Tôi thường ăn nhẹ sữa chua vào bữa phụ.',
  '{"actions": "есть, переку́сывать"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '84495d5f-fdab-42e5-974d-a6fc92f06e90', 'Я́блоко', 'яблоко', 'Noun', 'n', NULL, 'táo',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я мо́ю я́блоки, гру́ши и манго́, чищу́ их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb, 'Я мо́ю я́блоки, гру́ши и манго́, чищу́ их, а зате́м нареза́ю их, что́бы съесть.', 'Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '433c8a35-867d-47b7-8274-c98053ea3662', 'Гру́ша', 'груша', 'Noun', 'f', NULL, 'lê',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я люблю́ есть груша ка́ждый день.", "vi": "Tôi thích ăn lê mỗi ngày."}]'::jsonb, 'Я люблю́ есть груша ка́ждый день.', 'Tôi thích ăn lê mỗi ngày.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '83cffcff-3d43-42f3-b33f-1062b7ba0275', 'Манго́', 'манго', 'Noun', 'm', NULL, 'xoài',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я люблю́ есть манго ка́ждый день.", "vi": "Tôi thích ăn xoài mỗi ngày."}]'::jsonb, 'Я люблю́ есть манго ка́ждый день.', 'Tôi thích ăn xoài mỗi ngày.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '51e20180-5610-4d9b-bdb0-7eb3b289fa2d', 'Апельси́н', 'апельсин', 'Noun', 'm', NULL, 'cam',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.", "vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối."}]'::jsonb, 'Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.', 'Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '19109965-228e-4187-9af7-68f37b0549c9', 'Мандари́н', 'мандарин', 'Noun', 'm', NULL, 'quýt',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я люблю́ есть мандарин ка́ждый день.", "vi": "Tôi thích ăn quýt mỗi ngày."}]'::jsonb, 'Я люблю́ есть мандарин ка́ждый день.', 'Tôi thích ăn quýt mỗi ngày.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e3244185-27f6-4d90-824c-5558ddd1190f', 'Бана́н', 'банан', 'Noun', 'm', NULL, 'chuối',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я люблю́ есть банан ка́ждый день.", "vi": "Tôi thích ăn chuối mỗi ngày."}]'::jsonb, 'Я люблю́ есть банан ка́ждый день.', 'Tôi thích ăn chuối mỗi ngày.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '14777c3f-e795-4d99-a143-8fa3938af0e7', 'Арбу́з', 'арбуз', 'Noun', 'm', NULL, 'dưa hấu',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.", "vi": "Tôi bổ quả dưa hấu để mời khách ăn."}]'::jsonb, 'Я разреза́ю арбу́з, что́бы угости́ть госте́й.', 'Tôi bổ quả dưa hấu để mời khách ăn.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '92c1e4a3-cac1-4ff7-bf61-3cd36ef2c9ef', 'Виногра́д', 'виноград', 'Noun', 'm', NULL, 'nho',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Hoa quả', '[{"ru": "Я мо́ю виногра́д и кладу́ его́ на таре́лку.", "vi": "Tôi rửa sạch nho và đặt lên đĩa."}]'::jsonb, 'Я мо́ю виногра́д и кладу́ его́ на таре́лку.', 'Tôi rửa sạch nho và đặt lên đĩa.',
  '{"actions": "мыть, чи́стить, нареза́ть, есть"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2ebcd15b-54df-4269-9dc0-83ec2f754898', 'Карто́фель', 'картофель', 'Noun', 'm', NULL, 'khoai tây',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.", "vi": "Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ."}]'::jsonb, 'Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.', 'Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ.',
  '{"actions": "мыть --> чистить --> нареза́ть", "actions_vi": "rửa sạch --> gọt vỏ --> thái"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4552c1b8-5b22-4d01-a6cc-1cde35d73e8a', 'Помидо́р', 'помидор', 'Noun', 'm', NULL, 'cà chua',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Помо́йте помидо́ры, пото́м нарежьте их и измельчи́те.", "vi": "Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng."}]'::jsonb, 'Помо́йте помидо́ры, пото́м нарежьте их и измельчи́те.', 'Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng.',
  '{"actions": "мыть --> нареза́ть --> измельча́ть", "actions_vi": "rửa sạch --> thái --> băm nhỏ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'bfb5a9b3-d17f-40eb-8b02-ff4a9ac7c252', 'Бата́т', 'батат', 'Noun', 'm', NULL, 'khoai lang',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я мо́ю карто́шку, пото́м кладу́ её в кастрю́лю с водо́й и варю́.", "vi": "Tôi rửa sạch khoai, sau đó cho vào nồi cùng với nước và nấu."}]'::jsonb, 'Я мо́ю карто́шку, пото́м кладу́ её в кастрю́лю с водо́й и варю́.', 'Tôi rửa sạch khoai, sau đó cho vào nồi cùng với nước và nấu.',
  '{"actions": "мыть --> нареза́ть", "actions_vi": "rửa sạch --> thái"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '6d09113f-1787-4a8c-bf31-41db7a42d1f2', 'Огуре́ц', 'огурец', 'Noun', 'm', NULL, 'dưa chuột',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.", "vi": "Tôi đang rửa sạch dưa chuột, sau đó tôi cắt nhỏ dưa chuột bằng dao."}]'::jsonb, 'Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.', 'Tôi đang rửa sạch dưa chuột, sau đó tôi cắt nhỏ dưa chuột bằng dao.',
  '{"actions": "мыть --> нареза́ть", "actions_vi": "rửa sạch --> thái"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '96d657bc-ad2a-43d3-ae8b-0e5864a56af9', 'Зелёный лук', 'зеленыи лук', 'Noun', 'm', NULL, 'hành lá',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.", "vi": "Tôi đang rửa sạch hành lá, sau đó thái nhỏ bằng dao."}]'::jsonb, 'Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.', 'Tôi đang rửa sạch hành lá, sau đó thái nhỏ bằng dao.',
  '{"actions": "мыть --> нареза́ть", "actions_vi": "rửa sạch --> thái"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a311be04-1cac-407f-abdf-af71ee4fbdcb', 'Лук', 'лук', 'Noun', 'm', NULL, 'hành tây',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.", "vi": "Tôi đang bóc vỏ hành tây, sau đó bổ chúng và băm nhỏ chúng bằng dao."}]'::jsonb, 'Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.', 'Tôi đang bóc vỏ hành tây, sau đó bổ chúng và băm nhỏ chúng bằng dao.',
  '{"actions": "чистить --> нареза́ть --> измельча́ть", "actions_vi": "bóc vỏ --> thái --> băm nhỏ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '8c94d8e3-6b76-47bf-a7c5-586ddca448df', 'Чесно́к', 'чеснок', 'Noun', 'm', NULL, 'tỏi',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я чищу́ чесно́к, пото́м раздавлива́ю его́ но́жом и измельча́ю.", "vi": "Tôi bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng."}]'::jsonb, 'Я чищу́ чесно́к, пото́м раздавлива́ю его́ но́жом и измельча́ю.', 'Tôi bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng.',
  '{"actions": "чистить --> раздавлива́ть --> измельча́ть", "actions_vi": "bóc vỏ --> đập --> băm nhỏ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b7b15f7d-2961-43ac-81a8-dfbd36903caa', 'Капу́ста', 'капуста', 'Noun', 'f', NULL, 'bắp tỏi',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю её и нареза́ю.", "vi": "Tôi đang rửa sạch bắp cải, sau đó bổ chúng và thái nhỏ chúng."}]'::jsonb, 'Я сейча́с мо́ю капу́сту, пото́м разреза́ю её и нареза́ю.', 'Tôi đang rửa sạch bắp cải, sau đó bổ chúng và thái nhỏ chúng.',
  '{"actions": "мыть --> разреза́ть --> нареза́ть", "actions_vi": "rửa sạch --> bổ --> thái nhỏ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd7b78f5f-ac35-4961-afdd-b0679299853a', 'Ты́ква', 'тыква', 'Noun', 'f', NULL, 'bí đỏ',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Rau củ quả', '[{"ru": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю её и нареза́ю.", "vi": "Tôi đang rửa sạch bí đỏ và gọt vỏ chúng, sau đó bổ chúng và thái nhỏ chúng."}]'::jsonb, 'Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю её и нареза́ю.', 'Tôi đang rửa sạch bí đỏ và gọt vỏ chúng, sau đó bổ chúng và thái nhỏ chúng.',
  '{"actions": "мыть --> чистить --> разреза́ть -> нареза́ть", "actions_vi": "rửa sạch --> gọt vỏ --> bổ --> thái nhỏ."}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b16b10f9-2a99-46e3-9abd-24a269b829c1', 'Чай', 'чаи', 'Noun', 'm', NULL, 'trà',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю чай в стака́н и пью чай из стака́на.", "vi": "Tôi rót trà vào cốc và uống trà bằng cốc."}]'::jsonb, 'Я налива́ю чай в стака́н и пью чай из стака́на.', 'Tôi rót trà vào cốc và uống trà bằng cốc.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '21585116-ff26-4518-a473-0d255d319aff', 'Молоко́', 'молоко', 'Noun', 'm', NULL, 'sữa',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю молоко в стака́н и пью молоко из стака́на.", "vi": "Tôi rót sữa vào cốc và uống sữa từ cốc."}]'::jsonb, 'Я налива́ю молоко в стака́н и пью молоко из стака́на.', 'Tôi rót sữa vào cốc và uống sữa từ cốc.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'df793e21-3b65-466a-bd07-c95e763276db', 'Кока-ко́ла', 'кока-кола', 'Noun', 'f', NULL, 'Coca-cola',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю кока-кола в стака́н и пью кока-кола из стака́на.", "vi": "Tôi rót coca-cola vào cốc và uống coca-cola từ cốc."}]'::jsonb, 'Я налива́ю кока-кола в стака́н и пью кока-кола из стака́на.', 'Tôi rót coca-cola vào cốc và uống coca-cola từ cốc.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e6306cbb-2cc8-487b-88d1-5aa19232a369', 'Пи́во', 'пиво', 'Noun', 'n', NULL, 'bia',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю пиво в стака́н и пью пиво из стака́на.", "vi": "Tôi rót bia vào cốc và uống bia từ cốc."}]'::jsonb, 'Я налива́ю пиво в стака́н и пью пиво из стака́на.', 'Tôi rót bia vào cốc và uống bia từ cốc.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '24ae9ab5-3f71-48a1-9629-3f34a04910e0', 'Сок', 'сок', 'Noun', 'm', NULL, 'nước ép',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю сок в стака́н и пью сок из стака́на.", "vi": "Tôi rót nước ép vào cốc và uống nước ép từ cốc."}]'::jsonb, 'Я налива́ю сок в стака́н и пью сок из стака́на.', 'Tôi rót nước ép vào cốc và uống nước ép từ cốc.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f9fd3142-10ca-407a-9dec-230281162d39', 'Вода́', 'вода', 'Noun', 'm', NULL, 'nước',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю вода в стака́н и пью вода из стака́на.", "vi": "Tôi rót nước vào cốc và uống nước từ cốc."}]'::jsonb, 'Я налива́ю вода в стака́н и пью вода из стака́на.', 'Tôi rót nước vào cốc và uống nước từ cốc.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'dab0d9f2-913e-45c8-bfee-6664d91e1a17', 'Алкого́ль / Вино́', 'алкоголь  вино', 'Noun', 'm', NULL, 'rượu/ rượu vang',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Đồ uống', '[{"ru": "Я налива́ю вино́ в ча́шку и пью вино́ из ча́шки.", "vi": "Tôi rót rượu vang vào chén và uống rượu bằng chén."}]'::jsonb, 'Я налива́ю вино́ в ча́шку и пью вино́ из ча́шки.', 'Tôi rót rượu vang vào chén và uống rượu bằng chén.',
  '{"actions": "налива́ть в стака́н / ча́шку, пить"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '9c9b5d99-388e-4286-87b3-c7a18a802a7d', 'гото́вить / пригото́вить', 'готовить  приготовить', 'Verb', NULL, 'ipfv/pfv', 'nấu',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c99173ac-54bc-424a-98fc-992b96dc0ca8', 'вари́ть / свари́ть', 'варить  сварить', 'Verb', NULL, 'ipfv/pfv', 'luộc',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f1a9ce3c-7c52-4cfb-96fb-a819a34f4e3e', 'жа́рить / изжа́рить', 'жарить  изжарить', 'Verb', NULL, 'ipfv/pfv', 'rán, chiên',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1a112dd4-0b91-4177-8d29-f9def0704394', 'переку́сывать / перекуси́ть', 'перекусывать  перекусить', 'Verb', NULL, 'ipfv/pfv', 'ăn nhẹ',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7b1dd164-1f9e-4f74-ac78-f21af9350899', 'мыть / помы́ть', 'мыть  помыть', 'Verb', NULL, 'ipfv/pfv', 'rửa',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f34a3683-2d2e-4bb2-9159-bdd4117d7784', 'чи́стить / почи́стить', 'чистить  почистить', 'Verb', NULL, 'ipfv/pfv', 'gọt vỏ, làm sạch',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '089fb8d2-f82f-47d0-927d-859c1f4e849b', 'ре́зать — разре́зать — нареза́ть — измельча́ть', 'резать  разрезать  нарезать  измельчать', 'Verb', NULL, 'ipfv', 'cắt - cắt đôi - thái lát - băm nhỏ',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '62e228ca-c717-4a81-a712-ed50ece28158', 'есть / съесть', 'есть  съесть', 'Verb', NULL, 'ipfv/pfv', 'ăn',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '7648b91f-c2b7-42ec-8e9d-208743343ab5', 'измельча́ть / измельчи́ть', 'измельчать  измельчить', 'Verb', NULL, 'ipfv/pfv', 'băm nhỏ, nghiền nhỏ',
  '2346ecd6-86e9-42fd-86b8-1a385c871e81', 'do_an_uong', 'Động từ nấu nướng & chế biến', '[]'::jsonb, '', '',
  '{"type": "Động từ chế biến món ăn"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0f872af8-179a-4a4c-9f25-529aa3b777d8', 'электро́нные и́гры', 'электронные игры', 'Noun', 'pl', NULL, 'điện tử',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в электро́нные и́гры на компью́тере.", "vi": "Tôi đang chơi điện tử trên máy tính."}]'::jsonb, 'Я сейча́с игра́ю в электро́нные и́гры на компью́тере.', 'Tôi đang chơi điện tử trên máy tính.',
  '{"place": "на компью́тере (trên máy tính), на телефо́не (trên điện thoại)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e11bf836-1c5f-4d34-9b80-47377f13ed4a', 'шахма́ты', 'шахматы', 'Noun', 'pl', NULL, 'cờ vua',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в шахма́ты с дру́гом в шахма́тном клубе.", "vi": "Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua."}]'::jsonb, 'Я сейча́с игра́ю в шахма́ты с дру́гом в шахма́тном клубе.', 'Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua.',
  '{"place": "до́ма (ở nhà), в шахма́тном клубе (ở câu lạc bộ cờ vua)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3810e7ca-b3c4-4946-92ef-db0cb781c2ea', 'футбо́л', 'футбол', 'Noun', 'm', NULL, 'bóng đá',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с занима́юсь (1) футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.", "vi": "Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ."}]'::jsonb, 'Я сейча́с занима́юсь (1) футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.', 'Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ.',
  '{"place": "на футбо́льном поле́ (ở sân cỏ), на футбо́льной площа́дке (ở sân bóng đá), на стадио́не (ở sân vận động)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '493f85b5-95c1-496f-8775-39aee7879f16', 'хокке́й', 'хоккеи', 'Noun', 'm', NULL, 'khúc côn cầu',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}]'::jsonb, 'Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.', 'Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.',
  '{"place": "на хокке́йной площа́дке (ở sân khúc côn cầu)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '6f4d7ebf-f1b2-40aa-b4e7-6d16a39d7155', 'бадминто́н', 'бадминтон', 'Noun', 'm', NULL, 'cầu lồng',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.", "vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng."}]'::jsonb, 'Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.', 'Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng.',
  '{"place": "- на спорти́вной площа́дке (ở sân vận động đa năng) - в спортза́ле (ở phòng tập thể thao)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'dc76d694-bea0-43c3-a148-2511fa15f425', 'насто́льный тенни́с', 'настольныи теннис', 'Noun', 'm', NULL, 'bóng bàn',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.", "vi": "Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng."}]'::jsonb, 'Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.', 'Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng.',
  '{"place": "", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'dc827aa9-97aa-47b2-aaec-687e2b613992', 'те́ннис', 'теннис', 'Noun', 'm', NULL, 'bóng quần vợt - tennis',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.", "vi": "Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng."}]'::jsonb, 'Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.', 'Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng.',
  '{"place": "на те́ннисном ко́рте (ở sân tennis)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0ca35216-adb3-4e14-bef8-8ffc51cdbe10', 'баскетбо́л', 'баскетбол', 'Noun', 'm', NULL, 'bóng rổ',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.", "vi": "Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ."}]'::jsonb, 'Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.', 'Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ.',
  '{"place": "на баскетбо́льной площа́дке (ở sân bóng rổ)", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd201b667-8ac1-4661-bff2-d26a364a4830', 'волейбо́л', 'волеибол', 'Noun', 'm', NULL, 'bóng chuyền',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Các môn thể thao', '[{"ru": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.", "vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao."}]'::jsonb, 'Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.', 'Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao.',
  '{"place": "", "verb": "игра́ть в что?, занима́ться спо́ртом"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'dff3c6c6-84de-4dcb-b382-24055b465e66', 'пиани́но', 'пианино', 'Noun', 'n', NULL, 'piano',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Dụng cụ âm nhạc', '[{"ru": "Я занима́юсь на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.", "vi": "Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc."}]'::jsonb, 'Я занима́юсь на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.', 'Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc.',
  '{"place": "музыка́льная ко́мната (phòng nhạc), музыка́льный класс (lớp học nhạc)", "verb": "игра́ть на чём?"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '70a7e6df-22f4-4c8d-94da-ac20b15222df', 'гита́ра', 'гитара', 'Noun', 'f', NULL, 'guitar',
  '1c05c126-4a57-464c-82fa-2a33706d157f', 'the_thao_am_nhac', 'Dụng cụ âm nhạc', '[{"ru": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клубе университе́та.", "vi": "Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường."}]'::jsonb, 'Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клубе университе́та.', 'Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường.',
  '{"place": "гита́рный клуб (câu lạc bộ guitar)", "verb": "игра́ть на чём?"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b1b5c2b8-03fd-43b7-83e6-31c0c5afa4d5', 'Кот — Ко́шка', 'кот  кошка', 'Noun', 'f', NULL, 'mèo đực - mèo cái',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Vật nuôi, gia súc', '[{"ru": "Кошка до́ма. Она́ хо́дит по до́му.", "vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà."}]'::jsonb, 'Кошка до́ма. Она́ хо́дит по до́му.', 'Con mèo đang ở nhà. Nó đang đi quanh nhà.',
  '{"habitat": "до́ма (ở nhà), в ко́мнате (ở trong phòng), в па́рке (ở công viên),...", "habits": "есть (ăn), лежа́ть (nằm), стоя́ть (ngồi), спать (ngủ), игра́ть (chơi), бе́гать (chạy), гуля́ть (đi dạo)."}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '15f4b760-a57f-49a9-b7d9-499a8d0ede44', 'Соба́ка', 'собака', 'Noun', 'f', NULL, 'chó đực,cái',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Vật nuôi, gia súc', '[{"ru": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.", "vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên."}]'::jsonb, 'Соба́ка в па́рке. Она́ гуля́ет по па́рку.', 'Con chó đang ở công viên. Nó đang đi dạo quanh công viên.',
  '{"habitat": "", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '99d180c5-f901-4f3c-a5a9-7af9f4615768', 'Свинья́ (con lợn', 'свинья con lon', 'Noun', 'm', NULL, 'Свинья́ (con lợn',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Vật nuôi, gia súc', '[{"ru": "Свиньи́ на фе́рме. Они́ едя́т в хлеву́.", "vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}]'::jsonb, 'Свиньи́ на фе́рме. Они́ едя́т в хлеву́.', 'Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.',
  '{"habitat": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng)", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '899a03d3-8c47-4a2e-b591-726b48760741', 'Кури́ца', 'курица', 'Noun', 'f', NULL, 'con gà',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Vật nuôi, gia súc', '[{"ru": "Ку́рицы в саду́. Они́ бе́гают по саду́.", "vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn."}]'::jsonb, 'Ку́рицы в саду́. Они́ бе́гают по саду́.', 'Những con gà đang ở vườn. Chúng đang chạy quanh vườn.',
  '{"habitat": "на фе́рме (ở trang trại), в куря́тнике (ở trong chuồng gà), в саду́ (ở trong vườn)", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '431c0d98-be68-464c-b788-1a49de240d14', 'Коро́ва', 'корова', 'Noun', 'f', NULL, 'con bò',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Vật nuôi, gia súc', '[{"ru": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng."}]'::jsonb, 'Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.', 'Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.',
  '{"habitat": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng), на поле́ (trên cánh đồng)", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '37224e6b-4298-4a0a-a61f-e8242e7b3a70', 'Медве́дь — Медве́дица', 'медведь  медведица', 'Noun', 'f', NULL, 'gấu đực - gấu cái',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Động vật hoang dã', '[{"ru": "Медве́дь ест, а пото́м спит.", "vi": "Gấu ăn, sau đó ngủ."}]'::jsonb, 'Медве́дь ест, а пото́м спит.', 'Gấu ăn, sau đó ngủ.',
  '{"habitat": "в лесу́ (ở trong rừng)", "habits": "охо́титься (săn mồi), бега́ть (chạy), есть (ăn), лежа́ть (nằm), стоя́ть (đứng), спать (ngủ), гуля́ть (đi dạo)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '2666c34d-e820-4cb9-9bbe-7396c4f6baad', 'Тигр', 'тигр', 'Noun', 'm', NULL, 'hổ',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Động vật hoang dã', '[{"ru": "Тигр бега́ет по лесу́, что́бы охо́титься.", "vi": "Hổ đang chạy quanh khu rừng để săn mồi."}]'::jsonb, 'Тигр бега́ет по лесу́, что́бы охо́титься.', 'Hổ đang chạy quanh khu rừng để săn mồi.',
  '{"habitat": "", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '79ef252d-4f89-4d07-82b3-c11cd1556768', 'Лев', 'лев', 'Noun', 'm', NULL, 'sư tử',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Động vật hoang dã', '[{"ru": "Лев гуля́ет по лесу́.", "vi": "Sư rử đang đi dạo quanh khu rừng."}]'::jsonb, 'Лев гуля́ет по лесу́.', 'Sư rử đang đi dạo quanh khu rừng.',
  '{"habitat": "", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ed50c50e-380c-4718-82f6-83e17a1515a2', 'Пти́ца', 'птица', 'Noun', 'f', NULL, 'con chim',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Con vật biết bay', '[{"ru": "Пти́ца лети́т по не́бу.", "vi": "Con chim đang bay trên bầu trời"}]'::jsonb, 'Пти́ца лети́т по не́бу.', 'Con chim đang bay trên bầu trời',
  '{"habitat": "в не́бе (trên bầu trờ), на ве́тке (trên cành cây)", "habits": "лета́ть (bay), есть (ăn), стоя́ть (đứng), лежа́ть (nằm), спать (ngủ)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '0195e893-01a5-4a12-85ec-67e689c26fb7', 'Попуга́й', 'попугаи', 'Noun', 'm', NULL, 'con vẹt',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Con vật biết bay', '[{"ru": "Попуга́й стои́т на ве́тке.", "vi": "Con vẹt đang đứng trên cành cây"}]'::jsonb, 'Попуга́й стои́т на ве́тке.', 'Con vẹt đang đứng trên cành cây',
  '{"habitat": "", "habits": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b560d935-448b-4af1-8bd7-b4e10a3dcb8b', 'Ры́ба', 'рыба', 'Noun', 'f', NULL, 'cá',
  '6b6cb522-d546-487d-9915-af4fbd57a5b9', 'con_vat', 'Con vật biết bơi', '[{"ru": "Ры́ба плывёт в реке́.", "vi": "Con cá đang bơi ở sông."}]'::jsonb, 'Ры́ба плывёт в реке́.', 'Con cá đang bơi ở sông.',
  '{"habitat": "в озере (ở hồ), в реке́ (ở sông), в мо́ре (ở biển)", "habits": "пла́вать (bơi), есть (ăn)"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b06422c2-a090-4867-9c0a-a2f5f8720e99', 'голова́', 'голова', 'Noun', 'm', NULL, 'đầu',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У меня́ больша́я голова́.", "vi": "Tôi có đầu to."}]'::jsonb, 'У меня́ больша́я голова́.', 'Tôi có đầu to.',
  '{"adjectives": "больша́я >< ма́ленькая", "adjectives_vi": "to >< nhỏ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'aff89385-810c-4df0-b323-ba88d815322f', 'во́лосы', 'волосы', 'Noun', 'pl', NULL, 'tóc',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mái tóc dài dày."}]'::jsonb, 'У неё дли́нные густы́е во́лосы.', 'Cô ấy có mái tóc dài dày.',
  '{"adjectives": "дли́нные >< коро́ткие, густы́е >< ре́дкие", "adjectives_vi": "dài >< ngắn, dày >< thưa"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3c6af0d8-4889-405a-9210-00f7d82f84f3', 'лицо́', 'лицо', 'Noun', 'm', NULL, 'mặt',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У него́ ма́ленькое краси́вое лицо́.", "vi": "Anh ấy có khuôn mặt nhỏ đẹp."}]'::jsonb, 'У него́ ма́ленькое краси́вое лицо́.', 'Anh ấy có khuôn mặt nhỏ đẹp.',
  '{"adjectives": "краси́вое, ма́ленькое >< большо́е", "adjectives_vi": "đẹp, nhỏ >< to"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5b5b21d1-ede2-4473-88bf-e77132f5b77b', 'лоб', 'лоб', 'Noun', 'm', NULL, 'trán',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У него́ высо́кий лоб.", "vi": "Anh ấy có trán cao."}]'::jsonb, 'У него́ высо́кий лоб.', 'Anh ấy có trán cao.',
  '{"adjectives": "высо́кий >< ни́зкий", "adjectives_vi": "cao >< thấp"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c731c0c8-ee6b-442e-80d4-a76d7017ad7d', 'бро́ви', 'брови', 'Noun', 'pl', NULL, '2 hàng lông mày',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё гу́стые бро́ви.", "vi": "Cô ấy có lông mày dày."}]'::jsonb, 'У неё гу́стые бро́ви.', 'Cô ấy có lông mày dày.',
  '{"adjectives": "гу́стые >< ре́дкие", "adjectives_vi": "dày >< thưa"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4a435f9e-1c5e-4d3b-9849-6905fb2b616e', 'глаза́', 'глаза', 'Noun', 'm', NULL, 'đôi mắt',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё больши́е краси́вые глаза́.", "vi": "Cô ấy có đôi mắt to đẹp."}]'::jsonb, 'У неё больши́е краси́вые глаза́.', 'Cô ấy có đôi mắt to đẹp.',
  '{"adjectives": "больши́е >< ма́ленькие, краси́вые", "adjectives_vi": "to >< nhỏ, đẹp"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'f190c0eb-7701-448d-ae31-1f58241d23d7', 'но́с', 'нос', 'Noun', 'm', NULL, 'mũi',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У него́ высо́кий пря́мой нос.", "vi": "Anh ấy có mũi cao thẳng."}]'::jsonb, 'У него́ высо́кий пря́мой нос.', 'Anh ấy có mũi cao thẳng.',
  '{"adjectives": "высо́кий >< ни́зкий, пря́мой", "adjectives_vi": "cao >< thấp, thẳng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1ab32ef6-97e5-4af8-8353-915ea2af2be9', 'щёки', 'щеки', 'Noun', 'pl', NULL, '2 bên má',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё румя́ные щёки.", "vi": "Cô ấy có đôi má hồng hào."}]'::jsonb, 'У неё румя́ные щёки.', 'Cô ấy có đôi má hồng hào.',
  '{"adjectives": "румя́ные", "adjectives_vi": "hồng hào"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e3e3f5b1-bc53-423e-b1a7-6ba9bb1e2c88', 'рот', 'рот', 'Noun', 'm', NULL, 'khuôn miệng',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё ма́ленький рот.", "vi": "Cô ấy có khuôn miệng nhỏ."}]'::jsonb, 'У неё ма́ленький рот.', 'Cô ấy có khuôn miệng nhỏ.',
  '{"adjectives": "ма́ленький, широ́кий", "adjectives_vi": "nhỏ, rộng"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '33c19abf-3db8-4958-9861-2dbabc907a94', 'гу́бы', 'губы', 'Noun', 'pl', NULL, 'đôi môi',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё то́нкая краси́вые гу́бы.", "vi": "Cô ấy có đôi môi mỏng đẹp."}]'::jsonb, 'У неё то́нкая краси́вые гу́бы.', 'Cô ấy có đôi môi mỏng đẹp.',
  '{"adjectives": "то́лстые >< то́нкие, краси́вые", "adjectives_vi": "dày, mỏng, đẹp"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '499e6113-0e44-4e51-b080-28c4f232c42e', 'зу́бы', 'зубы', 'Noun', 'pl', NULL, 'hàm răng',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У неё бе́лые здоро́вые зу́бы.", "vi": "Cô ấy có hàm răng trắng khỏe."}]'::jsonb, 'У неё бе́лые здоро́вые зу́бы.', 'Cô ấy có hàm răng trắng khỏe.',
  '{"adjectives": "бе́лые, краси́вые, здоро́вые", "adjectives_vi": "trắng, đẹp, khỏe"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '61f24497-f107-455d-8bd2-2c5112dd16ad', 'у́ши', 'уши', 'Noun', 'pl', NULL, 'đôi tai',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên khuôn mặt', '[{"ru": "У него́ ма́ленькие у́ши.", "vi": "Anh ấy có đôi tai nhỏ."}]'::jsonb, 'У него́ ма́ленькие у́ши.', 'Anh ấy có đôi tai nhỏ.',
  '{"adjectives": "ма́ленькие >< больши́е", "adjectives_vi": "nhỏ, to"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'b4c024f7-ea48-49f4-a9bf-29c7ba64552c', 'голова́', 'голова', 'Noun', 'm', NULL, 'đầu',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên cơ thể', '[{"ru": "У меня́ больша́я голова́.", "vi": "Tôi có đầu to."}]'::jsonb, 'У меня́ больша́я голова́.', 'Tôi có đầu to.',
  '{"adjectives": "больша́я >< ма́ленькая", "adjectives_vi": "to >< nhỏ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd0cff6c6-63c1-4843-a531-2fbef2554454', 'ле́вая рука́ >< пра́вая рука́ - руки́', 'левая рука  правая рука - руки', 'Noun', 'm', NULL, 'tay trái >< tay phải - hai tay',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên cơ thể', '[{"ru": "У неё здоро́вые и си́льные ру́ки.", "vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."}]'::jsonb, 'У неё здоро́вые и си́льные ру́ки.', 'Cô ấy có đôi tay khỏe và mạnh mẽ.',
  '{"adjectives": "здоро́вая - здоро́вые си́льная - си́льные", "adjectives_vi": "khỏe mạnh mẽ"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'eeaa9174-fa00-43be-aa90-6f2cafa0c141', 'ле́вая нога́ >< пра́вая нога́ - ноги́', 'левая нога  правая нога - ноги', 'Noun', 'm', NULL, 'chân trái >< chân phải - hai chân',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên cơ thể', '[{"ru": "У него́ здоро́вые и си́льные но́ги.", "vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}]'::jsonb, 'У него́ здоро́вые и си́льные но́ги.', 'Anh ấy có đôi chân khỏe và mạnh mẽ',
  '{"adjectives": "", "adjectives_vi": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5188040e-c0c4-4024-8b16-fdb58a58e52f', 'грудь', 'грудь', 'Noun', 'f', NULL, 'ngực',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên cơ thể', '[{"ru": "У меня́ боли́т грудь.", "vi": "Tôi đang đau ngực."}]'::jsonb, 'У меня́ боли́т грудь.', 'Tôi đang đau ngực.',
  '{"adjectives": "", "adjectives_vi": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4b04a4a3-29b1-4893-a7f0-0833a6f6b5a1', 'живо́т', 'живот', 'Noun', 'm', NULL, 'bụng',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên cơ thể', '[{"ru": "У меня́ о́чень боли́т живо́т.", "vi": "Tôi đang rất đau bụng"}]'::jsonb, 'У меня́ о́чень боли́т живо́т.', 'Tôi đang rất đau bụng',
  '{"adjectives": "", "adjectives_vi": ""}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'd15c2193-d872-40c1-be38-10cb927349c0', 'спина́', 'спина', 'Noun', 'm', NULL, 'lưng',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Bộ phận trên cơ thể', '[{"ru": "У него́ то́лстая и широ́кая спина́.", "vi": "Anh ấy có tấm lưng dày và rộng."}]'::jsonb, 'У него́ то́лстая и широ́кая спина́.', 'Anh ấy có tấm lưng dày và rộng.',
  '{"adjectives": "то́лстая >< то́нкая, широ́кая >< у́зкая", "adjectives_vi": "dày >< mỏng, rộng >< hẹp"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '4555d447-694e-4a4f-971e-d9c47ef4b76a', 'большо́й >< ма́ленький', 'большои  маленькии', 'Adj', 'm', NULL, 'to >< nhỏ',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5393af0e-c04e-4c59-b028-b556cf9d8893', 'дли́нный >< коро́ткий', 'длинныи  короткии', 'Adj', 'm', NULL, 'dài >< ngắn',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'a299082b-2f7d-4993-b305-af6f01818f05', 'густо́й >< ре́дкий', 'густои  редкии', 'Adj', 'm', NULL, 'dày >< thưa (nhấn mạnh mật độ, số lượng của vật)',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '5f08ff90-36c5-4ba0-bbc1-81fb3f672735', 'высо́кий >< ни́зкий', 'высокии  низкии', 'Adj', 'm', NULL, 'cao >< thấp',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '3044f72d-b8fa-4541-8e4f-4ea21ca4df6e', 'прямо́й', 'прямои', 'Adj', 'm', NULL, 'thẳng',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ebf1ede1-9b80-4899-bf87-25d6e07cd5aa', 'румя́ный', 'румяныи', 'Adj', 'm', NULL, 'hồng hào',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '64fdd68b-5a9a-4749-845a-20c7eea0fc99', 'краси́вый', 'красивыи', 'Adj', 'm', NULL, 'đẹp',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'c7a2cbb4-3361-4b06-8b72-40cad4ecb4b3', 'широ́кий >< у́зкий', 'широкии  узкии', 'Adj', 'm', NULL, 'rộng >< hẹp',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  '1898476f-afd9-4a65-8b66-ba9585fb69d2', 'то́лстый >< то́нкий', 'толстыи  тонкии', 'Adj', 'm', NULL, 'dày >< mỏng (nhấn mạnh độ dày, độ lớn theo chiều ngang của vật)',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'ee02037b-de59-4790-9e0c-a80011f36b60', 'здоро́вый', 'здоровыи', 'Adj', 'm', NULL, 'khỏe mạnh',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);
INSERT INTO vocabularies (
  id, word_with_stress, word_normalized, pos, gender, aspect, meaning_vi,
  topic_id, topic_code, sub_topic, examples, example_ru, example_vi,
  collocations, level, created_at, updated_at
) VALUES (
  'e9b1f30b-bcbd-4e1e-a59e-21392d42a974', 'си́льный', 'сильныи', 'Adj', 'm', NULL, 'mạnh',
  '129ce114-8ddf-407e-881b-b6e05f6de1e8', 'bo_phan_co_the', 'Tính từ miêu tả ngoại hình', '[]'::jsonb, '', '',
  '{"type": "Tính từ miêu tả đặc điểm ngoại hình"}'::jsonb, 'A1', NOW(), NOW()
);