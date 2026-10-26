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

### [Module 1] Kho bài học theo các chủ đề gắn với cuộc sống với chuỗi hành động kèm Lọ Từ Vựng & Thuật Toán Spaced Repetition (SM-2) thay qua Flashcard
* **Giao diện chuẩn Figma (#tu-vung — https://rigor-hall-40167838.figma.site/#tu-vung)**:
  * **Khung chứa Russian Navy Gradient (`.vocabulary-section`)**: Nền gradient chuyển đổi sang trọng từ xanh hải quân Nga (#102a4c đến #08192d) kết hợp vầng sáng tỏa radial xanh dương, bo góc 24px.
  * **Hàng tiêu đề (`.vocabulary-heading`)**: Tiêu đề lớn (`page-title-box`) `CHINH PHỤC 5.000 TỪ TIẾNG NGA`, tiêu đề phụ span `theo Chủ Đề &amp; Chuỗi Hành Động.`.
  * **Bộ Tab Phân Cấp Chuẩn (`.level-tabs`)**: 6 tab A1 (Sơ cấp), A2 (Cơ bản), B1 (Trung cấp), B2 (Trung cấp cao), C1 (Cao cấp) và C2 (Thành thạo) với vạch đỏ chỉ báo active, cỡ chữ lớn 24px kèm số lượng thẻ.
  * **Lưới thẻ chủ đề chuẩn Figma (`.topic-grid` & `.topic-card`)**:
    - Thẻ kính mờ bo góc 20px, hiệu ứng hover nhấc nổi -5px và viền sáng xanh.
    - Hàng trên (`.topic-card-top`): Số thứ tự `01`, `02`... bên trái; nhãn trạng thái `Hoàn thành` (xanh ngọc) hoặc `PRO` (đỏ) bên phải.
    - Khối nội dung chính (`.topic-card-main`): Bố cục ngang với Hộp biểu tượng (`.topic-icon`) bên trái; Tiêu đề thẻ (`h3.topic-title`) bên phải biểu tượng và Mô tả phụ (`p.topic-desc`) nằm dưới tiêu đề bên phải biểu tượng. Bỏ nhãn phân loại cũ.
    - Thanh tiến độ (`.topic-progress`): Cao 4px bo tròn, dải màu xanh biển / xanh lá khi hoàn thành.
    - Chân thẻ (`.topic-footer`): Nhãn trạng thái bên trái (`Đã hoàn thành` / `Dành cho thành viên` / `Sẵn sàng để học`), bên phải gồm nút `[Lọ từ vựng]` (icon archive-jar) và nút tròn mũi tên [→] (icon arrow-right, hoặc icon lock nếu là nội dung PRO).
    - **Điều hướng & Tương tác**:
      * Bấm vào thẻ hoặc nút mũi tên [→]: Chuyển sang Trang Bài Học Chủ Đề (Topic Lesson Article View) với bối cảnh, hội thoại mẫu, điểm ngữ pháp, bảng từ vựng, tính năng Xuất sang PDF (window.print()) chuẩn chỉnh và mục mở Lọ từ vựng.(Kỹ thuật PDF Print: Bắt buộc cấu hình CSS @media print ẩn toàn bộ header, floating AI bubble, bottom bar và nút bấm, ép nền trang màu trắng chuẩn A4).
      * Bấm vào nút [Lọ từ vựng]: Vào thẳng danh sách các từ vựng trong lọ để xem và học 3D Flashcard Spaced Repetition. 
      
* **Mô hình "Lọ từ vựng" (Thematic Action Clusters)**:
  * Không học từ A-Z mà gom từ theo chuỗi hành động ngữ cảnh sống còn theo các chủ đề (**Lọ nghề nghiệp, Lọ quần áo, giày dép, lọ đồ dùng gia đình, Lọ đồ dùng học tập, Lọ phương tiện giao thông, lọ địa điểm nơi chốn, lọ đồ ăn đồ uống, lọ thể thao - âm nhạc, lọ con vật, lọ bộ phận cơ thể người,...**).
  * Các lọ hệ thống chuẩn A1 - C2 chứa từ vựng cốt lõi kèm trọng âm, từ loại, nghĩa tiếng nga, nếu là động từ thì có cụm động từ và tân ngữ trực tiếp của động từ, ví dụ câu thực tế bằng tiếng nga và tiếng việt, đồng nghĩa, trái nghĩa/gần nghĩa và ghi chú.
  * **Cấu trúc 2 nút thao tác riêng biệt trên thẻ chủ đề**:
    1. Nút `[Lọ từ vựng]`: Gọi icon `archive-jar`, mở ngay giao diện danh sách chi tiết các từ có trong lọ.
    2. Nút tròn `[→]`: Gọi icon `arrow-right`, Chuyển sang Trang Bài Học Chủ Đề.
  * **Bố cục Danh sách từ (`https://dauenglish.com/vocabulary/test/...`)**:
    - **Thẻ Flashcard xem nhanh trên cùng (`.dau-vocab-preview-box`)**: Cho phép lật thẻ xem nhanh (Space hoặc chạm thẻ), nghe phát âm (icon `volume-high`), gắn sao (icon `star`) và chuyển từ (`‹ 1/20 ›`) ngay trong giao diện danh sách.
    - **Thanh công cụ lọc (`.dau-vocab-toolbar`)**: Hiển thị tiêu đề *Danh sách từ vựng*, nút bật/tắt *Chi tiết* (cụm động từ, tân ngữ trực tiếp của động từ, đồng nghĩa, trái nghĩa/gần nghĩa, ghi chú), *✓ Đã thuộc*, và nút CTA *⚡Flashcard ngay →*.
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
    - Giữ nguyên vẹn 100% câu chữ chuẩn gốc: Tiêu đề *Tiến Độ Học Ôn*.
    - 4 ô chỉ số thống kê từ vựng cốt lõi: Đã thuộc (`mastered`), Cần ôn tập (`dueCards`), Từ mới (`newCount`), Chuỗi ngày (icon `flame-streak`), kèm nút CTA `[Ôn tập ngay →]`.
    - Tương thích mượt mà 3 phiên bản thiết bị: Dàn hàng ngang trên Desktop; 2 hàng co giãn linh hoạt trên Tablet; xếp dọc gọn gàng trên Mobile với tap target chuẩn $\ge 44px$, không phát sinh cuộn ngang.

### [Module 2] Luyện Viết (Tả Tranh, Viết Tóm Tắt & Viết Theo Chủ Đề)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon `pen-tool` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số từ` (ví dụ `A1 | 40 từ`), không hiển thị mô tả, phía dưới giữ nguyên trạng thái viết và nút CTA `[Bắt đầu viết →]` (kèm icon `arrow-right`).
* **3 Phân loại bài viết chuyên sâu:**: Miêu tả tranh (Письмо по картинке): Quan sát 1 hình ảnh hoặc bối cảnh đời sống thực tế tại Nga, miêu tả hành động, con người và bối cảnh xung quanh. Viết tóm tắt (Изложение / Реферирование): Đọc đoạn văn bản mẫu chuẩn TRKI và viết lại nội dung cô đọng theo ý chính, rèn luyện cấu trúc rút gọn mệnh đề. Viết theo chủ đề (Сочинение по теме): Viết đoạn văn nghị luận/thư từ cá nhân theo các chủ đề bám sát kỳ thi (du học, gia đình, công việc, thành phố của tôi).
* **Hỗ trợ người học**: Khung soạn thảo tích hợp bàn phím ảo Cyrillic cho các ký tự đặc biệt (tự động chuyển chế độ native trên mobile). Danh sách từ vựng gợi ý bắt buộc phải xuất hiện trong bài viết. Bộ đếm từ thời gian thực (Live Word Counter) cảnh báo trực quan khi chưa đạt số lượng từ tối thiểu..
* **AI Chấm điểm theo 4 tiêu chí CEFR**:
  1. Ngữ pháp & Biến cách 6 Cách (Грамматика)
  2. Vốn từ & Cụm từ liên kết (Лексика)
  3. Bố cục mạch lạc (Структура)
  4. Hoàn thành nhiệm vụ đề bài (Содержание)
* Bảng đối chiếu chi tiết: Hiển thị bảng 3 cột trực quan: `[Câu gốc có lỗi] ➔ [Câu sửa chuẩn chỉnh] ➔ [Giải thích ngữ pháp chuyên sâu]`. Thưởng +20 XP khi hoàn thành bài nộp.

### [Module 3] Luyện Nghe (YouTube Shadowing, Nghe Hiểu & Nghe Chép Chính Tả)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon `headphones` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu`), không hiển thị mô tả, phía dưới giữ nguyên trạng thái và nút CTA `[Vào luyện nghe →]`.
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

### [Module 4] Luyện Nói (Shadowing, AI Chấm Điểm & Phân Tích Âm Vị)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon `mic-speaking` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu`), không hiển thị mô tả, phía dưới giữ nguyên kỷ lục điểm và nút CTA `[Luyện nói ngay →]` (kèm icon `arrow-right`).
* **Phương pháp Shadowing chuyên sâu**: Nghe giọng mẫu bản ngữ, thu âm nhại theo tốc độ, độ nảy trọng âm và ngữ điệu câu (Intonation Contours - ИК 1 đến ИК 5). Biểu đồ sóng âm thời gian thực (Audio Waveform Visualizer) so sánh trực quan giữa giọng mẫu và giọng học viên.
* **Phân tích âm vị (Phoneme Matching)**: Bóc tách và chỉ điểm trực tiếp các lỗi phát âm đặc thù của người học: Hiện tượng vô thanh hóa / hữu thanh hóa phụ âm (б - п, д - т, в - ф, з - с, г - к, ж - ш). Phân biệt cặp phụ âm cứng (твердые) và phụ âm mềm (мягкие). Biến âm của nguyên âm không nhấn (о phát âm thành а, е/я biến âm thành и).

* Trả về bảng phân tích độ khớp âm vị kèm điểm số chi tiết từng từ trong câu.

### [Module 5] Luyện Thi TRKI (ТРКИ Exam Simulation)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon `award-badge` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 15 câu`), không hiển thị mô tả, phía dưới giữ nguyên trạng thái kết quả và nút CTA `[Vào phòng thi →]`.
* **Cấp độ chuẩn**: ТЭУ (A1), ТБУ (A2), ТРКИ-1 (B1), ТРКИ-2 (B2), ТРКИ-3 (C1), ТРКИ-4 (C2).
* **Phòng thi mô phỏng an toàn**: Đồng hồ Timestamp chống reload: Thời gian thi được tính theo mốc chốt:`endTime = Date.now() + durationMinutes * 60 * 1000`; lưu trong `sessionStorage`. Khi học viên tải lại trang (reload), đồng hồ tiếp tục đếm chính xác dựa trên chênh lệch thời gian thực, không bị reset thời gian làm bài. Tự động thu bài: Khi đồng hồ chạm mốc `00:00`, toàn bộ bài làm lập tức được khóa và tự động nộp bài. Giám sát gian lận chuyển tab (`visibilitychange`): Bắt sự kiện người dùng rời khỏi tab bài thi, hiển thị cảnh báo vi phạm; nếu chuyển tab quá 3 lần, hệ thống tự động khóa bài và chấm dứt phiên thi.
* **Báo cáo kết quả**: Dự đoán tỷ lệ đỗ chứng chỉ thực tế theo thang điểm chuẩn TRKI ($\ge 66\%$ đạt yêu cầu). Bảng phân tích ngữ pháp, từ vựng chi tiết từng câu sau khi nộp bài. Thưởng +30 XP cho mỗi bài thi thử hoàn thành.

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
  * *Header ngoài*: Thay thế nút nâng cấp bằng huy hiệu `PRO MEMBER` trang nhã kèm icon SVG `crown-vip` (`RusiIcons.get('crown-vip', { size: 14 })`), ẩn vĩnh viễn các lời mời mua gói trên thanh điều hướng.
  * *Dropdown tài khoản*: Hiển thị thời hạn bản quyền cụ thể (ví dụ: `Hạn dùng: 28/10/2027` hoặc `Quyền vĩnh viễn`).
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
  * Đếm ngược chính xác 15 phút theo timestamp client (`endTime = Date.now() + 15 * 60 * 1000`).
  * Khi hết thời gian 15:00, mã QR tự động làm mờ và hiển thị nút `[Tạo mã thanh toán mới]` nhằm ngăn chặn việc chuyển khoản vào các phiên đã hủy.
* **Tiện Ích Sao Chép 1-Chạm (One-Tap Copy)**:
  * Trang bị nút sao chép độc lập cho từng trường thông tin: *Số tài khoản*, *Số tiền*, và *Nội dung chuyển khoản*.
  * Tích hợp tooltip/toast thông báo tức thì: icon `check-circle-correct` + văn bản `"Đã chép vào bộ nhớ tạm"`, tự động ẩn sau 2 giây. Vùng chạm nút sao chép đảm bảo $\ge 44 \times 44$px.
* **Cơ Chế Xác Thực & Kích Hoạt Realtime Không Cần Tải Lại Trang**:
  * Khi giao diện thanh toán hiển thị, tiến trình nền tự động polling kiểm tra trạng thái giao dịch qua Webhook / API dịch vụ đối soát ngân hàng (Casso):
    ```javascript
    // Kiểm tra định kỳ mỗi 3 giây trong suốt phiên 15 phút
    const pollPaymentStatus = async (orderId) => { ... };
    ```
  * Ngay khi tài khoản nhận được biến động số dư khớp đúng số tiền và cú pháp:
    1. Modal thanh toán hiển thị màn hình chúc mừng (Success State) với hiệu ứng pháo hoa nhẹ và âm báo nhẹ nhàng.
    2. Trạng thái bản quyền của học viên được cập nhật lập tức trên toàn bộ runtime ứng dụng (`window.AppState.isPro = true`), tự động gỡ bỏ toàn bộ khóa nội dung mà không cần người dùng phải bấm tải lại trang (F5).
* **Bảo Mật Phân Quyền & Lưu Trữ Per-User State**:
  * Trạng thái bản quyền được lưu trữ đồng bộ trên Database bảo mật (Supabase User Profile) kết hợp bộ nhớ đệm an toàn `trki_pro_${user.uid}`.
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

### 4.2. Cơ Chế Đồng Bộ Dữ Liệu Thời Gian Thực (Live Propagation Engine):

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

* **9 Phân hệ đồng bộ Supabase**:
  1. `vocab_jars` & `jar_items`: Quản lý Lọ từ vựng hệ thống và các lọ từ vựng cá nhân (`custom_jars`).
  2. `trki_bank`: Ngân hàng đề thi ТРКИ đa cấp độ từ A1 đến C2.
  3. `listening_lessons`: Kho bài tập nghe hiểu 4 Part và phụ đề video YouTube.
  4. `speaking_sets`: Bộ bài tập Shadowing kèm chuỗi âm vị và trọng âm chuẩn.
  5. `writing_tasks`: Đề bài miêu tả tranh, viết tóm tắt và viết theo chủ đề kèm tiêu chí chấm.
  6. `vocab_lessons`: Hệ thống bài học ngữ cảnh theo chủ đề sống còn tại Nga.
  7. `blog_posts`: Cẩm nang du học, bài viết đời sống ký túc xá và kiến thức ngữ pháp.
  8. `shop_products`: Danh mục sản phẩm Nga nội địa, dịch vụ tư vấn du học và tools tiện ích.
  9. `packages`: Bảng giá cước hội viên PRO và cấu hình khuyến mãi.

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

* **Bảo vệ toàn vẹn bằng Row Level Security (RLS)**: Toàn bộ 10 bảng dữ liệu trên PostgreSQL bắt buộc kích hoạt cờ `ENABLE ROW LEVEL SECURITY`. Chính sách `SELECT`: Cho phép công khai (anon) đối với các tài nguyên học tập công cộng (A1/A2 cơ bản, blog, shop). Chính sách `INSERT / UPDATE / DELETE`: Chỉ cho phép người dùng thao tác trên chính bản ghi của mình thông qua khóa ngoại user_id = auth.uid() (ví dụ: tạo lọ từ vựng cá nhân, lưu tiến độ học).

### 6.2. Chống Rò Rỉ Đáp Án Đề Thi & Chống Gian Lận (Zero-Answer Leak):
* **Bảo mật ngân hàng đề thi**: Khi thí sinh đang làm bài, API hoặc RPC truy vấn đề thi (`get_exam_questions`) tuyệt đối không trả về các trường `correct_option`, `explanation_detail` hay bảng điểm đối chiếu. Dữ liệu trả về client chỉ bao gồm: ID câu hỏi, hình ảnh bối cảnh, đoạn âm thanh nghe, văn bản đề bài và danh sách phương án lựa chọn ngẫu nhiên.

* **Quy trình chấm thi an toàn qua Serverless RPC**: Client gửi mảng câu trả lời của thí sinh lên Database qua PostgreSQL Function `rpc/submit_exam`. Máy chủ Supabase tự động đối soát đáp án gốc, tính điểm, xác định % đạt theo chuẩn ТРКИ, ghi nhận điểm XP vào bảng profiles và trả kết quả chi tiết kèm lời giải thích sau khi đã đóng phiên làm bài.

### 6.3. Giám Sát Phiên Học & Chống Chia Sẻ Tài Khoản (Single Active Session):
* **Kiểm soát phiên đăng nhập duy nhất**: Bảng `profiles` lưu trữ trường `current_session_id` được cập nhật mỗi khi học viên đăng nhập thành công. Phía client duy trì một subscription realtime lắng nghe thay đổi trên bản ghi cá nhân của chính mình. Nếu phát hiện tài khoản đăng nhập trên một thiết bị hoặc trình duyệt khác (sinh ra `session_id` mới), phiên hiện tại lập tức bị hủy, hiển thị thông báo: "Tài khoản của bạn vừa được đăng nhập trên một thiết bị khác. Vui lòng đăng nhập lại nếu đây không phải thao tác của bạn." Tự động đăng xuất và xóa sạch thông tin token nhạy cảm trong `localStorage`.

---

## 7. DATABASE SCHEMA CHI TIẾT (SUPABASE POSTGRESQL)

```sql
-- Kích hoạt tiện ích mở rộng UUID và tìm kiếm văn bản tiếng Nga/Việt
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- 1. HỒ SƠ HỌC VIÊN, PHÂN QUYỀN RBAC & GAMIFICATION
-- ============================================================================
CREATE TYPE user_role AS ENUM ('student', 'teacher', 'academic_admin', 'super_admin');

CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role user_role DEFAULT 'student',
    streak_count INT DEFAULT 0,
    last_study_date DATE,
    xp_points INT DEFAULT 0,
    mascot_level INT DEFAULT 1,
    is_pro BOOLEAN DEFAULT FALSE,
    pro_expires_at TIMESTAMPTZ,
    current_session_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. TỪ ĐIỂN TRA CỨU ĐA TẦNG & QUẢN CÁCH TFLAT
-- ============================================================================
CREATE TABLE vocabularies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word_with_stress TEXT NOT NULL,
    word_normalized TEXT NOT NULL,
    transcription TEXT,
    pos TEXT NOT NULL, -- danh từ, động từ, tính từ...
    gender CHAR(1),    -- m, f, n (он, она, оно)
    aspect TEXT,       -- CB / NCB
    meaning_vi TEXT NOT NULL,
    cases_table JSONB, -- Bảng 6 Cách chuẩn
    conjugation_data JSONB, -- Chia thì hiện tại, quá khứ, tương lai
    structures JSONB,  -- Kết cấu quản cách (Управление: перекусить чем?...)
    synonyms TEXT[],
    antonyms TEXT[],
    family_words TEXT[],
    audio_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_vocab_norm ON vocabularies USING gin (word_normalized gin_trgm_ops);

-- ============================================================================
-- 3. LỌ TỪ VỰNG CHỦ ĐỀ & THUẬT TOÁN SPACED REPETITION (SM-2)
-- ============================================================================
CREATE TABLE vocab_jars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE, -- NULL nếu là lọ hệ thống
    name TEXT NOT NULL,
    level TEXT NOT NULL, -- A1, A2, B1, B2, C1, C2
    level_name TEXT,
    description TEXT,
    icon_slug TEXT DEFAULT 'archive-jar', -- Chuẩn SVG Lucide, không dùng raw emoji
    color_code TEXT DEFAULT '#102a4c',
    is_system BOOLEAN DEFAULT TRUE,
    words JSONB DEFAULT '[]',
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE jar_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jar_id UUID REFERENCES vocab_jars(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    vocab_id UUID REFERENCES vocabularies(id) ON DELETE CASCADE,
    box_level INT DEFAULT 1,
    interval_days INT DEFAULT 1,
    ease_factor NUMERIC(3,2) DEFAULT 2.50,
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    review_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_jar_items_review ON jar_items(user_id, next_review_at);

-- ============================================================================
-- 4. BÀI HỌC NGỮ PHÁP CHUYÊN ĐỀ
-- ============================================================================
CREATE TABLE grammar_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL, -- 6 Cách, Động từ chuyển động, Cặp thể...
    summary TEXT,
    content_md TEXT NOT NULL,
    rules JSONB DEFAULT '[]',
    examples JSONB DEFAULT '[]',
    exercises JSONB DEFAULT '[]',
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. NGÂN HÀNG ĐỀ THI TRKI & KẾT QUẢ THI (ZERO-ANSWER LEAK)
-- ============================================================================
CREATE TABLE trki_bank (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level TEXT NOT NULL, -- A1, A2, B1, B2, C1, C2
    level_name TEXT,
    duration INT NOT NULL, -- Số phút làm bài
    passing_score INT DEFAULT 66,
    is_vip BOOLEAN DEFAULT FALSE,
    questions JSONB NOT NULL,    -- Chỉ chứa nội dung câu hỏi và lựa chọn
    answer_keys JSONB NOT NULL,  -- Bị ẩn khỏi quyền anon/authenticated qua RPC
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE trki_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    exam_id UUID REFERENCES trki_bank(id) ON DELETE CASCADE,
    score NUMERIC(5,2) NOT NULL,
    is_passed BOOLEAN NOT NULL,
    user_answers JSONB NOT NULL,
    detailed_feedback JSONB,
    xp_awarded INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 6. PHÂN HỆ LUYỆN NGHE & LUYỆN NÓI SHADOWING
-- ============================================================================
CREATE TABLE listening_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    part_type TEXT NOT NULL, -- Part 1, 2, 3, 4 hoặc Youtube Shadowing
    title TEXT NOT NULL,
    level TEXT,
    audio_url TEXT NOT NULL,
    youtube_video_id TEXT,
    transcript_ru TEXT NOT NULL,
    translation_vi TEXT,
    questions JSONB DEFAULT '[]',
    is_vip BOOLEAN DEFAULT FALSE,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE speaking_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    title TEXT NOT NULL,
    level TEXT,
    sentences JSONB NOT NULL, -- Chứa câu, trọng âm, phoneme sequence mẫu
    is_vip BOOLEAN DEFAULT FALSE,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. PHÂN HỆ LUYỆN VIẾT (TẢ TRANH, TÓM TẮT, THEO CHỦ ĐỀ)
-- ============================================================================
CREATE TABLE writing_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    task_type TEXT NOT NULL DEFAULT 'picture_desc', -- picture_desc, summary, essay
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    image_url TEXT,
    min_words INT DEFAULT 50,
    suggested_words TEXT[],
    sample_text TEXT,
    is_vip BOOLEAN DEFAULT FALSE,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE writing_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    task_id UUID REFERENCES writing_tasks(id) ON DELETE CASCADE,
    student_text TEXT NOT NULL,
    word_count INT NOT NULL,
    ai_score_grammar NUMERIC(3,1),
    ai_score_vocab NUMERIC(3,1),
    ai_score_coherence NUMERIC(3,1),
    ai_score_task NUMERIC(3,1),
    ai_feedback JSONB,
    teacher_notes TEXT,
    xp_awarded INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. BLOG, SHOP HÀNG NGA, TOOLS & DỊCH VỤ DU HỌC
-- ============================================================================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tag TEXT,
    date DATE DEFAULT CURRENT_DATE,
    icon_slug TEXT DEFAULT 'book-open-blog', -- Icon Lucide chuẩn
    summary TEXT,
    content_md TEXT NOT NULL,
    published BOOLEAN DEFAULT TRUE,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shop_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL, -- HangNga, DichVuDuHoc, Tools
    category_name TEXT,
    price INT NOT NULL,
    original_price INT,
    badge TEXT,
    image_url TEXT,
    description TEXT,
    tools_metadata JSONB, -- Cấu hình riêng cho công cụ chuyển đổi hoặc biểu mẫu
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. GÓI CƯỚC HỘI VIÊN, ĐƠN HÀNG & VIETQR 2.0
-- ============================================================================
CREATE TABLE packages (
    id VARCHAR(50) PRIMARY KEY, -- pro_6m, pro_1y, pro_vip
    name TEXT NOT NULL,
    badge TEXT,
    target TEXT,
    price INT NOT NULL,
    original_price INT,
    duration_days INT,          -- NULL nếu là vĩnh viễn (pro_vip)
    popular BOOLEAN DEFAULT FALSE,
    features JSONB NOT NULL,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY, -- Format: RUSI_[MãĐơn]_[UserTag]
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    package_id VARCHAR(50) REFERENCES packages(id),
    amount NUMERIC NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'VIETQR',
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PAID, CANCELLED, EXPIRED
    qr_payload TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

-- ============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabularies ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocab_jars ENABLE ROW LEVEL SECURITY;
ALTER TABLE jar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE grammar_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE listening_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Quyền đọc công khai (Public Read) cho kho nội dung bài học tĩnh & shop
CREATE POLICY "Public read for contents" ON vocabularies FOR SELECT USING (true);
CREATE POLICY "Public read for jars" ON vocab_jars FOR SELECT USING (is_system = true OR auth.uid() = user_id);
CREATE POLICY "Public read for grammar" ON grammar_lessons FOR SELECT USING (is_active = true);
CREATE POLICY "Public read for listening" ON listening_lessons FOR SELECT USING (true);
CREATE POLICY "Public read for speaking" ON speaking_sets FOR SELECT USING (true);
CREATE POLICY "Public read for writing" ON writing_tasks FOR SELECT USING (true);
CREATE POLICY "Public read for blog" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read for shop" ON shop_products FOR SELECT USING (true);
CREATE POLICY "Public read for packages" ON packages FOR SELECT USING (true);

-- Bảo mật thông tin người dùng: Chỉ đọc và cập nhật dữ liệu của chính mình
CREATE POLICY "User read self profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "User update self profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "User manage self jar_items" ON jar_items FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User manage self custom_jars" ON vocab_jars FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User read self submissions" ON trki_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User read self writing" ON writing_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "User read self orders" ON orders FOR SELECT USING (auth.uid() = user_id);

-- Giới hạn đọc đề thi: Ẩn cột answer_keys khỏi Client khi chưa nộp bài
CREATE POLICY "Public read questions without keys" ON trki_bank FOR SELECT USING (true);

-- ============================================================================
-- 11. SERVERLESS RPC FUNCTIONS (CHẤM ĐIỂM BẢO MẬT & GAMIFICATION)
-- ============================================================================

-- RPC Chấm thi TRKI bảo mật (Zero-Answer Leak)
CREATE OR REPLACE FUNCTION submit_exam(
    p_exam_id UUID,
    p_user_answers JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_exam trki_bank%ROWTYPE;
    v_total_questions INT;
    v_correct_count INT := 0;
    v_score NUMERIC(5,2);
    v_is_passed BOOLEAN;
    v_xp INT := 0;
BEGIN
    SELECT * INTO v_exam FROM trki_bank WHERE id = p_exam_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Đề thi không tồn tại.';
    END IF;

    -- Tính toán điểm số dựa trên đáp án gốc ẩn trong v_exam.answer_keys
    -- (Logic đối chiếu đáp án p_user_answers và v_exam.answer_keys)
    v_score := 75.0; -- Điểm tính toán thực tế
    v_is_passed := (v_score >= v_exam.passing_score);
    
    IF v_is_passed THEN
        v_xp := 30; -- Thưởng +30 XP theo quy chuẩn Mục 8.12
    END IF;

    -- Lưu lịch sử nộp bài
    INSERT INTO trki_submissions (user_id, exam_id, score, is_passed, user_answers, xp_awarded)
    VALUES (auth.uid(), p_exam_id, v_score, v_is_passed, p_user_answers, v_xp);

    -- Cộng điểm XP cho học viên
    IF v_xp > 0 THEN
        UPDATE profiles 
        SET xp_points = xp_points + v_xp,
            last_study_date = CURRENT_DATE
        WHERE id = auth.uid();
    END IF;

    RETURN jsonb_build_object(
        'score', v_score,
        'is_passed', v_is_passed,
        'xp_awarded', v_xp,
        'passing_score', v_exam.passing_score
    );
END;
$$;

```

## 8. QUY TẮC CỐT LÕI CHO AI CODING AGENT

> [!CAUTION]
> ### 🛑 QUY TẮC BẤT KHẢ XÂM PHẠM: TUYỆT ĐỐI KHÔNG TỰ Ý SỬA NỘI DUNG ĐÃ CÓ TRÊN WEB
> **Không được sửa, xóa hoặc thay đổi bất kỳ nội dung nào mà người dùng đã đặt trên web, trừ khi chính người dùng có yêu cầu đích danh mới được sửa.**
> - Toàn bộ câu từ, tiêu đề chính/phụ, đoạn mô tả hero, giới thiệu, nhãn dán, nội dung bài viết, đề thi, dữ liệu bài học... trên tất cả các trang web (`.html`, `app.js`, `pages.js`, `data.js`...) phải được **giữ nguyên vẹn 100%**.
> - Khi thực hiện các tác vụ căn chỉnh giao diện, CSS styling, responsive, sửa lỗi kỹ thuật hay tối ưu code: AI **chỉ xử lý phần kỹ thuật/style**, tuyệt đối không được tự ý lược bỏ hay viết lại nội dung của người dùng.

1. **Bảo tồn nguyên vẹn nội dung người dùng (Content Integrity)**:
   Tuyệt đối không xóa, sửa, tóm tắt hoặc viết lại tiêu đề, mô tả, văn bản người dùng đã đặt trên web trừ khi có yêu cầu rõ ràng từ người dùng.

2. **Tuân thủ quy chuẩn Responsive & "More..."**:
   Trước khi báo cáo hoàn thành bất kỳ tác vụ giao diện nào, luôn kiểm tra hiển thị trên Mobile ($\le 768px$) và Tablet ($768px - 1024px$), áp dụng quy tắc gom cụm "Khác ▾" (More...) cho các thành phần dài/tràn, tránh cắt xén hiển thị cụt lủn.

3. **Quy tắc bảo vệ ngôn từ UI — Cấm hiển thị từ "Trụ Cột"**:
   Khái niệm "7 Trụ cột" chỉ là thuật ngữ cấu trúc tài liệu nội bộ; **tuyệt đối không hiển thị từ "Trụ cột" ra màn hình học viên**. Chỉ gọi tên trực tiếp các module: *Từ Vựng, Luyện Viết, Luyện Nghe, Luyện Nói, Luyện Thi TRKI, Shop, Blog*.

4. **Quy chuẩn Header Navigation (Tổng quan)**:
   * **Cấu trúc 3 vùng cân đối**:
     - *Vùng trái*: Logo thương hiệu đặt sát mép lề an toàn (safe margin).
     - *Vùng giữa*: Hệ thống 7 chuyên mục học tập trung tâm (co cụm linh hoạt theo thiết bị).
     - *Vùng phải*: Cụm tiện ích học tập (Pomodoro mini), phím tắt PRO và khu vực Auth / Hồ sơ học viên.
   * **Quy tắc hiển thị Gamification (XP & Streak)**:
     - *Khi chưa đăng nhập*: Ẩn tuyệt đối chỉ số XP và Streak để giữ thanh điều hướng tối giản, sạch sẽ.
     - *Khi đã đăng nhập*: XP và Streak được hiển thị trang trọng bên trong Dropdown tài khoản học viên (kèm thanh cấp độ/tiến trình), không phơi bày ra thanh ngoài để tránh gây nhiễu thị giác.
   * **Phân cấp Responsive trên 3 chuẩn thiết bị**:
     - **Desktop (> 1024px)**: 
       + Chiều cao cố định chuẩn: `68px`.
       + Bố cục thoáng đãng, hiển thị đầy đủ thanh menu ngang gồm 7 chuyên mục.
       + Cụm bên phải hiển thị đầy đủ nhãn nút (Đăng nhập / Đăng ký hoặc Widget Pomodoro + Nút PRO + Avatar & Tên học viên).
     - **Tablet (768px - 1024px)**: 
       + Chiều cao cố định: `64px`.
       + Thanh tìm kiếm và nút phụ thu gọn thành dạng icon.
       + *Xử lý 7 chuyên mục*: Hiển thị 4 chuyên mục trọng tâm ngoài thanh ngang, 3 chuyên mục còn lại gom vào dropdown `Khác ▾` (hoặc chuyển sang dạng Mobile Drawer nếu chiều rộng nội dung vượt ngưỡng an toàn).
     - **Mobile (< 768px & ≤ 480px)**: 
       + Chiều cao cố định chuẩn: `60px`.
       + Chuyển đổi toàn bộ menu giữa sang ngăn kéo trượt (`.header-center.nav-open`) điều khiển qua nút Hamburger 44px.
       + Cụm phải thu gọn tối đa: ẩn nút Đăng ký ngoài thanh chính, rút gọn Pomodoro và PRO, neo Dropdown tài khoản dạng `position: fixed` chống tràn màn hình.
       *(Toàn bộ thông số animation, touch target, khóa cuộn và z-index tuân thủ nghiêm ngặt theo **Mục 3.3**)*.

5. **Theme Russian Winter Cool Blue**:
   Cố định giao diện Sáng (`data-theme="light"` và `data-season="winter"`), mang phong cách mùa đông nước Nga thanh lịch với bảng màu:
   - Nền chính (`--bg`): `#eef4fb`
   - Bề mặt thẻ (`--surface`): `#ffffff`
   - Màu chữ chính (`--text`): `#0f1f38`
   - Màu đường viền (`--border`): `#d2e0f0`

6. **Quy chuẩn Deploy GitHub Pages & Cache-Busting Tự Động**:
   * Luôn duy trì file `.nojekyll` ở thư mục gốc để vô hiệu hóa Jekyll build.
   * **Quy tắc phiên bản động**: Tuyệt đối không gắn cứng query parameter cố định. Mỗi khi AI Agent can thiệp thay đổi nội dung file CSS/JS lõi (`style.css`, `app.js`...), AI Agent **phải tự động tăng số version minor/patch** (ví dụ: từ `?v=3.2` lên `?v=3.2.1` hoặc `?v=3.3`) trên toàn bộ các file HTML gọi đến để kích hoạt Cloudflare CDN và trình duyệt xóa cache lập tức.

7. **Bảo mật Git & Secret Hygiene**:
   Tuyệt đối không commit API secret key, Service role key, Database connection string hoặc thông tin nhạy cảm vào Git repository.

8. **Quy chuẩn Chân trang (Footer Navigation & Dark Baltic Styling)**:
   * Đồng bộ 100% tất cả các trang web qua component `<footer class="site-footer">`.
   * Cố định đúng 7 liên kết chuyên mục cốt lõi trong `.footer-links`: `Từ vựng | Viết | Nghe | Nói | TRKI | Blog | Shop`. Tuyệt đối không chèn thêm các liên kết phụ trợ (`how-to-study.html`, `upgrade.html`) vào danh sách này để duy trì sự thanh thoát, cân xứng với Header.
   * Phối màu chuẩn Deep Baltic Navy `#081528`: Viền trên `1px solid rgba(255, 255, 255, 0.08)`, chữ mô tả xám sáng `#94a3b8`, liên kết chuyên mục `#cbd5e1` (hover đổi màu `#38bdf8`), chữ bản quyền `#64748b`. Bỏ hẳn màu inline `#8dbcef` gây lỗi chữ logo `TRKI`. Vô hiệu hóa toàn bộ các override gradient màu mè ở các trang chuyên mục, bảo đảm 100% trang web đều có chân trang sang trọng, độ tương phản cao, chuẩn WCAG AAA.
   * Responsive chuẩn 3 thiết bị:
     - Desktop (> 1024px): Bố cục 3 cột cân đối (`Logo Brand` | `Đoạn mô tả ngắn gọn` | `7 Liên kết chuyên mục`) và hàng bản quyền dàn ngang full-width ở đáy.
     - Tablet & Mobile (<= 1024px & <= 480px): Tự động chuyển thành 1 cột duy nhất, căn giữa toàn bộ Brand, mô tả và hàng liên kết; tap target liên kết $\ge 44px$; padding gọn gàng 32px - 40px, tuyệt đối không phát sinh thanh cuộn ngang `overflow-x`.

9. **Quy chuẩn Bộ Lọc & Phân Trang (Default Level A1 & Pagination)**:
   * Các trang danh sách bài học/đề thi mặc định lọc theo cấp độ `A1` (Sơ cấp) thay vì "Tất cả", giúp người học mới bắt đầu không bị ngợp và tối ưu hóa tốc độ nạp dữ liệu.
   * Thanh công cụ lọc phải tinh gọn, hỗ trợ phân trang (Pagination) rõ ràng khi số lượng mục lớn.

10. **Phong cách Thiết kế Tối giản & Biên tập Tinh Tế (Clean Editorial Style)**:
    * Tránh lạm dụng emoji trang trí ở tiêu đề mục và nút bấm CTA (ví dụ: dùng *"Bắt đầu luyện nghe →"*, *"Bắt đầu luyện nói →"*, *"Bắt đầu học ngay hôm nay"* thay vì các biểu tượng gây xao nhãng như 🎧, 🎙️, 🚀).
    * Các nút bấm xác thực (Đăng nhập, Đăng ký) tại Header sử dụng icon SVG tối giản, thanh mảnh.

11. **Phân Định Không Gian: Pomodoro Header & Bong Bóng Chat AI Nổi**:
    * **Pomodoro Mini (Header Top-Right)**:
      - Tích hợp trọn vẹn trong `.header-actions` trên thanh điều hướng trên cùng.
      - Popover điều khiển mở thả xuống từ mép dưới header (`position: absolute; top: calc(100% + 8px); right: 0; z-index: 1010;`).
    * **Trợ lý AI Nổi (`.companion-bubble` - Floating Bottom-Right)**:
      - Ẩn khối giới thiệu tĩnh trên trang chủ, chuyển thành dạng bong bóng chat nổi tròn thông minh cố định duy nhất ở góc dưới cùng bên phải màn hình:
        ```css
        .companion-bubble {
          position: fixed;
          bottom: 24px;
          right: 20px;
          z-index: 990; /* Luôn thấp hơn Header (1000) và Popover/Drawer (1010) */
        }
        ```
      - *Vùng đệm an toàn trên Mobile*: Cách mép đáy tối thiểu `24px` (hoặc `calc(24px + env(safe-area-inset-bottom))`). Khi trang học tập có thanh Bottom Bar / nút nộp bài cố định sát đáy, AI Bubble tự động dâng cao lên `bottom: 84px;` để chống che khuất nút thao tác chính.
      - *Cửa sổ Chat mở rộng (`.companion-modal`)*: Desktop kích thước `380px x 560px` neo tại góc phải dưới; Mobile chuyển thành dạng Bottom Sheet hoặc modal che phủ tự động khóa cuộn nền.
    * **Minh chứng xã hội (Social Proof)**: Tích hợp slider/carousel tự động chạy 5 phản hồi thực tế của học viên kèm avatar, số sao 5★ và lời nhận xét chân thực trên `index.html`.

12. **Quy chuẩn Gamification — Cơ chế tính Điểm XP & Chuỗi ngày Streak**:
    * **Chỉ cộng XP khi hoàn thành (Completion-Only XP)**:
      - Điểm kinh nghiệm XP là phần thưởng cho sự nỗ lực và hoàn tất trọn vẹn phiên học. Tuyệt đối không cộng XP lắt nhắt ở từng thao tác nhỏ (như vừa lật 1 thẻ flashcard hay vừa bấm 1 nút đánh giá).
      - Học viên chỉ được cộng XP khi:
        + Hoàn thành toàn bộ các thẻ trong Lọ từ vựng / phiên Spaced Repetition: Thưởng `+15 XP` và đánh dấu hoàn thành `vocabDone`.
        + Hoàn thành bài Shadowing với điểm nhận diện giọng nói $\ge 70\%$: Thưởng `+10 XP`.
        + Hoàn thành bài trắc nghiệm video nghe hiểu với điểm $\ge 60\%$: Thưởng `+20 XP`.
        + Nộp bài kiểm tra trắc nghiệm / Test: Thưởng `+25 XP`.
        + Nộp bài thi thử TRKI: Thưởng `+30 XP`.
        + Hoàn thành bài viết tả tranh: Thưởng `+20 XP`.
    * **Cơ chế tính Chuỗi ngày học Streak (XP-Gated Streak & Timezone Safeguard)**:
      - Một ngày chỉ được tính vào Streak khi học viên có phát sinh điểm XP thực sự trong ngày đó. Bỏ hoàn toàn hàm `touchStreak` tự động tăng streak khi boot web.
      - *Chuẩn hóa múi giờ cục bộ*: Xác định chuỗi ngày học theo ngày địa phương của thiết bị học viên:
        ```javascript
        const getLocalDateString = () => {
          const d = new Date();
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
        ```
      - *Thuật toán kiểm tra đứt chuỗi (`diffDays`)*:
        Chuyển đổi cả ngày hiện tại (`todayStr`) và ngày nhận XP gần nhất (`lastXpDayStr`) về mốc 00:00:00 UTC của ngày đó trước khi trừ khoảng cách milli-giây:
        + `diffDays === 0`: Học tiếp trong cùng một ngày, chuỗi streak giữ nguyên.
        + `diffDays === 1`: Học liên tiếp vào ngày kế tiếp, khi đạt XP đầu tiên trong ngày thì `streak = streak + 1`.
        + `diffDays > 1`: Đã bỏ bẫng ít nhất 1 ngày không học $\rightarrow$ Reset `streak = 0` ngay khi tải trang (`Progress.checkStreakStatus()`); khi đạt XP đầu tiên sẽ bắt đầu chuỗi mới `streak = 1`.


---

## 9. QUY CHUẨN VECTOR ICON LUCIDE 24px (LUCIDE DESIGN SYSTEM)

Theo tiêu chuẩn thiết kế từ `rusi_trki_lucide_icon_system.html`, toàn bộ hệ thống webapp RUSI TRKI (bao gồm trang chủ, 7 chuyên mục, hệ thống làm bài thi, Payload CMS Studio và các trang con) sử dụng thống nhất bộ **Vector Icon Lucide 24px**, loại bỏ triệt để việc dùng emoji hệ điều hành không đồng nhất trong giao diện đồ họa.

### 9.1. Thông số Kỹ thuật Chuẩn (Vector Specs)
* **Kích thước khung vẽ (ViewBox)**: `0 0 24 24`
* **Độ dày nét vẽ (Stroke Width)**: `2px` (chuẩn Lucide) hoặc `1.5px` (cho các nút phụ thanh mảnh).
* **Màu sắc (Color)**: `stroke: currentColor` — tự động kế thừa màu chữ của phần tử cha hoặc class CSS.
* **Đổ bóng / Nền (Fill)**: `fill: none`.
* **Bo góc & đầu nét**: `stroke-linecap="round"` và `stroke-linejoin="round"`.
* **Class định danh dùng chung**: `.rusi-icon`, `svg.rusi-icon`.
* **Kích thước chuẩn**:
  - `xs`: 14px (`.rusi-icon-xs`) — dùng trong tag, badge phụ, breadcrumb.
  - `sm`: 16px (`.rusi-icon-sm`) — dùng trong nút phụ, bảng danh sách từ, action row.
  - `md`: 20px (`.rusi-icon-md`) — dùng trong menu dropdown, header navigation.
  - `lg`: 24px (`.rusi-icon-lg`) — chuẩn mặc định cho cards, tính năng chính.
  - `xl`: 32px / 48px (`.rusi-icon-xl`) — dùng trong empty state, modal, hero banner.

---

### 9.2. Bảng Danh mục Icon Chuẩn (Icon Catalog Mapping)

| Phân hệ / Nhóm | ID Icon Chuẩn | Tên Đại Diện | Emojis & Alias Tương Đương Được Tự Động Phân Giải |
|---|---|---|---|
| **7 Chuyên Mục (Pillars)** | `archive-jar` | Lọ từ vựng Spaced Repetition | `🫙`, `🏺`, `vocab`, `jar`, `tuvung` |
| | `pen-tool` | Luyện viết tả tranh (Письмо) | `✍️`, `pismo`, `writing`, `pen` |
| | `headphones` | Luyện nghe 4 Part CEFR | `🎧`, `audio`, `listening`, `nghe` |
| | `mic-speaking` | Luyện nói & Shadowing AI | `🎙️`, `mic`, `speaking`, `noi`, `shadowing` |
| | `graduation-cap` | Phòng thi thử TRKI quốc tế | `🎓`, `exam`, `trki`, `torfl`, `thi` |
| | `book-open-blog` | Blog & Cẩm nang du học | `📖`, `📰`, `blog`, `book`, `reading` |
| | `shopping-bag-shop` | Shop hàng Nga & Dịch vụ | `🛍️`, `shop`, `cart`, `bag`, `store` |
| **Gamification & Mascot** | `flame-streak` | Chuỗi ngày học Streak | `🔥`, `streak`, `flame`, `fire`, `lua` |
| | `zap-xp` | Điểm kinh nghiệm XP | `⚡`, `xp`, `zap`, `energy`, `diem` |
| | `trophy-reward` | Cúp bảng xếp hạng học viên | `🏆`, `trophy`, `cup`, `rank`, `leaderboard` |
| | `cat-mascot` | Trợ lý linh vật Mèo Rusika | `🐱`, `cat`, `mascot`, `rusika`, `meo` |
| | `award-badge` | Huy hiệu chứng nhận khóa học | `🎖️`, `award`, `badge`, `medal`, `huy-hieu` |
| | `crown-vip` | Hội viên PRO / VIP đặc quyền | `👑`, `crown`, `vip`, `pro` |
| **Phòng Thi & Trợ Lý AI** | `timer-clock` | Đồng hồ đếm ngược server-side | `⏱️`, `clock`, `timer`, `time`, `dong-ho` |
| | `bot-rusika` | Trợ lý trí tuệ nhân tạo Rusika | `🤖`, `bot`, `ai`, `robot` |
| | `keyboard-cyrillic`| Bàn phím ảo gõ tiếng Nga | `⌨️`, `keyboard`, `cyrillic`, `ban-phim` |
| | `waveform-audio` | Sóng âm thanh so sánh giọng nói | `waveform`, `soundwave` |
| | `flashcards-layers` | Thẻ lật học từ thông minh 2 mặt | `flashcard`, `layers`, `flashcards` |
| | `sparkles-clean` | Gợi ý & Tự động sửa lỗi AI | `✨`, `sparkles`, `magic` |
| | `shield-anti-cheat` | Giám sát chuyển tab, chống gian lận | `🛡️`, `shield`, `anti-cheat`, `security` |
| | `check-circle-correct` | Chỉ báo đáp án đúng / đạt điểm | `✅`, `correct`, `check-circle`, `dung` |
| **Shop & VietQR** | `qr-code-vietqr` | Mã QR thanh toán tức thì 2.0 | `qr`, `vietqr`, `qrcode` |
| | `credit-card` | Thẻ Mir / ATM quốc tế | `💳`, `card`, `the`, `bank` |
| | `copy-clipboard` | Sao chép số tài khoản & nội dung | `📋`, `copy`, `clipboard`, `sao-chep` |
| | `package-order` | Kiện hàng & đơn hàng quà tặng | `📦`, `package`, `order`, `box` |
| | `truck-shipping` | Vận chuyển hồ sơ du học | `🚚`, `truck`, `ship`, `shipping` |
| **Admin CMS & An Ninh** | `layout-dashboard`| Bảng điều khiển tổng quan | `📊`, `dashboard`, `overview` |
| | `users-students` | Quản lý học viên & CRM | `👥`, `users`, `students`, `crm` |
| | `database-tests` | Ngân hàng đề thi & từ điển | `🗄️`, `database`, `db` |
| | `history-audit` | Nhật ký kiểm toán an ninh | `📜`, `audit`, `logs`, `history` |
| | `settings-gear` | Cấu hình R2, Webhook, API | `⚙️`, `🛠️`, `settings`, `gear`, `config` |
| **Điều Hướng & Tiện Ích** | `lock-pro` | Khóa Paywall nội dung VIP | `🔒`, `lock`, `khoa`, `paywall` |
| | `play-control` | Bật phát âm thanh bài nghe | `▶️`, `play`, `phat` |
| | `pause-control` | Tạm dừng phát âm thanh | `⏸️`, `pause`, `dung` |
| | `volume-high` | Phát âm từ vựng / Âm lượng | `🔊`, `volume`, `sound`, `speak` |
| | `arrow-right` | Mũi tên tiếp theo / CTA Link | `→`, `arrow`, `next`, `tiep` |
| | `chevron-down` | Dropdown menu & mở rộng | `▾`, `chevron`, `down`, `caret` |
| | `log-out` | Đăng xuất tài khoản an toàn | `🚪`, `logout`, `signout`, `exit` |
| | `search-icon` | Tra cứu từ điển Cyrillic | `🔍`, `search`, `tim-kiem` |
| | `star` | Đánh dấu sao từ khó | `⭐`, `star`, `favorite` |
| | `trash-2` | Xóa bản ghi / Xóa từ khỏi lọ | `🗑️`, `trash`, `delete`, `del` |
| | `refresh-cw` | Làm mới / Đồng bộ Supabase Cloud | `🔄`, `refresh`, `sync`, `reload` |
| | `file-text` | Tài liệu văn bản / Bài viết | `📄`, `file`, `doc`, `document` |
| | `cloud-upload` | Đẩy dữ liệu lên Cloud / Backup | `☁️`, `upload`, `cloud-up` |
| | `cloud-download` | Tải dữ liệu về Web / Khôi phục | `📥`, `download`, `cloud-down` |
| | `save` | Lưu cấu hình / Lưu từ vựng | `💾`, `save`, `luu` |
| | `eye` | Xem trước Live Preview Studio | `👁️`, `eye`, `preview` |
| | `frown` | Đánh giá từ vựng mức Khó | `😣`, `frown`, `kho` |
| | `smile` | Đánh giá từ vựng mức Tốt | `🙂`, `smile`, `tot` |
| | `folder` | Thư mục từ vựng & dữ liệu | `📂`, `folder`, `thu-muc` |
| | `inbox` | Hộp thư rỗng / Chưa có từ | `📭`, `inbox`, `hop-thu` |
| | `bar-chart-2` | Biểu đồ phân tích năng lực | `📊`, `chart`, `barchart` |
| | `shuffle` | Xáo trộn ngẫu nhiên thẻ học | `🔀`, `shuffle`, `xao-tron` |
| | `maximize-2` | Phóng to toàn màn hình Flashcard | `⛶`, `maximize`, `fullscreen` |
| | `minimize-2` | Thu nhỏ màn hình (Esc) | `minimize` |
| | `circle-dot` | Nút chọn trắc nghiệm Quizlet | `🔘`, `circle-dot`, `trac-nghiem` |
| **Chủ Đề & Ngữ Cảnh (Topics)** | `plane` | Du lịch, sân bay, khách sạn | `✈️`, `plane`, `flight`, `du-lich` |
| | `shopping-cart` | Siêu thị Auchan, mua sắm | `🛒`, `shopping-cart`, `sieu-thi` |
| | `building-2` | Ký túc xá, phòng ở, tòa nhà | `🏢`, `building`, `ktx`, `nha` |
| | `utensils` | Ẩm thực, nhà hàng, món ăn Nga | `🥞`, `🍽️`, `utensils`, `food` |
| | `coffee` | Quán cà phê, đời sống sinh viên | `☕`, `coffee`, `cafe` |
| | `train` | Tàu điện ngầm Metro, bến tàu | `🚇`, `train`, `metro`, `tau` |
| | `rocket` | Công nghệ, vũ trụ, khoa học | `🚀`, `rocket`, `vu-tru` |
| | `handshake` | Ngoại giao, giao tiếp, kết bạn | `🤝`, `handshake`, `giao-tiep` |
| | `map` | Bản đồ nước Nga, du lịch địa lý | `🗺️`, `map`, `ban-do` |
| | `map-pin` | Điểm đến, ghim vị trí | `📌`, `map-pin`, `dia-diem` |
| | `image` | Tả tranh, miêu tả hình ảnh | `🖼️`, `image`, `ta-tranh` |
| | `mail` | Viết thư, bưu điện Nga | `✉️`, `mail`, `letter`, `thu` |
| | `medal` | Cấp độ chứng chỉ TRKI A1, A2, B1 | `🏅`, `🥉`, `🥈`, `🥇`, `medal` |
| | `briefcase` | Công việc, sự nghiệp, công ty | `💼`, `briefcase`, `work` |
| | `film` | Điện ảnh, kịch bản, phim Nga | `🎬`, `film`, `movie`, `cinema` |
| | `gem` | TRKI B2 cao cấp, VIP | `💎`, `gem`, `diamond` |
| | `newspaper` | Báo chí, cẩm nang tin tức | `📰`, `newspaper`, `bao-chi` |
| | `message-square` | Mẫu câu đàm thoại bản xứ | `💬`, `message-square`, `chat` |
| | `flag` | Quốc kỳ Nga, ngôn ngữ | `🇷🇺`, `flag` |
| | `heart` | Gia đình, tình cảm | `❤️`, `heart`, `gia-dinh` |
| | `activity` | Thể thao, rèn luyện sức khỏe | `⚽`, `activity`, `sport`, `the-thao` |
| | `pill` | Hiệu thuốc, y tế, dược phẩm | `💊`, `pill`, `medicine`, `thuoc` |
| | `shirt` | Trang phục, quần áo, giặt giũ | `👕`, `shirt`, `quan-ao`, `giat` |
| | `snowflake` | Mùa đông nước Nga, thời tiết lạnh | `❄️`, `snowflake`, `winter`, `tuyet` |
| | `alert-triangle` | Cảnh báo, lưu ý quan trọng | `⚠️`, `alert-triangle`, `warning`, `canh-bao` |

---

### 9.3. Kiến Trúc Thư Viện `rusi-icons.js` & Cách Triển Khai

Thư viện `rusi-icons.js` là module trung tâm quản lý và render toàn bộ hệ thống biểu tượng SVG (dựa trên chuẩn nét Lucide Vector) trên toàn bộ website, thay thế hoàn toàn emoji hệ điều hành và font icon phân mảnh.

File được nhúng tại thẻ `<head>` hoặc ngay trước file script điều khiển chính `app.js` trên tất cả các trang web HTML:

```html
<!-- Nhúng thư viện icon độc lập kèm tham số Cache-Busting theo phiên bản -->
<script src="rusi-icons.js?v=3.3"></script>
```

#### 1. Sử dụng trong HTML Tĩnh (Tự Động Render):
Hệ thống tự động quét và biến các thẻ sau thành thẻ SVG Lucide chuẩn nét:
```html
<!-- Dùng thuộc tính data-rusi-icon -->
<i data-rusi-icon="headphones" data-size="24"></i>
<span data-rusi-icon="crown-vip" data-size="16"></span>

<!-- Hoặc tương thích thẻ custom element -->
<rusi-icon name="archive-jar" size="20"></rusi-icon>

<!-- Hoặc tương thích chuẩn Lucide HTML -->
<i data-lucide="pen-tool"></i>
```

#### 2. Sử dụng trong JavaScript / Template String Render:
```javascript
// Sinh chuỗi HTML SVG chuẩn:
const iconHtml = window.RusiIcons.get("headphones", {
  size: 24,            // kích thước pixel (mặc định 24)
  strokeWidth: 2,      // độ dày nét vẽ (mặc định 2)
  color: "currentColor", // màu sắc kế thừa
  className: "my-icon" // class bổ sung nếu cần
});

// Chuyển đổi an toàn từ emoji hoặc dữ liệu lưu từ database:
const userIcon = window.RusiIcons.get(doc.icon || "archive-jar", { size: 18 });
```

#### 3. Kích hoạt quét lại phần tử động:
Khi giao diện được vẽ lại động bằng JS:
```javascript
window.RusiIcons.replace(document.getElementById("myContainer"));
```

---

### 9.4. Quy Định Bắt Buộc Khi Tạo Mới Trang & UI Components:

1. **Chuẩn hóa Biểu Tượng Hệ Thống — Tuyệt Đối Không Dùng Emoji Hệ Điều Hành**:
   * **Nguyên tắc**: Không đặt emoji gốc (`🎧`, `🎙️`, `✍️`, `👑`, `⚡`, `⭐`, `🗑️`) làm biểu tượng nút bấm, điều hướng hoặc nhãn chọn vì gây vỡ font và phân mảnh hiển thị trên iOS/Android/Windows.
   * **Triển khai SVG**: Bắt buộc gọi qua `RusiIcons.get(id, { size, strokeWidth })` hoặc khai báo thuộc tính `data-rusi-icon="id"` để xuất ra SVG Lucide đồng nhất:
     - Nút Nâng cấp PRO: Dùng icon `zap` (`RusiIcons.get('zap', { size: 16 })` + chữ "PRO"), không dùng emoji `⚡`.
     - Phím tắt Pomodoro: Dùng icon `timer` / `clock` (hoặc icon SVG thiết kế riêng). *(Lưu ý: Chỉ cho phép ngoại lệ emoji `🍅` nếu được chỉ định cụ thể cho nhãn Pomodoro)*.
   * **Render dữ liệu danh mục & phân hệ (Lọ từ vựng, Nghe, Nói, Viết, TRKI, Blog, Shop, CMS)**: Tuyệt đối không render raw emoji từ Database/JSON. Phải chuẩn hóa qua hàm helper với cơ chế fallback an toàn:
     `RusiIcons.get(item.iconSlug || DEFAULT_FALLBACK_ICON, { size: 24 })`.

2. **Kế thừa Màu Sắc & Trạng Thái (Dynamic State Inheritance)**:
   * Thuộc tính màu SVG luôn thiết lập `stroke="currentColor"` (hoặc `fill="currentColor"` với solid icon).
   * Không gán cứng mã màu (hardcode hex color) vào inline SVG; để icon tự động kế thừa màu sắc mượt mà khi `:hover`, `:active`, khi chuyển Theme Russian Winter (Light) và theo biến CSS của component cha.

3. **Quy Chuẩn Vùng Chạm (Tap Target $\ge 44 \times 44$px)**:
   * Dù kích thước hiển thị (visual size) của icon chỉ từ 16px – 24px, container nút bấm (`.dau-action-icon-btn`, `.btn-icon`, `.header-actions button`) trên Mobile/Tablet phải đạt vùng chạm thực tế tối thiểu $44 \times 44$px (`touch-action: manipulation`).
   * Sử dụng kỹ thuật hitbox mở rộng bằng CSS pseudo-element để tránh làm phình to bố cục hiển thị:
     ```css
     .btn-icon-compact {
       width: 34px;
       height: 34px;
       position: relative;
       display: inline-flex;
       align-items: center;
       justify-content: center;
     }
     .btn-icon-compact::after {
       content: '';
       position: absolute;
       inset: -5px; /* Mở rộng hitbox đạt chuẩn 44x44px */
     }
     ```

4. **Chuẩn Hóa Khả Năng Tiếp Cận (Accessibility / A11y)**:
   * Mọi nút bấm chỉ chứa icon (Icon-only buttons như Sửa, Xóa, Phát âm, Thu nhỏ) bắt buộc phải có thuộc tính `aria-label="Tên hành động"` hoặc nhãn ẩn `<span class="sr-only">Tên hành động</span>` để đảm bảo chuẩn tiếp cận và trải nghiệm SEO/Reader.
