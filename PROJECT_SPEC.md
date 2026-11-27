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
  * **Bố cục Danh sách từ trong Lọ (`.rusi-vocab-row-card`)**:
    - **Giao diện danh sách từ vựng tinh giản tối đa**: Đã loại bỏ hoàn toàn khối `.rusi-vocab-preview-box` và thanh công cụ `.rusi-vocab-toolbar`. Khi mở danh sách Lọ từ vựng, hệ thống hiển thị trực quan ngay danh sách các thẻ từ vựng hàng ngang (`.rusi-vocab-row-card`).
    - **Hiển thị danh sách thẻ hàng ngang chuẩn (`.rusi-vocab-row-card`)**: Bố cục 3 phần trực quan (Trái: Từ tiếng Nga in đậm kèm trọng âm & từ loại; Giữa: Nghĩa tiếng Việt & câu ví dụ song ngữ, cụm động từ, tân ngữ trực tiếp của động từ, đồng nghĩa, trái nghĩa/gần nghĩa, và ghi chú; Phải: Bộ nút hành động phát âm (icon `volume-high`), ✓ đánh dấu đã thuộc, tra cách chia (icon `book-open`), lưu lọ cá nhân (icon `archive-jar`)).
    - **Kích hoạt tức thì**: Khi bấm `[Lọ từ vựng]` trên lọ từ vựng, hệ thống tự động kích hoạt ngay tab danh sách (`initialMode = "list"`) và hiển thị dữ liệu ngay lập tức, không để xảy ra tình trạng trống trắng.
  * Hỗ trợ học viên PRO tự tạo lọ từ vựng cá nhân (`custom_jars`):
    - Nút "Thêm lọ từ vựng mới" (`.voc-user-jar-card-add` và `#btnSidebarCreateJarTop`, `#btnSidebarCreateJarBottom`) mở modal tạo lọ cá nhân `openCreateJarModal()`.
    - Biểu tượng mặc định luôn là `archive-jar` (SVG Lucide chuẩn thiết kế), không cho người dùng nhập hoặc chọn icon tùy tiện nhằm bảo đảm tính đồng bộ và thẩm mỹ cao cấp.
* **Thuật toán lặp lại ngắt quãng SM-2 / Hộp Leitner (`srs.js`)**:
  * Vòng đời thẻ: Unseen -> New -> Learning -> Reviewing -> Mastered.
  * Chu kỳ giãn cách: Từ mới (Again = 5 thẻ, Hard = 6h, Good = 1 ngày, Easy = 3 ngày); Từ đã ôn (Hard x 2, Good x 3, Easy x 4).
  * Đánh giá 4 mức SRS trực tiếp trên Flashcard: `Again (Ôn lại)`, `Hard (Khó)`, `Good (Nhớ tốt)`, `Easy (Dễ)` đồng bộ trực tiếp vào tiến độ học (`Progress`) và thuật toán SRS.
  * Tự động lọc danh sách "Đến hạn hôm nay" (`dueCards`).
  * Thuật toán thực tế là nhân hệ số cố định như trên (không phải SM-2, không có ease factor). `Again` (và `Hard` với từ mới) trả `requeue: true` → flashcard chèn lại thẻ sau `SRS_AGAIN_REINSERT_AFTER` (5) thẻ trong phiên.
  * **Lưu trữ**: localStorage (`trki_srs` — thẻ có `updatedAt`, `resetAt`; `trki_srs_totalReviews/Correct`; `trki_vocab_mastered_words`; `trki_custom_jars`; `trki_quizlet_starred`). Mọi thay đổi các khóa này qua `STORE.set` đặt `trki_vocab_changed_at`.
  * **Đồng bộ cloud** (`vocab-sync.js` → cột `user_progress.vocab_state`, migration `20261125190000_user_progress_vocab_state.sql`): khi tải trang chỉ đọc mốc `vocab_state->>updatedAt`; tải cả khối khi mốc cloud mới hơn `trki_vocab_synced_at`. Gộp từng thẻ theo `updatedAt`, bỏ thẻ cũ hơn `resetAt`; lọ/từ gắn sao/từ đã thuộc lấy bản cloud nếu máy không có thay đổi chưa gửi, ngược lại gộp hợp. Chỉ đẩy lên sau khi kéo về thành công. `Progress.syncToCloud` gom ghi `user_progress` (debounce 2 giây, ghi ngay khi ẩn tab/rời trang/đăng xuất qua `Progress.flushSync`).
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
* **Giao diện thẻ tối giản chuẩn mới (`.rusi-card-compact`)**: Nhỏ gọn, icon `headphones` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu`), không hiển thị mô tả, phía dưới nút CTA `[Vào luyện nghe →]`.
* **Bố cục Shadowing Studio chuẩn (2 Cột Hiện Đại)**:
  * **Cột trái (Video & Luyện câu trọng tâm)**:
    - Khung video YouTube 16:9 bo góc mượt mà kèm lớp phủ phụ đề nổi (`.rusi-shadow-sub-overlay`) hiển thị song ngữ câu đang chọn.
    - Thanh điều khiển tốc độ phát (0.75x, 1.0x, 1.25x) tương tác qua YouTube Iframe API và nút ẩn/hiện dịch nghĩa.
    - Thẻ luyện câu trung tâm (`.rusi-sentence-card`): câu tiếng Nga in to có trọng âm, số lần tự lặp (1×, 2×, 3×), nút phát âm mẫu (icon `volume-high`), nút thu âm (icon `mic-speaking`), sóng âm (.waveform-box), nhận diện giọng nói ru-RU và vòng tròn chấm điểm `% chính xác`. Thưởng +10 XP khi đạt $\ge 70\%$.
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
* **Giao diện thẻ tối giản chuẩn mới (`.rusi-card-compact`)**:
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
  - **Chuẩn hóa chuỗi âm học tiếng Nga**: Loại bỏ dấu trọng âm kết hợp Unicode (`\u0301`), chuẩn hóa chữ cái `ё` thành `е`, loại bỏ toàn bộ dấu câu ngữ pháp (`.,!?;:“”"'-()`) trước khi so khớp.
  - **Thuật toán Ma trận Quy hoạch động Levenshtein (Token-level WER)**:
    * Tính toán ma trận khoảng cách hiệu chỉnh giữa mảng từ chuẩn $R = \{r_1, \dots, r_n\}$ và mảng từ học viên nói $H = \{h_1, \dots, h_m\}$.
    * Độ chính xác phát âm:
      $$\text{Accuracy} = \max\left(0, \min\left(100, \operatorname{round}\left(\left(1 - \frac{\text{Tổng lỗi hiệu chỉnh}}{n}\right) \times 100\right)\right)\right)$$
    * Thuật toán truy vết ngược (Backtracking) xếp loại từng từ vào 4 trạng thái:
      1. `correct`: Phát âm chuẩn xác $\rightarrow$ Tô màu xanh ngọc (`.sp-word-correct`).
      2. `wrong`: Phát âm sai lệch hoặc lẫn lộn $\rightarrow$ Tô màu đỏ gạch (`.sp-word-wrong`), đính kèm tooltip hiển thị từ nhận diện được: `Nhận diện: “...”`.
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
* **Giao diện thẻ tối giản chuẩn mới (`.rusi-card-compact`)**: Nhỏ gọn, icon `award-badge` bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 34 câu`), không hiển thị mô tả, phía dưới 2 nút CTA: `[Chọn phần luyện ▾]` và `[Vào thi Full →]`.
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
1. **Gói 1 Tháng (`pro_1m`) — [Nhãn: Nước Rút]**:
   * *Phạm vi đặc quyền*: Mở khóa toàn bộ 74 đề thi ТРКИ A1 – B2; bấm giờ thi thật & chấm điểm tự động; xem đáp án & giải thích 6 cách chi tiết; AI nhận diện phát âm cơ bản.
   * *Phù hợp*: Học viên còn 2–4 tuần nữa vào phòng thi thật, cần cày đề cấp tốc để quen áp lực phòng thi. Giá: 399.000 VNĐ (Gốc: 590.000 VNĐ, ~13.300đ/ngày).
2. **Gói 3 Tháng (`pro_3m`) — [Nhãn: Phổ Biến Nhất]**:
   * *Phạm vi đặc quyền*: Tất cả quyền lợi gói 1 Tháng + Không giới hạn tạo Lọ từ vựng cá nhân; mở khóa trọn bộ kho Luyện nghe 4 Part CEFR; Luyện nói Shadowing cùng AI toàn bộ 28 bài; biểu đồ radar phân tích điểm mạnh / yếu.
   * *Biểu tượng nhãn*: Huy hiệu nổi bật đi kèm icon `sparkles-clean` (`RusiIcons.get('sparkles-clean', { size: 14 })`). Giá: 899.000 VNĐ (Gốc: 1.450.000 VNĐ, ~300.000đ/tháng - Tiết kiệm 25%).
3. **Gói 1 Năm (`pro_1y`) — [Nhãn: Giá Trị Cao Nhất]**:
   * *Phạm vi đặc quyền*: Tất cả quyền lợi gói 3 Tháng + AI Rusika chấm bài Viết tự luận (Письмо) không giới hạn; kho 100+ Lọ từ vựng chuyên ngành (Y khoa, Kỹ thuật, Kinh tế); tặng bộ cẩm nang sinh tồn du học Nga; ưu tiên hỗ trợ học thuật 1-1.
   * *Biểu tượng nhãn*: Huy hiệu hoàng gia đi kèm icon `crown-vip` (`RusiIcons.get('crown-vip', { size: 14 })`). Giá: 1.899.000 VNĐ (Gốc: 3.500.000 VNĐ, ~158.000đ/tháng - Tiết kiệm 60%).

* **Chiến Lược Mỏ Neo Giá & Hiệu Ứng Chim Mồi (Decoy Effect)**:
  | Gói cước | Giá bán | Giá niêm yết | Chi phí tương đương | Tâm lý học chuyển đổi (Conversion Psychology) |
  | :--- | :---: | :---: | :---: | :--- |
  | **Gói 1 Tháng (`pro_1m`)** | **399.000đ** | `590.000đ` | ~13.300đ / ngày | Mỏ neo giá cấp bách, học viên sắp thi tự quyết định nhanh không cần đắn đo. |
  | **Gói 3 Tháng (`pro_3m`)** | **899.000đ** | `1.450.000đ` | ~300.000đ / tháng | **Gói chủ lực (Sweet Spot)**: Thấy rõ mua 3 tháng rẻ hơn mua lẻ 300k, chiếm 50–60% đơn hàng. |
  | **Gói 1 Năm (`pro_1y`)** | **1.899.000đ** | `3.500.000đ` | ~158.000đ / tháng | Lựa chọn tối ưu cho phụ huynh đầu tư suốt 1 năm dự bị (Подфак) chỉ ~5k/ngày. |

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
  * Mã đơn sinh ở client (`app.js`) theo cấu trúc `RUSI_[timestamp ms]_[UserTag]` (ví dụ: `RUSI_1764051234567_Q9F2`) và dùng luôn làm nội dung chuyển khoản. Ảnh QR tạo qua `img.vietqr.io` với `amount` = giá gói, `addInfo` = mã đơn.
  * Mã nội dung chuyển khoản được mã hóa gọn gàng, tương thích tuyệt đối với cú pháp quét quang học của hệ sinh thái Napas247 và các ứng dụng ngân hàng di động tại Việt Nam.
* **Đồng Hồ Đếm Ngược Phiên Giao Dịch (15:00 Session Timer)**:
  * Hiện trạng: đồng hồ 15:00 tính ở client (`Date.now() + 15 phút`). Mục tiêu: server ghi `orders.expires_at` và client chỉ hiển thị thời gian còn lại, để reload hoặc sửa đồng hồ thiết bị không gia hạn được đơn.
  * Khi hết thời gian 15:00, mã QR tự động làm mờ và hiển thị nút `[Tạo mã thanh toán mới]` nhằm ngăn chặn việc chuyển khoản vào các phiên đã hủy.
* **Tiện Ích Sao Chép 1-Chạm (One-Tap Copy)**:
  * Trang bị nút sao chép độc lập cho từng trường thông tin: *Số tài khoản*, *Số tiền*, và *Nội dung chuyển khoản*.
  * Tích hợp tooltip/toast thông báo tức thì: icon `check-circle-correct` + văn bản `"Đã chép vào bộ nhớ tạm"`, tự động ẩn sau 2 giây. Vùng chạm nút sao chép đảm bảo $\ge 44 \times 44$px.
* **Cơ Chế Xác Thực & Kích Hoạt Không Cần Tải Lại Trang**:
  * Khi modal thanh toán mở, client gọi `RusiSupabase.orders.checkStatus(orderId)` mỗi 3 giây (đọc đơn của chính chủ qua RLS) cho tới khi `status = 'paid'` hoặc hết phiên.
  * Kích hoạt đơn bằng RPC `rusi_activate_order(p_order_code, p_casso_ref)`; hàm chỉ chạy với admin hoặc `service_role`. Repo **chưa có webhook Casso** (Edge Function duy nhất là `ai-review`), nên hiện tại admin/Operations kích hoạt trong CMS. Database đã có `rusi_record_payment` để nối webhook về sau.
  * Khi đơn chuyển `paid`:
    1. Client hiện toast xác nhận và đóng modal thanh toán.
    2. `Monetization.setPro()` cập nhật trạng thái PRO trong runtime, gỡ khóa nội dung mà không cần tải lại trang (F5).
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
* **Chiều cao chuẩn cố định** (biến `--header-height` trong `styles.css`): `71px` desktop, `65px` khi `<= 1024px`, `61px` khi `<= 768px`. Chiều cao cố định theo breakpoint để tránh giật trang (Cumulative Layout Shift) khi co giãn khung nhìn.
* **Cụm thao tác góc phải (`.header-actions`)**:
  * *Khi chưa đăng nhập*: Chỉ hiển thị 1 nút chính `[Đăng nhập]`, ẩn nút `[Đăng ký]` ở header ngoài trên màn hình mobile (<= 768px) để tránh tràn viền (nút Đăng ký được tích hợp sẵn bên trong Mobile Drawer).
  * *Khi đã đăng nhập*:
    * **Pomodoro mini**:
      * Tablet (768px - 1024px): Hiển thị icon `timer` kèm nhãn thời gian đếm ngược (ví dụ: `25m`).
      * Mobile (<= 768px): Chỉ hiển thị icon `timer` (kích thước hiển thị 34px x 34px, mở rộng hitbox chạm vô hình đạt chuẩn 44px x 44px qua CSS pseudo-element `::after`); click vào để mở Popover điều khiển thời gian.
    * **Nút Nâng cấp PRO**: Thu gọn thành pill nhỏ gọn với icon SVG `zap` + chữ `PRO`. Trên màn hình siêu hẹp (<= 360px), tự động ẩn vào trong Drawer để ưu tiên không gian cho Avatar.
    * **Nút Tài khoản**: Chỉ hiển thị Avatar tròn 34px (hitbox 44px), ẩn tên học viên và icon caret để tiết kiệm không gian.
    * **Menu thả xuống tài khoản (`.user-dropdown`)**: Định vị cố định theo khung nhìn:
      `position: fixed; top: var(--header-height); right: 12px; width: min(calc(100vw - 24px), 320px); max-height: calc(100dvh - var(--header-height) - 12px); overflow-y: auto; overscroll-behavior: contain;`
      chống triệt để lỗi tràn mép trái màn hình và hỗ trợ cuộn mượt mà khi xoay ngang máy.
    * **Cơ chế đóng chéo (Mutual Exclusion)**: Thao tác mở User Dropdown sẽ lập tức tự động đóng Popover Pomodoro và Mobile Drawer (và ngược lại), không để nhiều menu nổi cùng lúc.
* **Nút Menu Hamburger (`.menu-button`)**:
  * Vùng chạm chuẩn 44px x 44px (`touch-action: manipulation;`).
  * 2 vạch ngang xếp tầng cân đối, tự động xoay mượt thành hình dấu `X` khi mở và phục hồi trạng thái 2 vạch khi đóng qua CSS transition.
* **Ngăn kéo điều hướng di động (`.header-center.nav-open`) & Lớp phủ Backdrop (`.header-backdrop`)**:
  * Trượt nhẹ nhàng từ chân header (`top: var(--header-height); max-height: calc(100dvh - var(--header-height)); overflow-y: auto; overscroll-behavior: contain;`).
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
     * `PACKAGES` (Gói cước hội viên PRO): Cấu hình các gói `pro_1m`, `pro_3m`, `pro_1y` và quyền lợi.
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

### 4.3. Xuất Bản Nội Dung Tự Động (Content Publish Pipeline):

> Luồng cũ `localStorage: trki_admin_data` → `mergeAdminData()` chỉ còn tác dụng xem trước trong cùng trình duyệt của admin. Nội dung đến học viên **chỉ** qua pipeline dưới đây.

```text
[Admin lưu trong admin.html] ─► [Supabase Postgres: bảng nội dung]
                                        │ trigger cấp câu lệnh rusi_publish_content
                                        ▼
                 [public.content_versions.version++]  +  [repository_dispatch "content-changed"]
                                        │ (pg_net, token Vault github_publish_token, tối đa 1 lần/20 giây)
                                        ▼
               [.github/workflows/publish-content.yml] — chờ 90 giây, chạy scripts/publish-content.js
                                        │ chỉ kéo bảng có version khác manifest, xoá mọi trường đáp án (ANSWER_KEYS)
                                        ▼
               [commit data/modules/*.json + manifest.json] ─► GitHub Pages ─► trình duyệt học viên
```

* Migration: `supabase/migrations/20261125090000_content_publish_trigger.sql` (idempotent). Lỗi gửi tín hiệu không bao giờ làm hỏng thao tác ghi của admin.
* Xuất bản tay: `npm run publish-content` (chỉ module đổi) hoặc `npm run sync` (`--all`). **Không** dùng `scripts/sync-from-supabase.js` (cũ, làm lộ đáp án).
* Không sửa tay file trong `data/modules/` — sẽ bị ghi đè ở lần xuất bản sau.

---

## 5. KIẾN TRÚC DỮ LIỆU: FILE TĨNH + INDEXEDDB (0-EGRESS) & SUPABASE

Nội dung học nạp từ file tĩnh trên GitHub Pages; Supabase chỉ phục vụ dữ liệu theo người dùng. Mục tiêu: giữ egress Supabase dưới quota 5GB/tháng.

```text
                  [data/modules/manifest.json]  (fetch no-store: hash từng module)
                                │
   RusiDataLoader.load(key) ────┼─► 1. RAM (biến window.*)
   (data.js)                    ├─► 2. IndexedDB rusi_offline_db — dùng nếu đúng phiên bản
                                └─► 3. Tải data/modules/<file>.json rồi lưu vào IndexedDB
   Phiên bản module = DATA_VERSION (data.js) + hash trong manifest. Offline (không đọc được manifest) → dùng bản cache bất kỳ.
```

* **Module nạp theo trang** (`MODULE_REGISTRY` trong `data.js`): `VOCAB_JARS`, `VOCABULARIES`, `VOCAB_LESSONS`, `TOPIC_ARTICLES`, `SPEAKING_SETS`, `LISTENING_LESSONS`, `WRITING_TASKS`, `WRITING_TOPICS`, `GRAMMAR_LESSONS`, `TRKI_INDEX`, `TRKI_BANK`, `TRKI_QUESTION_BANK`. `RusiDataLoader.prepareForCurrentPage()` chọn module theo trang.
* **Blog, Shop, Gói PRO**: `page-blog.js`, `page-shop.js`, `page-upgrade.js` dùng dữ liệu nhẹ trong `data.js` (`window.BLOG_POSTS`...). Chỉ khi dữ liệu này trống mới truy vấn Supabase (`blog_posts`, `shop_products`, `packages`). Các file `blog_posts.json`, `shop_products.json`, `packages.json` có được xuất bản nhưng client chưa đọc.
* **Supabase dùng cho**: Auth, `profiles`, tiến độ (`user_progress`, `practice_logs`), đơn hàng (`orders`), RPC chấm thi, hạn mức AI (`user_ai_usage`), Device Guard và thao tác ghi của CMS.
* **Bootstrapper từng trang** (`js/pages/page-*.js`): `initIndexPage()`, `initVocabPage()`, `initWritingPage()`, `initListeningPage()`, `initSpeakingPage()`, `initMockTestPage()`, `initBlogPage()`, `initShopPage()`, `initUpgradePage()`.
* `RusiSupabase.fetchModuleData()` vẫn còn trong `supabase-client.js` nhưng không nơi nào gọi; không dùng nó cho luồng nạp trang.
* Cấm thêm truy vấn quét cả bảng (`select("*")` không giới hạn) chạy lúc tải trang hoặc warmup.

---

## 6. BẢO MẬT HỆ THỐNG & NGUYÊN TẮC CLEAN CODE

### 6.1. Bảo Mật Khóa API & Vệ Sinh Mã Nguồn (Secret Hygiene):
* **Nguyên tắc bất khả xâm phạm về khóa**: Tuyệt đối cấm đưa `service_role_key` (khóa có quyền bypass RLS), Private Tokens, webhook secrets ngân hàng hoặc thông tin định danh máy chủ vào Git repository hoặc file JavaScript phía client. Web client chỉ được phép sử dụng duy nhất Supabase Anon / Public Key (`sb_publishable_`...).

* **Bảo vệ dữ liệu bằng GRANT, quyền cột và Row Level Security (RLS)**: Mọi bảng được expose qua Data API phải bật RLS và cấp quyền tối thiểu. Chỉ công khai nội dung free đã xuất bản; nội dung trả phí kiểm tra entitlement phía server. Quyền thao tác dữ liệu cá nhân kiểm tra chủ sở hữu và các cột được sửa; không cho client tự ghi role, PRO, XP, giá, trạng thái thanh toán hoặc điểm thi. Đáp án và dữ liệu quản trị nhạy cảm nằm trong schema riêng không expose. Ma trận quyền, cấu trúc bảng và hợp đồng RPC thực hiện theo Mục 7.

### 6.2. Chống Rò Rỉ Đáp Án Đề Thi & Chống Gian Lận (Zero-Answer Leak):
* **Bảo mật ngân hàng đề thi**: Đáp án/lời giải được tách khỏi dữ liệu đề vào `private.exam_answer_keys`, không cấp quyền đọc trực tiếp cho anon/authenticated. API lấy câu hỏi phải kiểm tra quyền, phiên làm bài và version đề; chỉ trả câu hỏi/phương án được giao với ID ổn định. Không chứa answer key trong raw payload, file fallback hoặc metadata. Lời giải chỉ được phát hành theo trạng thái và quyền xem kết quả của phiên.

* **Hiện trạng chấm thi**: client đọc câu hỏi từ view `trki_questions_public` (không có `correct_index`) và nộp bài qua RPC `rusi_grade_trki_submission(p_test_code, p_user_answers, p_time_spent_sec)`. RPC đọc đáp án từ `public.trki_question_bank.correct_index`; nếu đề chưa có trong bank thì đọc JSON trong `trki_tests`. Chế độ luyện từng câu dùng `rusi_check_trki_question`. RPC `rusi_grade_trki_exam` vẫn có trong database nhưng client không gọi. Lưu ý lỗ hổng ở Mục 7.5.

* **Mục tiêu — quy trình chấm thi an toàn qua RPC**: Client gửi `attempt_id` và câu trả lời; server xác minh chủ phiên, thời hạn, version và tập câu được giao, khóa attempt, chấm điểm thực tế từng phân môn rồi lưu kết quả và XP duy nhất trong cùng transaction. XP được ghi tại `xp_events` và tổng hợp tại `learner_stats`; retry cùng attempt trả kết quả đã chốt. Ngưỡng đạt và quy tắc thưởng phải được version hóa theo Mục 7; không dùng hàm mẫu gán cố định điểm.

### 6.3. Giám Sát Phiên Học & Chống Chia Sẻ Tài Khoản (Single Active Session):
* **Hiện trạng — Device Guard**: mỗi tài khoản tối đa **2 thiết bị** hoạt động (`public.user_device_sessions`, migration `20261125025406_device_guard.sql`). Client (`auth.js`) gọi `rusi_register_device`, `rusi_get_my_devices`, `rusi_revoke_device`, `rusi_revoke_my_device`, `rusi_revoke_all_devices`; fingerprint lưu tại `localStorage.rusi_device_fp`. Bảng `private.active_sessions` và hàm `private.rusi_session_ok()` đã có.

* **Kiểm soát phiên đăng nhập duy nhất**: Đánh giá cấu hình phiên của Supabase Auth đang sử dụng; nếu cần bổ sung, quản lý session đang hoạt động phía server tại `private.active_sessions`. Các API/RPC hoặc policy được bảo vệ kiểm tra session ID từ JWT đã xác minh so với phiên còn hiệu lực; client không được tự ghi session có thẩm quyền. Realtime chỉ giúp giao diện nhận thông báo và đăng xuất nhanh, không thay thế kiểm tra server. Khi bị thay thế phiên, hiển thị: "Tài khoản của bạn vừa được đăng nhập trên một thiết bị khác. Vui lòng đăng nhập lại nếu đây không phải thao tác của bạn." Xóa token/cache riêng theo cơ chế Auth và chính sách ứng dụng.

---

## 7. KIẾN TRÚC CƠ SỞ DỮ LIỆU THỰC TẾ & BẢO MẬT (PRAGMATIC POSTGRESQL SCHEMA) — SUPABASE

> **Cập nhật kiến trúc: 10/11/2026 — Mô hình Pragmatic (Tối ưu từ bản 51 bảng FK4).**  
> **Đối chiếu database thật ngày 25/11/2026**: 29 bảng `public` + 1 view (`trki_questions_public`) + 3 bảng `private` (`exam_answer_keys`, `active_sessions`, `audit_logs`). Danh sách đầy đủ ở 7.1; các bảng ngoài nhóm cốt lõi ở 7.2 (Phân hệ 7).  
> **Nguyên tắc thiết kế chủ đạo (Karpathy Guidelines)**: *Simplicity First & Pragmatic Engineering*.  
> Loại bỏ triệt để tình trạng chuẩn hóa quan hệ quá mức (Over-engineering 3NF/4NF) khiến cơ sở dữ liệu phình to 51 bảng và gãy kết nối với Frontend. Thay vào đó, kiến trúc chuẩn hóa tập trung vào **18 bảng cốt lõi**, kết hợp sức mạnh trường `JSONB` của PostgreSQL để lưu trữ dữ liệu phụ thuộc (câu hỏi trắc nghiệm, phân đoạn audio, đáp án lựa chọn), vừa đảm bảo **tốc độ truy vấn dưới 30ms**, vừa khớp 1:1 với mã nguồn `supabase-client.js` và `admin.js`.  
> **Điểm mấu chốt bắt buộc**: Có **bảng từ vựng chuyên sâu `vocabularies` độc lập** với đầy đủ 16 thuộc tính ngôn ngữ tiếng Nga (trọng âm, từ loại, 6 cách, biến cách, cặp thể, quản cách, cụm từ và câu ví dụ) kết hợp cùng bảng Lọ từ vựng `vocab_jars` và bảng liên kết `jar_items`.

---

### 7.1. Bảng Ma Trận Phân Bổ Bảng Theo Phân Hệ

| Phân hệ | Tên Bảng (`public` / `private`) | Mục đích & Nghiệp vụ cốt lõi | Kiểu Khóa chính | Khóa ngoại & Liên kết |
|---|---|---|:---:|---|
| **I. Người dùng & Tiến độ** | `public.profiles` | Thông tin học viên, vai trò (Role), trạng thái bản quyền PRO | `id` (UUID) | FK `auth.users(id)` ON DELETE CASCADE |
| | `public.user_progress` | Tổng XP, chuỗi ngày Streak, ngày học gần nhất, danh sách đã hoàn thành, tiến độ từ vựng (`vocab_state`) | `user_id` (UUID) | FK `profiles(id)` ON DELETE CASCADE |
| | `public.user_vocab_progress` | Tiến độ Spaced Repetition (SM-2) theo từng từ vựng cá nhân — **client chưa dùng** (thẻ SRS khóa theo chữ, không theo `vocabularies.id`; tiến độ SRS nằm ở `user_progress.vocab_state`) | `user_id, vocab_id` | FK `profiles(id)`, FK `vocabularies(id)` |
| **II. Từ vựng & Lọ từ vựng** | **`public.vocabularies`** | **Kho từ vựng tiếng Nga toàn diện (trọng âm, từ loại, 6 cách, ví dụ)** | `id` (UUID) | Độc lập (từ điển cốt lõi A1–C2) |
| | `public.vocab_jars` | Danh mục 18 Lọ từ vựng hệ thống & các Lọ cá nhân tự tạo | `id` (UUID) | `owner_id` FK `profiles(id)` (NULL nếu là lọ hệ thống) |
| | `public.jar_items` | Bảng liên kết nhiều-nhiều giữa Lọ từ vựng và Từ vựng | `jar_id, vocab_id` | FK `vocab_jars(id)`, FK `vocabularies(id)` |
| | `public.vocab_lessons` | Bài học hành động đời sống gắn với lọ (Markdown) | `id` (UUID) | `jar_id` → `vocab_jars(id)` |
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
| **IV. Khảo thí TRKI Bảo mật** | `public.trki_tests` | Đề thi A1–C2 (JSON `part1`–`part5`, `parts`, `sections`). ⚠ Vẫn còn cột `answers` đọc công khai — xem 7.5 | `id` (TEXT) | Độc lập |
| | `public.trki_question_bank` | Ngân hàng câu hỏi TRKI dạng dòng, có `correct_index`/`correct_answer`/`explanation` — nguồn chấm của `rusi_grade_trki_submission` | `id` (UUID) | `test_code`, `test_id` |
| | `public.trki_questions_public` (VIEW) | Câu hỏi đã xuất bản, bỏ cột đáp án — client đọc từ đây | — | View của `trki_question_bank` |
| | `private.exam_answer_keys` | **Bảng riêng tư giấu đáp án đúng & giải thích (Zero-Leak)** | `exam_id` (TEXT) | FK `trki_tests(id)` ON DELETE CASCADE |
| | `public.trki_submissions` | Lịch sử nộp bài thi thử, điểm số từng phân môn & kết quả đỗ/trượt | `id` (UUID) | FK `profiles(id)`, FK `trki_tests(id)` |
| **V. Giao dịch & Thương mại** | `public.packages` | Danh mục gói cước hội viên PRO (`pro_1m`, `pro_3m`, `pro_1y`) | `id` (TEXT) | Độc lập |
| | `public.orders` | Đơn hàng VietQR, mã giao dịch Casso, trạng thái kích hoạt PRO | `id` (UUID) | FK `profiles(id)`, FK `packages(id)` |
| | `public.shop_products` | Sản phẩm hàng Nga nội địa, dịch vụ tư vấn du học & công cụ | `id` (TEXT) | Độc lập |
| **VI. Blog & Cẩm nang** | `public.blog_posts` | Bài viết cẩm nang du học, KTX, đời sống Nga (Markdown GFM) | `id` (TEXT) | Độc lập |
| **VII. Vận hành & Hệ thống** | `public.practice_logs` | Nhật ký từng lượt luyện (kỹ năng, điểm, thời lượng, XP) | `id` (UUID) | `user_id` |
| | `public.user_ai_usage` | Hạn mức chấm AI theo ngày | `id` (UUID) | `user_id` |
| | `public.user_device_sessions` | Device Guard — thiết bị đăng nhập của tài khoản | `id` (UUID) | `user_id` |
| | `public.content_versions` | Bộ đếm thay đổi từng bảng nội dung cho pipeline xuất bản (anon đọc được) | `table_name` | — |
| | `public.content_publish_state` | Mốc gửi `repository_dispatch` gần nhất (chống dồn) | `id = 1` | — |
| | `private.active_sessions` | Phiên đăng nhập có hiệu lực (dùng bởi `private.rusi_session_ok()`) | `user_id, session_id` | — |
| | `private.audit_logs` | Nhật ký kiểm toán (ví dụ `ACTIVATE_ORDER`) | `id` (BIGINT) | — |

---

### 7.2. Đặc Tả Chi Tiết Các Bảng

#### Phân hệ 1: Người Dùng, Phân Quyền & Tiến Độ Học Tập

1. **`public.profiles`**:
   - `id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`: Mã định danh học viên khớp với Supabase Auth.
   - `full_name TEXT`: Họ tên hiển thị.
   - `avatar_url TEXT`: Đường dẫn ảnh đại diện.
   - `role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'academic_admin', 'super_admin'))`: Phân quyền quản trị vai trò trực tiếp, không cần tách bảng phụ. `public.is_admin()` coi `academic_admin` và `super_admin` là admin.
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
   - `vocab_state JSONB NOT NULL DEFAULT '{}'::jsonb` (CHECK ≤ 1.5 MB): Khối tiến độ từ vựng đồng bộ giữa thiết bị `{v, updatedAt, srs: {cards, resetAt}, totals, mastered_words, custom_jars, starred}` (xem `vocab-sync.js`).
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
   - `is_pro BOOLEAN`: cờ đánh dấu lọ dành cho PRO.
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

* **Supabase Storage: Bucket `writing-images`**:
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
    - `answers JSONB NOT NULL DEFAULT '{}'::jsonb`: Bảng đáp án và hướng dẫn giải cho tất cả các phần. **⚠ Cột này vi phạm Zero-Answer Leak**: anon/authenticated đang có quyền SELECT. Phải thu hồi quyền hoặc chuyển sang `private.exam_answer_keys` (Mục 7.5).
    - Các cột khác có trong database: `level_name`, `category`, `sub_test_type`, `duration_minutes`, `passing_score`, `sections`, `raw_data`, `is_published`, `test_mode`.
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
    - `id TEXT PRIMARY KEY CHECK (id IN ('pro_1m', 'pro_3m', 'pro_1y'))`: Mã định danh 3 gói cước chuẩn.
    - `name TEXT NOT NULL`: Tên gói (Gói 1 Tháng, Gói 3 Tháng, Gói 1 Năm).
    - `price_vnd BIGINT NOT NULL`: Giá tiền tính bằng Việt Nam Đồng (VND).
    - `duration_months INT`: Thời lượng gói (1, 3, 12).
    - `is_lifetime BOOLEAN NOT NULL DEFAULT false`: Đánh dấu gói Vĩnh viễn.
    - `badge TEXT`: Nhãn nổi bật (ví dụ: "Phổ Biến Nhất", "VIP Quyền Năng").
    - `features JSONB NOT NULL DEFAULT '[]'::jsonb`: Mảng các quyền lợi đặc quyền.
    - Các cột khác có trong database: `title`, `description`, `price`, `price_old`, `price_minor`, `currency`, `duration_days`, `status`, `feature_list`, `popular`. Giá hiện hành: `pro_1m` 399.000đ, `pro_3m` 899.000đ, `pro_1y` 1.899.000đ.
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
    - Các cột khác có trong database: `client_order_key`, `amount_minor`, `currency`, `shipping_address` (đơn Shop), `updated_at`.

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

#### Phân hệ 7: Bảng Bổ Sung Đang Dùng

22. **`public.vocab_lessons`**: `id UUID`, `code TEXT`, `jar_id UUID`, `title TEXT`, `level TEXT`, `content_md TEXT`, `created_at`, `updated_at`.
23. **`public.trki_question_bank`**: `id UUID`, `code`, `level`, `sub_test` (`lexis_grammar`/`grammar`/`reading`/`listening`/`writing`/`speaking`), `part_number`, `question_type`, `topic`, `grammar_case`, `difficulty`, `prompt`, `prompt_vi`, `passage`, `audio_url`, `image_url`, `options JSONB`, **`correct_index INT`, `correct_answer TEXT`, `explanation TEXT`** (đáp án — không được expose), `tags TEXT[]`, `points NUMERIC`, `test_code`, `test_id`, `order_index`, `is_published`, `is_pro_only`, `created_at`, `updated_at`.
    - View **`public.trki_questions_public`**: cùng các cột nhưng bỏ `correct_index`, `correct_answer`, `explanation`.
24. **`public.practice_logs`**: `id UUID`, `user_id UUID`, `skill_type TEXT`, `item_id TEXT`, `item_title TEXT`, `score NUMERIC`, `duration_seconds INT`, `xp_earned INT`, `details JSONB`, `created_at`.
25. **`public.user_ai_usage`**: `id UUID`, `user_id UUID`, `usage_date DATE`, `used_count INT`, `max_limit INT`, `is_pro BOOLEAN`, `last_used_at`, `created_at`, `updated_at`. Dùng bởi `check_and_consume_ai_quota` / `get_user_ai_quota`.
26. **`public.user_device_sessions`**: `id UUID`, `user_id UUID`, `device_fingerprint TEXT`, `device_name`, `device_type`, `browser`, `os`, `ip_address`, `is_active BOOLEAN`, `last_active_at`, `created_at`.
27. **`public.content_versions`** (`table_name TEXT PK`, `version BIGINT`, `changed_at`) và **`public.content_publish_state`** (`id = 1`, `last_dispatch_at`): phục vụ pipeline xuất bản Mục 4.3.
28. **`private.active_sessions`**: `user_id UUID`, `session_id UUID`, `activated_at`, `revoked_at`.
29. **`private.audit_logs`**: `id BIGINT`, `actor_id UUID`, `db_role TEXT`, `action TEXT`, `entity_table TEXT`, `entity_key JSONB`, `changed_columns TEXT[]`, `occurred_at`.

* **Storage buckets** (đều `public = true`): `writing-images`, `listening-audio`, `trki-audio`, `vocab-audio`.

---

### 7.3. Các Hàm RPC Nghiệp Vụ (Security Definer RPCs)

Mọi thao tác can thiệp vào tài chính, bản quyền PRO, điểm số và đáp án đề thi phải đi qua RPC phía server (`SECURITY DEFINER`).

**RPC client đang gọi** (`supabase-client.js`, `auth.js`):

| RPC | Mục đích |
|---|---|
| `rusi_grade_trki_submission(p_test_code, p_user_answers, p_time_spent_sec)` | Chấm bài thi TRKI. Đáp án đọc từ `trki_question_bank.correct_index`; nếu đề chưa có trong bank thì đọc JSON `trki_tests`. Trả điểm, đúng/sai từng câu và giải thích. |
| `rusi_check_trki_question(p_test_code, p_question_index, p_user_choice)` | Kiểm tra một câu (chế độ luyện từng câu). |

> Thi thử bắt buộc đăng nhập: hai RPC chấm thi chỉ cấp cho `authenticated` (migration `20261125150000_permissions_cleanup.sql`); `page-mock-test.js` mở modal đăng nhập trước khi vào phòng thi. Bucket `vocab-audio` chỉ admin được ghi (`20261125160000_lock_vocab_audio_bucket.sql`); scripts audio dùng biến môi trường `RUSI_ADMIN_JWT`.

| `rusi_activate_order(p_order_code, p_casso_ref)` | Chỉ admin/`service_role`. Đặt `orders.status = 'paid'`, cộng hạn PRO nối tiếp hạn hiện tại theo `packages.duration_months`/`duration_days` (NULL nếu `is_lifetime`), ghi `private.audit_logs`. |
| `sync_my_progress(p_streak, p_xp, p_mascot_level)` | Đồng bộ streak/XP. ⚠ Hàm cập nhật các cột `profiles.streak_count`, `xp_points`, `mascot_level`, `last_study_date` — không tồn tại trong `profiles` (Mục 7.5). |
| `rusi_sync_jar_words(p_jar_id, p_words)` | Đồng bộ từ trong lọ cá nhân. |
| `check_and_consume_ai_quota(p_user_id, p_is_pro)`, `get_user_ai_quota(p_user_id, p_is_pro)` | Hạn mức chấm AI theo ngày (`user_ai_usage`). |
| `current_user_is_admin()` | Client dùng để ẩn/hiện UI quản trị (không thay thế RLS). |
| `rusi_register_device`, `rusi_get_my_devices`, `rusi_revoke_device`, `rusi_revoke_my_device`, `rusi_revoke_all_devices` | Device Guard, tối đa 2 thiết bị. |

**Có trong database nhưng client chưa gọi** (chưa kiểm tra hàm nào còn chạy được): `rusi_grade_trki_exam`, `rusi_submit_srs_review`, `rusi_start_exam`, `rusi_get_exam_questions`, `rusi_save_exam_answers`, `rusi_submit_exam`, `rusi_get_exam_result`, `rusi_get_exam_feedback`, `rusi_publish_exam_version`, `rusi_award_xp`, `rusi_get_my_stats`, `rusi_create_order`, `rusi_record_payment`, `rusi_request_refund`, `rusi_finish_refund`, `rusi_submit_writing`, `rusi_submit_listening`, `rusi_submit_speaking`, `rusi_get_ai_feedback`, `rusi_claim_ai_job`, `rusi_finish_ai_job`, `rusi_fail_ai_job`, `rusi_start_vocab_session`, `rusi_record_vocab_review`, `rusi_create_jar`, `rusi_set_jar_word`, `rusi_set_timezone`, `rusi_admin_get_trki_questions`, `rusi_admin_upsert_trki_question`, `ingest_grammar_lesson`, `update_vocab_audio`, `activate_pro_from_paid_order`. Hàm hỗ trợ: `is_admin(user_id)`, `handle_new_user()` (tạo profile khi đăng ký), `rusi_mark_content_changed()` (trigger xuất bản).

> Phần lớn RPC/schema chưa có file SQL trong repo (chỉ có 2 migration trong `supabase/migrations/`). Khi thêm hoặc đổi RPC/cột, viết migration mới, idempotent.

---

### 7.4. Phân Quyền Row Level Security (RLS) — Hiện Trạng

1. **Bảng nội dung** (`vocabularies`, `vocab_jars`, `jar_items`, `vocab_lessons`, `topic_articles`, `grammar_lessons`, `listening_*`, `speaking_lessons`, `writing_topics`, `writing_tasks`, `writing_task_vocab`, `trki_tests`, `packages`, `shop_products`, `blog_posts`):
   - `SELECT`: công khai cho `anon` và `authenticated` (`trki_tests` chỉ khi `is_published = true`).
   - Ghi: policy `Admins manage <bảng>` (`ALL`, điều kiện `is_admin(auth.uid())`).
2. **`profiles`**: học viên đọc/sửa dòng của mình; admin toàn quyền. Trigger `private.rusi_validate_profile` chặn người không phải admin/`service_role` sửa `role`, `is_pro`, `pro_expires_at` (khi tạo mới luôn ép `student`, không PRO) và kiểm tra `timezone` là IANA hợp lệ.
3. **`orders`**: học viên tạo đơn của mình (bắt buộc `status = 'pending'`, `paid_at`/`casso_trans_id` NULL, `amount >= 0`) và đọc đơn của mình; admin toàn quyền.
4. **`user_progress`**: policy `Users manage own progress` cho phép `ALL` trên dòng của chính mình (xem 7.5).
5. **`content_versions`**: `anon` đọc được (không nhạy cảm); `content_publish_state`: không ai ngoài hàm definer.
6. **Schema `private`**: không expose qua Data API.

**Nguyên tắc bắt buộc giữ**: học viên không được ghi trực tiếp `role`, `is_pro`, `xp_total`, giá, trạng thái thanh toán hoặc điểm thi; mọi thay đổi đó đi qua RPC.

---

### 7.5. Khoảng Cách Đã Biết Giữa Đặc Tả & Hệ Thống (đối chiếu 25/11/2026)

| # | Vấn đề | Mức độ |
|---|---|---|
| 1 | `public.trki_tests.answers` (89 đề đã xuất bản có dữ liệu) đọc được bằng anon key qua Data API — vi phạm Zero-Answer Leak. Cần cân nhắc cả `raw_data` và `part1`–`part5`. | Nghiêm trọng |
| 2 | `user_progress` cho học viên `ALL` trên dòng của mình → client tự ghi được `xp_total`, `streak_count`, `done_list`. | Cao |
| 3 | `profiles`/`orders` có policy `rusi_read`/`rusi_update` kèm `private.rusi_session_ok()`, nhưng policy permissive được OR với policy cũ không có điều kiện này → kiểm tra phiên không có hiệu lực. | Trung bình |
| 4 | `sync_my_progress` ghi vào các cột không tồn tại trong `profiles` → RPC lỗi khi chạy. | Trung bình |
| 5 | `js/pages/page-speaking.js` upsert vào `user_speaking_progress` — bảng không tồn tại. | Thấp |
| 6 | Thanh toán: đồng hồ 15 phút tính ở client; chưa có webhook Casso, kích hoạt PRO thủ công. | Trung bình |

**Xử lý:** migration `supabase/migrations/20261125130000_security_hardening.sql` vá #1–#4 (view `trki_tests_public` xoá khoá đáp án phía server, bỏ quyền đọc trực tiếp `trki_tests`/`trki_question_bank`, view `trki_questions_public` chạy quyền chủ view, trigger `rusi_guard_user_progress`, sửa `sync_my_progress`, policy RESTRICTIVE `rusi_session_guard`). Client và `scripts/publish-content.js` đọc `trki_tests_public`. #5 đã xử lý bằng cách bỏ lệnh ghi `user_speaking_progress` trong `page-speaking.js`. #6 chưa xử lý: đơn chỉ được tạo sau khi học viên bấm "đã chuyển khoản" và admin kích hoạt thủ công, nên đồng hồ client không ảnh hưởng bảo mật; cần webhook Casso để tự động hoá.
**Trạng thái (25/11/2026): migration đã có trong repo nhưng CHƯA áp dụng lên Supabase.**

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
   Áp dụng nghiêm ngặt cấu trúc 3 vùng cân đối, chiều cao cố định theo `--header-height` (Desktop 71px, ≤1024px 65px, ≤768px 61px) và menu ngăn kéo trượt `nav-open` theo quy chuẩn tại **Mục 3.3**. XP và Streak chỉ hiển thị trong dropdown tài khoản khi đã đăng nhập.

5. **Theme Russian Winter Cool Blue**:
   Giao diện Sáng / Tối / Theo hệ thống (mặc định Sáng; nút ở header đổi vòng Sáng → Tối → Theo hệ thống): `js/theme.js` nạp đồng bộ trong `<head>` mọi trang học viên, đặt `data-theme` trên `<html>` + `<body>`, lưu lựa chọn ở `localStorage["rusi_theme"]`; nút đổi ở header (`#themeToggleBtn`). Màu tối: token chung `[data-theme="dark"] body` cuối `styles.css` (nền `#0a0f19`, thẻ `#131d2e`, nhấn `#2f6fc4`). Trang admin giữ cơ chế riêng. `data-season="winter"` cố định. Giao diện Sáng, phong cách mùa đông nước Nga: Nền chính (`#eef4fb`), bề mặt thẻ (`#ffffff`), màu chữ chính (`#0f1f38`), màu đường viền (`#d2e0f0`), điểm nhấn Đỏ Crimson (`#c52233`) và Xanh Cobalt (`#1757a6`).

6. **Quy chuẩn Deploy GitHub Pages & Cache-Busting Tự Động**:
   * Luôn duy trì tệp `.nojekyll` ở thư mục gốc để vô hiệu hóa Jekyll build.
   * **Quy tắc phiên bản động**: HTML nạp `styles.min.css` — sửa `styles.css` xong phải chạy `node scripts/build_min_css.js`. Mỗi khi thay đổi file CSS/JS đã deploy (`styles.min.css`, `app.js`, `pages.js`, `js/pages/page-*.js`...), tăng `?v=` của file đó trên toàn bộ 16 file HTML; service worker `sw.js` cache-first theo `?v=`.

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
    - **Nguồn duy nhất cho số XP**: `RUSI_XP_RULES` trong `app.js`. Các con số XP nêu trong Mục 1 là mô tả cũ; khi lệch, theo bảng này.

      | Khoá | XP | Khoá | XP |
      |---|---|---|---|
      | `VOCAB_CARD_REVIEW` | 10 | `SPEAKING_TOPIC_PASS` | 25 |
      | `VOCAB_QUIZ_PASS` | 15 | `WRITING_SUBMIT` | 15 |
      | `LISTENING_QUIZ_PASS` | 15 | `WRITING_PASS_BONUS` (≥66%) | 15 |
      | `LISTENING_DICTATION_PASS` | 20 | `TRKI_SUBTEST_PASS` | 20 |
      | `SPEAKING_ITEM_PASS` | 10 | `TRKI_FULL_PASS` | 50 |
      | `STUDY_5MIN_DAILY` | 10 | | |
    - **Chống cày XP (26/11/2026)**: XP mỗi bài chỉ trao lần đầu hoàn thành/đạt (Nói, Nghe hiểu, chép chính tả cả bài, Viết đạt, TRKI theo đề/phần, thẻ "đã thuộc" chỉ 1 lần/từ). Các chế độ luyện lặp của lọ từ (Flashcard, Học, Ghép thẻ, Gõ từ, Kiểm tra) tối đa 1 lần/ngày/lọ. Viết nộp chưa đạt: `WRITING_SUBMIT` tối đa 1 lần/đề/ngày. Chép chính tả không thưởng theo từng câu; câu dùng gợi ý (Tab) không tính. RPC chấm TRKI không cộng XP (client cộng theo bảng này). Mỗi lần nhận XP ghi đúng 1 dòng `practice_logs` (qua `Progress.markDone(..., { title, score, xp })`).
    - **Streak theo múi giờ cục bộ**: Một ngày chỉ được tính vào Streak khi có phát sinh XP thực tế. Tính khoảng cách `diffDays` dựa trên mốc ngày 00:00:00 UTC của timezone tài khoản (`diffDays = 1` tăng streak, `diffDays > 1` reset về 0).

13. **Quy Chuẩn Typography & Dấu Ngoặc Kép Thống Nhất (Curly Double Quotes Standard)**:
    - **Bắt buộc sử dụng cặp dấu ngoặc kép cong “Nội dung”**: Dấu mở `“` (U+201C) và dấu đóng `”` (U+201D) trên toàn bộ hệ thống giao diện, bài viết, câu ví dụ, hội thoại và đề thi.
    - **Tuyệt đối KHÔNG sử dụng dấu ngoặc kép kiểu Pháp `«Nội dung»` (Guillemets `«` và `»`)**: Toàn bộ dữ liệu hiển thị trong cơ sở dữ liệu Supabase, các tệp module JSON (`data/modules/*.json`), và tệp sao lưu dữ liệu phải được chuẩn hóa 100% về cặp dấu `“...”`.
    - **Cơ chế phòng thủ trong xử lý chuỗi (Defensive Sanitization)**: Các hàm chuẩn hóa ký tự (`cleanToken`, `stripHtml`, `norm` trong `pages.js`, `app.js`, `admin.js`) vẫn duy trì nhận diện `«` và `»` trong regex để dọn dẹp hoặc chuyển đổi an toàn khi học viên sao chép văn bản từ nguồn ngoài dán vào hệ thống.
    - **Trình quản trị CMS & Đồng bộ dữ liệu**: Mọi luồng nhập liệu bài học mới, nhập phụ đề, hoặc đồng bộ hai chiều giữa Supabase và client phải tự động chuẩn hóa các ký tự `«` và `»` thành `“` và `”` trước khi ghi vào kho lưu trữ.

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
   Mọi trang (`vocabulary.html`, `listening.html`, `speaking.html`, `writing.html`, `mock-test.html`, `blog.html`, `shop.html`, `product-detail.html`) nạp nội dung qua `RusiDataLoader` (RAM → IndexedDB → file tĩnh, Mục 5); khi offline vẫn dùng bản cache trong IndexedDB và dữ liệu nhẹ trong `data.js`. Tuyệt đối không bao giờ để xảy ra tình trạng màn hình trắng.

2. **Đồng Bộ Phiên Bản Cache-Busting Thống Nhất**:
   100% 16 tệp HTML đồng bộ gọi cùng phiên bản cache-busting (ví dụ tại `index.html` ngày 25/11/2026: `styles.min.css?v=12.2`, `app.js?v=12.1`, `auth.js?v=12.1`, `data.js?v=12.2`, `supabase-client.js?v=12.1`, `rusi-icons.js?v=5.0`, `pomodoro.js?v=7.1`; `DATA_VERSION = 'v12.1'`; `sw.js` cache `rusi-static-v12.0`). Số version luôn lấy từ HTML, không chép từ tài liệu. Mọi thay đổi mã nguồn phải tự động tăng query parameter để Cloudflare và trình duyệt cập nhật tài nguyên lập tức.

3. **Phòng Thi TRKI Zero-Answer Leak & Server-Side Grading**:
   Đề thi công khai tuyệt đối không chứa đáp án đúng. Mọi bài thi thử TRKI đều chấm điểm tập trung tại server qua RPC `rusi_grade_trki_submission` (đáp án trong `trki_question_bank`, không expose qua view `trki_questions_public`). Hiện còn lỗ hổng `trki_tests.answers` — Mục 7.5.

4. **Không Gian Luyện Nói YouTube Shadowing & Chấm WER Realtime**:
   28 bài trong `speaking_lessons` (số liệu 25/11/2026; gồm video hoạt hình có timestamp và bộ hội thoại thực tế). Trình phát YouTube 16:9 đồng bộ postMessage, đệm bù trễ (+0.4s) chống vấp âm, nhận diện giọng nói Web Speech `ru-RU`, thuật toán WER Levenshtein bóc tách từng từ đúng/sai và tô màu trực tiếp trên câu tiếng Nga.

5. **Chuẩn Mực Responsive & Quy Tắc "More..." (Overflow Protection)**:
   * Mobile: 1 cột duy nhất, chiều cao Header cố định 60px, tap target $\ge 44 \times 44$px, font input $\ge 16$px (chống auto-zoom iOS), `overflow-x: hidden`.
   * Tabs và bộ lọc cuộn ngang kích hoạt lớp mặt nạ làm mờ `mask-image` mép phải (`.rusi-scroll-track-faded`), không để chữ bị chém ngang.

6. **Vệ Sinh Thư Viện & Zero Dead Code**:
   Loại bỏ triệt để các thư viện CDN thừa không dùng (như Wavesurfer). Vẽ biểu đồ sóng âm và phân tích âm thanh hoàn toàn bằng native Web Audio API và Web Speech API thuần.

7. **Đồng Bộ Giao Diện & Mascot AI Rusika**:
   Trợ lý AI Mascot Rusika nổi (`#rusikaFloatingWidget`) tự động kích hoạt trên tất cả các trang bài học qua `bootApp()`. Popover Pomodoro mini tích hợp chân Header đóng chéo tự động với menu tài khoản.

8. **Kiến Trúc Modular Data & Động Cơ 0-Egress IndexedDB Cache**:
   - Dữ liệu lớn nằm ở `data/modules/*.json` (15 file + `manifest.json`): `vocab_jars`, `vocabularies`, `vocab_lessons`, `topic_articles`, `grammar_lessons`, `speaking_sets`, `listening_lessons`, `writing_tasks`, `writing_topics`, `trki_index`, `trki_bank`, `trki_questions`, `blog_posts`, `shop_products`, `packages`.
   - `data.js` chỉ giữ phần core nhẹ và động cơ nạp `window.RusiDataLoader`. Không nhồi lại dữ liệu lớn vào `data.js`.
   - Nạp 3 tầng theo nhu cầu: RAM → IndexedDB (`rusi_offline_db`) → file JSON tĩnh; chỉ tải lại module có hash trong `manifest.json` thay đổi (Mục 5).
   - Xuất bản bằng `scripts/publish-content.js` (tự động qua GitHub Actions, Mục 4.3). Script xoá mọi trường đáp án theo `ANSWER_KEYS`; `trki_questions.json` luôn `[]`; `npm test` kiểm tra lại. **Không** dùng `scripts/sync-from-supabase.js`.
   - Chặn rò rỉ Egress: các hàm tải dữ liệu trong `js/pages/page-*.js` (`loadCloudPosts`, `loadCloudProducts`, `loadCloudPackages`...) chỉ truy vấn Supabase khi dữ liệu trong RAM/IndexedDB trống. Không thêm truy vấn `select("*")` không giới hạn chạy mỗi lượt tải trang.

9. **Chuẩn Hóa Typography & Zero Guillemets Baseline**:
   - 100% dữ liệu trong cơ sở dữ liệu Supabase Cloud, tệp sao lưu `data/supabase-backup.json`, các tệp module `data/modules/*.json`, và tệp từ điển `data/dict-ru-vi.json` đã loại bỏ hoàn toàn các ký tự `«` và `»`.
   - Toàn bộ trích dẫn và hội thoại hiển thị thống nhất bằng cặp dấu ngoặc kép cong `“Nội dung”` (U+201C / U+201D).
   - Duy trì quy trình kiểm định đối soát định kỳ và kiểm tra tự động trước mỗi lần release nhằm bảo đảm chỉ số guillemets tồn dư luôn bằng 0.

---

## 11. BÁO CÁO NGHIÊN CỨU THỊ TRƯỜNG, ĐỊNH VỊ CHIẾN LƯỢC & TÍNH KHẢ THI 10 NĂM (2026 – 2036)

> **Tầm nhìn chiến lược**: 10 năm (2026 – 2036)  
> **Mô hình định vị**: Niche EdTech Platform (Đại dương xanh trong ngách hẹp giá trị cao, biên lợi nhuận ròng > 90%).

### 11.1. Kết Luận Tính Khả Thi & Sức Sống 10 Năm (Chỉ Số Thẩm Định: 8.8 / 10)
1. **Bảo chứng vĩnh cửu từ Hiệp định nhà nước**:
   - Chính phủ Liên bang Nga duy trì đều đặn **1.000 suất học bổng toàn phần/năm** cho công dân Việt Nam đi đào tạo cử nhân, kỹ sư, thạc sĩ, tiến sĩ. Đây là quốc gia cấp lượng học bổng diện hiệp định lớn nhất cho Việt Nam.
   - Các ngành trọng điểm chiến lược: 59 chỉ tiêu đại học ngành *Thiết kế, vận hành và kỹ thuật Nhà máy điện hạt nhân* (Đề án 1012), công nghệ hàng không vũ trụ, kỹ thuật quân sự, mật mã, an ninh mạng và dầu khí (Vietsovpetro / Zarubezhneft).
2. **Nhu cầu bắt buộc mang tính sống còn (Compulsory Demand)**:
   - Du học sinh sang Nga bắt buộc học 1 năm dự bị tiếng (Подфак). Nếu không thi đỗ chứng chỉ TRKI-1 (B1), học viên sẽ **bị buộc thôi học về nước**. Nhu cầu luyện thi có tính sinh tử, tạo ra tỷ lệ sẵn sàng chi trả (willingness-to-pay) cực cao.
3. **Thị trường ngách phòng thủ (Defensive Niche)**:
   - Không bị bão hòa hoặc cạnh tranh khốc liệt như tiếng Anh (IELTS) hay tiếng Trung (HSK). Rào cản gia nhập tự nhiên rất cao: ngữ pháp 6 Cách phức tạp và hệ thống khảo thí TRKI chuẩn hóa đòi hỏi chuyên môn sâu.

### 11.2. Chân Dung 5 Nhóm Khách Hàng Mục Tiêu
1. **Du học sinh diện Hiệp định & Tự túc (1.000 – 1.500 người/năm)**: Nhu cầu cày đề thi TRKI-1 (B1) cấp tốc để vào chuyên ngành; khả năng chi trả cao từ sinh hoạt phí học bổng.
2. **Học viên Khối Lực lượng vũ trang (Quân đội, Công an, Cơ yếu)**: Đào tạo chỉ huy tham mưu và kỹ thuật tại các học viện Nga; kỷ luật học tập nghiêm ngặt, ngân sách ổn định.
3. **Học sinh chuyên THPT & Sinh viên Ngoại ngữ (Chuyên Ngữ, Ams, ULIS, HANU)**: Cần chứng chỉ TRKI để tuyển thẳng đại học hoặc đạt chuẩn đầu ra tốt nghiệp.
4. **Kỹ sư Dầu khí, Điện hạt nhân, Chuyên gia kỹ thuật**: Đào tạo chuyên gia vận hành dự án quốc gia; thu nhập cao, cần tiếng Nga kỹ thuật chuyên ngành.
5. **Cộng đồng người Việt tại Nga (~80.000 người)**: Nhu cầu chứng chỉ tiếng Nga cơ bản (ТЭУ/ТБУ) để hoàn thiện hồ sơ định cư (RVP, VNZh, Quốc tịch).

### 11.3. Phân Tích Ma Trận Cạnh Tranh (Blue Ocean vs Competitors)
* **Duolingo / Busuu / Babbel**: Chỉ dạy từ vựng giao tiếp sơ cấp; hoàn toàn bất lực trước ngữ pháp 6 Cách, biến thể động từ (CB/NCB), động từ chuyển động và **hoàn toàn không có bài thi TRKI**.
* **Trung tâm truyền thống offline**: Học phí đắt đỏ (4.000.000đ – 7.000.000đ / khóa); vẫn dùng phương pháp photo đề giấy Zlatoust chấm tay thủ công; giới hạn địa lý (chỉ có tại Hà Nội / TP.HCM).
* **RUSI TRKI giải quyết triệt để**: Nền tảng học và thi trực tuyến chuẩn CBT 24/7, AI chấm phát âm và viết tự luận, ngân hàng 74 đề thi thật với mức phí chỉ bằng 1/5 so với trung tâm.

### 11.4. Điểm Đáng Tiền Nhất Của Nền Tảng (The Ultimate Killer Feature & Moat)
> 🏆 **PHÒNG KHẢO THÍ TRỰC TUYẾN TRKI CHUẨN CBT VỚI 74 ĐỀ THI THẬT, 3.867 CÂU HỎI & CHẤM ĐIỂM SERVER-SIDE CHI TIẾT 5 SUBTEST.**
- **Bản quyền & Công sức số hóa khổng lồ**: 74 đề thi chuẩn hóa phân môn (Ngữ pháp - Từ vựng, Đọc hiểu, Nghe hiểu, Viết, Nói) được gắn nhãn độ khó và giải thích ngữ pháp 6 cách chi tiết.
- **Bảo mật tuyệt đối (Zero-Answer Leak)**: Đáp án được bảo vệ tại server qua RPC `rusi_grade_trki_exam`, học viên không thể "soi" đáp án trước qua DevTools.
- **Động cơ Luyện đề thông minh (Anti-Memorization Engine)**: Tự động đảo ngẫu nhiên thứ tự các phương án lựa chọn (Shuffle Options) mỗi lần làm bài, chống học vẹt vị trí (nhớ đáp án A/B/C/D), buộc học viên rèn luyện phản xạ đọc hiểu ngữ pháp thực chất.
- **Giá trị kinh tế thay thế**: Tiết kiệm hàng triệu đồng mua sách photo từ Nga và chi phí thuê gia sư chấm đề (200k – 500k/đề).

### 11.5. Mô Hình Kinh Doanh & Ma Trận Định Giá Tối Ưu (1T – 3T – 1N)
1. **Gói 1 Tháng (`pro_1m`) — 399.000 VNĐ** *(Gốc: 590.000 VNĐ)*:
   - *Định vị*: Gói Nước Rút Mùa Thi dành cho học viên ôn thi cấp tốc 2–4 tuần trước kỳ thi thật.
   - *Mỏ neo tâm lý*: Đóng vai trò mỏ neo giá giúp gói 3 Tháng trở thành lựa chọn tự nhiên (No-brainer choice).
2. **Gói 3 Tháng (`pro_3m`) — 899.000 VNĐ** *(Gốc: 1.450.000 VNĐ) — [Phổ Biến Nhất]*:
   - *Định vị*: Gói Bứt Phá Mục Tiêu tương đương ~300.000đ/tháng (tiết kiệm 25%); trọn vẹn 1 lộ trình tăng bậc trình độ (A1→A2 hoặc A2→B1).
   - *Tỷ trọng kỳ vọng*: Chiếm 50% – 60% tổng lượng đơn hàng.
3. **Gói 1 Năm (`pro_1y`) — 1.899.000 VNĐ** *(Gốc: 3.500.000 VNĐ) — [Giá Trị Cao Nhất]*:
   - *Định vị*: Gói Toàn Diện Du Học & Podfak tương đương ~158.000đ/tháng (tiết kiệm 60%); mở khóa AI chấm viết tự luận không giới hạn và kho từ vựng chuyên ngành.
- **Đơn vị kinh tế (Unit Economics)**:
  - Doanh thu dự kiến (500 học viên/năm): $\approx \mathbf{474.500.000 \text{ VNĐ} - \mathbf{620.000.000 \text{ VNĐ / năm}}}$.
  - Chi phí vận hành hạ tầng: Gần như 0 VNĐ nhờ động cơ 0-Egress IndexedDB + CDN tĩnh.
  - Tỷ suất lợi nhuận ròng: **> 90%**.

### 11.6. Lộ Trình Phát Triển Chiến Lược 3 Giai Đoạn (2026 – 2036)
1. **Giai đoạn 1 (2026 – 2027) — Thống trị Ngách Khảo Thí TRKI CBT**:
   - Đóng đinh nhận thức thương hiệu là "Nền tảng luyện thi TRKI số 1 tại Việt Nam".
   - Tập trung vào các hội du học sinh Nga, trường chuyên ngữ THPT và đại học.
2. **Giai đoạn 2 (2028 – 2030) — Mở rộng Hệ sinh thái Du học & Giá trị gia tăng**:
   - Tích hợp dịch vụ tư vấn hồ sơ học bổng hiệp định, dịch thuật công chứng tư pháp, hướng dẫn visa/vé máy bay.
   - Phân phối tài liệu số tiếng Nga chuyên ngành qua chuyên mục Shop.
3. **Giai đoạn 3 (2031 – 2036) — Nền tảng Tri thức tiếng Nga & Đối tác Khảo thí Toàn diện**:
   - Mở rộng ngân hàng đề thi TRKI thiếu nhi (TRKI Dety) và tiếng Nga thương mại / du lịch.
   - Trở thành đối tác khảo thí mô phỏng trực tuyến tin cậy của các cơ quan đào tạo và đại học.

### 11.7. Tác Động Của AI Hiện Nay & 4 Lớp Hào Lũy Phòng Thủ Bền Vững (AI Defensive Moat)
* **Bối cảnh phát triển của AI tổng quát (ChatGPT, Claude, Gemini)**:
  - *Mặt mạnh*: Các mô hình AI tổng quát giải thích ngữ pháp ngắn và dịch thuật câu đơn lẻ rất nhanh.
  - *Mặt yếu chí tử đối với người học TRKI*:
    1. **Thiếu tính cấu trúc sư phạm**: Không có lộ trình luyện thi TRKI bài bản từ A1 đến C2; người học tự hỏi chat thì bị ngợp thông tin và thiếu tính liên tục.
    2. **Không có ngân hàng đề thi chuẩn CBT**: Chatbot không thể mô phỏng phòng thi trắc nghiệm chia đôi màn hình có đồng hồ đếm ngược, phân môn 5 Subtest và tính điểm Pass/Fail theo thang TRKI chuẩn.
    3. **Ảo giác chia 6 Cách tiếng Nga (Hallucinations)**: Tiếng Nga là ngôn ngữ có tính hình thái học cực kỳ phức tạp (6 cách, giống/số, tiếp đầu ngữ động từ chuyển động, cặp thể CB/NCB). AI tổng quát vẫn thường xuyên chia sai đuôi cách ở các từ hiếm hoặc bối cảnh đa tầng.
* **4 Lớp Hào Lũy Dữ Liệu & Công Nghệ Bất Khả Xâm Phạm Của RUSI TRKI**:
  1. **Hào lũy Khảo thí Độc quyền (Proprietary Exam Moat)**: 74 đề thi thật với 3.867 câu hỏi được số hóa chi tiết và giải thích cặn kẽ, đáp án bảo vệ tại server qua RPC `rusi_grade_trki_exam`. Đây là tài sản dữ liệu độc quyền mà các mô hình AI bên ngoài không thể tự tạo ra.
  2. **Hào lũy Lọ Từ Vựng Ngữ Cảnh (Contextual Action Clusters)**: 5.000 từ vựng gắn liền với chuỗi hành động thực tế, quản cách động từ, ví dụ song ngữ, phát âm bản ngữ và thuật toán lặp lại ngắt quãng SM-2.
  3. **Hào lũy Shadowing Studio Âm Học Thời Gian Thực (Acoustic WER Studio)**: 24 bài học video hoạt hình Nga kèm timestamp chuẩn xác từng giây, bóc tách lỗi WER âm học từng từ hiển thị màu trực quan ngay trên câu tiếng Nga — điều mà các chatbot văn bản thuần túy hoàn toàn bất lực.
  4. **Hào lũy Thói Quen Học Tập & Chứng Thực Tiến Độ (Habit & Social Proof)**: Chuỗi ngày Streak, điểm kinh nghiệm XP, bảng xếp hạng và cộng đồng du học sinh Nga tạo ra động lực duy trì việc học mỗi ngày.

### 11.8. Chiến Lược Tối Ưu Hóa Phễu Chuyển Đổi & Tiện Ích Gói Nâng Cấp PRO (Enterprise Conversion Standard)
* **Quy chuẩn hiển thị & điều hướng gói PRO thống nhất**:
  - Khối nâng cấp hội viên trên mọi trang webapp (`index.html`, `mock-test.html`, `vocabulary.html`, `speaking.html`, `writing.html`, `shop.html`) phải hiển thị đồng bộ 3 nấc thời hạn: **1 Tháng** (Nước rút mùa thi), **3 Tháng** (Bứt phá mục tiêu — Phổ biến nhất), và **1 Năm** (Toàn diện du học — Tiết kiệm nhất).
  - Giá bán hiển thị rõ ràng cả giá ưu đãi và giá gốc gạch ngang tạo mỏ neo tâm lý minh bạch.
* **Quy trình thanh toán VietQR 2.0 ma sát tối thiểu (Zero Friction Checkout)**:
  - Nút bấm `[Nâng cấp ngay]` kích hoạt tức thì Modal thanh toán VietQR với mã QR động sinh theo đúng số tiền và nội dung chuyển khoản tự động (`RUSI_[timestamp]_[UserTag]`, Mục 2.3).
  - Hệ thống tự động sao chép số tài khoản và cú pháp chuyển khoản khi người học chạm vào màn hình trên thiết bị di động.
  - Tự động kiểm tra trạng thái đơn mỗi 3 giây; khi đơn được kích hoạt (hiện do admin, Mục 2.3) thì hiện Toast và nâng quyền PRO ngay, không cần tải lại trang.
* **Đảm bảo tính sẵn sàng cấp doanh nghiệp (Enterprise SLA & 0-Egress Architecture)**:
  - Toàn bộ tài nguyên bài học và đề thi được phân phối qua CDN tĩnh kết hợp nạp ngầm vào IndexedDB máy học viên, bảo đảm tốc độ tải trang dưới 1 giây và chi phí băng thông máy chủ xấp xỉ 0 đồng ngay cả khi lưu lượng người dùng tăng đột biến.

