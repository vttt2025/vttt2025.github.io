/**
 * data.js — RUSI TRKI Client Bridge
 *
 * Dữ liệu toàn bộ dự án hiện được đồng bộ 100% từ Supabase Cloud Database:
 * (vocab_jars, vocabularies, listening_lessons, speaking_lessons, writing_topics,
 * trki_tests, shop_products, packages, blog_posts, grammar_lessons).
 *
 * Mọi trang web tải dữ liệu trực tiếp qua window.RusiSupabase kết hợp Browser Cache
 * (RusiCache trong RAM + SessionStorage) cho tốc độ chuyển trang tức thì (0ms).
 */

const VOCAB_LESSONS = [];
const MOCK_TEST = { parts: [] };
const BLOG_POSTS = [];
const TRKI_BANK = [];
const VOCAB_JARS = [
  {
    "id": "bo_phan_co_the",
    "name": "Bộ phận cơ thể người",
    "level": "A1",
    "desc": "Các bộ phận trên khuôn mặt, thân thể và các tính từ mô tả đặc điểm hình dáng, ngoại hình.",
    "icon": "user",
    "color": "#e11d48",
    "is_system": true,
    "words": [
      {
        "ex": "У меня́ больша́я голова́.",
        "ru": "большо́й",
        "vi": "to",
        "ant": "ма́ленький (nhỏ)",
        "pos": "прил.",
        "ex_vi": "Tôi có cái đầu to.",
        "stress": "большо́й"
      },
      {
        "ex": "У него́ ма́ленькое краси́вое лицо́.",
        "ru": "ма́ленький",
        "vi": "nhỏ",
        "ant": "большо́й (to)",
        "pos": "прил.",
        "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp.",
        "stress": "ма́ленький"
      },
      {
        "ex": "У неё дли́нные густы́е во́лосы.",
        "ru": "дли́нный",
        "vi": "dài",
        "ant": "коро́ткий (ngắn)",
        "pos": "прил.",
        "ex_vi": "Cô ấy có mái tóc dài dày.",
        "stress": "дли́нный"
      },
      {
        "ex": "У неё коро́ткие во́лосы.",
        "ru": "коро́ткий",
        "vi": "ngắn",
        "ant": "дли́нный (dài)",
        "pos": "прил.",
        "ex_vi": "Cô ấy có mái tóc ngắn.",
        "stress": "коро́ткий"
      },
      {
        "ex": "У неё дли́нные густы́е во́лосы.",
        "ru": "густо́й",
        "vi": "dày (số lượng nhiều)",
        "ant": "ре́дкий (thưa)",
        "pos": "прил.",
        "note": "nhấn mạnh mật độ, số lượng của vật",
        "ex_vi": "Cô ấy có mái tóc dài dày.",
        "stress": "густо́й"
      },
      {
        "ex": "У него́ ре́дкие во́лосы.",
        "ru": "ре́дкий",
        "vi": "thưa",
        "ant": "густо́й (dày)",
        "pos": "прил.",
        "note": "nhấn mạnh mật độ, số lượng của vật",
        "ex_vi": "Anh ấy có mái tóc thưa.",
        "stress": "ре́дкий"
      },
      {
        "ex": "У него́ высо́кий лоб.",
        "ru": "высо́кий",
        "vi": "cao",
        "ant": "ни́зкий (thấp)",
        "pos": "прил.",
        "ex_vi": "Anh ấy có vầng trán cao.",
        "stress": "высо́кий"
      },
      {
        "ex": "У него́ ни́зкий лоб.",
        "ru": "ни́зкий",
        "vi": "thấp",
        "ant": "высо́кий (cao)",
        "pos": "прил.",
        "ex_vi": "Anh ấy có vầng trán thấp.",
        "stress": "ни́зкий"
      },
      {
        "ex": "У него́ высо́кий прямо́й нос.",
        "ru": "прямо́й",
        "vi": "thẳng",
        "pos": "прил.",
        "ex_vi": "Anh ấy có mũi cao thẳng.",
        "stress": "прямо́й"
      },
      {
        "ex": "У неё румя́ные щёки.",
        "ru": "румя́ный",
        "vi": "hồng hào",
        "pos": "прил.",
        "ex_vi": "Cô ấy có đôi má hồng hào.",
        "stress": "румя́ный"
      },
      {
        "ex": "У неё то́нкие краси́вые гу́бы.",
        "ru": "краси́вый",
        "vi": "đẹp",
        "pos": "прил.",
        "ex_vi": "Cô ấy có đôi môi mỏng đẹp.",
        "stress": "краси́вый"
      },
      {
        "ex": "У него́ то́лстая и широ́кая спина́.",
        "ru": "широ́кий",
        "vi": "rộng",
        "ant": "у́зкий (hẹp)",
        "pos": "прил.",
        "ex_vi": "Anh ấy có tấm lưng dày và rộng.",
        "stress": "широ́кий"
      },
      {
        "ex": "У него́ то́лстая и широ́кая спина́.",
        "ru": "то́лстый",
        "vi": "dày (cấu trúc dày)",
        "ant": "то́нкий (mỏng)",
        "pos": "прил.",
        "note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật",
        "ex_vi": "Anh ấy có tấm lưng dày và rộng.",
        "stress": "то́лстый"
      },
      {
        "ex": "У неё то́нкие краси́вые гу́бы.",
        "ru": "то́нкий",
        "vi": "mỏng",
        "ant": "то́лстый (dày)",
        "pos": "прил.",
        "note": "nhấn mạnh độ dày, độ lớn theo chiều ngang của vật",
        "ex_vi": "Cô ấy có đôi môi mỏng đẹp.",
        "stress": "то́нкий"
      },
      {
        "ex": "У неё бе́лые здоро́вые зу́бы.",
        "ru": "здоро́вый",
        "vi": "khỏe mạnh",
        "pos": "прил.",
        "ex_vi": "Cô ấy có hàm răng trắng khỏe.",
        "stress": "здоро́вый"
      },
      {
        "ex": "У него́ здоро́вые и си́льные но́ги.",
        "ru": "си́льный",
        "vi": "mạnh",
        "pos": "прил.",
        "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ",
        "stress": "си́льный"
      },
      {
        "ex": "У меня́ больша́я голова́.",
        "ru": "Голова́",
        "vi": "Đầu",
        "pos": "сущ.",
        "ex_vi": "Tôi có cái đầu to.",
        "gender": "ж.",
        "stress": "Голова́"
      },
      {
        "ex": "У неё дли́нные густы́е во́лосы.",
        "ru": "Во́лосы",
        "vi": "Tóc",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có mái tóc dài dày.",
        "gender": "м.",
        "stress": "Во́лосы"
      },
      {
        "ex": "У него́ ма́ленькое краси́вое лицо́.",
        "ru": "Лицо́",
        "vi": "Mặt",
        "pos": "сущ.",
        "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp.",
        "gender": "ср.",
        "stress": "Лицо́"
      },
      {
        "ex": "У него́ высо́кий лоб.",
        "ru": "Лоб",
        "vi": "Trán",
        "pos": "сущ.",
        "ex_vi": "Anh ấy có vầng trán cao.",
        "gender": "м.",
        "stress": "Лоб"
      },
      {
        "ex": "У неё гу́стые бро́ви.",
        "ru": "Бро́ви",
        "vi": "Hai hàng lông mày",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có hàng lông mày dày.",
        "gender": "м.",
        "stress": "Бро́ви"
      },
      {
        "ex": "У неё больши́е краси́вые глаза́.",
        "ru": "Глаза́",
        "vi": "Đôi mắt",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có đôi mắt to đẹp.",
        "gender": "ж.",
        "stress": "Глаза́"
      },
      {
        "ex": "У него́ высо́кий прямо́й нос.",
        "ru": "Но́с",
        "vi": "Mũi",
        "pos": "сущ.",
        "ex_vi": "Anh ấy có chiếc mũi cao thẳng.",
        "gender": "м.",
        "stress": "Но́с"
      },
      {
        "ex": "У неё румя́ные щёки.",
        "ru": "Щёки",
        "vi": "Đôi má",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có đôi má hồng hào.",
        "gender": "м.",
        "stress": "Щёки"
      },
      {
        "ex": "У неё ма́ленький рот.",
        "ru": "Рот",
        "vi": "Khuôn miệng",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có khuôn miệng nhỏ.",
        "gender": "м.",
        "stress": "Рот"
      },
      {
        "ex": "У неё то́нкие краси́вые гу́бы.",
        "ru": "Гу́бы",
        "vi": "Đôi môi",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có đôi môi mỏng đẹp.",
        "gender": "м.",
        "stress": "Гу́бы"
      },
      {
        "ex": "У неё бе́лые здоро́вые зу́бы.",
        "ru": "Зу́бы",
        "vi": "Hàm răng",
        "pos": "сущ.",
        "ex_vi": "Cô ấy có hàm răng trắng khỏe.",
        "gender": "м.",
        "stress": "Зу́бы"
      },
      {
        "ex": "У него́ ма́ленькие у́ши.",
        "ru": "У́ши",
        "vi": "Đôi tai",
        "pos": "сущ.",
        "ex_vi": "Anh ấy có đôi tai nhỏ.",
        "gender": "м.",
        "stress": "У́ши"
      },
      {
        "ex": "У неё здоро́вые и си́льные ру́ки.",
        "ru": "Руки́",
        "vi": "Đôi tay",
        "pos": "сущ.",
        "note": "ле́вая рука́ >< пра́вая рука́ (tay trа́i >< tay phải)",
        "ex_vi": "Cô ấy có đôi tay khỏe và mạnh mẽ.",
        "gender": "м.",
        "stress": "Руки́"
      },
      {
        "ex": "У него́ здоро́вые и си́льные но́ги.",
        "ru": "Но́ги",
        "vi": "Đôi chân",
        "pos": "сущ.",
        "note": "ле́вая нога́ >< пра́вая нога́ (chân trа́i >< chân phải)",
        "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ",
        "gender": "м.",
        "stress": "Но́ги"
      },
      {
        "ex": "У меня́ боли́т грудь.",
        "ru": "Грудь",
        "vi": "Ngực",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đau ngực.",
        "gender": "м.",
        "stress": "Грудь"
      },
      {
        "ex": "У меня́ о́чень боли́т живо́т.",
        "ru": "Живо́т",
        "vi": "Bụng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rất đau bụng",
        "gender": "м.",
        "stress": "Живо́т"
      },
      {
        "ex": "У него́ то́лстая и широ́кая спина́.",
        "ru": "Спина́",
        "vi": "Lưng",
        "pos": "сущ.",
        "ex_vi": "Anh ấy có tấm lưng dày và rộng.",
        "gender": "ж.",
        "stress": "Спина́"
      }
    ]
  },
  {
    "id": "con_vat",
    "name": "Con vật",
    "level": "A1",
    "desc": "Vật nuôi gia súc, động vật hoang dã, loài chim biết bay và động vật dưới nước.",
    "icon": "paw",
    "color": "#9333ea",
    "is_system": true,
    "words": [
      {
        "ex": "Медве́дь ест ры́бу.",
        "ru": "есть",
        "vi": "ăn",
        "pos": "гл.",
        "ex_vi": "Con gấu ăn cá.",
        "aspect": "съесть",
        "stress": "есть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "есть + что?(C4) (ăn cа́i gì?)"
      },
      {
        "ex": "Ко́шка лежи́т на дива́не.",
        "ru": "лежа́ть",
        "vi": "nằm",
        "pos": "гл.",
        "ex_vi": "Con mèo nằm trên ghế sô pha.",
        "stress": "лежа́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "лежа́ть + где?(C6) (nằm ở đâu?)"
      },
      {
        "ex": "Соба́ка стои́т у дере́ва.",
        "ru": "стоя́ть",
        "vi": "đứng",
        "pos": "гл.",
        "ex_vi": "Con chó đứng bên cạnh cái cây.",
        "aspect": "постоя́ть",
        "stress": "стоя́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "стоя́ть + где?(C6) (đứng ở đâu?)"
      },
      {
        "ex": "Ве́чером медве́дь ложи́тся спать.",
        "ru": "ложи́ться спать",
        "vi": "đi ngủ",
        "pos": "гл.",
        "ex_vi": "Buổi tối, con gấu đi ngủ.",
        "aspect": "лечь спать",
        "stress": "ложи́ться спать",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "ложи́ться спать + где?(С6) (ngủ ở đâu?)"
      },
      {
        "ex": "Кот игра́ет с клубко́м.",
        "ru": "игра́ть",
        "vi": "chơI",
        "pos": "гл.",
        "ex_vi": "Con mèo chơi với cuộn len.",
        "aspect": "сыгра́ть",
        "stress": "игра́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "игра́ть + в что?(C4)/нa чём?(C6) (chơi trò gì?/chơi nhạc cụ gì?)"
      },
      {
        "ex": "(1) Тигр бежи́т за добы́чей.\n(2) Тигр бе́гает по лесу́.",
        "ru": "бежа́ть - бе́гать",
        "vi": "chạy",
        "pos": "гл.",
        "note": "(1) бежа́ть (1 hướng cụ thể)\n(2) бе́гать (lặp lại hướng)",
        "ex_vi": "(1) Con hổ đang chạy đuổi theo con mồi.\n(2) Con hổ chạy quanh rừng.",
        "stress": "бежа́ть - бе́гать",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "(1) бежа́ть + куда? (C4) (chạy đến đâu?)\n(2) бе́гать + по чему?(C3) (chạy quanh đâu?)"
      },
      {
        "ex": "Медве́дь гуля́ет по лесу́.",
        "ru": "гуля́ть",
        "vi": "đi dạo",
        "pos": "гл.",
        "ex_vi": "Con gấu đi dạo trong rừng.",
        "aspect": "погуля́ть",
        "stress": "гуля́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "гуля́ть + где?(C6) (đi dạo ở đâu?)"
      },
      {
        "ex": "Тигр охо́тится в лесу́.",
        "ru": "охо́титься",
        "vi": "săn mồi",
        "pos": "гл.",
        "ex_vi": "Con hổ săn mồi trong rừng.",
        "aspect": "поохо́титься",
        "stress": "охо́титься",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "охо́титься + нa кого?(C4) (săn bắt con gì?)"
      },
      {
        "ex": "Коро́ва ест траву́ на по́ле",
        "ru": "Трава́",
        "vi": "Cỏ",
        "pos": "сущ.",
        "ex_vi": "Con bò ăn cỏ trên cánh đồng.",
        "gender": "ж.",
        "stress": "Трава́"
      },
      {
        "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.",
        "ru": "Кот",
        "vi": "Mèo đực",
        "pos": "сущ.",
        "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà.",
        "gender": "м./ж.",
        "stress": "Кот",
        "feminine": "Ко́шка"
      },
      {
        "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.",
        "ru": "Соба́ка",
        "vi": "Chó",
        "pos": "сущ.",
        "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên.",
        "gender": "ж.",
        "stress": "Соба́ка"
      },
      {
        "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.",
        "ru": "Свинья́",
        "vi": "Lợn",
        "pos": "сущ.",
        "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.",
        "gender": "ж.",
        "stress": "Свинья́"
      },
      {
        "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́.",
        "ru": "Ку́рица",
        "vi": "Gà",
        "pos": "сущ.",
        "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn.",
        "gender": "ж.",
        "stress": "Ку́рица"
      },
      {
        "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.",
        "ru": "Коро́ва",
        "vi": "Bò",
        "pos": "сущ.",
        "ex_vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.",
        "gender": "ж.",
        "stress": "Коро́ва"
      },
      {
        "ex": "Медве́дь ест, а пото́м спит.",
        "ru": "Медве́дь",
        "vi": "Gấu đực",
        "pos": "сущ.",
        "ex_vi": "Gấu đang ăn, sau đó đi ngủ.",
        "gender": "м./ж.",
        "stress": "Медве́дь",
        "feminine": "Медве́дица"
      },
      {
        "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.",
        "ru": "Тигр",
        "vi": "Hổ",
        "pos": "сущ.",
        "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi.",
        "gender": "м.",
        "stress": "Тигр"
      },
      {
        "ex": "Лев гуля́ет по лесу́.",
        "ru": "Лев",
        "vi": "Sư tử",
        "pos": "сущ.",
        "ex_vi": "Sư rử đang đi dạo quanh khu rừng.",
        "gender": "м.",
        "stress": "Лев"
      },
      {
        "ex": "Пти́ца лети́т по не́бу.",
        "ru": "Пти́ца",
        "vi": "Chim",
        "pos": "сущ.",
        "ex_vi": "Con chim đang bay trên bầu trời.",
        "gender": "ж.",
        "stress": "Пти́ца"
      },
      {
        "ex": "Попуга́й стои́т на ве́тке.",
        "ru": "Попуга́й",
        "vi": "Vẹt",
        "pos": "сущ.",
        "ex_vi": "Con vẹt đang đứng trên cành cây.",
        "gender": "м.",
        "stress": "Попуга́й"
      },
      {
        "ex": "Ры́ба пла́вает в реке́.",
        "ru": "Ры́ба",
        "vi": "Cá",
        "pos": "сущ.",
        "ex_vi": "Con cá đang bơi ở sông.",
        "gender": "ж.",
        "stress": "Ры́ба"
      },
      {
        "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.",
        "ru": "Дом",
        "vi": "Nhà",
        "pos": "сущ.",
        "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà.",
        "gender": "м.",
        "stress": "Дом"
      },
      {
        "ex": "Ко́шка спит в ко́мнате.",
        "ru": "Ко́мната",
        "vi": "Phòng",
        "pos": "сущ.",
        "ex_vi": "Con mèo ngủ trong phòng.",
        "gender": "ж.",
        "stress": "Ко́мната"
      },
      {
        "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.",
        "ru": "Парк",
        "vi": "Công viên",
        "pos": "сущ.",
        "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên.",
        "gender": "м.",
        "stress": "Парк"
      },
      {
        "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.",
        "ru": "Фе́рма",
        "vi": "Trang trại",
        "pos": "сущ.",
        "note": "Nghĩa khа́c: công ty",
        "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.",
        "gender": "ж.",
        "stress": "Фе́рма"
      },
      {
        "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.",
        "ru": "Хлев",
        "vi": "Chuồng gia súc",
        "pos": "сущ.",
        "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.",
        "gender": "м.",
        "stress": "Хлев"
      },
      {
        "ex": "Ку́рицы спя́т в куря́тнике.",
        "ru": "Куря́тник",
        "vi": "Chuồng gà",
        "pos": "сущ.",
        "ex_vi": "Những con gà đang ngủ trong chuồng.",
        "gender": "м.",
        "stress": "Куря́тник"
      },
      {
        "ex": "Ку́рицы в саду́. Они́ бе́гают по саду́.",
        "ru": "Сад",
        "vi": "Vườn",
        "pos": "сущ.",
        "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn.",
        "gender": "м.",
        "stress": "Сад"
      },
      {
        "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.",
        "ru": "По́ле",
        "vi": "Cánh đồng",
        "pos": "сущ.",
        "ex_vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.",
        "gender": "ср.",
        "stress": "По́ле"
      },
      {
        "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.",
        "ru": "Лес",
        "vi": "Rừng",
        "pos": "сущ.",
        "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi.",
        "gender": "м.",
        "stress": "Лес"
      },
      {
        "ex": "Пти́ца лета́ет по не́бу.",
        "ru": "Не́бо",
        "vi": "Bầu trời",
        "pos": "сущ.",
        "ex_vi": "Con chim bay lượn trên bầu trời.",
        "gender": "ср.",
        "stress": "Не́бо"
      },
      {
        "ex": "Попуга́й лети́т к ве́тке.",
        "ru": "Ве́тка",
        "vi": "Cành cây",
        "pos": "сущ.",
        "ex_vi": "Con vẹt đang bay về phía cành cây.",
        "gender": "ж.",
        "stress": "Ве́тка"
      },
      {
        "ex": "Ры́бы пла́вают в о́зере.",
        "ru": "О́зеро",
        "vi": "Hồ",
        "pos": "сущ.",
        "ex_vi": "Những con cá bơi trong hồ.",
        "gender": "ср.",
        "stress": "О́зеро"
      },
      {
        "ex": "Ры́бы пла́вают в реке́.",
        "ru": "Река́",
        "vi": "Sông",
        "pos": "сущ.",
        "ex_vi": "Con cá bơi trong sông.",
        "gender": "ж.",
        "stress": "Река́"
      },
      {
        "ex": "Ры́бы пла́вают в мо́ре.",
        "ru": "Мо́ре",
        "vi": "Biển",
        "pos": "сущ.",
        "ex_vi": "Những con cá đang bơi dưới biển.",
        "gender": "ср.",
        "stress": "Мо́ре"
      },
      {
        "ex": "(1) Я плыву́ к берегу́.\n(2) Я уме́ю пла́вать.",
        "ru": "плыть - пла́вать",
        "vi": "bơi",
        "pos": "гл.",
        "note": "(1) Плыть (1 hướng cụ thể)\n(2) Пла́вать (chung chung, lặp lại hướng)",
        "ex_vi": "(1) Tôi đang bơi về phía bờ.\n(2) Tôi biết bơi.",
        "stress": "плыть - пла́вать",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "(1) плыть + куда?(C4) (bơi đến đâu?)\n(1) пла́вать + по чему?(C3) (bơi quanh đâu?)"
      },
      {
        "ex": "(1) Пти́ца лети́т к ве́тку.\n(2) Пти́ца лета́ет по не́бу.",
        "ru": "лете́ть - лета́ть",
        "vi": "bay",
        "pos": "гл.",
        "note": "(1) лете́ть (1 chiều; 1 lần)\n(2) лета́ть (2 chiều ; thường xuyên)",
        "ex_vi": "(1) Con chim đang bay đến cành cây.\n(2) Con chim bay lượn trên bầu trời.",
        "stress": "лете́ть - лета́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "(1) лете́ть + куда? (C4) (bay đến đâu?)\n(2) лета́ть + по чему?(С3) (bay vòng quanh đâu?)"
      },
      {
        "ex": "Кот игра́ет с клубко́м.",
        "ru": "Клубо́к",
        "vi": "Cuộn len",
        "pos": "сущ.",
        "ex_vi": "Con mèo chơi với cuộn len.",
        "gender": "м.",
        "stress": "Клубо́к"
      }
    ]
  },
  {
    "id": "dia_diem_noi_chon",
    "name": "Địa điểm nơi chốn",
    "level": "A1",
    "desc": "Cơ sở học tập, y tế, thương mại dịch vụ, vui chơi giải trí, giao thông và các cảnh quan thiên nhiên.",
    "icon": "map-pin",
    "color": "#0284c7",
    "is_system": true,
    "words": [
      {
        "ex": "Я изуча́ю хи́мию в институ́те хи́мии.",
        "ru": "изуча́ть",
        "vi": "nghiên cứu",
        "pos": "гл.",
        "ex_vi": "Tôi đang nghiên cứu hóa học ở viện hóa học.",
        "aspect": "изучи́ть",
        "stress": "изуча́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "изуча́ть + что?(C4) (nghiên cứu cа́i gì?)"
      },
      {
        "ex": "Я о́чень люблю́ чита́ть кни́ги, и я уже́ прочита́л э́ту кни́гу.",
        "ru": "чита́ть",
        "vi": "đọc",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích đọc sách và tôi đã đọc xong quyển sách này rồi.",
        "aspect": "прочита́ть",
        "stress": "чита́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "чита́ть + что?(C4) (đọc cа́i gì?)"
      },
      {
        "ex": "Вчера́ я встре́тил ре́ктора в столо́вой.",
        "ru": "встреча́ть",
        "vi": "gặp gỡ",
        "pos": "гл.",
        "ex_vi": "Ngày hôm qua, tôi đã gặp thầy hiệu trưởng ở nhà ăn.",
        "aspect": "встре́тить",
        "stress": "встреча́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "встреча́ть + кого?(C4) (gặp gỡ ai?)"
      },
      {
        "ex": "Я подал докуме́нты для поступле́ния в декана́те.",
        "ru": "подава́ть докуме́нты",
        "vi": "nộp tài liệu",
        "pos": "гл.",
        "ex_vi": "Tôi đã nộp giấy tờ nhập học cho văn phòng khoa.",
        "aspect": "пода́ть докуме́нты",
        "stress": "подава́ть докуме́нты",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "подabа́ть + что?(C4) + кому?(C3) (nộp, đưa cа́i gì? cho ai?)"
      },
      {
        "ex": "Я получи́л студе́нческий биле́т в декана́те.",
        "ru": "получа́ть докуме́нты",
        "vi": "nhận tài liệu",
        "pos": "гл.",
        "ex_vi": "Tôi đã nhận được thẻ sinh viên ở văn phòng khoa.",
        "aspect": "получи́ть докуме́нты",
        "stress": "получа́ть докуме́нты",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "получа́ть + что?(C4) (nhận cа́i gì?)"
      },
      {
        "ex": "Я живу́ в кварти́ре.",
        "ru": "жить",
        "vi": "sống",
        "pos": "гл.",
        "ex_vi": "Tôi đang sống ở trong căn hộ.",
        "stress": "жить",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "жить + где?(C6) (sống ở đâu?)"
      },
      {
        "ex": "Я слу́шаю ле́кцию на ле́кции.",
        "ru": "слу́шать ле́кцию",
        "vi": "nghe bài giảng",
        "pos": "гл.",
        "ex_vi": "Tôi đang nghe bài giảng ở trên giảng đường.",
        "aspect": "послу́шать ле́кцию",
        "stress": "слу́шать ле́кцию",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "слу́шать + что?(C4) (nghe cа́i gì?)"
      },
      {
        "ex": "Сего́дня я бу́ду выступа́ть на семина́ре.",
        "ru": "выступа́ть",
        "vi": "phát biểu; thuyết trình",
        "pos": "гл.",
        "note": "Выступле́ниe (сущ.)",
        "ex_vi": "Hôm nay tôi sẽ thuyết trình trên seminar.",
        "aspect": "вы́ступить",
        "stress": "выступа́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "выступа́ть + о чём?(C6) + где?(C6) (phа́t biểu, thuyết trình về cа́i gì? ở đâu?)"
      },
      {
        "ex": "Я иссле́дую хи́мию в лаборато́рии.",
        "ru": "иссле́довать",
        "vi": "nghiên cứu",
        "pos": "гл.",
        "ex_vi": "Tôi đang nghiên cứu hóa học ở phòng thí nghiệm.",
        "stress": "иссле́довать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "иссле́довать + что?(C4) (nghiên cứu cа́i gì?)"
      },
      {
        "ex": "Я купи́л лека́рство в апте́ке.",
        "ru": "покупа́ть лека́рства",
        "vi": "mua thuốc",
        "pos": "гл.",
        "ex_vi": "Tôi đã mua thuốc ở hiệu thuốc.",
        "aspect": "купи́ть лека́рства",
        "stress": "покупа́ть лека́рства",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "покупа́ть + что?(C4) (mua cа́i gì?)"
      },
      {
        "ex": "Я иду́ к врачу́.",
        "ru": "идти́/е́хать к врачу́",
        "vi": "đi đến chỗ bác sĩ",
        "pos": "гл.",
        "ex_vi": "Tôi đang đi gặp bác sĩ.",
        "stress": "идти́/е́хать к врачу́",
        "verb_obj": "Động từ đi với cách 3",
        "collocation": "идти́ / е́хать + к кому?(C3)(đi đến chỗ ai?)"
      },
      {
        "ex": "Я люблю́ слу́шать му́зыку по телефо́ну.",
        "ru": "слу́шать му́зыку",
        "vi": "nghe nhạc",
        "pos": "гл.",
        "ex_vi": "Tôi thích nghe nhạc bằng điện thoại.",
        "aspect": "послу́шать му́зыку",
        "stress": "слу́шать му́зыку",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "слу́шать + что?(C4) (nghe cа́i gì?)"
      },
      {
        "ex": "Я люблю́ смотре́ть карти́ны в музе́е.",
        "ru": "смотре́ть карти́ны",
        "vi": "xem tranh",
        "pos": "гл.",
        "ex_vi": "Tôi thích xem tranh ở bảo tàng.",
        "aspect": "посмотре́ть карти́ны",
        "stress": "смотре́ть карти́ны",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я смотре́л э́тот спекта́кль в Большо́м теа́тре.",
        "ru": "смотре́ть спекта́кль",
        "vi": "xem vở kịch",
        "pos": "гл.",
        "ex_vi": "Tôi đã xem vở kịch này ở nhà hát lớn.",
        "aspect": "посмотре́ть спекта́кль",
        "stress": "смотре́ть спекта́кль",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я смотре́л выступле́ние арти́стов на конце́рте.",
        "ru": "смотре́ть выступле́ние",
        "vi": "xem buổi biểu diễn",
        "pos": "гл.",
        "ex_vi": "Tôi đã xem buổi trình diễn của các nghệ sĩ ở buổi hòa nhạc.",
        "aspect": "посмотре́ть выступле́ние",
        "stress": "смотре́ть выступле́ние",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я люблю́ смотре́ть фильм по телеви́зору.",
        "ru": "смотре́ть",
        "vi": "xem phim",
        "pos": "гл.",
        "ex_vi": "Tôi thích xem phim trên tivi.",
        "aspect": "посмотре́ть фильм",
        "stress": "смотре́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я люблю́ посеща́ть по Москве́.",
        "ru": "посеща́ть",
        "vi": "thăm quan",
        "pos": "гл.",
        "ex_vi": "Tôi thích đi thăm quan quanh Moskva.",
        "aspect": "посети́ть",
        "stress": "посеща́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "посеща́ть + что?(C4) (thăm quan cа́i gì?)"
      },
      {
        "ex": "Я обы́чно танцу́ю на дискоте́ке.",
        "ru": "танцева́ть",
        "vi": "nhảy múa",
        "pos": "гл.",
        "ex_vi": "Tôi thường nhảy ở vũ trường.",
        "aspect": "потанцева́ть",
        "stress": "танцева́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "танцebа́ть + где?(C6) (nhảy ở đâu?)"
      },
      {
        "ex": "Я посмотре́л цирк в ци́рке.",
        "ru": "смотре́ть цирк",
        "vi": "xem xiếc",
        "pos": "гл.",
        "note": "Цирк (rạp xiếc)",
        "ex_vi": "Tôi đã xem xiếc ở rạp xiếc.",
        "aspect": "посмотре́ть цирк",
        "stress": "смотре́ть цирк",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я ходи́л смотре́ть живо́тных в зоопа́рке.",
        "ru": "смотре́ть живо́тных",
        "vi": "xem động vật",
        "pos": "гл.",
        "ex_vi": "Tôi đã đi xem các con động vật ở sở thú.",
        "aspect": "посмотре́ть живо́тных",
        "stress": "смотре́ть живо́тных",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + кого?(C4) (xem ai/con gì?)"
      },
      {
        "ex": "Я смотре́л э́тот футбо́льный матч на стадио́не.",
        "ru": "смотре́ть матч",
        "vi": "xem trận đấu",
        "pos": "гл.",
        "ex_vi": "Tôi đã xem trận bóng đấu này ở sân vận động.",
        "aspect": "посмотре́ть матч",
        "stress": "смотре́ть матч",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я не люблю́ игра́ть на пиани́но. Я бо́льше люблю́ игра́ть в футбо́л.",
        "ru": "игра́ть / сыгра́ть",
        "vi": "chơi",
        "pos": "гл.",
        "ex_vi": "Tôi không thích chơi piano. Tôi thích chơi bóng đá hơn.",
        "aspect": "сыгра́ть",
        "stress": "игра́ть / сыгра́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "игра́ть + в что?(C4) / нa чём?(C6) (chơi trò gì?/ nhạc cụ gì?)"
      },
      {
        "ex": "Я поменя́л де́ньги в ба́нке позавчера́.",
        "ru": "меня́ть де́ньги",
        "vi": "đổi tiền",
        "pos": "гл.",
        "ex_vi": "Tôi đã đổi tiền ở ngân hàng vào ngày hôm kia.",
        "aspect": "поменя́ть де́ньги",
        "stress": "меня́ть де́ньги",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "меня́ть + что?(C4) + в/нa что?(C4) (đổi cа́i gì? lấy cа́i gì?)"
      },
      {
        "ex": "Я отпра́вил письмо́ роди́телям.",
        "ru": "отправля́ть письмо́",
        "vi": "gửi thư",
        "pos": "гл.",
        "ex_vi": "Tôi đã gửi thư cho bố mẹ.",
        "aspect": "отпра́вить письмо́",
        "stress": "отправля́ть письмо́",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "отправля́ть + что?(C4) + кому?(C3) (gửi cа́i gì? cho ai?)"
      },
      {
        "ex": "Я о́чень люблю́ гуля́ть по у́лице.",
        "ru": "гуля́ть",
        "vi": "đi dạo",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích đi dạo trên phố.",
        "aspect": "погуля́ть",
        "stress": "гуля́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "гуля́ть + где?(C6) (đi dạo ở đâu?)"
      },
      {
        "ex": "Я о́чень люблю́ есть йо́гурт и шокола́д.",
        "ru": "есть",
        "vi": "ăn",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích ăn sữa chua và socola.",
        "aspect": "съесть",
        "stress": "есть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "есть + что?(C4) (ăn cа́i gì?)"
      },
      {
        "ex": "Я пил вино́ на вечери́нке.",
        "ru": "пить",
        "vi": "uống",
        "pos": "гл.",
        "ex_vi": "Tôi đã uống rượu trên buổi tiệc.",
        "aspect": "вы́пить",
        "stress": "пить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "пить + что?(C4) (uống cа́i gì?)"
      },
      {
        "ex": "Я рабо́таю продавцо́м в магази́не оде́жды.",
        "ru": "рабо́тать",
        "vi": "làm việc",
        "pos": "гл.",
        "ex_vi": "Tôi đang làm nhân viên bán hàng ở cửa hàng quần áo.",
        "stress": "рабо́тать",
        "verb_obj": "Động từ đi với cách 5, Động từ đi với cách 6",
        "collocation": "рабо́тать + кем?(C5) + где?(C6) (làm nghề gì? ở đâu?)"
      },
      {
        "ex": "Я взя́л маши́ну из гаража́.",
        "ru": "брать (маши́ну)",
        "vi": "lấy (xe)",
        "pos": "гл.",
        "ex_vi": "Tôi đã lấy xe ô tô từ trong ga-ra.",
        "aspect": "взять (маши́ну)",
        "stress": "брать (маши́ну)",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 2",
        "collocation": "брать + что?(C4) + из чего? (lấy cа́i gì? từ đâu?)"
      },
      {
        "ex": "Я оста́вил велосипе́д в гараже́.",
        "ru": "оставля́ть (маши́ну)",
        "vi": "để (xe)",
        "pos": "гл.",
        "ex_vi": "Tôi đã để xe đạp ở trong ga-ra.",
        "aspect": "оста́вить (маши́ну)",
        "stress": "оставля́ть (маши́ну)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "оставля́ть + что?(C4) + где?(C6)/куда?(C4) (để cа́i gì? ở đâu?/vào đâu?)"
      },
      {
        "ex": "Я жду трамва́й на остано́вке.",
        "ru": "ждать",
        "vi": "đợi",
        "pos": "гл.",
        "ex_vi": "Tôi đang đợi xe điện ở trạm dừng.",
        "aspect": "подожда́ть",
        "stress": "ждать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ждать + кого?/что?(C4) (đợi ai?/cа́i gì?)"
      },
      {
        "ex": "Я о́чень люблю́ лови́ть ры́бы. Я ловлю́ ры́бы ка́ждый день в о́зере.",
        "ru": "лови́ть (ры́бу)",
        "vi": "bắt (cá)",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích câu cá. Tôi câu cá mỗi ngày ở hồ.",
        "aspect": "пойма́ть (ры́бу)",
        "stress": "лови́ть (ры́бу)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "лови́ть + кого?(C4) (bắt ai/con gì?)"
      },
      {
        "ex": "Я о́чень люблю́ пла́вать. Ка́ждое ле́то я пла́ваю в о́зере.",
        "ru": "плыть - пла́вать",
        "vi": "bơi",
        "pos": "гл.",
        "note": "(1) Плыть (1 hướng cụ thể)\n(2) Пла́вать (chung chung, lặp lại hướng)",
        "ex_vi": "Tôi rất thích bơi. Vào mỗi mùa hè, tôi đều bơi ở hồ.",
        "stress": "плыть - пла́вать",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "(1) плыть + куда?(C4) (bơi đến đâu?)\n(1) пла́вать + по чему?(C3) (bơi quanh đâu?)"
      },
      {
        "ex": "Я о́чень люблю́ смотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.",
        "ru": "смотре́ть зака́т",
        "vi": "ngắm hoàng hôn",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở trên biền.",
        "aspect": "посмотре́ть зака́т",
        "stress": "смотре́ть зака́т",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть / посмотре́ть + что?(C4) (ngắm,xem cа́i gì?)"
      },
      {
        "ex": "Я о́чень люблю́ сажа́ть цветы́. Я ча́сто сажа́ю цветы́ в саду́.",
        "ru": "сажа́ть цветы́",
        "vi": "trồng hoa",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích trồng hoa. Tôi thường trồng hoa ở trong vườn.",
        "aspect": "посади́ть цветы́",
        "stress": "сажа́ть цветы́",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "сажа́ть + что?(C4) (trồng cа́i gì?)"
      },
      {
        "ex": "Я о́чень люблю́ поднима́ться в го́ры. Я ча́сто поднима́юсь в го́ры ка́ждые выходны́е.",
        "ru": "поднима́ться в го́ры",
        "vi": "leo núi",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích leo núi. Tôi thường leo núi vào mỗi cuối tuần.",
        "aspect": "подня́ться в го́ры",
        "stress": "поднима́ться в го́ры",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "поднима́ться + куда?(C4) (leo lên đâu?)"
      },
      {
        "ex": "Я о́чень люблю́ собира́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.",
        "ru": "собира́ть грибы́",
        "vi": "hái nấm",
        "pos": "гл.",
        "ex_vi": "Tôi rất thích hái nấm. Tôi thường hái nấm ở trong rừng.",
        "aspect": "собра́ть грибы́",
        "stress": "собира́ть грибы́",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "собира́ть / собра́ть + что?(C4) (hа́i, thu thập cа́i gì?)"
      },
      {
        "ex": "Я получи́л письмо́ от мое́й сестры́.",
        "ru": "получа́ть письмо́",
        "vi": "nhận thư",
        "pos": "гл.",
        "ex_vi": "Tôi đã nhận được thư từ chị gái tôi.",
        "aspect": "получи́ть письмо́",
        "stress": "получа́ть письмо́",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 2",
        "collocation": "получа́ть + что?(C4) + от кого?(С2) (nhận cа́i gì? từ ai?)"
      },
      {
        "ex": "Я иду́ в шко́лу. Я учу́ ру́сский язы́к в шко́ле.",
        "ru": "Шко́ла",
        "vi": "Trường học",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến trường học. Tôi học tiếng Nga ở trường học.",
        "gender": "ж.",
        "stress": "Шко́ла"
      },
      {
        "ex": "Я иду́ в акаде́мию. Я учу́ матема́тику в акаде́мии.",
        "ru": "Акаде́мия",
        "vi": "Học viện",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến học viện để học. Tôi học Toán ở học viện.",
        "gender": "ж.",
        "stress": "Акаде́мия"
      },
      {
        "ex": "Я иду́ в институ́т. Я учу́ исто́рию Росси́и в институ́те.",
        "ru": "Институ́т",
        "vi": "Viện",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến viện để học. Tôi học Lịch sử Nga ở viện.",
        "gender": "м.",
        "stress": "Институ́т"
      },
      {
        "ex": "Я иду́ университе́т. Я учу́ биоло́гию в университе́те.",
        "ru": "Университе́т",
        "vi": "Đại học",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến đại học để học. Tôi học Sinh học ở trường đại học.",
        "gender": "м.",
        "stress": "Университе́т"
      },
      {
        "ex": "Я иду́ в библиоте́ку, что́бы прочита́ть кни́ги. Я ча́сто чита́ю кни́ги в библиоте́ке.",
        "ru": "Библиоте́ка",
        "vi": "Thư viện",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến thư viện để đọc sách. Tôi thường đọc sách ở thư viện.",
        "gender": "ж.",
        "stress": "Библиоте́ка"
      },
      {
        "ex": "Преподава́тели иду́т на ка́федру, что́бы встре́титься. Они́ ча́сто встреча́ются на ка́федре.",
        "ru": "Ка́федра",
        "vi": "Bộ môn",
        "pos": "сущ.",
        "ex_vi": "Các giảng viên đang đi đến phòng bộ môn để gặp nhau. Họ thường họp mặt ở phòng bộ môn.",
        "gender": "ж.",
        "stress": "Ка́федра"
      },
      {
        "ex": "Студе́нты иду́т в декана́т, что́бы пода́ть докуме́нты для поступле́ния и получи́ть студе́нческий биле́т. Они́ ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.",
        "ru": "Декана́т",
        "vi": "Văn phòng khoa",
        "pos": "сущ.",
        "ex_vi": "Các sinh viên đang đi đến văn phòng khoa để nộp giấy tờ nhập học và nhận thẻ sinh viên. Họ thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.",
        "gender": "м.",
        "stress": "Декана́т"
      },
      {
        "ex": "Я живу́ в общежи́тии № 5.",
        "ru": "Общежи́тие",
        "vi": "Ký túc xá",
        "pos": "сущ.",
        "ex_vi": "Tôi đang sống ở ký túc xá số 5.",
        "gender": "ср.",
        "stress": "Общежи́тие"
      },
      {
        "ex": "Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.",
        "ru": "Заня́тие",
        "vi": "Buổi học",
        "pos": "сущ.",
        "ex_vi": "Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm.",
        "gender": "ср.",
        "stress": "Заня́тие"
      },
      {
        "ex": "Я иду́ на ле́кцию, что́бы послу́шать ле́кцию. Я ча́сто слу́шаю ле́кцию на ле́кциях.",
        "ru": "Ле́кция",
        "vi": "Bài giảng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến giảng đường để nghe giảng. Tôi thường nghe bài giảng ở các buổi giảng đường.",
        "gender": "ж.",
        "stress": "Ле́кция"
      },
      {
        "ex": "Я иду́ на семина́р, что́бы выступи́ть. Я ча́сто выступа́ю на семина́рах.",
        "ru": "Семина́р",
        "vi": "Buổi thảo luận",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến seminar để thuyết trình. Tôi thường thuyết trình ở các buổi seminar.",
        "gender": "м.",
        "stress": "Семина́р"
      },
      {
        "ex": "Сего́дня я ходи́л в лаборато́рию, что́бы иссле́довать. Я ча́сто иссле́дую в лаборато́рии.",
        "ru": "Лаборато́рия",
        "vi": "Phòng thí nghiệm",
        "pos": "сущ.",
        "ex_vi": "Hôm nay tôi đã đi đến phòng thí nghiệm để nghiên cứu. Tôi thường nghiên cứu ở phòng thí nghiệm.",
        "gender": "ж.",
        "stress": "Лаборато́рия"
      },
      {
        "ex": "Я иду́ в апте́ку, что́бы купи́ть лека́рства. Я ча́сто покупа́ю лека́рства в апте́ке.",
        "ru": "Апте́ка",
        "vi": "Hiệu thuốc",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi bộ đến hiệu thuốc để mua thuốc. Tôi thường mua thuốc ở hiệu thuốc.",
        "gender": "ж.",
        "stress": "Апте́ка"
      },
      {
        "ex": "Когда я боле́ю, я хожу́ к врачу́ в поликли́нику, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в поликли́нике.",
        "ru": "Поликли́ника",
        "vi": "Phòng khám đa khoa",
        "pos": "сущ.",
        "ex_vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.",
        "gender": "ж.",
        "stress": "Поликли́ника"
      },
      {
        "ex": "Когда я боле́ю, я хожу́ к врачу́ в больни́цу, что́бы врач осма́тривать и лечи́ть меня́. Врач ча́сто осма́тривает и ле́чит меня́ в больни́це.",
        "ru": "Больни́ца",
        "vi": "Bệnh viện",
        "pos": "сущ.",
        "ex_vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.",
        "gender": "ж.",
        "stress": "Больни́ца"
      },
      {
        "ex": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.",
        "ru": "Музе́й",
        "vi": "Bảo tàng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm.",
        "gender": "м.",
        "stress": "Музе́й"
      },
      {
        "ex": "Я е́ду в музе́й на вы́ставку, что́бы посмотре́ть карти́ны. Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.",
        "ru": "Вы́ставка",
        "vi": "Triển lãm",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến bảo tàng ở buổi triển lãm để xem những bức tranh. Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm.",
        "gender": "ж.",
        "stress": "Вы́ставка"
      },
      {
        "ex": "Я е́ду в теа́тр, что́бы посмотре́ть спекта́кль. Я ча́сто смотрю́ спекта́кли в теа́тре.",
        "ru": "Теа́тр",
        "vi": "Nhà hát",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến nhà hát để xem vở kịch. Tôi thường xem các vở kịch ở nhà hát.",
        "gender": "м.",
        "stress": "Теа́тр"
      },
      {
        "ex": "Я е́ду на конце́рт, что́бы послу́шать му́зыку. Я ча́сто слу́шаю му́зыку на конце́ртах.",
        "ru": "Конце́рт",
        "vi": "Buổi hòa nhạc",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến buổi hòa nhạc để nghe nhạc. Tôi thường nghe nhạc ở các buổi hòa nhạc.",
        "gender": "м.",
        "stress": "Конце́рт"
      },
      {
        "ex": "Я е́ду в кинотеа́тр, что́бы посмотре́ть фильм. Я ча́сто смотрю́ фильм в кинотеа́тре.",
        "ru": "Кинотеа́тр",
        "vi": "Rạp chiếu phim",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến rạp chiếu phim để xem phim. Tôi thường xem phim ở rạp chiếu phim.",
        "gender": "м.",
        "stress": "Кинотеа́тр"
      },
      {
        "ex": "Я е́ду в клуб, что́бы встре́титься с людьми́. Я ча́сто встреча́юсь с людьми́ в клу́бе.",
        "ru": "Клуб",
        "vi": "Câu lạc bộ",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến câu lạc bộ để gặp gỡ mọi người. Tôi thường gặp gỡ mọi người ở câu lạc bộ.",
        "gender": "м.",
        "stress": "Клуб"
      },
      {
        "ex": "Я е́ду на дискоте́ку, что́бы потанцева́ть и послу́шать му́зыку. Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.",
        "ru": "Дискоте́ка",
        "vi": "Sàn nhảy, vũ trường",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến vũ trường để nhảy và nghe nhạc. Tôi thường nhảy và nghe nhạc ở vũ trường.",
        "gender": "ж.",
        "stress": "Дискоте́ка"
      },
      {
        "ex": "Я е́ду в цирк, что́бы посмотре́ть цирк. Я ча́сто смотрю́ цирк в ци́рке.",
        "ru": "Цирк",
        "vi": "Rạp xiếc",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến rạp xiếc để xem xiếc. Tôi thường xem xiếc ở rạp xiếc.",
        "gender": "м.",
        "stress": "Цирк"
      },
      {
        "ex": "Я е́ду в зоопа́рк, что́бы посмотре́ть живо́тных. Я ча́сто ви́жу живо́тных в зоопа́рке.",
        "ru": "Зоопа́рк",
        "vi": "Sở thú",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến sở thú để xem động vật. Tôi thường nhìn thấy động vật ở sở thú.",
        "gender": "м.",
        "stress": "Зоопа́рк"
      },
      {
        "ex": "Я е́ду на стадио́н, что́бы игра́ть в футбо́л с друзья́ми. Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.",
        "ru": "Стадио́н",
        "vi": "Sân vận động",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến sân vận động để chơi bóng đá với các bạn. Tôi thường chơi bóng đá với các bạn ở sân vận động.",
        "gender": "м.",
        "stress": "Стадио́н"
      },
      {
        "ex": "Я е́ду на экску́рсию, что́бы посети́ть музе́й. Я ча́сто посеща́ю музе́й на экску́рсии.",
        "ru": "Экску́рсия",
        "vi": "Chuyến tham quan",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến chuyến tham quan để thăm quan bảo tàng. Tôi thường thăm quan bảo tàng trên chuyến tham quan.",
        "gender": "ж.",
        "stress": "Экску́рсия"
      },
      {
        "ex": "Я е́ду в магази́н, что́бы купи́ть мя́со и о́вощи. Я ча́сто покупа́ю проду́кты в магази́не.",
        "ru": "Магази́н",
        "vi": "Cửa hàng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến cửa hàng để mua thịt và rau. Tôi thường mua thực phẩm ở cửa hàng.",
        "gender": "м.",
        "stress": "Магази́н"
      },
      {
        "ex": "Я е́ду в банк, что́бы поменя́ть де́ньги. Я ча́сто меня́ю де́ньги в ба́нке.",
        "ru": "Банк",
        "vi": "Ngân hàng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến ngân hàng để đổi tiền. Tôi thường đổi tiền ở ngân hàng.",
        "gender": "м.",
        "stress": "Банк"
      },
      {
        "ex": "Я ходи́л на по́чту, что́бы отпра́вить письмо́ роди́телям, че́рез 5 дней я верну́ на по́чту, что́бы получи́ть письмо́ от роди́телей. Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.",
        "ru": "По́чта",
        "vi": "Bưu điện",
        "pos": "сущ.",
        "ex_vi": "Tôi đã đi đến bưu điện để gửi thư cho bố mẹ, sau 5 ngày nữa tôi sẽ quay lại bưu điện để nhận thư từ bố mẹ. Tôi thường gửi thư và nhận thư ở bưu điện.",
        "gender": "ж.",
        "stress": "По́чта"
      },
      {
        "ex": "Я иду́ в парк, что́бы погуля́ть, я ча́сто гуля́ю по па́рку.",
        "ru": "Парк",
        "vi": "Công viên",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến công viên để đi dạo, tôi thường đi dạo quanh công viên.",
        "gender": "м.",
        "stress": "Парк"
      },
      {
        "ex": "Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.",
        "ru": "Кио́ск",
        "vi": "Quầy báo, quầy hàng nhỏ trên phố",
        "pos": "сущ.",
        "ex_vi": "Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên.",
        "gender": "м.",
        "stress": "Кио́ск"
      },
      {
        "ex": "Я е́ду в рестора́н, что́бы поу́жинать с люби́мой де́вушкой. Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.",
        "ru": "Рестора́н",
        "vi": "Nhà hàng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến nhà hàng để ăn tối với bạn gái. Tôi thường ăn tối với bạn gái ở nhà hàng.",
        "gender": "м.",
        "stress": "Рестора́н"
      },
      {
        "ex": "По́сле заня́тий я ходи́л в столо́вую, что́бы пообе́дать с одногру́ппниками. Я ча́сто обе́даю с одногру́ппниками в столо́вой.",
        "ru": "Столо́вая",
        "vi": "Căng tin",
        "pos": "сущ.",
        "ex_vi": "Sau buổi học, tôi đã đi đến nhà ăn để ăn trưa với các bạn cùng lớp. Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn.",
        "gender": "ж.",
        "stress": "Столо́вая"
      },
      {
        "ex": "Сего́дня у́тром я шёл в кафе́, что́бы вы́пить ко́фе. Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.",
        "ru": "Кафе́",
        "vi": "Quán cà phê",
        "pos": "сущ.",
        "ex_vi": "Sáng hôm nay tôi đã đi đến quán cà phê để uống cà phê. Tôi thường uống cà phê ở quán cà phê mỗi sáng.",
        "gender": "ср.",
        "stress": "Кафе́"
      },
      {
        "ex": "Я е́ду в фи́рму, что́бы рабо́тать. Я ча́сто рабо́таю в фи́рме ка́ждый день.",
        "ru": "Фи́рма",
        "vi": "Công ty",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến công ty để làm việc. Tôi thường làm việc ở công ty mỗi ngày.",
        "gender": "ж.",
        "stress": "Фи́рма"
      },
      {
        "ex": "Я е́ду на заво́д, что́бы рабо́тать. Я ча́сто рабо́таю на заво́де ка́ждый день.",
        "ru": "Заво́д",
        "vi": "Nhà máy",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến nhà máy để làm việc. Tôi thường làm việc ở nhà máy mỗi ngày.",
        "gender": "м.",
        "stress": "Заво́д"
      },
      {
        "ex": "Я е́ду на фа́брику, что́бы рабо́тать. Я ча́сто рабо́таю на фа́брике ка́ждый день.",
        "ru": "Фа́брика",
        "vi": "Xưởng sản xuất",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến xưởng để làm việc. Tôi thường làm việc ở xưởng mỗi ngày.",
        "gender": "ж.",
        "stress": "Фа́брика"
      },
      {
        "ex": "Я живу́ в гости́нице.",
        "ru": "Гости́ница",
        "vi": "Khách sạn",
        "pos": "сущ.",
        "ex_vi": "Tôi đang ở khách sạn.",
        "gender": "ж.",
        "stress": "Гости́ница"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять маши́ну. Я ча́сто оставля́ть её в гара́же.",
        "ru": "Гара́ж",
        "vi": "Ga ra",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến ga-ra để lấy ô tô. Tôi thường để nó ở ga-ra.",
        "gender": "м.",
        "stress": "Гара́ж"
      },
      {
        "ex": "Я иду́ на остано́вку, что́бы подожда́ть авто́бус . Я ча́сто жду́ авто́бус на остано́вке.",
        "ru": "Остано́вка",
        "vi": "Trạm dừng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến trạm dừng để đợi xe buýt. Tôi thường đợi xe buýt ở trạm dừng.",
        "gender": "ж.",
        "stress": "Остано́вка"
      },
      {
        "ex": "Я иду́ на ста́нцию метро́, что́бы подожда́ть метро́. Я ча́сто жду́ метро́ на ста́нции.",
        "ru": "Ста́нция",
        "vi": "Ga tàu điện ngầm",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến ga tàu điện ngầm để đợi tàu điện ngầm. Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm.",
        "gender": "ж.",
        "stress": "Ста́нция"
      },
      {
        "ex": "Я е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.",
        "ru": "Вокза́л",
        "vi": "Ga tàu hỏa",
        "pos": "сущ.",
        "ex_vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa.",
        "gender": "м.",
        "stress": "Вокза́л"
      },
      {
        "ex": "Я иду́ на ре́ку, что́бы пойма́ть ры́бы. Я ча́сто ловлю́ ры́бы на реке́.",
        "ru": "Река́",
        "vi": "Sông",
        "pos": "сущ.",
        "ex_vi": "Tôi đi ra sông để câu cá. Tôi thường câu cá ở sông.",
        "gender": "ж.",
        "stress": "Река́"
      },
      {
        "ex": "Я иду́ на о́зеро, что́бы пла́вать. Ле́том я ча́сто пла́ваю в о́зере.",
        "ru": "О́зеро",
        "vi": "Hồ",
        "pos": "сущ.",
        "ex_vi": "Tôi đi ra hồ để bơi. Vào mùa hè tôi thường bơi ở hồ.",
        "gender": "ср.",
        "stress": "О́зеро"
      },
      {
        "ex": "Я иду́ на мо́ре, что́бы посмотре́ть зака́т. Я ча́сто смотрю́ зака́т на мо́ре.",
        "ru": "Мо́ре",
        "vi": "Biển",
        "pos": "сущ.",
        "ex_vi": "Tôi đi ra biển để ngắm hoàng hôn. Tôi thường ngắm hoàng hôn ở biển.",
        "gender": "ср.",
        "stress": "Мо́ре"
      },
      {
        "ex": "Я иду́ в сад, что́бы сажа́ть о́вощи и цветы́. Я ча́сто сажа́ю о́вощи и цветы́ в саду́.",
        "ru": "Сад",
        "vi": "Vườn",
        "pos": "сущ.",
        "ex_vi": "Tôi đi ra vườn để trồng rau và trồng hoa. Tôi thường trồng rau và trồng hoa ở vườn.",
        "gender": "м.",
        "stress": "Сад"
      },
      {
        "ex": "Я иду́ в го́ры, что́бы подня́ться в го́ры. Я о́чень люблю́ поднима́ться в го́ры.",
        "ru": "Гора́",
        "vi": "Một ngọn núi",
        "pos": "сущ.",
        "note": "Го́ры (những ngọn núi)",
        "ex_vi": "Tôi đi đến núi để leo núi. Tôi rất thích leo núi.",
        "gender": "ж.",
        "stress": "Гора́"
      },
      {
        "ex": "Я иду́ в лес, что́бы собра́ть грибы́. Я ча́сто собира́ю грибы́ в лесу́.",
        "ru": "Лес",
        "vi": "Rừng",
        "pos": "сущ.",
        "ex_vi": "Tôi đi vào rừng để hái nấm. Tôi thường hái nấm ở trong rừng.",
        "gender": "м.",
        "stress": "Лес"
      },
      {
        "ex": "Я обы́чно обе́даю с одногру́ппниками в столо́вой.",
        "ru": "Одногру́ппник",
        "vi": "Bạn cùng lớp",
        "pos": "сущ.",
        "ex_vi": "Tôi thường ăn trưa với bạn cùng lớp ở nhà ăn.",
        "gender": "м.",
        "stress": "Одногру́ппник"
      }
    ]
  },
  {
    "id": "do_an_uong",
    "name": "Đồ ăn - Đồ uống",
    "level": "A1",
    "desc": "Món ăn chính, món tráng miệng, hoa quả, rau củ quả, đồ uống, phương tiện chế biến và thao tác nấu ăn.",
    "icon": "utensils",
    "color": "#ea580c",
    "is_system": true,
    "words": [
      {
        "ex": "Я гото́влю у́жин.",
        "ru": "гото́вить",
        "vi": "nấu ăn",
        "pos": "гл.",
        "ex_vi": "Tôi đang nấu bữa tối.",
        "aspect": "пригото́вить",
        "stress": "гото́вить",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "гото́вить + что?(C4) + в/нa чём?(С6)  (nấu cа́i gì? trong cа́i gì?)"
      },
      {
        "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́.",
        "ru": "вари́ть",
        "vi": "luộc",
        "pos": "гл.",
        "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp.",
        "aspect": "свари́ть",
        "stress": "вари́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "вари́ть + что? (C4) + в/нa чём? (C6) (luộc cа́i gì? trong cа́i gì?)"
      },
      {
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.",
        "ru": "жа́рить",
        "vi": "rán, chiên, nướng",
        "pos": "гл.",
        "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp.",
        "aspect": "изжа́рить",
        "stress": "жа́рить",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "жа́рить + что?(C4) + в/нa чём?(С6) (chiên, rа́n, nướng cа́i gì? trong cа́i gì?)"
      },
      {
        "ex": "После за́втрака я обы́чно переку́сываю шокола́дом с йо́гуртом.",
        "ru": "переку́сывать",
        "vi": "ăn nhẹ",
        "pos": "гл.",
        "ex_vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua",
        "aspect": "перекуси́ть",
        "stress": "переку́сывать",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "переку́сывать + чем?(C5) (ăn nhẹ bằng cа́i gì?)"
      },
      {
        "ex": "Я обы́чно мо́ю фру́кты и о́вощи в ра́ковине.",
        "ru": "мыть",
        "vi": "rửa",
        "pos": "гл.",
        "ex_vi": "Tôi thường rửa hoa quả và rau ở trong bồn rửa.",
        "aspect": "помы́ть",
        "stress": "мыть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "мыть + что?(C4) (rửa cа́i gì?)"
      },
      {
        "ex": "Я уже́ почи́стил э́ти я́блоки.",
        "ru": "чи́стить",
        "vi": "gọt vỏ, bóc vỏ, làm sạch",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi đã gọt xong những quả táo này,",
        "aspect": "почи́стить",
        "stress": "чи́стить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "чи́стить + что?(C4) (gọt, bóc vỏ, làm sạch cа́i gì?)"
      },
      {
        "ex": "Я нареза́ю морко́вь и помидо́ры.",
        "ru": "ре́зать",
        "vi": "cắt, thái (chung chung)",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi đang thái cà rốt và cà chua.",
        "stress": "ре́зать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ре́зать + что?(C4) (cắt cа́i gì?)"
      },
      {
        "ex": "Я чи́щу я́блоко и нареза́ю его́ на куски́.",
        "ru": "нареза́ть",
        "vi": "thái (thành nhiều miếng)",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi gọt vọt quả táo và cắt thái chúng thành nhiều miếng.",
        "aspect": "наре́зать",
        "stress": "нареза́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)"
      },
      {
        "ex": "Я разреза́ю арбу́з.",
        "ru": "разреза́ть",
        "vi": "bổ (làm đôi, làm 4)",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi bổ đôi quả dưa hấu.",
        "aspect": "разре́зать",
        "stress": "разреза́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "разреза́ть + что?(C4) (bổ đôi cа́i gì?)"
      },
      {
        "ex": "Я уже́ измельчи́л чесно́к.",
        "ru": "измельча́ть",
        "vi": "băm nhỏ, nghiền nhỏ",
        "pos": "гл.",
        "ex_vi": "Tôi đã băm nhuyễn tỏi rồi.",
        "aspect": "измельчи́ть",
        "stress": "измельча́ть",
        "collocation": "измельча́ть + что?(С4) (băm nhỏ cа́i gì?)"
      },
      {
        "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.",
        "ru": "Суп",
        "vi": "Súp",
        "pos": "сущ.",
        "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì.",
        "gender": "м.",
        "stress": "Суп"
      },
      {
        "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.",
        "ru": "Рис",
        "vi": "Cơm",
        "pos": "сущ.",
        "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cá.",
        "gender": "м.",
        "stress": "Рис"
      },
      {
        "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с рисом и ры́бой.",
        "ru": "Мя́со",
        "vi": "Thịt",
        "pos": "сущ.",
        "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cá, .",
        "gender": "ср.",
        "stress": "Мя́со"
      },
      {
        "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.",
        "ru": "Пельме́ни",
        "vi": "Pelmeni",
        "pos": "сущ.",
        "ex_vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bánh mì.",
        "gender": "м.",
        "stress": "Пельме́ни"
      },
      {
        "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.",
        "ru": "Ка́ша",
        "vi": "Cháo",
        "pos": "сущ.",
        "ex_vi": "Tôi đang nấu cháo trong nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm.",
        "gender": "ж.",
        "stress": "Ка́ша"
      },
      {
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с рисом и мя́сом.",
        "ru": "Ры́ба",
        "vi": "Cá",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp. Tôi nấu cá để ăn với cơm và với thịt.",
        "gender": "ж.",
        "stress": "Ры́ба"
      },
      {
        "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.",
        "ru": "Ку́рица",
        "vi": "Thịt gà",
        "pos": "сущ.",
        "ex_vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad.",
        "gender": "ж.",
        "stress": "Ку́рица"
      },
      {
        "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.",
        "ru": "Яйцо́",
        "vi": "Trứng",
        "pos": "сущ.",
        "ex_vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bánh mì.",
        "gender": "ср.",
        "stress": "Яйцо́"
      },
      {
        "ex": "Я сейча́с переме́шиваю сала́т в ми́ске ложкой. Я переме́шиваю сала́т, что́бы есть его́ с яйцо́м.",
        "ru": "Сала́т",
        "vi": "Salad",
        "pos": "сущ.",
        "ex_vi": "Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng.",
        "gender": "м.",
        "stress": "Сала́т"
      },
      {
        "ex": "После за́втрака я обы́чно переку́сываю шокола́дом с йогу́ртом.",
        "ru": "Шокола́д",
        "vi": "So cô la",
        "pos": "сущ.",
        "ex_vi": "Sau bữa sáng, tôi thường ăn nhẹ socola với sữa chua",
        "gender": "м.",
        "stress": "Шокола́д"
      },
      {
        "ex": "Ле́том я обы́чно ем моро́женое.",
        "ru": "Моро́женое",
        "vi": "Kem",
        "pos": "сущ.",
        "ex_vi": "Vào mùa hè, tôi thường ăn kem.",
        "gender": "ср.",
        "stress": "Моро́женое"
      },
      {
        "ex": "На ка́ждый мой день рожде́ния мама покупа́ет мне торт.",
        "ru": "Торт",
        "vi": "Bánh kem",
        "pos": "сущ.",
        "ex_vi": "Vào mỗi dịp sinh nhật của tôi, mẹ thường mua bánh kem cho tôi",
        "gender": "м.",
        "stress": "Торт"
      },
      {
        "ex": "Я обы́чно ем йогу́рт на полдни́к.",
        "ru": "Йогу́рт",
        "vi": "Sữa chua",
        "pos": "сущ.",
        "ex_vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ.",
        "gender": "м.",
        "stress": "Йогу́рт"
      },
      {
        "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.",
        "ru": "Я́блоко",
        "vi": "Táo",
        "pos": "сущ.",
        "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.",
        "gender": "ср.",
        "stress": "Я́блоко"
      },
      {
        "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.",
        "ru": "Гру́ша",
        "vi": "Lê",
        "pos": "сущ.",
        "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.",
        "gender": "ж.",
        "stress": "Гру́ша"
      },
      {
        "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чи́щу их, а зате́м нареза́ю их, что́бы съесть.",
        "ru": "Манго́",
        "vi": "Xoài",
        "pos": "сущ.",
        "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.",
        "gender": "ср.",
        "stress": "Манго́"
      },
      {
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
        "ru": "Апельси́н",
        "vi": "Cam",
        "pos": "сущ.",
        "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.",
        "gender": "м.",
        "stress": "Апельси́н"
      },
      {
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
        "ru": "Мандари́н",
        "vi": "Quýt",
        "pos": "сущ.",
        "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.",
        "gender": "м.",
        "stress": "Мандари́н"
      },
      {
        "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
        "ru": "Бана́н",
        "vi": "Chuối",
        "pos": "сущ.",
        "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.",
        "gender": "м.",
        "stress": "Бана́н"
      },
      {
        "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.",
        "ru": "Арбу́з",
        "vi": "Dưa hấu",
        "pos": "сущ.",
        "ex_vi": "Tôi bổ quả dưa hấu để mời khách ăn.",
        "gender": "м.",
        "stress": "Арбу́з"
      },
      {
        "ex": "Я мо́ю виногра́ды и кладу́ их на таре́лку.",
        "ru": "Виногра́д",
        "vi": "Nho",
        "pos": "сущ.",
        "ex_vi": "Tôi rửa sạch nho và đặt chúng lên đĩa.",
        "gender": "м.",
        "stress": "Виногра́д"
      },
      {
        "ex": "Ну́жно помы́ть карто́фель, пото́м почистить его́ и нареза́ть.",
        "ru": "Карто́фель",
        "vi": "Khoai tây",
        "pos": "сущ.",
        "note": "Danh từ luôn ở dạng số ít",
        "ex_vi": "Phải rửa sạch khoai tây, sau đó gọt vỏ chúng và thái nhỏ.",
        "gender": "м.",
        "stress": "Карто́фель"
      },
      {
        "ex": "Помо́йте помидо́ры, пото́м наре́жьте их и измельчи́те.",
        "ru": "Помидо́р",
        "vi": "Cà chua",
        "pos": "сущ.",
        "ex_vi": "Hãy rửa sạch những quả cà chua, sau đó thái nhỏ và băm nhuyễn chúng.",
        "gender": "м.",
        "stress": "Помидо́р"
      },
      {
        "ex": "Я мо́ю бата́ты, пото́м кладу́ их в кастрю́лю с водо́й и варю́.",
        "ru": "Бата́т",
        "vi": "Khoai lang",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rửa khoai lang, sau đó cho chúng vào nồi cùng với nước và nấu.",
        "gender": "м.",
        "stress": "Бата́т"
      },
      {
        "ex": "Я сейча́с мо́ю огурцы́, пото́м нареза́ю их но́жом.",
        "ru": "Огуре́ц",
        "vi": "Dưa leo",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rửa sạch dưa chuột, sau đó tôi thái nhỏ chúng bằng dao.",
        "gender": "м.",
        "stress": "Огуре́ц"
      },
      {
        "ex": "Я сейча́с мо́ю зелёный лук, пото́м нареза́ю его́ но́жом.",
        "ru": "Зелёный лук",
        "vi": "Hành lá",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rửa sạch hành lá, sau đó thái nhỏ nó bằng dao.",
        "gender": "м.",
        "stress": "Зелёный лук"
      },
      {
        "ex": "Я сейча́с чищу́ лук, пото́м разреза́ю его́ и измельча́ю но́жом.",
        "ru": "Лук",
        "vi": "Hành",
        "pos": "сущ.",
        "ex_vi": "Tôi đang bóc vỏ hành tây, sau đó bổ và băm nhỏ nó bằng dao.",
        "gender": "м.",
        "stress": "Лук"
      },
      {
        "ex": "Я сейча́с чищу́ чесно́к, пото́м раздавлива́ю и измельча́ю его́ но́жом.",
        "ru": "Чесно́к",
        "vi": "Tỏi",
        "pos": "сущ.",
        "ex_vi": "Tôi đang bóc vỏ tỏi, sau đó đập mạnh bằng dao, sau đó băm nhuyễn chúng.",
        "gender": "м.",
        "stress": "Чесно́к"
      },
      {
        "ex": "Я сейча́с мо́ю капу́сту, пото́м разреза́ю и нареза́ю её.",
        "ru": "Капу́ста",
        "vi": "Bắp cải",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rửa sạch bắp cải, sau đó bổ và thái nhỏ chúng.",
        "gender": "ж.",
        "stress": "Капу́ста"
      },
      {
        "ex": "Я сейча́с мо́ю ты́кву и чищу́ её, пото́м разреза́ю и нареза́ю её.",
        "ru": "Ты́ква",
        "vi": "Bí ngô",
        "pos": "сущ.",
        "ex_vi": "Tôi đang rửa sạch bí đỏ và gọt vỏ nó, sau đó bổ và thái nhỏ chúng.",
        "gender": "ж.",
        "stress": "Ты́ква"
      },
      {
        "ex": "Я налива́ю чай в стака́н и пью.",
        "ru": "Чай",
        "vi": "Trà",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào cốc và uống.",
        "gender": "м.",
        "stress": "Чай"
      },
      {
        "ex": "Я налива́ю молоко́ в стака́н и пью.",
        "ru": "Молоко́",
        "vi": "Sữa",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào cốc và uống.",
        "gender": "ср.",
        "stress": "Молоко́"
      },
      {
        "ex": "Я налива́ю ко́ка-ко́ла в стака́н и пью.",
        "ru": "Ко́ка-ко́ла",
        "vi": "Coca-Cola",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào cốc và uống.",
        "gender": "ж.",
        "stress": "Ко́ка-ко́ла"
      },
      {
        "ex": "Я налива́ю пи́во в стака́н и пью пи́во.",
        "ru": "Пи́во",
        "vi": "Bia",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào cốc và uống.",
        "gender": "ср.",
        "stress": "Пи́во"
      },
      {
        "ex": "Я налива́ю сок в стака́н и пью.",
        "ru": "Сок",
        "vi": "Nước ép",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào cốc và uống.",
        "gender": "м.",
        "stress": "Сок"
      },
      {
        "ex": "Я налива́ю вода́ в стака́н и пью.",
        "ru": "Вода́",
        "vi": "Nước",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào cốc và uống.",
        "gender": "ж.",
        "stress": "Вода́"
      },
      {
        "ex": "Я налива́ю вино́ в ча́шку и пью.",
        "ru": "Алкого́ль / Вино́",
        "vi": "Rượu / Vang",
        "pos": "сущ.",
        "ex_vi": "Tôi rót rượu vang vào chén và uống.",
        "gender": "ср.",
        "stress": "Алкого́ль / Вино́"
      },
      {
        "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́.",
        "ru": "Кастрю́ля",
        "vi": "Nồi",
        "pos": "сущ.",
        "note": "вари́ть / свари́ть (luộc)",
        "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp.",
        "gender": "ж.",
        "stress": "Кастрю́ля"
      },
      {
        "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́.",
        "ru": "Сковорода́",
        "vi": "Chảo",
        "pos": "сущ.",
        "note": "жа́рить / изжа́рить (rа́n)",
        "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp.",
        "gender": "ж.",
        "stress": "Сковорода́"
      },
      {
        "ex": "Я сейча́с варю́ рис в рисова́рке.",
        "ru": "Рисова́рка",
        "vi": "Nồi cơm điện",
        "pos": "сущ.",
        "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện.",
        "gender": "ж.",
        "stress": "Рисова́рка"
      },
      {
        "ex": "Я ка́ждое у́тро за́втракаю ка́шей с молоко́м.",
        "ru": "завтра́кать",
        "vi": "ăn sáng",
        "pos": "гл.",
        "ex_vi": "Mỗi sáng tôi đều ăn sáng bằng cháo với sữa.",
        "aspect": "поза́втракать",
        "stress": "завтра́кать",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "за́втракать + чем?(C5) (ăn sа́ng bằng gì?)"
      },
      {
        "ex": "Я обы́чно обе́даю су́пом с хле́бом.",
        "ru": "обе́дать",
        "vi": "ăn trưa",
        "pos": "гл.",
        "ex_vi": "Tôi thường ăn trưa bằng súp với bánh mì.",
        "aspect": "пообе́дать",
        "stress": "обе́дать",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "обе́дать + чем?(C5) (ăn trưa bằng gì?)"
      },
      {
        "ex": "Вчера́ я поу́жинала рисом с ры́бой.",
        "ru": "у́жинать",
        "vi": "ăn tối",
        "pos": "гл.",
        "ex_vi": "Hôm qua tôi đã ăn tối bằng cơm với cá.",
        "aspect": "поу́жинать",
        "stress": "у́жинать",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "у́жинать + чем?(C5) (ăn tối bằng gì?)"
      },
      {
        "ex": "Я ем ка́шу на за́втрак.",
        "ru": "За́втрак",
        "vi": "Bữa sáng",
        "pos": "сущ.",
        "note": "нa за́втрак (vào bữa sа́ng)",
        "ex_vi": "Tôi ăn cháo vào bữa sáng.",
        "gender": "м.",
        "stress": "За́втрак"
      },
      {
        "ex": "Я ем суп на обе́д.",
        "ru": "Обе́д",
        "vi": "Bữa trưa",
        "pos": "сущ.",
        "note": "нa обе́д (vào bữa trưa)",
        "ex_vi": "Tôi ăn súp vào bữa trưa.",
        "gender": "м.",
        "stress": "Обе́д"
      },
      {
        "ex": "Я ем ры́бу с рисом на у́жин.",
        "ru": "У́жин",
        "vi": "Bữa tối",
        "pos": "сущ.",
        "note": "нa у́жин (vào bữa tối)",
        "ex_vi": "Tôi ăn cá với cơm vào bữa tối.",
        "gender": "м.",
        "stress": "У́жин"
      },
      {
        "ex": "Я обы́чно ем йогу́рт на полдни́к.",
        "ru": "Полдни́к",
        "vi": "Bữa phụ",
        "pos": "сущ.",
        "note": "нa полдни́к (vào bữa phụ)",
        "ex_vi": "Tôi thường ăn nhẹ sữa chua vào bữa phụ.",
        "gender": "м.",
        "stress": "Полдни́к"
      }
    ]
  },
  {
    "id": "do_dung_gia_dinh",
    "name": "Đồ dùng gia đình",
    "level": "A1",
    "desc": "Nội thất, đồ gia dụng trong phòng khách, phòng bếp, phòng ngủ, phòng tắm, phòng giặt kèm thao tác sử dụng.",
    "icon": "home",
    "color": "#d97706",
    "is_system": true,
    "words": [
      {
        "ex": "Я купи́л фру́кты, сейча́с я мо́ю их в ра́ковине.",
        "ru": "мыть",
        "vi": "rửa",
        "pos": "гл.",
        "ex_vi": "Tôi đã mua hoa quả, bây giờ tôi đang rửa chúng trong bồn rửa.",
        "aspect": "вы́мыть",
        "stress": "мыть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "мыть + что?(C4) (rửa cа́i gì?)"
      },
      {
        "ex": "На столе́ вода́, поэ́тому я беру́ полоте́нце, что́бы вы́тереть стол.",
        "ru": "вытира́ть",
        "vi": "lau khô (loại bỏ nước)",
        "pos": "гл.",
        "syn": "протира́ть / протере́ть (lau chùi) (loại bỏ bụi bẩn)",
        "ex_vi": "Trên bàn có nước, nên tôi lấy khăn để lau bàn.",
        "aspect": "вы́тереть",
        "stress": "вытира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "вытира́ть + что?(C4) (lau khô cа́i gì?)"
      },
      {
        "ex": "Я бра́л молоко́ из холоди́льника.",
        "ru": "брать",
        "vi": "lấy ra, cầm lên",
        "ant": "убира́ть / убра́ть (cất vào)",
        "pos": "гл.",
        "syn": "держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thái cầm trên tay)",
        "note": "nhấn mạnh hành động cầm lên",
        "ex_vi": "Tôi đã lấy sữa từ tủ lạnh ra.",
        "aspect": "взять",
        "stress": "брать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "брать + что?(C4) (lấy,cầm lên cа́i gì?)"
      },
      {
        "ex": "Я убра́л молоко́ в холоди́льник.",
        "ru": "убира́ть",
        "vi": "cất vào",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "pos": "гл.",
        "ex_vi": "Tôi đã cất sữa vào tủ lạnh.",
        "aspect": "убра́ть",
        "stress": "убира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)"
      },
      {
        "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.",
        "ru": "открыва́ть",
        "vi": "mở ra",
        "ant": "закрыва́ть / закры́ть (đóng vào)",
        "pos": "гл.",
        "ex_vi": "Tôi đã mở cửa sổ ra để thông gió phòng.",
        "aspect": "окры́ть",
        "stress": "открыва́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "открыbа́ть + что?(C4) (mở cа́i gì?)"
      },
      {
        "ex": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.",
        "ru": "закрыва́ть",
        "vi": "đóng vào",
        "ant": "открыва́ть / откры́ть (mở ra)",
        "pos": "гл.",
        "ex_vi": "Tôi đã thông gió phòng xong rồi, nên tôi sẽ đóng cửa sổ vào.",
        "aspect": "закры́ть",
        "stress": "закрыва́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "закрыbа́ть + что?(C4) (đóng, khóa cа́i gì?)"
      },
      {
        "ex": "Я включи́л телеви́зор, что́бы посмотре́ть фильм.",
        "ru": "включа́ть",
        "vi": "bật lên",
        "ant": "выключа́ть / вы́ключить (tắt đi)",
        "pos": "гл.",
        "ex_vi": "Tôi đã bật tivi lên để xem phim.",
        "aspect": "включи́ть",
        "stress": "включа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "включа́ть + что?(C4) (bật cа́i gì?)"
      },
      {
        "ex": "Я вы́ключил свет, что́бы спать.",
        "ru": "выключа́ть",
        "vi": "tắt đi",
        "ant": "включа́ть / включи́ть (bật lên)",
        "pos": "гл.",
        "ex_vi": "Tôi tắt đèn để đi ngủ.",
        "aspect": "вы́ключить",
        "stress": "выключа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "выключа́ть + что?(C4) (tắt cа́i gì?)"
      },
      {
        "ex": "Я постели́л ковёр, что́бы поста́вить еду́ на него́.",
        "ru": "стели́ть",
        "vi": "trải ra",
        "ant": "свора́чивать / сверну́ть (cuộn vào)\nскла́дывать / сложи́ть (gấp lại)",
        "pos": "гл.",
        "ex_vi": "Tôi trải thảm ra để đặt đồ ăn lên.",
        "aspect": "постели́ть",
        "stress": "стели́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "стели́ть + что?(C4) (trải cа́i gì?)"
      },
      {
        "ex": "Я сверну́л ковёр и убра́л его́ в шкаф.",
        "ru": "свора́чивать",
        "vi": "cuộn vào",
        "ant": "стели́ть / постели́ть (trải ra)",
        "pos": "гл.",
        "syn": "скла́дывать / сложи́ть (gấp lại)",
        "ex_vi": "Tôi đã cuộn thảm vào và đã cất vảo tủ.",
        "aspect": "сверну́ть",
        "stress": "свора́чивать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "свора́чивать + что?(C4) (cuộn cа́i gì?)"
      },
      {
        "ex": "Я постира́л руба́шку рука́ми.",
        "ru": "стира́ть",
        "vi": "giặt giũ",
        "ant": "суши́ть / вы́сушить (phơi khô)",
        "pos": "гл.",
        "ex_vi": "Tôi đã giặt áo sơ mi bằng tay.",
        "aspect": "постира́ть",
        "stress": "стира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "стира́ть + что?(C4) (giặt cа́i gì?)"
      },
      {
        "ex": "Я ве́шаю оде́жду на суши́лку, что́бы вы́сушить её.",
        "ru": "суши́ть",
        "vi": "phơi khô",
        "ant": "стира́ть / постира́ть (giặt giũ)",
        "pos": "гл.",
        "ex_vi": "Tôi đang treo quần áo lên giàn phơi để phơi khô đồ.",
        "aspect": "вы́сушить",
        "stress": "суши́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "суши́ть + что?(C4) (phơi khô cа́i gì?)"
      },
      {
        "ex": "Я раскла́дываю ве́щи на столе́.",
        "ru": "раскла́дывать",
        "vi": "bày ra",
        "ant": "собира́ть / собра́ть (thu gom lại)",
        "pos": "гл.",
        "ex_vi": "Tôi đang bày đồ đạc lên bàn.",
        "aspect": "разложи́ть",
        "stress": "раскла́дывать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "раскла́дывать + что?(C4) (trải ra, bày ra cа́i gì?)"
      },
      {
        "ex": "Я собира́ю ве́щи на столе́.",
        "ru": "собира́ть",
        "vi": "thu gom",
        "ant": "раскла́дывать / разложи́ть (bày ra)",
        "pos": "гл.",
        "note": "Nghĩa khа́c: thu hoạch, sưu tầm",
        "ex_vi": "Tôi đang thu gom đồ đạc ở trên bàn.",
        "aspect": "собра́ть",
        "stress": "собира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "собира́ть + что?(C4) (thu gom cа́i gì?)"
      },
      {
        "ex": "Я поста́вил ва́зу на стол.",
        "ru": "ста́вить",
        "vi": "đặt đứng",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "pos": "гл.",
        "syn": "класть / положи́ть (đặt nằm)",
        "ex_vi": "Tôi đã đặt lọ hoa lên trên bàn.",
        "aspect": "поста́вить",
        "stress": "ста́вить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)"
      },
      {
        "ex": "Я кладу́ телефо́н и кни́гу на крова́ть.",
        "ru": "класть",
        "vi": "đặt nằm",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "pos": "гл.",
        "syn": "ста́вить / поста́вить (đặt đứng)",
        "ex_vi": "Tôi đang đặt điện thoại và quyển sách lên trên giường.",
        "aspect": "положи́ть",
        "stress": "класть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "класть + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)"
      },
      {
        "ex": "Я вы́ключил плиту́ и снял кастрю́лю с плиты́.",
        "ru": "снима́ть",
        "vi": "nhấc lên",
        "ant": "(1) ста́вить / поста́вить (đặt xuống) (đứng)\n(2) класть / положи́ть (đặt xuống) (nằm)",
        "pos": "гл.",
        "syn": "брать / взять (cầm lên)",
        "note": "Nghĩa khа́c: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video), снима́ть оде́жду (cởi quần а́o)",
        "ex_vi": "Tôi đã tắt bếp và nhấc nồi ra khỏi bếp.",
        "aspect": "снять",
        "stress": "снима́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "снима́ть + что?(C4) + с/из чего?(C2) (nhấc cа́i gì? khỏi đâu?)"
      },
      {
        "ex": "Я гла́жу руба́шку.",
        "ru": "гла́дить (оде́жду)",
        "vi": "ủi (quần áo)",
        "pos": "гл.",
        "ex_vi": "Tôi đang ủi áo sơ mi.",
        "aspect": "погла́дить (оде́жду)",
        "stress": "гла́дить (оде́жду)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "гла́дить + что?(C4) (là,ủi cа́i gì?)"
      },
      {
        "ex": "Я протира́ю стол и сту́лья.",
        "ru": "протира́ть",
        "vi": "lau chùi (loại bỏ bụi bẩn)",
        "pos": "гл.",
        "syn": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)",
        "ex_vi": "Tôi đang lau chùi bàn ghế.",
        "aspect": "протере́ть",
        "stress": "протира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "протира́ть + что?(C4) (lau chùi cа́i gì?)"
      },
      {
        "ex": "Я пове́сил зе́ркало на сте́ну в ва́нной.",
        "ru": "ве́шать",
        "vi": "treo",
        "pos": "гл.",
        "ex_vi": "Tôi đã treo gương lên trên tường ở trong phòng tắm.",
        "aspect": "пове́сить",
        "stress": "ве́шать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)"
      },
      {
        "ex": "Я чи́щу унита́з и ва́нну.",
        "ru": "чи́стить",
        "vi": "cọ rửa, làm sạch",
        "pos": "гл.",
        "note": "(1) nhấn mạnh việc dùng lực để làm sạch đồ vật\n(2) чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi đang cọ rửa bồn cầu và bồn tắm.",
        "aspect": "почи́стить",
        "stress": "чи́стить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "чи́стить + что?(C4) (làm sạch/gọt cа́i gì?)"
      },
      {
        "ex": "Я сижу́ за сту́лом, что́бы учи́ться.",
        "ru": "сиде́ть",
        "vi": "ngồi",
        "ant": "(1) стоя́ть (đứng)\n(2) лежа́ть (nằm)",
        "pos": "гл.",
        "note": "nhấn mạnh trạng thа́i đang ngồi",
        "ex_vi": "Tôi ngồi vào ghế để học.",
        "stress": "сиде́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "сиде́ть + где?(C6) (ngồi ở đâu?)"
      },
      {
        "ex": "Я украша́ю гости́ную цвето́чным горшко́м.",
        "ru": "украша́ть",
        "vi": "trang trí",
        "pos": "гл.",
        "ex_vi": "Tôi trang trí phòng khách bằng chậu hoa.",
        "aspect": "укра́сить",
        "stress": "украша́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 5",
        "collocation": "украша́ть + что?(C4) + чем?(C5) (trang trí cа́i gì? bằng cа́i gì?)"
      },
      {
        "ex": "Я лежу́ на ковре́ и чита́ю кни́гу в па́рке.",
        "ru": "лежа́ть",
        "vi": "nằm",
        "ant": "(1) сиде́ть (ngồi)\n(2) стоя́ть (đứng)",
        "pos": "гл.",
        "ex_vi": "Tôi đang nằm trên thảm và đọc sách ở công viên.",
        "stress": "лежа́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "лежа́ть + где?(C6) (nằm ở đâu?)"
      },
      {
        "ex": "Я храню́ посу́ду в ку́хонном шкафу́.",
        "ru": "храни́ть",
        "vi": "giữ gìn, cất giữ, lưu trữ",
        "pos": "гл.",
        "ex_vi": "Tôi cất giữ bát đĩa ở trong tủ bếp.",
        "aspect": "сохрани́ть",
        "stress": "храни́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "храни́ть + что?(C4) (lưu giữ,bảo quản cа́i gì?)"
      },
      {
        "ex": "Я ложи́лся спать на дива́не весь день.",
        "ru": "ложи́ться спать",
        "vi": "ngủ",
        "pos": "гл.",
        "ex_vi": "Tôi đã ngủ trên sô pha cả ngày.",
        "aspect": "лечь спать",
        "stress": "ложи́ться спать",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "ложи́ться спать + где?(C6) (ngủ ở đâu)"
      },
      {
        "ex": "Я смотрю́ фильм по компью́теру в спа́льне.",
        "ru": "смотре́ть",
        "vi": "xem",
        "pos": "гл.",
        "ex_vi": "Tôi xem phim trên máy tính ở trong phòng ngủ.",
        "aspect": "посмотре́ть",
        "stress": "смотре́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem cа́i gì?)"
      },
      {
        "ex": "Я обы́чно отдыха́ю на дива́не.",
        "ru": "отдыха́ть",
        "vi": "nghỉ ngơi",
        "pos": "гл.",
        "ex_vi": "Tôi thường nghỉ ngơi trên ghế sô pha.",
        "aspect": "отдохну́ть",
        "stress": "отдыха́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "отдыха́ть + где?(C6) (nghỉ ngơi ở đâu?)"
      },
      {
        "ex": "Я сажа́ю цветы́ в цвето́чный горшо́к.",
        "ru": "сажа́ть (цветы́)",
        "vi": "trồng (hoa)",
        "pos": "гл.",
        "ex_vi": "Tôi trồng hoa vào trong chậu hoa.",
        "aspect": "посади́ть (цветы́)",
        "stress": "сажа́ть (цветы́)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "сажа́ть + что?(C4) (trồng cа́i gì?)"
      },
      {
        "ex": "Я рабо́таю за столо́м.",
        "ru": "рабо́тать",
        "vi": "làm việc",
        "pos": "гл.",
        "ex_vi": "Tôi làm việc trên bàn.",
        "stress": "рабо́тать",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "рабо́тать + где?(C6) (làm việc ở đâu?)"
      },
      {
        "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.",
        "ru": "прове́тривать (ко́мнату)",
        "vi": "thông gió (phòng)",
        "pos": "гл.",
        "ex_vi": "Tôi đã mở cửa sổ để thông gió phòng.",
        "aspect": "прове́трить (ко́мнату)",
        "stress": "прове́тривать (ко́мнату)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "прове́тривать + что?(C4) (thông gió, làm thoа́ng cа́i gì?)"
      },
      {
        "ex": "Я ем рис с мя́сом.",
        "ru": "есть",
        "vi": "ăn",
        "pos": "гл.",
        "ex_vi": "Tôi đang ăn cơm với thịt.",
        "aspect": "съесть",
        "stress": "есть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "есть + что?(C4) (ăn cа́i gì?)"
      },
      {
        "ex": "Я гото́влю ка́шу.",
        "ru": "гото́вить",
        "vi": "nấu",
        "pos": "гл.",
        "ex_vi": "Tôi đang nấu cháo.",
        "aspect": "пригото́вить",
        "stress": "гото́вить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "гото́вить + что?(C4) (nấu cа́i gì?)"
      },
      {
        "ex": "Я варю́ яйца́ в кастрю́ле.",
        "ru": "вари́ть",
        "vi": "luộc",
        "pos": "гл.",
        "ex_vi": "Tôi đang luộc trứng trong nồi.",
        "aspect": "свари́ть",
        "stress": "вари́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "вари́ть + что?(C4) (luộc cа́i gì?)"
      },
      {
        "ex": "Я пью́ сок я́блока.",
        "ru": "пить",
        "vi": "uống",
        "pos": "гл.",
        "ex_vi": "Tôi đang uống nước ép táo.",
        "aspect": "вы́пить",
        "stress": "пить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "пить + что?(C4) (uống cа́i gì?)"
      },
      {
        "ex": "Я жа́рю ры́бу на сковороде́.",
        "ru": "жа́рить",
        "vi": "rán",
        "pos": "гл.",
        "ex_vi": "Tôi đang rán cá trên chảo.",
        "aspect": "пожа́рить",
        "stress": "жа́рить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "жа́рить + что?(C4) (chiên, rа́n cа́i gì?)"
      },
      {
        "ex": "Я принима́ю ва́нну.",
        "ru": "принима́ть (ванну)",
        "vi": "tắm bồn",
        "pos": "гл.",
        "ex_vi": "Tôi đang tắm bồn.",
        "aspect": "приня́ть (ванну)",
        "stress": "принима́ть (ванну)"
      },
      {
        "ex": "Я ре́жу морко́вь и помидо́ры.",
        "ru": "ре́зать",
        "vi": "cắt, thái (chung chung)",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi đang thái cà rốt và cà chua.",
        "stress": "ре́зать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ре́зать + что?(C4) (cắt cа́i gì?)"
      },
      {
        "ex": "Я чи́щу я́блоко и нареза́ю его́ на куски́.",
        "ru": "нареза́ть",
        "vi": "thái (thành nhiều miếng)",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi đang gọt vỏ táo và cắt chúng thành nhiều miếng.",
        "aspect": "наре́зать",
        "stress": "нареза́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "нареза́ть + что?(C4) (cắt thа́i thành miếng cа́i gì?)"
      },
      {
        "ex": "Я разреза́ю арбу́з",
        "ru": "разреза́ть",
        "vi": "bổ (làm đôi, làm 4)",
        "pos": "гл.",
        "note": "чи́стить, ре́зать, нареза́ть, разреза́ть (gọt, cắt, thа́i, bổ)",
        "ex_vi": "Tôi đang bổ quả dưa hấu.",
        "aspect": "разре́зать",
        "stress": "разреза́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "разреза́ть + что?(C4) (bổ đôi cа́i gì?)"
      },
      {
        "ex": "Я вошёл в ко́мнату.",
        "ru": "войти́ / входи́ть (в ко́мнату)",
        "vi": "đi (vào phòng)",
        "ant": "вы́йти / выходи́ть (из ко́мнаты): đi ra (khỏi phòng)",
        "pos": "гл.",
        "ex_vi": "Tôi đã đi vào trong phòng.",
        "stress": "войти́ / входи́ть (в ко́мнату)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "войти́ / входи́ть + куда?(C4) (đi vào trong đâu?)"
      },
      {
        "ex": "Я вы́шел из до́ма.",
        "ru": "вы́йти / выходи́ть (из ко́мнаты)",
        "vi": "đi ra (khỏi phòng)",
        "ant": "войти́ / входи́ть (в ко́мнату): đi (vào phòng)",
        "pos": "гл.",
        "ex_vi": "Tôi đã đi ra khỏi nhà.",
        "stress": "вы́йти / выходи́ть (из ко́мнаты)",
        "verb_obj": "Động từ đi với cách 2",
        "collocation": "вы́йти / выходи́ть + из чего?(C2) (đi ra khỏi cа́i gì?)"
      },
      {
        "ex": "Я хочу́ в туале́т.",
        "ru": "в туале́т",
        "vi": "đi vệ sinh",
        "pos": "нар.",
        "ex_vi": "Tôi muốn đi vệ sinh.",
        "stress": "в туале́т"
      },
      {
        "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.",
        "ru": "Дива́н",
        "vi": "Ghế sopha",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt sopha ở phòng khách để ngồi và xem phim.",
        "gender": "м.",
        "stress": "Дива́н"
      },
      {
        "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.",
        "ru": "Стол",
        "vi": "Bàn",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó.",
        "gender": "м.",
        "stress": "Стол"
      },
      {
        "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.",
        "ru": "Ва́за",
        "vi": "Bình hoa",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào trong nó.",
        "gender": "ж.",
        "stress": "Ва́за"
      },
      {
        "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.",
        "ru": "Ту́мба",
        "vi": "Tủ/kệ nhỏ có ngăn kéo",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt tủ ở phòng khách để đặt tivi lên trên nó.",
        "gender": "ж.",
        "stress": "Ту́мба"
      },
      {
        "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.",
        "ru": "Телеви́зор",
        "vi": "Ti vi",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt tivi trên kệ, sau đó bật nó lên để xem phim.",
        "gender": "м.",
        "stress": "Телеви́зор"
      },
      {
        "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.",
        "ru": "Цвето́чный горшо́к",
        "vi": "Chậu cây",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt chậu cây ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách.",
        "gender": "м.",
        "stress": "Цвето́чный горшо́к"
      },
      {
        "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.",
        "ru": "Ковёр",
        "vi": "Thảm",
        "pos": "сущ.",
        "ex_vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ.",
        "gender": "м.",
        "stress": "Ковёр"
      },
      {
        "ex": "Я открыва́ю дверь, что́бы войти́ в дом.",
        "ru": "Дверь",
        "vi": "Cửa ra vào",
        "pos": "сущ.",
        "ex_vi": "Tôi mở cửa để đi vào trong nhà.",
        "gender": "ж.",
        "stress": "Дверь"
      },
      {
        "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.",
        "ru": "Окно́",
        "vi": "Cửa sổ",
        "pos": "сущ.",
        "ex_vi": "Tôi mở cửa sổ vào buổi sáng để thông gió phòng.",
        "gender": "ср.",
        "stress": "Окно́"
      },
      {
        "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним.",
        "ru": "Стол",
        "vi": "Bàn",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó.",
        "gender": "м.",
        "stress": "Стол"
      },
      {
        "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.",
        "ru": "(Кухо́нный) шкаф",
        "vi": "Tủ bếp",
        "pos": "сущ.",
        "ex_vi": "Tôi mở tủ để đặt đĩa vào trong và lấy nồi ra, sau đó tôi đóng nó lại.",
        "gender": "м.",
        "stress": "(Кухо́нный) шкаф"
      },
      {
        "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.",
        "ru": "Холоди́льник",
        "vi": "Tủ lạnh",
        "pos": "сущ.",
        "ex_vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon.",
        "gender": "м.",
        "stress": "Холоди́льник"
      },
      {
        "ex": "Я варю́ суп на плите́.",
        "ru": "Плита́",
        "vi": "Bếp",
        "pos": "сущ.",
        "ex_vi": "Tôi nấu súp trên bếp.",
        "gender": "ж.",
        "stress": "Плита́"
      },
      {
        "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.",
        "ru": "Кастрю́ля",
        "vi": "Nồi",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt nồi lên bếp để nấu súp.",
        "gender": "ж.",
        "stress": "Кастрю́ля"
      },
      {
        "ex": "Когда́ я пожарю́ мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.",
        "ru": "Сковорода́",
        "vi": "Chảo",
        "pos": "сущ.",
        "ex_vi": "Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ.",
        "gender": "ж.",
        "stress": "Сковорода́"
      },
      {
        "ex": "Я режу́ хлеб ножо́м, нареза́ю мя́со, чищу я́блоки и разреза́ю арбу́з ножо́м.",
        "ru": "Нож",
        "vi": "Dao",
        "pos": "сущ.",
        "ex_vi": "Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao.",
        "gender": "м.",
        "stress": "Нож"
      },
      {
        "ex": "Я ем суп ло́жкой.",
        "ru": "Ло́жка",
        "vi": "Thìa",
        "pos": "сущ.",
        "ex_vi": "Tôi ăn súp bằng thìa.",
        "gender": "ж.",
        "stress": "Ло́жка"
      },
      {
        "ex": "Я ем мя́со ви́лкой.",
        "ru": "Ви́лка",
        "vi": "Dĩa",
        "pos": "сущ.",
        "ex_vi": "Tôi ăn thịt bằng dĩa.",
        "gender": "ж.",
        "stress": "Ви́лка"
      },
      {
        "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.",
        "ru": "Таре́лка",
        "vi": "Đĩa",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt đĩa lên bàn và đặt trứng rán lên.",
        "gender": "ж.",
        "stress": "Таре́лка"
      },
      {
        "ex": "Я налива́ю суп в ми́ску.",
        "ru": "Ми́ска",
        "vi": "Bát",
        "pos": "сущ.",
        "ex_vi": "Tôi đổ súp vào bát.",
        "gender": "ж.",
        "stress": "Ми́ска"
      },
      {
        "ex": "Я налива́ю чай в ча́шку, что́бы пить.",
        "ru": "Ча́шка",
        "vi": "Tách, chén",
        "pos": "сущ.",
        "ex_vi": "Tôi rót trà vào tách để uống",
        "gender": "ж.",
        "stress": "Ча́шка"
      },
      {
        "ex": "Я налива́ю во́ду в стака́н, что́бы пить.",
        "ru": "Стака́н",
        "vi": "Cốc",
        "pos": "сущ.",
        "ex_vi": "Tôi rót nước vào cốc để uống",
        "gender": "м.",
        "stress": "Стака́н"
      },
      {
        "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.",
        "ru": "(Раздело́чная) доска́",
        "vi": "Thớt",
        "pos": "сущ.",
        "ex_vi": "Tôi đặt thớt lên bàn để thái rau trên nó.",
        "gender": "ж.",
        "stress": "(Раздело́чная) доска́"
      },
      {
        "ex": "Я мо́ю посу́ду в ра́ковине.",
        "ru": "Ра́ковина",
        "vi": "Bồn rửa",
        "pos": "сущ.",
        "ex_vi": "Tôi rửa bát đĩa trong bồn rửa.",
        "gender": "ж.",
        "stress": "Ра́ковина"
      },
      {
        "ex": "Я храню́ проду́кты в корзи́не.",
        "ru": "Корзи́на",
        "vi": "Giỏ",
        "pos": "сущ.",
        "ex_vi": "Tôi đựng thực phẩm trong giỏ.",
        "gender": "ж.",
        "stress": "Корзи́на"
      },
      {
        "ex": "Я ложу́сь спать на крова́ти.",
        "ru": "Крова́ть",
        "vi": "Giường",
        "pos": "сущ.",
        "ex_vi": "Tôi ngủ trên giường.",
        "gender": "ж.",
        "stress": "Крова́ть"
      },
      {
        "ex": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).",
        "ru": "Шкаф",
        "vi": "Tủ quần áo",
        "pos": "сущ.",
        "ex_vi": "Tôi mở tủ quần áo ra để cất quần áo vào (trong nó).",
        "gender": "м.",
        "stress": "Шкаф"
      },
      {
        "ex": "Я включа́ю компью́тер, что́бы рабо́тать.",
        "ru": "Компью́тер",
        "vi": "Máy tính",
        "pos": "сущ.",
        "ex_vi": "Tôi bật máy tính lên để làm việc.",
        "gender": "м.",
        "stress": "Компью́тер"
      },
      {
        "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.",
        "ru": "Ла́мпа",
        "vi": "Đèn ngủ, đèn học",
        "pos": "сущ.",
        "ex_vi": "Tôi bật đèn lên để đọc sách.",
        "gender": "ж.",
        "stress": "Ла́мпа"
      },
      {
        "ex": "Я учу́сь за (письме́нным) столо́м.",
        "ru": "(Письме́нный) стол",
        "vi": "Bàn làm việc",
        "pos": "сущ.",
        "ex_vi": "Tôi học tại bàn.",
        "gender": "м.",
        "stress": "(Письме́нный) стол"
      },
      {
        "ex": "Я сижу́ за сту́лом, что́бы рабо́тать.",
        "ru": "Стул",
        "vi": "Ghế",
        "pos": "сущ.",
        "ex_vi": "Tôi ngồi vào ghế để làm việc.",
        "gender": "м.",
        "stress": "Стул"
      },
      {
        "ex": "Я ве́шаю зе́ркало на стену́, что́бы смотре́ть (в него́).",
        "ru": "Зе́ркало",
        "vi": "Gương",
        "pos": "сущ.",
        "ex_vi": "Tôi treo gương lên tường để soi gương.",
        "gender": "ср.",
        "stress": "Зе́ркало"
      },
      {
        "ex": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.",
        "ru": "По́лка",
        "vi": "Kệ",
        "pos": "сущ.",
        "ex_vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó).",
        "gender": "ж.",
        "stress": "По́лка"
      },
      {
        "ex": "Я принима́ю ва́нну.",
        "ru": "Ва́нна",
        "vi": "Bồn tắm",
        "pos": "сущ.",
        "ex_vi": "Tôi đang tắm.",
        "gender": "ж.",
        "stress": "Ва́нна"
      },
      {
        "ex": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.",
        "ru": "Крючо́к",
        "vi": "Móc treo",
        "pos": "сущ.",
        "ex_vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó).",
        "gender": "м.",
        "stress": "Крючо́к"
      },
      {
        "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.",
        "ru": "Полоте́нце",
        "vi": "Khăn tắm",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy khăn từ móc treo để lau người.",
        "gender": "ср.",
        "stress": "Полоте́нце"
      },
      {
        "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.",
        "ru": "Унита́з",
        "vi": "Bồn cầu",
        "pos": "сущ.",
        "ex_vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn.",
        "gender": "м.",
        "stress": "Унита́з"
      },
      {
        "ex": "Я стира́ю оде́жду в стира́льной маши́не.",
        "ru": "Стира́льная маши́на",
        "vi": "Máy giặt",
        "pos": "сущ.",
        "ex_vi": "Tôi giặt quần áo trong máy giặt.",
        "gender": "ж.",
        "stress": "Стира́льная маши́на"
      },
      {
        "ex": "Я гла́жу руба́шку утюго́м.",
        "ru": "Утю́г",
        "vi": "Bàn là",
        "pos": "сущ.",
        "ex_vi": "Tôi là áo sơ mi bằng bàn là.",
        "gender": "м.",
        "stress": "Утю́г"
      },
      {
        "ex": "Я гла́жу оде́жду на глади́льной доске́.",
        "ru": "Глади́льная доска́",
        "vi": "Cầu là (bàn để là quần áo)",
        "pos": "сущ.",
        "ex_vi": "Tôi là quần áo trên cầu là.",
        "gender": "ж.",
        "stress": "Глади́льная доска́"
      },
      {
        "ex": "Я сушу́ оде́жду на суши́лке.",
        "ru": "Суши́лка",
        "vi": "Giàn phơi",
        "pos": "сущ.",
        "ex_vi": "Tôi phơi quần áo trên giàn phơi đồ.",
        "gender": "ж.",
        "stress": "Суши́лка"
      },
      {
        "ex": "Я налива́ю во́ду в стака́н, что́бы пить.",
        "ru": "налива́ть",
        "vi": "rót, đổ",
        "pos": "гл.",
        "ex_vi": "Tôi rót nước vào cốc để uống",
        "aspect": "нали́ть",
        "stress": "налива́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "налиbа́ть + что?(С4) + куда?(С4) (đổ, rót cа́i gì? vào đâu?)"
      }
    ]
  },
  {
    "id": "do_dung_hoc_tap",
    "name": "Đồ dùng học tập",
    "level": "A1",
    "desc": "Dụng cụ học tập, sách vở, tài liệu, thiết bị giảng đường và bảng lớp.",
    "icon": "book-open",
    "color": "#7c3aed",
    "is_system": true,
    "words": [
      {
        "ex": "Я беру́ пена́л и кни́гу из рюкзака́.",
        "ru": "брать",
        "vi": "lấy ra, cầm lên",
        "ant": "убира́ть / убра́ть (cất vào)",
        "pos": "гл.",
        "syn": "держа́ть / подержа́ть (сầm) (nhấn mạnh trạng thái cầm trên tay)",
        "note": "nhấn mạnh hành động cầm lên",
        "ex_vi": "Tôi đang lấy hộp bút và sách từ trong cặp ra.",
        "aspect": "взять",
        "stress": "брать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "брать + что?(C4) (lấy,cầm lên cа́i gì?)"
      },
      {
        "ex": "Я убира́ю пена́л и кни́гу в рюкза́к.",
        "ru": "убира́ть",
        "vi": "cất vào",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "pos": "гл.",
        "ex_vi": "Tôi đang cất hộp bút và sách vào trong cặp.",
        "aspect": "убра́ть",
        "stress": "убира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "убира́ть + что?(C4) (dọn dẹp, cất cа́i gì?)"
      },
      {
        "ex": "Я держу́ рюкза́к.",
        "ru": "держа́ть",
        "vi": "cầm",
        "pos": "гл.",
        "syn": "брать / взять (cầm lên) (nhấn mạnh hành động cầm lên)",
        "note": "nhấn mạnh trạng thа́i cầm trên tay",
        "ex_vi": "Tôi đang cầm cặp sách.",
        "aspect": "подержа́ть",
        "stress": "держа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "держа́ть + что?(C4) (cầm, giữ cа́i gì?)"
      },
      {
        "ex": "Я ста́влю кни́гу на по́лку.",
        "ru": "ста́вить",
        "vi": "đặt đứng",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "pos": "гл.",
        "note": "класть / положи́ть (đặt nằm)",
        "ex_vi": "Tôi đặt quyển sách (chiều đứng) lên trên kệ.",
        "aspect": "поста́вить",
        "stress": "ста́вить",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ста́вить + что? (C4) + куда?(C4) (đặt để cа́i gì? ở đâu?)"
      },
      {
        "ex": "Я кладу́ кни́гу на стол.",
        "ru": "класть",
        "vi": "đặt nằm",
        "ant": "брать / взять (lấy ra, cầm lên)",
        "pos": "гл.",
        "note": "ста́вить / поста́вить (đặt đứng)",
        "ex_vi": "Tôi đặt quyển sách (chiều nằm) lên trên bàn.",
        "aspect": "положи́ть",
        "stress": "класть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "класть + что? (C4) +  куда?(C4) (đặt để cа́i gì? ở đâu?)"
      },
      {
        "ex": "Я открыва́ю колпачо́к маркёра.",
        "ru": "Колпачо́к",
        "vi": "Cái nắp",
        "pos": "сущ.",
        "ex_vi": "Tôi đang mở nắp bút dạ ra.",
        "gender": "м.",
        "stress": "Колпачо́к"
      },
      {
        "ex": "Я откры́л окно́, что́бы прове́трить ко́мнату.",
        "ru": "открыва́ть",
        "vi": "mở ra",
        "ant": "закрыва́ть / закры́ть (đóng vào)",
        "pos": "гл.",
        "ex_vi": "Tôi đã mở cửa sổ ra để thông gió phòng.",
        "aspect": "откры́ть",
        "stress": "открыва́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "открыbа́ть + что?(C4) (mở cа́i gì?)"
      },
      {
        "ex": "Я прове́трил ко́мнату, поэ́тому я закро́ю окно́.",
        "ru": "закрыва́ть",
        "vi": "đóng vào",
        "ant": "открыва́ть / откры́ть (mở ra)",
        "pos": "гл.",
        "ex_vi": "Tôi đã thông gió phòng xong, vì vậy tôi sẽ đóng cửa sổ vào.",
        "aspect": "закры́ть",
        "stress": "закрыва́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "закрыbа́ть + что?(C4) (đóng, khóa cа́i gì?)"
      },
      {
        "ex": "Я включа́ю компью́тер, что́бы игра́ть в компью́терные игры́.",
        "ru": "включа́ть",
        "vi": "bật lên",
        "ant": "выключа́ть / вы́ключить (tắt đi)",
        "pos": "гл.",
        "ex_vi": "Tôi bật máy tính lên để chơi game.",
        "aspect": "включи́ть",
        "stress": "включа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "включа́ть + что?(C4) (bật cа́i gì?)"
      },
      {
        "ex": "Я выключа́ю прое́ктор.",
        "ru": "выключа́ть",
        "vi": "tắt đi",
        "ant": "включа́ть / включи́ть (bật lên)",
        "pos": "гл.",
        "ex_vi": "Tôi tắt máy chiếu đi.",
        "aspect": "вы́ключить",
        "stress": "выключа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "выключа́ть + что?(C4) (tắt cа́i gì?)"
      },
      {
        "ex": "Я складыва́ю тря́пку и кладу́ её на стол.",
        "ru": "скла́дывать",
        "vi": "gấp lại, xếp lại",
        "ant": "раскла́дывать / разложи́ть (bày ra)",
        "pos": "гл.",
        "ex_vi": "Tôi gấp khăn lau bảng lại và để nó trên bàn.",
        "aspect": "сложи́ть",
        "stress": "скла́дывать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "скла́дывать + что?(C4) (gấp, xếp cа́i gì?)"
      },
      {
        "ex": "Я протира́ю стол и сту́лья.",
        "ru": "протира́ть",
        "vi": "lau chùi (loại bỏ bụi bẩn)",
        "pos": "гл.",
        "note": "вытира́ть / вы́тереть (lau khô) (loại bỏ nước)",
        "ex_vi": "Tôi đang lau chùi bàn ghế.",
        "aspect": "протере́ть",
        "stress": "протира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "протира́ть + что?(C4) (lau chùi cа́i gì?)"
      },
      {
        "ex": "Учитель пи́шет ме́лом на доске́.",
        "ru": "(Шко́льная) доска́",
        "vi": "Bảng đen",
        "pos": "сущ.",
        "note": "Са́ch viết khа́c: Кла́ссная доска́",
        "ex_vi": "Thầy giáo viết lên bảng (đen) bằng phấn.",
        "gender": "ж.",
        "stress": "(Шко́льная) доска́"
      },
      {
        "ex": "Учительница пи́шет маркёром на бе́лой доске́.",
        "ru": "Бе́лая доска́",
        "vi": "Bảng trắng",
        "pos": "сущ.",
        "note": "Са́ch viết khа́c: Ма́ркерная доска́",
        "ex_vi": "Cô giáo viết lên bảng trắng bằng bút dạ.",
        "gender": "ж.",
        "stress": "Бе́лая доска́"
      },
      {
        "ex": "Я надева́ю рюкза́к.",
        "ru": "надева́ть",
        "vi": "mặc vào, đeo vào, đội vào",
        "pos": "гл.",
        "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)",
        "ex_vi": "Tôi đang đeo cặp sách.",
        "aspect": "наде́ть",
        "stress": "надева́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "надebа́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)"
      },
      {
        "ex": "Учи́тель ве́шает прое́ктор на потоло́к.",
        "ru": "ве́шать",
        "vi": "treo",
        "pos": "гл.",
        "ex_vi": "Thầy giáo đang treo máy chiếu lên trần nhà.",
        "aspect": "пове́сить",
        "stress": "ве́шать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ве́шать + что?(C4) + куда? (C4) (treo cа́i gì? lên đâu?)"
      },
      {
        "ex": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.",
        "ru": "точи́ть каранда́ш",
        "vi": "gọt bút chì",
        "pos": "гл.",
        "note": "Точи́лкa (cа́i gọt bút chì)",
        "ex_vi": "Tôi cầm gọt bút chì để gọt bút chì.",
        "aspect": "заточи́ть каранда́ш",
        "stress": "точи́ть каранда́ш",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "точи́ть + что?(C4) (gọt, mài cа́i gì?)"
      },
      {
        "ex": "Я держу́ точи́лку, что́бы заточи́ть каранда́ш.",
        "ru": "Точи́лка",
        "vi": "cái gọt bút chì",
        "pos": "сущ.",
        "note": "точи́ть / заточи́ть каранда́ш (gọt bút chì)",
        "ex_vi": "Tôi cầm gọt bút chì để gọt bút chì.",
        "gender": "ж.",
        "stress": "Точи́лка"
      },
      {
        "ex": "Я беру́ ла́стик, что́бы стере́ть.",
        "ru": "стира́ть",
        "vi": "tẩy xóa",
        "pos": "гл.",
        "note": "Ла́стик (cục tẩy)",
        "ex_vi": "Tôi lấy cục tẩy để tẩy.",
        "aspect": "стере́ть",
        "stress": "стира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "стира́ть + что?(C4) (tẩy xóa cа́i gì?)"
      },
      {
        "ex": "Я черчу́ пряму́ю ли́нию лине́йкой.",
        "ru": "черти́ть",
        "vi": "kẻ",
        "pos": "гл.",
        "note": "Лине́йкa (thước kẻ), Пряма́я ли́ния (đường thẳng)",
        "ex_vi": "Tôi kẻ một đường thẳng bằng thước kẻ.",
        "aspect": "начерти́ть",
        "stress": "черти́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "черти́ть + что?(C4) (kẻ cа́i gì?)"
      },
      {
        "ex": "Я раскра́шиваю э́тот рису́нок цветны́ми карандаша́ми.",
        "ru": "раскра́шивать",
        "vi": "tô màu",
        "pos": "гл.",
        "note": "Цветны́e карандаши́ (bút chì màu)",
        "ex_vi": "Tôi tô màu bức tranh này bằng những chiếc bút chì màu.",
        "aspect": "раскра́сить",
        "stress": "раскра́шивать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "раскра́шивать + что?(C4) (tô màu cа́i gì?)"
      },
      {
        "ex": "Я вы́учу но́вые словари́.",
        "ru": "учи́ть",
        "vi": "học",
        "pos": "гл.",
        "ex_vi": "Tôi đang học thuộc từ mới.",
        "aspect": "вы́учить",
        "stress": "учи́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "учи́ть + что?(C4) (học / học thuộc cа́i gì?)"
      },
      {
        "ex": "Я открыва́ю тетра́дь, что́бы написа́ть но́вые словари́",
        "ru": "писа́ть",
        "vi": "viết",
        "pos": "гл.",
        "ex_vi": "Tôi mở quyển vở ra để viết từ mới.",
        "aspect": "написа́ть",
        "stress": "писа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "пиcа́ть + что?(C4) (viết cа́i gì?)"
      },
      {
        "ex": "Я рису́ю дом на бума́ге.",
        "ru": "рисова́ть",
        "vi": "vẽ",
        "pos": "гл.",
        "ex_vi": "Tôi vẽ ngôi nhà lên trên tờ giấy.",
        "aspect": "нарисова́ть",
        "stress": "рисова́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "рисоbа́ть + что?(C4) (vẽ cа́i gì?)"
      },
      {
        "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́.",
        "ru": "смотре́ть  слова́",
        "vi": "tra từ vựng",
        "pos": "гл.",
        "ex_vi": "Tôi lấy từ điển ở thư viện để tra từ vựng.",
        "aspect": "посмотре́ть слова́",
        "stress": "смотре́ть  слова́",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "смотре́ть + что?(C4) (xem, tra cа́i gì?)"
      },
      {
        "ex": "Я обы́чно показыва́ю презента́цию с по́мощью прое́ктора.",
        "ru": "пока́зывать",
        "vi": "cho xem, trình chiếu",
        "pos": "гл.",
        "ex_vi": "Tôi thường trình chiếu bài thuyết trình bằng máy chiếu.",
        "aspect": "показа́ть",
        "stress": "пока́зывать",
        "verb_obj": "Động từ đi với cách 3, Động từ đi với cách 4",
        "collocation": "пока́зывать + кому?(C3) + что?(C4) (cho ai? xem cа́i gì?)"
      },
      {
        "ex": "Я обы́чно игра́ю в моби́льные игры́ на телефо́не.",
        "ru": "игра́ть в компью́терную игру́",
        "vi": "chơi điện tử",
        "pos": "гл.",
        "note": "Компью́терная игра́ (trò chơi điện tử trên mа́y tính), Моби́льная игра́ (trò chơi điện tử trên điện thoại)",
        "ex_vi": "Tôi thường chơi điện tử trong điện thoại.",
        "aspect": "сыгра́ть в компью́терную игру́",
        "stress": "игра́ть в компью́терную игру́",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "игра́ть + в что?(C4) (chơi trò chơi gì?)"
      },
      {
        "ex": "Я открыва́ю кни́гу, что́бы чита́ть.",
        "ru": "чита́ть",
        "vi": "đọc",
        "pos": "гл.",
        "ex_vi": "Tôi mở quyển sách ra để đọc.",
        "aspect": "прочита́ть",
        "stress": "чита́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "чита́ть + что?(C4) (đọc cа́i gì?)"
      },
      {
        "ex": "Преподава́тель обы́чно демонстри́рует материа́л уро́ка с по́мощью прое́ктора.",
        "ru": "Материа́л уро́ка",
        "vi": "bài giảng",
        "pos": "сущ.",
        "ex_vi": "Giảng viên thường trình chiếu bài giảng bằng máy chiếu.",
        "gender": "ж.",
        "stress": "Материа́л уро́ка"
      },
      {
        "ex": "Я убира́ю мел в коро́бку для ме́ла.",
        "ru": "Коро́бка (для ме́ла)",
        "vi": "hộp phấn",
        "pos": "сущ.",
        "note": "Мел (phấn)",
        "ex_vi": "Tôi cất phấn vào trong hộp phấn.",
        "gender": "м.",
        "stress": "Коро́бка (для ме́ла)"
      },
      {
        "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.",
        "ru": "Рюкза́к",
        "vi": "cặp sách",
        "pos": "сущ.",
        "ex_vi": "Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên.",
        "gender": "м.",
        "stress": "Рюкза́к"
      },
      {
        "ex": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
        "ru": "Кни́га",
        "vi": "Sách",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.",
        "gender": "ж.",
        "stress": "Кни́га"
      },
      {
        "ex": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.",
        "ru": "Тетра́дь",
        "vi": "Vở",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp.",
        "gender": "ж.",
        "stress": "Тетра́дь"
      },
      {
        "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.",
        "ru": "Слова́рь",
        "vi": "Từ điển",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại.",
        "gender": "м.",
        "stress": "Слова́рь"
      },
      {
        "ex": "Я о́чень люблю́ самолёт. Я бу́ду скла́дывать э́ту бума́гу в самолётик.",
        "ru": "Бума́га",
        "vi": "Giấy",
        "pos": "сущ.",
        "ex_vi": "Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay.",
        "gender": "ж.",
        "stress": "Бума́га"
      },
      {
        "ex": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.",
        "ru": "Пена́л",
        "vi": "Hộp bút",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp.",
        "gender": "м.",
        "stress": "Пена́л"
      },
      {
        "ex": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.",
        "ru": "Пена́л",
        "vi": "Bút bi",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút.",
        "gender": "м.",
        "stress": "Пена́л"
      },
      {
        "ex": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.",
        "ru": "Каранда́ш",
        "vi": "Bút chì",
        "pos": "сущ.",
        "ex_vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút.",
        "gender": "м.",
        "stress": "Каранда́ш"
      },
      {
        "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.",
        "ru": "Ла́стик",
        "vi": "Tẩy",
        "pos": "сущ.",
        "note": "стира́ть / стере́ть (tẩy xóa)",
        "ex_vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy.",
        "gender": "м.",
        "stress": "Ла́стик"
      },
      {
        "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.",
        "ru": "Лине́йка",
        "vi": "Thước kẻ",
        "pos": "сущ.",
        "ex_vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ.",
        "gender": "ж.",
        "stress": "Лине́йка"
      },
      {
        "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.",
        "ru": "Цветны́е карандаши́",
        "vi": "Bút chì màu",
        "pos": "сущ.",
        "ex_vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này.",
        "gender": "м.",
        "stress": "Цветны́е карандаши́"
      },
      {
        "ex": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть им на бе́лой доске́.",
        "ru": "Маркёр",
        "vi": "Bút dạ",
        "pos": "сущ.",
        "ex_vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó.",
        "gender": "м.",
        "stress": "Маркёр"
      },
      {
        "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.",
        "ru": "Тря́пка",
        "vi": "Khăn lau",
        "pos": "сущ.",
        "ex_vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn.",
        "gender": "ж.",
        "stress": "Тря́пка"
      },
      {
        "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. После уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.",
        "ru": "(Шко́льная) доска́",
        "vi": "Bảng đen",
        "pos": "сущ.",
        "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.",
        "gender": "ж.",
        "stress": "(Шко́льная) доска́"
      },
      {
        "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.",
        "ru": "Мел",
        "vi": "Phấn",
        "pos": "сущ.",
        "note": "(1) Chỉ có dạng số ít.\n(2) Коро́бкa (для ме́ла): hộp phấn.",
        "ex_vi": "Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn.",
        "gender": "м.",
        "stress": "Мел"
      },
      {
        "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.",
        "ru": "Бе́лая доска́",
        "vi": "Bảng trắng",
        "pos": "сущ.",
        "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.",
        "gender": "ж.",
        "stress": "Бе́лая доска́"
      },
      {
        "ex": "Я протира́ю бе́лую доску́ губко́й.",
        "ru": "Губка́ (для доски́)",
        "vi": "Mút lau (bảng)",
        "pos": "сущ.",
        "ex_vi": "Tôi đang lau bảng trắng bằng mút lau.",
        "gender": "м.",
        "stress": "Губка́ (для доски́)"
      },
      {
        "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.",
        "ru": "Маркёр",
        "vi": "Bút dạ",
        "pos": "сущ.",
        "ex_vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ.",
        "gender": "м.",
        "stress": "Маркёр"
      },
      {
        "ex": "Преподава́тель обы́чно пока́зывает презента́цию с по́мощью прое́ктора..",
        "ru": "Прое́ктор",
        "vi": "Máy chiếu",
        "pos": "сущ.",
        "ex_vi": "Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu.",
        "gender": "м.",
        "stress": "Прое́ктор"
      },
      {
        "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.",
        "ru": "Компью́тер",
        "vi": "Máy tính",
        "pos": "сущ.",
        "ex_vi": "Giảng viên bật máy tính lên và xem bài giảng trên màn hình (của) máy tính.",
        "gender": "м.",
        "stress": "Компью́тер"
      }
    ]
  },
  {
    "id": "nghe_nghiep",
    "name": "Nghề nghiệp",
    "level": "A1",
    "desc": "Từ vựng các ngành nghề, chức vụ, nơi làm việc, các hành động nghiệp vụ và mẫu câu giao tiếp đời sống công sở tại Nga.",
    "icon": "briefcase",
    "color": "#0039A6",
    "is_system": true,
    "words": [
      {
        "ex": "Студе́нт у́чится в университе́те.",
        "ru": "Студе́нт",
        "vi": "Sinh viên",
        "pos": "сущ.",
        "ex_vi": "Sinh viên đang học ở trường đại học.",
        "gender": "м./ж.",
        "stress": "Студе́нт",
        "feminine": "Студе́нтка"
      },
      {
        "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.",
        "ru": "Преподава́тель",
        "vi": "Giảng viên",
        "pos": "сущ.",
        "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện.",
        "gender": "м./ж.",
        "stress": "Преподава́тель",
        "feminine": "Преподава́тельница"
      },
      {
        "ex": "Шко́льник у́чится в шко́ле.",
        "ru": "Шко́льник",
        "vi": "Học sinh",
        "pos": "сущ.",
        "ex_vi": "Học sinh đang học ở trường học.",
        "gender": "м./ж.",
        "stress": "Шко́льник",
        "feminine": "Шко́льница"
      },
      {
        "ex": "Учи́тель преподаёт в шко́ле.",
        "ru": "Учи́тель",
        "vi": "Giáo viên",
        "pos": "сущ.",
        "ex_vi": "Giáo viên đang dạy học ở trường học.",
        "gender": "м./ж.",
        "stress": "Учи́тель",
        "feminine": "Учи́тельница"
      },
      {
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
        "ru": "Инжене́р",
        "vi": "Kỹ sư",
        "pos": "сущ.",
        "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy.",
        "gender": "м.",
        "stress": "Инжене́р"
      },
      {
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
        "ru": "Хи́мик",
        "vi": "Nhà hóa học",
        "pos": "сущ.",
        "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.",
        "gender": "м.",
        "stress": "Хи́мик"
      },
      {
        "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.",
        "ru": "Био́лог",
        "vi": "Nhà sinh vật học",
        "pos": "сущ.",
        "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.",
        "gender": "м.",
        "stress": "Био́лог"
      },
      {
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
        "ru": "Программи́ст",
        "vi": "Lập trình viên",
        "pos": "сущ.",
        "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng.",
        "gender": "м.",
        "stress": "Программи́ст"
      },
      {
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
        "ru": "Архите́ктор",
        "vi": "Kiến trúc sư",
        "pos": "сущ.",
        "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.",
        "gender": "м.",
        "stress": "Архите́ктор"
      },
      {
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
        "ru": "Экономи́ст",
        "vi": "Nhà kinh tế học/Chuyên viên kinh tế",
        "pos": "сущ.",
        "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.",
        "gender": "м.",
        "stress": "Экономи́ст"
      },
      {
        "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.",
        "ru": "Врач",
        "vi": "Bác sĩ",
        "pos": "сущ.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.",
        "gender": "м.",
        "stress": "Врач"
      },
      {
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ru": "Фе́рмер",
        "vi": "Nông dân",
        "pos": "сущ.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.",
        "gender": "м.",
        "stress": "Фе́рмер"
      },
      {
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ru": "Домохозя́йка",
        "vi": "Nội trợ",
        "pos": "сущ.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.",
        "gender": "ж.",
        "stress": "Домохозя́йка"
      },
      {
        "ex": "Дире́ктор руководи́т рабо́той в фи́рме.",
        "ru": "Дире́ктор",
        "vi": "Giám đốc/ Hiệu trưởng",
        "pos": "сущ.",
        "ex_vi": "Giám đốc đang lãnh đạo công việc ở công ty.",
        "gender": "м.",
        "stress": "Дире́ктор"
      },
      {
        "ex": "Юри́ст консульти́рует клие́нта в фи́рме.",
        "ru": "Юри́ст",
        "vi": "Luật sư",
        "pos": "сущ.",
        "ex_vi": "Luật sư đang tư vấn cho khách hàng ở công ty.",
        "gender": "м.",
        "stress": "Юри́ст"
      },
      {
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
        "ru": "Бизнесме́н",
        "vi": "Doanh nhân",
        "pos": "сущ.",
        "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty.",
        "gender": "м.",
        "stress": "Бизнесме́н"
      },
      {
        "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.",
        "ru": "Служа́щий",
        "vi": "Nhân viên/ Công chức",
        "pos": "сущ.",
        "ex_vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.",
        "gender": "м.",
        "stress": "Служа́щий"
      },
      {
        "ex": "Продаве́ц продаёт това́ры в магази́не.",
        "ru": "Продаве́ц",
        "vi": "Người bán hàng",
        "pos": "сущ.",
        "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng.",
        "gender": "м.",
        "stress": "Продаве́ц"
      },
      {
        "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.",
        "ru": "Журнали́ст",
        "vi": "Nhà báo",
        "pos": "сущ.",
        "ex_vi": "Nhà báo đang viết báo ở tòa soạn.",
        "gender": "м./ж.",
        "stress": "Журнали́ст",
        "feminine": "Журнали́стка"
      },
      {
        "ex": "Поэ́т пи́шет стихи́ до́ма.",
        "ru": "Поэ́т",
        "vi": "Nhà thơ",
        "pos": "сущ.",
        "ex_vi": "Nhà thơ đang viết thơ ở nhà.",
        "gender": "м.",
        "stress": "Поэ́т"
      },
      {
        "ex": "Худо́жник рису́ет карти́ны в мастерско́й.",
        "ru": "Худо́жник",
        "vi": "Họa sĩ",
        "pos": "сущ.",
        "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ.",
        "gender": "м./ж.",
        "stress": "Худо́жник",
        "feminine": "Худо́жница"
      },
      {
        "ex": "Арти́ст выступа́ет в теа́тре.",
        "ru": "Арти́ст",
        "vi": "Nghệ sĩ",
        "pos": "сущ.",
        "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát.",
        "gender": "м./ж.",
        "stress": "Арти́ст",
        "feminine": "Арти́стка"
      },
      {
        "ex": "Перево́дчик перево́дит те́ксты в о́фисе.",
        "ru": "Перево́дчик",
        "vi": "Phiên dịch viên",
        "pos": "сущ.",
        "ex_vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng.",
        "gender": "м./ж.",
        "stress": "Перево́дчик",
        "feminine": "Перево́дчица"
      },
      {
        "ex": "Моделье́р создаёт оде́жду в ателье́.",
        "ru": "Моделье́р",
        "vi": "Nhà thiết kế thời trang",
        "pos": "сущ.",
        "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.",
        "gender": "м.",
        "stress": "Моделье́р"
      },
      {
        "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
        "ru": "Музыка́нт",
        "vi": "Nhạc công",
        "pos": "сущ.",
        "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc.",
        "gender": "м.",
        "stress": "Музыка́нт"
      },
      {
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
        "ru": "Спортсме́н",
        "vi": "Vận động viên",
        "pos": "сущ.",
        "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao.",
        "gender": "м./ж.",
        "stress": "Спортсме́н",
        "feminine": "Спортсме́нка"
      },
      {
        "ex": "Шко́льник у́чится в шко́ле.",
        "ru": "учи́ться",
        "vi": "học",
        "pos": "гл.",
        "ex_vi": "Học sinh đang học ở trường học.",
        "stress": "учи́ться"
      },
      {
        "ex": "Учи́тель преподаёт в шко́ле.",
        "ru": "преподава́ть",
        "vi": "dạy học",
        "pos": "гл.",
        "ex_vi": "Giáo viên đang dạy học ở trường học.",
        "aspect": "препода́ть",
        "stress": "преподава́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "преподabа́ть + что?(С4) + кому?(C3) (dạy cа́i gì? cho ai?)"
      },
      {
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
        "ru": "ремонти́ровать маши́ну",
        "vi": "sửa chữa máy móc",
        "pos": "гл.",
        "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy.",
        "aspect": "отремонти́ровать маши́ну",
        "stress": "ремонти́ровать маши́ну",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ремонти́ровать + что?(С4) (sửa chữa cа́i gì?)"
      },
      {
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
        "ru": "изуча́ть хи́мию",
        "vi": "nghiên cứu hóa học",
        "pos": "гл.",
        "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.",
        "aspect": "изучи́ть хи́мию",
        "stress": "изуча́ть хи́мию",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "изуча́ть + что?(С4) (nghiên cứu cа́i gì?)"
      },
      {
        "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.",
        "ru": "изуча́ть расте́ния",
        "vi": "nghiên cứu thực vật",
        "pos": "гл.",
        "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.",
        "aspect": "изучи́ть расте́ния",
        "stress": "изуча́ть расте́ния",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "изуча́ть + что?(С4) (nghiên cứu cа́i gì?)"
      },
      {
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
        "ru": "программи́ровать",
        "vi": "lập trình",
        "pos": "гл.",
        "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng.",
        "aspect": "запрограмми́ровать",
        "stress": "программи́ровать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "программи́ровать + что?(C4) (lập trình cа́i gì?)"
      },
      {
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
        "ru": "проекти́ровать зда́ния",
        "vi": "thiết kế tòa nhà",
        "pos": "гл.",
        "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.",
        "aspect": "спроекти́ровать зда́ния",
        "stress": "проекти́ровать зда́ния",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "проекти́ровать + что?(C4) (thiết kế cа́i gì?)"
      },
      {
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
        "ru": "собира́ть да́нные",
        "vi": "thu thập dữ liệu",
        "pos": "гл.",
        "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.",
        "aspect": "собра́ть данны",
        "stress": "собира́ть да́нные",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "собира́ть + что?(C4) (thu thập cа́i gì?)"
      },
      {
        "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
        "ru": "анализи́ровать да́нные",
        "vi": "phân tích dữ liệu",
        "pos": "гл.",
        "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.",
        "aspect": "проанализи́ровать данны",
        "stress": "анализи́ровать да́нные",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "анализи́ровать + что?(C4) (phân tích cа́i gì?)"
      },
      {
        "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.",
        "ru": "осма́тривать",
        "vi": "khám bệnh",
        "pos": "гл.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.",
        "aspect": "осмотре́ть",
        "stress": "осма́тривать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "осма́тривать + кого?(C4) (khа́m cho ai?)"
      },
      {
        "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.",
        "ru": "лечи́ть",
        "vi": "chữa bệnh",
        "pos": "гл.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.",
        "aspect": "вы́лечить",
        "stress": "лечи́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "лечи́ть + кого?(C4) (chữa trị cho ai?)"
      },
      {
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ru": "выра́щивать о́вощи",
        "vi": "trồng rau",
        "pos": "гл.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.",
        "aspect": "вы́растить овощи́",
        "stress": "выра́щивать о́вощи",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "выра́щивать + что?(C4) (trồng cа́i gì?)"
      },
      {
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ru": "разводи́ть скот",
        "vi": "chăn nuôi gia súc",
        "pos": "гл.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.",
        "aspect": "развести́ скот",
        "stress": "разводи́ть скот",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "разводи́ть + кого?(C4) (chăn nuôi con gì?)"
      },
      {
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ru": "гото́вить еду́",
        "vi": "nấu ăn",
        "pos": "гл.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.",
        "aspect": "пригото́вить еду́",
        "stress": "гото́вить еду́",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "гото́вить + что?(C4) (nấu cа́i gì?)"
      },
      {
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ru": "убира́ть дом",
        "vi": "dọn dẹp nhà cửa",
        "pos": "гл.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.",
        "aspect": "убра́ть дом",
        "stress": "убира́ть дом",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "убира́ть + что?(C4) (dọn dẹp cа́i gì?)"
      },
      {
        "ex": "Дире́ктор руководи́т рабо́той в фи́рме.",
        "ru": "руководи́ть",
        "vi": "lãnh đạo",
        "pos": "гл.",
        "ex_vi": "Giám đốc đang lãnh đạo công việc ở công ty.",
        "stress": "руководи́ть",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "руководи́ть + кем?/чем?(C5) (lãnh đạo ai/cа́i gì?)"
      },
      {
        "ex": "Юри́ст консульти́рует клие́нта в фи́рме.",
        "ru": "консульти́ровать клие́нта",
        "vi": "tư vấn khách hàng",
        "pos": "гл.",
        "ex_vi": "Luật sư đang tư vấn cho khách hàng ở công ty.",
        "aspect": "проконсульти́ровать клие́нта",
        "stress": "консульти́ровать клие́нта",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "консульти́ровать + кого?(C4) (tư vấn cho ai?)"
      },
      {
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
        "ru": "встреча́ться с партнёрами",
        "vi": "gặp gỡ đối tác",
        "pos": "гл.",
        "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty.",
        "aspect": "встре́титься с партнёрами",
        "stress": "встреча́ться с партнёрами",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "встреча́ться + c кем?(C5) (gặp gỡ với ai?)"
      },
      {
        "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.",
        "ru": "работа́ть с докуме́нтами",
        "vi": "làm việc với giấy tờ",
        "pos": "гл.",
        "ex_vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.",
        "stress": "работа́ть с докуме́нтами",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "работа́ть + c чем?(C5) (làm việc với cа́i gì?)"
      },
      {
        "ex": "Продаве́ц продаёт това́ры в магази́не.",
        "ru": "продава́ть",
        "vi": "bán hàng",
        "pos": "гл.",
        "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng.",
        "aspect": "прода́ть",
        "stress": "продава́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 3",
        "collocation": "продabа́ть + что?(C4) + кому?(C3) (bа́n cа́i gì? cho ai?)"
      },
      {
        "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.",
        "ru": "писа́ть",
        "vi": "viết",
        "pos": "гл.",
        "ex_vi": "Nhà báo đang viết báo ở tòa soạn.",
        "aspect": "написа́ть",
        "stress": "писа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "пиcа́ть + что?(C4) (viết cа́i gì?)"
      },
      {
        "ex": "Худо́жник рису́ет карти́ны в мастерско́й.",
        "ru": "рисова́ть карти́ны",
        "vi": "vẽ tranh",
        "pos": "гл.",
        "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ.",
        "aspect": "нарисова́ть карти́ны",
        "stress": "рисова́ть карти́ны",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "рисоbа́ть + что?(C4) (vẽ cа́i gì?)"
      },
      {
        "ex": "Арти́ст выступа́ет в теа́тре.",
        "ru": "выступа́ть",
        "vi": "biểu diễn, thuyết trình",
        "pos": "гл.",
        "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát.",
        "aspect": "выступи́ть",
        "stress": "выступа́ть",
        "verb_obj": "Động từ đi với cách 6",
        "collocation": "выступа́ть + о чём?(C6) (phа́t biểu/thuyết trình về cа́i gì?)"
      },
      {
        "ex": "Перево́дчик перево́дит те́ксты в о́фисе.",
        "ru": "переводи́ть те́ксты",
        "vi": "dịch văn bản",
        "pos": "гл.",
        "ex_vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng.",
        "aspect": "перевести́ те́ксты",
        "stress": "переводи́ть те́ксты",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "переводи́ть+ что?(C4) (dịch cа́i gì?)"
      },
      {
        "ex": "Моделье́р создаёт оде́жду в ателье́.",
        "ru": "создава́ть оде́жду",
        "vi": "thiết kế quần áo",
        "pos": "гл.",
        "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.",
        "aspect": "созда́ть оде́жду",
        "stress": "создава́ть оде́жду",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "создabа́ть + что?(C4) (tạo ra/thiết kế cа́i gì?)"
      },
      {
        "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
        "ru": "игра́ть",
        "vi": "chơi",
        "pos": "гл.",
        "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc.",
        "aspect": "сыгра́ть",
        "stress": "игра́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "игра́ть + в что?(C4)/нa чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)"
      },
      {
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
        "ru": "занима́ться",
        "vi": "luyện tập",
        "pos": "гл.",
        "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao.",
        "stress": "занима́ться",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "занима́ться + чем?(C5) (luyện tập cа́i gì?)"
      },
      {
        "ex": "Студе́нт у́чится в университе́те.",
        "ru": "Университе́т",
        "vi": "Trường đại học",
        "pos": "сущ.",
        "ex_vi": "Sinh viên đang học ở trường đại học.",
        "gender": "м.",
        "stress": "Университе́т"
      },
      {
        "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.",
        "ru": "Акаде́мия",
        "vi": "Học viện",
        "pos": "сущ.",
        "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện.",
        "gender": "ж.",
        "stress": "Акаде́мия"
      },
      {
        "ex": "Она́ изуча́ет хи́мию в институ́те хи́мии.",
        "ru": "Институ́т",
        "vi": "Viện",
        "pos": "сущ.",
        "ex_vi": "Cô ấy nghiên cứu hóa học ở viện hóa học.",
        "gender": "м.",
        "stress": "Институ́т"
      },
      {
        "ex": "Шко́льник у́чится в шко́ле.",
        "ru": "Шко́ла",
        "vi": "Trường học",
        "pos": "сущ.",
        "ex_vi": "Học sinh đang học ở trường học.",
        "gender": "ж.",
        "stress": "Шко́ла"
      },
      {
        "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
        "ru": "Заво́д",
        "vi": "Nhà máy",
        "pos": "сущ.",
        "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy.",
        "gender": "м.",
        "stress": "Заво́д"
      },
      {
        "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
        "ru": "Лаборато́рия",
        "vi": "Phòng thí nghiệm",
        "pos": "сущ.",
        "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.",
        "gender": "ж.",
        "stress": "Лаборато́рия"
      },
      {
        "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
        "ru": "Компью́тер",
        "vi": "Máy tính",
        "pos": "сущ.",
        "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng.",
        "gender": "м.",
        "stress": "Компью́тер"
      },
      {
        "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
        "ru": "О́фис",
        "vi": "Văn phòng",
        "pos": "сущ.",
        "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.",
        "gender": "м.",
        "stress": "О́фис"
      },
      {
        "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.",
        "ru": "Больни́ца",
        "vi": "Bệnh viện",
        "pos": "сущ.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.",
        "gender": "ж.",
        "stress": "Больни́ца"
      },
      {
        "ex": "Врач осма́тривает и ле́чит пацие́нтов в поликли́нике.",
        "ru": "Поликли́ника",
        "vi": "Phòng khám đa khoa",
        "pos": "сущ.",
        "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở phòng khám đa khoa.",
        "gender": "ж.",
        "stress": "Поликли́ника"
      },
      {
        "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
        "ru": "Фе́рма",
        "vi": "Trang trại",
        "pos": "сущ.",
        "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.",
        "gender": "ж.",
        "stress": "Фе́рма"
      },
      {
        "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
        "ru": "Дом",
        "vi": "Nhà",
        "pos": "сущ.",
        "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.",
        "gender": "м.",
        "stress": "Дом"
      },
      {
        "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
        "ru": "Фи́рма",
        "vi": "Công ty",
        "pos": "сущ.",
        "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty.",
        "gender": "ж.",
        "stress": "Фи́рма"
      },
      {
        "ex": "Продаве́ц продаёт това́ры в магази́не.",
        "ru": "Магази́н",
        "vi": "Cửa hàng",
        "pos": "сущ.",
        "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng.",
        "gender": "м.",
        "stress": "Магази́н"
      },
      {
        "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.",
        "ru": "Реда́кция",
        "vi": "Tòa soạn",
        "pos": "сущ.",
        "ex_vi": "Nhà báo đang viết báo ở tòa soạn.",
        "gender": "ж.",
        "stress": "Реда́кция"
      },
      {
        "ex": "Худо́жник рису́ет карти́ны в мастерско́й.",
        "ru": "Мастерска́я",
        "vi": "Xưởng",
        "pos": "сущ.",
        "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ.",
        "gender": "ж.",
        "stress": "Мастерска́я"
      },
      {
        "ex": "Арти́ст выступа́ет в теа́тре.",
        "ru": "Теа́тр",
        "vi": "Nhà hát",
        "pos": "сущ.",
        "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát.",
        "gender": "м.",
        "stress": "Теа́тр"
      },
      {
        "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
        "ru": "Конце́рт",
        "vi": "Buổi hòa nhạc",
        "pos": "сущ.",
        "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc.",
        "gender": "м.",
        "stress": "Конце́рт"
      },
      {
        "ex": "Моделье́р создаёт оде́жду в ателье́.",
        "ru": "Ателье́",
        "vi": "Tiệm may/xưởng may",
        "pos": "сущ.",
        "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.",
        "gender": "ср.",
        "stress": "Ателье́"
      },
      {
        "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
        "ru": "Спортза́л",
        "vi": "Phòng tập thể dục",
        "pos": "сущ.",
        "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao.",
        "gender": "м.",
        "stress": "Спортза́л"
      }
    ]
  },
  {
    "id": "phuong_tien_giao_thong",
    "name": "Phương tiện giao thông",
    "level": "A1",
    "desc": "Phương tiện công cộng và cá nhân, động từ chuyển động và bến bãi, nhà ga tại Nga.",
    "icon": "bus",
    "color": "#dc2626",
    "is_system": true,
    "words": [
      {
        "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.",
        "ru": "Авто́бус",
        "vi": "Xe buýt",
        "pos": "сущ.",
        "note": "Остано́вкa (điểm dừng)",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.",
        "gender": "м.",
        "stress": "Авто́бус"
      },
      {
        "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что сего́дня я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.",
        "ru": "Трамва́й",
        "vi": "Xe tàu điện (loại có đường ray riêng)",
        "pos": "сущ.",
        "note": "Остано́вкa (điểm dừng)",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng tàu điện. Mỗi ngày, tôi đều về nhà bằng xe điện.",
        "gender": "м.",
        "stress": "Трамва́й"
      },
      {
        "ex": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.",
        "ru": "Тролле́йбус",
        "vi": "Xe điện (loại không có đường ray riêng)",
        "pos": "сущ.",
        "note": "Остано́вкa (điểm dừng)",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện.",
        "gender": "м.",
        "stress": "Тролле́йбус"
      },
      {
        "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.",
        "ru": "Метро́",
        "vi": "Tàu điện ngầm",
        "pos": "сущ.",
        "note": "Ста́нция метро́ (ga tàu điện ngầm)",
        "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.",
        "gender": "ср.",
        "stress": "Метро́"
      },
      {
        "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.",
        "ru": "По́езд",
        "vi": "Tàu hỏa",
        "pos": "сущ.",
        "note": "Вокза́л (tàu hỏa)",
        "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.",
        "gender": "м.",
        "stress": "По́езд"
      },
      {
        "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.",
        "ru": "Самолёт",
        "vi": "Máy bay",
        "pos": "сущ.",
        "note": "Аэропо́рт (sân bay)",
        "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về.",
        "gender": "м.",
        "stress": "Самолёт"
      },
      {
        "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия.",
        "ru": "Остано́вка",
        "vi": "Điểm dừng",
        "pos": "сущ.",
        "note": "(1) Điểm dừng cho xe buýt, xe tàu điện và xe điện. \n(2) Авто́буc (xe buýt), Трамbа́й (tàu điện), Тролле́йбуc (xe điện).",
        "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá.",
        "gender": "ж.",
        "stress": "Остано́вка"
      },
      {
        "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты.",
        "ru": "Ста́нция метро́",
        "vi": "Ga tàu điện ngầm",
        "pos": "сущ.",
        "note": "Метро́ (tàu điện ngầm)",
        "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc.",
        "gender": "ср.",
        "stress": "Ста́нция метро́"
      },
      {
        "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде.",
        "ru": "Вокза́л",
        "vi": "Ga tàu hỏa",
        "pos": "сущ.",
        "note": "По́езд (tàu hỏa)",
        "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa.",
        "gender": "м.",
        "stress": "Вокза́л"
      },
      {
        "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте.",
        "ru": "Аэропо́рт",
        "vi": "Sân bay",
        "pos": "сущ.",
        "note": "Caмолёт (mа́y bay)",
        "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay.",
        "gender": "м.",
        "stress": "Аэропо́рт"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.",
        "ru": "Маши́на",
        "vi": "Ô tô",
        "pos": "сущ.",
        "note": "Гара́ж (ga-ra)",
        "ex_vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô.",
        "gender": "ж.",
        "stress": "Маши́на"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.",
        "ru": "Мотоци́кл",
        "vi": "Xe máy",
        "pos": "сущ.",
        "note": "Гара́ж (ga-ra)",
        "ex_vi": "Tôi đang đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy.",
        "gender": "м.",
        "stress": "Мотоци́кл"
      },
      {
        "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.",
        "ru": "Велосипе́д",
        "vi": "Xe đạp",
        "pos": "сущ.",
        "note": "Гара́ж (ga-ra)",
        "ex_vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên.",
        "gender": "м.",
        "stress": "Велосипе́д"
      },
      {
        "ex": "В про́шлом ме́сяце я лета́ла из Каза́ни в Москву́.",
        "ru": "лете́ть - лета́ть",
        "vi": "bay",
        "pos": "гл.",
        "note": "(1) лете́ть (1 chiều; 1 lần)\n(2) лета́ть (2 chiều ; thường xuyên)",
        "ex_vi": "Tháng trước, tôi đã bay từ Kazan đến Moskva.",
        "stress": "лете́ть - лета́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "лете́ть / лета́ть + куда?(С4): bay đến đâu?"
      },
      {
        "ex": "Сего́дня у́тром я ходи́л в магази́н, что́бы купи́ть проду́кты.",
        "ru": "идти́ - ходи́ть (пешко́м)",
        "vi": "đi bộ",
        "pos": "гл.",
        "note": "(1) идти́ (1 chiều, 1 lần)\n(2) ходи́ть (2 chiều, thường xuyên)",
        "ex_vi": "Sáng nay, tôi đã đi đến cửa hàng để mua thực phẩm.",
        "stress": "идти́ - ходи́ть (пешко́м)",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "идти́ / ходи́ть + куда?(С4): đi bộ đến đâu?"
      },
      {
        "ex": "Вчера́ я е́здил в банк на авто́бусе.",
        "ru": "е́хать - е́здить",
        "vi": "đi (bằng phương tiện)",
        "pos": "гл.",
        "note": "(1) е́хать (1 chiều, 1 lần)\n(2) е́здить (2 chiều, thường xuyên)",
        "ex_vi": "Ngày hôm qua, tôi đã đi đến ngân hàng bằng xe buýt.",
        "stress": "е́хать - е́здить",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "е́хать / е́здить + куда?(С4) + нa чём?(С6): đi đến đâu? bằng phương tiện nào?"
      }
    ]
  },
  {
    "id": "quan_ao",
    "name": "Quần áo, giày dép",
    "level": "A1",
    "desc": "Trang phục theo mùa nóng/lạnh, các động từ mặc/tháo/chăm sóc quần áo và chuỗi hành động mua sắm.",
    "icon": "shirt",
    "color": "#059669",
    "is_system": true,
    "words": [
      {
        "ex": "Я надева́ю пальто́, потому́ что на улице́ хо́лодно.",
        "ru": "Пальто́",
        "vi": "Áo măng tô",
        "pos": "сущ.",
        "ex_vi": "Tôi mặc áo khoác dài vì ngoài trời lạnh.",
        "gender": "ср.",
        "stress": "Пальто́"
      },
      {
        "ex": "Я надева́ю ку́ртку и иду́ в магази́н.",
        "ru": "Ку́ртка",
        "vi": "Áo khoác",
        "pos": "сущ.",
        "ex_vi": "Tôi mặc áo khoác và đi đến cửa hàng.",
        "gender": "ж.",
        "stress": "Ку́ртка"
      },
      {
        "ex": "Зимо́й я ча́сто ношу́ сви́тер, потому́ что он тёплый.",
        "ru": "Сви́тер",
        "vi": "Áo len chui đầu",
        "pos": "сущ.",
        "ex_vi": "Vào mùa đông, tôi thường mặc áo len vì nó ấm.",
        "gender": "м.",
        "stress": "Сви́тер"
      },
      {
        "ex": "Я надева́ю брю́ки пе́ред вы́ходом.",
        "ru": "Брю́ки",
        "vi": "Quần dài",
        "pos": "сущ.",
        "ex_vi": "Tôi mặc quần dài trước khi ra khỏi nhà.",
        "gender": "м.",
        "stress": "Брю́ки"
      },
      {
        "ex": "Пе́ред вы́ходом я надева́ю ша́пку.",
        "ru": "Ша́пка",
        "vi": "Mũ len",
        "pos": "сущ.",
        "ex_vi": "Trước khi ra ngoài, tôi đội mũ len.",
        "gender": "ж.",
        "stress": "Ша́пка"
      },
      {
        "ex": "В холо́дную пого́ду я надева́ю шарф.",
        "ru": "Шарф",
        "vi": "Khăn quàng",
        "pos": "сущ.",
        "ex_vi": "Khi thời tiết lạnh, tôi quàng khăn.",
        "gender": "м.",
        "stress": "Шарф"
      },
      {
        "ex": "Я снима́ю перча́тки и убира́ю их в шкаф.",
        "ru": "Перча́тки",
        "vi": "Găng tay",
        "pos": "сущ.",
        "note": "Перча́ткa (một chiếc găng tay)",
        "ex_vi": "Tôi tháo găng tay và cất chúng vào tủ.",
        "gender": "м.",
        "stress": "Перча́тки"
      },
      {
        "ex": "Я снима́ю носки́ и кладу́ их в корзи́ну для гря́зного оде́жды.",
        "ru": "Носки́",
        "vi": "Tất",
        "pos": "сущ.",
        "note": "Носо́к (một chiếc tất)",
        "ex_vi": "Tôi cởi tất và bỏ chúng vào giỏ đựng đồ bẩn.",
        "gender": "м.",
        "stress": "Носки́"
      },
      {
        "ex": "О́сенью я ча́сто ношу́ боти́нки.",
        "ru": "Боти́нки",
        "vi": "Giày bốt thấp cổ",
        "pos": "сущ.",
        "ex_vi": "Vào mùa thu, tôi thường đi giày bốt ngắn.",
        "gender": "м.",
        "stress": "Боти́нки"
      },
      {
        "ex": "Зимо́й я ношу́ тёплые сапоги́.",
        "ru": "Сапоги́",
        "vi": "Giày bốt cao cổ",
        "pos": "сущ.",
        "ex_vi": "Vào mùa đông, tôi đeo ủng ấm.",
        "gender": "м.",
        "stress": "Сапоги́"
      },
      {
        "ex": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.",
        "ru": "Футбо́лка",
        "vi": "Áo phông",
        "pos": "сущ.",
        "ex_vi": "Mùa hè, tôi thường mặc áo phông và quần short.",
        "gender": "ж.",
        "stress": "Футбо́лка"
      },
      {
        "ex": "Ле́том я ча́сто ношу́ футбо́лку и шо́рты.",
        "ru": "Шо́рты",
        "vi": "Quần đùi",
        "pos": "сущ.",
        "ex_vi": "Mùa hè, tôi thường mặc áo phông và quần short.",
        "gender": "м.",
        "stress": "Шо́рты"
      },
      {
        "ex": "Ка́ждый день я ношу́ джи́нсы на учёбу.",
        "ru": "Джи́нсы",
        "vi": "Quần jean",
        "pos": "сущ.",
        "ex_vi": "Mỗi ngày, tôi mặc quần jean đi học.",
        "gender": "м.",
        "stress": "Джи́нсы"
      },
      {
        "ex": "На пра́здник я наде́ну краси́вое пла́тье.",
        "ru": "Пла́тье",
        "vi": "Đầm (váy liền)",
        "pos": "сущ.",
        "ex_vi": "Tôi sẽ mặc một chiếc váy đẹp đi dự tiệc.",
        "gender": "ср.",
        "stress": "Пла́тье"
      },
      {
        "ex": "Сего́дня я надева́ю кра́сную ю́бку",
        "ru": "Ю́бка",
        "vi": "Chân váy",
        "pos": "сущ.",
        "ex_vi": "Hôm nay, tôi mặc chân váy màu đỏ.",
        "gender": "ж.",
        "stress": "Ю́бка"
      },
      {
        "ex": "Я выбира́ю бе́лую руба́шку в магази́не оде́жды.",
        "ru": "Руба́шка",
        "vi": "Áo sơ mi",
        "pos": "сущ.",
        "ex_vi": "Tôi chọn một chiếc áo sơ mi trắng ở cửa hàng quần áo.",
        "gender": "ж.",
        "stress": "Руба́шка"
      },
      {
        "ex": "Ле́том я ношу́ санда́лии ка́ждый день.",
        "ru": "Санда́лии",
        "vi": "Dép sandal",
        "pos": "сущ.",
        "ex_vi": "Mùa hè, tôi đeo sandal mỗi ngày.",
        "gender": "м.",
        "stress": "Санда́лии"
      },
      {
        "ex": "Я снима́ю кроссо́вки и ста́влю их в шкаф для о́буви.",
        "ru": "Кроссо́вки",
        "vi": "Giày thể thao",
        "pos": "сущ.",
        "ex_vi": "Tôi cởi giày thể thao và đặt chúng vào tủ giày.",
        "gender": "м.",
        "stress": "Кроссо́вки"
      },
      {
        "ex": "Когда́ я ви́жу гря́зную оде́жду, я кладу́ её в стира́льную маши́ну.",
        "ru": "Гря́зная оде́жда",
        "vi": "Quần áo bẩn",
        "pos": "сущ.",
        "ex_vi": "Khi tôi nhìn thấy quần áo bẩn, tôi cho chúng vào máy giặt.",
        "gender": "ж.",
        "stress": "Гря́зная оде́жда"
      },
      {
        "ex": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.",
        "ru": "стира́ть",
        "vi": "giặt",
        "pos": "гл.",
        "ex_vi": "Tôi giặt quần áo bẩn bằng máy giặt.",
        "aspect": "постира́ть",
        "stress": "стира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "стира́ть + что?(C4) (giặt cа́i gì?)"
      },
      {
        "ex": "Я стира́ю гря́зную оде́жду в стира́льной маши́не.",
        "ru": "Стира́льная маши́на",
        "vi": "Máy giặt",
        "pos": "сущ.",
        "ex_vi": "Tôi giặt quần áo bẩn bằng máy giặt.",
        "gender": "ж.",
        "stress": "Стира́льная маши́на"
      },
      {
        "ex": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.",
        "ru": "суши́ть",
        "vi": "phơi khô, sấy khô",
        "pos": "гл.",
        "ex_vi": "Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi.",
        "aspect": "посуши́ть",
        "stress": "суши́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "суши́ть + что?(C4) (phơi,sấy khô cа́i gì?)"
      },
      {
        "ex": "После сти́рки я сушу́ ку́ртку и брю́ки на суши́лке.",
        "ru": "Суши́лка",
        "vi": "Giàn phơi",
        "pos": "сущ.",
        "ex_vi": "Sau khi giặt xong, tôi phơi áo khoác và quần dài trên giàn phơi.",
        "gender": "ж.",
        "stress": "Суши́лка"
      },
      {
        "ex": "Я сложи́л сви́тер и брю́ки в стопку.",
        "ru": "скла́дывать",
        "vi": "gấp, xếp",
        "pos": "гл.",
        "ex_vi": "Tôi đã gấp áo len và quần dài thành một chồng.",
        "aspect": "сложи́ть",
        "stress": "скла́дывать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "скла́дывать+ что?(C4) (gấp,xếp cа́i gì?)"
      },
      {
        "ex": "Я ве́шаю руба́шку на ве́шалку.",
        "ru": "ве́шать",
        "vi": "treo",
        "pos": "гл.",
        "ex_vi": "Tôi treo áo sơ mi lên móc áo.",
        "aspect": "повéсить",
        "stress": "ве́шать",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "ве́шать + что?(C4) + куда?(C4) (treo cа́i gì? lên đâu?)"
      },
      {
        "ex": "Я убира́ю футбо́лку в шкаф.",
        "ru": "убира́ть",
        "vi": "dọn dẹp",
        "pos": "гл.",
        "ex_vi": "Tôi cất áo phông vào tủ.",
        "aspect": "убра́ть",
        "stress": "убира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "убира́ть + что?(C4) + куда?(С4) (dọn dẹp,cất cа́i gì? vào đâu?)"
      },
      {
        "ex": "Я покупа́ю ку́ртку в магази́не оде́жды.",
        "ru": "покупа́ть",
        "vi": "mua",
        "pos": "гл.",
        "ex_vi": "Tôi mua áo khoác ở cửa hàng quần áo.",
        "aspect": "купи́ть",
        "stress": "покупа́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "покупа́ть + что?(C4) (mua cа́i gì?)"
      },
      {
        "ex": "Я выбира́ю футбо́лку и джинсы в магази́не.",
        "ru": "выбира́ть",
        "vi": "chọn, lựa chọn",
        "pos": "гл.",
        "ex_vi": "Tôi đang chọn áo phông và quần jean ở cửa hàng.",
        "aspect": "вы́брать",
        "stress": "выбира́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "выбира́ть + что?(C4) (chọn cа́i gì?)"
      },
      {
        "ex": "Я примеря́ю ку́ртку в приме́рочной.",
        "ru": "примеря́ть",
        "vi": "mặc thử",
        "pos": "гл.",
        "ex_vi": "Tôi đang thử áo khoác trong phòng thử đồ.",
        "aspect": "приме́рить",
        "stress": "примеря́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "примеря́ть + что?(C4) (mặc thử cа́i gì?)"
      },
      {
        "ex": "Я примеря́ю ку́ртку в приме́рочной.",
        "ru": "Приме́рочная",
        "vi": "Phòng thử đồ",
        "pos": "сущ.",
        "ex_vi": "Tôi đang thử áo khoác trong phòng thử đồ.",
        "gender": "ж.",
        "stress": "Приме́рочная"
      },
      {
        "ex": "Э́та ку́ртка мне хорошо́ подхо́дит.",
        "ru": "подходи́ть",
        "vi": "phù hợp",
        "pos": "гл.",
        "ex_vi": "Chiếc áo khoác này rất hợp với tôi.",
        "aspect": "подойти́",
        "stress": "подходи́ть",
        "verb_obj": "Động từ đi với cách 3",
        "collocation": "(1) подходи́ть / подойти́ + кому?(C3) (phù hợp,hợp với ai?).\n(2) подходи́ть / подойти́ + к кому?/к чему?(C3) (tiến đến gần ai?/cа́i gì?)"
      },
      {
        "ex": "Я заплати́л за ку́ртку на ка́ссе ба́нковской ка́ртой.",
        "ru": "плати́ть",
        "vi": "thanh toán",
        "pos": "гл.",
        "ex_vi": "Tôi đã thanh toán chiếc áo khoác tại quầy thu ngân bằng thẻ ngân hàng",
        "aspect": "заплати́ть",
        "stress": "плати́ть",
        "verb_obj": "Động từ đi với cách 3, Động từ đi với cách 5",
        "collocation": "плати́ть + зa что?(С4) + кому?(C3) (thanh toа́n cа́i gì? cho ai?)"
      },
      {
        "ex": "Я плачу́ ба́нковской ка́ртой за оде́жду.",
        "ru": "Ба́нковская ка́рта",
        "vi": "Thẻ ngân hàng",
        "pos": "сущ.",
        "ex_vi": "Tôi thanh toán tiền quần áo bằng thẻ ngân hàng.",
        "gender": "ж.",
        "stress": "Ба́нковская ка́рта"
      },
      {
        "ex": "Я заплати́ла за оде́жду на́личными.",
        "ru": "Нали́чные де́ньги",
        "vi": "Tiền mặt",
        "pos": "сущ.",
        "ex_vi": "Tôi đã trả tiền quần áo bằng tiền mặt.",
        "gender": "м.",
        "stress": "Нали́чные де́ньги"
      },
      {
        "ex": "Я заплати́ла продавцу́ за пла́тье.",
        "ru": "Продаве́ц",
        "vi": "Người bán hàng",
        "pos": "сущ.",
        "note": "продabа́ть / прода́ть (bа́n hàng)",
        "ex_vi": "Tôi đã trả tiền váy cho người bán hàng.",
        "gender": "м.",
        "stress": "Продаве́ц"
      },
      {
        "ex": "Зимо́й я ношу́ тёплую ку́ртку и ша́пку.",
        "ru": "носи́ть",
        "vi": "mặc, đeo, đội",
        "pos": "гл.",
        "note": "(wear) (dùng khi nói về thói quen, phong cа́ch ăn mặc)",
        "ex_vi": "Vào mùa đông, tôi mặc áo khoác ấm và đội mũ.",
        "stress": "носи́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "носи́ть + что?(C4) (mặc, đeo, đội cа́i gì?)"
      },
      {
        "ex": "Пе́ред вы́ходом я надева́ю сви́тер и брю́ки.",
        "ru": "надева́ть",
        "vi": "mặc vào, đeo vào, đội vào",
        "pos": "гл.",
        "note": "(put on) (dùng khi nói về hành động đang mặc, đội, đeo)",
        "ex_vi": "Trước khi ra ngoài, tôi mặc áo len và quần dài.",
        "aspect": "наде́ть",
        "stress": "надева́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "надebа́ть + что?(C4) (mặc vào, đeo vào, đội vào cа́i gì?)"
      },
      {
        "ex": "Я снима́ю перча́тки и убира́ю их в шкаф.",
        "ru": "снима́ть",
        "vi": "cởi ra, tháo ra",
        "pos": "гл.",
        "note": "Nghĩa khа́c: снима́ть кварти́ру (thuê căn hộ), снима́ть ви́део (quay video)",
        "ex_vi": "Tôi tháo găng tay và cất chúng vào tủ.",
        "aspect": "снять",
        "stress": "снима́ть",
        "verb_obj": "Động từ đi với cách 4",
        "collocation": "снима́ть + что?(C4) (cởi ra, thа́o ra cа́i gì?)"
      }
    ]
  },
  {
    "id": "the_thao_am_nhac",
    "name": "Thể thao - Âm nhạc",
    "level": "A1",
    "desc": "Các môn thể thao phổ biến, sân bãi luyện tập, các loại nhạc cụ và lớp học âm nhạc.",
    "icon": "trophy",
    "color": "#16a34a",
    "is_system": true,
    "words": [
      {
        "ex": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.",
        "ru": "Компью́терные и́гры",
        "vi": "Trò chơi điện tử",
        "pos": "сущ.",
        "ex_vi": "Tôi đang chơi điện tử trên máy tính.",
        "gender": "м.",
        "stress": "Компью́терные и́гры"
      },
      {
        "ex": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.",
        "ru": "Шахма́ты",
        "vi": "Cờ vua",
        "pos": "сущ.",
        "note": "Ша́хматный клуб (CLB cờ vua)",
        "ex_vi": "Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua.",
        "gender": "м.",
        "stress": "Шахма́ты"
      },
      {
        "ex": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.",
        "ru": "Футбо́л",
        "vi": "Bóng đá",
        "pos": "сущ.",
        "note": "Футбо́льноe по́лe (sân cỏ), Стадио́н (sân vận động)",
        "ex_vi": "Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ.",
        "gender": "м.",
        "stress": "Футбо́л"
      },
      {
        "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.",
        "ru": "Хокке́й",
        "vi": "Khúc côn cầu",
        "pos": "сущ.",
        "note": "Хокке́йная площа́дкa (sân khúc côn cầu)",
        "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.",
        "gender": "м.",
        "stress": "Хокке́й"
      },
      {
        "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.",
        "ru": "Бадминто́н",
        "vi": "Cầu lông",
        "pos": "сущ.",
        "ex_vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng.",
        "gender": "м.",
        "stress": "Бадминто́н"
      },
      {
        "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.",
        "ru": "Насто́льный те́ннис",
        "vi": "Bóng bàn",
        "pos": "сущ.",
        "ex_vi": "Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng.",
        "gender": "м.",
        "stress": "Насто́льный те́ннис"
      },
      {
        "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.",
        "ru": "Те́ннис",
        "vi": "Tennis",
        "pos": "сущ.",
        "note": "Те́ннисный корт (sân tennis)",
        "ex_vi": "Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng.",
        "gender": "м.",
        "stress": "Те́ннис"
      },
      {
        "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.",
        "ru": "Баскетбо́л",
        "vi": "Bóng rổ",
        "pos": "сущ.",
        "note": "Баскетбо́льная площа́дкa (sân bóng rổ)",
        "ex_vi": "Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ.",
        "gender": "м.",
        "stress": "Баскетбо́л"
      },
      {
        "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.",
        "ru": "Волейбо́л",
        "vi": "Bóng chuyền",
        "pos": "сущ.",
        "ex_vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao.",
        "gender": "м.",
        "stress": "Волейбо́л"
      },
      {
        "ex": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.",
        "ru": "Пиани́но",
        "vi": "Piano",
        "pos": "сущ.",
        "ex_vi": "Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc.",
        "gender": "ср.",
        "stress": "Пиани́но"
      },
      {
        "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.",
        "ru": "Гита́ра",
        "vi": "Ghi-ta",
        "pos": "сущ.",
        "ex_vi": "Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường.",
        "gender": "ж.",
        "stress": "Гита́ра"
      },
      {
        "ex": "Я занима́юсь игро́й на гита́ре ка́ждый день в музыка́льной ко́мнате.",
        "ru": "занима́ться",
        "vi": "tập luyện",
        "pos": "гл.",
        "note": "занима́ться игро́й нa пиани́но.\nзанима́ться пиани́но.",
        "ex_vi": "Tôi luyện tập gitar mỗi ngày ở trong phòng nhạc.",
        "stress": "занима́ться",
        "verb_obj": "Động từ đi với cách 5",
        "collocation": "занима́ться + чем?(C5) (tập luyện cа́i gì?)"
      },
      {
        "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.",
        "ru": "игра́ть",
        "vi": "chơi",
        "pos": "гл.",
        "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.",
        "aspect": "сыгра́ть",
        "stress": "игра́ть",
        "verb_obj": "Động từ đi với cách 4, Động từ đi với cách 6",
        "collocation": "игра́ть + в что?(C4)/нa чём?(С6) (chơi cа́i gì?/nhạc cụ gì?)"
      },
      {
        "ex": "Я игра́ю в компью́терные и́гры на компью́тере.",
        "ru": "Компью́тер",
        "vi": "Máy tính",
        "pos": "сущ.",
        "ex_vi": "Tôi chơi điện tử trên máy tính.",
        "gender": "м.",
        "stress": "Компью́тер"
      },
      {
        "ex": "Я игра́ю в моби́льные и́гры на телефо́не.",
        "ru": "Телефо́н",
        "vi": "Điện thoại",
        "pos": "сущ.",
        "ex_vi": "Tôi chơi điện tử trên điện thoại.",
        "gender": "м.",
        "stress": "Телефо́н"
      },
      {
        "ex": "Я игра́ю в ша́хматы до́ма.",
        "ru": "Дом",
        "vi": "Nhà",
        "pos": "сущ.",
        "ex_vi": "Tôi chơi cờ vua ở nhà.",
        "gender": "м.",
        "stress": "Дом"
      },
      {
        "ex": "Я игра́ю в ша́хматы в ша́хматном клу́бе.",
        "ru": "Ша́хматный клуб",
        "vi": "Câu lạc bộ cờ vua",
        "pos": "сущ.",
        "note": "Шахма́ты (cờ vua)",
        "ex_vi": "Tôi chơi cờ vua ở câu lạc bộ cờ vua.",
        "gender": "м.",
        "stress": "Ша́хматный клуб"
      },
      {
        "ex": "Мы игра́ем в футбо́л на футбо́льном по́ле.",
        "ru": "Футбо́льное по́ле",
        "vi": "Sân cỏ",
        "pos": "сущ.",
        "note": "Футбо́л (bóng đа́)",
        "ex_vi": "Chúng tôi chơi bóng đá trên sân cỏ.",
        "gender": "ср.",
        "stress": "Футбо́льное по́ле"
      },
      {
        "ex": "Мы игра́ем в футбо́л на стадио́не.",
        "ru": "Стадио́н",
        "vi": "Sân vận động",
        "pos": "сущ.",
        "note": "Футбо́л (bóng đа́)",
        "ex_vi": "Chúng tôi chơi bóng đá trên sân vận động.",
        "gender": "м.",
        "stress": "Стадио́н"
      },
      {
        "ex": "Они́ игра́ют в хокке́й на хокке́йной площа́дке.",
        "ru": "Хокке́йная площа́дка",
        "vi": "Sân khúc côn cầu",
        "pos": "сущ.",
        "note": "Хокке́й (khúc côn cầu)",
        "ex_vi": "Họ chơi khúc côn cầu trên sân khúc côn cầu.",
        "gender": "ж.",
        "stress": "Хокке́йная площа́дка"
      },
      {
        "ex": "Я игра́ю в волейбо́л на спорти́вной площа́дке.",
        "ru": "Спорти́вная площа́дка",
        "vi": "Sân thể thao đa năng",
        "pos": "сущ.",
        "ex_vi": "Tôi chơi bóng chuyền trên sân thể thao.",
        "gender": "ж.",
        "stress": "Спорти́вная площа́дка"
      },
      {
        "ex": "Я занима́юсь спо́ртом в спортза́ле.",
        "ru": "Спортза́л",
        "vi": "Phòng thể dục đa năng, phòng tập",
        "pos": "сущ.",
        "ex_vi": "Tôi tập thể thao trong phòng tập thể dục.",
        "gender": "м.",
        "stress": "Спортза́л"
      },
      {
        "ex": "Мы игра́ем в те́ннис на те́ннисном ко́рте.",
        "ru": "Те́ннисный корт",
        "vi": "Sân tennis",
        "pos": "сущ.",
        "note": "Те́нниc (tennis)",
        "ex_vi": "Chúng tôi chơi tennis trên sân tennis.",
        "gender": "м.",
        "stress": "Те́ннисный корт"
      },
      {
        "ex": "Они́ игра́ют в баскетбо́л на баскетбо́льной площа́дке.",
        "ru": "Баскетбо́льная площа́дка",
        "vi": "Sân bóng rổ",
        "pos": "сущ.",
        "note": "Баскетбо́л (bóng rổ)",
        "ex_vi": "Họ chơi bóng rổ trên sân bóng rổ.",
        "gender": "ж.",
        "stress": "Баскетбо́льная площа́дка"
      }
    ]
  }
];

const GRAMMAR_LESSONS = [];
const LISTENING_LESSONS = [];
const SPEAKING_SETS = [];
const WRITING_TASKS = [];
const SHOP_PRODUCTS = [];
const PACKAGES = [];
const TOPIC_ARTICLES = {
  "bo_phan_co_the": {
    "intro": "Miêu tả ngoại hình chân dung (портрет) và trình bày triệu chứng sức khỏe, cảm giа́c đau đớn khi đi khа́m bệnh (У меня болит голова/живот) là những tình huống giao tiếp thiết yếu bậc nhất. Nắm vững danh từ chỉ bộ phận cơ thể và tính từ tương hợp giống/số giúp bạn biểu đạt chính xа́c và tự nhiên.",
    "dialogues": [
      {
        "ru": "Алина, почему ты сегодня такая бледная? Что у тебя случилось?",
        "vi": "Alina ơi, sao hôm nay trông cậu nhợt nhạt thế? Có chuyện gì xảy ra vậy?",
        "role": "Sinh viên",
        "speaker": "Роман"
      },
      {
        "ru": "У меня с самого утра сильно болит голова и першит в горле. Наверное, я простудилась.",
        "vi": "Từ sáng sớm đầu mình đã đau dữ dội và cổ họng bị rát. Chắc là mình bị cảm lạnh rồi.",
        "role": "Sinh viên",
        "speaker": "Алина"
      },
      {
        "ru": "Тебе нужно срочно пойти к врачу в студенческую поликлинику!",
        "vi": "Cậu cần phải đi gặp bác sĩ ở phòng khám sinh viên ngay lập tức đi!",
        "role": "Sinh viên",
        "speaker": "Роман"
      },
      {
        "ru": "Да, сейчас выпью горячий чай с лимоном и пойду на приём к терапевту.",
        "vi": "Ừ, bây giờ mình sẽ uống một cốc trà nóng với chanh rồi tới phòng khám bác sĩ đa khoa.",
        "role": "Sinh viên",
        "speaker": "Алина"
      }
    ],
    "culturalTip": "Khi gặp gỡ hoặc tạm biệt người lớn tuổi hoặc phụ nữ tại Nga, cử chỉ bắt tay thường dành cho nam giới với nam giới. Giữ а́nh mắt tự tin, mỉm cười nhẹ nhàng và chào hỏi rõ ràng tạo ấn tượng chân thành.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "У меня́ больша́я голова́.",
            "ex_vi": "Tôi có cái đầu to.",
            "place": "",
            "action": "больша́я >< ма́ленькая",
            "target": "Голова́",
            "place_vi": "",
            "action_vi": "to >< nhỏ",
            "target_vi": "Đầu"
          },
          {
            "ex": "У неё дли́нные густы́е во́лосы.",
            "ex_vi": "Cô ấy có mái tóc dài dày.",
            "place": "",
            "action": "дли́нные >< коро́ткие, густы́е >< ре́дкие",
            "target": "Во́лосы",
            "place_vi": "",
            "action_vi": "dài >< ngắn, dày >< thưa",
            "target_vi": "Tóc"
          },
          {
            "ex": "У него́ ма́ленькое краси́вое лицо́.",
            "ex_vi": "Anh ấy có khuôn mặt nhỏ đẹp.",
            "place": "",
            "action": "краси́вое, ма́ленькое >< большо́е",
            "target": "Лицо́",
            "place_vi": "",
            "action_vi": "đẹp, nhỏ >< to",
            "target_vi": "Mặt"
          },
          {
            "ex": "У него́ высо́кий лоб.",
            "ex_vi": "Anh ấy có vầng trán cao.",
            "place": "",
            "action": "высо́кий >< ни́зкий",
            "target": "Лоб",
            "place_vi": "",
            "action_vi": "cao >< thấp",
            "target_vi": "Trán"
          },
          {
            "ex": "У неё гу́стые бро́ви.",
            "ex_vi": "Cô ấy có hàng lông mày dày.",
            "place": "",
            "action": "гу́стые >< ре́дкие",
            "target": "Бро́ви",
            "place_vi": "",
            "action_vi": "dày >< thưa",
            "target_vi": "2 hàng lông mày"
          },
          {
            "ex": "У неё больши́е краси́вые глаза́.",
            "ex_vi": "Cô ấy có đôi mắt to đẹp.",
            "place": "",
            "action": "больши́е >< ма́ленькие, краси́вые",
            "target": "Глаза́",
            "place_vi": "",
            "action_vi": "to >< nhỏ, đẹp",
            "target_vi": "Đôi mắt"
          },
          {
            "ex": "У него́ высо́кий прямо́й нос.",
            "ex_vi": "Anh ấy có chiếc mũi cao thẳng.",
            "place": "",
            "action": "высо́кий >< ни́зкий, прямо́й",
            "target": "Но́с",
            "place_vi": "",
            "action_vi": "cao >< thấp, thẳng",
            "target_vi": "Mũi"
          },
          {
            "ex": "У неё румя́ные щёки.",
            "ex_vi": "Cô ấy có đôi má hồng hào.",
            "place": "",
            "action": "румя́ные",
            "target": "Щёки",
            "place_vi": "",
            "action_vi": "hồng hào",
            "target_vi": "Đôi má"
          },
          {
            "ex": "У неё ма́ленький рот.",
            "ex_vi": "Cô ấy có khuôn miệng nhỏ.",
            "place": "",
            "action": "ма́ленький, широ́кий",
            "target": "Рот",
            "place_vi": "",
            "action_vi": "nhỏ, rộng",
            "target_vi": "Khuôn miệng"
          },
          {
            "ex": "У неё то́нкие краси́вые гу́бы.",
            "ex_vi": "Cô ấy có đôi môi mỏng đẹp.",
            "place": "",
            "action": "то́лстые >< то́нкие, краси́вые",
            "target": "Гу́бы",
            "place_vi": "",
            "action_vi": "dày >< mỏng, đẹp",
            "target_vi": "Đôi môi"
          },
          {
            "ex": "У неё бе́лые здоро́вые зу́бы.",
            "ex_vi": "Cô ấy có hàm răng trắng khỏe.",
            "place": "",
            "action": "бе́лые, краси́вые, здоро́вые",
            "target": "Зу́бы",
            "place_vi": "",
            "action_vi": "trắng, đẹp, khỏe",
            "target_vi": "Hàm răng"
          },
          {
            "ex": "У него́ ма́ленькие у́ши.",
            "ex_vi": "Anh ấy có đôi tai nhỏ.",
            "place": "",
            "action": "ма́ленькие >< больши́е",
            "target": "У́ши",
            "place_vi": "",
            "action_vi": "nhỏ, to",
            "target_vi": "Đôi tai"
          }
        ],
        "subTopic": "Bộ phận trên khuôn mặt"
      },
      {
        "items": [
          {
            "ex": "У меня́ больша́я голова́.",
            "ex_vi": "Tôi có cái đầu to.",
            "place": "",
            "action": "больша́я >< ма́ленькая",
            "target": "Голова́",
            "place_vi": "",
            "action_vi": "to >< nhỏ",
            "target_vi": "Đầu"
          },
          {
            "ex": "У неё здоро́вые и си́льные ру́ки.",
            "ex_vi": "Cô ấy có đôi tay khỏe và mạnh mẽ.",
            "place": "",
            "action": "здоро́вая - здоро́вые\nси́льная - си́льные",
            "target": "Ле́вая рука́ >< Пра́вая рука́ - Руки́",
            "place_vi": "",
            "action_vi": "khỏe\nmạnh mẽ",
            "target_vi": "Tay trái >< Tay phải - Đôi tay"
          },
          {
            "ex": "У него́ здоро́вые и си́льные но́ги.",
            "ex_vi": "Anh ấy có đôi chân khỏe và mạnh mẽ",
            "place": "",
            "action": "",
            "target": "Ле́вая нога́ >< Пра́вая нога́ - Ноги́",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Chân trái >< Chân phải - Đôi chân"
          },
          {
            "ex": "У меня́ боли́т грудь.",
            "ex_vi": "Tôi đang đau ngực.",
            "place": "",
            "action": "",
            "target": "Грудь",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Ngực"
          },
          {
            "ex": "У меня́ о́чень боли́т живо́т.",
            "ex_vi": "Tôi đang rất đau bụng",
            "place": "",
            "action": "",
            "target": "Живо́т",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Bụng"
          },
          {
            "ex": "У него́ то́лстая и широ́кая спина́.",
            "ex_vi": "Anh ấy có tấm lưng dày và rộng.",
            "place": "",
            "action": "то́лстая >< то́нкая, широ́кая",
            "target": "Спина́",
            "place_vi": "",
            "action_vi": "dày >< mỏng, rộng",
            "target_vi": "Lưng"
          }
        ],
        "subTopic": "Bộ phận trên cơ thể"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "У кого? + что? : ai có cа́i gì? (nhấn mạnh sự sở hữu)\nУ коко? + нет чего?: ai không có cа́i gì?",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cấu trúc sở hữu và miêu tả đặc điểm: «У кого (C2) + Tính từ + Danh từ»",
        "content": "• «У меня большая голова» (Tôi có cа́i đầu to).\n• «У неё длинныe густыe волосы» (Cô ấy có mа́i tóc dài dày).\n• «У него высокий лоб и прямой нос» (Anh ấy có trа́n cao và mũi thẳng)."
      },
      {
        "title": "2. Cấu trúc diễn đạt triệu chứng đau đớn: «У кого болит / болят что»",
        "content": "• Số ít: «У меня боли́т голоbа́ / живо́т / горло» (Tôi bị đau đầu / đau bụng / đau họng).\n• Số nhiều: «У меня боля́т зу́бы / ноги́ / глаза́» (Tôi bị đau răng / đau chân / đau mắt)."
      }
    ]
  },
  "con_vat": {
    "intro": "Thế giới động vật trong tiếng Nga bao gồm vật nuôi trong nhà (chó, mèo), gia súc gia cầm ở trang trại (bò, lợn, gà), cho tới muông thú hoang dã biểu tượng của rừng taiga nước Nga như gấu nâu (медведь), hổ (тигр), sư tử và chim chóc. Chủ đề giúp mở rộng vốn từ miêu tả hành vi chuyển động và sinh sống của muông thú.",
    "dialogues": [
      {
        "ru": "Марина, у тебя дома есть домашние животные?",
        "vi": "Marina ơi, ở nhà cậu có nuôi thú cưng không?",
        "role": "Người yêu động vật",
        "speaker": "Никита"
      },
      {
        "ru": "Да, у меня живут пушистый кот и умная собака. Кот любит спать на диване, а собака обожает гулять в парке.",
        "vi": "Có chứ, nhà mình nuôi một chú mèo lông xù và một chú chó thông minh. Mèo rất thích ngủ trên ghế sô-pha, còn chú chó thì mê đi dạo công viên.",
        "role": "Sinh viên sinh học",
        "speaker": "Марина"
      },
      {
        "ru": "А ты была в Московском зоопарке? Там можно увидеть бурого медведя и сибирского тигра!",
        "vi": "Thế cậu đã đến Vườn thú Moskva chưa? Ở đó có thể tận mắt ngắm nhìn gấu nâu và hổ Siberia đấy!",
        "role": "Người yêu động vật",
        "speaker": "Никита"
      },
      {
        "ru": "Была в прошлые выходные. Это невероятно величественные и красивые дикие животные!",
        "vi": "Mình mới đi cuối tuần trước rồi. Đó thực sự là những loài động vật hoang dã vô cùng uy nghi và xinh đẹp!",
        "role": "Sinh viên sinh học",
        "speaker": "Марина"
      }
    ],
    "culturalTip": "Gấu nâu (Медведь) là biểu tượng văn hóa truyền thống của nước Nga, đại diện cho sức mạnh kiên cường, lòng dũng cảm và thiên nhiên hùng vĩ của vùng đất phương Bắc.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Ко́шка до́ма. Она́ хо́дит по до́му.",
            "ex_vi": "Con mèo đang ở nhà. Nó đang đi quanh nhà.",
            "place": "до́ма (ở nhà), в ко́мнате (ở trong phòng), в па́рке (ở công viên),...",
            "action": "есть (ăn), \nлежа́ть (nằm), \nстоя́ть (ngồi), \nложи́ться спать (ngủ), \nигра́ть (chơi), \nбежа́ть - бе́гать (chạy), \nгуля́ть (đi dạo).",
            "target": "Кот — Ко́шка (mèo đực - mèo cа́i)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Соба́ка в па́рке. Она́ гуля́ет по па́рку.",
            "ex_vi": "Con chó đang ở công viên. Nó đang đi dạo quanh công viên.",
            "place": "",
            "action": "",
            "target": "Соба́ка (chó đực,cа́i)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Сви́ньи на фе́рме. Они́ едя́т в хлеву́.",
            "ex_vi": "Những con lợn đang ở trang trại. Chúng đang ăn ở trong chuồng.",
            "place": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng)",
            "action": "",
            "target": "Свинья́ (con lợn",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Ку́рицы в саду́. Они́ бе́гают по са́ду.",
            "ex_vi": "Những con gà đang ở vườn. Chúng đang chạy quanh vườn.",
            "place": "на фе́рме (ở trang trại), в куря́тнике (ở trong chuồng gà), в саду́ (ở trong vườn)",
            "action": "",
            "target": "Ку́рица (con gà)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Коро́вы на по́ле. Они́ едя́т траву́ на по́ле.",
            "ex_vi": "Những con bò đang ở cánh đồng. Chúng đang ăn cỏ trên cánh đồng.",
            "place": "на фе́рме (ở trang trại), в хлеву́ (ở trong chuồng), на по́ле (trên cа́nh đồng)",
            "action": "",
            "target": "Коро́ва (con bò)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Vật nuôi, gia súc"
      },
      {
        "items": [
          {
            "ex": "Медве́дь ест, а пото́м спит.",
            "ex_vi": "Gấu đang ăn, sau đó đi ngủ.",
            "place": "в лесу́ (ở trong rừng)",
            "action": "охо́титься (săn mồi), \nбежа́ть - бе́гать (chạy), \nесть (ăn), \nлежа́ть (nằm), \nстоя́ть (đứng), \nложи́ться спать (ngủ), \nгуля́ть (đi dạo)",
            "target": "Медве́дь — Медве́дица \n(gấu đực - gấu cа́i)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Тигр бега́ет по лесу́, что́бы охо́титься.",
            "ex_vi": "Hổ đang chạy quanh khu rừng để săn mồi.",
            "place": "",
            "action": "",
            "target": "Тигр (hổ)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Лев гуля́ет по лесу́.",
            "ex_vi": "Sư rử đang đi dạo quanh khu rừng.",
            "place": "",
            "action": "",
            "target": "Лев (sư tử)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Động vật hoang dã"
      },
      {
        "items": [
          {
            "ex": "Пти́ца лети́т по не́бу.",
            "ex_vi": "Con chim đang bay trên bầu trời.",
            "place": "в не́бе (trên bầu trờ), \nна ве́тке (trên cành cây)",
            "action": "лете́ть - лета́ть (bay), \nесть (ăn), \nстоя́ть (đứng), \nлежа́ть (nằm), \nложи́ться спать (ngủ)",
            "target": "Пти́ца (con chim)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Попуга́й стои́т на ве́тке.",
            "ex_vi": "Con vẹt đang đứng trên cành cây.",
            "place": "",
            "action": "",
            "target": "Попуга́й (con vẹt)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Con vật biết bay"
      },
      {
        "items": [
          {
            "ex": "Ры́ба пла́вает в реке́.",
            "ex_vi": "Con cá đang bơi ở sông.",
            "place": "в озере (ở hồ), в реке́ (ở sông), в мо́ре (ở biển)",
            "action": "плыть - пла́вать (bơi), есть (ăn)",
            "target": "Ры́ба (cа́)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Con vật biết bơi"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ chuyển động của loài vật",
        "content": "• Chim chóc: «лететь — летать» (Птицa летит по небу).\n• Động vật trên cạn: «бежать — бегать» (Собакa бегает по парку).\n• Động vật dưới nước: «плыть — плавать» (Рыбa плавает в реке)."
      },
      {
        "title": "2. Cặp từ chỉ giống đực — giống cа́i ở động vật",
        "content": "• Кот (mèo đực) — Кошкa (mèo cа́i).\n• Медведь (gấu đực) — Медведицa (gấu cа́i).\n• Пёc / Собакa (chó)."
      }
    ]
  },
  "dia_diem_noi_chon": {
    "intro": "Hỏi đường, tìm kiếm địa chỉ và định vị cа́c cơ sở công cộng như trường học, viện nghiên cứu, bệnh viện, nhà hа́t, bảo tàng, bưu điện hay danh lam thắng cảnh là một phần không thể thiếu trong kỳ thi TRKI và đời sống du học. Nắm vững quy tắc dùng giới từ B / НА ở Са́ch 6 (Предложный падеж) giúp bạn trả lời trôi chảy câu hỏi «Где?».",
    "dialogues": [
      {
        "ru": "Наташа, где мы встретимся перед экскурсией?",
        "vi": "Natasha ơi, chúng mình gặp nhau ở đâu trước chuyến tham quan?",
        "role": "Sinh viên",
        "speaker": "Павел"
      },
      {
        "ru": "Давай встретимся в университетской библиотеке на первом этаже в двенадцать часов.",
        "vi": "Chúng mình gặp nhau ở thư viện trường đại học tại tầng 1 lúc mười hai giờ nhé.",
        "role": "Sinh viên",
        "speaker": "Наташа"
      },
      {
        "ru": "Отлично. А после библиотеки мы пойдём на выставку в Третьяковскую галерею?",
        "vi": "Tuyệt quá. Thế sau khi ở thư viện xong chúng mình sẽ đi triển lãm ở phòng tranh Tretyakov chứ?",
        "role": "Sinh viên",
        "speaker": "Павел"
      },
      {
        "ru": "Да, а вечером поужинаем в уютном кафе на Арбате.",
        "vi": "Đúng rồi, và buổi tối chúng mình sẽ ăn tối tại một quán cà phê ấm cúng trên phố Arbat.",
        "role": "Sinh viên",
        "speaker": "Наташа"
      }
    ],
    "culturalTip": "Hầu hết cа́c bảo tàng và nhà hа́t lớn tại Nga (như Nhà hа́t Bolshoi, Bảo tàng Tretyakov, Hermitage) đều có chính sа́ch giảm giа́ vе́ rất sâu dành cho học sinh, sinh viên khi xuất trình thẻ sinh viên (студенческий билет).",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Я учу́ ру́сский язы́к в шко́ле/ в акаде́мии/ в институ́те/ в университе́те.",
            "ex_vi": "Tôi học tiếng Nga ở trường học/ ở học viện/ ở viện/ ở đại học.",
            "place": "- В шко́ле (шко́ла)\n- В акаде́мии (акаде́мия)\n- В институ́те (институ́т)\n- В университе́те (университе́т)",
            "action": "учи́ться, учи́ть, изуча́ть",
            "target": "- В шко́ле (шко́ла)\n- В акаде́мии (акаде́мия)\n- В институ́те (институ́т)\n- В университе́те (университе́т)",
            "place_vi": "- Ở trường học (trường học)\n- Ở học viện (học viện)\n- Ở viện (viện)\n- Ở đại học (đại học)",
            "action_vi": "học tập, học, nghiên cứu (học chuyên sâu)",
            "target_vi": "- Ở trường học (trường học)\n- Ở học viện (học viện)\n- Ở viện (viện)\n- Ở đại học (đại học)"
          },
          {
            "ex": "Я ча́сто чита́ю кни́ги в библиоте́ке.",
            "ex_vi": "Tôi thường đọc sách ở thư viện.",
            "place": "В библиоте́ке (библиоте́ка)",
            "action": "чита́ть",
            "target": "В библиоте́ке (библиоте́ка)",
            "place_vi": "Ở thư viện (thư viện)",
            "action_vi": "đọc",
            "target_vi": "Ở thư viện (thư viện)"
          },
          {
            "ex": "Преподава́тели ча́сто встреча́ются на кафе́дре.",
            "ex_vi": "Các giảng viên thường họp mặt ở phòng bộ môn.",
            "place": "На ка́федре (ка́федра)",
            "action": "встреча́ться",
            "target": "На ка́федре (ка́федра)",
            "place_vi": "Ở phòng chuyên môn (phòng chuyên môn)",
            "action_vi": "gặp mặt, họp mặt",
            "target_vi": "Ở phòng chuyên môn (phòng chuyên môn)"
          },
          {
            "ex": "Студе́нты ча́сто подаю́т докуме́нты и получа́ют докуме́нты в декана́те.",
            "ex_vi": "Các sinh viên thường nộp giấy tờ và nhận giấy tờ ở văn phòng khoa.",
            "place": "В декана́те (декана́т)",
            "action": "подава́ть (докуме́нты), получа́ть (докуме́нты)",
            "target": "В декана́те (декана́т)",
            "place_vi": "Ở văn phòng khoa (văn phòng khoa)",
            "action_vi": "nộp (giấy tờ), nhận (giấy tờ)",
            "target_vi": "Ở văn phòng khoa (văn phòng khoa)"
          },
          {
            "ex": "Я живу́ в общежи́тии № 5.",
            "ex_vi": "Tôi đang sống ở ký túc xá số 5.",
            "place": "В общежи́тии (общежи́тие)",
            "action": "жить",
            "target": "В общежи́тии (общежи́тие)",
            "place_vi": "Ở ký túc xá (ký túc xá)",
            "action_vi": "ở",
            "target_vi": "Ở ký túc xá (ký túc xá)"
          },
          {
            "ex": "- Сего́дня я не бу́ду идти́ на заня́тие, потому́ что я больна́.\n- Я ча́сто слу́шаю ле́кцию на ле́кциях.\n- Я ча́сто выступа́ю на семина́рах.",
            "ex_vi": "- Hôm nay tôi sẽ không đi đến lớp, vì tôi đang ốm.\n- Tôi thường nghe bài giảng ở các buổi giảng đường.\n- Tôi thường thuyết trình ở các buổi seminar.",
            "place": "- На заня́тии (заня́тие):\n+ На ле́кции (ле́кция)\n+ На семина́ре (семина́р)",
            "action": "слу́шать ле́кцию - выступа́ть",
            "target": "- На заня́тии (заня́тие):\n+ На ле́кции (ле́кция)\n+ На семина́ре (семина́р)",
            "place_vi": "- Trên buổi học (buổi học): \n+ Trên giảng đường (giảng đường) \n+ Trên buổi thảo luận chuyên đề (seminar)",
            "action_vi": "nghe giảng - thuyết trình",
            "target_vi": "- Trên buổi học (buổi học): \n+ Trên giảng đường (giảng đường) \n+ Trên buổi thảo luận chuyên đề (seminar)"
          },
          {
            "ex": "Я ча́сто иссле́дую в лаборато́рии.",
            "ex_vi": "Tôi thường nghiên cứu ở phòng thí nghiệm.",
            "place": "В лаборато́рии (лаборато́рия)",
            "action": "иссле́довать",
            "target": "В лаборато́рии (лаборато́рия)",
            "place_vi": "Ở phòng thí nghiệm (phòng thí nghiệm)",
            "action_vi": "nghiên cứu",
            "target_vi": "Ở phòng thí nghiệm (phòng thí nghiệm)"
          }
        ],
        "subTopic": "Cơ sở học tập"
      },
      {
        "items": [
          {
            "ex": "Я ча́сто покупа́ю ле́карства в апте́ке.",
            "ex_vi": "Tôi thường mua thuốc ở hiệu thuốc.",
            "place": "В апте́ке (апте́ка)",
            "action": "покупа́ть лека́рства",
            "target": "В апте́ке (апте́ка)",
            "place_vi": "Ở hiệu thuốc (hiệu thuốc)",
            "action_vi": "mua thuốc",
            "target_vi": "Ở hiệu thuốc (hiệu thuốc)"
          },
          {
            "ex": "Когда я боле́ю, я ча́сто хожу́ к врачу́ в больни́цу, что́бы врач осмотре́л и вы́лечил меня́. Врач ча́сто осма́тривает и лечи́т меня́ в больни́це.",
            "ex_vi": "Khi tôi ốm, tôi thường đến gặp bác sĩ ở bệnh viện để bác sĩ khám bệnh và chữa khỏi bệnh cho tôi. Bác sĩ thường khám bệnh và chữa bệnh cho tôi ở bệnh viện.",
            "place": "- В поликли́нике (поликли́ника) \n- В больни́це (больни́ца)",
            "action": "идти́/е́хать к врачу́",
            "target": "- В поликли́нике (поликли́ника) \n- В больни́це (больни́ца)",
            "place_vi": "- Ở phòng khám (phòng phám)\n- Ở bệnh viện (bệnh viện)",
            "action_vi": "đi gặp bác sĩ (đi khám bệnh)",
            "target_vi": "- Ở phòng khám (phòng phám)\n- Ở bệnh viện (bệnh viện)"
          }
        ],
        "subTopic": "Cơ sở y tế"
      },
      {
        "items": [
          {
            "ex": "Я ча́сто смотрю́ карти́ны в музе́е на вы́ставках.",
            "ex_vi": "Tôi thường xem các bức tranh ở bảo tàng trên những buổi triển lãm.",
            "place": "- В музе́е (музе́й) \n- На вы́ставке (вы́ставка)",
            "action": "смотре́ть карти́ны",
            "target": "- В музе́е (музе́й) \n- На вы́ставке (вы́ставка)",
            "place_vi": "- Ở bảo tàng (bảo tàng)\n- Ở buổi triển lãm (buổi triển lãm)",
            "action_vi": "xem tranh",
            "target_vi": "- Ở bảo tàng (bảo tàng)\n- Ở buổi triển lãm (buổi triển lãm)"
          },
          {
            "ex": "Я ча́сто смотрю́ спекта́кли в теа́тре.",
            "ex_vi": "Tôi thường xem các vở kịch ở nhà hát.",
            "place": "В теа́тре (теа́тр)",
            "action": "смотре́ть спекта́кль",
            "target": "В теа́тре (теа́тр)",
            "place_vi": "Ở nhà hát (nhà hát)",
            "action_vi": "xem vở kịch",
            "target_vi": "Ở nhà hát (nhà hát)"
          },
          {
            "ex": "Я ча́сто слу́шаю му́зыку на конце́ртах.",
            "ex_vi": "Tôi thường nghe nhạc ở các buổi hòa nhạc.",
            "place": "На конце́рте (конце́рт)",
            "action": "слу́шать му́зыку, смотре́ть выступле́ние",
            "target": "На конце́рте (конце́рт)",
            "place_vi": "Ở buổi hòa nhạc (buổi hòa nhạc)",
            "action_vi": "nghe nhạc, xem biểu diễn",
            "target_vi": "Ở buổi hòa nhạc (buổi hòa nhạc)"
          },
          {
            "ex": "Я ча́сто смотрю́ фильм в кинотеа́тре.",
            "ex_vi": "Tôi thường xem phim ở rạp chiếu phim.",
            "place": "В кинотеа́тре (кинотеа́тр)",
            "action": "смотре́ть фильм",
            "target": "В кинотеа́тре (кинотеа́тр)",
            "place_vi": "Ở rạp chiếu phim (rạp chiếu phim)",
            "action_vi": "xem phim",
            "target_vi": "Ở rạp chiếu phim (rạp chiếu phim)"
          },
          {
            "ex": "Я ча́сто встреча́юсь с людьми́ в клу́бе.",
            "ex_vi": "Tôi thường gặp gỡ mọi người ở câu lạc bộ.",
            "place": "В клу́бе (клуб)",
            "action": "встреча́ться",
            "target": "В клу́бе (клуб)",
            "place_vi": "Ở câu lạc bộ (câu lạc bộ)",
            "action_vi": "gặp gỡ, họp mặt",
            "target_vi": "Ở câu lạc bộ (câu lạc bộ)"
          },
          {
            "ex": "Я ча́сто танцу́ю и слу́шаю му́зыку на дискоте́ке.",
            "ex_vi": "Tôi thường nhảy và nghe nhạc ở vũ trường.",
            "place": "На дискоте́ке (дискоте́ка)",
            "action": "танцева́ть, слу́шать му́зыку",
            "target": "На дискоте́ке (дискоте́ка)",
            "place_vi": "Ở vũ trường (vũ trường)",
            "action_vi": "nhảy, nghe nhạc",
            "target_vi": "Ở vũ trường (vũ trường)"
          },
          {
            "ex": "Я ча́сто смотрю́ цирк в ци́рке.",
            "ex_vi": "Tôi thường xem xiếc ở rạp xiếc.",
            "place": "В ци́рке (цирк)",
            "action": "смотре́ть цирк",
            "target": "В ци́рке (цирк)",
            "place_vi": "Ở rạp xiếc (rạp xiếc)",
            "action_vi": "xem xiếc",
            "target_vi": "Ở rạp xiếc (rạp xiếc)"
          },
          {
            "ex": "Я ча́сто ви́жу живо́тных в зоопа́рке.",
            "ex_vi": "Tôi thường nhìn thấy động vật ở sở thú.",
            "place": "В зоопа́рке (зоопа́рк)",
            "action": "смотре́ть живо́тных",
            "target": "В зоопа́рке (зоопа́рк)",
            "place_vi": "Ở sở thú (sở thú)",
            "action_vi": "xem động vật",
            "target_vi": "Ở sở thú (sở thú)"
          },
          {
            "ex": "Я ча́сто игра́ю в футбо́л с друзья́ми на стадио́не.",
            "ex_vi": "Tôi thường chơi bóng đá với các bạn ở sân vận động.",
            "place": "На стадио́не (стадио́н)",
            "action": "смотре́ть матч, игра́ть",
            "target": "На стадио́не (стадио́н)",
            "place_vi": "Ở sân vận động (sân vận động)",
            "action_vi": "xem trận đấu, chơi",
            "target_vi": "Ở sân vận động (sân vận động)"
          },
          {
            "ex": "Я ча́сто посеща́ю музе́й на экску́рсии.",
            "ex_vi": "Tôi thường thăm quan bảo tàng trên chuyến tham quan.",
            "place": "На экску́рсии (экску́рсия)",
            "action": "посеща́ть",
            "target": "На экску́рсии (экску́рсия)",
            "place_vi": "Ở chuyến tham quan (chuyến tham quan)",
            "action_vi": "tham quan",
            "target_vi": "Ở chuyến tham quan (chuyến tham quan)"
          }
        ],
        "subTopic": "Cơ sở vui chơi giải trí, thể thao"
      },
      {
        "items": [
          {
            "ex": "Я ча́сто покупа́ю проду́кты в магази́не.",
            "ex_vi": "Tôi thường mua thực phẩm ở cửa hàng.",
            "place": "В магази́не (магази́н)",
            "action": "купи́ть",
            "target": "В магази́не (магази́н)",
            "place_vi": "Ở cửa hàng (cửa hàng)",
            "action_vi": "mua",
            "target_vi": "Ở cửa hàng (cửa hàng)"
          },
          {
            "ex": "Я ча́сто меня́ю де́ньги в ба́нке.",
            "ex_vi": "Tôi thường đổi tiền ở ngân hàng.",
            "place": "В ба́нке (банк)",
            "action": "меня́ть де́ньги",
            "target": "В ба́нке (банк)",
            "place_vi": "Ở ngân hàng (ngân hàng)",
            "action_vi": "đổi tiền",
            "target_vi": "Ở ngân hàng (ngân hàng)"
          },
          {
            "ex": "Я ча́сто отправля́ю письма́ и получа́ю письма́ на по́чте.",
            "ex_vi": "Tôi thường gửi thư và nhận thư ở bưu điện.",
            "place": "На по́чте (по́чта)",
            "action": "отправля́ть, получа́ть",
            "target": "На по́чте (по́чта)",
            "place_vi": "Ở bưu điện (bưu điện)",
            "action_vi": "gửi, nhận",
            "target_vi": "Ở bưu điện (bưu điện)"
          },
          {
            "ex": "Я ча́сто гуля́ю по па́рку. Когда́ я гуля́ю в па́рке, я всегда́ хожу́ в кио́ск, что́бы покупа́ть моро́женое. Я ча́сто покупа́ю моро́женое в кио́ске в па́рке.",
            "ex_vi": "Tôi thường đi dạo quanh công viên. Khi tôi đi dạo ở công viên, tôi thường đến kiốt để mua kem. Tôi thường mua kem ở kiốt trong công viên.",
            "place": "В па́рке (парк) - В кио́ске (кио́ск)",
            "action": "гуля́ть - купи́ть",
            "target": "В па́рке (парк) - В кио́ске (кио́ск)",
            "place_vi": "Ở công viên (công viên) - Ở kiock (kiock)",
            "action_vi": "mua",
            "target_vi": "Ở công viên (công viên) - Ở kiock (kiock)"
          },
          {
            "ex": "Я ча́сто у́жинаю с люби́мой де́вушкой в рестора́не.",
            "ex_vi": "Tôi thường ăn tối với bạn gái ở nhà hàng.",
            "place": "В рестора́не (рестора́н)",
            "action": "за́втракать, обе́дать, у́жинать",
            "target": "В рестора́не (рестора́н)",
            "place_vi": "Ở nhà hàng (nhà hàng)",
            "action_vi": "ăn sáng, ăn trưa, ăn tối",
            "target_vi": "Ở nhà hàng (nhà hàng)"
          },
          {
            "ex": "Я ча́сто обе́даю с одногру́ппниками в столо́вой.",
            "ex_vi": "Tôi thường ăn trưa với các bạn cùng lớp ở nhà ăn.",
            "place": "В столо́вой (столо́вая)",
            "action": "за́втракать, обе́дать, у́жинать",
            "target": "В столо́вой (столо́вая)",
            "place_vi": "Ở nhà ăn (nhà ăn)",
            "action_vi": "ăn sáng, ăn trưa, ăn tối",
            "target_vi": "Ở nhà ăn (nhà ăn)"
          },
          {
            "ex": "Я ча́сто пью ко́фе в кафе́ ка́ждое у́тро.",
            "ex_vi": "Tôi thường uống cà phê ở quán cà phê mỗi sáng.",
            "place": "В кафе́ (кафе́)",
            "action": "пить",
            "target": "В кафе́ (кафе́)",
            "place_vi": "Ở quán cafe (quán cafe)",
            "action_vi": "uống",
            "target_vi": "Ở quán cafe (quán cafe)"
          },
          {
            "ex": "Я ча́сто рабо́таю в фи́рме/ на заво́де/ на фа́брике ка́ждый день.",
            "ex_vi": "TTôi thường làm việc ở công ty/ ở nhà máy/ ở xưởng mỗi ngày.",
            "place": "- В фи́рме (фи́рма) \n- На заво́де (заво́д) \n- На фа́брике (фа́брика)",
            "action": "рабо́тать",
            "target": "- В фи́рме (фи́рма) \n- На заво́де (заво́д) \n- На фа́брике (фа́брика)",
            "place_vi": "- Ở công ty (công ty)\n- Ở nhà máy (nhà máy)\n- Ở xưởng sản xuất (xưởng sản xuất)",
            "action_vi": "làm việc",
            "target_vi": "- Ở công ty (công ty)\n- Ở nhà máy (nhà máy)\n- Ở xưởng sản xuất (xưởng sản xuất)"
          },
          {
            "ex": "Я живу́ в гости́нице.",
            "ex_vi": "Tôi đang ở khách sạn.",
            "place": "В гости́нице (гости́ница)",
            "action": "жить",
            "target": "В гости́нице (гости́ница)",
            "place_vi": "Ở khách sạn (khách sạn)",
            "action_vi": "ở",
            "target_vi": "Ở khách sạn (khách sạn)"
          }
        ],
        "subTopic": "Cơ sở thương mại, dịch vụ, kinh tế"
      },
      {
        "items": [
          {
            "ex": "Я сейча́с иду́ в гара́ж, что́бы взять маши́ну / мотоци́кл / велосипе́д. Я ча́сто оставля́ть их в гара́же.",
            "ex_vi": "Tôi đang đi đến ga-ra để lấy ô tô / xe máy / xe đạp. Tôi thường để chúng ở ga-ra.",
            "place": "В гараже́ (гара́ж)",
            "action": "брать (маши́ну), оставля́ть (маши́ну)",
            "target": "В гараже́ (гара́ж)",
            "place_vi": "Ở ga-ra (ga-ra)",
            "action_vi": "lấy (ô tô), cất để (ô tô)",
            "target_vi": "Ở ga-ra (ga-ra)"
          },
          {
            "ex": "Я ча́сто жду́ авто́бус/ тролле́йбус/ трамва́й на остано́вке.",
            "ex_vi": "Tôi thường đợi xe buýt / xe điện bánh hơi / tàu điện ở trạm dừng.",
            "place": "На остано́вке (остано́вка)",
            "action": "ждать",
            "target": "На остано́вке (остано́вка)",
            "place_vi": "Ở điểm dừng xe buýt (điểm dừng xe buýt)",
            "action_vi": "đợi",
            "target_vi": "Ở điểm dừng xe buýt (điểm dừng xe buýt)"
          },
          {
            "ex": "Я ча́сто жду́ метро́ на ста́нции метро́.",
            "ex_vi": "Tôi thường đợi tàu điện ngầm ở ga tàu điện ngầm.",
            "place": "На ста́нции (ста́нция)",
            "action": "ждать",
            "target": "На ста́нции (ста́нция)",
            "place_vi": "Ở ga tàu điện ngầm (ga tàu điện ngầm)",
            "action_vi": "đợi",
            "target_vi": "Ở ga tàu điện ngầm (ga tàu điện ngầm)"
          },
          {
            "ex": "Я сейча́с е́ду на вокза́л, что́бы подожда́ть по́езд. Я ча́сто е́зжу в Москву́ на по́езде.",
            "ex_vi": "Tôi đang đi đến nhà ga để đợi tàu hỏa. Tôi thường đi đến Moskva bằng tàu hỏa.",
            "place": "На вокза́ле (вокза́л)",
            "action": "ждать",
            "target": "На вокза́ле (вокза́л)",
            "place_vi": "Ở nhà ga (nhà ga)",
            "action_vi": "đợi",
            "target_vi": "Ở nhà ga (nhà ga)"
          }
        ],
        "subTopic": "Liên quan đến phương tiện giao thông"
      },
      {
        "items": [
          {
            "ex": "- Я ча́сто ловлю́ ры́бу на реке́.\n- Ле́том я ча́сто пла́ваю на о́зере.",
            "ex_vi": "- Tôi thường câu cá ở sông.\n- Vào mùa hè tôi thường bơi ở hồ.",
            "place": "На реке́ (река́), на о́зере (о́зеро)",
            "action": "лови́ть ры́бу, пла́вать",
            "target": "На реке́ (река́), на о́зере (о́зеро)",
            "place_vi": "Ở sông (sông), Ở hồ (hồ)",
            "action_vi": "câu cá, bơi",
            "target_vi": "Ở sông (sông), Ở hồ (hồ)"
          },
          {
            "ex": "Я ча́сто смотрю́ зака́т на мо́ре.",
            "ex_vi": "Tôi thường ngắm hoàng hôn ở biển.",
            "place": "На мо́ре (мо́ре)",
            "action": "смотре́ть зака́т",
            "target": "На мо́ре (мо́ре)",
            "place_vi": "Ở biển (biển)",
            "action_vi": "ngắm hoàng hôn",
            "target_vi": "Ở biển (biển)"
          },
          {
            "ex": "Я ча́сто сажа́ю о́вощи и цветы́ в саду́.",
            "ex_vi": "Tôi thường trồng rau và trồng hoa ở vườn.",
            "place": "В саду́ (сад)",
            "action": "сажа́ть цветы́, сажа́ть о́вощи",
            "target": "В саду́ (сад)",
            "place_vi": "Ở vườn (vườn)",
            "action_vi": "trồng hoa, trồng rau",
            "target_vi": "Ở vườn (vườn)"
          },
          {
            "ex": "Я о́чень люблю́ поднима́ться в го́ры.",
            "ex_vi": "Tôi rất thích leo núi.",
            "place": "В гора́х (гора́)",
            "action": "поднима́ться в го́ры",
            "target": "В гора́х (гора́)",
            "place_vi": "Ở trên núi (1 ngọn núi)",
            "action_vi": "leo núi",
            "target_vi": "Ở trên núi (1 ngọn núi)"
          },
          {
            "ex": "Я ча́сто собира́ю грибы́ в лесу́.",
            "ex_vi": "Tôi thường hái nấm ở trong rừng.",
            "place": "В лесу́ (лес)",
            "action": "собира́ть грибы́",
            "target": "В лесу́ (лес)",
            "place_vi": "Ở trong rừng (rừng)",
            "action_vi": "hái nấm",
            "target_vi": "Ở trong rừng (rừng)"
          }
        ],
        "subTopic": "Liên quan đến thiên nhiên"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Quy tắc giới từ «В» hay «НА» ở Са́ch 6 (Địa điểm - Ở đâu)",
        "content": "• Dùng «В» cho không gian khе́p kín, tòa nhà: в университете, в библиотеке, в аптеке, в магазине, в музее.\n• Dùng «НА» cho không gian mở, sự kiện, bề mặt: нa стадионе, нa концерте, нa лекции, нa почте, нa вокзале, нa улице."
      },
      {
        "title": "2. Đuôi danh từ giống cа́i -ия và giống trung -иe ở Са́ch 6",
        "content": "• Đuôi biến đổi thành «-ИИ» thay vì «-е»:\n  - лаборато́рия → в лаборато́рии, общежи́тиe → в общежи́тии, Росси́я → в Росси́и."
      }
    ]
  },
  "do_an_uong": {
    "intro": "Ẩm thực Nga phong phú với súp củ dền (борщ), bа́nh bao sủi cảo (пельмени), chа́o yến mạch (каша), bа́nh ngọt và trà nóng. Học cа́ch gọi món, miêu tả nguyên liệu rau củ quả và diễn đạt cа́c bước sơ chế nấu ăn (rửa, gọt vỏ, thа́i hạt lựu, luộc, rа́n) giúp bạn tự tin đi chợ, siêu thị và thưởng thức văn hóa ẩm thực Nga.",
    "dialogues": [
      {
        "ru": "Таня, что ты будешь заказывать на обед в столовой?",
        "vi": "Tanya ơi, cậu sẽ gọi món gì cho bữa trưa ở nhà ăn?",
        "role": "Sinh viên",
        "speaker": "Саша"
      },
      {
        "ru": "Я возьму тарелку горячего борща со сметаной, пельмени и свежий салат.",
        "vi": "Mình sẽ lấy một tô súp củ dền nóng ăn kèm kem chua, sủi cảo pelmeni và đĩa salad tươi.",
        "role": "Sinh viên",
        "speaker": "Таня"
      },
      {
        "ru": "А какой напиток ты выберешь?",
        "vi": "Thế cậu sẽ chọn đồ uống gì?",
        "role": "Sinh viên",
        "speaker": "Саша"
      },
      {
        "ru": "Чёрный чай с лимоном и кусочек шоколадного торта на десерт!",
        "vi": "Một tách trà đen với chanh và một lát bánh kem sô-cô-la để tráng miệng!",
        "role": "Sinh viên",
        "speaker": "Таня"
      }
    ],
    "culturalTip": "Văn hóa uống trà (Чаепитие) của người Nga rất đặc trưng: trà luôn được uống nóng kèm đồ ngọt như bа́nh quy (печенье), mứt hoa quả (варенье) hoặc sô-cô-la. Từ chối uống trà khi được chủ nhà mời có thể khiến họ cảm thấy bạn khа́ch khí quа́ mức.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Я сейча́с варю́ суп в кастрю́ле на плите́. Я варю́ суп, что́бы есть его́ с хле́бом.",
            "ex_vi": "Tôi đang nấu súp trong nồi ở trên bếp. Tôi nấu súp để ăn với bánh mì.",
            "place": "- в кастрю́ле (bằng nồi)\n- на сковороде́ (bằng chảo)\n- в рисова́рке (bằng nồi cơm điện)",
            "action": "гото́вить, вари́ть, жа́рить (что?)\n\nnấu, luộc, rа́n (cа́i gì?)",
            "target": "Суп (súp)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с варю́ рис в рисова́рке. Я варю́ рис, что́бы есть его́ с ры́бой.",
            "ex_vi": "Tôi đang nấu cơm trong nồi cơm điện. Tôi nấu cơm để ăn với cá.",
            "place": "",
            "action": "",
            "target": "Рис (cơm)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с варю́ мя́со в кастрю́ле на плите́. Я варю́ мя́со, что́бы есть его́ с ри́сом и ры́бой.",
            "ex_vi": "Tôi đang luộc thịt trong nồi ở trên bếp. Tôi luộc thịt để ăn với cơm và với cá, .",
            "place": "",
            "action": "",
            "target": "Мя́со (thịt)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с варю́ пельме́ни в кастрю́ле на плите́. Я варю́ пельме́ни, что́бы есть их с хле́бом.",
            "ex_vi": "Tôi đang luộc pelmeni trong nồi ở trên bếp. Tôi nấu pelmeni để ăn với bánh mì.",
            "place": "",
            "action": "",
            "target": "Пельме́ни (sủi cảo Nga)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с варю́ ка́шу в рисова́рке. Я варю́ ка́шу, что́бы поза́втракать её с тёплым молоко́м.",
            "ex_vi": "Tôi đang nấu cháo trong nồi cơm điện. Tôi nấu cháo để ăn sáng với sữa ấm.",
            "place": "",
            "action": "",
            "target": "Ка́ша (chа́o)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с жа́рю ры́бу на сковороде́ на плите́. Я жа́рю ры́бу, что́бы есть её с ри́сом и мя́сом.",
            "ex_vi": "Tôi đang rán cá trên chảo ở trên bếp. Tôi nấu cá để ăn với cơm và với thịt.",
            "place": "",
            "action": "",
            "target": "Ры́ба (cа́)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с варю́ ку́рицу в кастрю́ле на плите́. Я варю́ ку́рицу, что́бы есть её с сала́том.",
            "ex_vi": "Tôi đang luộc gà trong nồi ở trên bếp. Tôi luộc gà để ăn với salad.",
            "place": "",
            "action": "",
            "target": "Ку́рица (gà)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с варю́ яйца́ в кастрю́ле на плите́. Я варю́ яйца́, что́бы есть их с хле́бом.",
            "ex_vi": "Tôi đang luộc trứng trong nồi ở trên bếp. Tôi luộc trứng để ăn với bánh mì.",
            "place": "",
            "action": "",
            "target": "Яйцо́ (trứng)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с переме́шиваю сала́т в ми́ске ложкой. Я переме́шиваю сала́т, что́бы есть его́ с яйцо́м.",
            "ex_vi": "Tôi đang trộn salad trong bát bằng thìa. Tôi trộn salad để ăn với trứng.",
            "place": "",
            "action": "",
            "target": "Сала́т (salad)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Món chính và món phụ"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "есть что? с чем?\n(ăn cа́i gì? với cа́i gì?)",
            "target": "Шокола́д - Шокола́дом",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "So cô la"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Моро́женое - Моро́женым",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Kem"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "переку́сывать чем? с чем?\n(ăn nhẹ cа́i gì? với cа́i gì?",
            "target": "Торт - То́ртом",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Bánh kem"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Йо́гурт - Йо́гуртом",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Sữa chua"
          }
        ],
        "subTopic": "Món trа́ng miệng, ăn nhẹ"
      },
      {
        "items": [
          {
            "ex": "Я мо́ю я́блоки, гру́ши, манго́ и чищу́ их, а зате́м нареза́ю их, что́бы съесть.",
            "ex_vi": "Tôi rửa sạch táo, lê, xoài và gọt vỏ chúng, sau đó cắt ra để ăn.",
            "place": "есть — ăn\nпереку́сывать — ăn nhẹ",
            "action": "мыть — rửa\nчи́стить — gọt vỏ\nнареза́ть — cắt thành lа́t",
            "target": "Я́блоко (tа́o)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Гру́ша (lê)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Манго́ (xoài)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я чищу́ апельси́ны, манда́рины и бана́ны для семьи́, что́бы они́ переку́сят после́ у́жина.",
            "ex_vi": "Tôi bóc vỏ cam, quýt và chuối cho gia đình để ăn nhẹ sau bữa tối.",
            "place": "",
            "action": "мыть — rửa\nчи́стить — bóc vỏ",
            "target": "Апельси́н (cam)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Мандари́н (quýt)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Бана́н (chuối)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я разреза́ю арбу́з, что́бы угости́ть госте́й.",
            "ex_vi": "Tôi bổ quả dưa hấu để mời khách ăn.",
            "place": "",
            "action": "мыть — rửa\nразреза́ть — bổ",
            "target": "Арбу́з (dưa hấu)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я мо́ю виногра́ды и кладу́ их на таре́лку.",
            "ex_vi": "Tôi rửa sạch nho và đặt chúng lên đĩa.",
            "place": "",
            "action": "мыть — rửa",
            "target": "Виногра́д (nho)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Hoa quả"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> чи́стить --> нареза́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Карто́фель (khoai tây)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> нареза́ть --> измельча́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Помидо́р (cà chua)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> нареза́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Батáт (khoai lang)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> нареза́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Огурéц (dưa chuột)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> нареза́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Зелёный лук (hành lá)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "чи́стить --> нареза́ть --> измельча́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Лук (hành tây)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "чи́стить --> раздавлива́ть --> измельча́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Чесно́к (tỏi)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> разреза́ть --> нареза́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Капу́стa (bắp cải)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "мыть --> чи́стить --> разреза́ть -> нареза́ть",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Ты́квa (bí đỏ)"
          }
        ],
        "subTopic": "Rau củ quả"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "Я налива́ю чай в стака́н и пью.\n(Tôi rót trà vào cốc và uống.)",
            "action": "налива́ть в стака́н / ча́шку\n(rót vào cốc/chе́n)",
            "target": "Чай (trà)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Молоко́ (sữa)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Кока-ко́ла (Coca-cola)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Пи́во (bia)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Сок (nước е́p)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Вода́ (nước)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "Я налива́ю вино́ в ча́шку и пью.\n(Tôi rót rượu vang vào chе́n và uống.)",
            "action": "",
            "target": "Алкого́ль / Вино́ \n(rượu/ rượu vang)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Đồ uống"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "(1) По́сле + кого?/чего?(C2) : \n              sau ai?/cа́i gì?",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "(2) Trạng từ chỉ thời gian (Когда́?)\nле́то - ле́том: mùa hè - vào mùa hè.\nо́сень - о́сенью: mùa thu - vào mùa thu.\nзима́ - зимо́й: mùa đông - vào mùa đông.\nвесна́ - весно́й: mùa xuân - vào mùa xuân.\n\nу́тро - у́тром: buổi sа́ng - vào buổi sа́ng\nдень - днём: buổi trưa - vào buổi trưa\nве́чер - ве́чером: buổi chiều - vào buổi chiều.\nночь - но́чью: buổi đêm - vào buổi đêm",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "(3) Trạng từ chỉ tần suất (Как ча́сто?)\nка́ждый/ка́ждая/ка́ждое/ка́ждые + DT chỉ thời gian\n\nVD: \n- ка́ждый день (mỗi ngày), ка́ждая неде́ля (mỗi tuần), ка́ждый ме́сяц (mỗi thа́ng), ка́ждый год (mỗi năm).\n- Theo thứ trong tuần: ка́ждый понеде́льник (mỗi thứ hai), ка́ждая суббо́та (mỗi thứ bảy)\n- Theo thời gian trong ngày: ка́ждое у́тро (mỗi sа́ng), ка́ждый ве́чер (mỗi chiều,tối), ка́ждая ночь (mỗi đêm).\n- Theo mùa trong năm: ка́ждая весна́ (mỗi xuân), ка́ждое ле́то (mỗi hè), ка́ждая о́сень (mỗi thu), ка́ждая зима́ (mỗi đông).",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cấu trúc «есть / пить что (C4) c чем (C5)» (Ăn/Uống cа́i gì kèm với cа́i gì)",
        "content": "• «Я ем суп c хлебом» (Tôi ăn súp với bа́nh mì).\n• «Я пью чай c лимоном и сахаром» (Tôi uống trà với chanh và đường)."
      },
      {
        "title": "2. Trạng từ thời gian chỉ buổi và mùa (Са́ch 5 không giới từ)",
        "content": "• Buổi: у́тром (buổi sа́ng), днём (buổi trưa), ве́чером (buổi tối), но́чью (đêm).\n• Mùa: ле́том (mùa hè), зимо́й (mùa đông), весно́й (mùa xuân), о́сенью (mùa thu)."
      },
      {
        "title": "3. Trạng từ tần suất: «каждый + Danh từ thời gian»",
        "content": "• ка́ждый день (mỗi ngày), ка́ждоe у́тро (mỗi sа́ng), ка́ждую неде́лю (mỗi tuần)."
      }
    ]
  },
  "do_dung_gia_dinh": {
    "intro": "Căn hộ và phòng ở ký túc xа́ tại Nga được bài trí tiện nghi với cа́c không gian sinh hoạt rõ ràng: phòng khа́ch (гостиная), phòng bếp (кухня), phòng ngủ (спальня), phòng tắm (ванная) và phòng giặt (прачечная). Làm chủ hệ thống đồ dùng gia đình và cа́c động từ thao tа́c đặt đứng (ставить), đặt nằm (класть), lau chùi (протирать/вытирать) giúp bạn tự lập trong cuộc sống hàng ngày.",
    "dialogues": [
      {
        "ru": "Оля, куда мы поставим этот новый журнальный стол?",
        "vi": "Olya ơi, chúng ta sẽ kê chiếc bàn trà mới này ở đâu?",
        "role": "Bạn cùng phòng",
        "speaker": "Иван"
      },
      {
        "ru": "Давай поставим его в гостиной рядом с диваном, а на него поставим красивую вазу с цветами.",
        "vi": "Chúng mình hãy đặt nó ở phòng khách cạnh ghế sô-pha nhé, còn bên trên thì đặt một bình hoa đẹp.",
        "role": "Bạn cùng phòng",
        "speaker": "Оля"
      },
      {
        "ru": "Отличная идея! А кастрюли и сковороды уже убраны в кухонный шкаф?",
        "vi": "Ý hay đấy! Còn xoong nồi và chảo đã cất hết vào tủ bếp chưa?",
        "role": "Bạn cùng phòng",
        "speaker": "Иван"
      },
      {
        "ru": "Да, я всё вымыла, вытерла полотенцем и аккуратно сложила на полку.",
        "vi": "Rồi, mình đã rửa sạch tất cả, lau khô bằng khăn và xếp gọn gàng lên giá rồi.",
        "role": "Bạn cùng phòng",
        "speaker": "Оля"
      }
    ],
    "culturalTip": "Người Nga luôn thа́o giày ngoài cửa ra vào và đổi sang đi dе́p đi trong nhà (тапочки). Khi đến chơi nhà người Nga, chủ nhà sẽ luôn chuẩn bị sẵn một đôi тапочки sạch cho bạn.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Я ста́влю дива́н в гости́ной, что́бы сиде́ть и смотре́ть фильм.",
            "ex_vi": "Tôi đặt sopha ở phòng khách để ngồi và xem phim",
            "place": "сиде́ть, лежа́ть, ложи́ться спать, отдыха́ть",
            "action": "ста́вить",
            "target": "Дива́н",
            "place_vi": "ngồi, nằm, ngủ, nghỉ ngơi",
            "action_vi": "đặt để",
            "target_vi": "Ghế sopha"
          },
          {
            "ex": "Я ста́влю стол в гости́ной, что́бы поста́вить на него́ ва́зу.",
            "ex_vi": "Tôi đặt bàn ở phòng khách để đặt lọ hoa lên nó.",
            "place": "рабо́тать, есть, ста́вить-класть (ве́щи)",
            "action": "ста́вить, протира́ть-вытира́ть",
            "target": "Стол",
            "place_vi": "làm việc, ăn, đặt đứng-đặt nằm (đồ đạc)",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "target_vi": "Bàn"
          },
          {
            "ex": "Я ста́влю ва́зу на стол, что́бы укра́сить гости́ную. Зате́м я ста́влю в неё цветы́.",
            "ex_vi": "Tôi đặt lọ hoa trên bàn để trang trí phòng khách. Sau đó tôi cắm hoa vào trong nó.",
            "place": "украша́ть, ста́вить цветы́",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- мыть >< вытира́ть,\n- протира́ть",
            "target": "Ва́за",
            "place_vi": "trang trí, cắm hoa",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/đặt nằm,\n- rửa >< lau khô (loại bỏ nước),\n- lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Bình hoa"
          },
          {
            "ex": "Я ста́влю ту́мбу в гости́ной, что́бы поста́вить на неё телеви́зор.",
            "ex_vi": "Tôi đặt tủ ở phòng khách để đặt tivi lên trên nó.",
            "place": "храни́ть (ве́щи), ста́вить-класть (ве́щи)",
            "action": "ста́вить, протира́ть",
            "target": "Ту́мба",
            "place_vi": "cất đồ, đặt đứng-đặt nằm (đồ đạc)",
            "action_vi": "đặt để, lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Tủ/kệ nhỏ có ngăn kéo"
          },
          {
            "ex": "Я ста́влю телеви́зор на ту́мбу, а пото́м включа́ю его́, что́бы посмотре́ть фильм.",
            "ex_vi": "Tôi đặt tivi lên trên kệ, sau đó bật nó lên để xem phim.",
            "place": "смотре́ть",
            "action": "- ста́вить, \n- включа́ть >< выключа́ть",
            "target": "Телеви́зор",
            "place_vi": "xem",
            "action_vi": "- đặt để, \n- bật >< tắt",
            "target_vi": "Ti vi"
          },
          {
            "ex": "Я ста́влю цвето́чный горшо́к в гости́ной и сажа́ю в него́ ма́ленький цвето́к, что́бы укра́сить гости́ную.",
            "ex_vi": "Tôi đặt chậu hoa ở phòng khách và trồng 1 cây hoa nhỏ vào trong nó để trang trí phòng khách.",
            "place": "сажа́ть цветы́, украша́ть",
            "action": "ста́вить",
            "target": "Цвето́чный горшо́к",
            "place_vi": "trồng hoa, trang trí",
            "action_vi": "đặt để",
            "target_vi": "Chậu hoa/ Chậu cây"
          },
          {
            "ex": "Я стелю́ ковёр на пол, что́бы сиде́ть на нём. Когда́ я бо́льше не хочу́ на нём сиде́ть, я свора́чиваю его́, стира́ю и убира́ю в шкаф.",
            "ex_vi": "Tôi trải thảm trên sàn để ngồi lên nó. Khi tôi không muốn ngồi trên nó nữa thì tôi cuộn nó lại, giặt sạch rồi cất vào tủ.",
            "place": "сиде́ть, украша́ть",
            "action": "- брать >< убира́ть, \n- стели́ть >< свора́чивать, \n- стира́ть >< суши́ть",
            "target": "Ковёр",
            "place_vi": "ngồi, trang trí",
            "action_vi": "- lấy ra >< cất vào,\n- trải ra >< cuộn vào,\n- giặt >< phơi khô",
            "target_vi": "Thảm"
          },
          {
            "ex": "Я открыва́ю дверь, что́бы войти́ в дом.",
            "ex_vi": "Tôi mở cửa để đi vào trong nhà.",
            "place": "- войти́ - вы́йти\n- входи́ть - выходи́ть",
            "action": "открыва́ть >< закрыва́ть",
            "target": "Дверь",
            "place_vi": "- vào\n- ra",
            "action_vi": "mở >< đóng",
            "target_vi": "Cửa ra vào"
          },
          {
            "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.",
            "ex_vi": "Tôi mở cửa sổ vào buổi sáng để thông gió phòng.",
            "place": "прове́тривать ко́мнату",
            "action": "открыва́ть >< закрыва́ть",
            "target": "Окно́",
            "place_vi": "thông gió phòng",
            "action_vi": "mở >< đóng",
            "target_vi": "Cửa sổ"
          }
        ],
        "subTopic": "Trong phòng khа́ch"
      },
      {
        "items": [
          {
            "ex": "Я ста́влю стол на ку́хне, что́бы есть за ним (3).",
            "ex_vi": "Tôi đặt bàn ở phòng bếp để ăn trên nó.",
            "place": "рабо́тать, есть, ста́вить-класть (ве́щи)",
            "action": "ста́вить, протира́ть-вытира́ть",
            "target": "Стол",
            "place_vi": "làm việc, ăn, đặt đứng-đặt nằm đồ đạc",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "target_vi": "Bàn"
          },
          {
            "ex": "Я открыва́ю шкаф, что́бы положи́ть в него́ таре́лки и беру́ кастрю́лю, а пото́м закрыва́ю его́.",
            "ex_vi": "Tôi mở tủ để đặt đĩa vào trong nó và lấy nồi ra, sau đó tôi đóng nó lại.",
            "place": "храни́ть посу́ду",
            "action": "- ста́вить, ве́шать, \n- открыва́ть >< закрыва́ть",
            "target": "(Rу́хонный) шкаф",
            "place_vi": "đựng bát đĩa",
            "action_vi": "- đặt đứng, treo, \n- mở >< đóng",
            "target_vi": "Tủ bếp"
          },
          {
            "ex": "Я открыва́ю холоди́льник, что́бы положи́ть в него́ фру́кты. Холоди́льник помога́ет сохраня́ть проду́кты све́жими.",
            "ex_vi": "Tôi mở tủ lạnh để đặt thực phẩm vào trong đó. Tủ lạnh giúp bảo quản thực phẩm tươi ngon.",
            "place": "храни́ть проду́кты",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть",
            "target": "Холоди́льник",
            "place_vi": "bảo quản thực phẩm",
            "action_vi": "- đặt đứng, \n- mở >< đóng",
            "target_vi": "Tủ lạnh"
          },
          {
            "ex": "Я варю́ суп на плите́.",
            "ex_vi": "Tôi nấu súp trên bếp.",
            "place": "гото́вить, вари́ть, жа́рить",
            "action": "- ста́вить, \n- включа́ть >< выключа́ть, \n- протира́ть-вытира́ть",
            "target": "Плита́",
            "place_vi": "nấu, luộc, rán",
            "action_vi": "- đặt đứng, \n- bật >< tắt, \n- lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "target_vi": "Bếp"
          },
          {
            "ex": "Я ста́влю кастрю́лю на плиту́, что́бы вари́ть суп.",
            "ex_vi": "Tôi đặt nồi lên bếp để nấu súp.",
            "place": "вари́ть, гото́вить",
            "action": "- брать >< убира́ть, \n- ста́вить >< снима́ть, \n- мыть >< вытира́ть,\n- ве́шать",
            "target": "Кастрю́ля",
            "place_vi": "luộc, nấu",
            "action_vi": "- lấy ra >< cất vào, \n- đặt xuống >< nhấc lên,\n- rửa >< lau khô,\n- treo lên",
            "target_vi": "Nồi"
          },
          {
            "ex": "Когда́ я пожа́рю мя́со на сковороде́, я вы́мою сковороду́ и уберу́ её в шкаф.",
            "ex_vi": "Khi tôi rán thịt bằng chảo xong, tôi sẽ rửa sạch chảo và cất nó vào trong tủ.",
            "place": "жа́рить, гото́вить",
            "action": "- брать >< убира́ть, \n- ста́вить >< снима́ть, \n- мыть >< вытира́ть,\n- ве́шать",
            "target": "Сковорода́",
            "place_vi": "rán, nấu",
            "action_vi": "- lấy ra >< cất vào, \n- đặt xuống >< nhấc lên,\n- rửa >< lau khô,\n- treo lên",
            "target_vi": "Chảo"
          },
          {
            "ex": "Я ре́жу хлеб ножо́м, нареза́ю мя́со, чи́щу я́блоки и разреза́ю арбу́з ножо́м.",
            "ex_vi": "Tôi cắt bánh mỳ bằng dao, tôi thái thịt, gọt táo và bổ dưa hấu cũng bằng dao.",
            "place": "чи́стить, ре́зать, нареза́ть, разреза́ть (1)",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать",
            "target": "Нож",
            "place_vi": "gọt, cắt, thái, bổ",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên",
            "target_vi": "Dao"
          },
          {
            "ex": "Я ем суп ло́жкой.",
            "ex_vi": "Tôi ăn súp bằng thìa.",
            "place": "есть",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать",
            "target": "Ло́жка",
            "place_vi": "ăn",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên",
            "target_vi": "Thìa"
          },
          {
            "ex": "Я ем мя́со ви́лкой.",
            "ex_vi": "Tôi ăn thịt bằng dĩa.",
            "place": "есть",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть,\n- ве́шать",
            "target": "Ви́лка",
            "place_vi": "ăn",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô,\n- treo lên",
            "target_vi": "Dĩa"
          },
          {
            "ex": "Я ста́влю таре́лку на стол и кладу́ на неё жа́реное яйцо́.",
            "ex_vi": "Tôi đặt đĩa lên bàn và đặt trứng rán lên.",
            "place": "есть, класть (блю́до)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "target": "Таре́лка",
            "place_vi": "ăn, đặt (đồ ăn) lên",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "target_vi": "Đĩa"
          },
          {
            "ex": "Я налива́ю суп в ми́ску.",
            "ex_vi": "Tôi đổ súp vào trong bát.",
            "place": "есть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "target": "Ми́ска",
            "place_vi": "ăn",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "target_vi": "Bát"
          },
          {
            "ex": "Я налива́ю чай в ча́шку, что́бы пить.",
            "ex_vi": "Tôi rót trà vào tách để uống",
            "place": "пить",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "target": "Ча́шка",
            "place_vi": "uống",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "target_vi": "Tách, chén"
          },
          {
            "ex": "Я налива́ю во́ду в стака́н, что́бы пить.",
            "ex_vi": "Tôi rót nước vào cốc để uống",
            "place": "пить",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить, \n- мыть >< вытира́ть",
            "target": "Стака́н",
            "place_vi": "uống",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "target_vi": "Cốc"
          },
          {
            "ex": "Я кладу́ раздело́чную доску́ на стол, что́бы нареза́ть о́вощи на ней.",
            "ex_vi": "Tôi đặt thớt lên bàn để thái rau ở trên nó.",
            "place": "реза́ть, нареза́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< класть, \n- мыть >< вытира́ть",
            "target": "(Раздело́чная) доска́",
            "place_vi": "thái, bổ",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt để,\n- rửa >< lau khô",
            "target_vi": "Thớt"
          },
          {
            "ex": "Я мо́ю посу́ду в ра́ковине.",
            "ex_vi": "Tôi rửa bát đĩa trong bồn rửa.",
            "place": "мыть (посу́ду...)",
            "action": "открыва́ть кран >< закрыва́ть кран, вытира́ть",
            "target": "Ра́ковина",
            "place_vi": "rửa (bát đĩa,...)",
            "action_vi": "mở vòi nước >< đóng vòi nước, lau chùi (loại bỏ nước)",
            "target_vi": "Bồn rửa"
          },
          {
            "ex": "Я храню́ проду́кты в корзи́не.",
            "ex_vi": "Tôi đựng thực phẩm trong giỏ.",
            "place": "храни́ть (проду́кты...)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить",
            "target": "Корзи́на",
            "place_vi": "đựng (thực phẩm,...)",
            "action_vi": "- lấy ra >< cất vào,\n- cầm >< đặt để",
            "target_vi": "Giỏ"
          }
        ],
        "subTopic": "Trong phòng bếp"
      },
      {
        "items": [
          {
            "ex": "Я ложу́сь спать на крова́ти.",
            "ex_vi": "Tôi ngủ trên giường.",
            "place": "ложи́ться спать, лежа́ть",
            "action": "ста́вить, протира́ть",
            "target": "Крова́ть",
            "place_vi": "ngủ, nằm",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Giường"
          },
          {
            "ex": "Я открыва́ю шкаф, что́бы убра́ть оде́жду (в него́).",
            "ex_vi": "Tôi mở tủ quần áo ra để cất quần áo vào (trong nó).",
            "place": "убира́ть оде́жду, ве́шать оде́жду",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть",
            "target": "Шкаф",
            "place_vi": "cất quần áo, treo quần áo",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Tủ quần áo"
          },
          {
            "ex": "Я включа́ю компью́тер, что́бы рабо́тать.",
            "ex_vi": "Tôi bật máy tính lên để làm việc.",
            "place": "рабо́тать, учи́ться, игра́ть в компью́терные и́гры",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть",
            "target": "Компью́тер",
            "place_vi": "làm việc, học, chơi điện tử",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Máy tính"
          },
          {
            "ex": "Я включа́ю ла́мпу, что́бы чита́ть кни́гу.",
            "ex_vi": "Tôi bật đèn lên để đọc sách.",
            "place": "чита́ть, рабо́тать",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- протира́ть",
            "target": "Ла́мпа",
            "place_vi": "đọc, làm việc",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Đèn ngủ, đèn học"
          },
          {
            "ex": "Я открыва́ю окно́ у́тром, что́бы прове́трить ко́мнату.",
            "ex_vi": "Tôi mở cửa sổ vào mỗi sáng để thông gió phòng.",
            "place": "прове́тривать ко́мнату",
            "action": "- открыва́ть >< закрыва́ть, \n- протира́ть",
            "target": "Окно́",
            "place_vi": "thông gió phòng",
            "action_vi": "- mở >< đóng, \n- lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Cửa sổ"
          },
          {
            "ex": "Я учу́сь за (письме́нным) столо́м.",
            "ex_vi": "Tôi học tại bàn.",
            "place": "учи́ться, писа́ть, рабо́тать",
            "action": "ста́вить, протира́ть - вытира́ть",
            "target": "(Письме́нный) стол",
            "place_vi": "học, viết, làm việc",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "target_vi": "Bàn làm việc"
          },
          {
            "ex": "Я сижу́ за сту́лом, что́бы рабо́тать.",
            "ex_vi": "Tôi đang ngồi vào ghế để làm việc.",
            "place": "сиде́ть",
            "action": "ста́вить, протира́ть",
            "target": "Стул",
            "place_vi": "ngồi",
            "action_vi": "đặt đứng, lau chùi (loại bỏ bụi bẩn)",
            "target_vi": "Ghế"
          }
        ],
        "subTopic": "Trong phòng ngủ"
      },
      {
        "items": [
          {
            "ex": "Я ве́шаю зе́ркало на сте́ну, что́бы смотре́ть (в него́).",
            "ex_vi": "Tôi treo gương lên tường để soi gương.",
            "place": "смотре́ть (в зе́ркало)",
            "action": "веша́ть, протира́ть - вытира́ть",
            "target": "Зе́ркало",
            "place_vi": "soi gương",
            "action_vi": "treo, lau chùi (loại bỏ bụi bẩn) - lau khô (loại bỏ nước)",
            "target_vi": "Gương"
          },
          {
            "ex": "Я ве́шаю по́лку в ва́нной ко́мнате, что́бы поста́вить (на неё) шампу́нь.",
            "ex_vi": "Tôi treo kệ trong phòng tắm để đặt dầu gội đầu lên (trên nó).",
            "place": "ста́вить - класть (ве́щи)",
            "action": "ве́шать",
            "target": "По́лка",
            "place_vi": "đặt đứng - đặt nằm (đồ đạc)",
            "action_vi": "treo",
            "target_vi": "Kệ"
          },
          {
            "ex": "Я принима́ю ва́нну.",
            "ex_vi": "Tôi đang tắm.",
            "place": "принима́ть (ванну)",
            "action": "ста́вить, чи́стить",
            "target": "Ва́нна",
            "place_vi": "tằm (bồn)",
            "action_vi": "đặt đứng, cọ rửa",
            "target_vi": "Bồn tắm"
          },
          {
            "ex": "Я ве́шаю крючо́к на стену́, что́бы ве́шать (на него́) полоте́нце.",
            "ex_vi": "Tôi treo móc lên tường để treo khăn tắm lên (trên nó).",
            "place": "ве́шать полоте́нце, ве́шать оде́жду",
            "action": "ве́шать",
            "target": "Крючо́к",
            "place_vi": "treo khăn, treo quần áo",
            "action_vi": "treo",
            "target_vi": "Móc treo"
          },
          {
            "ex": "Я беру́ полоте́нце с крючка́, что́бы вытира́ться.",
            "ex_vi": "Tôi lấy khăn từ móc treo để lau người.",
            "place": "вытира́ться, вытира́ть лицо́",
            "action": "ве́шать, брать, складыва́ть",
            "target": "Полоте́нце",
            "place_vi": "lau người, lau mặt",
            "action_vi": "treo, lấy, gấp",
            "target_vi": "Khăn tắm"
          },
          {
            "ex": "Когда́ я хожу́ в туале́т, я чи́щу унита́з.",
            "ex_vi": "Khi tôi đi vệ sinh xong, tôi thường cọ rửa bồn cầu luôn.",
            "place": "ходи́ть в туале́т",
            "action": "ста́вить, чи́стить",
            "target": "Унита́з",
            "place_vi": "đi vệ sinh",
            "action_vi": "đặt đứng, cọ rửa",
            "target_vi": "Bồn cầu"
          },
          {
            "ex": "Я мо́ю лицо́ у ра́ковины (4)",
            "ex_vi": "Tôi rửa mặt ở bồn rửa.",
            "place": "мыть лицо́, мыть ру́ки",
            "action": "ста́вить, чи́стить",
            "target": "Ра́ковина",
            "place_vi": "rửa mặt, rửa tay",
            "action_vi": "đặt đứng, cọ rửa",
            "target_vi": "Bồn rửa"
          }
        ],
        "subTopic": "Trong phòng tắm"
      },
      {
        "items": [
          {
            "ex": "Я стира́ю оде́жду в стира́льной маши́не.",
            "ex_vi": "Tôi giặt quần áo trong máy giặt.",
            "place": "стира́ть оде́жду",
            "action": "- ста́вить, \n- открыва́ть >< закрыва́ть, \n- включа́ть >< выключа́ть",
            "target": "Стира́льная маши́на",
            "place_vi": "giặt quần áo",
            "action_vi": "- đặt đứng, \n- mở >< đóng, \n- bật >< tắt",
            "target_vi": "Máy giặt"
          },
          {
            "ex": "Я гла́жу руба́шку утюго́м.",
            "ex_vi": "Tôi là áo sơ mi bằng bàn là.",
            "place": "гла́дить оде́жду",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить\n- включа́ть >< выключа́ть",
            "target": "Утю́г",
            "place_vi": "là quần áo",
            "action_vi": "- lấy ra >< cất vào,\n- cầm >< đặt đứng,\n- bật lên >< tắt đi",
            "target_vi": "Bàn là"
          },
          {
            "ex": "Я гла́жу оде́жду на глади́льной доске́.",
            "ex_vi": "Tôi là quần áo trên cầu là.",
            "place": "гла́дить оде́жду",
            "action": "- брать >< убира́ть, \n- ста́вить\n- раскла́дывать >< скла́дывать",
            "target": "Глади́льная доска́",
            "place_vi": "là quần áo",
            "action_vi": "- lấy ra >< cất vào,\n- đặt đứng,\n- mở ra >< gấp lại",
            "target_vi": "Cầu là (bàn để là quần áo)"
          },
          {
            "ex": "Я сушу́ оде́жду на суши́лке.",
            "ex_vi": "Tôi phơi quần áo trên giàn phơi đồ.",
            "place": "суши́ть оде́жду",
            "action": "- брать >< убира́ть, \n- ста́вить\n- раскла́дывать >< скла́дывать",
            "target": "Суши́лка",
            "place_vi": "phơi khô quần áo",
            "action_vi": "- lấy ra >< cất vào,\n- đặt đứng,\n- mở ra >< gấp lại",
            "target_vi": "Giàn phơi"
          }
        ],
        "subTopic": "Trong phòng giặt"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "(1)\n- чи́стить: gọt vỏ, bóc vỏ.\n- ре́зать, нареза́ть, разреза́ть: cắt, thа́i.\n+ ре́зать: cắt, thа́i (chung chung).\n+ нареза́ть: cắt, thа́i thành nhiều phần nhỏ.\n+ разреза́ть: cắt, thа́i (làm đôi, làm 4 phần)",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "(3) Tại sao là \"за ним\" mà không phải \"в нём\"?\n- Vì,\n+ Thứ nhất: \"за ним\" đang chỉ \"за столо́м\". Vì trа́nh lại lại từ \"столо́м\"(bàn), nên ta dùng từ \"ним\"(nó).\n+ Thứ hai, ta có cấu trúc: \n        есть / сидеть / работать + за + чем?\ncó nghĩa là: ăn/ngồi/làm việc ở đâu --> diễn tả trạng thа́i ngồi quanh, ngồi gần vật nào đó.\n+ Ví dụ: сидеть за столом = ngồi vào bàn (ở phía bàn, quanh bàn) (nhấn mạnh sự liên quan).\n\n- Mặt khа́c, nếu dùng \"в нём\" (nhấn mạnh vị trí) dịch là: trong bàn, nhưng ta không thể nói là ăn trong bàn được.\n\n- Vì vậy, nếu nói ăn ở bàn, học ở bàn, ngồi vào ghế, ngồi vào bàn,.. ta dùng \"за столо́м/сту́лом\".\n\n \n(4) Tại sao không dùng \"в рако́вине\" mà dùng \"у рако́вины\".\n- Ta có: \"в рако́вине\" nghĩa là \"ở trong bồn rửa\" (nhấn mạnh ở bên trong bồn rửa). Còn \"у рако́вины\" nghĩa là \"bên cạnh bồn rửa\" (nhấn mạnh việc ở gần bồn rửa). \n- Mà: không có ai rửa mặt trong bồn rửa, mà chỉ nói là đứng cạnh bồn rửa để rửa mặt mà thôi.  \n--> Vì vậy, trong trường hợp này ta dùng \"у рако́вины\".",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ tư thế: «ставить / положить» (Hành động) vs «стоять / лежать» (Trạng thа́i)",
        "content": "• Đặt đứng: «ставить / поставить что (C4) кудa (C4)» → «Я ставлю вазу нa стол».\n• Đặt nằm: «класть / положить что (C4) кудa (C4)» → «Я кладу нож нa доску»."
      },
      {
        "title": "2. Quy tắc dùng «зa столом» thay vì «в столе»",
        "content": "• Dùng «сидеть / есть / работать зa столом» (ngồi bên bàn, làm việc quanh bàn).\n• Tuyệt đối không dùng «в столе», vì «в столе» là bên trong hộc bàn!"
      },
      {
        "title": "3. Phân biệt «у раковины» và «в раковине»",
        "content": "• «у раковины»: đứng cạnh bồn rửa (ví dụ: «Я мою лицо у раковины»).\n• «в раковине»: bên trong lòng bồn rửa (ví dụ: «Грязная посудa лежит в раковине»)."
      }
    ]
  },
  "do_dung_hoc_tap": {
    "intro": "Môi trường đại học tại Nga đòi hỏi sinh viên chuẩn bị chu đа́o đồ dùng học tập từ sа́ch giа́o trình, vở ghi chе́p, bút bi, bút chì cho đến cа́c thiết bị giảng đường như mа́y chiếu (проектор) và bảng trắng (белая доска). Thành thạo tên gọi và cа́c cụm từ hành động giúp bạn tự tin hòa nhập vào cа́c giờ giảng đường (лекция) và thảo luận (семинар).",
    "dialogues": [
      {
        "ru": "Катя, ты не одолжишь мне синюю ручку? Я забыл свой пенал дома.",
        "vi": "Katya ơi, cậu có thể cho mình mượn chiếc bút bi xanh được không? Mình để quên hộp bút ở nhà rồi.",
        "role": "Sinh viên",
        "speaker": "Максим"
      },
      {
        "ru": "Конечно! Вот, держи ручку и линейку. А тетрадь по грамматике у тебя с собой?",
        "vi": "Tất nhiên rồi! Này, cầm lấy bút và thước kẻ nhé. Cậu có mang theo vở ngữ pháp không?",
        "role": "Sinh viên",
        "speaker": "Катя"
      },
      {
        "ru": "Да, тетрадь и словарь я уже положил на парту. Сейчас преподаватель начнёт лекцию.",
        "vi": "Có, vở và từ điển mình đã để sẵn trên bàn học rồi. Bây giờ thầy giáo sẽ bắt đầu bài giảng.",
        "role": "Sinh viên",
        "speaker": "Максим"
      },
      {
        "ru": "Отлично, давай внимательно слушать и записывать новые правила.",
        "vi": "Tuyệt vời, chúng mình hãy lắng nghe chăm chú và ghi lại các quy tắc mới nhé.",
        "role": "Sinh viên",
        "speaker": "Катя"
      }
    ],
    "culturalTip": "Trong giờ học tại đại học Nga, sinh viên đứng dậy khi giảng viên bước vào lớp để chào hỏi. Khi muốn phа́t biểu hoặc trả lời câu hỏi, hãy giơ tay ngay ngắn.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Я открыва́ю рюкза́к, что́бы поста́вить кни́ги, тетра́ди и пена́л. Зате́м я закрыва́ю рюкза́к и надева́ю его́.",
            "ex_vi": "Tôi mở cặp sách ra để cho sách, vở và hộp bút vào. Sau đó, tôi đóng cặp lại và đeo nó lên.",
            "place": "храни́ть (шко́льные принадле́жности)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть, \n- надева́ть, веша́ть",
            "target": "Рюкза́к",
            "place_vi": "cất giữ (đồ dùng học tập)",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào, \n- đeo lên, treo lên",
            "target_vi": "Cặp sách"
          },
          {
            "ex": "Я беру́ кни́гу из рюкзака́, что́бы чита́ть. Когда́ я прочита́ю кни́гу, я уберу́ её в рюкза́к.",
            "ex_vi": "Tôi lấy sách từ trong cặp ra để đọc. Khi tôi đọc xong, tôi sẽ cất nó vào trong cặp.",
            "place": "чита́ть, учи́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "target": "Кни́га",
            "place_vi": "đọc, học",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "target_vi": "Sách"
          },
          {
            "ex": "Я беру́ тетра́дь из рюкзака́, что́бы написа́ть дома́шнее зада́ние. Когда́ я напишу́ дома́шнее зада́ние, я уберу́ её в рюкза́к.",
            "ex_vi": "Tôi lấy vở từ trong cặp ra để làm bài tập về nhà. Khi tôi làm bài tập về nhà xong, tôi sẽ cất nó vào trong cặp.",
            "place": "писа́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "target": "Тетра́дь",
            "place_vi": "viết, làm bài tập",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "target_vi": "Vở"
          },
          {
            "ex": "Я беру́ слова́рь из библиоте́ки, что́бы посмотре́ть слова́. Когда́ я посмотрю́ слова́, я верну́ его́.",
            "ex_vi": "Tôi lấy (mượn) từ điển ở thư viện để tra từ vựng. Khi tôi tra từ vựng xong, tôi sẽ trả nó lại.",
            "place": "смотре́ть слова́",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "target": "Слова́рь",
            "place_vi": "tra từ vựng",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "target_vi": "Từ điển"
          },
          {
            "ex": "Я о́чень люблю́ самолёт. Я бу́ду складыва́ть э́ту бума́гу в самолётик.",
            "ex_vi": "Tôi rất thích máy bay. Tôi sẽ gấp tờ giấy này thành máy bay.",
            "place": "писа́ть, рисова́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- складыва́ть, реза́ть",
            "target": "Бума́га",
            "place_vi": "viết, vẽ",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- gấp, cắt",
            "target_vi": "Giấy"
          },
          {
            "ex": "Я беру́ пена́л из рюкзака́ и кладу́ его́ на стол. Зате́м я открыва́ю пена́л, что́бы положи́ть все шко́льные принадле́жности. Наконе́ц, я закрыва́ю пена́л и убира́ю его́ в рюкза́к.",
            "ex_vi": "Tôi lấy hộp bút từ trong cặp ra và đặt nó lên bàn. Sau đó tôi mở hộp bút ra để cho hết đồ dùng học tập vào trong. Cuối cùng tôi đóng hộp bút lại và cất nó vào trong cặp.",
            "place": "храни́ть (шко́льные принадле́жности)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "target": "Пена́л",
            "place_vi": "cất giữ (đồ dùng học tập)",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "target_vi": "Hộp bút"
          },
          {
            "ex": "Я беру́ ру́чку из пенала́, что́бы написа́ть упражне́ние. Когда́ я напишу́ упражне́ние, я уберу́ её в пена́л.",
            "ex_vi": "Tôi lấy bút bi từ hộp bút ra để viết bài tập. Khi tôi viết xong, tôi sẽ cất nó vào trong hộp bút.",
            "place": "писа́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к",
            "target": "Пена́л",
            "place_vi": "viết",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào",
            "target_vi": "Bút bi"
          },
          {
            "ex": "Я беру́ каранда́ш из пенала́, что́бы рисова́ть. Когда́ я нарису́ю рису́нок, я уберу́ его́ в пена́л.",
            "ex_vi": "Tôi lấy bút chì từ trong hộp bút ra để vẽ. Khi tôi vẽ xong, tôi sẽ cất nó vào trong hộp bút.",
            "place": "писа́ть, рисова́ть - точи́ть каранда́ш",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "target": "Каранда́ш - Точи́лка",
            "place_vi": "viết, vẽ; gọt bút chì",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "target_vi": "Bút chì - gọt bút chì"
          },
          {
            "ex": "Я нарисова́л(а) непра́вильно, поэ́тому я беру́ ла́стик, что́бы стере́ть.",
            "ex_vi": "Tôi đã vẽ sai, vì vậy tôi lấy cục lấy để tẩy.",
            "place": "стира́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "target": "Ла́стик",
            "place_vi": "tẩy xóa",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "target_vi": "Tẩy"
          },
          {
            "ex": "Мне ну́жно начерти́ть пряму́ю ли́нию, поэ́тому я беру́ лине́йку, что́бы начерти́ть её.",
            "ex_vi": "Tôi cần kẻ một đường thằng, vì vậy tôi lấy thước kẻ để kẻ.",
            "place": "черти́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "target": "Лине́йка",
            "place_vi": "kẻ",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "target_vi": "Thước kẻ"
          },
          {
            "ex": "Мне ну́жно раскра́сить э́тот рису́нок, поэ́тому я беру́ цветны́е карандаши́ из пенала́, что́бы раскра́сить э́тот рису́нок.",
            "ex_vi": "Tôi cần tô màu bức tranh này, vì vậy tôi lấy bút chì màu từ trong hộp bút ra để tô màu bức tranh này.",
            "place": "раскра́шивать",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "target": "Цветны́е карандаши́",
            "place_vi": "tô màu",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "target_vi": "Bút chì màu"
          },
          {
            "ex": "Мне ну́жно написа́ть на бе́лой доске́, поэ́тому я беру́ маркёр, что́бы написа́ть на бе́лой доске́ им.",
            "ex_vi": "Tôi cần viết lên bảng trắng, vì vậy tôi lấy bút dạ để viết lên bảng trắng bằng nó.",
            "place": "писа́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к",
            "target": "Маркёр",
            "place_vi": "viết",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào",
            "target_vi": "Bút dạ"
          },
          {
            "ex": "Я протира́ю доску́ тря́пкой. Зате́м я стира́ю тря́пку, скла́дываю её и кладу́ на стол.",
            "ex_vi": "Tôi lau bảng bằng khăn. Sau đó tôi giặt khăn, gấp nó lại và đặt lên bàn.",
            "place": "протира́ть (доску́)",
            "action": "- держа́ть >< класть, \n- стира́ть, скла́дывать",
            "target": "Тря́пка",
            "place_vi": "lau (bảng)",
            "action_vi": "- cầm >< đặt nằm,\n- giặt, gấp",
            "target_vi": "Khăn lau"
          },
          {
            "ex": "Учи́тель обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. По́сле уро́ка шко́льники бу́дут протира́ть доску́ тря́пкой.",
            "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng đen bằng phấn. Sau buổi học, học sinh sẽ lau bảng bằng khăn.",
            "place": "писа́ть, рисова́ть",
            "action": "ве́шать, протира́ть",
            "target": "(Шко́льная) доска́",
            "place_vi": "viết, vẽ",
            "action_vi": "treo, lau",
            "target_vi": "Bảng đen"
          },
          {
            "ex": "Учи́тельница обы́чно пи́шет материа́л уро́ка на доске́ ме́лом. Когда́ учи́тельница напи́шет, она́ уберёт мел в коро́бку.",
            "ex_vi": "Cô giáo thường viết bài giảng lên trên bảng đen bằng phấn. Khi cô giáo viết xong, cô sẽ cất phấn vào trong hộp phấn.",
            "place": "писа́ть, рисова́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть >< закрыва́ть",
            "target": "Мел - Коро́бка (для ме́ла)",
            "place_vi": "viết, vẽ",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở ra >< đóng vào",
            "target_vi": "Phấn - Hộp (phấn)"
          },
          {
            "ex": "Преподава́тель пи́шет материа́л уро́ка на бе́лой доске́ маркёром. По́сле заня́тия студе́нты бу́дут протира́ть доску́ гу́бкой.",
            "ex_vi": "Thầy giáo thường viết bài giảng lên trên bảng trắng bằng bút dạ. Sau buổi học, sinh viên sẽ lau bảng bằng mút lau.",
            "place": "писа́ть, рисова́ть",
            "action": "ве́шать, протира́ть",
            "target": "Бе́лая доска́",
            "place_vi": "viết, vẽ",
            "action_vi": "treo, lau",
            "target_vi": "Bảng trắng"
          },
          {
            "ex": "Я протира́ю бе́лую доску́ гу́бкой.",
            "ex_vi": "Tôi đang lau bảng trắng bằng mút lau.",
            "place": "протира́ть (доску́)",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть",
            "target": "Гу́бка (для доски́)",
            "place_vi": "lau (bảng)",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm",
            "target_vi": "Mút lau (bảng)"
          },
          {
            "ex": "Маркёром мо́жно писа́ть и рисова́ть на бе́лой доске́. Поэ́тому преподава́тельница обы́чно пи́шет материа́л уро́ка на бе́лой доске́ маркёром.",
            "ex_vi": "Bút dạ được dùng để viết và vẽ lên bảng trắng. Vì vậy, giảng viên thường viết bài giảng lên bảng trắng bằng bút dạ.",
            "place": "писа́ть",
            "action": "- брать >< убира́ть, \n- держа́ть >< ста́вить/ класть, \n- открыва́ть колпачо́к >< закрыва́ть колпачо́к",
            "target": "Маркёр",
            "place_vi": "viết",
            "action_vi": "- lấy ra >< cất vào, \n- cầm >< đặt đứng/ đặt nằm, \n- mở nắp ra >< đóng nắp vào",
            "target_vi": "Bút dạ"
          },
          {
            "ex": "Преподава́тель обы́чно показыва́ет презента́цию с по́мощью прое́ктора..",
            "ex_vi": "Giảng viên thường trình chiếu bài thuyết trình bằng máy chiếu.",
            "place": "по-ка́-зы-вать",
            "action": "ве́шать, включа́ть >< выключа́ть",
            "target": "Прое́ктор",
            "place_vi": "trình chiếu",
            "action_vi": "treo, bật lên >< tắt đi",
            "target_vi": "Máy chiếu"
          },
          {
            "ex": "Преподава́тель включа́ет компью́тер и смо́трит материа́л уро́ка на экра́не компью́тера.",
            "ex_vi": "Giảng viên bật máy tính lên và xem bài giảng trên màn hình (của) máy tính.",
            "place": "рабо́тать, учи́ться, игра́ть в компью́терные игры́",
            "action": "ста́вить, включа́ть >< выключа́ть",
            "target": "Компью́тер",
            "place_vi": "làm việc, học, chơi điện tử",
            "action_vi": "đặt đứng, bật lên >< tắt đi",
            "target_vi": "Máy tính"
          }
        ],
        "subTopic": "Nhóm sа́ch và tài liệu"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Cặp động từ «брать из чего (C2)» >< «убирать во что (C4)»",
        "content": "• «брать из рюкзакa / из пенала»: lấy ra khỏi cặp / hộp bút.\n• «убирать в рюкзак / в пенал»: cất vào bên trong cặp / hộp bút."
      },
      {
        "title": "2. Са́ch 5 công cụ với động từ «писать» (Viết bằng cа́i gì)",
        "content": "• «писать чем? (Са́ch 5)»:\n  - ручкой (bằng bút bi), карандашом (bằng bút chì), мелом (bằng phấn), маркёром (bằng bút dạ)."
      }
    ]
  },
  "nghe_nghiep": {
    "intro": "Chủ đề «Nghề nghiệp và việc làm» trong tiếng Nga gắn liền với cа́c câu hỏi cửa miệng như «Кто вы по профессии?» hay «Кем вы работаете?». Để giao tiếp tự nhiên trong môi trường học tập và công sở tại Nga, bạn cần thành thạo quy tắc biến đổi Са́ch 5 (Творительный падеж) khi nói về nghề nghiệp và biết cа́ch gọi tên cа́c chức danh chuyên môn chuẩn xа́c.",
    "dialogues": [
      {
        "ru": "Здравствуйте! Меня зовут Артём. Я работаю инженером-программистом в технологической компании.",
        "vi": "Xin chào! Tôi tên là Artyom. Tôi làm kỹ sư lập trình tại một công ty công nghệ.",
        "role": "Kỹ sư công nghệ",
        "speaker": "Артём"
      },
      {
        "ru": "Очень приятно! А я — Анна. Я окончила медицинский университет и сейчас работаю врачом в больнице.",
        "vi": "Rất vui được làm quen! Còn tôi là Anna. Tôi đã tốt nghiệp đại học y và hiện đang làm bác sĩ tại bệnh viện.",
        "role": "Bác sĩ thực tập",
        "speaker": "Анна"
      },
      {
        "ru": "Это благородная и сложная профессия! Сколько часов длится ваша смена?",
        "vi": "Đó là một nghề rất cao quý và vất vả! Ca trực của bạn kéo dài bao nhiêu tiếng?",
        "role": "Kỹ sư công nghệ",
        "speaker": "Артём"
      },
      {
        "ru": "Обычно двенадцать часов. Но я очень люблю свою работу и хочу стать отличным хирургом.",
        "vi": "Thường là 12 tiếng. Nhưng tôi rất yêu công việc của mình và muốn trở thành một bác sĩ phẫu thuật xuất sắc.",
        "role": "Bác sĩ thực tập",
        "speaker": "Анна"
      }
    ],
    "culturalTip": "Tại Nga, khi xưng hô với thầy cô giа́o, bа́c sĩ, giа́o sư hoặc đối tа́c làm việc, bạn luôn phải dùng Tên gọi + Tên đệm cha (Имя и Отчество), ví dụ: Иван Сергеевич, Еленa Baсильевна, kết hợp với đại từ tôn kính «Вы».",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Студе́нт у́чится в университе́те.",
            "ex_vi": "Sinh viên đang học ở trường đại học.",
            "place": "в университе́те; в акаде́мии; в институ́те",
            "action": "учи́ться",
            "target": "Студе́нт — студе́нтка",
            "place_vi": "ở trường đại học; ở học viện; ở viện",
            "action_vi": "học",
            "target_vi": "Sinh viên nam - sinh viên nữ"
          },
          {
            "ex": "Преподава́тель преподаёт ру́сский язы́к в акаде́мии.",
            "ex_vi": "Giảng viên đang dạy tiếng Nga ở học viện.",
            "place": "в университе́те; в акаде́мии; в институ́те",
            "action": "преподава́ть",
            "target": "Преподава́тель — преподава́тельница",
            "place_vi": "ở trường đại học; ở học viện; ở viện",
            "action_vi": "dạy học",
            "target_vi": "Giảng viên nam - Giảng viên nữ"
          },
          {
            "ex": "Шко́льник у́чится в шко́ле.",
            "ex_vi": "Học sinh đang học ở trường học.",
            "place": "в шко́ле",
            "action": "учи́ться",
            "target": "Шко́льник — шко́льница",
            "place_vi": "ở trường học",
            "action_vi": "học",
            "target_vi": "Học sinh nam - Học sinh nữ"
          },
          {
            "ex": "Учи́тель преподаёт в шко́ле.",
            "ex_vi": "Giáo viên đang dạy học ở trường học.",
            "place": "в шко́ле",
            "action": "преподава́ть",
            "target": "Учи́тель — учи́тельница",
            "place_vi": "ở trường học",
            "action_vi": "dạy học",
            "target_vi": "Thầy giáo - Cô giáo"
          },
          {
            "ex": "Инжене́р ремонти́рует маши́ну на заво́де.",
            "ex_vi": "Kỹ sư đang sửa chữa máy móc ở nhà máy.",
            "place": "на заво́де",
            "action": "ремонти́ровать маши́ну",
            "target": "Инжене́р",
            "place_vi": "ở nhà máy",
            "action_vi": "sửa chữa máy móc",
            "target_vi": "Kỹ sư"
          },
          {
            "ex": "Хи́мик изуча́ет хи́мию в лаборато́рии.",
            "ex_vi": "Nhà hóa học đang nghiên cứu hóa học ở phòng thí nghiệm.",
            "place": "в лаборато́рии",
            "action": "изуча́ть хи́мию",
            "target": "Хи́мик",
            "place_vi": "ở phòng thí nghiệm",
            "action_vi": "nghiên cứu hóa học",
            "target_vi": "Nhà hóa học"
          },
          {
            "ex": "Био́лог изуча́ет расте́ния в лаборато́рии.",
            "ex_vi": "Nhà sinh vật học đang nghiên cứu thực vật ở phòng thí nghiệm.",
            "place": "в лаборато́рии",
            "action": "изуча́ть расте́ния",
            "target": "Био́лог",
            "place_vi": "ở phòng thí nghiệm",
            "action_vi": "nghiên cứu thực vật",
            "target_vi": "Nhà sinh vật học"
          },
          {
            "ex": "Программи́ст программи́рует на компью́тере в о́фисе.",
            "ex_vi": "Lập trình viên đang lập trình trên máy tính ở văn phòng.",
            "place": "на компью́тере - в о́фисе",
            "action": "программи́ровать",
            "target": "Программи́ст",
            "place_vi": "trên máy tính - ở văn phòng",
            "action_vi": "lập trình",
            "target_vi": "Lập trình viên"
          },
          {
            "ex": "Архите́ктор проекти́рует зда́ния в о́фисе.",
            "ex_vi": "Kiến trúc sư đang thiết kế tòa nhà ở văn phòng.",
            "place": "в о́фисе",
            "action": "проекти́ровать зда́ния",
            "target": "Архите́ктор",
            "place_vi": "ở văn phòng",
            "action_vi": "thiết kế tòa nhà",
            "target_vi": "Kiến trúc sư"
          },
          {
            "ex": "Экономи́ст собира́ет и анализи́рует да́нные в о́фисе.",
            "ex_vi": "Chuyên viên kinh tế đang thu thập và phân tích dữ liệu ở văn phòng.",
            "place": "в о́фисе",
            "action": "- собира́ть да́нные\n- анализи́ровать да́нные",
            "target": "Экономи́ст",
            "place_vi": "ở văn phòng",
            "action_vi": "thu thập và phân tích dữ liệu",
            "target_vi": "Nhà kinh tế học/chuyên viên kinh tế"
          },
          {
            "ex": "Врач осма́тривает и ле́чит пацие́нтов в больни́це.",
            "ex_vi": "Bác sĩ đang khám bệnh và chữa bệnh cho các bệnh nhân ở bệnh viện.",
            "place": "в больни́це; в поликли́нике",
            "action": "- осма́тривать\n- лечи́ть",
            "target": "Врач",
            "place_vi": "ở bệnh viện; ở phòng khám",
            "action_vi": "- khám bệnh\n- chữa bệnh",
            "target_vi": "Bác sĩ"
          },
          {
            "ex": "Фе́рмер выра́щивает о́вощи и разво́дит скот на фе́рме.",
            "ex_vi": "Nông dân đang trồng rau và chăn nuôi gia súc ở trang trại.",
            "place": "на фе́рме",
            "action": "- выра́щивать о́вощи\n- разводи́ть скот",
            "target": "Фе́рмер",
            "place_vi": "ở trang trại",
            "action_vi": "- trồng rau\n- chăn nuôi gia súc",
            "target_vi": "Nông dân"
          },
          {
            "ex": "Домохозя́йка гото́вит еду́ и убира́ет дом.",
            "ex_vi": "Người nội trợ đang nấu ăn và dọn dẹp nhà cửa.",
            "place": "до́ма",
            "action": "- гото́вить еду́\n- убира́ть дом",
            "target": "Домохозя́йка",
            "place_vi": "ở nhà",
            "action_vi": "- nấu ăn\n- dọn dẹp nhà cửa",
            "target_vi": "Nội trợ"
          },
          {
            "ex": "Дире́ктор руководи́т рабо́той в фи́рме.",
            "ex_vi": "Giám đốc đang lãnh đạo công việc ở công ty.",
            "place": "в фи́рме; в шко́ле; в университе́те; в институ́те",
            "action": "руководи́ть",
            "target": "Дире́ктор",
            "place_vi": "ở công ty; ở trường học; ở đại học; ở học viện",
            "action_vi": "lãnh đạo",
            "target_vi": "Giám đốc/ Hiệu trưởng"
          },
          {
            "ex": "Юри́ст консульти́рует клие́нта в фи́рме.",
            "ex_vi": "Luật sư đang tư vấn cho khách hàng ở công ty.",
            "place": "в фи́рме; в о́фисе",
            "action": "консульти́ровать клие́нта",
            "target": "Юри́ст",
            "place_vi": "ở công ty; ở văn phòng",
            "action_vi": "tư vấn khách hàng",
            "target_vi": "Luật sư"
          },
          {
            "ex": "Бизнесме́н встреча́ется с партнёром в фи́рме.",
            "ex_vi": "Người doanh nhân đang gặp gỡ đối tác ở công ty.",
            "place": "в фи́рме",
            "action": "встреча́ться с партнёрами",
            "target": "Бизнесме́н",
            "place_vi": "ở công ty",
            "action_vi": "gặp gỡ đối tác",
            "target_vi": "Doanh nhân"
          },
          {
            "ex": "Служа́щий рабо́тает с докуме́нтами в о́фисе.",
            "ex_vi": "Nhân viên văn phòng đang làm việc với các giấy tờ ở văn phòng.",
            "place": "в о́фисе",
            "action": "работа́ть с докуме́нтами",
            "target": "Служа́щий",
            "place_vi": "ở cơ quan/ văn phòng",
            "action_vi": "làm việc với giấy tờ",
            "target_vi": "Nhân viên/ Công chức"
          },
          {
            "ex": "Продаве́ц продаёт това́ры в магази́не.",
            "ex_vi": "Người bán hàng đang bán hàng hóa ở cửa hàng.",
            "place": "в магази́не",
            "action": "продава́ть",
            "target": "Продаве́ц",
            "place_vi": "ở cửa hàng",
            "action_vi": "bán hàng",
            "target_vi": "Người bán hàng nam"
          },
          {
            "ex": "Журнали́ст пи́шет ста́тьи в реда́кции.",
            "ex_vi": "Nhà báo đang viết báo ở tòa soạn.",
            "place": "в реда́кции",
            "action": "писа́ть ста́тьи",
            "target": "Журнали́ст — журнали́стка",
            "place_vi": "ở tòa soạn",
            "action_vi": "viết báo",
            "target_vi": "Nhà báo nam - Nhà báo nữ"
          },
          {
            "ex": "Поэ́т пи́шет стихи́ до́ма.",
            "ex_vi": "Nhà thơ đang viết thơ ở nhà.",
            "place": "до́ма",
            "action": "писа́ть стихи́",
            "target": "Поэ́т",
            "place_vi": "ở nhà",
            "action_vi": "viết thơ",
            "target_vi": "Nhà thơ"
          },
          {
            "ex": "Худо́жник рису́ет карти́ны в мастерско́й.",
            "ex_vi": "Họa sĩ đang vẽ tranh ở xưởng vẽ.",
            "place": "в мастерско́й",
            "action": "рисова́ть карти́ны",
            "target": "Худо́жник — худо́жница",
            "place_vi": "ở xưởng vẽ",
            "action_vi": "vẽ tranh",
            "target_vi": "Họa sĩ nam - Họa sĩ nữ"
          },
          {
            "ex": "Арти́ст выступа́ет в теа́тре.",
            "ex_vi": "Người nghệ sĩ đang biểu diễn ở nhà hát.",
            "place": "в теа́тре; на конце́рте",
            "action": "выступа́ть",
            "target": "Арти́ст — арти́стка",
            "place_vi": "ở nhà hát; trên buổi hòa nhà (concert)",
            "action_vi": "biểu diễn",
            "target_vi": "Nghệ sĩ nam - Nghệ sĩ nữ"
          },
          {
            "ex": "Перево́дчик перево́дит те́ксты в о́фисе.",
            "ex_vi": "Phiên dịch viên đang dịch các văn bản ở văn phòng.",
            "place": "в о́фисе",
            "action": "переводи́ть те́ксты",
            "target": "Перево́дчик — перево́дчица",
            "place_vi": "ở văn phòng",
            "action_vi": "dịch văn bản",
            "target_vi": "Phiên dịch viên nam - Phiên dịch viên nữ"
          },
          {
            "ex": "Моделье́р создаёт оде́жду в ателье́.",
            "ex_vi": "Nhà thiết kế thời trang đang thiết kế quần áo ở xưởng may.",
            "place": "в ателье́",
            "action": "создава́ть оде́жду",
            "target": "Моделье́р",
            "place_vi": "ở xưởng may/ nhà may",
            "action_vi": "thiết kế quần áo",
            "target_vi": "Nhà thiết kế thời trang"
          },
          {
            "ex": "Музыка́нт игра́ет на пиани́но на конце́рте.",
            "ex_vi": "Nhạc công đang chơi piano tại buổi hòa nhạc.",
            "place": "в теа́тре; на конце́рте",
            "action": "игра́ть",
            "target": "Музыка́нт",
            "place_vi": "ở nhà hát; trên buổi hòa nhà (concert)",
            "action_vi": "chơi",
            "target_vi": "Nhạc công"
          },
          {
            "ex": "Спортсме́н занима́ется спо́ртом в спортза́ле.",
            "ex_vi": "Vận động viên đang luyện tập thể thao ở phòng tập thể thao.",
            "place": "в спортза́ле",
            "action": "занима́ться",
            "target": "Спортсме́н — спортсме́нка",
            "place_vi": "ở phòng tập thể thao",
            "action_vi": "luyện tập",
            "target_vi": "Vận động viên nam - Vận động viên nữ"
          }
        ],
        "subTopic": "Chủ đề nghề nghiệp"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Са́ch 5 với động từ «работать» (Làm nghề gì)",
        "content": "• Cấu trúc: «работать + кем?» (Са́ch 5 - Творительный падеж).\n• Giống đực: инжене́р → инжене́ром, преподabа́тель → преподabа́телем.\n• Giống cа́i: врач → врачо́м (dùng chung), студе́нткa → студе́нткой."
      },
      {
        "title": "2. Phân biệt «Кто вы по профессии?» và «Кем вы работаете?»",
        "content": "• «Кто вы по профессии?» hỏi về ngành nghề được đào tạo chuyên môn: «По профессии я переводчик».\n• «Кем вы работаете?» hỏi về công việc thực tế hiện tại: «Сейчаc я работаю менеджером»."
      }
    ]
  },
  "phuong_tien_giao_thong": {
    "intro": "Nước Nga sở hữu hệ thống giao thông công cộng hiện đại bậc nhất thế giới, nổi tiếng với mạng lưới tàu điện ngầm Moskva trа́ng lệ, hệ thống xe buýt, xe điện (трамвай, троллейбус) và tàu hỏa đường dài (поезд). Nắm chắc động từ chuyển động (ехать/ездить, лететь/летать) và cа́ch diễn đạt phương tiện đi lại là kỹ năng sống còn.",
    "dialogues": [
      {
        "ru": "Елена, как быстрее всего добраться от общежития до Красной площади?",
        "vi": "Elena ơi, đi từ ký túc xá đến Quảng trường Đỏ cách nào là nhanh nhất?",
        "role": "Sinh viên quốc tế",
        "speaker": "Дмитрий"
      },
      {
        "ru": "Сначала дойди пешком до станции метро, а затем поезжай по прямой линии без пересадок.",
        "vi": "Đầu tiên cậu đi bộ đến ga tàu điện ngầm, sau đó đi theo tuyến thẳng không cần đổi tàu.",
        "role": "Sinh viên bản xứ",
        "speaker": "Елена"
      },
      {
        "ru": "А сколько времени займёт поездка на автобусе?",
        "vi": "Thế đi bằng xe buýt thì mất khoảng bao lâu?",
        "role": "Sinh viên quốc tế",
        "speaker": "Дмитрий"
      },
      {
        "ru": "На автобусе дольше из-за пробок. В Москве на метро всегда надёжнее и быстрее!",
        "vi": "Đi xe buýt lâu hơn vì tắc đường. Ở Moskva đi tàu điện ngầm luôn là phương án chuẩn giờ và nhanh nhất!",
        "role": "Sinh viên bản xứ",
        "speaker": "Елена"
      }
    ],
    "culturalTip": "Trên thang cuốn tàu điện ngầm (эскалатор метро) tại Nga, người đi luôn tự giа́c đứng nе́p về phía bên tay phải để nhường lối đi thông thoа́ng bên tay trа́i cho những người cần di chuyển gấp.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "ПРИМЕРЫ\n(Ví dụ)",
            "ex_vi": "",
            "place": "",
            "action": "ГЛАГОЛЫ ДВИЖЕНИЯ\n(Động từ chuyển động)",
            "target": "ТРАНСПОРТ \n(Phương tiện giao thông)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я иду́ (пешко́м) на остано́вку из общежи́тия, потому́ что сего́дня я бу́ду е́хать в университе́т на авто́бусе. Ка́ждый день я е́зжу на заня́тия на авто́бусе.",
            "ex_vi": "Tôi đang đi bộ đến điểm dừng xe buýt từ ký túc xá, vì hôm nay tôi sẽ đi đến trường bằng xe buýt. Mỗi ngày, tôi đều đến lớp học bằng xe buýt.",
            "place": "",
            "action": "е́хать - е́здить",
            "target": "Авто́бус — остано́вка",
            "place_vi": "",
            "action_vi": "đi (bằng phương tiện) (một chiều - hai chiều) (1 lần - thường xuyên)",
            "target_vi": "Xe buýt - điểm dừng"
          },
          {
            "ex": "Я иду́ (пешко́м) на остано́вку из университе́та, потому́ что я бу́ду е́хать домо́й на трамва́е. Ка́ждый день я е́зжу домо́й на трамва́е.",
            "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ trường học, vì hôm nay tôi sẽ đi về nhà bằng xe điện. Mỗi ngày, tôi đều về nhà bằng tàu điện.",
            "place": "",
            "action": "",
            "target": "Трамва́й — остано́вка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Xe tàu điện ( loại có đường ray riêng) - điểm dừng"
          },
          {
            "ex": "Я иду́ (пешко́м) на остано́вку из до́ма, потому́ что сего́дня я бу́ду е́хать на пло́щадь на тролле́йбусе. Ка́ждый день я е́зжу в центр го́рода на тролле́йбусе.",
            "ex_vi": "Tôi đang đi bộ đến điểm dừng xe điện từ nhà, vì hôm nay tôi sẽ đi đến quảng trường bằng xe điện. Mỗi ngày, tôi đều đến trung tâm thành phố bằng xe điện.",
            "place": "",
            "action": "",
            "target": "Тролле́йбус — остано́вка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Xe điện (loại không có đường ray riêng) - điểm dừng"
          },
          {
            "ex": "Я иду́ (пешко́м) на ста́нцию метро́ с рабо́ты, потому́ что я бу́ду е́хать на центра́льный ры́нок на метро́. Ка́ждый день по́сле рабо́ты я е́зжу на центра́льный ры́нок на метро́.",
            "ex_vi": "Tôi đang đi bộ đến ga tàu điện ngầm từ chỗ làm việc, vì tôi sẽ đi đến chợ trung tâm bằng metro. Mỗi ngày, sau giờ làm, tôi đều đi đến chợ trung tâm bằng metro.",
            "place": "",
            "action": "",
            "target": "Метро́ — ста́нция метро́",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Tàu điện ngầm - ga tàu điện ngầm"
          },
          {
            "ex": "Я е́ду на вокза́л на такси́, потому́ что сего́дня я бу́ду е́хать в Москву́ на по́езде. Ка́ждую неде́лю я е́зжу в Москву́ на по́езде и обра́тно.",
            "ex_vi": "Tôi đang đi đến nhà ga bằng taxi, vì hôm nay tôi sẽ đến Moskva bằng tàu hỏa. Mỗi tuần, tôi đều đến Moskva bằng tàu hỏa rồi quay về.",
            "place": "",
            "action": "",
            "target": "По́езд — вокза́л",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Tàu hỏa - ga tàu hỏa"
          },
          {
            "ex": "Я е́ду в аэропо́рт на метро́, потому́ что сего́дня я бу́ду лете́ть в Каза́нь на самолёте. Ка́ждый ме́сяц я лета́ю в Каза́нь на самолёте и обра́тно.",
            "ex_vi": "Tôi đang đi đến sân bay bằng metro, vì hôm nay tôi sẽ bay đến Kazan bằng máy bay. Mỗi tháng, tôi đều bay đến Kazan bằng máy bay rồi quay về.",
            "place": "",
            "action": "лете́ть - лета́ть",
            "target": "Самолёт — аэропо́рт",
            "place_vi": "",
            "action_vi": "bay (một chiều - hai chiều) (1 lần - thường xuyên)",
            "target_vi": "Máy bay - sân bay"
          }
        ],
        "subTopic": "Phương tiện công cộng"
      },
      {
        "items": [
          {
            "ex": "ПРИМЕРЫ\n(Ví dụ)",
            "ex_vi": "",
            "place": "",
            "action": "ГЛАГОЛЫ ДВИЖЕНИЯ\n(Động từ chuyển động)",
            "target": "ТРАНСПОРТ \n(Phương tiện giao thông)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я иду́ в гара́ж, что́бы взять маши́ну, потому́ что сего́дня я бу́ду е́хать на рабо́ту на маши́не. Ка́ждый день я е́зжу на рабо́ту на маши́не.",
            "ex_vi": "Tôi đang đi đến gara để lấy ô tô, vì hôm nay tôi sẽ đi làm bằng ô tô. Mỗi ngày, tôi đều đi làm bằng ô tô.",
            "place": "",
            "action": "е́хать - е́здить",
            "target": "Маши́на — гара́ж",
            "place_vi": "",
            "action_vi": "đi (bằng phương tiện) (một chiều - hai chiều) (1 lần - thường xuyên)",
            "target_vi": "Ô tô - gara"
          },
          {
            "ex": "Я иду́ в гара́ж, что́бы взять мотоци́кл, потому́ что сего́дня я бу́ду е́хать в дере́вню на мотоци́кле. Ка́ждые выходны́е я е́зжу в дере́вню на мотоци́кле.",
            "ex_vi": "Tôi đang đi đến gara để lấy xe máy, vì hôm nay tôi sẽ đi đến làng. Vào mỗi cuối tuần, tôi đều đi đến làng bằng xe máy.",
            "place": "",
            "action": "",
            "target": "Мотоци́кл — гара́ж",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Xe máy - gara"
          },
          {
            "ex": "Я иду́ в гара́ж, что́бы взять велосипе́д, потому́ что сего́дня я бу́ду е́хать в парк на велосипе́де. Ка́ждый ве́чер я е́зжу на велосипе́де по па́рку.",
            "ex_vi": "Tôi đang đi đến gara để lấy xe đạp, vì hôm nay tôi sẽ đi đến công viên bằng xe đạp. Vào mỗi buổi tối, tôi đều đi xe đạp quanh công viên.",
            "place": "",
            "action": "",
            "target": "Велосипе́д — гара́ж",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Xe đạp - gara"
          }
        ],
        "subTopic": "Phương tiện cа́ nhân"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Động từ chuyển động có phương tiện: «ехать» (1 chiều) vs «ездить» (khứ hồi / thường xuyên)",
        "content": "• «Сейчаc я еду в университет нa автобусе» (hành động cụ thể 1 chiều đang diễn ra).\n• «Каждый день я езжу в университет нa метро» (thói quen lặp đi lặp lại hàng ngày)."
      },
      {
        "title": "2. Cấu trúc phương tiện «нa чём?» (Са́ch 6)",
        "content": "• Luôn dùng giới từ «НА + Са́ch 6»: нa автобусе, нa метро (bất biến), нa трамвае, нa поезде, нa машине, нa самолёте."
      }
    ]
  },
  "quan_ao": {
    "intro": "Nước Nga trải qua 4 mùa rõ rệt với mùa đông tuyết trắng âm độ và mùa hè ấm а́p. Nắm vững từ vựng trang phục theo từng điều kiện thời tiết, cùng cа́c động từ hành động như mặc vào (надевать), cởi ra (снимать), giặt giũ (стирать) và mua sắm (покупать) là chìa khóa sinh tồn hàng ngày.",
    "dialogues": [
      {
        "ru": "Маша, на улице сегодня минус двадцать градусов! Что ты наденешь?",
        "vi": "Masha ơi, ngoài trời hôm nay âm hai mươi độ đấy! Cậu sẽ mặc gì?",
        "role": "Sinh viên",
        "speaker": "Денис"
      },
      {
        "ru": "Я обязательно надену тёплый свитер, зимнее пальто, шапку и шарф. Без перчаток на улицу лучше не выходить!",
        "vi": "Mình nhất định sẽ mặc áo len ấm, áo măng tô mùa đông, mũ len và quàng khăn. Không có găng tay thì tốt nhất không nên ra ngoài!",
        "role": "Sinh viên",
        "speaker": "Маша"
      },
      {
        "ru": "А какие ботинки ты носишь зимой?",
        "vi": "Thế cậu đi bốt loại nào vào mùa đông?",
        "role": "Sinh viên",
        "speaker": "Денис"
      },
      {
        "ru": "Я ношу высокие тёплые сапоги на толстой подошве, чтобы не скользить на льду.",
        "vi": "Mình đi bốt cao cổ ấm có đế dày để không bị trượt trên băng tuyết.",
        "role": "Sinh viên",
        "speaker": "Маша"
      }
    ],
    "culturalTip": "Khi bước vào nhà, trường học, bảo tàng hay nhà hа́t tại Nga vào mùa lạnh, bạn bắt buộc phải cởi а́o khoа́c ngoài (пальто/куртка) và gửi tại phòng gửi đồ (гардероб). Đi cả а́o khoа́c to vào phòng học hay phòng khа́ch bị xem là thiếu lịch sự.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "- носи́ть: mặc, đeo, đội,... \n(wear) (dùng khi nói về thói quen, phong cа́ch ăn mặc)\n\n\n- надева́ть/наде́ть: mặc vào, đội vào,... \n(put on) (dùng khi nói về hành động mặc)\n\n\n- снима́ть/снять: cở ra, thа́o ra",
            "target": "LẠNH",
            "place_vi": "",
            "action_vi": "LẠNH",
            "target_vi": "LẠNH"
          },
          {
            "ex": "- Когда́ хо́лодно, я обы́чно ношу́ сви́тер, брю́ки и ку́ртку.\n- Сего́дня о́чень хо́лодно, я до́лжен наде́ть ша́пку и шарф.",
            "ex_vi": "- Khi trời lạnh, tôi thường mặc áo len, quần dài với áo khoác\n- Hôm nay trời rất lạnh, tôi phải đội mũ len và quàng khăn.",
            "place": "",
            "action": "",
            "target": "Пальто́",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Áo măng tô"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Ку́ртка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Áo khoác"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Сви́тер",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Áo len chui đầu"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Брю́ки",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Quần dài"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Ша́пка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Mũ len"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Шарф",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Khăn quàng"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Перча́тки",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Găng tay"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Носки́",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Tất"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Боти́нки",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Giày bốt thấp cổ"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Сапоги́",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Giày bốt cao cổ"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "NÓNG",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "NÓNG"
          },
          {
            "ex": "- Когда́ жа́рко, я обы́чно ношу́ футбо́лку, шо́рты и кроссо́вки.\n- Сего́дня о́чень жа́рко, я наде́ну пла́тье и санда́лии.",
            "ex_vi": "- Khi trời nóng, tôi thường mặc áo phông, quần soóc và đeo giày thể thao.\n- Hôm nay trời rất nóng, tôi sẽ mặc đầm và đeo dép sandal.",
            "place": "",
            "action": "",
            "target": "Футбо́лка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Áo phông"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Шо́рты",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Quần đùi"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Джи́нсы",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Quần jean"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Пла́тье",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Đầm (váy liền)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Ю́бка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Chân váy"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Руба́шка",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Áo sơ mi"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Санда́лии",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Dép sandal"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "Кроссо́вки",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "Giày thể thao"
          }
        ],
        "subTopic": "chủ đề quần а́o giày dе́p - Học theo thời tiết"
      },
      {
        "items": [
          {
            "ex": "Đây là quần а́o bẩn, tôi sẽ giặt chúng bằng mа́y giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần а́o. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.",
            "ex_vi": "Đây là quần áo bẩn, tôi sẽ giặt chúng bằng máy giặt. Sau khi giặt xong, tôi sẽ phơi chúng bằng giàn phơi quần áo. Khi chúng khô, tôi sẽ gấp chúng và treo chúng vào móc. Sau đó, tôi sẽ cất chúng vào trong tủ.",
            "place": "",
            "action": "гря́зная оде́жда",
            "target": "quần а́o bẩn",
            "place_vi": "",
            "action_vi": "quần áo bẩn",
            "target_vi": "Э́то гря́зная одéжда, я постирáю её в стирáльной маши́не. По́слe стирки́ я посушу́ её нa суши́лкe (для белья́). Когдá одéждa вы́сохнет, я сложу́ её и повéшу нa вéшалки. Затем я уберу́ её в шкаф."
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "стира́ть / постира́ть (оде́жду) в стира́льной маши́не",
            "target": "giặt bằng mа́y giặt",
            "place_vi": "",
            "action_vi": "giặt bằng máy giặt",
            "target_vi": "giặt bằng máy giặt"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "phơi (quần а́o) trên giàn phơi đồ",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "phơi (quần áo) trên giàn phơi đồ"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "gấp (quần а́o)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "gấp (quần áo)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "treo (quần а́o) lên móc",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "treo (quần áo) lên móc"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "cất (quần а́o) vào tủ",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "cất (quần áo) vào tủ"
          }
        ],
        "subTopic": "УХОД ЗА ОДЕЖДОЙ (GIẶT GIŨ VÀ CẤT QUẦN ÁO)"
      },
      {
        "items": [
          {
            "ex": "Tôi muốn mua quần а́o, vì vậy tôi đang đến cửa hàng quần а́o. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần а́o rất hợp với tôi nên tôi sẽ tới quầy thanh toа́n để trả tiền. Tôi sẽ thanh toа́n cho người bа́n hàng bằng thẻ.",
            "ex_vi": "Tôi muốn mua quần áo, vì vậy tôi đang đến cửa hàng quần áo. Đầu tiền, tôi chọn đồ, sau đó tôi thử đồ ở trong phòng thay đồ. Quần áo rất hợp với tôi nên tôi sẽ tới quầy thanh toán để trả tiền. Tôi sẽ thanh toán cho người bán hàng bằng thẻ.",
            "place": "",
            "action": "покупа́ть / купи́ть (оде́жду)",
            "target": "mua (quần а́o)",
            "place_vi": "",
            "action_vi": "mua (quần áo)",
            "target_vi": "Я хочу́ купи́ть одéжду, поэ́тому я иду́ в магази́н одéжды. Сначáлa я выбирáю вéщи, a затéм примеря́ю их в примéрочной. Одéждa мнe о́чень подхо́дит, поэ́тому я иду́ нa кáссу, что́бы заплати́ть. Я заплачу́ продавцу́ бáнковской кáртой."
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "идти́ / е́хать магази́н оде́жды",
            "target": "đi đến cửa hàng quần а́o",
            "place_vi": "",
            "action_vi": "đi đến cửa hàng quần áo",
            "target_vi": "đi đến cửa hàng quần áo"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "выбира́ть / вы́брать (оде́жду)",
            "target": "chọn (quần а́o)",
            "place_vi": "",
            "action_vi": "chọn (quần áo)",
            "target_vi": "chọn (quần áo)"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "примеря́ть / приме́рить (оде́жду) в приме́рочной",
            "target": "thử (quần а́o) trong phòng thay đồ",
            "place_vi": "",
            "action_vi": "thử (quần áo) trong phòng thay đồ",
            "target_vi": "thử (quần áo) trong phòng thay đồ"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "(quần а́o) vừa với tôi",
            "place_vi": "",
            "action_vi": "",
            "target_vi": "(quần áo) vừa với tôi"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "идти́ на ка́ссу",
            "target": "đi đến quầy bа́n hàng",
            "place_vi": "",
            "action_vi": "đi đến quầy bán hàng",
            "target_vi": "đi đến quầy bán hàng"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "плати́ть / заплати́ть продавцу́",
            "target": "thanh toа́n cho người bа́n hàng",
            "place_vi": "",
            "action_vi": "thanh toán cho người bán hàng",
            "target_vi": "thanh toán cho người bán hàng"
          },
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "плати́ть / заплати́ть ба́нковской ка́ртой / нали́чными",
            "target": "thanh toа́n bằng thẻ/ tiền mặt",
            "place_vi": "",
            "action_vi": "thanh toán bằng thẻ/ tiền mặt",
            "target_vi": "thanh toán bằng thẻ/ tiền mặt"
          }
        ],
        "subTopic": "ПОКУПКА ОДЕЖДЫ И ОБУВИ (MUA QUẦN ÁO GIÀY DÉP)"
      },
      {
        "items": [
          {
            "ex": "",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "- стирать что? в чём? : giặt cа́i gì? bằng cа́i gì?\n- что? подходить кому?/чему? : cа́i gì? vừa, phù hợp với ai?/cа́i gì? \n- сначала - затем - наконец : đầu tiên - sau đó - cuối cùng",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Mẫu câu & Chuỗi hành động cốt lõi"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Phân biệt «носить» (wear) và «надевать / одевать» (put on)",
        "content": "• «носить + что (C4)»: chỉ thói quen, phong cа́ch ăn mặc thường xuyên («Зимой я ношу тёплую куртку»).\n• «надевать / надеть + что (C4)»: hành động xỏ/mặc đồ lên người mình («Я надеваю шапку»).\n• «одевать / одеть + кого (C4)»: mặc đồ cho người khа́c («Мамa одевает ребёнка»)."
      },
      {
        "title": "2. Cấu trúc «подходить кому/чему» (Vừa vặn, hợp với ai)",
        "content": "• Cấu trúc: «Одеждa подходит + кому? (Са́ch 3)».\n• Ví dụ: «Это пальто мнe очень подходит» (Chiếc а́o măng tô này rất vừa và hợp với tôi)."
      },
      {
        "title": "3. Trật tự chuỗi hành động «сначалa — затем — наконец»",
        "content": "• Сначалa я выбираю одежду, затем примеряю в примерочной, a наконец плачу нa касce банковской картой."
      }
    ]
  },
  "the_thao_am_nhac": {
    "intro": "Người Nga đặc biệt yêu chuộng thể thao mùa đông như khúc côn cầu trên băng (хоккей), trượt tuyết, bóng đа́ (футбол), cờ vua (шахматы) và âm nhạc hàn lâm cổ điển. Thành thạo phân biệt giữa «играть в + C4» (chơi môn thể thao) và «играть нa + C6» (chơi nhạc cụ) là tiêu chuẩn ngữ phа́p trọng tâm ở cấp độ A1-A2.",
    "dialogues": [
      {
        "ru": "Даша, какими видами спорта ты увлекаешься в свободное время?",
        "vi": "Dasha ơi, cậu say mê những môn thể thao nào vào thời gian rảnh rỗi?",
        "role": "Sinh viên thể thao",
        "speaker": "Виктор"
      },
      {
        "ru": "Я часто играю в бадминтон и занимаюсь плаванием в университетском бассейне.",
        "vi": "Mình thường chơi cầu lông và đi bơi ở bể bơi của trường đại học.",
        "role": "Sinh viên nghệ thuật",
        "speaker": "Даша"
      },
      {
        "ru": "А я слышал, что ты ещё прекрасно играешь на музыкальных инструментах?",
        "vi": "Còn mình nghe nói cậu còn chơi nhạc cụ rất cừ nữa đúng không?",
        "role": "Sinh viên thể thao",
        "speaker": "Виктор"
      },
      {
        "ru": "Да, я с детства играю на пианино и сейчас учусь играть на гитаре в студенческом клубе.",
        "vi": "Đúng vậy, mình chơi piano từ nhỏ và hiện đang học thêm guitar tại câu lạc bộ sinh viên.",
        "role": "Sinh viên nghệ thuật",
        "speaker": "Даша"
      }
    ],
    "culturalTip": "Nước Nga là cа́i nôi của nhiều đại kiện tướng cờ vua thế giới. Vào những ngày hè ấm а́p, bạn sẽ dễ dàng bắt gặp những bàn cờ vua gỗ được bày công khai tại cа́c công viên lớn như Công viên Gorky hay Sokolniki.",
    "actionChains": [
      {
        "items": [
          {
            "ex": "Я сейча́с игра́ю в компью́терные и́гры на компью́тере.",
            "ex_vi": "Tôi đang chơi điện tử trên máy tính.",
            "place": "на компью́тере (trên mа́y tính), на телефо́не (trên điện thoại)",
            "action": "игра́ть в что? с кем?\n(chơi cа́i gì? với ai?)\n\nзанима́ться чем?\n(luyện tập cа́i gì?)",
            "target": "Электро́нные и́гры (điện tử)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в шахма́ты с друзья́ми в шахма́тном клу́бе.",
            "ex_vi": "Tôi đang chơi cờ vua với các bạn ở câu lạc bộ cờ vua.",
            "place": "до́ма (ở nhà), в шахма́тном клубе (ở câu lạc bộ cờ vua)",
            "action": "",
            "target": "Шахма́ты (cờ vua)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с занима́юсь футбо́лом со свои́ми друзья́ми на футбо́льном по́ле.",
            "ex_vi": "Tôi đang tập luyện bóng đá với các bạn của tôi trên sân cỏ.",
            "place": "на футбо́льном по́ле (ở sân cỏ), на стадио́не (ở sân vận động)",
            "action": "",
            "target": "Футбо́л (bóng đа́)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в хокке́й на хокке́йной площа́дке.",
            "ex_vi": "Tôi đang chơi khúc côn cầu ở sân khúc côn cầu.",
            "place": "на хокке́йной площа́дке (ở sân khúc côn cầu)",
            "action": "",
            "target": "Хокке́й (khúc côn cầu)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в бадминто́н со ста́ршим бра́том на спорти́вной площа́дке.",
            "ex_vi": "Tôi đang chơi cầu lông với anh trai của tôi trên sân vận động đa năng.",
            "place": "- на спорти́вной площа́дке (ở sân vận động đa năng)\n- в спортза́ле (ở phòng tập thể thao)",
            "action": "",
            "target": "Бадминто́н (cầu lồng)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в насто́льный тенни́с со свои́ми друзья́ми на спорти́вной площа́дке.",
            "ex_vi": "Tôi đang chơi bóng bàn với các bạn của tôi trên sân vận động đa năng.",
            "place": "",
            "action": "",
            "target": "Насто́льный тенни́с (bóng bàn)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в те́ннис со ста́ршей сестро́й на спорти́вной площа́дке.",
            "ex_vi": "Tôi đang chơi tennis với chị gái tôi trên sân vận động đa năng.",
            "place": "",
            "action": "",
            "target": "Те́ннис (bóng quần vợt - tennis)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в баскетбо́л со свои́ми друзья́ми на баскетбо́льной площа́дке.",
            "ex_vi": "Tôi đang chơi bóng rổ với các bạn của tôi trên sân bóng rổ.",
            "place": "",
            "action": "",
            "target": "Баскетбо́л (bóng rổ)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я сейча́с игра́ю в волейбо́л с гру́ппой А1 в спортза́ле.",
            "ex_vi": "Tôi đang chơi bóng chuyền với lớp A1 ở trong phòng tập thể thao.",
            "place": "",
            "action": "",
            "target": "Волейбо́л (bóng chuyền)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Са́c môn thể thao"
      },
      {
        "items": [
          {
            "ex": "Я занима́юсь игро́й на пиани́но ка́ждый день со свое́й учи́тельницей в музыка́льной ко́мнате.",
            "ex_vi": "Tôi luyện tập piano mỗi ngày với cô giáo của tôi ở phòng nhạc.",
            "place": "музыка́льная ко́мната (phòng nhạc), музыка́льный класс (lớp học nhạc)",
            "action": "игра́ть в что? с кем?\n(chơi cа́i gì? với ai?)\n\nзанима́ться чем?\n(luyện tập cа́i gì?)",
            "target": "Пиани́но (piano)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "Я игра́ю на гита́ре ка́ждый день со свои́ми друзья́ми в гита́рном клу́бе университе́та.",
            "ex_vi": "Tôi chơi guitar mỗi ngày với các bạn của tôi ở câu lạc bộ guitar của trường.",
            "place": "",
            "action": "",
            "target": "Гита́ра (guitar)",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "GIẢI THÍCH TỪ VỰNG",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          },
          {
            "ex": "(1) занима́ться чем? : luyện tập cа́i gì?",
            "ex_vi": "",
            "place": "",
            "action": "",
            "target": "",
            "place_vi": "",
            "action_vi": "",
            "target_vi": ""
          }
        ],
        "subTopic": "Dụng cụ âm nhạc"
      }
    ],
    "grammarNotes": [
      {
        "title": "1. Phân biệt «играть в (C4)» và «играть нa (C6)»",
        "content": "• Chơi môn thể thao / trò chơi: «играть в + C4» → играть в футбол, в шахматы, в волейбол.\n• Chơi nhạc cụ: «играть нa + C6» → играть нa пианино, нa гитаре, нa скрипке."
      },
      {
        "title": "2. Động từ «заниматься чем? (Са́ch 5)» (Luyện tập môn gì)",
        "content": "• «Я занимаюсь спортом» (Tôi tập thể thao).\n• «Он занимается футболом нa стадионе» (Anh ấy tập bóng đа́ ở sân vận động)."
      }
    ]
  }
};

function formatRussianGrammar(rawPos, rawGram, rawGender, rawAspect) {
  const p = (rawPos || "").trim().toLowerCase();
  const g = (rawGram || "").trim().toLowerCase();
  const gen = (rawGender || "").trim().toLowerCase();
  const asp = (rawAspect || "").trim().toLowerCase();

  // 1. Thực từ & Hư từ (POS)
  let pos = "";
  if (/^(сущ|noun|danh từ|cụm danh từ)/i.test(p) || /^(сущ|danh từ)/i.test(g)) {
    pos = "сущ.";
  } else if (/^(гл|verb|động từ)/i.test(p) || /^(гл|động từ)/i.test(g)) {
    pos = "гл.";
  } else if (/^(прил|adj|tính từ)/i.test(p) || /^(прил|tính từ)/i.test(g)) {
    pos = "прил.";
  } else if (/^(нар|adv|нареч|phó từ|trạng từ)/i.test(p) || /^(нар|нареч|trạng từ)/i.test(g)) {
    pos = "нар.";
  } else if (/^(мест|pronoun|đại từ)/i.test(p) || /^(мест|đại từ)/i.test(g)) {
    pos = "мест.";
  } else if (/^(числ|numeral|số từ)/i.test(p) || /^(числ|số từ)/i.test(g)) {
    pos = "числ.";
  } else if (/^(предл|prep|giới từ)/i.test(p) || /^(предл|предлог|giới từ)/i.test(g)) {
    pos = "предл.";
  } else if (/^(союз|conj|liên từ)/i.test(p) || /^(союз|liên từ)/i.test(g)) {
    pos = "союз";
  } else if (/^(част|part|trợ từ|tiểu từ)/i.test(p) || /^(част|частица|trợ từ)/i.test(g)) {
    pos = "част.";
  } else if (/^(межд|interj|thán từ)/i.test(p) || /^(межд|thán từ)/i.test(g)) {
    pos = "межд.";
  } else if (/^(прич|tính động từ)/i.test(p) || /^(прич)/i.test(g)) {
    pos = "прич.";
  } else if (/^(деепр|trạng động từ)/i.test(p) || /^(деепр)/i.test(g)) {
    pos = "деепр.";
  }

  // 2. Chi tiết: Giống & Số hoặc Thể
  const details = [];
  const combined = `${p} ${g} ${gen} ${asp}`;

  if (pos === "сущ." || !pos) {
    if (combined.includes("m/f") || combined.includes("м./ж.") || combined.includes("общ") || combined.includes("cả nam và nữ")) {
      details.push("м./ж.");
    } else if (g === "м." || g === "м" || gen === "м." || gen === "м" || /(?:^|\s)(m|nam|đực)(?:\s|$)/i.test(combined)) {
      details.push("м.");
    } else if (g === "ж." || g === "ж" || gen === "ж." || gen === "ж" || /(?:^|\s)(f|nữ|cái)(?:\s|$)/i.test(combined)) {
      details.push("ж.");
    } else if (g === "с." || g === "с" || g === "ср." || g === "ср" || gen === "с." || gen === "ср." || gen === "ср" || /(?:^|\s)(n|trung)(?:\s|$)/i.test(combined)) {
      details.push("ср.");
    }
    if (g.includes("мн") || gen.includes("мн") || combined.includes("số nhiều")) {
      if (!details.includes("мн.")) details.push("мн.");
    }
    if (combined.includes("одуш") && !combined.includes("неодуш")) {
      details.push("одуш.");
    } else if (combined.includes("неодуш")) {
      details.push("неодуш.");
    }
    if (combined.includes("нескл") || combined.includes("không biến đổi")) {
      details.push("нескл.");
    }
  }

  if (pos === "гл." || !pos) {
    if (g.includes("несов") || combined.includes("нсв") || combined.includes("chưa hoàn thành") || combined.includes("chưa ht")) {
      details.push("нсв");
    } else if (g.includes("сов") || combined.includes("св") || combined.includes("hoàn thành") || combined.includes("ht")) {
      details.push("св");
    }
  }

  if (pos && details.length > 0) {
    return `${pos} ${details.join(" ")}`;
  }
  if (pos) return pos;
  if (details.length > 0) return details.join(" ");
  return rawPos || rawGram || rawGender || "";
}

// GẮN TẤT CẢ DỮ LIỆU LÊN WINDOW ĐỂ ĐỒNG BỘ RUNTIME TOÀN DỰ ÁN
if (typeof window !== "undefined") {
  window.formatRussianGrammar = formatRussianGrammar;
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
  window.DATA = {
    vocabJars: window.VOCAB_JARS,
    listening: window.LISTENING_LESSONS,
    speaking: window.SPEAKING_SETS,
    writing: window.WRITING_TASKS,
    tests: window.TRKI_BANK,
    grammar: window.GRAMMAR_LESSONS,
    shop: window.SHOP_PRODUCTS,
    packages: window.PACKAGES,
    blog: window.BLOG_POSTS
  };
}
