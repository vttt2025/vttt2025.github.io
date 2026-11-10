# RUSI TRKI — ARCHITECTURE, DATABASE, SECURITY, RESPONSIVE & CMS SPECIFICATION

> **Target Audience**: AI Coding Agents (Google Antigravity, Cursor Composer, Windsurf Cascade, Claude Code, Copilot).  
> **Objective**: Context-injection single-source-of-truth specification for building, maintaining, and scaling the RUSI TRKI Platform serving 10,000+ concurrent learners.  
> **Brand & Identity**: Thiết kế hiện đại chuẩn Figma (Figma Make App), biểu tượng chữ cái Nga `Я` nền đỏ nghiêng -6°, Mascot Rusika (Mèo mắt xanh thông minh), Gamification Streak & XP, Theme Mùa đông nước Nga (Russian Winter Cool Blue).  
> **Color Palette**: Russian Crimson Red `#c52233`, Dark Red `#991b2b`, Russian Cobalt Blue `#1757a6`, Deep Baltic Navy `#102a4c`, Mùa đông Cool Blue `#eef4fb`, Warm Cream Paper `#f8f7f3`. Typography `Inter` với headline tracking tối ưu cho tiếng Việt & tiếng Nga.

---

## 1. HỆ THỐNG CÁC PHÂN HỆ CỐT LÕI (CORE MODULES ARCHITECTURE)

```text
                                        [TRANG CHỦ - index.html]
                             (Hero Section, Slider Đánh Giá, Tiến độ học)
            ┌──────────────────────────────────────┴───────────────────────────────────────────────┐
            ▼                                                                                      ▼
   [HỆ THỐNG 7 CHUYÊN MỤC NỘI DUNG]                                                    [TIỆN ÍCH & DỊCH VỤ NỀN TẢNG]
   ├── 1. TỪ VỰNG (Bài học Chủ đề, chuỗi hành động, Lọ Từ, Flashcard SRS SM-2)         ├── Nâng cấp PRO (VietQR / Chuyển khoản)
   ├── 2. VIẾT (Tả tranh, viết tóm tắt, viết theo chủ đề)                              ├── Pomodoro Focus Widget (Header Mini)
   ├── 3. NGHE (YouTube Shadowing, Nghe hiểu, nghe chép chính tả)                      ├── Trợ lý Học tập AI (Floating Bubble)
   ├── 4. NÓI (Shadowing, AI chấm điểm, phân tích)                                     └── Từ điển tra cứu 6 Cách TFlat
   ├── 5. THI THỬ TRKI (Mô phỏng đề thi A1, A2, B1, B2, C1, C2)
   ├── 6. BLOG (Cẩm nang du học, KTX, Đời sống Nga)
   └── 7. SHOP (Sản phẩm, dịch vụ, tools Nga Việt)

```

* **Trang Chủ Thích Ứng Cá Nhân Hóa (Adaptive Homepage & Learning Cockpit — `index.html`)**:
  * **Trạng thái Khách vãng lai (Guest View)**: Giới thiệu phương pháp học, Hero Banner ấn tượng, lưới 7 chuyên mục, thanh tìm kiếm thông minh, cảm nhận học viên và giải đáp thắc mắc (FAQ).
  * **Trạng thái Học viên đã đăng nhập (Personalized Learning Cockpit — `body.index-personalized`)**: Hàm `renderIndexProgressIfLoggedIn(user)` trong `app.js` tự động kích hoạt Bảng điều khiển tiến độ học tập toàn diện (`.index-progress-dashboard`) thay thế nội dung tiếp thị tĩnh:
    - *Header & Chỉ số tổng quan*: Tổng điểm kinh nghiệm XP, chuỗi ngày học Streak (icon `flame-streak`), Cấp độ Mascot (Cấp 1 Mèo con, Cấp 2...) kèm thanh tiến độ XP lên cấp kế tiếp.
    - *Khối hành động ưu tiên động (Dynamic Focus Action Card — `.index-progress-focus`)*: Tự động phân tích trạng thái học để đề xuất nội dung cần làm: Nếu có từ vựng đến hạn SRS (`stats.dueCount > 0`), hệ thống ưu tiên nhắc *"Ưu tiên ôn lại từ vựng — N từ đã đến hạn ôn tập"* dẫn thẳng đến `vocabulary.html`; nếu có kỹ năng chưa bắt đầu, đề xuất *"Bổ sung kỹ năng [kỹ năng]"*; mặc định duy trì *"Tiếp tục duy trì nhịp học"*.
    - *Danh mục tiến độ 5 kỹ năng cốt lõi (`.index-skill-list`)*: Thẻ tiến độ từng kỹ năng gồm Từ vựng (số từ đã thuộc / cần ôn), Luyện nghe (`listenDone`), Luyện nói (`speakDone`), Luyện viết (`writeDone`), Thi TRKI (`trkiDone` kèm kết quả % cao nhất `bestTest`), nhãn cảnh báo cần chú ý (`.needs-attention`) và nút hành động nhanh.

---

### [Module 1] Kho bài học theo các chủ đề gắn với cuộc sống với chuỗi hành động kèm Lọ Từ Vựng & Thuật Toán Spaced Repetition (SM-2) thay qua Flashcard
* **Giao diện chuẩn Figma (#tu-vung — https://rigor-hall-40167838.figma.site/#tu-vung)**:
  * **Khung chứa Russian Navy Gradient (`.vocabulary-section`)**: Nền gradient chuyển đổi sang trọng từ xanh hải quân Nga (#102a4c đến #08192d) kết hợp vầng sáng tỏa radial xanh dương, bo góc 24px.
  * **Hàng tiêu đề (`.vocabulary-heading`)**: Tiêu đề lớn (`page-title-box`) `CHINH PHỤC 5.000 TỪ TIẾNG NGA`, tiêu đề phụ span `theo Chủ Đề &amp; Chuỗi Hành Động.`, căn giữa trang chuẩn chỉnh.
  * **Bộ Tab Phân Cấp Chuẩn (`.level-tabs`)**: 6 tab A1 (Sơ cấp), A2 (Cơ bản), B1 (Trung cấp), B2 (Trung cấp cao), C1 (Cao cấp) và C2 (Thành thạo) với vạch đỏ chỉ báo active, cỡ chữ lớn 24px kèm số lượng thẻ.
  * **Lưới thẻ chủ đề chuẩn Figma (`.topic-grid` & `.topic-card`)**:
    - Thẻ kính mờ bo góc 20px, hiệu ứng hover nhấc nổi -5px và viền sáng xanh.
    - Hàng trên (`.topic-card-top`): nhãn trạng thái `Hoàn thành` (xanh ngọc) hoặc `PRO` (đỏ) bên phải.
    - Khối nội dung chính (`.topic-card-main`): Bố cục ngang với Hộp biểu tượng (`.topic-icon`) bên trái; Tiêu đề thẻ (`h3.topic-title`) bên phải biểu tượng và Mô tả phụ (`p.topic-desc`) nằm dưới tiêu đề bên phải biểu tượng.
    - Chân thẻ (`.topic-footer`): gồm nút `[Lọ từ vựng]` (icon archive-jar) và nút tròn mũi tên [→] (icon arrow-right, hoặc icon lock nếu là nội dung PRO).
    - **Điều hướng & Tương tác**:
      * Bấm vào thẻ hoặc nút mũi tên [→]: Chuyển sang Trang Bài Học Chủ Đề (Topic Lesson Article View) với bối cảnh, hội thoại mẫu, điểm ngữ pháp, bảng từ vựng, tính năng Xuất sang PDF (window.print()) chuẩn chỉnh và mục mở Lọ từ vựng.(Kỹ thuật PDF Print: Bắt buộc cấu hình CSS @media print ẩn toàn bộ header, floating AI bubble, bottom bar và nút bấm, ép nền trang màu trắng chuẩn A4).
      * **Trình biên dịch & soạn thảo Markdown cho Bài học chủ đề (`TOPIC_ARTICLES`)**: Toàn bộ nội dung bài học chuyên sâu được viết dưới dạng GitHub Flavored Markdown (.md) với tiêu đề `#` đến `###`, bảng từ vựng responsive, trích dẫn, và khối ghi chú sư phạm (`> [!TIP]`, `> [!NOTE]`, `> [!WARNING]`). Hỗ trợ CMS Live Preview thời gian thực (`preview=1`) và đồng bộ hai chiều với cơ sở dữ liệu Supabase.
      * Bấm vào nút [Lọ từ vựng]: Vào thẳng danh sách các từ vựng trong lọ để xem và học 3D Flashcard Spaced Repetition. 
      
* **Mô hình "Lọ từ vựng" (Thematic Action Clusters)**:
  * Không học từ A-Z mà gom từ theo chuỗi hành động ngữ cảnh sống còn theo các chủ đề (**Lọ nghề nghiệp, Lọ quần áo, giày dép, lọ đồ dùng gia đình, Lọ đồ dùng học tập, Lọ phương tiện giao thông, lọ địa điểm nơi chốn, lọ đồ ăn đồ uống, lọ thể thao - âm nhạc, lọ con vật, lọ bộ phận cơ thể người,...**).
  * Các lọ hệ thống chuẩn A1 - C2 chứa từ vựng cốt lõi kèm trọng âm, từ loại, nghĩa tiếng nga, nếu là động từ thì có cụm động từ và tân ngữ trực tiếp của động từ, ví dụ câu thực tế bằng tiếng nga và tiếng việt, đồng nghĩa, trái nghĩa/gần nghĩa và ghi chú.
  * **Cấu trúc 2 nút thao tác riêng biệt trên thẻ chủ đề**:
    1. Nút `[Lọ từ vựng]`: Gọi icon `archive-jar`, mở ngay giao diện danh sách chi tiết các từ có trong lọ.
    2. Nút tròn `[→]`: Gọi icon `arrow-right`, Chuyển sang Trang Bài Học Chủ Đề.
  * **Bố cục Danh sách từ trong Lọ (`.dau-vocab-row-card`)**:
    - **Giao diện danh sách từ vựng tinh giản tối đa**: Đã loại bỏ hoàn toàn khối `.dau-vocab-preview-box` và thanh công cụ `.dau-vocab-toolbar`. Khi mở danh sách Lọ từ vựng, hệ thống hiển thị trực quan ngay danh sách các thẻ từ vựng hàng ngang (`.dau-vocab-row-card`).
    - **Hiển thị danh sách thẻ hàng ngang chuẩn (`.dau-vocab-row-card`)**: Bố cục 3 phần trực quan (Trái: Từ tiếng Nga in đậm kèm trọng âm & từ loại; Giữa: Nghĩa tiếng Việt & câu ví dụ song ngữ, cụm động từ, tân ngữ trực tiếp của động từ, đồng nghĩa, trái nghĩa/gần nghĩa, và ghi chú; Phải: Bộ nút hành động phát âm (icon `volume-high`), ✓ đánh dấu đã thuộc, tra cách chia (icon `book-open`), lưu lọ cá nhân (icon `archive-jar`)).
    - **Kích hoạt tức thì**: Khi bấm `[Lọ từ vựng]` trên lọ từ vựng, hệ thống tự động kích hoạt ngay tab danh sách (`initialMode = "list"`) và hiển thị dữ liệu ngay lập tức, không để xảy ra tình trạng trống trắng.
  * Hỗ trợ học viên PRO tự tạo lọ từ vựng cá nhân (`custom_jars`):
    - Nút "Thêm lọ từ vựng mới" (`.voc-user-jar-card-add` và `#btnSidebarCreateJarTop`, `#btnSidebarCreateJarBottom`) mở modal tạo lọ cá nhân `openCreateJarModal()`.
    - Biểu tượng mặc định luôn là `archive-jar` (SVG Lucide chuẩn thiết kế), không cho người dùng nhập hoặc chọn icon tùy tiện nhằm bảo đảm tính đồng bộ và thẩm mỹ cao cấp.
* **Thuật toán lặp lại ngắt quãng SM-2 / Hộp Leitner (`srs.js`)**:
  * Vòng đời thẻ: Unseen -> New -> Learning -> Reviewing -> Mastered.
  * Chu kỳ giãn cách: Từ mới (Again = 5 thẻ, Hard = 6h, Good = 1 ngày, Easy = 3 ngày); Từ đã ôn (Hard x 2, Good x 3, Easy x 4).
  * Đánh giá 4 mức SRS trực tiếp trên Flashcard: `Again (Ôn lại)`, `Hard (Khó)`, `Good (Nhớ tốt)`, `Easy (Dễ)` đồng bộ trực tiếp vào tiến độ học (`Progress`) và thuật toán SRS.
  * Tự động lọc danh sách "Đến hạn hôm nay" (`dueCards`).
* **Hệ sinh thái chế độ học chuẩn Quizlet (`pages.js`)**:
  1. *Danh sách từ (Word List Grid)*: Bố cục lưới ô thẻ chi tiết, tra cứu 6 cách, lưu lọ cá nhân.
  2. *Thẻ ghi nhớ 3D (Flashcard)*: Lật thẻ xoay chiều, audio phát âm, thanh đánh giá SRS 4 mức, phím tắt `Space` và mũi tên.
  3. *Học thông minh (Learn)*: Trắc nghiệm 4 đáp án với từ gây nhiễu nằm trong lọ từ vựng đó, phím tắt 1-4, lưu danh sách từ sai để ôn lại.
  4. *Ghép thẻ phản xạ (Match Game)*: Trò chơi nối từ Nga - Việt với đồng hồ mili-giây và lưu Kỷ lục cá nhân (Best Record).
* **Tra cứu Ngữ pháp Chuyên sâu (`dict-detail.js` & `dict-data.js`)**:
  * Modal tra từ đa tầng: Bảng 6 Cách danh từ/tính từ, chia thì động từ & cặp thể CB/NCB, kết cấu quản cách (Управление: ví dụ *перекусить чем?*), từ đồng/trái nghĩa, họ từ gốc.
* **Thanh Tiến Độ Học Hàng Ngang (`.user-progress-dark-strip` / `.voc-progress-horizontal-card`)**:
  * **Kích hoạt tự động**: Hiển thị trên `vocabulary.html`.
  * **Thiết kế kính mờ bo góc 20px, hiệu ứng hover nhấc nổi -5px và viền sáng xanh**:
    - kích thước bề rộng ngang bằng khung trang (`width: min(100% - 48px, 1200px)`), chiều cao tối ưu nhỏ gọn (~80px - 90px).
    - Giữ nguyên vẹn 100% câu chữ chuẩn gốc: Tiêu đề *Tiến Độ*.
    - 4 ô chỉ số thống kê từ vựng cốt lõi: Đã thuộc (`mastered`), Cần ôn tập (`dueCards`), Từ mới (`newCount`), Chuỗi ngày (icon `flame-streak`), kèm nút CTA `[Ôn tập ngay →]`.
    - Tương thích mượt mà 3 phiên bản thiết bị: Dàn hàng ngang trên Desktop; 2 hàng co giãn linh hoạt trên Tablet; xếp dọc gọn gàng trên Mobile với tap target chuẩn $\ge 44px$, không phát sinh cuộn ngang.

### [Module 2] Luyện Viết (Tả Tranh & Luyện Dịch Theo Chủ Đề)
* **Kiến trúc dữ liệu phân cấp 2 tầng (Hierarchical Topic-Exercise Model)**:
  - **Tầng 1 - Chủ đề (`writing_topics`)**: Phân nhóm bài học theo cấp độ (A1–B2) và 2 chế độ học: **Tả tranh (`picture`)** và **Luyện dịch (`translation`)**.
  - **Tầng 2 - Bài luyện tập con (`writing_tasks`)**: Mỗi chủ đề chứa nhiều bài luyện tập thực tế (`sort_order` 1, 2, 3...) được quản lý độc lập.
* **Quy chuẩn 2 Phân hệ chuyên sâu**:
  1. **Tả tranh (Письмо по картинке - `type = 'picture'`)**:
     - *1 Ảnh lưu từ Supabase Storage*: Ảnh chụp chất lượng cao lưu trữ tại bucket `writing-images` (ví dụ: bữa sáng gia đình, thư viện đại học, ký túc xá, Quảng trường Đỏ...).
     - *Đề bài (`prompt`)*: Hướng dẫn quan sát tranh và đặt câu hỏi mở bằng tiếng Nga.
     - *Bài mẫu chuẩn TRKI (`model_answer`)*: Bài văn miêu tả mẫu đạt điểm tối đa theo đúng cấp độ.
     - *Gợi ý (`tips`)*: Mảng JSON câu hỏi định hướng, cấu trúc gợi mở, bối cảnh và cảm xúc.
     - *Danh sách từ vựng từ từ điển*: Liên kết trực tiếp bảng từ điển `vocabularies` qua bảng `writing_task_vocab` (hiển thị trọng âm, nghĩa tiếng Việt, từ loại `pos`, phát âm audio và nút thêm trực tiếp vào Lọ từ vựng cá nhân).
     - *Prompt AI chấm điểm (`ai_prompt`)*: Rubric và hướng dẫn chi tiết cho AI Rusika thẩm định 4 tiêu chí TRKI.
  2. **Luyện dịch (Перевод по темам - `type = 'translation'`)**:
     - *Giao diện Luyện dịch tối giản phẳng (.writing-translation-card)*: Thiết kế thanh lịch, không lồng khối rườm rà; chữ tiếng Việt đề bài rõ ràng, tự nhiên.
     - *Đề bài (`prompt`)*: Câu hoặc đoạn văn tiếng Việt thực tế cần dịch sang tiếng Nga.
     - *Bài mẫu (`model_answer`)*: Bản dịch tiếng Nga chuẩn ngữ pháp, thể động từ (СВ/НСВ) và văn phong bản ngữ.
     - *Gợi ý (`tips`)*: Các điểm ngữ pháp mấu chốt, cấu trúc quản cách, giới từ và thành ngữ.
     - *Danh sách từ vựng từ từ điển*: Các từ vựng mấu chốt được liên kết từ `vocabularies`.
     - *Prompt AI chấm điểm (`ai_prompt`)*: Tiêu chí so khớp nghĩa, phát hiện lỗi chia cách và đánh giá độ tự nhiên.
* **Hỗ trợ người học & AI Chấm điểm**:
  - Khung soạn thảo tích hợp bàn phím ảo Cyrillic cho các ký tự đặc biệt (tự động chuyển chế độ native trên mobile).
  - Bộ đếm từ thời gian thực (Live Word Counter) cảnh báo trực quan khi chưa đạt số lượng từ tối thiểu.
  - **AI Chấm điểm theo 4 tiêu chí CEFR**:
    1. Ngữ pháp & Biến cách 6 Cách (Грамматика)
    2. Vốn từ & Cụm từ liên kết (Лексика)
    3. Bố cục mạch lạc (Структура)
    4. Hoàn thành nhiệm vụ đề bài (Содержание)
  - Bảng đối chiếu chi tiết: Hiển thị bảng trực quan: `[Câu gốc có lỗi] ➔ [Câu sửa chuẩn chỉnh] ➔ [Giải thích ngữ pháp chuyên sâu]`. Thưởng +20 XP khi hoàn thành bài nộp và lưu tiến độ vào `writing_submissions`.

### [Module 3] Luyện Nghe (YouTube Shadowing, Nghe Hiểu & Nghe Chép Chính Tả)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon `headphones` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu`), không hiển thị mô tả, phía dưới nút CTA `[Vào luyện nghe →]`.
* **Bố cục Shadowing Studio chuẩn (2 Cột Hiện Đại)**:
  * **Cột trái (Video & Luyện câu trọng tâm)**:
    - Khung video YouTube 16:9 bo góc mượt mà kèm lớp phủ phụ đề nổi (`.dau-shadow-sub-overlay`) hiển thị song ngữ câu đang chọn.
    - Thanh điều khiển tốc độ phát (0.75x, 1.0x, 1.25x) tương tác qua YouTube Iframe API và nút ẩn/hiện dịch nghĩa.
    - Thẻ luyện câu trung tâm (`.dau-sentence-card`): câu tiếng Nga in to có trọng âm, số lần tự lặp (1×, 2×, 3×), nút phát âm mẫu (icon `volume-high`), nút thu âm (icon `mic-speaking`), sóng âm (.waveform-box), nhận diện giọng nói ru-RU và vòng tròn chấm điểm `% chính xác`. Thưởng +10 XP khi đạt $\ge 70\%$.
    - Bài trắc nghiệm kiểm tra sau video: đo mức nghe hiểu tình huống, phản hồi đúng/sai tức thì, thưởng +20 XP khi đạt $\ge 60\%$.
    - Cột phải: danh sách cuộn dọc toàn bộ câu, tự động cuộn đến câu đang chọn (`scrollIntoView`).
    - Thanh điều khiển cố định đáy (Sticky Bottom Bar): tap target $\ge 44$px gồm Câu trước (icon `arrow-left`), Nghe lại (Space) (icon `volume-high`), Luyện nói (R) (icon `mic-speaking`), Câu tiếp theo (icon `arrow-right`).
* **Phân cấp 4 Part chuẩn TRKI**:
  * **Level 01 (Nghe mô tả tranh)**: Học viên quan sát một bức tranh, nghe các câu mô tả bằng tiếng Nga và lựa chọn câu phù hợp nhất với nội dung hình ảnh.
  * **Level 02 (Nghe hội thoại ngắn)**: Học viên nghe một câu hỏi hoặc lời nói bằng tiếng Nga, sau đó lựa chọn câu trả lời phù hợp nhất trong các phương án được đưa ra.
  * **Level 03 (Nghe hội thoại dài)**: Học viên nghe một đoạn hội thoại giữa hai hoặc nhiều người, sau đó trả lời các câu hỏi về nội dung, thông tin chi tiết, mục đích giao tiếp hoặc ý định của người nói.
  * **Level 04 (Nghe bài nói ngắn)**: Học viên nghe một bài nói của một người (thông báo ga tàu/sân bay, tin tức, lời giới thiệu, hướng dẫn hoặc bài trình bày ngắn), rồi trả lời các câu hỏi liên quan.
* **Trình phát chuyên dụng**: Tách audio từng câu, ẩn/hiện phụ đề song ngữ, tua chậm 0.75x - 1.25x, lặp lại câu.
* **Giao diện tinh gọn**: Nút CTA điều hướng rõ ràng ("Vào luyện nghe →"), loại bỏ biểu tượng rườm rà.
* **Nghe chép chính tả (Dictation):** Nghe từng câu ngắn với tốc độ tự nhiên, gõ lại chính xác từng từ bằng bàn phím tiếng Nga. So khớp chuỗi ký tự thời gian thực, bôi đỏ các lỗi chính tả, sai dấu trọng âm hoặc nhầm lẫn phụ âm biến âm. Hiển thị 30/50/70.
* **Xử lý kỹ thuật Audio**: Bắt buộc yêu cầu tương tác bấm nút Play từ người học trước khi phát âm thanh nhằm tuân thủ chính sách trình duyệt (chống chặn autoplay). Bổ sung thông báo fallback dùng Google Chrome / Safari cho nhận diện giọng nói.

### [Module 4] Luyện Nói (Speaking & YouTube Shadowing Studio)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**:
  - Nhỏ gọn, icon `mic-speaking` hoặc `youtube` bên trái phía trên (nền cam nhẹ `rgba(234,88,12,0.08)`, màu `#ea580c`).
  - Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu` hoặc `A2 | 25 câu`).
  - Huy hiệu trạng thái: `Hoàn thành` (xanh ngọc kèm icon `check`) khi học viên đã đạt điểm trung bình $\ge 70\%$, hoặc nhãn `PRO` (đỏ cam) cho bài học chuyên sâu.
  - Chân thẻ: Nút CTA `[Luyện nói ngay →]` (kèm icon `arrow-right`), hoặc biểu tượng khóa `lock-pro` nếu là bài học PRO và học viên chưa kích hoạt. Nhấp thẻ hoặc nút CTA đều mở Không gian Luyện nói Studio (`openSpeakingWorkspace`).
* **Kho nội dung 2 luồng phong phú (Dual Learning Streams)**:
  1. *YouTube Animated Cartoon Shadowing (24 bài học video hoạt hình Nga)*: Hệ thống bài học trích xuất từ các series hoạt hình Nga nổi tiếng ("Ася и Вася" - video `5KOKztPa1yI`, series "Цып-Цып" / Tsyp-Tsyp từ `211uvYZet70` đến `T9f5yH5EIN8`) phân cấp từ A1 đến B2. Mỗi bài học gồm 20–30 câu hội thoại với mốc thời gian bắt đầu (`startSec`) và kết thúc (`endSec`) chính xác đến từng giây, nguồn phụ đề tiếng Nga đã kiểm chứng.
  2. *Bộ câu hội thoại tình huống thực tế (Situational Real-World Dialogues)*: 6 bộ bài tập phản xạ giao tiếp đời sống (Sân bay & Trên chuyến bay, Trường học & Ký túc xá, Gọi món & Ẩm thực Nga, Đi lại & Hỏi đường ở Moskva, Thuyết trình & Ý kiến học thuật, Phỏng vấn & Xin việc).
* **Không gian Luyện Nói Studio Hiện Đại (`openSpeakingWorkspace` / `.sp-ws-grid`)**:
  - *Thanh điều hướng đỉnh cố định (Sticky Top Back Bar)*:
    * Nút quay lại (`#btnBackSpList` kèm icon `arrow-left`): Đóng workspace, dọn dẹp bộ lắng nghe sự kiện, hoàn trả URL qua `window.history.replaceState`, và cuộn mượt về danh sách thẻ.
    * Tiêu đề bài học và cụm nút thao tác nhanh (Quick Actions): Nút Ẩn/hiện bản dịch tiếng Việt (`T` - `#btnToggleTransTop`), Nút bật/tắt Tự động chuyển câu khi đạt điểm cao $\ge 70\%$ (`#btnToggleAutoAdv`), và Nút đóng/mở thanh Sidebar Drawer (`#btnToggleSidebar`).
  - *Khung video YouTube tỷ lệ 16:9 tương tác (`#spVideoCard` & `#spYoutubePlayer`)*:
    * Nhúng Iframe Player chuẩn API (`enablejsapi=1&rel=0&modestbranding=1&playsinline=1`).
    * Giao thức điều khiển 2 chiều qua `postMessage` (`listening`, `setPlaybackRate`, `seekTo`, `playVideo`, `pauseVideo`).
    * Cơ chế phát phân đoạn có bù đệm thời gian: `durationSec = ((end - start) / speed) + 0.4s` nhằm triệt tiêu hoàn toàn hiện tượng chém cụt đuôi âm thanh khi video tải trễ hoặc buffering.
  - *Thẻ luyện câu tích hợp trung tâm (`.sp-hero-card`)*:
    * **Bảng điều khiển 1 dòng tối giản (`.sp-controls-dock`)**:
      + Nút Câu trước (`#btnPrevSent` - icon `chevron-left` / Phím tắt `←`).
      + Nút Chỉnh tốc độ (`#btnSpeedToggle`): Chuyển đổi linh hoạt 3 nấc 0.8x, 1.0x, 1.2x và gửi lệnh trực tiếp vào video player / TTS.
      + Nút Nghe mẫu phát âm chuẩn (`#btnPlayModel` - icon `volume-high` / Phím tắt `Space`): Tự động phát đúng đoạn video của câu đó, hoặc gọi Web Speech Synthesis phát âm giọng mẫu tiếng Nga (`ru-RU`) nếu là bài thoại không có video.
      + Nút Micro Hero Button (`#btnRecordMic` - icon `mic-speaking` / Phím tắt `R`): Hiệu ứng vòng tròn nổi bật, đổi màu đỏ rực khi đang thu âm kèm thanh sóng trạng thái.
      + Nút Tự động lặp lại (`#btnLoopToggle` - icon `rotate-ccw` / Phím tắt `L`): Tắt ➔ Lặp 3 lần (`3x`) ➔ Lặp 5 lần (`5x`).
      + Nút Câu sau (`#btnNextSent` - icon `chevron-right` / Phím tắt `→`).
    * **Sân khấu hiển thị câu thông minh (`.sp-sentence-stage`)**:
      + Câu tiếng Nga tương tác (`#spTargetRu`): Chữ to rõ, có trọng âm. Học viên có thể **nhấp trực tiếp vào câu** để nghe mẫu và video tự động nhảy đúng mốc thời gian. Sau khi thu âm, các từ trong câu được đổi màu trực quan theo kết quả nhận diện.
      + Bản dịch tiếng Việt (`#spTargetVi`): Hiển thị gọn gàng, hỗ trợ ẩn/hiện tức thì qua phím `T` hoặc nút icon trên thanh header.
  - *Thanh kết quả thu âm tối giản & hiện đại (`.sp-speech-result-bar`)*:
    * Chấm trạng thái nhịp thở (`#spResultDot`): Xanh lá (Đang nghe), Xanh ngọc (Xuất sắc $\ge 85\%$), Cam (Khá $70-84\%$), Đỏ (Cần luyện thêm $<70\%$).
    * Dòng nhận diện giọng nói học viên thời gian thực (`#spUserTranscriptText`).
    * Huy hiệu điểm số (`#spResultScoreWrap`): Hiển thị điểm số phần trăm (`#spResultScoreVal`) và nhãn đánh giá tương ứng (*Xuất sắc*, *Rất tốt*, *Đạt yêu cầu*, *Cần luyện thêm*).
    * Nút "Nói lại" (`#btnFeedbackRetry` - icon `rotate-ccw` / Phím `R`).
  - *Cột phải Playlist & Tiến độ học tập (`.sp-ws-sidebar`)*:
    * Thống kê trực tiếp: Số câu hoàn thành (`0/N`), Điểm trung bình %, và Điểm kinh nghiệm (`+10 XP`).
    * Thanh tiến độ cuộn mượt (`#spProgressFill`).
    * Danh sách toàn bộ các câu trong bài: Đánh số thứ tự 2 chữ số (`01`, `02`...), đánh dấu tích xanh khi câu đạt $\ge 70\%$, hiển thị điểm số từng câu, tự động cuộn đến câu đang kích hoạt (`scrollIntoView`).
    * Tương thích Mobile Drawer: Trên màn hình $\le 1024px$, Sidebar tự động biến thành ngăn kéo trượt (Drawer) với lớp nền mờ (`.sp-sidebar-scrim`), đóng/mở qua nút `#btnToggleSidebar`.
* **Thuật toán Đo Độ Lệch Từ (Word Error Rate - WER) & Bóc Tách Lỗi Âm Vị**:
  - Tích hợp Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`) với ngôn ngữ mục tiêu `ru-RU`, kích hoạt nhận diện tạm thời (`interimResults: true`) và dự phòng tối đa 3 phương án nhận dạng âm học (`maxAlternatives: 3`).
  - Tự động ngắt thu âm an toàn: Bộ đếm thời gian im lặng 8 giây (`silenceTimer`) tự động dừng thu âm nếu học viên chưa phát âm; bộ đệm 2.5 giây (`stopTimer`) tự động xử lý kết quả khi dứt câu.
  - **Chuẩn hóa chuỗi âm học tiếng Nga**: Loại bỏ dấu trọng âm kết hợp Unicode (`\u0301`), chuẩn hóa chữ cái `ё` thành `е`, loại bỏ toàn bộ dấu câu ngữ pháp (`.,!?;:«»"'-()`) trước khi so khớp.
  - **Thuật toán Ma trận Quy hoạch động Levenshtein (Token-level WER)**:
    * Tính toán ma trận khoảng cách hiệu chỉnh giữa mảng từ chuẩn $R = \{r_1, \dots, r_n\}$ và mảng từ học viên nói $H = \{h_1, \dots, h_m\}$.
    * Độ chính xác phát âm:
      $$\text{Accuracy} = \max\left(0, \min\left(100, \operatorname{round}\left(\left(1 - \frac{\text{Tổng lỗi hiệu chỉnh}}{n}\right) \times 100\right)\right)\right)$$
    * Thuật toán truy vết ngược (Backtracking) xếp loại từng từ vào 4 trạng thái:
      1. `correct`: Phát âm chuẩn xác $\rightarrow$ Tô màu xanh ngọc (`.sp-word-correct`).
      2. `wrong`: Phát âm sai lệch hoặc lẫn lộn $\rightarrow$ Tô màu đỏ gạch (`.sp-word-wrong`), đính kèm tooltip hiển thị từ nhận diện được: `Nhận diện: «...»`.
      3. `missing`: Bị nuốt âm hoặc bỏ quên từ $\rightarrow$ Gạch chân nét đứt mờ kèm tooltip: `Chưa nhận diện được từ này`.
      4. `extra`: Từ nói thừa ngoài câu mục tiêu.
* **Hạn Mức Thực Hành, Bản Quyền PRO & Gamification**:
  - Hạn mức thực hành miễn phí: Cung cấp **30 lượt luyện nói mỗi ngày** cho tài khoản tiêu chuẩn (lưu tại `STORE` qua khóa `speak_today_[Date]`), bảo đảm học viên miễn phí hoàn thành trọn vẹn 1 bài học 25–30 câu mỗi ngày.
  - Khóa bản quyền PRO: Các bài học độ khó B1, B2 hoặc đánh dấu `is_pro_only: true` được bảo vệ bằng Pro Gate Modal.
  - Gamification & Thưởng XP: Lưu trữ điểm số cao nhất từng câu vào `STORE`. Khi người học hoàn thành tất cả các câu trong bài với điểm trung bình toàn bài $\ge 70\%$, hệ thống tự động ghi nhận hoàn thành bài (`speakDone`), thưởng ngay **+10 XP** vào tổng điểm học viên và kích hoạt thông báo Toast chúc mừng.
* **Tích Hợp Quản Trị Payload CMS Studio (`admin.html` / `admin.js`)**:
  - Phân hệ `SPEAKING_SETS`: Cho phép Academic Admin tạo mới, chỉnh sửa thông tin bài học, cấp độ CEFR, liên kết YouTube ID, mục tiêu âm vị.
  - **Trình dựng câu Speaking Builder & Modal Nhập Phụ Đề Nhanh (`importSpeakingTranscriptModal`)**: Cho phép dán nhanh toàn bộ danh sách câu từ tệp phụ đề SRT, VTT hoặc mảng JSON thô, tự động bóc tách mốc thời gian bắt đầu/kết thúc và câu dịch.
  - **Đồng bộ Đám mây Supabase (`speaking_lessons`)**: Hỗ trợ Push/Pull dữ liệu 2 chiều với bảng cơ sở dữ liệu `speaking_lessons`, giải quyết xung đột dựa trên trường mã duy nhất `code`.

### [Module 5] Luyện Thi TRKI (ТРКИ Exam Simulation & Dual-Track CBT)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon `award-badge` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 34 câu`), không hiển thị mô tả, phía dưới 2 nút CTA: `[Chọn phần luyện ▾]` và `[Vào thi Full →]`.
* **Cấp độ chuẩn**: ТЭУ (A1), ТБУ (A2), ТРКИ-1 (B1), ТРКИ-2 (B2), ТРКИ-3 (C1), ТРКИ-4 (C2).
* **Mô hình Luyện thi 2 Luồng (Dual-Track Assessment)**:
  1. *Luyện theo Phân môn (Субтесты)*: Hỗ trợ modal popup chọn riêng từng phân môn (1. Leksika & Grammatika, 2. Chtenie, 3. Audirovanie) hoặc liên kết sang Viết (`writing.html`) và Nói (`speaking.html`).
  2. *Thi mô phỏng Tổng hợp (Full Simulation)*: Đề thi tích hợp các phân môn trắc nghiệm trên cùng một phiên làm bài.
* **Phòng thi trực tuyến chia đôi màn hình (Split-Pane CBT Workspace)**:
  - *Субтест 2: Đọc hiểu (Чтение)*: Chia đôi màn hình độc lập (Cột trái neo đoạn văn bản đọc hiểu tiếng Nga kèm công cụ A-/A+ chỉnh cỡ chữ và nút toggle bản dịch; Cột phải cuộn câu hỏi và lựa chọn đáp án).
  - *Субтест 3: Nghe hiểu (Аудирование)*: Cột trái neo trình phát audio ru-RU; Cột phải hiển thị câu hỏi và đáp án.
  - *Nút Đặt cờ xem lại (⚑ Flag Question)*: Tích hợp trên từng câu hỏi, lưu trạng thái vào `sessionStorage`.
  - *Bảng câu hỏi (Question Palette)*: Hiển thị 3 trạng thái trực quan: Đã làm (xanh), Đặt cờ (vàng/cam), Chưa làm (trắng).
* **Phòng thi mô phỏng an toàn**: Đồng hồ Timestamp chống reload (lưu `endTime` vào `sessionStorage`). Tự động thu bài khi hết giờ. Giám sát gian lận chuyển tab (`visibilitychange`, cảnh báo vi phạm tối đa 3 lần).
* **Báo cáo kết quả chuẩn chứng chỉ Nga (Official TORFL Report)**: 
  - Đánh giá phân môn theo mốc chuẩn quốc gia Liên bang Nga: Từng phân môn phải đạt $\ge 66\%$ mới công nhận ĐẠT (**СДАНО**).
  - Quy chế thi lại 1 kỹ năng (Правило одной пересдачи): Nếu đạt chuẩn các phân môn và có đúng 1 phân môn từ $60\% - 65\%$, hệ thống tự động cấp trạng thái Bảo lưu và thông báo đủ điều kiện thi lại riêng môn đó.
  - Thẻ chứng chỉ điện tử thiết kế Baltic Navy trang trọng kèm bảng phân tích ngữ pháp, từ vựng chi tiết từng câu. Thưởng +30 XP cho mỗi bài thi thử hoàn thành.

### [Module 6] BLOG (Cẩm nang du học, KTX, Đời sống Nga)
* **Kênh SEO tự nhiên**: Hệ thống bài viết chuyên sâu: Trải nghiệm ký túc xá, review các trường đại học hàng đầu (MGU, HSE, RUDN, KFU...), hướng dẫn thủ tục thị thực visa, đăng ký tạm trú MVD, mở thẻ ngân hàng Mir/Sberbank, cẩm nang săn học bổng Hiệp định.
* **Mô hình SEO Topic Cluster**: Bài viết Pillar Page liên kết chặt chẽ với các bài viết cụm (Sub-topics). Tích hợp các khối Call-To-Action (CTA) nội bộ thông minh: Dẫn luồng người đọc đang tìm hiểu tài liệu thi sang làm bài thi thử tại [Module 5] hoặc đăng ký tài khoản trải nghiệm.

### [Module 7] SHOP (Sản phẩm, dịch vụ, tools Nga Việt)

* **Sản phẩm nội địa Nga chính hãng**: Bánh kẹo truyền thống Alenka, mỹ phẩm Siberia hữu cơ, đồ lưu niệm búp bê Matryoshka.

* **Dịch vụ hỗ trợ du học chuyên nghiệp**: Hỗ trợ tư vấn hồ sơ xin học bổng, chọn ngành/chọn trường đại học tại Nga. Dịch vụ dịch thuật công chứng tư pháp hồ sơ học tập chuẩn quy định Lãnh sự.

* **Bộ công cụ (Tools) Nga - Việt tiện ích**: Công cụ chuyển đổi bàn phím Telex sang ký tự Cyrillic trực tuyến. Bảng tra cứu quy đổi tiền tệ Rúp (RUB) - Việt Nam Đồng (VND) cập nhật theo ngày. Tiện ích hỗ trợ điền mẫu tờ khai tạm trú và hồ sơ nhập học chuẩn tiếng Nga.

### [Tiện Ích & Dịch Vụ Nền Tảng] (Platform & Foundation Services)
* **Nâng cấp PRO (VietQR / Chuyển khoản)**: Hiển thị mã VietQR động chuẩn NAPAS/số tài khoản kèm sẵn số tiền và mã cú pháp kích hoạt tự động theo mã học viên (RUSI_USERID). Tự động kích hoạt quyền lợi PRO ngay khi webhook Casso ghi nhận biến động số dư thành công mà không bắt người học phải tải lại trang. Đặc quyền: Mở khóa trọn bộ tất cả Lọ từ vựng nâng cao, AI chấm bài viết không giới hạn, full kho đề thi thử TRKI và video phân tích.

* **Tiện ích Pomodoro Mini (Header Top-Right)**: Thu gọn tinh tế trong cụm `.header-actions` với icon `timer-clock` (hoặc nhãn 🍅 25m trên tablet/desktop). Popover mở thả xuống từ mép dưới header (z-index: 1010), đóng chéo tự động với Menu tài khoản và Mobile Drawer.

* **Trợ lý Học tập AI Nổi (.companion-bubble - Bottom-Right)**: Nút tròn nổi thông minh cố định tại góc dưới cùng bên phải màn hình (bottom: 24px; right: 20px; z-index: 990). Tự động dâng độ cao lên bottom: 84px trên màn hình mobile có thanh Bottom Bar để không che khuất thao tác. Hỗ trợ giải đáp ngữ pháp tiếng Nga, giải nghĩa từ vựng theo ngữ cảnh bài học tức thì.

* **Từ điển Tra cứu 6 Cách Đa Tầng**: Tích hợp modal tra cứu nhanh 6 Cách, chia thì động từ và cấu trúc quản cách từ bất kỳ từ vựng nào trên website thông qua thao tác bôi đen hoặc click đúp.

---

## 2. NÂNG CẤP HỘI VIÊN & CỔNG THANH TOÁN VIETQR 2.0

### 2.1. Danh Mục Các Gói Cước Hội Viên (Subscription Tiers):
1. **Gói 6 Tháng (`pro_6m`)**:
   * *Phạm vi đặc quyền*: Mở khóa toàn bộ ngân hàng đề thi ТРКИ cấp độ A1 – A2; mở khóa kho luyện nghe 4 Part; không giới hạn số lượng Lọ từ vựng cá nhân (`custom_jars`).
   * *Phù hợp*: Học viên mới bắt đầu hoặc người ôn thi gấp lấy chứng chỉ Sơ cấp / Cơ bản.
2. **Gói 1 Năm (`pro_1y`) — [Nhãn: Phổ Biến Nhất]**:
   * *Phạm vi đặc quyền*: Mở khóa toàn bộ kho tài liệu và đề thi từ A1 đến B2; mở khóa tính năng AI chấm bài tự luận Luyện Viết theo 4 tiêu chí CEFR; AI chấm điểm Shadowing Luyện Nói và phân tích chi tiết âm vị.
   * *Biểu tượng nhãn*: Huy hiệu nổi bật đi kèm icon `sparkles-clean` (`RusiIcons.get('sparkles-clean', { size: 14 })`), không dùng raw emoji `🔥`.
3. **Gói Trọn Đời (`pro_vip`) — [Nhãn: VIP Quyền Năng]**:
   * *Phạm vi đặc quyền*: Toàn quyền truy cập vĩnh viễn mọi tính năng học tập hiện tại và tương lai (A1 – C2); tặng kèm phần quà lưu niệm chuyển phát từ Nga; tặng voucher ưu đãi dịch vụ tư vấn hồ sơ du học và dịch thuật công chứng tư pháp.
   * *Biểu tượng nhãn*: Huy hiệu hoàng gia đi kèm icon `crown-vip` (`RusiIcons.get('crown-vip', { size: 14 })`), không dùng raw emoji `💎`.

---

### 2.2. Cơ Chế Phân Quyền & Luồng Nâng Cấp (Auth-Aware Upgrade Flow):
Hệ thống nhận diện trạng thái xác thực của người dùng để điều chỉnh giao diện tức thì:

* **Khách chưa đăng nhập (Anonymous / Guest)**:
  * *Header ngoài*: Chỉ hiển thị nút `[Đăng nhập]`, ẩn nút `[Đăng ký]` trên mobile `<= 768px` để chống tràn viền.
  * *Trang chủ*: Tạm ẩn bảng giá chi tiết để tránh làm nhiễu thông tin tiếp cận ban đầu của học viên mới.
  * *Khi bấm vào nội dung có khóa PRO*: Hệ thống mở **Auth Modal** yêu cầu xác thực tài khoản (hỗ trợ Google OAuth 1-chạm hoặc đăng nhập nhanh) trước khi chuyển tiếp sang luồng thanh toán.
* **Học viên Miễn phí (Free Tier)**:
  * *Header ngoài*:
    * Desktop / Tablet: Hiển thị pill nút nâng cấp nổi bật `[PRO]` kèm icon SVG `zap-xp` (`RusiIcons.get('zap-xp', { size: 14 })`) trỏ thẳng về `upgrade.html`.
    * Mobile (`<= 768px`): Thu gọn thành pill compact (visual 34px, hitbox 44px) theo đúng quy chuẩn Mục 3.3.
  * *Dropdown tài khoản*: Hiển thị banner CTA nhỏ thúc đẩy nâng cấp kèm thống kê tiến độ học hiện tại.
* **Học viên PRO (Active Subscriber)**:
  * *Header ngoài*:
    * Desktop / Tablet (> 768px): Thay thế nút nâng cấp bằng huy hiệu `PRO MEMBER` trang nhã kèm icon SVG `crown-vip` (`RusiIcons.get('crown-vip', { size: 14 })`), ẩn vĩnh viễn các lời mời mua gói trên thanh điều hướng.
    * Mobile (<= 768px): Tự động ẩn huy hiệu PRO ngoài thanh header để tránh chật chội và tối ưu hóa không gian cho Avatar; toàn bộ huy hiệu `PRO MEMBER` được gom trọn vẹn vào bên trong Dropdown tài khoản.
  * *Dropdown tài khoản*: Hiển thị huy hiệu `PRO MEMBER` nổi bật cùng thông tin gói cước và thời hạn bản quyền cụ thể (ví dụ: `Hạn dùng: 28/10/2027` hoặc `Quyền vĩnh viễn`).
* **Cửa sổ Khóa Nội Dung PRO (PRO Gate Modal)**:
  Khi học viên chưa sở hữu gói PRO tương ứng bấm vào bất kỳ tính năng trả phí nào (Lọ từ vựng nâng cao, Bài nghe video thực tế, Chủ đề luyện nói nâng cao, Đề viết tự luận, Phòng thi TRKI B1–B2), hệ thống lập tức chặn truy cập và kích hoạt modal chuẩn:
  * *Tiêu đề*: Khối heading trang trọng "Nội dung dành riêng cho Hội viên PRO" kèm icon `crown-vip` SVG 24px.
  * *Nội dung*: Nêu rõ quyền lợi đạt được:
    > "Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng B1–B2, đề thi thử ТРКИ chuẩn quốc tế, bài luyện nghe video thực tế, AI chấm bài tự luận và nhận diện phát âm không giới hạn."
  * *Hệ thống 2 nút hành động (Mutual CTA)*:
    1. Nút chính: `[ Tìm hiểu gói PRO → ]` — chứa icon `arrow-right`, điều hướng mượt mà đến trang `upgrade.html`.
    2. Nút phụ: `[ Để sau ]` — đóng modal và giữ nguyên vị trí cuộn trang hiện tại.

---

### 2.3. Cổng Thanh Toán VietQR 2.0 Tự Động & Kích Hoạt Tức Thì:
* **Quy chuẩn Tạo Đơn & Mã Định Danh Đơn Hàng**:
  * Mã giao dịch được sinh duy nhất theo cấu trúc: `RUSI_[MãĐơn]_[UserTag]` (ví dụ: `RUSI_9824_Q9F2`).
  * Mã nội dung chuyển khoản được mã hóa gọn gàng, tương thích tuyệt đối với cú pháp quét quang học của hệ sinh thái Napas247 và các ứng dụng ngân hàng di động tại Việt Nam.
* **Đồng Hồ Đếm Ngược Phiên Giao Dịch (15:00 Session Timer)**:
  * Server tạo `orders.expires_at` theo thời hạn 15 phút; client hiển thị thời gian còn lại từ mốc này. Reload hoặc sửa đồng hồ thiết bị không được gia hạn đơn.
  * Khi hết thời gian 15:00, mã QR tự động làm mờ và hiển thị nút `[Tạo mã thanh toán mới]` nhằm ngăn chặn việc chuyển khoản vào các phiên đã hủy.
* **Tiện Ích Sao Chép 1-Chạm (One-Tap Copy)**:
  * Trang bị nút sao chép độc lập cho từng trường thông tin: *Số tài khoản*, *Số tiền*, và *Nội dung chuyển khoản*.
  * Tích hợp tooltip/toast thông báo tức thì: icon `check-circle-correct` + văn bản `"Đã chép vào bộ nhớ tạm"`, tự động ẩn sau 2 giây. Vùng chạm nút sao chép đảm bảo $\ge 44 \times 44$px.
* **Cơ Chế Xác Thực & Kích Hoạt Realtime Không Cần Tải Lại Trang**:
  * Khi giao diện thanh toán hiển thị, tiến trình nền tự động polling kiểm tra trạng thái giao dịch qua Webhook / API dịch vụ đối soát ngân hàng (Casso):
    ```javascript
    // Đọc trạng thái đơn của chính chủ; backoff/jitter, dừng khi đơn kết thúc
    const pollPaymentStatus = async (orderId) => { ... };
    ```
  * Ngay khi tài khoản nhận được biến động số dư khớp đúng số tiền và cú pháp:
    1. Modal thanh toán hiển thị màn hình chúc mừng (Success State) với hiệu ứng pháo hoa nhẹ và âm báo nhẹ nhàng.
    2. Trạng thái bản quyền của học viên được cập nhật lập tức trên toàn bộ runtime ứng dụng (`window.AppState.isPro = true`), tự động gỡ bỏ toàn bộ khóa nội dung mà không cần người dùng phải bấm tải lại trang (F5).
* **Bảo Mật Phân Quyền & Lưu Trữ Per-User State**:
  * Nguồn quyền hội viên là `profiles.is_pro` và `orders` đã xác nhận phía server qua RPC. `trki_pro_${user.uid}` chỉ là cache hiển thị, không là bằng chứng quyền truy cập; không tin cờ PRO do trình duyệt tự sửa.
  * Tuyệt đối không cho phép dùng chung tài khoản để gian lận bản quyền; mọi thao tác mở khóa nội dung nhạy cảm (như lời giải đề TRKI, gọi API chấm điểm AI) đều phải được thẩm định chữ ký Token hợp lệ từ phía backend trước khi trả kết quả.

---

## 3. QUY CHUẨN RESPONSIVE MOBILE, TABLET & QUY TẮC "MORE..." OVERFLOW

> **Quy định bắt buộc:** Được quy định trong `AGENTS.md`, `GEMINI.md` và Skill `.agents/skills/responsive-design/SKILL.md`. Áp dụng kiểm tra sau **mọi** thay đổi UI.

---

### 3.1. Phân Cấp Thiết Bị & Tiêu Chuẩn Kỹ Thuật:
* **Mobile (< 768px & ≤ 480px)**:
  * **Bố cục 1 cột bắt buộc**: Toàn bộ hệ thống lưới đa cột (CSS Grid) chuyển đổi hoàn toàn sang 1 cột duy nhất (`grid-template-columns: 1fr;`).
  * **Khóa cuộn ngang ngoài ý muốn**: Toàn bộ trang và các container thành phần kích hoạt `overflow-x: hidden;` để triệt tiêu hiện tượng xê dịch khung nhìn khi vuốt chạm.
  * **Khoảng đệm an toàn (Container Padding)**: Dao động từ `12px` đến `16px` kết hợp `env(safe-area-inset-left)` và `env(safe-area-inset-right)`.
  * **Chuẩn vùng chạm cảm ứng (Tap Target)**: Vùng chạm thực tế tối thiểu $44 \times 44$px trên mọi nút bấm, liên kết và icon hành động (`touch-action: manipulation;`).
  * **Chống phóng to màn hình iOS Safari**: Mọi thẻ `<input>`, `<select>`, `<textarea>` bắt buộc có `font-size: 16px;` trở lên (hoặc tương đương `1rem`) để ngăn trình duyệt tự động zoom layout khi học viên nhập liệu.
* **Tablet (768px - 1024px)**:
  * Lưới 3–4 cột chuyển đổi thành 2 cột cân xứng.
  * Các thanh điều hướng phụ hoặc sidebar bài học thu gọn thành dạng ngăn kéo (drawer) hoặc hệ thống tab ngang.

---

### 3.2. Quy Tắc "More..." (Tuyệt Đối Không Để Hiển Thị Dở Dang / Chém Cụt Chữ):
1. **Thanh Tab & Bộ Lọc Danh Mục**:
   * Áp dụng khi có $\ge 4$ tabs trên Mobile hoặc $\ge 5$ tabs trên Tablet: Tuyệt đối không để tab cuối cùng bị chém nửa chữ hoặc cắt cụt lưng chừng.
   * **Giải pháp ưu tiên**: Gom các tab vượt giới hạn vào dropdown menu "Khác" (kèm icon `chevron-down`).
   * **Giải pháp cuộn ngang (Faded Track)**: Nếu chọn cơ chế cuộn ngang (`overflow-x: auto; scrollbar-width: none;`), bắt buộc áp dụng lớp mặt nạ làm mờ mép phải (`mask-image: linear-gradient(to right, black 85%, transparent 100%);`) để người dùng nhận diện trực quan nội dung còn tiếp diễn.
2. **Hàng Nút Thao Tác (Action Toolbars)**:
   * Giữ tối đa 1 nút Chính (Primary) và 1 nút Phụ (Secondary) hiển thị trực tiếp.
   * Toàn bộ các thao tác thứ cấp (Chia sẻ, Báo lỗi, In PDF, Xuất file...) được gom vào nút Kebab Menu `more-horizontal` (kích thước hitbox chạm chuẩn 44px).
3. **Thẻ Nhãn (Tags / Chips)**:
   * Hiển thị tối đa 3–4 thẻ nhãn đầu tiên; các nhãn còn lại được gom lại thành dạng pill thu gọn `+N mục khác` (kèm popover khi click).
4. **Đoạn Mô Tả & Văn Bản Dài**:
   * Sử dụng CSS `-webkit-line-clamp: 2` hoặc `3` kết hợp khối làm mờ chân chữ và nút bấm chuyển đổi trạng thái `Xem thêm` / `Thu gọn` (tích hợp icon `chevron-down` / `chevron-up`).
5. **Hệ Thống Tiện Ích CSS Chuẩn Trong `styles.css`**:
   * Tabs: `.rusi-tabs-container`, `.rusi-tab-more-dropdown`, `.rusi-tab-more-btn`, `.rusi-tab-more-menu`
   * Action Toolbars: `.rusi-action-toolbar`, `.rusi-kebab-wrapper`, `.rusi-kebab-btn`, `.rusi-kebab-menu`
   * Cắt bớt văn bản: `.rusi-truncate-box`, `.rusi-truncate-text`, `.rusi-btn-toggle-more`
   * Thẻ nhãn: `.rusi-chips-group`, `.rusi-chip-more`
   * Cuộn mờ mép: `.rusi-scroll-track-faded`

---

### 3.3. Quy Chuẩn Header Navigation Trên Điện Thoại & Máy Tính Bảng:
* **Chiều cao chuẩn cố định**: `60px` trên toàn bộ thiết bị di động (<= 960px, <= 768px, <= 480px), loại bỏ hoàn toàn hiện tượng giật giàn trang (Cumulative Layout Shift) khi co giãn khung nhìn.
* **Cụm thao tác góc phải (`.header-actions`)**:
  * *Khi chưa đăng nhập*: Chỉ hiển thị 1 nút chính `[Đăng nhập]`, ẩn nút `[Đăng ký]` ở header ngoài trên màn hình mobile (<= 768px) để tránh tràn viền (nút Đăng ký được tích hợp sẵn bên trong Mobile Drawer).
  * *Khi đã đăng nhập*:
    * **Pomodoro mini**:
      * Tablet (768px - 1024px): Hiển thị icon `timer` kèm nhãn thời gian đếm ngược (ví dụ: `25m`).
      * Mobile (<= 768px): Chỉ hiển thị icon `timer` (kích thước hiển thị 34px x 34px, mở rộng hitbox chạm vô hình đạt chuẩn 44px x 44px qua CSS pseudo-element `::after`); click vào để mở Popover điều khiển thời gian.
    * **Nút Nâng cấp PRO**: Thu gọn thành pill nhỏ gọn với icon SVG `zap` + chữ `PRO`. Trên màn hình siêu hẹp (<= 360px), tự động ẩn vào trong Drawer để ưu tiên không gian cho Avatar.
    * **Nút Tài khoản**: Chỉ hiển thị Avatar tròn 34px (hitbox 44px), ẩn tên học viên và icon caret để tiết kiệm không gian.
    * **Menu thả xuống tài khoản (`.user-dropdown`)**: Định vị cố định theo khung nhìn:
      `position: fixed; top: 62px; right: 12px; width: min(calc(100vw - 24px), 320px); max-height: calc(100dvh - 74px); overflow-y: auto; overscroll-behavior: contain;`
      chống triệt để lỗi tràn mép trái màn hình và hỗ trợ cuộn mượt mà khi xoay ngang máy.
    * **Cơ chế đóng chéo (Mutual Exclusion)**: Thao tác mở User Dropdown sẽ lập tức tự động đóng Popover Pomodoro và Mobile Drawer (và ngược lại), không để nhiều menu nổi cùng lúc.
* **Nút Menu Hamburger (`.menu-button`)**:
  * Vùng chạm chuẩn 44px x 44px (`touch-action: manipulation;`).
  * 2 vạch ngang xếp tầng cân đối, tự động xoay mượt thành hình dấu `X` khi mở và phục hồi trạng thái 2 vạch khi đóng qua CSS transition.
* **Ngăn kéo điều hướng di động (`.header-center.nav-open`) & Lớp phủ Backdrop (`.header-backdrop`)**:
  * Trượt nhẹ nhàng từ chân header (`top: 60px; max-height: calc(100dvh - 60px); overflow-y: auto; overscroll-behavior: contain;`).
  * Lớp phủ Backdrop mờ phía sau (`z-index: 1005`); chạm vào backdrop, bấm phím Escape hoặc chạm vào bất kỳ liên kết điều hướng nào sẽ tự động đóng ngăn kéo ngay lập tức.
  * Tự động khóa cuộn trang (`body.menu-locked { overflow: hidden; touch-action: none; }`) để ngăn cuộn kép và triệt tiêu dội trang (rubber-banding) trên iOS Safari.

---

## 4. QUẢN TRỊ ADMIN CMS & PROPAGATION ENGINE

### 4.1. Phân Quyền Quản Trị Hệ Thống (Role-Based Access Control - RBAC):
Hệ thống quản trị áp dụng mô hình phân quyền chặt chẽ theo vai trò người dùng:

* **Super Admin (Quản trị viên tối cao)**:
  * Toàn quyền cấu hình tham số hệ thống, biến môi trường, khóa kích hoạt và API endpoints.
  * Giám sát doanh thu, truy cập bảng kê biến động số dư VietQR / Casso.
  * Tra cứu nhật ký kiểm toán (Audit Logs), truy vết lịch sử chỉnh sửa dữ liệu của các cấp quản trị khác.
* **Academic Admin (Quản trị viên học thuật)**:
  * Quản lý ngân hàng đề thi ТРКИ (A1 đến C2), cấu hình thời gian thi và thang điểm đạt.
  * Quản trị 18 Lọ từ vựng hệ thống, bộ thẻ Spaced Repetition (SM-2) và danh mục bài đọc theo chủ đề.
  * Biên tập kho bài tập nghe hiểu YouTube, bài luyện nói Shadowing và danh sách từ gợi ý cho bài viết.
* **Teacher / Reviewer (Giảng viên & Chuyên gia chấm thi)**:
  * Tiếp nhận bài nộp tự luận Luyện Viết (Письмо) và xem lại kết quả AI chấm điểm.
  * Ghi chú nhận xét sư phạm chuyên sâu, bổ sung phân tích ngữ pháp và phát âm cho học viên.
* **Operations / Support (Vận hành & Hỗ trợ kỹ thuật)**:
  * Quản lý trạng thái xử lý đơn hàng Shop hàng Nga nội địa và hồ sơ dịch vụ du học.
  * Tra cứu mã đơn `RUSI_[ordNum]_[userTag]`, hỗ trợ kích hoạt bù gói PRO thủ công cho học viên khi hệ thống webhook ngân hàng gặp sự cố gián đoạn.

---

### 4.2. Kiến Trúc Payload CMS Studio & Hệ Thống Quản Trị Cốt Lõi (`admin.html` / `admin.js`):
Trung tâm quản trị nội dung được thiết kế theo chuẩn giao diện Payload CMS v3 hiện đại, tinh giản tối đa thao tác nhập liệu, phân nhóm trực quan và tương thích 100% với schema cơ sở dữ liệu Supabase:

* **Phân Nhóm Điều Hướng Khoa Học (Sidebar Navigation Hierarchy)**:
  1. **Nhóm Học tập & Đề thi (`group: "study"`)**:
     * `TRKI_BANK` (Đề thi TRKI chuẩn 5 phân môn): Quản lý ngân hàng đề thi A1–C2 theo chuẩn TRKI quốc tế; tích hợp **Trình dựng 5 Phân môn Tabbed Builder** gồm: Phần 1 Ngữ pháp & Từ vựng, Phần 2 Đọc hiểu (văn bản tiếng Nga/Việt + câu hỏi), Phần 3 Nghe hiểu (file audio bucket `trki-audio` + lời thoại + câu hỏi), Phần 4 Viết (đề bài tự luận + số từ + bài mẫu), Phần 5 Nói (tình huống giao tiếp + thời gian chuẩn bị/nói + gợi ý phản xạ), cùng tab **Bảng đáp án (Answers Key)** tự động trích xuất.
     * `LISTENING_TOPICS` (Chủ đề Luyện nghe): Quản lý 7 chủ đề đời sống cha (Sân bay, Cửa hàng, KTX, Quán ăn, Giảng đường, Tàu điện ngầm, Phỏng vấn xin việc).
     * `LISTENING_LESSONS` (Bài nghe & Chép chính tả): Liên kết động với `LISTENING_TOPICS` qua dropdown `topic_id`. Tích hợp **Listening & Dictation Builder** với trình nghe thử audio trực tiếp từ Supabase bucket `listening-audio`, mốc thời gian lời thoại `start_sec`–`end_sec` kèm nút điều chỉnh nhanh $\pm 0.5$ giây, từ vựng trọng tâm từng câu (`words`), và danh sách trắc nghiệm nghe hiểu.
     * `SPEAKING_SETS` (Luyện nói Shadowing): Bài luyện nói qua Video YouTube, tích hợp trình dựng câu theo mốc thời gian phát, đánh dấu trọng âm, câu dịch và **Modal Nhập Phụ Đề Nhanh (`importSpeakingTranscriptModal`)** hỗ trợ dán phụ đề SRT/VTT/JSON.
     * `WRITING_TOPICS` (Chủ đề Luyện viết): Danh mục chủ đề cha phân loại theo `type` (**Tả tranh `picture`** vs **Luyện dịch `translation`**) và cấp độ A1–B2.
     * `WRITING_TASKS` (Bài Luyện viết con): Liên kết động với `WRITING_TOPICS` qua dropdown `topic_id`. Tích hợp **Writing Task Builder** với ảnh trực quan từ Supabase bucket `writing-images`, từ vựng trọng tâm liên kết từ điển, câu hỏi định hướng (`tips`), bài viết mẫu tham khảo (`model_answer`), và **Nút Dán Mẫu Rubric AI TRKI 1-Chạm** (`window.insertStandardTrkiRubric()`) chuẩn 4 tiêu chí chấm điểm.
     * `WRITING_SUBMISSIONS` (Studio Chấm bài viết): Giao diện chuyên dụng cho Giáo viên chấm bài tự luận học viên, nhập điểm thang 100, đổi trạng thái và chèn nhanh nhận xét sư phạm bằng chip 1-chạm.
     * `TOPIC_ARTICLES` (Bài học chủ đề & Markdown): Tích hợp **Trình soạn thảo Markdown Notion 3.0** (`#`–`###`, callouts `> [!TIP]`, `> [!NOTE]`, bảng từ vựng 4 cột, live word/read-time counters).
     * `GRAMMAR_LESSONS` (Ngữ pháp): Hệ thống bài giảng ngữ pháp chia thì, 6 cách và cặp thể động từ.
     * `VOCAB_JARS` (Lọ từ vựng): Quản lý 18 lọ từ vựng cốt lõi, màu sắc nhận diện và cấp độ.
     * `VOCABULARIES` (Từ điển & Kho từ vựng): Kho 5.000+ từ vựng tiếng Nga toàn diện có trọng âm Unicode, từ loại, dạng biến cách và nghĩa song ngữ.
     * `VOCAB_LESSONS` (Hành động đời sống): Bài học ngữ cảnh chuỗi hành động.
  2. **Nhóm Thương mại & Tăng trưởng (`group: "commerce"`)**:
     * `PACKAGES` (Gói cước hội viên PRO): Cấu hình các gói `pro_6m`, `pro_1y`, `pro_vip` và quyền lợi.
     * `SHOP_PRODUCTS` (Sản phẩm & Khóa học Shop): Danh mục hàng Nga nội địa, dịch vụ tư vấn và thông số kỹ thuật.
     * `ORDERS` (Đơn hàng & Giao dịch): Giám sát mã đơn VietQR, trạng thái thanh toán và kích hoạt gói bản quyền.
     * `BLOG_POSTS` (Cẩm nang Blog & SEO): Quản trị bài viết Blog, biên tập Markdown và tối ưu SEO metadata.
  3. **Nhóm Hệ thống & Dữ liệu (`group: "system"`)**:
     * `JAR_ITEMS` (Từ vựng chi tiết trong lọ): Bảng liên kết nhiều-nhiều giữa Lọ từ vựng và Từ vựng, hỗ trợ dropdown chọn lọ động (`jar_id`).
     * `TRKI_SUBMISSIONS` (Lịch sử nộp bài TRKI): Nhật ký thi cử, điểm từng phân môn và trạng thái ĐẠT/KHÔNG ĐẠT.
     * `USERS` (Học viên & Quản trị): Quản lý tài khoản, phân quyền vai trò (Super Admin, Academic Admin, Teacher, Student).
     * `USER_PROGRESS` & `USER_VOCAB_PROGRESS`: Giám sát tiến độ học tập, XP và thuật toán Spaced Repetition SM-2.

* **Tính Năng Tinh Gọn & Trải Nghiệm Nhập Liệu Vượt Trội**:
  - **Dropdown Khóa Ngoại Tự Động (Dynamic Foreign Key Resolution)**: Khi chọn `topic_id` ở Luyện viết hay Luyện nghe, quản trị viên không cần copy mã UUID thủ công; hệ thống tự động đổ danh sách Topic cha có kèm nhãn cấp độ và thể loại trực quan (`[Tả tranh | A1] Sinh hoạt thường nhật`).
  - **Xem Trước Media Ngay Lập Tức (Live Media Previews)**: Tự động hiển thị ảnh thumbnail thu nhỏ đối với `image_url` (từ bucket `writing-images`) và trình nghe thử âm thanh mini đối với `audio_url`.
  - **Công Cụ Xem Trước Trực Quan (Live Preview Drawer)**: Quản trị viên xem trước giao diện bài học thực tế trên web trước khi lưu qua tham số `preview=1`.
  - **Bảng Đồng Bộ Đám Mây Supabase (Two-Way PostgreSQL Sync Engine)**: Hỗ trợ Push/Pull 2 chiều với kiểm tra khóa xung đột tự động (`conflict_target: id` hoặc `code`), xử lý độc lập từng bảng tránh hiện tượng ghi đè chéo.

* **Công Cụ Xem Trước Trực Quan (Live Preview Drawer)**:
  - Cho phép quản trị viên xem trước giao diện thực tế của bài học trước khi lưu hoặc xuất bản qua tham số `preview=1`:
    * Luyện nghe: `listening.html?lesson=[id]&preview=1`
    * Luyện nói: `speaking.html?set=[id]&preview=1`
    * Luyện viết: `writing.html?task=[id]&preview=1`
    * Bài học chủ đề: `vocabulary.html?article=[id]&preview=1`
    * Bài viết Blog: `blog-post.html?slug=[slug]&preview=1`
  - Ngăn kéo preview trượt êm ái trên cùng màn hình admin, hỗ trợ kiểm tra giao diện trên nhiều độ phân giải.

* **Bảng Đồng Bộ Đám Mây Supabase (Supabase Cloud Sync Panel)**:
  - Tích hợp giao diện Push (Đẩy dữ liệu từ Admin lên Cloud) và Pull (Kéo dữ liệu mới nhất từ Cloud về Local) cho toàn bộ các bảng nghiệp vụ (`speaking_lessons`, `vocab_jars`, `trki_bank`, `blog_posts`...).
  - Tự động đối chiếu khóa xung đột (`conflict_target: code` hoặc `id`), hiển thị tiến độ và nhật ký đồng bộ chi tiết.

* **REST API & Schema Explorer**:
  - Giao diện tra cứu nhanh cấu trúc dữ liệu JSON Schema chuẩn của từng Collection, hỗ trợ lập trình viên backend/agent tích hợp API nhanh chóng.

---

### 4.3. Cơ Chế Đồng Bộ Dữ Liệu Thời Gian Thực (Live Propagation Engine):

> Luồng localStorage dưới đây chỉ mô tả phản hồi trong cùng trình duyệt. Thay đổi CMS có thẩm quyền phải được xác thực và lưu trên backend/database theo Mục 7; sau commit mới cập nhật cache hoặc phát thông báo đến người dùng khác.

```text
[Admin sửa tại admin.html] ➔ [localStorage: trki_admin_data] ➔ [app.js: mergeAdminData()]
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        [window.* Datasets Mutated]              [Cross-Tab Reactivity]
         (target.splice in-place)               (storage event broadcast)
                    │                                     │
                    ▼                                     ▼
        [Trang học viên nhận ngay]               [Mọi tab đang mở cập nhật tức thì]
```
---

## 5. KIẾN TRÚC HYBRID SUPABASE & OFFLINE-FIRST

Hệ thống vận hành theo mô hình kiến trúc lai **Đám Mây Thời Gian Thực — Dự Phòng Ngoại Tuyến Toàn Diện (Cloud-First, Offline-Fallback)**:

```text
                               ┌────────────────────────────────┐
                               │   Supabase PostgreSQL Cloud   │
                               │      <PROJECT_DATABASE>        │
                               └───────────────▲────────────────┘
                                               │ (REST API / RLS / RPC)
                                               ▼
                               ┌────────────────────────────────┐
                               │       supabase-client.js       │
                               │   (window.RusiSupabase API)    │
                               └───────────────▲────────────────┘
                                               │
                                ┌──────────────┴──────────────┐
                    (Nếu Online)│                 (Nếu Offline│hoặc lỗi mạng)
                                ▼                             ▼
                    [Nạp trực tiếp từ Cloud]      [Fallback tức thì từ data.js]
                     Hiển thị dữ liệu mới nhất     Đọc localStorage (STORE)
```

* **Các Phân hệ Đồng bộ Supabase Cốt Lõi**:
  1. ocabularies, ocab_jars & jar_items: Quản lý kho từ vựng tiếng Nga toàn diện và 18 Lọ từ vựng hệ thống/cá nhân; tiến độ học SRS theo dõi tại user_vocab_progress theo Mục 7.
  2. 	rki_tests & private.exam_answer_keys: Danh mục đề thi ТРКИ từ A1 đến C2; cấu trúc câu hỏi, đáp án riêng tư và phiên nộp bài theo Mục 7.
  3. listening_lessons: Kho bài tập nghe hiểu 4 Part, câu hỏi trắc nghiệm và phụ đề video YouTube.
  4. speaking_lessons: Bộ bài tập Shadowing kèm chuỗi âm vị và mốc thời gian YouTube.
  5. writing_tasks: Đề bài miêu tả tranh, viết tóm tắt và viết theo chủ đề kèm tiêu chí chấm rubric.
  6. 	opic_articles: Hệ thống bài học ngữ cảnh theo chủ đề sống còn tại Nga (soạn thảo Markdown GFM).
  7. log_posts: Cẩm nang du học, bài viết đời sống ký túc xá và kinh nghiệm học tiếng Nga.
  8. shop_products: Danh mục sản phẩm Nga nội địa, dịch vụ tư vấn du học và tools tiện ích.
  9. packages & orders: Bảng giá cước hội viên PRO, cấu hình khuyến mãi và đơn hàng đối soát VietQR.

* **Chuẩn Hóa API Khởi Tạo Trang (Unified Page Bootstrappers)**: Toàn bộ các trang con học viên đều triển khai qua giao thức nạp dữ liệu thống nhất:`initVocabPage()`, `initWritingPage()`, `initListeningPage()`, `initSpeakingPage()`, `initMockTestPage()`, `initBlogPage()`, `initShopPage()`, `initUpgradePage()`. 
  * Quy trình thực thi: 
  - Bước 1: Gọi `window.RusiSupabase.fetchModuleData(moduleKey)`.
  - Bước 2 (Happy Path): Truy vấn thành công trong vòng 2.5s $\rightarrow$ Cập nhật runtime và kích hoạt giao diện từ Cloud.
  - Bước 3 (Fallback): Nếu lỗi kết nối, quá thời gian chờ (timeout) hoặc thiết bị mất mạng $\rightarrow$ Tự động chuyển vùng đọc sang `window.DATA` trong `data.js` kết hợp dữ liệu lưu trữ tại `localStorage.getItem('trki_admin_data')`.
  - Bước 4 (Auto Reconnect): Lắng nghe sự kiện `window.addEventListener('online')` để tự động kéo lại dữ liệu mới nhất mà không bắt người học phải tải lại trang.

---

## 6. BẢO MẬT HỆ THỐNG & NGUYÊN TẮC CLEAN CODE

### 6.1. Bảo Mật Khóa API & Vệ Sinh Mã Nguồn (Secret Hygiene):
* **Nguyên tắc bất khả xâm phạm về khóa**: Tuyệt đối cấm đưa `service_role_key` (khóa có quyền bypass RLS), Private Tokens, webhook secrets ngân hàng hoặc thông tin định danh máy chủ vào Git repository hoặc file JavaScript phía client. Web client chỉ được phép sử dụng duy nhất Supabase Anon / Public Key (`sb_publishable_`...).

* **Bảo vệ dữ liệu bằng GRANT, quyền cột và Row Level Security (RLS)**: Mọi bảng được expose qua Data API phải bật RLS và cấp quyền tối thiểu. Chỉ công khai nội dung free đã xuất bản; nội dung trả phí kiểm tra entitlement phía server. Quyền thao tác dữ liệu cá nhân kiểm tra chủ sở hữu và các cột được sửa; không cho client tự ghi role, PRO, XP, giá, trạng thái thanh toán hoặc điểm thi. Đáp án và dữ liệu quản trị nhạy cảm nằm trong schema riêng không expose. Ma trận quyền, cấu trúc bảng và hợp đồng RPC thực hiện theo Mục 7.

### 6.2. Chống Rò Rỉ Đáp Án Đề Thi & Chống Gian Lận (Zero-Answer Leak):
* **Bảo mật ngân hàng đề thi**: Đáp án/lời giải được tách khỏi dữ liệu đề vào `private.exam_answer_keys`, không cấp quyền đọc trực tiếp cho anon/authenticated. API lấy câu hỏi phải kiểm tra quyền, phiên làm bài và version đề; chỉ trả câu hỏi/phương án được giao với ID ổn định. Không chứa answer key trong raw payload, file fallback hoặc metadata. Lời giải chỉ được phát hành theo trạng thái và quyền xem kết quả của phiên.

* **Quy trình chấm thi an toàn qua RPC**: Client gửi `attempt_id` và câu trả lời; server xác minh chủ phiên, thời hạn, version và tập câu được giao, khóa attempt, chấm điểm thực tế từng phân môn rồi lưu kết quả và XP duy nhất trong cùng transaction. XP được ghi tại `xp_events` và tổng hợp tại `learner_stats`; retry cùng attempt trả kết quả đã chốt. Ngưỡng đạt và quy tắc thưởng phải được version hóa theo Mục 7; không dùng hàm mẫu gán cố định điểm.

### 6.3. Giám Sát Phiên Học & Chống Chia Sẻ Tài Khoản (Single Active Session):
* **Kiểm soát phiên đăng nhập duy nhất**: Đánh giá cấu hình phiên của Supabase Auth đang sử dụng; nếu cần bổ sung, quản lý session đang hoạt động phía server tại `private.active_sessions`. Các API/RPC hoặc policy được bảo vệ kiểm tra session ID từ JWT đã xác minh so với phiên còn hiệu lực; client không được tự ghi session có thẩm quyền. Realtime chỉ giúp giao diện nhận thông báo và đăng xuất nhanh, không thay thế kiểm tra server. Khi bị thay thế phiên, hiển thị: "Tài khoản của bạn vừa được đăng nhập trên một thiết bị khác. Vui lòng đăng nhập lại nếu đây không phải thao tác của bạn." Xóa token/cache riêng theo cơ chế Auth và chính sách ứng dụng.

---

## 7. KIẾN TRÚC CƠ SỞ DỮ LIỆU THỰC TẾ & BẢO MẬT (PRAGMATIC POSTGRESQL SCHEMA) — SUPABASE

> **Cập nhật kiến trúc: 10/11/2026 — Mô hình Pragmatic 18 Tables (Tối ưu từ bản 51 bảng FK4).**  
> **Nguyên tắc thiết kế chủ đạo (Karpathy Guidelines)**: *Simplicity First & Pragmatic Engineering*.  
> Loại bỏ triệt để tình trạng chuẩn hóa quan hệ quá mức (Over-engineering 3NF/4NF) khiến cơ sở dữ liệu phình to 51 bảng và gãy kết nối với Frontend. Thay vào đó, kiến trúc chuẩn hóa tập trung vào **18 bảng cốt lõi**, kết hợp sức mạnh trường `JSONB` của PostgreSQL để lưu trữ dữ liệu phụ thuộc (câu hỏi trắc nghiệm, phân đoạn audio, đáp án lựa chọn), vừa đảm bảo **tốc độ truy vấn dưới 30ms**, vừa khớp 1:1 với mã nguồn `supabase-client.js` và `admin.js`.  
> **Điểm mấu chốt bắt buộc**: Có **bảng từ vựng chuyên sâu `vocabularies` độc lập** với đầy đủ 16 thuộc tính ngôn ngữ tiếng Nga (trọng âm, từ loại, 6 cách, biến cách, cặp thể, quản cách, cụm từ và câu ví dụ) kết hợp cùng bảng Lọ từ vựng `vocab_jars` và bảng liên kết `jar_items`.

---

### 7.1. Bảng Ma Trận Phân Bổ 18 Bảng Cốt Lõi Theo Phân Hệ

| Phân hệ | Tên Bảng (`public` / `private`) | Mục đích & Nghiệp vụ cốt lõi | Kiểu Khóa chính | Khóa ngoại & Liên kết |
|---|---|---|:---:|---|
| **I. Người dùng & Tiến độ** | `public.profiles` | Thông tin học viên, vai trò (Role), trạng thái bản quyền PRO | `id` (UUID) | FK `auth.users(id)` ON DELETE CASCADE |
| | `public.user_progress` | Tổng XP, chuỗi ngày Streak, ngày học gần nhất, danh sách đã hoàn thành | `user_id` (UUID) | FK `profiles(id)` ON DELETE CASCADE |
| | `public.user_vocab_progress` | Tiến độ Spaced Repetition (SM-2) theo từng từ vựng cá nhân | `user_id, vocab_id` | FK `profiles(id)`, FK `vocabularies(id)` |
| **II. Từ vựng & Lọ từ vựng** | **`public.vocabularies`** | **Kho từ vựng tiếng Nga toàn diện (trọng âm, từ loại, 6 cách, ví dụ)** | `id` (UUID) | Độc lập (từ điển cốt lõi A1–C2) |
| | `public.vocab_jars` | Danh mục 18 Lọ từ vựng hệ thống & các Lọ cá nhân tự tạo | `id` (UUID) | `owner_id` FK `profiles(id)` (NULL nếu là lọ hệ thống) |
| | `public.jar_items` | Bảng liên kết nhiều-nhiều giữa Lọ từ vựng và Từ vựng | `jar_id, vocab_id` | FK `vocab_jars(id)`, FK `vocabularies(id)` |
| **III. Bài học & Kỹ năng** | `public.topic_articles` | Bài học chủ đề chuyên sâu, biên dịch Markdown GFM | `id` (TEXT) | Ánh xạ mã lọ `vocab_jars.code` |
| | `public.grammar_lessons` | Kho bài học ngữ pháp 6 cách, chia thì, quy tắc & ví dụ | `id` (TEXT) | Độc lập |
| | `public.listening_topics` | Chủ đề luyện nghe & chép chính tả (Sân bay, mua sắm, KTX, quán ăn, thư viện...) | `id` (UUID) | Độc lập |
| | `public.listening_lessons` | Bài luyện nghe hiểu & nghe chép chính tả thống nhất (audio Storage, trắc nghiệm, câu timed) | `id` (UUID) | FK `listening_topics(id)` ON DELETE CASCADE |
| | `public.listening_lesson_vocab` | Bảng liên kết từ vựng nên học từng câu với từ điển cốt lõi `vocabularies` | `id` (UUID) | FK `listening_lessons(id)`, FK `vocabularies(id)` |
| | `public.speaking_lessons` | Bài luyện nói Shadowing qua Video YouTube (tiêu đề, video ID/URL, danh sách câu theo timestamp start_sec–end_sec, bản dịch) | `id` (UUID) | Độc lập |
| | `public.writing_topics` | Chủ đề luyện viết (Tả tranh & Luyện dịch theo cấp độ A1–B2) | `id` (UUID) | Độc lập |
| | `public.writing_tasks` | Bài luyện tập con (ảnh Storage, đề bài, bài mẫu, gợi ý, prompt AI) | `id` (UUID) | FK `writing_topics(id)` ON DELETE CASCADE |
| | `public.writing_task_vocab` | Bảng liên kết đề bài viết với kho từ điển cốt lõi `vocabularies` | `task_id, vocab_id` | FK `writing_tasks(id)`, FK `vocabularies(id)` |
| | `public.writing_submissions`| Bài nộp tự luận của học viên & kết quả AI chấm 4 tiêu chí | `id` (UUID) | FK `profiles(id)`, FK `writing_tasks(id)` |
| **IV. Khảo thí TRKI Bảo mật** | `public.trki_tests` | Đề thi trắc nghiệm A1–C2 (CHỈ chứa câu hỏi, KHÔNG có đáp án) | `id` (TEXT) | Độc lập |
| | `private.exam_answer_keys` | **Bảng riêng tư giấu đáp án đúng & giải thích (Zero-Leak)** | `exam_id` (TEXT) | FK `trki_tests(id)` ON DELETE CASCADE |
| | `public.trki_submissions` | Lịch sử nộp bài thi thử, điểm số từng phân môn & kết quả đỗ/trượt | `id` (UUID) | FK `profiles(id)`, FK `trki_tests(id)` |
| **V. Giao dịch & Thương mại** | `public.packages` | Danh mục gói cước hội viên PRO (`pro_6m`, `pro_1y`, `pro_vip`) | `id` (TEXT) | Độc lập |
| | `public.orders` | Đơn hàng VietQR, mã giao dịch Casso, trạng thái kích hoạt PRO | `id` (UUID) | FK `profiles(id)`, FK `packages(id)` |
| | `public.shop_products` | Sản phẩm hàng Nga nội địa, dịch vụ tư vấn du học & công cụ | `id` (TEXT) | Độc lập |
| **VI. Blog & Cẩm nang** | `public.blog_posts` | Bài viết cẩm nang du học, KTX, đời sống Nga (Markdown GFM) | `id` (TEXT) | Độc lập |

---

### 7.2. Đặc Tả Chi Tiết 18 Bảng Cốt Lõi

#### Phân hệ 1: Người Dùng, Phân Quyền & Tiến Độ Học Tập

1. **`public.profiles`**:
   - `id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`: Mã định danh học viên khớp với Supabase Auth.
   - `full_name TEXT`: Họ tên hiển thị.
   - `avatar_url TEXT`: Đường dẫn ảnh đại diện.
   - `role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'super_admin'))`: Phân quyền quản trị vai trò trực tiếp, không cần tách bảng phụ.
   - `is_pro BOOLEAN NOT NULL DEFAULT false`: Cờ bản quyền kích hoạt tức thì cho Frontend.
   - `pro_expires_at TIMESTAMPTZ`: Thời hạn bản quyền PRO (NULL = vô thời hạn/chưa kích hoạt).
   - `timezone TEXT NOT NULL DEFAULT 'Asia/Ho_Chi_Minh'`: Múi giờ chuẩn IANA dùng tính toán ngày học Streak.
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

2. **`public.user_progress`**:
   - `user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE`.
   - `xp_total BIGINT NOT NULL DEFAULT 0`: Tổng điểm kinh nghiệm tích lũy toàn thời gian.
   - `streak_count INT NOT NULL DEFAULT 0`: Số ngày học liên tiếp hiện tại.
   - `last_study_date DATE`: Ngày học gần nhất (tính theo timezone tài khoản).
   - `vocab_stats JSONB NOT NULL DEFAULT '{"mastered": 0, "learning": 0, "due": 0}'::jsonb`: Thống kê từ vựng hiển thị nhanh trên trang chủ.
   - `done_list JSONB NOT NULL DEFAULT '{"vocabDone": [], "listenDone": [], "speakDone": [], "writeDone": [], "trkiDone": []}'::jsonb`: Mảng ID các bài học đã hoàn thành của 5 kỹ năng.
   - `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

3. **`public.user_vocab_progress`**:
   - `user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE`.
   - `vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE`.
   - `learning_state SMALLINT NOT NULL DEFAULT 0 CHECK (learning_state BETWEEN 0 AND 3)`: 0: Unseen/New, 1: Learning, 2: Reviewing, 3: Mastered.
   - `interval_days INT NOT NULL DEFAULT 1`: Khoảng giãn cách ngày ôn tiếp theo theo thuật toán SM-2.
   - `ease_factor REAL NOT NULL DEFAULT 2.5`: Hệ số độ dễ (Easiness Factor, min 1.3).
   - `next_review_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`: Mốc thời gian đến hạn ôn tập (được đánh chỉ mục để truy vấn thẻ đến hạn cực nhanh).
   - `review_count INT NOT NULL DEFAULT 0`: Tổng số lần đã ôn tập.
   - `last_reviewed_at TIMESTAMPTZ`: Lần ôn tập gần nhất.
   - `PRIMARY KEY (user_id, vocab_id)`.

---

#### Phân hệ 2: Từ Vựng Tiếng Nga Chuyên Sâu & Lọ Từ Vựng

4. **`public.vocabularies` (BẢNG TỪ VỰNG CỐT LÕI — CORE LEXICON)**:
   > Bảng dữ liệu ngôn ngữ học tiếng Nga chuẩn hóa, phục vụ tra cứu toàn bộ 5.000 từ vựng từ A1 đến C2, Flashcard 3D, từ điển đa tầng 6 cách và bài tập ngữ cảnh.
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
   - `word_with_stress TEXT NOT NULL`: Từ tiếng Nga nguyên bản có dấu trọng âm Unicode (ví dụ: `соба́ка`, `перекуси́ть`, `здравствуйте`).
   - `word_normalized TEXT NOT NULL`: Từ đã chuẩn hóa (bỏ dấu trọng âm, chuyển `ё` $\to$ `е`, viết thường) để đánh chỉ mục tìm kiếm tức thì `ILIKE`.
   - `pos TEXT NOT NULL`: Từ loại (`noun`, `verb`, `adjective`, `adverb`, `preposition`, `conjunction`, `particle`).
   - `level TEXT NOT NULL DEFAULT 'A1' CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2'))`: Cấp độ chuẩn khung tham chiếu Châu Âu (CEFR / TRKI).
   - `gender TEXT CHECK (gender IN ('m', 'f', 'n', 'pl', 'm/f'))`: Giống của danh từ (Đực, Cái, Trung, Luôn số nhiều).
   - `aspect TEXT CHECK (aspect IN ('imperfective', 'perfective', 'both'))`: Thể động từ (Chưa hoàn thành thể НСВ / Hoàn thành thể СВ).
   - `meaning_vi TEXT NOT NULL`: Nghĩa tiếng Việt chính xác và phổ biến nhất.
   - `meaning_ru TEXT`: Giải nghĩa bằng tiếng Nga đơn giản (định nghĩa từ điển học thuật).
   - `transcription TEXT`: Phiên âm quốc tế IPA hoặc chuyển tự hỗ trợ phát âm.
   - `examples JSONB NOT NULL DEFAULT '[]'::jsonb`: Mảng các câu ví dụ song ngữ thực tế `[{ "ru": "...", "vi": "..." }]`.
   - `collocations JSONB NOT NULL DEFAULT '{}'::jsonb`: Cụm động từ đi kèm, cấu trúc quản cách (Управление: ví dụ `перекусить чем?`), và tân ngữ trực tiếp.
   - `synonyms TEXT[] DEFAULT '{}'`: Mảng từ đồng nghĩa.
   - `antonyms TEXT[] DEFAULT '{}'`: Mảng từ trái nghĩa.
   - `audio_url TEXT`: URL tệp âm thanh phát âm bản ngữ chuẩn (nếu có).
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

5. **`public.vocab_jars`**:
   - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
   - `code TEXT UNIQUE`: Mã định danh lọ (ví dụ: `nghe_nghiep`, `am_thuc`).
   - `name TEXT NOT NULL`: Tên hiển thị của lọ từ vựng (ví dụ: "Mua sắm ở Auchan", "Hành lý sân bay").
   - `owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE`: NULL đối với lọ hệ thống; chứa User ID nếu là lọ cá nhân.
   - `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ CEFR chủ đạo của lọ.
   - `icon TEXT NOT NULL DEFAULT 'archive-jar'`: Mã icon Lucide đại diện.
   - `is_system BOOLEAN NOT NULL DEFAULT true`: `true` = Lọ hệ thống chuẩn hóa; `false` = Lọ cá nhân do học viên PRO tự tạo.
   - `word_count INT NOT NULL DEFAULT 0`: Số lượng từ có trong lọ.
   - `is_pro`: cở bản lọ dành cho PRO
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

6. **`public.jar_items`**:
   - `jar_id UUID NOT NULL REFERENCES public.vocab_jars(id) ON DELETE CASCADE`.
   - `vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE`.
   - `position INT NOT NULL DEFAULT 0`: Thứ tự sắp xếp từ trong lọ.
   - `added_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.
   - `PRIMARY KEY (jar_id, vocab_id)`.

---

#### Phân hệ 3: Các Phân Hệ Bài Học Chuyên Sâu

7. **`public.topic_articles`**:
   - `id TEXT PRIMARY KEY`: Mã bài học khớp với Lọ từ vựng (ví dụ: `jar_auchan`, `bo_phan_co_the`).
   - `title TEXT NOT NULL`: Tiêu đề bài học chủ đề.
   - `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ TRKI.
   - `intro TEXT`: Đoạn văn tóm tắt bối cảnh bài đọc.
   - `content_md TEXT NOT NULL`: Nội dung bài học chuyên sâu định dạng GitHub Flavored Markdown (GFM).
   - `audio_url TEXT`: URL file thu âm bài đọc hoàn chỉnh.
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

8. **`public.grammar_lessons`**:
   - `id TEXT PRIMARY KEY`: Mã bài ngữ pháp (ví dụ: `gr_case_1_prep`, `gr_motion_verbs`).
   - `title TEXT NOT NULL`: Tiêu đề bài giảng.
   - `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ A1–C2.
   - `category TEXT NOT NULL`: Nhóm chuyên đề (Cách trong tiếng Nga, Động từ, Cú pháp câu).
   - `summary TEXT`: Tóm lược kiến thức cốt lõi.
   - `content_md TEXT NOT NULL`: Nội dung chi tiết bài giảng Markdown.
   - `rules JSONB NOT NULL DEFAULT '[]'::jsonb`: Danh sách quy tắc và bảng mẫu dạng cấu trúc.
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

9. **`public.listening_topics` & `public.listening_lessons` & `public.listening_lesson_vocab` (Phân hệ Luyện Nghe & Chép Chính Tả Thống Nhất)**:
   > **Kiến trúc dữ liệu đồng bộ 100%**: Phân hệ Luyện nghe hiểu và Nghe chép chính tả sử dụng chung 1 bộ dữ liệu bài tập chuẩn hóa (Unified Dataset). Dữ liệu phân cấp gồm nhiều Chủ đề (`listening_topics`), trong mỗi chủ đề có nhiều Bài luyện (`listening_lessons`).
   - **`public.listening_topics`**:
     * `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`: Mã định danh chủ đề.
     * `code TEXT UNIQUE NOT NULL`: Slug định danh (ví dụ: `topic-lis-a1-airport`, `topic-lis-a1-shop`).
     * `title TEXT NOT NULL`: Tên chủ đề tiếng Nga & tiếng Việt (ví dụ: `Ở sân bay (В аэропорту)`).
     * `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ CEFR (A1, A2, B1, B2).
     * `category TEXT`: Nhóm phân loại icon/bối cảnh (`airport`, `shop`, `dorm`, `cafe`, `campus`, `metro`, `interview`).
     * `description TEXT`: Đoạn mô tả ngữ cảnh giao tiếp thực tế.
     * `icon TEXT DEFAULT 'headphones'`: Icon SVG hiển thị đồng bộ từ `RusiIcons`.
     * `sort_order INT DEFAULT 0`: Thứ tự hiển thị chủ đề.
     * `is_pro_only BOOLEAN NOT NULL DEFAULT false`: Cờ nội dung PRO.
   - **`public.listening_lessons`**:
     * `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`: Mã định danh bài luyện nghe.
     * `topic_id UUID NOT NULL REFERENCES public.listening_topics(id) ON DELETE CASCADE`: Khóa ngoại liên kết chủ đề cha.
     * `code TEXT UNIQUE NOT NULL`: Mã bài luyện (ví dụ: `lis-airport`, `lis-shop`).
     * `title TEXT NOT NULL`: Tiêu đề bài luyện.
     * `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ CEFR tương ứng.
     * `audio_url TEXT`: Đường dẫn tệp âm thanh audio lưu trữ trực tiếp tại Supabase Storage bucket `listening-audio` (`https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/<filename>.mp3`).
     * `duration_seconds INT`: Thời lượng audio chuẩn tính bằng giây.
     * `transcript_ru TEXT`: Toàn bộ lời thoại tiếng Nga kèm tên nhân vật.
     * `translation_vi TEXT`: Bản dịch tiếng Việt trọn vẹn toàn bài.
     * `questions JSONB NOT NULL DEFAULT '[]'::jsonb`: Danh sách câu hỏi trắc nghiệm và đáp án dành cho phần nghe hiểu:
       `[{ "id": "q1", "q": "Chỗ ngồi của Anya là số nào?", "options": ["12Б", "21А", "21Б", "20А"], "a": 1, "explanation": "Nhân viên thông báo: Ваше место — 21А." }]`.
     * `lines JSONB NOT NULL DEFAULT '[]'::jsonb`: Danh sách từng câu trong đoạn audio tương ứng với thời gian bắt đầu và kết thúc phục vụ nghe chép chính tả & đồng bộ sóng âm waveform:
       `[{ "id": 1, "start_sec": 0.0, "end_sec": 3.19, "speaker": "Nhân viên", "text_ru": "Ваш паспорт и билет, пожалуйста.", "translation_vi": "Xin hộ chiếu và vé của anh/chị.", "vocab_ids": ["uuid..."] }]`.
     * `sort_order INT DEFAULT 0`: Thứ tự bài luyện trong chủ đề.
     * `is_pro_only BOOLEAN NOT NULL DEFAULT false`: Yêu cầu tài khoản PRO.
     * `raw_data JSONB`: Bản ghi dữ liệu dự phòng tương thích ngược.
   - **`public.listening_lesson_vocab`**:
     * `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`: Khóa chính.
     * `lesson_id UUID NOT NULL REFERENCES public.listening_lessons(id) ON DELETE CASCADE`: Khóa ngoại bài luyện.
     * `vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE`: Khóa ngoại từ điển cốt lõi `vocabularies`.
     * `line_index INT`: Chỉ số câu thoại trong mảng `lines` (0, 1, 2...) hoặc NULL nếu là từ vựng chung cho cả bài.
     * `sort_order INT DEFAULT 0`: Thứ tự ưu tiên hiển thị từ vựng trong câu.
     * Ràng buộc: `UNIQUE (lesson_id, vocab_id, line_index)`.
   - **Supabase Storage: Bucket `listening-audio`**:
     * Lưu trữ tệp âm thanh MP3 chất lượng cao cho toàn bộ các bài luyện nghe (`public = true`).
     * Đường dẫn truy cập: `https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/listening-audio/<filename>.mp3`.
     * Chính sách bảo mật: `Public Access Listening Audio` (SELECT công khai cho anon/authenticated), `Allow Upload Listening Audio` (INSERT), `Allow Update Listening Audio` (UPDATE).

10. **`public.speaking_lessons` (Bài Luyện Nói Shadowing Qua Video YouTube)**:
    - Mô hình: Mỗi bài luyện tương ứng với 1 video YouTube, bao gồm tiêu đề, thông tin video, và danh sách các câu cần luyện tương ứng với video phát từ lúc nào đến lúc nào (`start_sec` -> `end_sec`), kèm bản dịch tiếng Việt và trọng âm.
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `code TEXT UNIQUE NOT NULL`: Mã định danh bài học (ví dụ: `YT_SPEAKING_A0sHpmmH1Ng`, `YT_SPEAKING_B1_METRO`).
    - `title TEXT NOT NULL`: Tiêu đề bài luyện nói Shadowing.
    - `level TEXT NOT NULL CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')) DEFAULT 'A1'`: Trình độ CEFR.
    - `level_name TEXT`: Tên cấp độ tiếng Việt (Sơ cấp A1, Cơ bản A2, Trung cấp B1, Nâng cao B2).
    - `category TEXT DEFAULT 'shadowing'`: Nhóm bài học.
    - `category_name TEXT DEFAULT 'Luyện nói Shadowing qua Video'`.
    - `youtube_id TEXT NOT NULL`: Mã video YouTube (11 ký tự).
    - `youtube_url TEXT`: URL xem video (`https://www.youtube.com/watch?v=...`).
    - `video_sample_url TEXT`: URL nhúng iframe YouTube Player.
    - `description TEXT`: Đoạn mô tả bài học và mục tiêu luyện nói.
    - `sentences JSONB NOT NULL DEFAULT '[]'::jsonb`: Danh sách các câu cần luyện phát âm theo video:
      * Cấu trúc mỗi phần tử câu:
        ```json
        {
          "id": 1,
          "start_sec": 4.0,
          "end_sec": 8.5,
          "speaker": "Рассказчик",
          "text_ru": "Что это падает с неба? Капля?",
          "text_stressed": "Что э́то па́дает с не́ба? Ка́пля?",
          "translation_vi": "Cái gì rơi từ trên trời xuống thế kia? Một giọt nước à?",
          "start": 4.0,
          "end": 8.5,
          "ru": "Что это падает с неба? Капля?",
          "vi": "Cái gì rơi từ trên trời xuống thế kia? Một giọt nước à?"
        }
        ```
    - `items JSONB`: Mảng câu tương đồng để đảm bảo 100% khả năng tương thích ngược.
    - `icon TEXT DEFAULT 'youtube'`.
    - `sort_order INT DEFAULT 0`.
    - `is_pro_only BOOLEAN DEFAULT false`.
    - `raw_data JSONB DEFAULT '{}'::jsonb`.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.
    - **Trigger validation (`private.rusi_validate_speaking()`)**:
      * Bắt buộc có `youtube_id` hợp lệ.
      * Bắt buộc `sentences` là một mảng JSONB chứa danh sách câu.
      * Tự động sinh `youtube_url` và `video_sample_url` nếu chưa có.
      * Tự động đồng bộ `items` = `sentences`.
    - **Row Level Security (RLS)**:
      * Policy `Public Read Speaking Lessons`: SELECT cho phép công khai `anon` và `authenticated`.
      * Policy `Admin Manage Speaking Lessons`: Toàn quyền ALL cho `authenticated` và `service_role`.

11. **`public.writing_topics` (Chủ Đề Luyện Viết: Tả Tranh & Luyện Dịch)**:
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `code TEXT UNIQUE`: Mã chủ đề định danh (ví dụ: `topic_pic_daily_a1`, `topic_pic_dorm_a2`, `topic_trans_intro_a1`).
    - `title TEXT NOT NULL`: Tiêu đề chủ đề (ví dụ: "Sinh hoạt thường nhật & Gia đình", "Ký túc xá & Đời sống sinh viên").
    - `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ CEFR (`A1`, `A2`, `B1`, `B2`).
    - `type TEXT NOT NULL DEFAULT 'picture' CHECK (type IN ('picture', 'translation', 'essay'))`: Chế độ luyện viết (`picture` cho Tả tranh, `translation` cho Luyện dịch).
    - `category TEXT`, `category_name TEXT`: Phân loại nhóm nội dung.
    - `description TEXT`: Đoạn mô tả mục tiêu học tập.
    - `icon TEXT`: Mã icon SVG từ hệ thống RusiIcons (ví dụ: `timer-clock`, `building-2`, `plane`, `book-open-blog`).
    - `image_url TEXT`: Ảnh bìa chủ đề nếu có.
    - `sort_order INT NOT NULL DEFAULT 0`: Thứ tự ưu tiên hiển thị.
    - `is_pro_only BOOLEAN NOT NULL DEFAULT false`: Cờ bản quyền nội dung PRO.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

12. **`public.writing_tasks` (Bài Luyện Tập Con Theo Chủ Đề)**:
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `topic_id UUID NOT NULL REFERENCES public.writing_topics(id) ON DELETE CASCADE`: Khóa ngoại liên kết chủ đề cha.
    - `code TEXT UNIQUE`: Mã bài luyện (ví dụ: `pic_a1_01`, `pic_a1_02`, `trans_a1_01`).
    - `title TEXT NOT NULL`: Tiêu đề bài luyện (ví dụ: "Bài 1: Bữa sáng của gia đình", "Bài 2: Học tập trong thư viện trường").
    - `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ A1–B2.
    - `task_type TEXT NOT NULL DEFAULT 'picture_desc' CHECK (task_type IN ('picture_desc', 'translation', 'summary', 'topic_essay'))`: Dạng bài tập.
    - `image_url TEXT`: 1 Ảnh minh họa lưu trữ từ Supabase Storage (`storage.buckets`: `writing-images`).
    - `prompt TEXT NOT NULL`: Đề bài chi tiết (tiếng Nga cho tả tranh, tiếng Việt cần dịch cho luyện dịch).
    - `prompt_text TEXT`: Bản ghi phụ đề bài tương thích ngược.
    - `model_answer TEXT`: Bài văn miêu tả chuẩn hoặc bản dịch tiếng Nga mẫu đạt điểm tối đa TRKI.
    - `sample_essay TEXT`: Văn bản bài mẫu tham khảo đồng bộ.
    - `tips JSONB NOT NULL DEFAULT '[]'::jsonb`: Mảng JSON các câu hỏi định hướng, lưu ý ngữ pháp và gợi ý mở bài.
    - `ai_prompt TEXT`: Prompt hướng dẫn giám khảo AI Rusika chấm điểm theo barem 4 tiêu chí CEFR chuẩn mực.
    - `min_words INT NOT NULL DEFAULT 25`: Số từ tối thiểu yêu cầu cho bài viết.
    - `sort_order INT NOT NULL DEFAULT 0`: Thứ tự sắp xếp bài tập trong chủ đề.
    - `is_pro_only BOOLEAN NOT NULL DEFAULT false`: Yêu cầu gói PRO.
    - `publication_status TEXT NOT NULL DEFAULT 'published'`.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

13. **`public.writing_task_vocab` (Bảng Liên Kết Từ Vựng Từ Điển Cho Bài Viết)**:
    > Bảng liên kết nhiều-nhiều giúp mỗi bài viết kết nối trực tiếp với các mục từ vựng chuẩn hóa trong kho từ điển `vocabularies`.
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `task_id UUID NOT NULL REFERENCES public.writing_tasks(id) ON DELETE CASCADE`.
    - `vocab_id UUID NOT NULL REFERENCES public.vocabularies(id) ON DELETE CASCADE`.
    - `sort_order INT NOT NULL DEFAULT 0`: Thứ tự hiển thị trong ngăn kéo từ vựng gợi ý.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.
    - `UNIQUE (task_id, vocab_id)`.

14. **`public.writing_submissions` (Bài Nộp Tự Luận & Lịch Sử AI Chấm Điểm)**:
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE`.
    - `task_id UUID NOT NULL REFERENCES public.writing_tasks(id) ON DELETE CASCADE`.
    - `content_ru TEXT NOT NULL`: Nội dung bài làm tiếng Nga của học viên.
    - `word_count INT NOT NULL`: Số từ học viên đã viết.
    - `overall_score NUMERIC(5,2)`: Điểm tổng kết thang 100.
    - `ai_feedback JSONB`: Kết quả phân tích chi tiết từ AI (điểm 4 tiêu chí, câu lỗi, câu sửa, giải thích ngữ pháp).
    - `submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

15. **Supabase Storage: Bucket `writing-images`**:
    > Bucket lưu trữ hình ảnh công khai cho phân hệ Tả tranh (`public = true`), cho phép client tải ảnh qua đường dẫn:
    > `https://nrhtdwjihnlaxrbitmcf.supabase.co/storage/v1/object/public/writing-images/<filename>`.
    - Phân quyền: Cấp policy `Public Access Writing Images` (SELECT công khai cho anon/authenticated).

---

#### Phân hệ 4: Khảo Thí TRKI & Chống Lộ Đáp Án (Zero-Leak)

15. **`public.trki_tests`**:
    > **Cấu trúc 5 phân môn chính thức theo chuẩn quốc gia Nga ТРКИ**:
    - `id TEXT PRIMARY KEY`: Mã đề thi UUID hoặc mã định danh (ví dụ: `58742d5e-b98e-41e0-a3cb-4680392ae146`, `trki_a1`).
    - `code TEXT`: Mã đề thi chuẩn rút gọn (`trki_a1`, `trki_a2`, `trki_b1`, `trki_b2`).
    - `title TEXT NOT NULL`: Tên đề thi mô phỏng.
    - `level TEXT NOT NULL DEFAULT 'A1'`: Cấp độ chuẩn ТЭУ (A1) đến ТРКИ-2 (B2).
    - `duration_min INT NOT NULL DEFAULT 45`: Thời gian làm bài tính bằng phút.
    - `pass_percent INT NOT NULL DEFAULT 66`: Tỷ lệ phần trăm tối thiểu để ĐẠT (СДАНО).
    - `part1 JSONB NOT NULL DEFAULT '{}'::jsonb`: Phần 1 - Từ vựng & Ngữ pháp (Лексика и грамматика) gồm danh sách câu hỏi trắc nghiệm, các lựa chọn A, B, C, D và giải thích ngữ pháp.
    - `part2 JSONB NOT NULL DEFAULT '{}'::jsonb`: Phần 2 - Đọc hiểu (Чтение) gồm đoạn văn bản đọc `text: { ru, vi }` và hệ thống câu hỏi trắc nghiệm kèm giải thích.
    - `part3 JSONB NOT NULL DEFAULT '{}'::jsonb`: Phần 3 - Nghe hiểu (Аудирование) gồm file âm thanh native Russian lưu trữ tại Supabase Storage bucket `trki-audio`, hệ thống câu hỏi trắc nghiệm và lời thoại hội thoại.
    - `part4 JSONB NOT NULL DEFAULT '{}'::jsonb`: Phần 4 - Chủ đề viết (Письмо) gồm đề bài viết tự luận, yêu cầu số từ tối thiểu (`minWords`), dịch tiếng Việt và bài văn mẫu chuẩn ngữ pháp.
    - `part5 JSONB NOT NULL DEFAULT '{}'::jsonb`: Phần 5 - Đề bài tình huống (Говорение) gồm các tình huống giao tiếp đời sống thực tế, bản dịch tiếng Việt và câu nói gợi ý mẫu phản xạ.
    - `answers JSONB NOT NULL DEFAULT '{}'::jsonb`: Bảng đáp án và hướng dẫn giải cho tất cả các phần trong đề (`part1`, `part2`, `part3`, `part4`, `part5`).
    - `parts JSONB`: Mảng hợp nhất 5 phần thi `[part1, part2, part3, part4, part5]` được trigger `private.rusi_sync_trki_test()` tự động đồng bộ hóa hai chiều.
    - `is_pro_only BOOLEAN NOT NULL DEFAULT false`: Khóa đề thi thử B1–B2 cho tài khoản PRO.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

16. **`private.exam_answer_keys` (BẢNG RIÊNG TƯ — BẢO VỆ ĐÁP ÁN ĐỀ THI)**:
    > Bảng nằm trong schema `private`, hoàn toàn **không cấp quyền SELECT cho anon/authenticated**. Chỉ có hàm RPC chấm thi `SECURITY DEFINER` hoặc service_role mới được phép đọc.
    - `exam_id TEXT PRIMARY KEY REFERENCES public.trki_tests(id) ON DELETE CASCADE`.
    - `keys JSONB NOT NULL`: Bảng mã đáp án đúng `{ "q1": 1, "q2": 0, "q3": 2 }` hoặc `{ "q1": "пошли" }`.
    - `explanations JSONB NOT NULL DEFAULT '{}'::jsonb`: Lời giải chi tiết sư phạm cho từng câu.
    - `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

17. **`public.trki_submissions`**:
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE`.
    - `exam_id TEXT NOT NULL REFERENCES public.trki_tests(id) ON DELETE CASCADE`.
    - `score_percent NUMERIC(5,2) NOT NULL`: Điểm tổng kết toàn bài (%).
    - `passed BOOLEAN NOT NULL`: `true` nếu tất cả phân môn $\ge 66\%$ (hoặc đạt chuẩn bảo lưu 1 kỹ năng $60-65\%$).
    - `section_scores JSONB NOT NULL`: Điểm chi tiết từng phân môn `{ "subtest_1": 75.5, "subtest_2": 68.0 }`.
    - `user_answers JSONB NOT NULL`: Bài làm thực tế của học viên `{ "q1": 1, "q2": 0 }`.
    - `time_spent_sec INT NOT NULL`: Thời gian hoàn thành bài thi (giây).
    - `submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

---

#### Phân hệ 5: Kinh Doanh, Đơn Hàng & Hội Viên PRO

18. **`public.packages`**:
    - `id TEXT PRIMARY KEY CHECK (id IN ('pro_6m', 'pro_1y', 'pro_vip'))`: Mã định danh 3 gói cước chuẩn.
    - `name TEXT NOT NULL`: Tên gói (Gói 6 Tháng, Gói 1 Năm, Gói Trọn Đời).
    - `price_vnd BIGINT NOT NULL`: Giá tiền tính bằng Việt Nam Đồng (VND).
    - `duration_months INT`: Thời lượng gói (6, 12; NULL nếu là trọn đời).
    - `is_lifetime BOOLEAN NOT NULL DEFAULT false`: Đánh dấu gói Vĩnh viễn.
    - `badge TEXT`: Nhãn nổi bật (ví dụ: "Phổ Biến Nhất", "VIP Quyền Năng").
    - `features JSONB NOT NULL DEFAULT '[]'::jsonb`: Mảng các quyền lợi đặc quyền.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

19. **`public.orders`**:
    - `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`.
    - `order_code TEXT UNIQUE NOT NULL`: Mã đơn thanh toán VietQR duy nhất (`RUSI_[MãĐơn]_[UserTag]`).
    - `user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE`.
    - `package_id TEXT NOT NULL REFERENCES public.packages(id)`.
    - `amount BIGINT NOT NULL`: Số tiền thanh toán (VND).
    - `status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'expired', 'cancelled'))`: Trạng thái đơn.
    - `payment_method TEXT NOT NULL DEFAULT 'vietqr'`: Phương thức thanh toán.
    - `casso_trans_id TEXT`: Mã giao dịch đối soát từ webhook Casso / Napas247.
    - `expires_at TIMESTAMPTZ NOT NULL`: Thời điểm hết hạn phiên giao dịch 15:00.
    - `paid_at TIMESTAMPTZ`: Thời điểm nhận được tiền.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

20. **`public.shop_products`**:
    - `id TEXT PRIMARY KEY`: Mã sản phẩm (ví dụ: `sp_alenka`, `sp_visa_mvd`, `sp_keyboard_tools`).
    - `code TEXT UNIQUE`: Mã định danh danh mục.
    - `name TEXT NOT NULL`: Tên sản phẩm hàng Nga hoặc dịch vụ du học.
    - `category TEXT NOT NULL CHECK (category IN ('food', 'cosmetics', 'souvenir', 'service', 'tools'))`: Phân loại.
    - `price_vnd BIGINT NOT NULL`: Giá bán niêm yết (VND).
    - `image_url TEXT`: Ảnh đại diện sản phẩm.
    - `description TEXT`: Mô tả chi tiết sản phẩm.
    - `status TEXT NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'out_of_stock', 'pre_order'))`.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

---

#### Phân hệ 6: Cẩm Nang & Blog Du Học

21. **`public.blog_posts`**:
    - `id TEXT PRIMARY KEY`: ID định danh bài viết.
    - `slug TEXT UNIQUE NOT NULL`: Đường dẫn thân thiện chuẩn SEO (ví dụ: `kinh-nghiem-song-ktx-nga-moskva`).
    - `title TEXT NOT NULL`: Tiêu đề bài viết.
    - `category TEXT NOT NULL`: Chuyên mục (Du học Nga, Đời sống KTX, Thủ tục Visa, Kinh nghiệm săn học bổng).
    - `tags TEXT[] DEFAULT '{}'`: Danh sách thẻ tag SEO.
    - `summary TEXT NOT NULL`: Đoạn trích dẫn tóm tắt xuất hiện trên danh sách thẻ blog.
    - `content_md TEXT NOT NULL`: Nội dung bài viết định dạng GitHub Flavored Markdown (GFM).
    - `cover_url TEXT`: Ảnh bìa bài viết tỷ lệ 16:9.
    - `author TEXT NOT NULL DEFAULT 'Ban Biên Tập RUSI TRKI'`: Tác giả bài viết.
    - `published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`: Ngày đăng bài.
    - `created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`, `updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`.

---

### 7.3. Các Hàm RPC Nghiệp Vụ Bảo Mật Cốt Lõi (Security Definer RPCs)

Mọi thao tác can thiệp vào tài chính, bản quyền PRO, điểm số và đáp án đề thi đều được thực hiện thông qua RPC phía server (`SECURITY DEFINER`), cô lập hoàn toàn logic nhạy cảm khỏi client:

1. **`public.rusi_grade_trki_exam(p_test_id TEXT, p_user_answers JSONB, p_time_spent_sec INT) -> JSONB`**:
   - **Mục đích**: Chấm thi trắc nghiệm TRKI bảo mật tuyệt đối chống gian lận (Zero-Answer Leak).
   - **Quy trình xử lý**:
     * Xác thực `auth.uid()`, kiểm tra sự tồn tại của `trki_tests`.
     * Đọc đáp án bí mật và lời giải sư phạm từ `private.exam_answer_keys(keys, explanations)`.
     * So khớp từng câu hỏi với `p_user_answers`, tính điểm phần trăm `score_percent` và trạng thái ĐẠT/KHÔNG ĐẠT (`passed` khi $\ge 66\%$, hỗ trợ quy chế bảo lưu 1 kỹ năng $60-65\%$).
     * Lưu bài làm vào `public.trki_submissions`.
     * Thưởng ngay `+30 XP` vào `public.user_progress`, cập nhật mảng `done_list.trkiDone` trong cùng một transaction.
   - **Trả về**: `{ submission_id, score_percent, passed, correct_count, total_questions, xp_earned, explanations }`.

2. **`public.rusi_submit_srs_review(p_vocab_id UUID, p_rating SMALLINT) -> JSONB`**:
   - **Mục đích**: Ghi nhận kết quả ôn từ vựng và tự động giãn cách theo thuật toán Spaced Repetition (SM-2).
   - **Tham số đánh giá (`p_rating`)**: `1`: Again (Ôn lại), `2`: Hard (Khó), `3`: Good (Nhớ tốt), `4`: Easy (Dễ).
   - **Quy trình xử lý**:
     * Đọc tiến độ từ `public.user_vocab_progress`. Nếu từ mới, khởi tạo `ease_factor = 2.5`.
     * Điều chỉnh `interval_days` (ngày), `ease_factor` (min 1.3), và trạng thái `learning_state` (1: Learning, 2: Reviewing, 3: Mastered).
     * Tính toán mốc thời gian đến hạn kế tiếp: `next_review_at = NOW() + interval_days`.
     * Cập nhật `user_vocab_progress` (`ON CONFLICT (user_id, vocab_id) DO UPDATE`).
   - **Trả về**: `{ vocab_id, state, interval_days, next_review_at }`.

3. **`public.rusi_activate_order(p_order_code TEXT, p_casso_ref TEXT) -> JSONB`**:
   - **Mục đích**: Tự động đối soát và kích hoạt quyền hội viên PRO qua Webhook ngân hàng / Casso.
   - **Quy trình xử lý**:
     * Tìm đơn hàng `orders` có mã `order_code` ở trạng thái `pending`.
     * Đọc thông tin gói từ `packages`, xác định ngày hết hạn `pro_expires_at` (thời hạn 6/12 tháng hoặc `NULL` nếu là gói trọn đời `pro_vip`).
     * Cập nhật đơn hàng: `status = 'paid'`, lưu `casso_trans_id`, `paid_at = NOW()`.
     * Nâng cấp hồ sơ học viên: `profiles.is_pro = true`, `profiles.pro_expires_at = v_expires`.
   - **Trả về**: `{ success: true, user_id, expires_at }`.

---

### 7.4. Phân Quyền Row Level Security (RLS) Chuẩn Xác

1. **Bảng nội dung học tập công khai** (`vocabularies`, `vocab_jars`, `jar_items`, `topic_articles`, `grammar_lessons`, `listening_topics`, `listening_lessons`, `listening_lesson_vocab`, `speaking_lessons`, `writing_topics`, `writing_tasks`, `writing_task_vocab`, `trki_tests`, `packages`, `shop_products`, `blog_posts`):
   - `SELECT`: Cấp quyền đọc tự do cho `anon` và `authenticated`.
   - `INSERT, UPDATE, DELETE`: Giới hạn nghiêm ngặt chỉ tài khoản quản trị (`profiles.role IN ('admin', 'super_admin')`).
2. **Bảng dữ liệu cá nhân học viên** (`profiles`, `user_progress`, `user_vocab_progress`, `writing_submissions`, `trki_submissions`, `orders`):
   - `SELECT`: `auth.uid() = user_id` (học viên chỉ xem dữ liệu của chính mình) hoặc Admin xem toàn bộ.
   - `UPDATE`: Học viên chỉ được cập nhật các trường profile cho phép (`full_name`, `avatar_url`), **tuyệt đối không được cập nhật `role`, `is_pro`, `xp_total` trực tiếp từ client**. Mọi điểm số và bản quyền đều qua RPC bảo mật.
3. **Bảng giấu đáp án đề thi** (`private.exam_answer_keys`):
   - Nằm trong `private schema`, không expose qua Data API, chặn 100% quyền truy cập trực tiếp từ client.

---


## 8. QUY TẮC CỐT LÕI CHO AI CODING AGENT

> [!CAUTION]
> ### 🛑 QUY TẮC BẤT KHẢ XÂM PHẠM: TUYỆT ĐỐI KHÔNG TỰ Ý SỬA NỘI DUNG ĐÃ CÓ TRÊN WEB
> **Không được sửa, xóa hoặc thay đổi bất kỳ nội dung nào mà người dùng đã đặt trên web, trừ khi chính người dùng có yêu cầu đích danh mới được sửa.**
> - Toàn bộ câu từ, tiêu đề chính/phụ, đoạn mô tả hero, giới thiệu, nhãn dán, nội dung bài viết, đề thi, dữ liệu bài học... trên tất cả các trang web (`.html`, `app.js`, `pages.js`, `data.js`...) phải được **giữ nguyên vẹn 100%**.
> - Khi thực hiện các tác vụ căn chỉnh giao diện, CSS styling, responsive, sửa lỗi kỹ thuật hay tối ưu code: AI **chỉ xử lý phần kỹ thuật/style**, tuyệt đối không được tự ý lược bỏ hay viết lại nội dung của người dùng.

1. **Bảo tồn nguyên vẹn nội dung người dùng (Content Integrity)**:
   Tuyệt đối không xóa, sửa, tóm tắt hoặc viết lại tiêu đề, mô tả, văn bản người dùng đã đặt trên web trừ khi có yêu cầu rõ ràng từ người dùng.

2. **Tuân thủ quy chuẩn Responsive & "More..." (Overflow Protection)**:
   Trước khi hoàn thành bất kỳ tác vụ giao diện nào, bắt buộc thẩm định trên Mobile ($\le 768px$) và Tablet ($768px - 1024px$). Áp dụng quy tắc gom cụm "Khác ▾" (More...) cho các thành phần vượt quá chiều rộng màn hình, không để chữ bị chém ngang hoặc phát sinh cuộn ngang ngoài ý muốn.

3. **Bảo vệ ngôn từ UI — Cấm hiển thị từ "Trụ Cột"**:
   Khái niệm "7 Trụ cột" chỉ là thuật ngữ cấu trúc tài liệu nội bộ; **tuyệt đối không hiển thị từ "Trụ cột" ra màn hình học viên**. Chỉ gọi tên trực tiếp các module: *Từ Vựng, Luyện Viết, Luyện Nghe, Luyện Nói, Luyện Thi TRKI, Shop, Blog*.

4. **Tuân thủ Quy chuẩn Header Navigation**:
   Áp dụng nghiêm ngặt cấu trúc 3 vùng cân đối, chiều cao cố định (Desktop 68px, Tablet 64px, Mobile 60px) và menu ngăn kéo trượt `nav-open` theo quy chuẩn tại **Mục 3.3**. XP và Streak chỉ hiển thị trong dropdown tài khoản khi đã đăng nhập.

5. **Theme Russian Winter Cool Blue**:
   Cố định giao diện Sáng (`data-theme="light"` và `data-season="winter"`), phong cách mùa đông nước Nga: Nền chính (`#eef4fb`), bề mặt thẻ (`#ffffff`), màu chữ chính (`#0f1f38`), màu đường viền (`#d2e0f0`), điểm nhấn Đỏ Crimson (`#c52233`) và Xanh Cobalt (`#1757a6`).

6. **Quy chuẩn Deploy GitHub Pages & Cache-Busting Tự Động**:
   * Luôn duy trì tệp `.nojekyll` ở thư mục gốc để vô hiệu hóa Jekyll build.
   * **Quy tắc phiên bản động**: Mỗi khi thay đổi file CSS/JS lõi (`styles.css`, `pages.js`, `app.js`...), phải tự động tăng số version query parameter (ví dụ: `?v=9.5`) trên toàn bộ 16 file HTML gọi đến để kích hoạt Cloudflare và trình duyệt làm mới cache tức thì.

7. **Bảo mật Git & Secret Hygiene**:
   Tuyệt đối không commit API secret key, Service role key, Database connection string hoặc thông tin nhạy cảm vào Git repository.

8. **Quy chuẩn Chân trang (Footer Navigation)**:
   Đồng bộ qua component `<footer class="site-footer">` màu Deep Baltic Navy `#081528`. Cố định đúng 7 liên kết chuyên mục cốt lõi (`Từ vựng | Viết | Nghe | Nói | TRKI | Blog | Shop`). Desktop dàn 3 cột cân đối; Tablet/Mobile tự động xếp 1 cột căn giữa với tap target $\ge 44$px.

9. **Bộ Lọc & Phân Trang (Default Level A1 & Pagination)**:
   Các trang danh sách bài học/đề thi mặc định lọc theo cấp độ `A1` (Sơ cấp) thay vì "Tất cả", giúp người học mới bắt đầu không bị ngợp và tối ưu tốc độ nạp dữ liệu.

10. **Phong cách Thiết kế Tối giản (Clean Editorial Style)**:
    Tránh lạm dụng emoji trang trí ở tiêu đề mục và nút bấm CTA (dùng *"Bắt đầu luyện nghe →"*, *"Bắt đầu luyện nói →"* thay vì 🎧, 🎙️, 🚀). Nút bấm xác thực tại Header sử dụng icon SVG tối giản, thanh mảnh.

11. **Không Gian Tiện Ích Nổi & Pomodoro**:
    Pomodoro mini neo tại cụm Header top-right. Trợ lý AI Rusika neo dạng bong bóng nổi góc phải đáy màn hình (`bottom: 24px, right: 20px, z-index: 990`; tự động dâng lên `bottom: 84px` trên màn hình có thanh Bottom Bar cố định).

12. **Quy Chuẩn Gamification (XP & Streak)**:
    - **Completion-Only XP**: Chỉ cộng XP khi hoàn thành trọn vẹn phiên học (Flashcard Lọ: `+15 XP`; Shadowing $\ge 70\%$: `+10 XP`; Nghe hiểu $\ge 60\%$: `+20 XP`; Thi TRKI: `+30 XP`; Tả tranh: `+20 XP`).
    - **Streak theo múi giờ cục bộ**: Một ngày chỉ được tính vào Streak khi có phát sinh XP thực tế. Tính khoảng cách `diffDays` dựa trên mốc ngày 00:00:00 UTC của timezone tài khoản (`diffDays = 1` tăng streak, `diffDays > 1` reset về 0).

---

## 9. QUY CHUẨN VECTOR ICON LUCIDE 24px (LUCIDE DESIGN SYSTEM)

Toàn bộ hệ thống webapp RUSI TRKI sử dụng thống nhất bộ **Vector Icon Lucide 24px** thông qua thư viện `rusi-icons.js`, loại bỏ hoàn toàn việc dùng emoji hệ điều hành gây phân mảnh hiển thị.

### 9.1. Thông Số Kỹ Thuật Chuẩn (Vector Specs)
* **Kích thước khung vẽ (ViewBox)**: `0 0 24 24`
* **Độ dày nét vẽ (Stroke Width)**: `2px` (chuẩn Lucide) hoặc `1.5px` (cho các nút phụ thanh mảnh).
* **Màu sắc (Color)**: `stroke: currentColor` — tự động kế thừa màu chữ của phần tử cha hoặc class CSS.
* **Đổ bóng / Nền (Fill)**: `fill: none`.
* **Bo góc & đầu nét**: `stroke-linecap="round"` và `stroke-linejoin="round"`.
* **Kích thước chuẩn**: `xs` (14px), `sm` (16px), `md` (20px), `lg` (24px - mặc định), `xl` (32px/48px).
* **Vùng chạm cảm ứng (Tap Target)**: Đảm bảo tối thiểu $44 \times 44$px trên Mobile/Tablet qua CSS hitbox (`touch-action: manipulation`).

---

### 9.2. Bảng Danh Mục Icon Cốt Lõi Hệ Thống

| Nhóm chức năng | ID Icon Chuẩn | Tên đại diện | Mục đích & Ngữ cảnh sử dụng |
|---|---|---|---|
| **7 Chuyên Mục** | `archive-jar` | Lọ từ vựng | Chuyên mục Từ Vựng, thẻ Lọ từ vựng Spaced Repetition |
| | `pen-tool` | Bút viết | Chuyên mục Luyện Viết (Письмо), đề bài tả tranh & luận |
| | `headphones` | Tai nghe | Chuyên mục Luyện Nghe, bài nghe hiểu 4 Part & chép chính tả |
| | `mic-speaking` | Micro | Chuyên mục Luyện Nói, YouTube Shadowing Studio |
| | `graduation-cap` | Mũ tốt nghiệp | Chuyên mục Khảo Thí TRKI, phòng thi thử mô phỏng |
| | `book-open-blog` | Sách mở | Chuyên mục Blog, cẩm nang du học & đời sống Nga |
| | `shopping-bag-shop` | Túi mua sắm | Chuyên mục Shop, sản phẩm nội địa Nga & dịch vụ du học |
| **Gamification** | `flame-streak` | Ngọn lửa | Chuỗi ngày học liên tục (Streak) |
| | `zap-xp` | Tia chớp | Điểm kinh nghiệm XP, nút nâng cấp PRO |
| | `trophy-reward` | Cúp vàng | Bảng xếp hạng học viên, kỷ lục cá nhân |
| | `crown-vip` | Vương miện | Huy hiệu PRO Member, modal khóa nội dung trả phí |
| **Học Tập & Thi** | `timer-clock` | Đồng hồ | Tiện ích Pomodoro mini, đồng hồ đếm ngược phòng thi |
| | `check-circle-correct` | Tích tròn | Đáp án đúng, trạng thái hoàn thành bài học |
| | `volume-high` | Loa phát thanh | Nút phát âm thanh mẫu từ vựng & câu thoại |
| | `rotate-ccw` | Mũi tên lặp lại | Nút tự động lặp lại (Loop), nút nói lại câu trong Speaking |
| | `lock-pro` | Khóa bảo vệ | Biểu tượng khóa nội dung dành riêng cho PRO |

---

### 9.3. Kiến Trúc Thư Viện `rusi-icons.js` & Triển Khai
Thư viện `rusi-icons.js` được nhúng tại thẻ `<head>` trên tất cả 16 tệp HTML:
```html
<script src="rusi-icons.js?v=5.0"></script>
```

1. **Sử dụng trong HTML**:
   ```html
   <i data-rusi-icon="headphones" data-size="24"></i>
   <span data-rusi-icon="crown-vip" data-size="16"></span>
   ```
2. **Sử dụng trong JavaScript Template Strings**:
   ```javascript
   const html = window.RusiIcons.get("archive-jar", { size: 20 });
   ```
3. **Quét lại DOM sau khi render động**:
   ```javascript
   window.RusiIcons.replace(document.getElementById("myContainer"));
   ```

---

## 10. TIÊU CHUẨN ĐỐI SOÁT & BẢO ĐẢM CHẤT LƯỢNG HỆ THỐNG (QUALITY ASSURANCE BASELINE)

> Toàn bộ các tiêu chuẩn kỹ thuật dưới đây đã được nghiệm thu thực tế trên toàn bộ 16 trang webapp và bắt buộc phải được duy trì nghiêm ngặt trong mọi lần nâng cấp tiếp theo:

1. **Kiến Trúc Offline-First & Graceful Degradation**:
   Mọi trang (`vocabulary.html`, `listening.html`, `speaking.html`, `writing.html`, `mock-test.html`, `blog.html`, `shop.html`, `product-detail.html`) luôn có cơ chế fallback tự động về hằng số dữ liệu chuẩn trong `data.js` kết hợp bộ nhớ đệm `STORE` khi mạng chập chờn hoặc Supabase chưa phản hồi. Tuyệt đối không bao giờ để xảy ra tình trạng màn hình trắng.

2. **Đồng Bộ Phiên Bản Cache-Busting Thống Nhất**:
   100% 16 tệp HTML đồng bộ gọi cùng phiên bản cache-busting mới nhất (`styles.css?v=9.5`, `pages.js?v=9.5`, `app.js?v=8.5`, `data.js?v=8.0`, `rusi-icons.js?v=5.0`). Mọi thay đổi mã nguồn phải tự động tăng query parameter để Cloudflare và trình duyệt cập nhật tài nguyên lập tức.

3. **Phòng Thi TRKI Zero-Answer Leak & Server-Side Grading**:
   Đề thi công khai tuyệt đối không chứa đáp án đúng. Mọi bài thi thử TRKI đều chấm điểm tập trung tại server qua RPC `rusi_grade_trki_exam` đối chiếu với `private.exam_answer_keys`.

4. **Không Gian Luyện Nói YouTube Shadowing & Chấm WER Realtime**:
   30 bộ bài học (24 video hoạt hình có timestamp + 6 bộ hội thoại thực tế). Trình phát YouTube 16:9 đồng bộ postMessage, đệm bù trễ (+0.4s) chống vấp âm, nhận diện giọng nói Web Speech `ru-RU`, thuật toán WER Levenshtein bóc tách từng từ đúng/sai và tô màu trực tiếp trên câu tiếng Nga.

5. **Chuẩn Mực Responsive & Quy Tắc "More..." (Overflow Protection)**:
   * Mobile: 1 cột duy nhất, chiều cao Header cố định 60px, tap target $\ge 44 \times 44$px, font input $\ge 16$px (chống auto-zoom iOS), `overflow-x: hidden`.
   * Tabs và bộ lọc cuộn ngang kích hoạt lớp mặt nạ làm mờ `mask-image` mép phải (`.rusi-scroll-track-faded`), không để chữ bị chém ngang.

6. **Vệ Sinh Thư Viện & Zero Dead Code**:
   Loại bỏ triệt để các thư viện CDN thừa không dùng (như Wavesurfer). Vẽ biểu đồ sóng âm và phân tích âm thanh hoàn toàn bằng native Web Audio API và Web Speech API thuần.

7. **Đồng Bộ Giao Diện & Mascot AI Rusika**:
   Trợ lý AI Mascot Rusika nổi (`#rusikaFloatingWidget`) tự động kích hoạt trên tất cả các trang bài học qua `bootApp()`. Popover Pomodoro mini tích hợp chân Header đóng chéo tự động với menu tài khoản.
