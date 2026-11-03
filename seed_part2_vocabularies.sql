-- ========================================================================
-- RUSI TRKI: SEED PHẦN 2 — 500 TỪ VỰNG CHI TIẾT (BẢNG vocabularies)
-- ========================================================================

DELETE FROM vocabularies;

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
  'Noun',
  'm/f',
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
  'Noun',
  'm/f',
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
  'Noun',
  'm/f',
  NULL,
  'Học sinh',
  'Шко́льница у́чится в шко́ле.',
  'Người nữ sinh đang học ở trường học.',
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
  'Noun',
  'm/f',
  NULL,
  'Giáo viên',
  'Учи́тель преподаёт в шко́ле.',
  'Giáo viên đang dạy học ở trường học.',
  '[{"ru": "Учи́тель преподаёт в шко́ле.", "vi": "Giáo viên đang dạy học ở trường học."}]'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Kỹ sư',
  'Инжене́р ремонти́рует маши́ну на заво́де.',
  'Kỹ sư đang sửa chữa máy móc ở nhà máy.',
  '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Lập trình viên',
  'Программи́ст программи́рует на компью́тере в о́фисе.',
  'Lập trình viên đang lập trình trên máy tính ở văn phòng.',
  '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Bác sĩ',
  'Врач осма́тривает и ле́чит пациéнтов в больни́це.',
  'Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пациéнтов в больни́це.", "vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Giám đốc/ Hiệu trưởng',
  'Дире́ктор руководи́т рабо́той в фи́рме.',
  'Giám đốc đang lãnh đạo công việc ở công ty.',
  '[{"ru": "Дире́ктор руководи́т рабо́той в фи́рме.", "vi": "Giám đốc đang lãnh đạo công việc ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Luật sư',
  'Юри́ст консульти́рует клие́нта в фи́рме.',
  'Luật sư đang tư vấn cho khách hàng ở công ty.',
  '[{"ru": "Юри́ст консульти́рует клие́нта в фи́рме.", "vi": "Luật sư đang tư vấn cho khách hàng ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Doanh nhân',
  'Бизнесме́н встреча́ется с партнёром в фи́рме.',
  'Người doanh nhân đang gặp gỡ đối tác ở công ty.',
  '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Nhân viên/ Công chức',
  'Служа́щий рабо́тает с докуме́нтами в о́фисе.',
  'Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.',
  '[{"ru": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Người bán hàng',
  'Продаве́ц продаёт това́ры в магази́не.',
  'Người bán hàng đang bán hàng hóa ở cửa hàng.',
  '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm/f',
  NULL,
  'Nhà báo',
  'Журнали́ст пи́шет ста́тьи в редаќции.',
  'Nhà báo đang viết báo ở tòa soạn.',
  '[{"ru": "Журнали́ст пи́шет ста́тьи в редаќции.", "vi": "Nhà báo đang viết báo ở tòa soạn."}]'::jsonb,
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
  'Noun',
  'm',
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
  'Noun',
  'm/f',
  NULL,
  'Họa sĩ',
  'Худо́жница рису́ет карти́ны в мастерско́й.',
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
  'Noun',
  'm/f',
  NULL,
  'Nghệ sĩ',
  'Арти́ст выступа́ет в теа́тре.',
  'Người nghệ sĩ đang biểu diễn ở nhà hát.',
  '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."}]'::jsonb,
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
  'Noun',
  'm/f',
  NULL,
  'Phiên dịch viên',
  'Перево́дчик перево́дит те́ксты в о́фисе.',
  'Phiên dịch viên đang dịch các văn bản ở văn phòng.',
  '[{"ru": "Перево́дчик перево́дит те́ксты в о́фисе.", "vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng."}]'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Nhà thiết kế thời trang',
  'Моделье́р создаёт оде́жды в ателье́.',
  'Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.',
  '[{"ru": "Моделье́р создаёт оде́жды в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Nhạc công',
  'Музыка́нт игра́ет на пиани́но на конце́рте.',
  'Nhạc công đang chơi piano trên buổi concert.',
  '[{"ru": "Музыка́нт игра́ет на пиани́но на конце́рте.", "vi": "Nhạc công đang chơi piano trên buổi concert."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm/f',
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
  'Verb',
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
  'Verb',
  NULL,
  'препода́ть',
  'dạy học',
  'Учи́тель преподаёт в шко́ле.',
  'Giáo viên đang dạy học ở trường học.',
  '[{"ru": "Учи́тель преподаёт в шко́ле.", "vi": "Giáo viên đang dạy học ở trường học."}]'::jsonb,
  '{"pattern": "преподава́ть + что?(С4) + кому?(C3) (dạy cái gì? cho ai?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3"}'::jsonb,
  '["преподава́ть + что?(С4) + кому?(C3) (dạy cái gì? cho ai?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'отремонти́ровать маши́ну',
  'sửa chữa máy móc',
  'Инжене́р ремонти́рует маши́ну на заво́де.',
  'Kỹ sư đang sửa chữa máy móc ở nhà máy.',
  '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."}]'::jsonb,
  '{"pattern": "ремонти́ровать + что?(С4) (sửa chữa cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["ремонти́ровать + что?(С4) (sửa chữa cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'изучи́ть хи́мию',
  'nghiên cứu hóa học',
  'Хи́мик изуча́ет хи́мию в лаборато́рии.',
  'Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '[{"ru": "Хи́мик изуча́ет хи́мию в лаборато́рии.", "vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb,
  '{"pattern": "изуча́ть + что?(С4) (nghiên cứu cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["изуча́ть + что?(С4) (nghiên cứu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'изучи́ть расте́ния',
  'nghiên cứu thực vật',
  'Био́лог изуча́ет расте́ния в лаборато́рии.',
  'Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.',
  '[{"ru": "Био́лог изуча́ет расте́ния в лаборато́рии.", "vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm."}]'::jsonb,
  '{"pattern": "изуча́ть + что?(С4) (nghiên cứu cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["изуча́ть + что?(С4) (nghiên cứu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'запрограмми́ровать',
  'lập trình',
  'Программи́ст программи́рует на компью́тере в о́фисе.',
  'Lập trình viên đang lập trình trên máy tính ở văn phòng.',
  '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."}]'::jsonb,
  '{"pattern": "программи́ровать + что?(C4) (lập trình cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["программи́ровать + что?(C4) (lập trình cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'спроекти́ровать зда́ния',
  'thiết kế tòa nhà',
  'Архите́ктор проекти́рует зда́ния в о́фисе.',
  'Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.',
  '[{"ru": "Архите́ктор проекти́рует зда́ния в о́фисе.", "vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng."}]'::jsonb,
  '{"pattern": "проекти́ровать + что?(C4) (thiết kế cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["проекти́ровать + что?(C4) (thiết kế cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'собра́ть данны',
  'thu thập dữ liệu',
  'Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.',
  'Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.',
  '[{"ru": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}]'::jsonb,
  '{"pattern": "собира́ть + что?(C4) (thu thập cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["собира́ть + что?(C4) (thu thập cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'проанализи́ровать данны',
  'phân tích dữ liệu',
  'Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.',
  'Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.',
  '[{"ru": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.", "vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng."}]'::jsonb,
  '{"pattern": "анализи́ровать + что?(C4) (phân tích cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["анализи́ровать + что?(C4) (phân tích cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'осмотре́ть',
  'khám bệnh',
  'Врач осма́тривает и ле́чит пациéнтов в больни́це.',
  'Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пациéнтов в больни́це.", "vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."}]'::jsonb,
  '{"pattern": "осма́тривать + кого?(C4) (khám cho ai?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["осма́тривать + кого?(C4) (khám cho ai?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́лечить',
  'chữa bệnh',
  'Врач осма́тривает и ле́чит пациéнтов в больни́це.',
  'Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пациéнтов в больни́це.", "vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."}]'::jsonb,
  '{"pattern": "лечи́ть + кого?(C4) (chữa trị cho ai?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  'вы́растить овощи́',
  'trồng rau',
  'Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{"pattern": "выра́щивать + что?(C4) (trồng cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["выра́щивать + что?(C4) (trồng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'развести́ скот',
  'chăn nuôi gia súc',
  'Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{"pattern": "разводи́ть + кого?(C4) (chăn nuôi con gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  'пригото́вить еду́',
  'nấu ăn',
  'Домохозя́йка гото́вит еду́ и убира́ет дом.',
  'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb,
  '{"pattern": "гото́вить + что?(C4) (nấu cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["гото́вить + что?(C4) (nấu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'убра́ть дом',
  'dọn dẹp nhà cửa',
  'Домохозя́йка гото́вит еду́ и убира́ет дом.',
  'Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.',
  '[{"ru": "Домохозя́йка гото́вит еду́ и убира́ет дом.", "vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) (dọn dẹp cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["убира́ть + что?(C4) (dọn dẹp cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'lãnh đạo',
  'Дире́ктор руководи́т рабо́той в фирме.',
  'Giám đốc đang lãnh đạo công việc ở công ty.',
  '[{"ru": "Дире́ктор руководи́т рабо́той в фирме.", "vi": "Giám đốc đang lãnh đạo công việc ở công ty."}]'::jsonb,
  '{"pattern": "руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cái gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
  '["руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'проконсульти́ровать клие́нта',
  'tư vấn khách hàng',
  'Юри́ст консульти́рует клие́нта в юриди́ческой фи́рме.',
  'Luật sư đang tư vấn cho khách hàng ở công ty.',
  '[{"ru": "Юри́ст консульти́рует клие́нта в юриди́ческой фи́рме.", "vi": "Luật sư đang tư vấn cho khách hàng ở công ty."}]'::jsonb,
  '{"pattern": "консульти́ровать + кого?(C4) (tư vấn cho ai?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  'встре́титься с партнёрами',
  'gặp gỡ đối tác',
  'Бизнесме́н встреча́ется с партнёром в фи́рме.',
  'Người doanh nhân đang gặp gỡ đối tác ở công ty.',
  '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."}]'::jsonb,
  '{"pattern": "встреча́ться + с кем?(C5) (gặp gỡ với ai?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'làm việc với giấy tờ',
  'Служа́щий рабо́тает с докуме́нтами в о́фисе.',
  'Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.',
  '[{"ru": "Служа́щий рабо́тает с докуме́нтами в о́фисе.", "vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng."}]'::jsonb,
  '{"pattern": "работа́ть + с чем?(C5) (làm việc với cái gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
  '["работа́ть + с чем?(C5) (làm việc với cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'прода́ть',
  'bán hàng',
  'Продаве́ц продаёт това́ры в магази́не.',
  'Người bán hàng đang bán hàng hóa ở cửa hàng.',
  '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."}]'::jsonb,
  '{"pattern": "продава́ть + что?(C4) + кому?(C3) (bán cái gì? cho ai?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3"}'::jsonb,
  '["продава́ть + что?(C4) + кому?(C3) (bán cái gì? cho ai?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'написа́ть',
  'viết',
  'Журнали́ст пи́шет ста́тьи в редаќции.',
  'Nhà báo đang viết báo ở tòa soạn.',
  '[{"ru": "Журнали́ст пи́шет ста́тьи в редаќции.", "vi": "Nhà báo đang viết báo ở tòa soạn."}]'::jsonb,
  '{"pattern": "писа́ть + что?(C4) (viết cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["писа́ть + что?(C4) (viết cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'нарисова́ть карти́ны',
  'vẽ tranh',
  'Худо́жница рису́ет карти́ны в мастерско́й.',
  'Họa sĩ đang vẽ tranh ở xưởng vẽ.',
  '[{"ru": "Худо́жница рису́ет карти́ны в мастерско́й.", "vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ."}]'::jsonb,
  '{"pattern": "рисова́ть + что?(C4) (vẽ cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["рисова́ть + что?(C4) (vẽ cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'выступи́ть',
  'biểu diễn, thuyết trình',
  'Арти́ст выступа́ет в теа́тре.',
  'Người nghệ sĩ đang biểu diễn ở nhà hát.',
  '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."}]'::jsonb,
  '{"pattern": "выступа́ть + о чём?(C6) (phát biểu/thuyết trình về cái gì?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
  '["выступа́ть + о чём?(C6) (phát biểu/thuyết trình về cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'перевести́ те́ксты',
  'dịch văn bản',
  'Перево́дчик перево́дит те́ксты в о́фисе.',
  'Phiên dịch viên đang dịch các văn bản ở văn phòng.',
  '[{"ru": "Перево́дчик перево́дит те́ксты в о́фисе.", "vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng."}]'::jsonb,
  '{"pattern": "переводи́ть+ что?(C4) (dịch cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["переводи́ть+ что?(C4) (dịch cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'созда́ть оде́жду',
  'thiết kế quần áo',
  'Моделье́р создаёт оде́жды в ателье́.',
  'Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.',
  '[{"ru": "Моделье́р создаёт оде́жды в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."}]'::jsonb,
  '{"pattern": "создава́ть + что?(C4) (tạo ra/thiết kế cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["создава́ть + что?(C4) (tạo ra/thiết kế cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'сыгра́ть',
  'chơi',
  'Музыка́нт игра́ет на пиани́но на конце́рте.',
  'Nhạc công đang chơi piano trên buổi concert.',
  '[{"ru": "Музыка́нт игра́ет на пиани́но на конце́рте.", "vi": "Nhạc công đang chơi piano trên buổi concert."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4)/на чём?(С6) (chơi cái gì?/nhạc cụ gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
  '["игра́ть + в что?(C4)/на чём?(С6) (chơi cái gì?/nhạc cụ gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'luyện tập',
  'Спортсме́н занима́ется спо́ртом в спортза́ле.',
  'Vận động viên đang luyện tập thể thao ở phòng tập thể thao.',
  '[{"ru": "Спортсме́н занима́ется спо́ртом в спортза́ле.", "vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao."}]'::jsonb,
  '{"pattern": "занима́ться + чем?(C5) (luyện tập cái gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
  '["занима́ться + чем?(C5) (luyện tập cái gì?)"]'::jsonb,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Nhà máy',
  'Инжене́р ремонти́рует маши́ну на заво́де.',
  'Kỹ sư đang sửa chữa máy móc ở nhà máy.',
  '[{"ru": "Инжене́р ремонти́рует маши́ну на заво́де.", "vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Máy tính',
  'Программи́ст программи́рует на компью́тере в о́фисе.',
  'Lập trình viên đang lập trình trên máy tính ở văn phòng.',
  '[{"ru": "Программи́ст программи́рует на компью́тере в о́фисе.", "vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Bệnh viện',
  'Врач осма́тривает и ле́чит пациéнтов в больни́це.',
  'Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.',
  '[{"ru": "Врач осма́тривает и ле́чит пациéнтов в больни́це.", "vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Phòng khám đa khoa',
  'Врач осма́тривает и ле́чит пациéнтов в поликли́нике.',
  'Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở phòng khám đa khoa.',
  '[{"ru": "Врач осма́тривает и ле́чит пациéнтов в поликли́нике.", "vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở phòng khám đa khoa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Trang trại',
  'Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме.',
  'Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.',
  '[{"ru": "Фе́рмер выра́щивает овощи́ и разво́дит скот на фе́рме.", "vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Công ty',
  'Бизнесме́н встреча́ется с партнёром в фи́рме.',
  'Người doanh nhân đang gặp gỡ đối tác ở công ty.',
  '[{"ru": "Бизнесме́н встреча́ется с партнёром в фи́рме.", "vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Cửa hàng',
  'Продаве́ц продаёт това́ры в магази́не.',
  'Người bán hàng đang bán hàng hóa ở cửa hàng.',
  '[{"ru": "Продаве́ц продаёт това́ры в магази́не.", "vi": "Người bán hàng đang bán hàng hóa ở cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Tòa soạn',
  'Журнали́ст пи́шет ста́тьи в редаќции.',
  'Nhà báo đang viết báo ở tòa soạn.',
  '[{"ru": "Журнали́ст пи́шет ста́тьи в редаќции.", "vi": "Nhà báo đang viết báo ở tòa soạn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Xưởng',
  'Худо́жница рису́ет карти́ны в мастерско́й.',
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
  'Noun',
  'm',
  NULL,
  'Nhà hát',
  'Арти́ст выступа́ет в теа́тре.',
  'Người nghệ sĩ đang biểu diễn ở nhà hát.',
  '[{"ru": "Арти́ст выступа́ет в теа́тре.", "vi": "Người nghệ sĩ đang biểu diễn ở nhà hát."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Buổi hòa nhạc',
  'Музыка́нт игра́ет на пиани́но на конце́рте.',
  'Nhạc công đang chơi piano trên buổi concert.',
  '[{"ru": "Музыка́нт игра́ет на пиани́но на конце́рте.", "vi": "Nhạc công đang chơi piano trên buổi concert."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
  NULL,
  'Tiệm may/xưởng may',
  'Моделье́р создаёт оде́жды в ателье́.',
  'Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.',
  '[{"ru": "Моделье́р создаёт оде́жды в ателье́.", "vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Пальто́',
  'пальто',
  'Noun',
  'n',
  NULL,
  'Áo măng tô',
  'Я надева́ю пальто́, потому́ что на улице́ хо́лодно.',
  'Tôi mặc áo khoác dài vì ngoài trời lạnh.',
  '[{"ru": "Я надева́ю пальто́, потому́ что на улице́ хо́лодно.", "vi": "Tôi mặc áo khoác dài vì ngoài trời lạnh."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Ку́ртка',
  'куртка',
  'Noun',
  'f',
  NULL,
  'Áo khoác',
  'Я надева́ю ку́ртку и иду́ в магази́н.',
  'Tôi mặc áo khoác và đi đến cửa hàng.',
  '[{"ru": "Я надева́ю ку́ртку и иду́ в магази́н.", "vi": "Tôi mặc áo khoác và đi đến cửa hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Сви́тер',
  'свитер',
  'Noun',
  'm',
  NULL,
  'Áo len chui đầu',
  'Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.',
  'Vào mùa đông, tôi thường mặc áo len vì nó ấm.',
  '[{"ru": "Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.", "vi": "Vào mùa đông, tôi thường mặc áo len vì nó ấm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Брю́ки',
  'брюки',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Ша́пка',
  'шапка',
  'Noun',
  'f',
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
  'Quần áo, giày dép',
  'Шарф',
  'шарф',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Перча́тки',
  'перчатки',
  'Noun',
  'm',
  NULL,
  'Găng tay',
  'Я снима́ю перча́тки и убира́ю их в шкаф.',
  'Tôi tháo găng tay và cất chúng vào tủ.',
  '[{"ru": "Я снима́ю перча́тки и убира́ю их в шкаф.", "vi": "Tôi tháo găng tay và cất chúng vào tủ."}]'::jsonb,
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
  'Quần áo, giày dép',
  'Носки́',
  'носки',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Боти́нки',
  'ботинки',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Сапоги́',
  'сапоги',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Футбо́лка',
  'футболка',
  'Noun',
  'f',
  NULL,
  'Áo phông',
  'Ле́том я ча́сто ношу́ футбо́лку и шо́рты.',
  'Mùa hè, tôi thường mặc áo phông và quần short.',
  '[{"ru": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.", "vi": "Mùa hè, tôi thường mặc áo phông và quần short."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Шо́рты',
  'шорты',
  'Noun',
  'm',
  NULL,
  'Quần đùi',
  'Ле́том я ча́сто ношу́ футбо́лку и шо́рты.',
  'Mùa hè, tôi thường mặc áo phông và quần short.',
  '[{"ru": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.", "vi": "Mùa hè, tôi thường mặc áo phông và quần short."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Джи́нсы',
  'джинсы',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Пла́тье',
  'платье',
  'Noun',
  'n',
  NULL,
  'Đầm (váy liền)',
  'На пра́здник я наде́ну краси́вое пла́тье.',
  'Tôi sẽ mặc một chiếc váy đẹp đi dự tiệc.',
  '[{"ru": "На пра́здник я наде́ну краси́вое пла́тье.", "vi": "Tôi sẽ mặc một chiếc váy đẹp đi dự tiệc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Ю́бка',
  'юбка',
  'Noun',
  'f',
  NULL,
  'Chân váy',
  'Сего́дня я надева́ю кра́сную ю́бку',
  'Hôm nay, tôi mặc chân váy màu đỏ.',
  '[{"ru": "Сего́дня я надева́ю кра́сную ю́бку", "vi": "Hôm nay, tôi mặc chân váy màu đỏ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Руба́шка',
  'рубашка',
  'Noun',
  'f',
  NULL,
  'Áo sơ mi',
  'Я выбира́ю бе́лую руба́шку в магази́не оде́жды.',
  'Tôi chọn một chiếc áo sơ mi trắng ở cửa hàng quần áo.',
  '[{"ru": "Я выбира́ю бе́лую руба́шку в магази́не оде́жды.", "vi": "Tôi chọn một chiếc áo sơ mi trắng ở cửa hàng quần áo."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Санда́лии',
  'сандалии',
  'Noun',
  'm',
  NULL,
  'Dép sandal',
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
  'Quần áo, giày dép',
  'Кроссо́вки',
  'кроссовки',
  'Noun',
  'm',
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
  'Quần áo, giày dép',
  'Гря́зная оде́жда',
  'грязная одежда',
  'Noun',
  'f',
  NULL,
  'Quần áo bẩn',
  'Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.',
  'Khi tôi nhìn thấy quần áo bẩn, tôi cho chúng vào máy giặt.',
  '[{"ru": "Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.", "vi": "Khi tôi nhìn thấy quần áo bẩn, tôi cho chúng vào máy giặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'стира́ть',
  'стирать',
  'Verb',
  NULL,
  'постира́ть',
  'giặt',
  'Я стира́ю гря́зную оде́жду в стира́льной маши́не.',
  'Tôi giặt quần áo bẩn bằng máy giặt.',
  '[{"ru": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần áo bẩn bằng máy giặt."}]'::jsonb,
  '{"pattern": "стира́ть + что?(C4) (giặt cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["стира́ть + что?(C4) (giặt cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'Cтира́льная маши́на',
  'cтиральная машина',
  'Noun',
  'f',
  NULL,
  'Máy giặt',
  'Я стира́ю гря́зную оде́жду в стира́льной маши́не.',
  'Tôi giặt quần áo bẩn bằng máy giặt.',
  '[{"ru": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần áo bẩn bằng máy giặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'суши́ть',
  'сушить',
  'Verb',
  NULL,
  'посуши́ть',
  'phơi khô, sấy khô',
  'После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.',
  'Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi.',
  '[{"ru": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.", "vi": "Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi."}]'::jsonb,
  '{"pattern": "суши́ть + что?(C4) (phơi,sấy khô cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["суши́ть + что?(C4) (phơi,sấy khô cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'Суши́лка',
  'сушилка',
  'Noun',
  'f',
  NULL,
  'Giàn phơi',
  'После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.',
  'Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi.',
  '[{"ru": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.", "vi": "Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'скла́дывать',
  'складывать',
  'Verb',
  NULL,
  'сложи́ть',
  'gấp, xếp',
  'Я сложи́л сви́тер и брю́ки в стопку.',
  'Tôi đã gấp áo len và quần dài thành một chồng.',
  '[{"ru": "Я сложи́л сви́тер и брю́ки в стопку.", "vi": "Tôi đã gấp áo len và quần dài thành một chồng."}]'::jsonb,
  '{"pattern": "скла́дывать+ что?(C4) (gấp,xếp cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["скла́дывать+ что?(C4) (gấp,xếp cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'ве́шать',
  'вешать',
  'Verb',
  NULL,
  'повéсить',
  'treo',
  'Я ве́шаю руба́шку на ве́шалку.',
  'Tôi treo áo sơ mi lên móc áo.',
  '[{"ru": "Я ве́шаю руба́шку на ве́шалку.", "vi": "Tôi treo áo sơ mi lên móc áo."}]'::jsonb,
  '{"pattern": "ве́шать + что?(C4) + куда?(C4) (treo cái gì? lên đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["ве́шать + что?(C4) + куда?(C4) (treo cái gì? lên đâu?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'убира́ть',
  'убирать',
  'Verb',
  NULL,
  'убра́ть',
  'dọn dẹp',
  'Я убира́ю футбо́лку в шкаф.',
  'Tôi cất áo phông vào tủ.',
  '[{"ru": "Я убира́ю футбо́лку в шкаф.", "vi": "Tôi cất áo phông vào tủ."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cái gì? vào đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cái gì? vào đâu?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'покупа́ть',
  'покупать',
  'Verb',
  NULL,
  'купи́ть',
  'mua',
  'Я покупа́ю ку́ртку в магази́не оде́жды.',
  'Tôi mua áo khoác ở cửa hàng quần áo.',
  '[{"ru": "Я покупа́ю ку́ртку в магази́не оде́жды.", "vi": "Tôi mua áo khoác ở cửa hàng quần áo."}]'::jsonb,
  '{"pattern": "покупа́ть + что?(C4) (mua cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["покупа́ть + что?(C4) (mua cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'выбира́ть',
  'выбирать',
  'Verb',
  NULL,
  'вы́брать',
  'chọn, lựa chọn',
  'Я выбира́ю футбо́лку и джинсы в магази́не.',
  'Tôi đang chọn áo phông và quần jean ở cửa hàng.',
  '[{"ru": "Я выбира́ю футбо́лку и джинсы в магази́не.", "vi": "Tôi đang chọn áo phông và quần jean ở cửa hàng."}]'::jsonb,
  '{"pattern": "выбира́ть + что?(C4) (chọn cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["выбира́ть + что?(C4) (chọn cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'примеря́ть',
  'примерять',
  'Verb',
  NULL,
  'приме́рить',
  'mặc thử',
  'Я примеря́ю ку́ртку в приме́рочной.',
  'Tôi đang thử áo khoác trong phòng thử đồ.',
  '[{"ru": "Я примеря́ю ку́ртку в приме́рочной.", "vi": "Tôi đang thử áo khoác trong phòng thử đồ."}]'::jsonb,
  '{"pattern": "примеря́ть + что?(C4) (mặc thử cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["примеря́ть + что?(C4) (mặc thử cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'Приме́рочная',
  'примерочная',
  'Noun',
  'f',
  NULL,
  'Phòng thử đồ',
  'Я примеря́ю ку́ртку в приме́рочной.',
  'Tôi đang thử áo khoác trong phòng thử đồ.',
  '[{"ru": "Я примеря́ю ку́ртку в приме́рочной.", "vi": "Tôi đang thử áo khoác trong phòng thử đồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'подходи́ть',
  'подходить',
  'Verb',
  NULL,
  'подойти́',
  'phù hợp',
  'Э́та ку́ртка мне хорошо́ подхо́дит.',
  'Chiếc áo khoác này rất hợp với tôi.',
  '[{"ru": "Э́та ку́ртка мне хорошо́ подхо́дит.", "vi": "Chiếc áo khoác này rất hợp với tôi."}]'::jsonb,
  '{"pattern": "(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?). (2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cái gì?)", "verb_obj": "Động từ đi với cách 3"}'::jsonb,
  '["(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?). (2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'плати́ть',
  'платить',
  'Verb',
  NULL,
  'заплати́ть',
  'thanh toán',
  'Я заплати́л за ку́ртку на ка́ссe ба́нковской ка́ртой.',
  'Tôi đã thanh toán chiếc áo khoác tại quầy thu ngân bằng thẻ ngân hàng',
  '[{"ru": "Я заплати́л за ку́ртку на ка́ссe ба́нковской ка́ртой.", "vi": "Tôi đã thanh toán chiếc áo khoác tại quầy thu ngân bằng thẻ ngân hàng"}]'::jsonb,
  '{"pattern": "плати́ть + за что?(С4) + кому?(C3) (thanh toán cái gì? cho ai?)", "verb_obj": "Động từ đi với cách 3, Động từ đi với cách 5"}'::jsonb,
  '["плати́ть + за что?(С4) + кому?(C3) (thanh toán cái gì? cho ai?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'Ба́нковская ка́рта',
  'банковская карта',
  'Noun',
  'f',
  NULL,
  'Thẻ ngân hàng',
  'Я плачу́ ба́нковской ка́ртой за оде́жду.',
  'Tôi thanh toán tiền quần áo bằng thẻ ngân hàng.',
  '[{"ru": "Я плачу́ ба́нковской ка́ртой за оде́жду.", "vi": "Tôi thanh toán tiền quần áo bằng thẻ ngân hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Нали́чные де́ньги',
  'наличные деньги',
  'Noun',
  'm',
  NULL,
  'Tiền mặt',
  'Я заплати́ла за оде́жду на́личными.',
  'Tôi đã trả tiền quần áo bằng tiền mặt.',
  '[{"ru": "Я заплати́ла за оде́жду на́личными.", "vi": "Tôi đã trả tiền quần áo bằng tiền mặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'Продаве́ц',
  'продавец',
  'Noun',
  'm',
  NULL,
  'Người bán hàng',
  'Я заплати́ла продавцу́ за пла́тье.',
  'Tôi đã trả tiền váy cho người bán hàng.',
  '[{"ru": "Я заплати́ла продавцу́ за пла́тье.", "vi": "Tôi đã trả tiền váy cho người bán hàng."}]'::jsonb,
  '{"note": "продава́ть / прода́ть (bán hàng)"}'::jsonb,
  NULL,
  NULL,
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
  'Quần áo, giày dép',
  'носи́ть',
  'носить',
  'Verb',
  NULL,
  NULL,
  'mặc, đeo, đội',
  'Зимо́й я ношу́ тёплую ку́ртку и ша́пку.',
  'Vào mùa đông, tôi mặc áo khoác ấm và đội mũ.',
  '[{"ru": "Зимо́й я ношу́ тёплую ку́ртку и ша́пку.", "vi": "Vào mùa đông, tôi mặc áo khoác ấm và đội mũ."}]'::jsonb,
  '{"pattern": "носи́ть + что?(C4) (mặc, đeo, đội cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "(wear) (dùng khi nói về thói quen, phong cách ăn mặc)"}'::jsonb,
  '["носи́ть + что?(C4) (mặc, đeo, đội cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'надева́ть',
  'надевать',
  'Verb',
  NULL,
  'наде́ть',
  'mặc vào, đeo vào, đội vào',
  'Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.',
  'Trước khi ra ngoài, tôi mặc áo len và quần dài.',
  '[{"ru": "Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.", "vi": "Trước khi ra ngoài, tôi mặc áo len và quần dài."}]'::jsonb,
  '{"pattern": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)"}'::jsonb,
  '["надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cái gì?)"]'::jsonb,
  NULL,
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
  'Quần áo, giày dép',
  'снима́ть',
  'снимать',
  'Verb',
  NULL,
  'снять',
  'cởi ra, tháo ra',
  'Я снима́ю перча́тки и убира́ю их в шкаф.',
  'Tôi tháo găng tay và cất chúng vào tủ.',
  '[{"ru": "Я снима́ю перча́тки и убира́ю их в шкаф.", "vi": "Tôi tháo găng tay và cất chúng vào tủ."}]'::jsonb,
  '{"pattern": "снима́ть + что?(C4) (cởi ra, tháo ra cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Nghĩa khác: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video)"}'::jsonb,
  '["снима́ть + что?(C4) (cởi ra, tháo ra cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́мыть',
  'rửa',
  'Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.',
  'Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa.',
  '[{"ru": "Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.", "vi": "Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa."}]'::jsonb,
  '{"pattern": "мыть + что?(C4) (rửa cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["мыть + что?(C4) (rửa cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́тереть',
  'lau khô (loại bỏ nước)',
  'На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.',
  'Trên bàn có nước, nên tôi lấy khăn để lau bàn.',
  '[{"ru": "На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.", "vi": "Trên bàn có nước, nên tôi lấy khăn để lau bàn."}]'::jsonb,
  '{"pattern": "вытира́ть + что?(C4) (lau khô cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["вытира́ть + что?(C4) (lau khô cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'взять',
  'lấy ra, cầm lên',
  'Я бра́л молоко́ из холоди́льника.',
  'Tôi đã lấy sữa từ tủ lạnh ra.',
  '[{"ru": "Я бра́л молоко́ из холоди́льника.", "vi": "Tôi đã lấy sữa từ tủ lạnh ra."}]'::jsonb,
  '{"pattern": "брать + что?(C4) (lấy,cầm lên cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "nhấn mạnh hành động cầm lên"}'::jsonb,
  '["брать + что?(C4) (lấy,cầm lên cái gì?)"]'::jsonb,
  ARRAY['держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thái cầm trên tay)']::text[],
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
  'Verb',
  NULL,
  'убра́ть',
  'cất vào',
  'Я убра́л молоко́ в холоди́льник.',
  'Tôi đã cất sữa vào tủ lạnh.',
  '[{"ru": "Я убра́л молоко́ в холоди́льник.", "vi": "Tôi đã cất sữa vào tủ lạnh."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) (dọn dẹp, cất cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["убира́ть + что?(C4) (dọn dẹp, cất cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'окры́ть',
  'mở ra',
  'Я откры́л окно́, что́бы прове́трить ко́мнату.',
  'Tôi đã mở cửa sổ ra để thông gió phòng.',
  '[{"ru": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "vi": "Tôi đã mở cửa sổ ra để thông gió phòng."}]'::jsonb,
  '{"pattern": "открыва́ть + что?(C4) (mở cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["открыва́ть + что?(C4) (mở cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'закры́ть',
  'đóng vào',
  'Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.',
  'Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào.',
  '[{"ru": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.", "vi": "Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào."}]'::jsonb,
  '{"pattern": "закрыва́ть + что?(C4) (đóng, khóa cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["закрыва́ть + что?(C4) (đóng, khóa cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'включи́ть',
  'bật lên',
  'Я включи́л телеви́зор, что́бы посмотре́ть фильм.',
  'Tôi đã bật tivi lên để xem phim.',
  '[{"ru": "Я включи́л телеви́зор, что́бы посмотре́ть фильм.", "vi": "Tôi đã bật tivi lên để xem phim."}]'::jsonb,
  '{"pattern": "включа́ть + что?(C4) (bật cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["включа́ть + что?(C4) (bật cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'вы́ключить',
  'tắt đi',
  'Я вы́ключил свет, что́бы спать.',
  'Tôi tắt đèn để đi ngủ.',
  '[{"ru": "Я вы́ключил свет, что́бы спать.", "vi": "Tôi tắt đèn để đi ngủ."}]'::jsonb,
  '{"pattern": "выключа́ть + что?(C4) (tắt cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["выключа́ть + что?(C4) (tắt cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'постели́ть',
  'trải ra',
  'Я постели́л ковёр, что́бы поста́вить еду́ на него́.',
  'Tôi trải thảm ra để đặt đồ ăn lên.',
  '[{"ru": "Я постели́л ковёр, что́бы поста́вить еду́ на него́.", "vi": "Tôi trải thảm ra để đặt đồ ăn lên."}]'::jsonb,
  '{"pattern": "стели́ть + что?(C4) (trải cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["стели́ть + что?(C4) (trải cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'сверну́ть',
  'cuộn vào',
  'Я сверну́л ковёр и убра́л его́ в шкаф.',
  'Tôi đã cuộn thảm vào và đã cất vảo tủ.',
  '[{"ru": "Я сверну́л ковёр и убра́л его́ в шкаф.", "vi": "Tôi đã cuộn thảm vào và đã cất vảo tủ."}]'::jsonb,
  '{"pattern": "свора́чивать + что?(C4) (cuộn cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["свора́чивать + что?(C4) (cuộn cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'постира́ть',
  'giặt giũ',
  'Я постира́л руба́шку рука́ми.',
  'Tôi đã giặt áo sơ mi bằng tay.',
  '[{"ru": "Я постира́л руба́шку рука́ми.", "vi": "Tôi đã giặt áo sơ mi bằng tay."}]'::jsonb,
  '{"pattern": "стира́ть + что?(C4) (giặt cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["стира́ть + что?(C4) (giặt cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'вы́сушить',
  'phơi khô',
  'Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.',
  'Tôi đang treo quần áo lên giàn phơi để phơi khô đồ.',
  '[{"ru": "Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.", "vi": "Tôi đang treo quần áo lên giàn phơi để phơi khô đồ."}]'::jsonb,
  '{"pattern": "суши́ть + что?(C4) (phơi khô cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["суши́ть + что?(C4) (phơi khô cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'разложи́ть',
  'bày ra',
  'Я раскла́дываю ве́щи на столе́.',
  'Tôi đang bày đồ đạc lên bàn.',
  '[{"ru": "Я раскла́дываю ве́щи на столе́.", "vi": "Tôi đang bày đồ đạc lên bàn."}]'::jsonb,
  '{"pattern": "раскла́дывать + что?(C4) (trải ra, bày ra cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["раскла́дывать + что?(C4) (trải ra, bày ra cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'собра́ть',
  'thu gom',
  'Я собира́ю ве́щи на столе́.',
  'Tôi đang thu gom đồ đạc ở trên bàn.',
  '[{"ru": "Я собира́ю ве́щи на столе́.", "vi": "Tôi đang thu gom đồ đạc ở trên bàn."}]'::jsonb,
  '{"pattern": "собира́ть + что?(C4) (thu gom cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Nghĩa khác: thu hoạch, sưu tầm"}'::jsonb,
  '["собира́ть + что?(C4) (thu gom cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'поста́вить',
  'đặt đứng',
  'Я поста́вил ва́зу на стол.',
  'Tôi đã đặt lọ hoa lên trên bàn.',
  '[{"ru": "Я поста́вил ва́зу на стол.", "vi": "Tôi đã đặt lọ hoa lên trên bàn."}]'::jsonb,
  '{"pattern": "ста́вить + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["ста́вить + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)"]'::jsonb,
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
  'Verb',
  NULL,
  'положи́ть',
  'đặt nằm',
  'Я кладу́ телефо́н и кни́гу на крова́ть.',
  'Tôi đang đặt điện thoại và quyển sách lên trên giường.',
  '[{"ru": "Я кладу́ телефо́н и кни́гу на крова́ть.", "vi": "Tôi đang đặt điện thoại và quyển sách lên trên giường."}]'::jsonb,
  '{"pattern": "класть + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["класть + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)"]'::jsonb,
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
  'Verb',
  NULL,
  'снять',
  'nhấc lên',
  'Я вы́ключил плиту́ и снял кастрю́лю с плиты́.',
  'Tôi đã tắt bếp và nhấc nồi ra khỏi bếp.',
  '[{"ru": "Я вы́ключил плиту́ и снял кастрю́лю с плиты́.", "vi": "Tôi đã tắt bếp và nhấc nồi ra khỏi bếp."}]'::jsonb,
  '{"pattern": "снима́ть + что?(C4) + с/из чего?(C2) (nhấc cái gì? khỏi đâu?)", "verb_obj": "Động từ đi với cách 4", "note": "Nghĩa khác: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video), снима́ть оде́жду (cởi quần áo)"}'::jsonb,
  '["снима́ть + что?(C4) + с/из чего?(C2) (nhấc cái gì? khỏi đâu?)"]'::jsonb,
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
  'Verb',
  NULL,
  'погла́дить (оде́жду)',
  'ủi (quần áo)',
  'Я гла́жу руба́шку.',
  'Tôi đang ủi áo sơ mi.',
  '[{"ru": "Я гла́жу руба́шку.", "vi": "Tôi đang ủi áo sơ mi."}]'::jsonb,
  '{"pattern": "гла́дить + что?(C4) (là,ủi cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["гла́дить + что?(C4) (là,ủi cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'протере́ть',
  'lau chùi (loại bỏ bụi bẩn)',
  'Я протира́ю стол и сту́лья.',
  'Tôi đang lau chùi bàn ghế.',
  '[{"ru": "Я протира́ю стол и сту́лья.", "vi": "Tôi đang lau chùi bàn ghế."}]'::jsonb,
  '{"pattern": "протира́ть + что?(C4) (lau chùi cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["протира́ть + что?(C4) (lau chùi cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'пове́сить',
  'treo',
  'Я пове́сил зе́ркало на сте́ну в ва́нной.',
  'Tôi đã treo gương lên trên tường ở trong phòng tắm.',
  '[{"ru": "Я пове́сил зе́ркало на сте́ну в ва́нной.", "vi": "Tôi đã treo gương lên trên tường ở trong phòng tắm."}]'::jsonb,
  '{"pattern": "ве́шать + что?(C4) + куда?(C4) (treo cái gì? lên đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["ве́шать + что?(C4) + куда?(C4) (treo cái gì? lên đâu?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'почи́стить',
  'cọ rửa, làm sạch',
  'Я чи́щу унита́з и ва́нну.',
  'Tôi đang cọ rửa bồn cầu và bồn tắm.',
  '[{"ru": "Я чи́щу унита́з и ва́нну.", "vi": "Tôi đang cọ rửa bồn cầu và bồn tắm."}]'::jsonb,
  '{"pattern": "чи́стить + что?(C4) (làm sạch/gọt cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "(1) nhấn mạnh việc dùng lực để làm sạch đồ vật (2) чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["чи́стить + что?(C4) (làm sạch/gọt cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'ngồi',
  'Я сижу́ за сту́лом, что́бы учи́ться.',
  'Tôi ngồi vào ghế để học.',
  '[{"ru": "Я сижу́ за сту́лом, что́бы учи́ться.", "vi": "Tôi ngồi vào ghế để học."}]'::jsonb,
  '{"pattern": "сиде́ть + где?(C6) (ngồi ở đâu?)", "verb_obj": "Động từ đi với cách 6", "note": "nhấn mạnh trạng thái đang ngồi"}'::jsonb,
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
  'Verb',
  NULL,
  'укра́сить',
  'trang trí',
  'Я украша́ю гости́ную цвето́чным горшко́м.',
  'Tôi trang trí phòng khách bằng chậu hoa.',
  '[{"ru": "Я украша́ю гости́ную цвето́чным горшко́м.", "vi": "Tôi trang trí phòng khách bằng chậu hoa."}]'::jsonb,
  '{"pattern": "украша́ть + что?(C4) + чем?(C5) (trang trí cái gì? bằng cái gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 5"}'::jsonb,
  '["украша́ть + что?(C4) + чем?(C5) (trang trí cái gì? bằng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'nằm',
  'Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.',
  'Tôi đang nằm trên thảm và đọc sách ở công viên.',
  '[{"ru": "Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.", "vi": "Tôi đang nằm trên thảm và đọc sách ở công viên."}]'::jsonb,
  '{"pattern": "лежа́ть + где?(C6) (nằm ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'сохрани́ть',
  'giữ gìn, cất giữ, lưu trữ',
  'Я храню́ посу́ду в ку́хонном шкафу́.',
  'Tôi cất giữ bát đĩa ở trong tủ bếp.',
  '[{"ru": "Я храню́ посу́ду в ку́хонном шкафу́.", "vi": "Tôi cất giữ bát đĩa ở trong tủ bếp."}]'::jsonb,
  '{"pattern": "храни́ть + что?(C4) (lưu giữ,bảo quản cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["храни́ть + что?(C4) (lưu giữ,bảo quản cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'лечь спать',
  'ngủ',
  'Я ложи́лся спать на дива́не весь день.',
  'Tôi đã ngủ trên sô pha cả ngày.',
  '[{"ru": "Я ложи́лся спать на дива́не весь день.", "vi": "Tôi đã ngủ trên sô pha cả ngày."}]'::jsonb,
  '{"pattern": "ложи́ться спать + где?(C6) (ngủ ở đâu)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'посмотре́ть',
  'xem',
  'Я смотрю́ фильм по компью́теру в спа́льне.',
  'Tôi xem phim trên máy tính ở trong phòng ngủ.',
  '[{"ru": "Я смотрю́ фильм по компью́теру в спа́льне.", "vi": "Tôi xem phim trên máy tính ở trong phòng ngủ."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'отдохну́ть',
  'nghỉ ngơi',
  'Я обы́чно отдыха́ю на дива́не.',
  'Tôi thường nghỉ ngơi trên ghế sô pha.',
  '[{"ru": "Я обы́чно отдыха́ю на дива́не.", "vi": "Tôi thường nghỉ ngơi trên ghế sô pha."}]'::jsonb,
  '{"pattern": "отдыха́ть + где?(C6) (nghỉ ngơi ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'посади́ть (цветы́)',
  'trồng (hoa)',
  'Я сажа́ю цветы́ в цвето́чный горшо́к.',
  'Tôi trồng hoa vào trong chậu hoa.',
  '[{"ru": "Я сажа́ю цветы́ в цвето́чный горшо́к.", "vi": "Tôi trồng hoa vào trong chậu hoa."}]'::jsonb,
  '{"pattern": "сажа́ть + что?(C4) (trồng cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["сажа́ть + что?(C4) (trồng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'làm việc',
  'Я рабо́таю за столо́м.',
  'Tôi làm việc trên bàn.',
  '[{"ru": "Я рабо́таю за столо́м.", "vi": "Tôi làm việc trên bàn."}]'::jsonb,
  '{"pattern": "рабо́тать + где?(C6) (làm việc ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'прове́трить (ко́мнату)',
  'thông gió (phòng)',
  'Я откры́л окно́, что́бы прове́трить ко́мнату.',
  'Tôi đã mở cửa sổ để thông gió phòng.',
  '[{"ru": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "vi": "Tôi đã mở cửa sổ để thông gió phòng."}]'::jsonb,
  '{"pattern": "прове́тривать + что?(C4) (thông gió, làm thoáng cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["прове́тривать + что?(C4) (thông gió, làm thoáng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'съесть',
  'ăn',
  'Я ем рис с мя́сом.',
  'Tôi đang ăn cơm với thịt.',
  '[{"ru": "Я ем рис с мя́сом.", "vi": "Tôi đang ăn cơm với thịt."}]'::jsonb,
  '{"pattern": "есть + что?(C4) (ăn cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["есть + что?(C4) (ăn cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'пригото́вить',
  'nấu',
  'Я гото́влю ка́шу.',
  'Tôi đang nấu cháo.',
  '[{"ru": "Я гото́влю ка́шу.", "vi": "Tôi đang nấu cháo."}]'::jsonb,
  '{"pattern": "гото́вить + что?(C4) (nấu cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["гото́вить + что?(C4) (nấu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'свари́ть',
  'luộc',
  'Я варю́ яйца́ в кастрю́ле.',
  'Tôi đang luộc trứng trong nồi.',
  '[{"ru": "Я варю́ яйца́ в кастрю́ле.", "vi": "Tôi đang luộc trứng trong nồi."}]'::jsonb,
  '{"pattern": "вари́ть + что?(C4) (luộc cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["вари́ть + что?(C4) (luộc cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́пить',
  'uống',
  'Я пью́ сок я́блока.',
  'Tôi đang uống nước ép táo.',
  '[{"ru": "Я пью́ сок я́блока.", "vi": "Tôi đang uống nước ép táo."}]'::jsonb,
  '{"pattern": "пить + что?(C4) (uống cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["пить + что?(C4) (uống cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'пожа́рить',
  'rán',
  'Я жа́рю ры́бу на сковороде́.',
  'Tôi đang rán cá trên chảo.',
  '[{"ru": "Я жа́рю ры́бу на сковороде́.", "vi": "Tôi đang rán cá trên chảo."}]'::jsonb,
  '{"pattern": "жа́рить + что?(C4) (chiên, rán cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["жа́рить + что?(C4) (chiên, rán cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
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
  'Verb',
  NULL,
  NULL,
  'cắt, thái (chung chung)',
  'Я ре́жу морко́вь и помидо́ры.',
  'Tôi đang thái cà rốt và cà chua.',
  '[{"ru": "Я ре́жу морко́вь и помидо́ры.", "vi": "Tôi đang thái cà rốt và cà chua."}]'::jsonb,
  '{"pattern": "ре́зать + что?(C4) (cắt cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["ре́зать + что?(C4) (cắt cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'наре́зать',
  'thái (thành nhiều miếng)',
  'Я чи́щу я́блоко и нареза́ю его́ на куски́.',
  'Tôi đang gọt vỏ táo và cắt chúng thành nhiều miếng.',
  '[{"ru": "Я чи́щу я́блоко и нареза́ю его́ на куски́.", "vi": "Tôi đang gọt vỏ táo và cắt chúng thành nhiều miếng."}]'::jsonb,
  '{"pattern": "нареза́ть + что?(C4) (cắt thái thành miếng cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["нареза́ть + что?(C4) (cắt thái thành miếng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'разре́зать',
  'bổ (làm đôi, làm 4)',
  'Я разреза́ю арбу́з',
  'Tôi đang bổ quả dưa hấu.',
  '[{"ru": "Я разреза́ю арбу́з", "vi": "Tôi đang bổ quả dưa hấu."}]'::jsonb,
  '{"pattern": "разреза́ть + что?(C4) (bổ đôi cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["разреза́ть + что?(C4) (bổ đôi cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'đi (vào phòng)',
  'Я вошёл в ко́мнату.',
  'Tôi đã đi vào trong phòng.',
  '[{"ru": "Я вошёл в ко́мнату.", "vi": "Tôi đã đi vào trong phòng."}]'::jsonb,
  '{"pattern": "войти́ / входи́ть + куда?(C4) (đi vào trong đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'đi ra (khỏi phòng)',
  'Я вы́шел из до́ма.',
  'Tôi đã đi ra khỏi nhà.',
  '[{"ru": "Я вы́шел из до́ма.", "vi": "Tôi đã đi ra khỏi nhà."}]'::jsonb,
  '{"pattern": "вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cái gì?)", "verb_obj": "Động từ đi với cách 2"}'::jsonb,
  '["вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cái gì?)"]'::jsonb,
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
  'Word',
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
  'Noun',
  'm',
  NULL,
  'Ghế sopha',
  'Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.',
  'Tôi đặt sopha ở phòng khách để ngồi và xem phim.',
  '[{"ru": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.", "vi": "Tôi đặt sopha ở phòng khách để ngồi và xem phim."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Bàn',
  'Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.',
  'Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó.',
  '[{"ru": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.", "vi": "Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bình hoa',
  'Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.',
  'Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào trong nó.',
  '[{"ru": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.", "vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào trong nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Tủ/kệ nhỏ có ngăn kéo',
  'Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.',
  'Tôi đặt tủ ở phòng khách để đặt tivi lên trên nó.',
  '[{"ru": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.", "vi": "Tôi đặt tủ ở phòng khách để đặt tivi lên trên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Chậu cây',
  'Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.',
  'Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách.',
  '[{"ru": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.", "vi": "Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'n',
  NULL,
  'Cửa sổ',
  'Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.',
  'Tôi mở cửa sổ vào buổi sáng để thông gió phòng.',
  '[{"ru": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.", "vi": "Tôi mở cửa sổ vào buổi sáng để thông gió phòng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Chảo',
  'Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.',
  'Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ.',
  '[{"ru": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.", "vi": "Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Dao',
  'Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.',
  'Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao.',
  '[{"ru": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.", "vi": "Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Đĩa',
  'Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.',
  'Tôi đặt đĩa lên bàn và đặt trứng rán lên.',
  '[{"ru": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.", "vi": "Tôi đặt đĩa lên bàn và đặt trứng rán lên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bát',
  'Я налива́ю суп в ми́ску.',
  'Tôi đổ súp vào bát.',
  '[{"ru": "Я налива́ю суп в ми́ску.", "vi": "Tôi đổ súp vào bát."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Tách, chén',
  'Я налива́ю чай в ча́шку, что́бы пить.',
  'Tôi rót trà vào tách để uống',
  '[{"ru": "Я налива́ю чай в ча́шку, что́бы пить.", "vi": "Tôi rót trà vào tách để uống"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Thớt',
  'Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.',
  'Tôi đặt thớt lên bàn để thái rau trên nó.',
  '[{"ru": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.", "vi": "Tôi đặt thớt lên bàn để thái rau trên nó."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bồn rửa',
  'Я мо́ю посу́ду в ра́ковине.',
  'Tôi rửa bát đĩa trong bồn rửa.',
  '[{"ru": "Я мо́ю посу́ду в ра́ковине.", "vi": "Tôi rửa bát đĩa trong bồn rửa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Tủ quần áo',
  'Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).',
  'Tôi mở tủ quần áo ra để cất quần áo vào (trong nó).',
  '[{"ru": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).", "vi": "Tôi mở tủ quần áo ra để cất quần áo vào (trong nó)."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Máy tính',
  'Я включа́ю компью́тер, что́бы рабо́тать.',
  'Tôi bật máy tính lên để làm việc.',
  '[{"ru": "Я включа́ю компью́тер, что́бы рабо́тать.", "vi": "Tôi bật máy tính lên để làm việc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Đèn ngủ, đèn học',
  'Я включа́ю ла́мпу, что́бы чита́ть кни́гу.',
  'Tôi bật đèn lên để đọc sách.',
  '[{"ru": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.", "vi": "Tôi bật đèn lên để đọc sách."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'n',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'n',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Máy giặt',
  'Я стира́ю оде́жду в стира́льной маши́не.',
  'Tôi giặt quần áo trong máy giặt.',
  '[{"ru": "Я стира́ю оде́жду в стира́льной маши́не.", "vi": "Tôi giặt quần áo trong máy giặt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Bàn là',
  'Я гла́жу руба́шку утюго́м.',
  'Tôi là áo sơ mi bằng bàn là.',
  '[{"ru": "Я гла́жу руба́шку утюго́м.", "vi": "Tôi là áo sơ mi bằng bàn là."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Cầu là (bàn để là quần áo)',
  'Я гла́жу оде́жду на глади́льной доске́.',
  'Tôi là quần áo trên cầu là.',
  '[{"ru": "Я гла́жу оде́жду на глади́льной доске́.", "vi": "Tôi là quần áo trên cầu là."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Cуши́лка',
  'cушилка',
  'Noun',
  'f',
  NULL,
  'Giàn phơi',
  'Я сушу́ оде́жду на суши́лке.',
  'Tôi phơi quần áo trên giàn phơi đồ.',
  '[{"ru": "Я сушу́ оде́жду на суши́лке.", "vi": "Tôi phơi quần áo trên giàn phơi đồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Verb',
  NULL,
  'нали́ть',
  'rót, đổ',
  'Я налива́ю во́ду в стака́н, что́бы пить.',
  'Tôi rót nước vào cốc để uống',
  '[{"ru": "Я налива́ю во́ду в стака́н, что́бы пить.", "vi": "Tôi rót nước vào cốc để uống"}]'::jsonb,
  '{"pattern": "налива́ть + что?(С4) + куда?(С4) (đổ, rót cái gì? vào đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["налива́ть + что?(С4) + куда?(С4) (đổ, rót cái gì? vào đâu?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'взять',
  'lấy ra, cầm lên',
  'Я беру́ пена́л и кни́гу из рюкзака́.',
  'Tôi đang lấy hộp bút và sách từ trong cặp ra.',
  '[{"ru": "Я беру́ пена́л и кни́гу из рюкзака́.", "vi": "Tôi đang lấy hộp bút và sách từ trong cặp ra."}]'::jsonb,
  '{"pattern": "брать + что?(C4) (lấy,cầm lên cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "nhấn mạnh hành động cầm lên"}'::jsonb,
  '["брать + что?(C4) (lấy,cầm lên cái gì?)"]'::jsonb,
  ARRAY['держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thái cầm trên tay)']::text[],
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
  'Verb',
  NULL,
  'убра́ть',
  'cất vào',
  'Я убира́ю пена́л и кни́гу в рюкза́к.',
  'Tôi đang cất hộp bút và sách vào trong cặp.',
  '[{"ru": "Я убира́ю пена́л и кни́гу в рюкза́к.", "vi": "Tôi đang cất hộp bút và sách vào trong cặp."}]'::jsonb,
  '{"pattern": "убира́ть + что?(C4) (dọn dẹp, cất cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["убира́ть + что?(C4) (dọn dẹp, cất cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'подержа́ть',
  'cầm',
  'Я держу́ рюкза́к.',
  'Tôi đang cầm cặp sách.',
  '[{"ru": "Я держу́ рюкза́к.", "vi": "Tôi đang cầm cặp sách."}]'::jsonb,
  '{"pattern": "держа́ть + что?(C4) (cầm, giữ cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "nhấn mạnh trạng thái cầm trên tay"}'::jsonb,
  '["держа́ть + что?(C4) (cầm, giữ cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'поста́вить',
  'đặt đứng',
  'Я ста́влю кни́гу на по́лку.',
  'Tôi đặt quyển sách (chiều đứng) lên trên kệ.',
  '[{"ru": "Я ста́влю кни́гу на по́лку.", "vi": "Tôi đặt quyển sách (chiều đứng) lên trên kệ."}]'::jsonb,
  '{"pattern": "ста́вить + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)", "verb_obj": "Động từ đi với cách 4", "note": "класть / положи́ть (đặt nằm)"}'::jsonb,
  '["ста́вить + что? (C4) + куда?(C4) (đặt để cái gì? ở đâu?)"]'::jsonb,
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
  'Verb',
  NULL,
  'положи́ть',
  'đặt nằm',
  'Я кладу́ кни́гу на стол.',
  'Tôi đặt quyển sách (chiều nằm) lên trên bàn.',
  '[{"ru": "Я кладу́ кни́гу на стол.", "vi": "Tôi đặt quyển sách (chiều nằm) lên trên bàn."}]'::jsonb,
  '{"pattern": "класть + что? (C4) +  куда?(C4) (đặt để cái gì? ở đâu?)", "verb_obj": "Động từ đi với cách 4", "note": "ста́вить / поста́вить (đặt đứng)"}'::jsonb,
  '["класть + что? (C4) +  куда?(C4) (đặt để cái gì? ở đâu?)"]'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Cái nắp',
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
  'Verb',
  NULL,
  'откры́ть',
  'mở ra',
  'Я откры́л окно́, что́бы прове́трить ко́мнату.',
  'Tôi đã mở cửa sổ ra để thông gió phòng.',
  '[{"ru": "Я откры́л окно́, что́бы прове́трить ко́мнату.", "vi": "Tôi đã mở cửa sổ ra để thông gió phòng."}]'::jsonb,
  '{"pattern": "открыва́ть + что?(C4) (mở cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["открыва́ть + что?(C4) (mở cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'закры́ть',
  'đóng vào',
  'Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.',
  'Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào.',
  '[{"ru": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.", "vi": "Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào."}]'::jsonb,
  '{"pattern": "закрыва́ть + что?(C4) (đóng, khóa cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["закрыва́ть + что?(C4) (đóng, khóa cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'включи́ть',
  'bật lên',
  'Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.',
  'Tôi bật máy tính lên để chơi game.',
  '[{"ru": "Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.", "vi": "Tôi bật máy tính lên để chơi game."}]'::jsonb,
  '{"pattern": "включа́ть + что?(C4) (bật cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["включа́ть + что?(C4) (bật cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'вы́ключить',
  'tắt đi',
  'Я выключа́ю прое́ктор.',
  'Tôi tắt máy chiếu đi.',
  '[{"ru": "Я выключа́ю прое́ктор.", "vi": "Tôi tắt máy chiếu đi."}]'::jsonb,
  '{"pattern": "выключа́ть + что?(C4) (tắt cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["выключа́ть + что?(C4) (tắt cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'сложи́ть',
  'gấp lại, xếp lại',
  'Я складыва́ю тря́пку и кладу́ её на стол.',
  'Tôi gấp khăn lau bảng lại và để nó trên bàn.',
  '[{"ru": "Я складыва́ю тря́пку и кладу́ её на стол.", "vi": "Tôi gấp khăn lau bảng lại và để nó trên bàn."}]'::jsonb,
  '{"pattern": "скла́дывать + что?(C4) (gấp, xếp cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["скла́дывать + что?(C4) (gấp, xếp cái gì?)"]'::jsonb,
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
  'Verb',
  NULL,
  'протере́ть',
  'lau chùi (loại bỏ bụi bẩn)',
  'Я протира́ю стол и сту́лья.',
  'Tôi đang lau chùi bàn ghế.',
  '[{"ru": "Я протира́ю стол и сту́лья.", "vi": "Tôi đang lau chùi bàn ghế."}]'::jsonb,
  '{"pattern": "протира́ть + что?(C4) (lau chùi cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)"}'::jsonb,
  '["протира́ть + что?(C4) (lau chùi cái gì?)"]'::jsonb,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bảng đen',
  'Учитель пи́шет ме́лом на доске́.',
  'Thầy giáo viết lên bảng (đen) bằng phấn.',
  '[{"ru": "Учитель пи́шет ме́лом на доске́.", "vi": "Thầy giáo viết lên bảng (đen) bằng phấn."}]'::jsonb,
  '{"note": "Cách viết khác: Кла́ссная доска́"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bảng trắng',
  'Учительница пи́шет маркёром на бе́лой доске́.',
  'Cô giáo viết lên bảng trắng bằng bút dạ.',
  '[{"ru": "Учительница пи́шет маркёром на бе́лой доске́.", "vi": "Cô giáo viết lên bảng trắng bằng bút dạ."}]'::jsonb,
  '{"note": "Cách viết khác: Ма́ркерная доска́"}'::jsonb,
  NULL,
  NULL,
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
  'Verb',
  NULL,
  'наде́ть',
  'mặc vào, đeo vào, đội vào',
  'Я надева́ю рюкза́к.',
  'Tôi đang đeo cặp sách.',
  '[{"ru": "Я надева́ю рюкза́к.", "vi": "Tôi đang đeo cặp sách."}]'::jsonb,
  '{"pattern": "надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)"}'::jsonb,
  '["надева́ть + что?(C4) (mặc vào, đeo vào, đội vào cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'пове́сить',
  'treo',
  'Учи́тель ве́шает прое́ктор на потоло́к.',
  'Thầy giáo đang treo máy chiếu lên trần nhà.',
  '[{"ru": "Учи́тель ве́шает прое́ктор на потоло́к.", "vi": "Thầy giáo đang treo máy chiếu lên trần nhà."}]'::jsonb,
  '{"pattern": "ве́шать + что?(C4) + куда? (C4) (treo cái gì? lên đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["ве́шать + что?(C4) + куда? (C4) (treo cái gì? lên đâu?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'заточи́ть каранда́ш',
  'gọt bút chì',
  'Я держу́ точи́лку, что́бы заточи́ть каранда́ш.',
  'Tôi cầm gọt bút chì để gọt bút chì.',
  '[{"ru": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.", "vi": "Tôi cầm gọt bút chì để gọt bút chì."}]'::jsonb,
  '{"pattern": "точи́ть + что?(C4) (gọt, mài cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Точи́лка (cái gọt bút chì)"}'::jsonb,
  '["точи́ть + что?(C4) (gọt, mài cái gì?)"]'::jsonb,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'cái gọt bút chì',
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
  'Verb',
  NULL,
  'стере́ть',
  'tẩy xóa',
  'Я беру́ ла́стик, что́бы стере́ть.',
  'Tôi lấy cục tẩy để tẩy.',
  '[{"ru": "Я беру́ ла́стик, что́бы стере́ть.", "vi": "Tôi lấy cục tẩy để tẩy."}]'::jsonb,
  '{"pattern": "стира́ть + что?(C4) (tẩy xóa cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Ла́стик (cục tẩy)"}'::jsonb,
  '["стира́ть + что?(C4) (tẩy xóa cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'начерти́ть',
  'kẻ',
  'Я черчу́ пряму́ю ли́нию лине́йкой.',
  'Tôi kẻ một đường thẳng bằng thước kẻ.',
  '[{"ru": "Я черчу́ пряму́ю ли́нию лине́йкой.", "vi": "Tôi kẻ một đường thẳng bằng thước kẻ."}]'::jsonb,
  '{"pattern": "черти́ть + что?(C4) (kẻ cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Лине́йка (thước kẻ), Пряма́я ли́ния (đường thẳng)"}'::jsonb,
  '["черти́ть + что?(C4) (kẻ cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'раскра́сить',
  'tô màu',
  'Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.',
  'Tôi tô màu bức tranh này bằng những chiếc bút chì màu.',
  '[{"ru": "Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.", "vi": "Tôi tô màu bức tranh này bằng những chiếc bút chì màu."}]'::jsonb,
  '{"pattern": "раскра́шивать + что?(C4) (tô màu cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Цветны́е карандаши́ (bút chì màu)"}'::jsonb,
  '["раскра́шивать + что?(C4) (tô màu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́учить',
  'học',
  'Я вы́учу но́вые словари́.',
  'Tôi đang học thuộc từ mới.',
  '[{"ru": "Я вы́учу но́вые словари́.", "vi": "Tôi đang học thuộc từ mới."}]'::jsonb,
  '{"pattern": "учи́ть + что?(C4) (học / học thuộc cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["учи́ть + что?(C4) (học / học thuộc cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'написа́ть',
  'viết',
  'Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́',
  'Tôi mở quyển vở ra để viết từ mới.',
  '[{"ru": "Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́", "vi": "Tôi mở quyển vở ra để viết từ mới."}]'::jsonb,
  '{"pattern": "писа́ть + что?(C4) (viết cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["писа́ть + что?(C4) (viết cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'нарисова́ть',
  'vẽ',
  'Я рису́ю дом на бума́ге.',
  'Tôi vẽ ngôi nhà lên trên tờ giấy.',
  '[{"ru": "Я рису́ю дом на бума́ге.", "vi": "Tôi vẽ ngôi nhà lên trên tờ giấy."}]'::jsonb,
  '{"pattern": "рисова́ть + что?(C4) (vẽ cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["рисова́ть + что?(C4) (vẽ cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посмотре́ть слова́',
  'tra từ vựng',
  'Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.',
  'Tôi lấy từ điển ở thư viện để tra từ vựng.',
  '[{"ru": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.", "vi": "Tôi lấy từ điển ở thư viện để tra từ vựng."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem, tra cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem, tra cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'показа́ть',
  'cho xem, trình chiếu',
  'Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.',
  'Tôi thường trình chiếu bài thuyết trình bằng máy chiếu.',
  '[{"ru": "Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.", "vi": "Tôi thường trình chiếu bài thuyết trình bằng máy chiếu."}]'::jsonb,
  '{"pattern": "пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cái gì?)", "verb_obj": "Động từ đi với cách 3, Động từ đi với cách 4"}'::jsonb,
  '["пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'сыгра́ть в компью́терную игру́',
  'chơi điện tử',
  'Я обы́чно игра́ю в моби́льные игры́ на телефо́не.',
  'Tôi thường chơi điện tử trong điện thoại.',
  '[{"ru": "Я обы́чно игра́ю в моби́льные игры́ на телефо́не.", "vi": "Tôi thường chơi điện tử trong điện thoại."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4) (chơi trò chơi gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Компью́терная игра́ (trò chơi điện tử trên máy tính), Моби́льная игра́ (trò chơi điện tử trên điện thoại)"}'::jsonb,
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
  'Verb',
  NULL,
  'прочита́ть',
  'đọc',
  'Я открыва́ю кни́гу, что́бы чита́ть.',
  'Tôi mở quyển sách ra để đọc.',
  '[{"ru": "Я открыва́ю кни́гу, что́бы чита́ть.", "vi": "Tôi mở quyển sách ra để đọc."}]'::jsonb,
  '{"pattern": "чита́ть + что?(C4) (đọc cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["чита́ть + что?(C4) (đọc cái gì?)"]'::jsonb,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'bài giảng',
  'Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.',
  'Giảng viên thường trình chiếu bài giảng bằng máy chiếu.',
  '[{"ru": "Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.", "vi": "Giảng viên thường trình chiếu bài giảng bằng máy chiếu."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'cặp sách',
  'Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.',
  'Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên.',
  '[{"ru": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.", "vi": "Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Sách',
  'Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.',
  'Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.',
  '[{"ru": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.", "vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Giấy',
  'Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.',
  'Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay.',
  '[{"ru": "Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.", "vi": "Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Bảng đen',
  'Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.',
  'Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.',
  '[{"ru": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.", "vi": "Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Phấn',
  'Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.',
  'Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn.',
  '[{"ru": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.", "vi": "Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn."}]'::jsonb,
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
  'Noun',
  'f',
  NULL,
  'Bảng trắng',
  'Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.',
  'Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.',
  '[{"ru": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.", "vi": "Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Máy chiếu',
  'Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..',
  'Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu.',
  '[{"ru": "Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..", "vi": "Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Máy tính',
  'Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.',
  'Giảng viên bật máy tính lên và xem bài giảng trên màn hình (của) máy tính.',
  '[{"ru": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.", "vi": "Giảng viên bật máy tính lên và xem bài giảng trên màn hình (của) máy tính."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Xe buýt',
  'Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.',
  'Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.',
  '[{"ru": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.", "vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt."}]'::jsonb,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'n',
  NULL,
  'Tàu điện ngầm',
  'Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.',
  'Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.',
  '[{"ru": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.", "vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro."}]'::jsonb,
  '{"note": "Cта́нция метро́ (ga tàu điện ngầm)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Tàu hỏa',
  'Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.',
  'Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.',
  '[{"ru": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.", "vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về."}]'::jsonb,
  '{"note": "Bокза́л (tàu hỏa)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Máy bay',
  'Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.',
  'Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về.',
  '[{"ru": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.", "vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về."}]'::jsonb,
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
  'Oстано́вка',
  'oстановка',
  'Noun',
  'f',
  NULL,
  'Điểm dừng',
  'Я иду́ (пешко́м) на остано́вку из общежи́тия.',
  'Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá.',
  '[{"ru": "Я иду́ (пешко́м) на остано́вку из общежи́тия.", "vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá."}]'::jsonb,
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
  'Cта́нция метро́',
  'cтанция метро',
  'Noun',
  'n',
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
  'Bокза́л',
  'bокзал',
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Sân bay',
  'Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.',
  'Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay.',
  '[{"ru": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.", "vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay."}]'::jsonb,
  '{"note": "Самолёт (máy bay)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Xe máy',
  'Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.',
  'Tôi đang đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy.',
  '[{"ru": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.", "vi": "Tôi đang đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy."}]'::jsonb,
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
  'Noun',
  'm',
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
  'Verb',
  NULL,
  NULL,
  'bay',
  'В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.',
  'Tháng trước, tôi đã bay từ Kazan đến Moskva.',
  '[{"ru": "В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.", "vi": "Tháng trước, tôi đã bay từ Kazan đến Moskva."}]'::jsonb,
  '{"pattern": "лете́ть / лета́ть + куда?(С4): bay đến đâu?", "verb_obj": "Động từ đi với cách 4", "note": "(1) лете́ть (1 chiều; 1 lần) (2) лета́ть (2 chiều ; thường xuyên)"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'đi bộ',
  'Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.',
  'Sáng nay, tôi đã đi đến cửa hàng để mua thực phẩm.',
  '[{"ru": "Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.", "vi": "Sáng nay, tôi đã đi đến cửa hàng để mua thực phẩm."}]'::jsonb,
  '{"pattern": "идти́ / ходи́ть + куда?(С4): đi bộ đến đâu?", "verb_obj": "Động từ đi với cách 4", "note": "(1) идти́ (1 chiều, 1 lần) (2) ходи́ть (2 chiều, thường xuyên)"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'đi (bằng phương tiện)',
  'Вчера́ я е́здил в банк на авто́бусе.',
  'Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt.',
  '[{"ru": "Вчера́ я е́здил в банк на авто́бусе.", "vi": "Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt."}]'::jsonb,
  '{"pattern": "е́хать / е́здить + куда?(С4) + на чём?(С6): đi đến đâu? bằng phương tiện nào?", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6", "note": "(1) е́хать (1 chiều, 1 lần) (2) е́здить (2 chiều, thường xuyên)"}'::jsonb,
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
  'Verb',
  NULL,
  'изучи́ть',
  'nghiên cứu',
  'Я изуча́ю хи́мию в институ́те хи́мии.',
  'Tôi đang nghiên cứu hóa học ở viện hóa học.',
  '[{"ru": "Я изуча́ю хи́мию в институ́те хи́мии.", "vi": "Tôi đang nghiên cứu hóa học ở viện hóa học."}]'::jsonb,
  '{"pattern": "изуча́ть + что?(C4) (nghiên cứu cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["изуча́ть + что?(C4) (nghiên cứu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'прочита́ть',
  'đọc',
  'Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.',
  'Tôi rất thích đọc sách và tôi đã đọc xong quyển sách này rồi.',
  '[{"ru": "Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.", "vi": "Tôi rất thích đọc sách và tôi đã đọc xong quyển sách này rồi."}]'::jsonb,
  '{"pattern": "чита́ть + что?(C4) (đọc cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["чита́ть + что?(C4) (đọc cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'встре́тить',
  'gặp gỡ',
  'Вчера́ я встре́тил ре́ктора в столо́вой.',
  'Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn.',
  '[{"ru": "Вчера́ я встре́тил ре́ктора в столо́вой.", "vi": "Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn."}]'::jsonb,
  '{"pattern": "встреча́ть + кого?(C4) (gặp gỡ ai?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  'пода́ть докуме́нты',
  'nộp tài liệu',
  'Я подал докуме́нты для поступле́ния в декана́те.',
  'Tôi đã nộp giấy tờ nhập học cho văn phòng khoa.',
  '[{"ru": "Я подал докуме́нты для поступле́ния в декана́те.", "vi": "Tôi đã nộp giấy tờ nhập học cho văn phòng khoa."}]'::jsonb,
  '{"pattern": "подава́ть + что?(C4) + кому?(C3) (nộp, đưa cái gì? cho ai?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3"}'::jsonb,
  '["подава́ть + что?(C4) + кому?(C3) (nộp, đưa cái gì? cho ai?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'получи́ть докуме́нты',
  'nhận tài liệu',
  'Я получи́л студе́нческий биле́т в декана́те.',
  'Tôi đã nhận được thẻ sinh viên ở văn phòng khoa.',
  '[{"ru": "Я получи́л студе́нческий биле́т в декана́те.", "vi": "Tôi đã nhận được thẻ sinh viên ở văn phòng khoa."}]'::jsonb,
  '{"pattern": "получа́ть + что?(C4) (nhận cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["получа́ть + что?(C4) (nhận cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'sống',
  'Я живу́ в кварти́ре.',
  'Tôi đang sống ở trong căn hộ.',
  '[{"ru": "Я живу́ в кварти́ре.", "vi": "Tôi đang sống ở trong căn hộ."}]'::jsonb,
  '{"pattern": "жить + где?(C6) (sống ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'послу́шать ле́кцию',
  'nghe bài giảng',
  'Я слу́шаю ле́кцию на ле́кции.',
  'Tôi đang nghe bài giảng ở trên giảng đường.',
  '[{"ru": "Я слу́шаю ле́кцию на ле́кции.", "vi": "Tôi đang nghe bài giảng ở trên giảng đường."}]'::jsonb,
  '{"pattern": "слу́шать + что?(C4) (nghe cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["слу́шать + что?(C4) (nghe cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́ступить',
  'phát biểu; thuyết trình',
  'Сего́дня я бу́ду выступа́ть на семина́ре.',
  'Hôm nay tôi sẽ thuyết trình trên seminar.',
  '[{"ru": "Сего́дня я бу́ду выступа́ть на семина́ре.", "vi": "Hôm nay tôi sẽ thuyết trình trên seminar."}]'::jsonb,
  '{"pattern": "выступа́ть + о чём?(C6) + где?(C6) (phát biểu, thuyết trình về cái gì? ở đâu?)", "verb_obj": "Động từ đi với cách 6", "note": "Выступле́ние (сущ.)"}'::jsonb,
  '["выступа́ть + о чём?(C6) + где?(C6) (phát biểu, thuyết trình về cái gì? ở đâu?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'nghiên cứu',
  'Я иссле́дую хи́мию в лаборато́рии.',
  'Tôi đang nghiên cứu hóa học ở phòng thí nghiệm.',
  '[{"ru": "Я иссле́дую хи́мию в лаборато́рии.", "vi": "Tôi đang nghiên cứu hóa học ở phòng thí nghiệm."}]'::jsonb,
  '{"pattern": "иссле́довать + что?(C4) (nghiên cứu cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["иссле́довать + что?(C4) (nghiên cứu cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'купи́ть лека́рства',
  'mua thuốc',
  'Я купи́л лека́рство в апте́ке.',
  'Tôi đã mua thuốc ở hiệu thuốc.',
  '[{"ru": "Я купи́л лека́рство в апте́ке.", "vi": "Tôi đã mua thuốc ở hiệu thuốc."}]'::jsonb,
  '{"pattern": "покупа́ть + что?(C4) (mua cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["покупа́ть + что?(C4) (mua cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'đi đến chỗ bác sĩ',
  'Я иду́ к врачу́.',
  'Tôi đang đi gặp bác sĩ.',
  '[{"ru": "Я иду́ к врачу́.", "vi": "Tôi đang đi gặp bác sĩ."}]'::jsonb,
  '{"pattern": "идти́ / е́хать + к кому?(C3)(đi đến chỗ ai?)", "verb_obj": "Động từ đi với cách 3"}'::jsonb,
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
  'Verb',
  NULL,
  'послу́шать му́зыку',
  'nghe nhạc',
  'Я люблю́ слу́шать му́зыку по телефо́ну.',
  'Tôi thích nghe nhạc bằng điện thoại.',
  '[{"ru": "Я люблю́ слу́шать му́зыку по телефо́ну.", "vi": "Tôi thích nghe nhạc bằng điện thoại."}]'::jsonb,
  '{"pattern": "слу́шать + что?(C4) (nghe cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["слу́шать + что?(C4) (nghe cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посмотре́ть карти́ны',
  'xem tranh',
  'Я люблю́ смотре́ть карти́ны в музе́е.',
  'Tôi thích xem tranh ở bảo tàng.',
  '[{"ru": "Я люблю́ смотре́ть карти́ны в музе́е.", "vi": "Tôi thích xem tranh ở bảo tàng."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посмотре́ть спекта́кль',
  'xem vở kịch',
  'Я смотре́л э́тот спекта́кль в Большо́м теа́тре.',
  'Tôi đã xem vở kịch này ở nhà hát lớn.',
  '[{"ru": "Я смотре́л э́тот спекта́кль в Большо́м теа́тре.", "vi": "Tôi đã xem vở kịch này ở nhà hát lớn."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посмотре́ть выступле́ние',
  'xem buổi biểu diễn',
  'Я смотре́л выступле́ние арти́стов на конце́рте.',
  'Tôi đã xem buổi trình diễn của các nghệ sĩ ở buổi hòa nhạc.',
  '[{"ru": "Я смотре́л выступле́ние арти́стов на конце́рте.", "vi": "Tôi đã xem buổi trình diễn của các nghệ sĩ ở buổi hòa nhạc."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посмотре́ть фильм',
  'xem phim',
  'Я люблю́ смотре́ть фильм по телеви́зору.',
  'Tôi thích xem phim trên tivi.',
  '[{"ru": "Я люблю́ смотре́ть фильм по телеви́зору.", "vi": "Tôi thích xem phim trên tivi."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посети́ть',
  'thăm quan',
  'Я люблю́ посеща́ть по Москве́.',
  'Tôi thích đi thăm quan quanh Moskva.',
  '[{"ru": "Я люблю́ посеща́ть по Москве́.", "vi": "Tôi thích đi thăm quan quanh Moskva."}]'::jsonb,
  '{"pattern": "посеща́ть + что?(C4) (thăm quan cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["посеща́ть + что?(C4) (thăm quan cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'потанцева́ть',
  'nhảy múa',
  'Я обы́чно танцу́ю на дискоте́ке.',
  'Tôi thường nhảy ở vũ trường.',
  '[{"ru": "Я обы́чно танцу́ю на дискоте́ке.", "vi": "Tôi thường nhảy ở vũ trường."}]'::jsonb,
  '{"pattern": "танцева́ть + где?(C6) (nhảy ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'посмотре́ть цирк',
  'xem xiếc',
  'Я посмотре́л цирк в ци́рке.',
  'Tôi đã xem xiếc ở rạp xiếc.',
  '[{"ru": "Я посмотре́л цирк в ци́рке.", "vi": "Tôi đã xem xiếc ở rạp xiếc."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "Цирк (rạp xiếc)"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посмотре́ть живо́тных',
  'xem động vật',
  'Я ходи́л смотре́ть живо́тных в зоопа́рке.',
  'Tôi đã đi xem các con động vật ở sở thú.',
  '[{"ru": "Я ходи́л смотре́ть живо́тных в зоопа́рке.", "vi": "Tôi đã đi xem các con động vật ở sở thú."}]'::jsonb,
  '{"pattern": "смотре́ть + кого?(C4) (xem ai/con gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  'посмотре́ть матч',
  'xem trận đấu',
  'Я смотре́л э́тот футбо́льный матч на стадио́не.',
  'Tôi đã xem trận bóng đấu này ở sân vận động.',
  '[{"ru": "Я смотре́л э́тот футбо́льный матч на стадио́не.", "vi": "Tôi đã xem trận bóng đấu này ở sân vận động."}]'::jsonb,
  '{"pattern": "смотре́ть + что?(C4) (xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть + что?(C4) (xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'сыгра́ть',
  'chơi',
  'Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.',
  'Tôi không thích chơi piano. Tôi thích chơi bóng đá hơn.',
  '[{"ru": "Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.", "vi": "Tôi không thích chơi piano. Tôi thích chơi bóng đá hơn."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4) / на чём?(C6) (chơi trò gì?/ nhạc cụ gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'поменя́ть де́ньги',
  'đổi tiền',
  'Я поменя́л де́ньги в ба́нке позавчера́.',
  'Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia.',
  '[{"ru": "Я поменя́л де́ньги в ба́нке позавчера́.", "vi": "Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia."}]'::jsonb,
  '{"pattern": "меня́ть + что?(C4) + в/на что?(C4) (đổi cái gì? lấy cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["меня́ть + что?(C4) + в/на что?(C4) (đổi cái gì? lấy cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'отпра́вить письмо́',
  'gửi thư',
  'Я отпра́вил письмо́ роди́телям.',
  'Tôi đã gửi thư cho bố mẹ.',
  '[{"ru": "Я отпра́вил письмо́ роди́телям.", "vi": "Tôi đã gửi thư cho bố mẹ."}]'::jsonb,
  '{"pattern": "отправля́ть + что?(C4) + кому?(C3) (gửi cái gì? cho ai?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3"}'::jsonb,
  '["отправля́ть + что?(C4) + кому?(C3) (gửi cái gì? cho ai?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'погуля́ть',
  'đi dạo',
  'Я о́чень люблю́ гуля́ть по у́лице.',
  'Tôi rất thích đi dạo trên phố.',
  '[{"ru": "Я о́чень люблю́ гуля́ть по у́лице.", "vi": "Tôi rất thích đi dạo trên phố."}]'::jsonb,
  '{"pattern": "гуля́ть + где?(C6) (đi dạo ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'съесть',
  'ăn',
  'Я о́чень люблю́ есть йо́гурт и шокола́д.',
  'Tôi rất thích ăn sữa chua và socola.',
  '[{"ru": "Я о́чень люблю́ есть йо́гурт и шокола́д.", "vi": "Tôi rất thích ăn sữa chua và socola."}]'::jsonb,
  '{"pattern": "есть + что?(C4) (ăn cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["есть + что?(C4) (ăn cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'вы́пить',
  'uống',
  'Я пил вино́ на вечери́нке.',
  'Tôi đã uống rượu trên buổi tiệc.',
  '[{"ru": "Я пил вино́ на вечери́нке.", "vi": "Tôi đã uống rượu trên buổi tiệc."}]'::jsonb,
  '{"pattern": "пить + что?(C4) (uống cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["пить + что?(C4) (uống cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'làm việc',
  'Я рабо́таю продавцо́м в магази́не оде́жды.',
  'Tôi đang làm nhân viên bán hàng ở cửa hàng quần áo.',
  '[{"ru": "Я рабо́таю продавцо́м в магази́не оде́жды.", "vi": "Tôi đang làm nhân viên bán hàng ở cửa hàng quần áo."}]'::jsonb,
  '{"pattern": "рабо́тать + кем?(C5) + где?(C6) (làm nghề gì? ở đâu?)", "verb_obj": "Động từ đi với cách 5, Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'взять (маши́ну)',
  'lấy (xe)',
  'Я взя́л маши́ну из гаража́.',
  'Tôi đã lấy xe ô tô từ trong ga-ra.',
  '[{"ru": "Я взя́л маши́ну из гаража́.", "vi": "Tôi đã lấy xe ô tô từ trong ga-ra."}]'::jsonb,
  '{"pattern": "брать + что?(C4) + из чего? (lấy cái gì? từ đâu?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 2"}'::jsonb,
  '["брать + что?(C4) + из чего? (lấy cái gì? từ đâu?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'оста́вить (маши́ну)',
  'để (xe)',
  'Я оста́вил велосипе́д в гараже́.',
  'Tôi đã để xe đạp ở trong ga-ra.',
  '[{"ru": "Я оста́вил велосипе́д в гараже́.", "vi": "Tôi đã để xe đạp ở trong ga-ra."}]'::jsonb,
  '{"pattern": "оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cái gì? ở đâu?/vào đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cái gì? ở đâu?/vào đâu?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'подожда́ть',
  'đợi',
  'Я жду трамва́й на остано́вке.',
  'Tôi đang đợi xe điện ở trạm dừng.',
  '[{"ru": "Я жду трамва́й на остано́вке.", "vi": "Tôi đang đợi xe điện ở trạm dừng."}]'::jsonb,
  '{"pattern": "ждать + кого?/что?(C4) (đợi ai?/cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["ждать + кого?/что?(C4) (đợi ai?/cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'пойма́ть (ры́бу)',
  'bắt (cá)',
  'Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.',
  'Tôi rất thích câu cá. Tôi câu cá mỗi ngày ở hồ.',
  '[{"ru": "Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.", "vi": "Tôi rất thích câu cá. Tôi câu cá mỗi ngày ở hồ."}]'::jsonb,
  '{"pattern": "лови́ть + кого?(C4) (bắt ai/con gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'bơi',
  'Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.',
  'Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ.',
  '[{"ru": "Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.", "vi": "Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ."}]'::jsonb,
  '{"pattern": "(1) плыть + куда?(C4) (bơi đến đâu?) (1) пла́вать + по чему?(C3) (bơi quanh đâu?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3", "note": "(1) Плыть (1 hướng cụ thể) (2) Пла́вать (chung chung, lặp lại hướng)"}'::jsonb,
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
  'Verb',
  NULL,
  'посмотре́ть зака́т',
  'ngắm hoàng hôn',
  'Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.',
  'Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền.',
  '[{"ru": "Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.", "vi": "Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền."}]'::jsonb,
  '{"pattern": "смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'посади́ть цветы́',
  'trồng hoa',
  'Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.',
  'Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn.',
  '[{"ru": "Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.", "vi": "Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn."}]'::jsonb,
  '{"pattern": "сажа́ть + что?(C4) (trồng cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["сажа́ть + что?(C4) (trồng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'подня́ться в го́ры',
  'leo núi',
  'Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.',
  'Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần.',
  '[{"ru": "Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.", "vi": "Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần."}]'::jsonb,
  '{"pattern": "поднима́ться + куда?(C4) (leo lên đâu?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Verb',
  NULL,
  'собра́ть грибы́',
  'hái nấm',
  'Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.',
  'Tôi rất thích hái nấm. Tôi thường hái nấm ở trong rừng.',
  '[{"ru": "Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "vi": "Tôi rất thích hái nấm. Tôi thường hái nấm ở trong rừng."}]'::jsonb,
  '{"pattern": "собира́ть / собра́ть + что?(C4) (hái, thu thập cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["собира́ть / собра́ть + что?(C4) (hái, thu thập cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'получи́ть письмо́',
  'nhận thư',
  'Я получи́л письмо́ от мое́й сестры́.',
  'Tôi đã nhận được thư từ chị gái tôi.',
  '[{"ru": "Я получи́л письмо́ от мое́й сестры́.", "vi": "Tôi đã nhận được thư từ chị gái tôi."}]'::jsonb,
  '{"pattern": "получа́ть + что?(C4) + от кого?(С2) (nhận cái gì? từ ai?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 2"}'::jsonb,
  '["получа́ть + что?(C4) + от кого?(С2) (nhận cái gì? từ ai?)"]'::jsonb,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Học viện',
  'Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.',
  'Tôi đang đi đến học viện để học. Tôi học Toán ở học viện.',
  '[{"ru": "Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.", "vi": "Tôi đang đi đến học viện để học. Tôi học Toán ở học viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Thư viện',
  'Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.',
  'Tôi đang đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện.',
  '[{"ru": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.", "vi": "Tôi đang đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bộ môn',
  'Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.',
  'Các giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn.',
  '[{"ru": "Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.", "vi": "Các giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Văn phòng khoa',
  'Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.',
  'Các sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.',
  '[{"ru": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.", "vi": "Các sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
  NULL,
  'Ký túc xá',
  'Я живу́ в общежи́тии № 5.',
  'Tôi đang sống ở ký túc xá số 5.',
  '[{"ru": "Я живу́ в общежи́тии № 5.", "vi": "Tôi đang sống ở ký túc xá số 5."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
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
  'Noun',
  'f',
  NULL,
  'Bài giảng',
  'Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.',
  'Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường.',
  '[{"ru": "Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.", "vi": "Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Buổi thảo luận',
  'Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.',
  'Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar.',
  '[{"ru": "Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.", "vi": "Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Phòng khám đa khoa',
  'Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.',
  'Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.',
  '[{"ru": "Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.", "vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bệnh viện',
  'Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.',
  'Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.',
  '[{"ru": "Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.", "vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Bảo tàng',
  'Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.',
  'Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm.',
  '[{"ru": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Triển lãm',
  'Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.',
  'Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm.',
  '[{"ru": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.", "vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Nhà hát',
  'Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.',
  'Tôi đang đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát.',
  '[{"ru": "Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.", "vi": "Tôi đang đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Buổi hòa nhạc',
  'Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.',
  'Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc.',
  '[{"ru": "Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.", "vi": "Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Sân vận động',
  'Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.',
  'Tôi đang đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động.',
  '[{"ru": "Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.", "vi": "Tôi đang đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Quầy báo, quầy hàng nhỏ trên phố',
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
  'Noun',
  'm',
  NULL,
  'Nhà hàng',
  'Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.',
  'Tôi đang đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng.',
  '[{"ru": "Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.", "vi": "Tôi đang đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Căng tin',
  'По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.',
  'Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn.',
  '[{"ru": "По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.", "vi": "Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
  NULL,
  'Quán cà phê',
  'Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.',
  'Sáng hôm nay tôi đã đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng.',
  '[{"ru": "Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.", "vi": "Sáng hôm nay tôi đã đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Nhà máy',
  'Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.',
  'Tôi đang đi đến nhà máy để làm việc. Tôi thường làm việc ở nhà máy mỗi ngày.',
  '[{"ru": "Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.", "vi": "Tôi đang đi đến nhà máy để làm việc. Tôi thường làm việc ở nhà máy mỗi ngày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Khách sạn',
  'Я живу́ в гости́нице.',
  'Tôi đang ở khách sạn.',
  '[{"ru": "Я живу́ в гости́нице.", "vi": "Tôi đang ở khách sạn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Sông',
  'Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.',
  'Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông.',
  '[{"ru": "Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.", "vi": "Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
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
  'Noun',
  'n',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
  NULL,
  'Rừng',
  'Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.',
  'Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng.',
  '[{"ru": "Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.", "vi": "Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Oдногру́ппник',
  'oдногруппник',
  'Noun',
  'm',
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
  'Verb',
  NULL,
  'пригото́вить',
  'nấu ăn',
  'Я гото́влю у́жин.',
  'Tôi đang nấu bữa tối.',
  '[{"ru": "Я гото́влю у́жин.", "vi": "Tôi đang nấu bữa tối."}]'::jsonb,
  '{"pattern": "гото́вить + что?(C4) + в/на чём?(С6)  (nấu cái gì? trong cái gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
  '["гото́вить + что?(C4) + в/на чём?(С6)  (nấu cái gì? trong cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'свари́ть',
  'luộc',
  'Я сейча́с варю́ мя́со в кастрю́ле на плите́.',
  'Tôi đang luộc thịt trong nồi ở trên bếp.',
  '[{"ru": "Я сейча́с варю́ мя́со в кастрю́ле на плите́.", "vi": "Tôi đang luộc thịt trong nồi ở trên bếp."}]'::jsonb,
  '{"pattern": "вари́ть + что? (C4) + в/на чём? (C6) (luộc cái gì? trong cái gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
  '["вари́ть + что? (C4) + в/на чём? (C6) (luộc cái gì? trong cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'изжа́рить',
  'rán, chiên, nướng',
  'Я сейча́с жа́рю ры́бу на сковороде́ на плите́.',
  'Tôi đang rán cá trên chảo ở trên bếp.',
  '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.", "vi": "Tôi đang rán cá trên chảo ở trên bếp."}]'::jsonb,
  '{"pattern": "жа́рить + что?(C4) + в/на чём?(С6) (chiên, rán, nướng cái gì? trong cái gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
  '["жа́рить + что?(C4) + в/на чём?(С6) (chiên, rán, nướng cái gì? trong cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'перекуси́ть',
  'ăn nhẹ',
  'После за́втрака я обы́чно переку́сываю шоколáдом с йо́гуртом.',
  'Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua',
  '[{"ru": "После за́втрака я обы́чно переку́сываю шоколáдом с йо́гуртом.", "vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua"}]'::jsonb,
  '{"pattern": "переку́сывать + чем?(C5) (ăn nhẹ bằng cái gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
  '["переку́сывать + чем?(C5) (ăn nhẹ bằng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'помы́ть',
  'rửa',
  'Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.',
  'Tôi thường rửa hoa quả và rau ở trong bồn rửa.',
  '[{"ru": "Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.", "vi": "Tôi thường rửa hoa quả và rau ở trong bồn rửa."}]'::jsonb,
  '{"pattern": "мыть + что?(C4) (rửa cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["мыть + что?(C4) (rửa cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'почи́стить',
  'gọt vỏ, bóc vỏ, làm sạch',
  'Я уже́ почи́стил э́ти я́блоки.',
  'Tôi đã gọt xong những quả táo này,',
  '[{"ru": "Я уже́ почи́стил э́ти я́блоки.", "vi": "Tôi đã gọt xong những quả táo này,"}]'::jsonb,
  '{"pattern": "чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'cắt, thái (chung chung)',
  'Я нареза́ю морко́вь и помидо́ры.',
  'Tôi đang thái cà rốt và cà chua.',
  '[{"ru": "Я нареза́ю морко́вь и помидо́ры.", "vi": "Tôi đang thái cà rốt và cà chua."}]'::jsonb,
  '{"pattern": "ре́зать + что?(C4) (cắt cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["ре́зать + что?(C4) (cắt cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'наре́зать',
  'thái (thành nhiều miếng)',
  'Я чи́щу я́блоко и нареза́ю его́ на куски́.',
  'Tôi gọt vọt quả táo và cắt thái chúng thành nhiều miếng.',
  '[{"ru": "Я чи́щу я́блоко и нареза́ю его́ на куски́.", "vi": "Tôi gọt vọt quả táo và cắt thái chúng thành nhiều miếng."}]'::jsonb,
  '{"pattern": "нареза́ть + что?(C4) (cắt thái thành miếng cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["нареза́ть + что?(C4) (cắt thái thành miếng cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'разре́зать',
  'bổ (làm đôi, làm 4)',
  'Я разреза́ю арбу́з.',
  'Tôi bổ đôi quả dưa hấu.',
  '[{"ru": "Я разреза́ю арбу́з.", "vi": "Tôi bổ đôi quả dưa hấu."}]'::jsonb,
  '{"pattern": "разреза́ть + что?(C4) (bổ đôi cái gì?)", "verb_obj": "Động từ đi với cách 4", "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thái, bổ)"}'::jsonb,
  '["разреза́ть + что?(C4) (bổ đôi cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'измельчи́ть',
  'băm nhỏ, nghiền nhỏ',
  'Я уже́ измельчи́л чесно́к.',
  'Tôi đã băm nhuyễn tỏi rồi.',
  '[{"ru": "Я уже́ измельчи́л чесно́к.", "vi": "Tôi đã băm nhuyễn tỏi rồi."}]'::jsonb,
  '{"pattern": "измельча́ть + что?(С4) (băm nhỏ cái gì?)"}'::jsonb,
  '["измельча́ть + что?(С4) (băm nhỏ cái gì?)"]'::jsonb,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Súp',
  'Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.',
  'Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì.',
  '[{"ru": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.", "vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Cơm',
  'Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.',
  'Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cá.',
  '[{"ru": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.", "vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cá."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
  NULL,
  'Thịt',
  'Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.',
  'Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cá, .',
  '[{"ru": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.", "vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cá, ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Pelmeni',
  'Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.',
  'Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bánh mì.',
  '[{"ru": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.", "vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bánh mì."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Cháo',
  'Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.',
  'Tôi đang nấu cháo trong nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm.',
  '[{"ru": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.", "vi": "Tôi đang nấu cháo trong nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Cá',
  'Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.',
  'Tôi đang rán cá trên chảo ở trên bếp. Tôi nấu cá để ăn với cơm và với thịt.',
  '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.", "vi": "Tôi đang rán cá trên chảo ở trên bếp. Tôi nấu cá để ăn với cơm và với thịt."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'n',
  NULL,
  'Trứng',
  'Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.',
  'Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bánh mì.',
  '[{"ru": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.", "vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bánh mì."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Salad',
  'Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м.',
  'Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng.',
  '[{"ru": "Я сейча́с перемéшиваю сала́т в ми́ске ложкой. Я перемéшиваю сала́т, что́бы есть его́ с яйцо́м.", "vi": "Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'So cô la',
  'После за́втрака я обы́чно переку́сываю шоколáдом с йогу́ртом.',
  'Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua',
  '[{"ru": "После за́втрака я обы́чно переку́сываю шоколáдом с йогу́ртом.", "vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
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
  'Noun',
  'm',
  NULL,
  'Bánh kem',
  'На ка́ждый мой день рожде́ния мама покупа́ет мне торт.',
  'Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi',
  '[{"ru": "На ка́ждый мой день рожде́ния мама покупа́ет мне торт.", "vi": "Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi"}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'n',
  NULL,
  'Táo',
  'Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.',
  'Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '[{"ru": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Lê',
  'Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.',
  'Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '[{"ru": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
  NULL,
  'Xoài',
  'Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.',
  'Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.',
  '[{"ru": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.", "vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Dưa hấu',
  'Я разреза́ю арбу́з, что́бы угости́ть госте́й.',
  'Tôi bổ quả dưa hấu để mời khách ăn.',
  '[{"ru": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.", "vi": "Tôi bổ quả dưa hấu để mời khách ăn."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Khoai tây',
  'Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.',
  'Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ.',
  '[{"ru": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.", "vi": "Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ."}]'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Cà chua',
  'Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.',
  'Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng.',
  '[{"ru": "Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.", "vi": "Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Dưa leo',
  'Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.',
  'Tôi đang rửa sạch dưa chuột, sau đó tôi thái nhỏ chúng bằng dao.',
  '[{"ru": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.", "vi": "Tôi đang rửa sạch dưa chuột, sau đó tôi thái nhỏ chúng bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Hành lá',
  'Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.',
  'Tôi đang rửa sạch hành lá, sau đó thái nhỏ nó bằng dao.',
  '[{"ru": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.", "vi": "Tôi đang rửa sạch hành lá, sau đó thái nhỏ nó bằng dao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Bắp cải',
  'Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.',
  'Tôi đang rửa sạch bắp cải, sau đó bổ và thái nhỏ chúng.',
  '[{"ru": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.", "vi": "Tôi đang rửa sạch bắp cải, sau đó bổ và thái nhỏ chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Bí ngô',
  'Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.',
  'Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thái nhỏ chúng.',
  '[{"ru": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.", "vi": "Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thái nhỏ chúng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'n',
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
  'Noun',
  'f',
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
  'Noun',
  'n',
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
  'Noun',
  'm',
  NULL,
  'Nước ép',
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
  'Noun',
  'f',
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
  'Noun',
  'n',
  NULL,
  'Rượu / Vang',
  'Я налива́ю вино́ в ча́шку и пью.',
  'Tôi rót rượu vang vào chén và uống.',
  '[{"ru": "Я налива́ю вино́ в ча́шку и пью.", "vi": "Tôi rót rượu vang vào chén và uống."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Chảo',
  'Я сейча́с жа́рю ры́бу на сковороде́ на плите́.',
  'Tôi đang rán cá trên chảo ở trên bếp.',
  '[{"ru": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.", "vi": "Tôi đang rán cá trên chảo ở trên bếp."}]'::jsonb,
  '{"note": "жа́рить / изжа́рить (rán)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Verb',
  NULL,
  'поза́втракать',
  'ăn sáng',
  'Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.',
  'Mỗi sáng tôi đều ăn sáng bằng cháo với sữa.',
  '[{"ru": "Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.", "vi": "Mỗi sáng tôi đều ăn sáng bằng cháo với sữa."}]'::jsonb,
  '{"pattern": "за́втракать + чем?(C5) (ăn sáng bằng gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
  '["за́втракать + чем?(C5) (ăn sáng bằng gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'пообе́дать',
  'ăn trưa',
  'Я обы́чно обе́даю су́пом с хле́бом.',
  'Tôi thường ăn trưa bằng súp với bánh mì.',
  '[{"ru": "Я обы́чно обе́даю су́пом с хле́бом.", "vi": "Tôi thường ăn trưa bằng súp với bánh mì."}]'::jsonb,
  '{"pattern": "обе́дать + чем?(C5) (ăn trưa bằng gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
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
  'Verb',
  NULL,
  'поу́жинать',
  'ăn tối',
  'Вчера́ я поу́жинала рисом с ры́бой.',
  'Hôm qua tôi đã ăn tối bằng cơm với cá.',
  '[{"ru": "Вчера́ я поу́жинала рисом с ры́бой.", "vi": "Hôm qua tôi đã ăn tối bằng cơm với cá."}]'::jsonb,
  '{"pattern": "у́жинать + чем?(C5) (ăn tối bằng gì?)", "verb_obj": "Động từ đi với cách 5"}'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Bữa sáng',
  'Я ем ка́шу на за́втрак.',
  'Tôi ăn cháo vào bữa sáng.',
  '[{"ru": "Я ем ка́шу на за́втрак.", "vi": "Tôi ăn cháo vào bữa sáng."}]'::jsonb,
  '{"note": "на за́втрак (vào bữa sáng)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Bữa tối',
  'Я ем ры́бу с рисом на у́жин.',
  'Tôi ăn cá với cơm vào bữa tối.',
  '[{"ru": "Я ем ры́бу с рисом на у́жин.", "vi": "Tôi ăn cá với cơm vào bữa tối."}]'::jsonb,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Trò chơi điện tử',
  'Я сейча́с игра́ю в компью́терные и́гры на компью́тере.',
  'Tôi đang chơi điện tử trên máy tính.',
  '[{"ru": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.", "vi": "Tôi đang chơi điện tử trên máy tính."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Cờ vua',
  'Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.',
  'Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua.',
  '[{"ru": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.", "vi": "Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua."}]'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Bóng đá',
  'Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.',
  'Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ.',
  '[{"ru": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.", "vi": "Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ."}]'::jsonb,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Bóng bàn',
  'Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.',
  'Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng.',
  '[{"ru": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.", "vi": "Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Tennis',
  'Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.',
  'Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng.',
  '[{"ru": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.", "vi": "Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng."}]'::jsonb,
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
  'Noun',
  'm',
  NULL,
  'Bóng rổ',
  'Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.',
  'Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ.',
  '[{"ru": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.", "vi": "Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ."}]'::jsonb,
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
  'Noun',
  'm',
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
  'Noun',
  'n',
  NULL,
  'Piano',
  'Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.',
  'Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc.',
  '[{"ru": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.", "vi": "Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Ghi-ta',
  'Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.',
  'Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường.',
  '[{"ru": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.", "vi": "Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'tập luyện',
  'Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.',
  'Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc.',
  '[{"ru": "Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.", "vi": "Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc."}]'::jsonb,
  '{"pattern": "занима́ться + чем?(C5) (tập luyện cái gì?)", "verb_obj": "Động từ đi với cách 5", "note": "занима́ться игро́й на пиани́но. занима́ться пиани́но."}'::jsonb,
  '["занима́ться + чем?(C5) (tập luyện cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  'сыгра́ть',
  'chơi',
  'Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.',
  'Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.',
  '[{"ru": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.", "vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4)/на чём?(С6) (chơi cái gì?/nhạc cụ gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
  '["игра́ть + в что?(C4)/на чём?(С6) (chơi cái gì?/nhạc cụ gì?)"]'::jsonb,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Máy tính',
  'Я игра́ю в компью́терные и́гры на компью́тере.',
  'Tôi chơi điện tử trên máy tính.',
  '[{"ru": "Я игра́ю в компью́терные и́гры на компью́тере.", "vi": "Tôi chơi điện tử trên máy tính."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'n',
  NULL,
  'Sân cỏ',
  'Мы игра́ем в футбо́л на футбо́льном по́ле.',
  'Chúng tôi chơi bóng đá trên sân cỏ.',
  '[{"ru": "Мы игра́ем в футбо́л на футбо́льном по́ле.", "vi": "Chúng tôi chơi bóng đá trên sân cỏ."}]'::jsonb,
  '{"note": "Футбо́л (bóng đá)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Sân vận động',
  'Мы игра́ем в футбо́л на стадио́не.',
  'Chúng tôi chơi bóng đá trên sân vận động.',
  '[{"ru": "Мы игра́ем в футбо́л на стадио́не.", "vi": "Chúng tôi chơi bóng đá trên sân vận động."}]'::jsonb,
  '{"note": "Футбо́л (bóng đá)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Verb',
  NULL,
  'съесть',
  'ăn',
  'Медве́дь ест ры́бу.',
  'Con gấu ăn cá.',
  '[{"ru": "Медве́дь ест ры́бу.", "vi": "Con gấu ăn cá."}]'::jsonb,
  '{"pattern": "есть + что?(C4) (ăn cái gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
  '["есть + что?(C4) (ăn cái gì?)"]'::jsonb,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'nằm',
  'Ко́шка лежи́т на дива́не.',
  'Con mèo nằm trên ghế sô pha.',
  '[{"ru": "Ко́шка лежи́т на дива́не.", "vi": "Con mèo nằm trên ghế sô pha."}]'::jsonb,
  '{"pattern": "лежа́ть + где?(C6) (nằm ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'постоя́ть',
  'đứng',
  'Соба́ка стои́т у дере́ва.',
  'Con chó đứng bên cạnh cái cây.',
  '[{"ru": "Соба́ка стои́т у дере́ва.", "vi": "Con chó đứng bên cạnh cái cây."}]'::jsonb,
  '{"pattern": "стоя́ть + где?(C6) (đứng ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'лечь спать',
  'đi ngủ',
  'Ве́чером медве́дь ложи́тся спать.',
  'Buổi tối, con gấu đi ngủ.',
  '[{"ru": "Ве́чером медве́дь ложи́тся спать.", "vi": "Buổi tối, con gấu đi ngủ."}]'::jsonb,
  '{"pattern": "ложи́ться спать + где?(С6) (ngủ ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'сыгра́ть',
  'chơI',
  'Кот игра́ет с клубко́м.',
  'Con mèo chơi với cuộn len.',
  '[{"ru": "Кот игра́ет с клубко́м.", "vi": "Con mèo chơi với cuộn len."}]'::jsonb,
  '{"pattern": "игра́ть + в что?(C4)/на чём?(C6) (chơi trò gì?/chơi nhạc cụ gì?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'chạy',
  '(1) Тигр бежи́т за добы́чей. (2) Тигр бе́гает по лесу́.',
  '(1) Con hổ đang chạy đuổi theo con mồi. (2) Con hổ chạy quanh rừng.',
  '[{"ru": "(1) Тигр бежи́т за добы́чей. (2) Тигр бе́гает по лесу́.", "vi": "(1) Con hổ đang chạy đuổi theo con mồi. (2) Con hổ chạy quanh rừng."}]'::jsonb,
  '{"pattern": "(1) бежа́ть + куда? (C4) (chạy đến đâu?) (2) бе́гать + по чему?(C3) (chạy quanh đâu?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3", "note": "(1) бежа́ть (1 hướng cụ thể) (2) бе́гать (lặp lại hướng)"}'::jsonb,
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
  'Verb',
  NULL,
  'погуля́ть',
  'đi dạo',
  'Медве́дь гуля́ет по лесу́.',
  'Con gấu đi dạo trong rừng.',
  '[{"ru": "Медве́дь гуля́ет по лесу́.", "vi": "Con gấu đi dạo trong rừng."}]'::jsonb,
  '{"pattern": "гуля́ть + где?(C6) (đi dạo ở đâu?)", "verb_obj": "Động từ đi với cách 6"}'::jsonb,
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
  'Verb',
  NULL,
  'поохо́титься',
  'săn mồi',
  'Тигр охо́тится в лесу́.',
  'Con hổ săn mồi trong rừng.',
  '[{"ru": "Тигр охо́тится в лесу́.", "vi": "Con hổ săn mồi trong rừng."}]'::jsonb,
  '{"pattern": "охо́титься + на кого?(C4) (săn bắt con gì?)", "verb_obj": "Động từ đi với cách 4"}'::jsonb,
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
  'Noun',
  'f',
  NULL,
  'Cỏ',
  'Коро́ва ест траву́ на по́ле',
  'Con bò ăn cỏ trên cánh đồng.',
  '[{"ru": "Коро́ва ест траву́ на по́ле", "vi": "Con bò ăn cỏ trên cánh đồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm/f',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
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
  'Noun',
  'f',
  NULL,
  'Bò',
  'Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.',
  'Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.',
  '[{"ru": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm/f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Cá',
  'Ры́ба пла́вает в реке́.',
  'Con cá đang bơi ở sông.',
  '[{"ru": "Ры́ба пла́вает в реке́.", "vi": "Con cá đang bơi ở sông."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
  NULL,
  'Trang trại',
  'Cви́ньи на фе́рме. Они́ едя́т в хлеву́.',
  'Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.',
  '[{"ru": "Cви́ньи на фе́рме. Они́ едя́т в хлеву́.", "vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}]'::jsonb,
  '{"note": "Nghĩa khác: công ty"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Chuồng gia súc',
  'Cви́ньи на фе́рме. Они́ едя́т в хлеву́.',
  'Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.',
  '[{"ru": "Cви́ньи на фе́рме. Они́ едя́т в хлеву́.", "vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'n',
  NULL,
  'Cánh đồng',
  'Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.',
  'Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.',
  '[{"ru": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.", "vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'n',
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
  'Noun',
  'f',
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
  'Noun',
  'n',
  NULL,
  'Hồ',
  'Ры́бы пла́вают в о́зере.',
  'Những con cá bơi trong hồ.',
  '[{"ru": "Ры́бы пла́вают в о́зере.", "vi": "Những con cá bơi trong hồ."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'f',
  NULL,
  'Sông',
  'Ры́бы пла́вают в реке́.',
  'Con cá bơi trong sông.',
  '[{"ru": "Ры́бы пла́вают в реке́.", "vi": "Con cá bơi trong sông."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
  NULL,
  'Biển',
  'Ры́бы пла́вают в мо́ре.',
  'Những con cá đang bơi dưới biển.',
  '[{"ru": "Ры́бы пла́вают в мо́ре.", "vi": "Những con cá đang bơi dưới biển."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Verb',
  NULL,
  NULL,
  'bơi',
  '(1) Я плыву́ к берегу́. (2) Я уме́ю пла́вать.',
  '(1) Tôi đang bơi về phía bờ. (2) Tôi biết bơi.',
  '[{"ru": "(1) Я плыву́ к берегу́. (2) Я уме́ю пла́вать.", "vi": "(1) Tôi đang bơi về phía bờ. (2) Tôi biết bơi."}]'::jsonb,
  '{"pattern": "(1) плыть + куда?(C4) (bơi đến đâu?) (1) пла́вать + по чему?(C3) (bơi quanh đâu?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3", "note": "(1) Плыть (1 hướng cụ thể) (2) Пла́вать (chung chung, lặp lại hướng)"}'::jsonb,
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
  'Verb',
  NULL,
  NULL,
  'bay',
  '(1) Пти́ца лети́т к ве́тку. (2) Пти́ца лета́ет по не́бу.',
  '(1) Con chim đang bay đến cành cây. (2) Con chim bay lượn trên bầu trời.',
  '[{"ru": "(1) Пти́ца лети́т к ве́тку. (2) Пти́ца лета́ет по не́бу.", "vi": "(1) Con chim đang bay đến cành cây. (2) Con chim bay lượn trên bầu trời."}]'::jsonb,
  '{"pattern": "(1) лете́ть + куда? (C4) (bay đến đâu?) (2) лета́ть + по чему?(С3) (bay vòng quanh đâu?)", "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3", "note": "(1) лете́ть (1 chiều; 1 lần) (2) лета́ть (2 chiều ; thường xuyên)"}'::jsonb,
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
  'Noun',
  'm',
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
  'Adj',
  NULL,
  NULL,
  'to',
  'У меня́ больша́я голова́.',
  'Tôi có cái đầu to.',
  '[{"ru": "У меня́ больша́я голова́.", "vi": "Tôi có cái đầu to."}]'::jsonb,
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
  'Adj',
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
  'Adj',
  NULL,
  NULL,
  'dài',
  'У неё дли́нные густы́е во́лосы.',
  'Cô ấy có mái tóc dài dày.',
  '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mái tóc dài dày."}]'::jsonb,
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
  'Adj',
  NULL,
  NULL,
  'ngắn',
  'У неё коро́ткие во́лосы.',
  'Cô ấy có mái tóc ngắn.',
  '[{"ru": "У неё коро́ткие во́лосы.", "vi": "Cô ấy có mái tóc ngắn."}]'::jsonb,
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
  'Adj',
  NULL,
  NULL,
  'dày (số lượng nhiều)',
  'У неё дли́нные густы́е во́лосы.',
  'Cô ấy có mái tóc dài dày.',
  '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mái tóc dài dày."}]'::jsonb,
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
  'Adj',
  NULL,
  NULL,
  'thưa',
  'У него́ ре́дкие во́лосы.',
  'Anh ấy có mái tóc thưa.',
  '[{"ru": "У него́ ре́дкие во́лосы.", "vi": "Anh ấy có mái tóc thưa."}]'::jsonb,
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
  'Adj',
  NULL,
  NULL,
  'cao',
  'У него́ высо́кий лоб.',
  'Anh ấy có vầng trán cao.',
  '[{"ru": "У него́ высо́кий лоб.", "vi": "Anh ấy có vầng trán cao."}]'::jsonb,
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
  'Adj',
  NULL,
  NULL,
  'thấp',
  'У него́ ни́зкий лоб.',
  'Anh ấy có vầng trán thấp.',
  '[{"ru": "У него́ ни́зкий лоб.", "vi": "Anh ấy có vầng trán thấp."}]'::jsonb,
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
  'Adj',
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
  'Adj',
  NULL,
  NULL,
  'hồng hào',
  'У неё румя́ные щёки.',
  'Cô ấy có đôi má hồng hào.',
  '[{"ru": "У неё румя́ные щёки.", "vi": "Cô ấy có đôi má hồng hào."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Adj',
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
  'Adj',
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
  'Adj',
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
  'Adj',
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
  'Adj',
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
  'Adj',
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
  'Noun',
  'f',
  NULL,
  'Đầu',
  'У меня́ больша́я голова́.',
  'Tôi có cái đầu to.',
  '[{"ru": "У меня́ больша́я голова́.", "vi": "Tôi có cái đầu to."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Tóc',
  'У неё дли́нные густы́е во́лосы.',
  'Cô ấy có mái tóc dài dày.',
  '[{"ru": "У неё дли́нные густы́е во́лосы.", "vi": "Cô ấy có mái tóc dài dày."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'n',
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
  'Noun',
  'm',
  NULL,
  'Trán',
  'У него́ высо́кий лоб.',
  'Anh ấy có vầng trán cao.',
  '[{"ru": "У него́ высо́кий лоб.", "vi": "Anh ấy có vầng trán cao."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Đôi má',
  'У неё румя́ные щёки.',
  'Cô ấy có đôi má hồng hào.',
  '[{"ru": "У неё румя́ные щёки.", "vi": "Cô ấy có đôi má hồng hào."}]'::jsonb,
  '{}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'm',
  NULL,
  'Đôi tay',
  'У неё здоро́вые и си́льные ру́ки.',
  'Cô ấy có đôi tay khỏe và mạnh mẽ.',
  '[{"ru": "У неё здоро́вые и си́льные ру́ки.", "vi": "Cô ấy có đôi tay khỏe và mạnh mẽ."}]'::jsonb,
  '{"note": "ле́вая рука́ >< пра́вая рука́ (tay trái >< tay phải)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
  NULL,
  'Đôi chân',
  'У него́ здоро́вые и си́льные но́ги.',
  'Anh ấy có đôi chân khỏe và mạnh mẽ',
  '[{"ru": "У него́ здоро́вые и си́льные но́ги.", "vi": "Anh ấy có đôi chân khỏe và mạnh mẽ"}]'::jsonb,
  '{"note": "ле́вая нога́ >< пра́вая нога́ (chân trái >< chân phải)"}'::jsonb,
  NULL,
  NULL,
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
  'Noun',
  'm',
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
  'Noun',
  'm',
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
  'Noun',
  'f',
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