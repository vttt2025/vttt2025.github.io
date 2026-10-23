# RUSI TRKI — ARCHITECTURE, DATABASE, SECURITY, RESPONSIVE & CMS SPECIFICATION

> **Target Audience**: AI Coding Agents (Google Antigravity, Cursor Composer, Windsurf Cascade, Claude Code, Copilot).  
> **Objective**: Context-injection single-source-of-truth specification for building, maintaining, and scaling the RUSI TRKI Platform serving 10,000+ concurrent learners.  
> **Brand & Identity**: Thiết kế hiện đại chuẩn Figma (Figma Make App), biểu tượng chữ cái Nga `Я` nền đỏ nghiêng -6°, Mascot Rusika (Mèo mắt xanh thông minh), Gamification Streak & XP, Theme Mùa đông nước Nga (Russian Winter Cool Blue).  
> **Color Palette**: Russian Crimson Red `#c52233`, Dark Red `#991b2b`, Russian Cobalt Blue `#1757a6`, Deep Baltic Navy `#102a4c`, Mùa đông Cool Blue `#eef4fb`, Warm Cream Paper `#f8f7f3`. Typography `Inter` với headline tracking tối ưu cho tiếng Việt & tiếng Nga.

---

## 1. HỆ THỐNG CÁC PHÂN HỆ CỐT LÕI (CORE MODULES ARCHITECTURE)

```text
                                        [TRANG CHỦ - index.html]
                                 (Slider Đánh Giá · Bong Bóng Chat AI)
              ┌─────────────────────┬──────────────┴──────────────┬─────────────────────┐
              │                     │                             │                     │
       [1. TỪ VỰNG & SRS]     [2. VIẾT TẢ TRANH]           [3. NGHE 4 PART]      [4. NÓI SHADOWING]
        (Lọ Từ · Quizlet)       (Письмо TRKI)               (Chép chính tả)       (AI Chấm âm vị)
              │                                                                         │
       [5. THI THỬ TRKI] ──────────────────────────────────────────────────────── [6. BLOG DU HỌC]
        (A1, A2, B1, B2)                                                          (SEO Cluster)
              │                                                                         │
       [7. SHOP HÀNG NGA] ───────────── [8. NGỮ PHÁP] ──────────── [9. HỘI VIÊN PRO & VIETQR]
        (Bánh kẹo, Mỹ phẩm)              (grammar_lessons)                 (Kích hoạt 1-chạm)
```

### [Module 1] Kho Từ Vựng & Thuật Toán Spaced Repetition (SM-2)
* **Giao diện chuẩn Figma (#tu-vung — https://rigor-hall-40167838.figma.site/#tu-vung)**:
  * **Khung chứa Russian Navy Gradient (`.vocabulary-section`)**: Nền gradient chuyển đổi sang trọng từ xanh hải quân Nga (#102a4c đến #08192d) kết hợp vầng sáng tỏa radial xanh dương, bo góc 24px.
  * **Hàng tiêu đề & Thẻ Tiến độ tròn (`.vocabulary-heading` & `.vocabulary-summary`)**: Kicker nhãn đỏ `KHO TỪ VỰNG`, tiêu đề lớn `Học theo chủ đề. Nhớ theo ngữ cảnh.`, thẻ tiến độ thủy tinh mờ (glassmorphism) với vòng tròn tiến độ động (`.summary-ring`) hiển thị tỷ lệ % thành thạo và thanh tiến độ.
  * **Bộ Tab Phân Cấp Chuẩn (`.level-tabs`)**: 4 tab A1 (Sơ cấp), A2 (Cơ bản), B1 (Trung cấp), B2 (Trung cấp cao) với vạch đỏ chỉ báo active, cỡ chữ lớn 24px kèm số lượng thẻ.
  * **Lưới thẻ chủ đề chuẩn Figma (`.topic-grid` & `.topic-card`)**:
    - Thẻ kính mờ bo góc 20px, hiệu ứng hover nhấc nổi -5px và viền sáng xanh.
    - Hàng trên (`.topic-card-top`): Số thứ tự `01`, `02`... bên trái; nhãn trạng thái `Hoàn thành` (xanh ngọc) hoặc `PRO` (đỏ) bên phải.
    - Khối nội dung chính (`.topic-card-main`): Bố cục ngang với Hộp biểu tượng (`.topic-icon`) bên trái; Tiêu đề thẻ (`h3.topic-title`) bên phải biểu tượng và Mô tả phụ (`p.topic-desc`) nằm dưới tiêu đề bên phải biểu tượng. Bỏ nhãn phân loại cũ.
    - Thanh tiến độ (`.topic-progress`): Cao 4px bo tròn, dải màu xanh biển / xanh lá khi hoàn thành.
    - Chân thẻ (`.topic-footer`): Nhãn trạng thái bên trái (`Đã hoàn thành` / `Dành cho thành viên` / `Sẵn sàng để học`), bên phải gồm nút `[Lọ từ vựng]` (icon archive-jar) và nút tròn mũi tên `[→]` (hoặc `[🔒]` nếu PRO).
    - **Điều hướng & Tương tác**:
      * Bấm vào thẻ hoặc nút mũi tên `[→]`: Chuyển sang Trang Bài Học Chủ Đề (Topic Lesson Article View) với bối cảnh, hội thoại mẫu, điểm ngữ pháp, bảng từ vựng, tính năng **Xuất sang PDF** (`window.print()`) chuẩn chỉnh và mục mở Lọ từ vựng.
      * Bấm vào nút `[Lọ từ vựng]`: Vào thẳng danh sách các từ vựng trong lọ để xem và học 3D Flashcard Spaced Repetition.
* **Mô hình "Lọ từ vựng" (Thematic Action Clusters)**:
  * Không học từ A-Z mà gom từ theo chuỗi hành động ngữ cảnh sống còn (*Lọ mua sắm Auchan*, *Lọ vali du học*, *Lọ sân bay Sheremetyevo*, *Lọ ký túc xá*...).
  * 18 lọ hệ thống chuẩn A1 - B2 chứa từ vựng cốt lõi kèm trọng âm, chú thích giống (он/она/оно) và ví dụ câu thực tế.
  * **Cấu trúc 2 nút thao tác riêng biệt trên mỗi lọ**:
    1. Nút `[📋 Xem từ]`: Mở ngay giao diện danh sách chi tiết các từ có trong lọ.
    2. Nút tròn `[→]`: Khởi động ngay chế độ học Flashcard 3D theo thuật toán SRS.
  * **Bố cục Danh sách từ chuẩn DauEnglish (`https://dauenglish.com/vocabulary/test/...`)**:
    - **Thẻ Flashcard xem nhanh trên cùng (`.dau-vocab-preview-box`)**: Cho phép lật thẻ xem nhanh (Space hoặc chạm thẻ), nghe phát âm 🔊, gắn sao ⭐, trộn thẻ 🔀 và chuyển từ (`‹ 1/20 ›`) ngay trong giao diện danh sách.
    - **Thanh công cụ lọc chuẩn DauEnglish (`.dau-vocab-toolbar`)**: Hiển thị tiêu đề *Thuật ngữ trong học phần này (N)*, ô tìm kiếm từ/nghĩa, nút bật/tắt *Chi tiết* (ví dụ câu, từ loại, đồng nghĩa), bộ lọc *⭐ Gắn sao*, *✓ Đã thuộc*, bộ sắp xếp *Thứ tự gốc / A → Z* và nút CTA *⚡ Học Flashcard ngay →*.
    - **Hiển thị danh sách thẻ hàng ngang chuẩn (`.dau-vocab-row-card`)**: Bố cục 3 phần trực quan (Từ tiếng Nga kèm trọng âm & từ loại bên trái; Nghĩa tiếng Việt & câu ví dụ song ngữ ở giữa; Bộ nút hành động 🔊 phát âm, ⭐ gắn sao, ✓ đánh dấu đã thuộc, 📖 tra 6 cách TFlat, 🫙 lưu lọ cá nhân bên phải).
    - **Kích hoạt tức thì**: Khi bấm `[📋 Xem từ (N)]` trên lọ từ vựng, hệ thống tự động kích hoạt ngay tab danh sách (`initialMode = "list"`) và hiển thị dữ liệu ngay lập tức, không để xảy ra tình trạng trống trắng.
  * Hỗ trợ học viên tự tạo lọ từ vựng cá nhân (`custom_jars`).
* **Thuật toán lặp lại ngắt quãng SM-2 / Hộp Leitner (`srs.js`)**:
  * Vòng đời thẻ: `Unseen` $\to$ `New` $\to$ `Learning` $\to$ `Reviewing` $\to$ `Mastered`.
  * Chu kỳ giãn cách: Từ mới (Again = 5 thẻ, Hard = 6h, Good = 1 ngày, Easy = 3 ngày); Từ đã ôn (Hard $\times 2$, Good $\times 3$, Easy $\times 4$).
  * Đánh giá 4 mức SRS trực tiếp trên Flashcard: `Again (Ôn lại)`, `Hard (Khó)`, `Good (Nhớ tốt)`, `Easy (Dễ)` đồng bộ trực tiếp vào tiến độ học (`Progress`) và thuật toán SRS.
  * Tự động lọc danh sách "Đến hạn hôm nay" (`dueCards`).
* **Hệ sinh thái chế độ học chuẩn Quizlet (`pages.js`)**:
  1. *Danh sách từ (Word List Grid)*: Bố cục lưới ô thẻ chi tiết, tra cứu 6 cách, lưu lọ cá nhân.
  2. *Thẻ ghi nhớ 3D (Flashcard)*: Lật thẻ xoay chiều, audio phát âm bản xứ, thanh đánh giá SRS 4 mức, phím tắt `Space` và mũi tên.
  3. *Học thông minh (Learn)*: Trắc nghiệm 4 đáp án với từ gây nhiễu tự sinh, phím tắt 1-4, lưu danh sách từ sai để ôn lại.
  4. *Gõ từ & Chính tả (Write & Spell)*: **Tích hợp bàn phím ảo Cyrillic** hỗ trợ các ký tự khó (`ё, й, ъ, ы, ь, э, щ, ж, ц, ч, ш, ю, я`).
  5. *Ghép thẻ phản xạ (Match Game)*: Trò chơi nối từ Nga - Việt với đồng hồ mili-giây và lưu Kỷ lục cá nhân (Best Record).
  6. *Kiểm tra tổng hợp (Test)*: Trắc nghiệm kết hợp Đúng/Sai, tính điểm % và thưởng XP.
* **Tra cứu Ngữ pháp Chuyên sâu TFlat (`dict-detail.js` & `dict-data.js`)**:
  * Modal tra từ đa tầng: Bảng 6 Cách danh từ/tính từ, chia thì động từ & cặp thể CB/NCB, kết cấu quản cách (Управление: ví dụ *перекусить чем?*), từ đồng/trái nghĩa, họ từ gốc.
  * Tích hợp kho từ điển offline 81.000 từ Nga-Việt và 91.700 từ Việt-Nga.

### [Module 2] Luyện Viết Tả Tranh (Письмо TRKI)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số từ` (ví dụ `A1 | 40 từ`), không hiển thị mô tả, phía dưới giữ nguyên trạng thái viết và nút CTA `[Bắt đầu viết →]`.
* **Format chuẩn quốc tế**: Đưa ra 1 hình ảnh hoặc bối cảnh thực tế tại Nga.
* **Hỗ trợ người học**: Bàn phím ảo Cyrillic, danh sách từ vựng gợi ý cần xuất hiện trong bài.
* **AI Chấm điểm theo 4 tiêu chí CEFR**:
  1. Ngữ pháp & Biến cách 6 Cách (Грамматика)
  2. Vốn từ & Cụm từ liên kết (Лексика)
  3. Bố cục mạch lạc (Структура)
  4. Hoàn thành nhiệm vụ đề bài (Содержание)
* Bảng đối chiếu chi tiết: `[Câu gốc lỗi] ➔ [Câu sửa chuẩn] ➔ [Giải thích ngữ pháp]`.

### [Module 3] Luyện Nghe (Nghe Hiểu 4 Part & Video YouTube 1-5 Phút Chuẩn TRKI)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu`), không hiển thị mô tả, phía dưới giữ nguyên trạng thái và nút CTA `[Vào luyện nghe →]`.
* **Bố cục Shadowing Studio chuẩn DauEnglish (2 Cột Hiện Đại)**:
  * **Cột trái (Video & Luyện câu trọng tâm)**:
    - Khung video YouTube 16:9 bo góc mượt mà kèm lớp phủ phụ đề nổi (`.dau-shadow-sub-overlay`) hiển thị song ngữ câu đang chọn.
    - Thanh điều khiển tốc độ video (0.75x, 1.0x, 1.25x) tương tác trực tiếp qua postMessage API và nút ẩn/hiện dịch nghĩa.
    - **Thẻ luyện câu trung tâm (`.dau-sentence-card`)**: Câu tiếng Nga in to rõ ràng, nút chọn số lần tự lặp (1×, 2×, 3×), nút phát âm câu `[🔊 Nghe câu]`, nút Micro to tròn `[🎤 Shadowing]`, sóng âm chuyển động (`.waveform-box`), nhận diện giọng nói tiếng Nga và vòng tròn chấm điểm `% chính xác` (`.score-ring`). Thưởng +10 XP khi đạt $\ge 70\%$.
    - **Bài trắc nghiệm kiểm tra sau khi xem video**: Bộ câu hỏi đo lường mức độ nghe hiểu tình huống, phản hồi đúng/sai tức thì kèm giải thích chi tiết, tự động chấm điểm và thưởng +20 XP khi đạt $\ge 60\%$.
  * **Cột phải (Danh sách câu cuộn dọc)**:
    - Bảng danh sách toàn bộ các câu trong bài, hiển thị số thứ tự, nhân vật thoại, câu tiếng Nga và tiếng Việt.
    - Đánh dấu câu đang chọn (`active`) nổi bật và tự động cuộn đến khi đổi câu.
    - Bấm vào bất kỳ câu nào để kích hoạt ngay câu đó bên cột trái và phát âm mẫu.
    - Thanh tiến độ mini (`.dau-side-progress-bar`) hiển thị tỷ lệ hoàn thành các câu đã đạt.
  * **Thanh điều khiển chân trang cố định (Sticky Bottom Bar)**:
    - Phím điều hướng `← Câu trước`, `🔊 Nghe lại (Space)`, `🎙️ Luyện nói (R)`, `Câu tiếp theo →` và bảng hướng dẫn phím tắt trực quan.
* **Phân cấp 4 Part bài bản theo định dạng đề thi chứng chỉ ТРКИ**:
  * **Level 01 (Nghe mô tả tranh)**: Học viên quan sát một bức tranh, nghe các câu mô tả bằng tiếng Nga và lựa chọn câu phù hợp nhất với nội dung hình ảnh.
  * **Level 02 (Nghe hội thoại ngắn)**: Học viên nghe một câu hỏi hoặc lời nói bằng tiếng Nga, sau đó lựa chọn câu trả lời phù hợp nhất trong các phương án được đưa ra.
  * **Level 03 (Nghe hội thoại dài)**: Học viên nghe một đoạn hội thoại giữa hai hoặc nhiều người, sau đó trả lời các câu hỏi về nội dung, thông tin chi tiết, mục đích giao tiếp hoặc ý định của người nói.
  * **Level 04 (Nghe bài nói ngắn)**: Học viên nghe một bài nói của một người (thông báo ga tàu/sân bay, tin tức, lời giới thiệu, hướng dẫn hoặc bài trình bày ngắn), rồi trả lời các câu hỏi liên quan.
* **Trình phát chuyên dụng**: Tách audio từng câu, ẩn/hiện phụ đề song ngữ, tua chậm 0.75x - 1.25x, lặp lại câu.
* **Giao diện tinh gọn**: Nút CTA điều hướng rõ ràng ("Vào luyện nghe →"), loại bỏ biểu tượng rườm rà.

### [Module 4] Luyện Nói (Shadowing & AI Phân Tích Âm Vị)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 8 câu`), không hiển thị mô tả, phía dưới giữ nguyên kỷ lục điểm và nút CTA `[Luyện nói ngay →]`.
* **Phương pháp Shadowing**: Nghe mẫu từ người bản xứ, thu âm nhại theo tốc độ, trọng âm và ngữ điệu kèm hiển thị sóng âm trực quan (Audio Waveform).
* **Phân tích âm vị (Phoneme Matching)**: Phân tích lỗi sai trọng âm và nhầm lẫn phụ âm cứng/mềm (ví dụ: `б - п`, `д - т`, `в - ф`).

### [Module 5] Luyện Thi TRKI (ТРКИ Exam Simulation)
* **Giao diện thẻ tối giản chuẩn mới (`.dau-card-compact`)**: Nhỏ gọn, icon bên trái phía trên | Tiêu đề ở phía phải bên trên, dưới tiêu đề là `Mức độ | Số câu` (ví dụ `A1 | 15 câu`), không hiển thị mô tả, phía dưới giữ nguyên trạng thái kết quả và nút CTA `[Vào phòng thi →]`.
* **Cấp độ chuẩn**: A1 (ТЭУ), A2 (ТБУ), B1 (ТРКИ-1), B2 (ТРКИ-2).
* **Phòng thi mô phỏng**: Đồng hồ đếm ngược server-side, tự động thu bài khi hết giờ, giám sát chuyển tab gian lận (`visibilitychange`).
* **Báo cáo kết quả**: Điểm số TRKI dự đoán, phân tích ngữ pháp chi tiết từng câu sau khi nộp bài.

### [Module 6] Blog & Cẩm Nang Du Học Nga
* **Kênh SEO tự nhiên**: Trải nghiệm KTX, review trường đại học (MGU, HSE, RUDN...), thủ tục visa, cư trú MVD, thẻ ngân hàng Mir/Sberbank, săn học bổng Hiệp định.
* **SEO Cluster**: Phễu dẫn link nội bộ về thi thử TRKI và nâng cấp gói PRO.

### [Module 7] Shop Hàng Nga Nội Địa & Dịch Vụ Du Học
* **Sản phẩm nội địa Nga**: Bánh kẹo Alenka, mỹ phẩm Siberia hữu cơ, đồ lưu niệm Matryoshka.
* **Dịch vụ du học**: Tư vấn hồ sơ du học Nga, dịch thuật công chứng tư pháp.

### [Module 8] Phân Hệ Bài Học Ngữ Pháp (`grammar_lessons`)
* **Lộ trình ngữ pháp có cấu trúc**: Bổ sung bảng `grammar_lessons` trên Supabase với mã bài học (`code`), cấp độ (`level`), phân loại (`category`), tóm tắt (`summary`), nội dung Markdown (`content_md`), quy tắc (`rules`), ví dụ (`examples`) và bài tập áp dụng (`exercises`).

---

## 2. NÂNG CẤP HỘI VIÊN & CỔNG THANH TOÁN VIETQR 2.0

### 2.1. Bảng gói cước:
1. **Gói 6 Tháng (`pro_6m`)**: Mở khóa toàn bộ đề TRKI A1 - A2, luyện nghe 4 Part, không giới hạn lọ từ vựng.
2. **Gói 1 Năm (`pro_1y` - Phổ biến nhất 🔥)**: Mở khóa TOÀN BỘ ngân hàng đề A1 - B2, AI chấm tự luận Viết, AI luyện nói & sửa lỗi phát âm.
3. **Gói Trọn Đời (`pro_vip` 💎)**: Quyền VIP vĩnh viễn, tặng quà lưu niệm Nga nội địa, voucher dịch vụ du học.

### 2.2. Cơ chế phân quyền hiển thị (Auth-Aware Upgrade Flow):
* **Khách chưa đăng nhập**: Header chỉ hiển thị `[Đăng nhập]` và `[Đăng ký]`. Bảng giá trên trang chủ ẩn đi để giao diện tinh gọn. Khi truy cập nội dung VIP, hiển thị Auth Modal với tùy chọn đăng nhập Google hoặc dùng nhanh phiên Khách.
* **Học viên Free**: Header hiển thị nút nổi bật `[⚡ Nâng cấp PRO]` dẫn thẳng đến `upgrade.html`. Menu tài khoản có thẻ CTA nâng cấp.
* **Học viên PRO**: Header hiển thị huy hiệu hoàng gia `[👑 PRO MEMBER]`. Menu tài khoản hiển thị thời hạn bản quyền.
* **Cửa sổ popup bảo vệ nội dung PRO (PRO Gate Modal)**: Khi người học chưa mua gói PRO kích vào xem bất kỳ nội dung PRO nào (Lọ từ vựng nâng cao, Bài nghe thực tế, Chủ đề luyện nói, Đề viết tự luận, Phòng thi TRKI), hệ thống tự động hiển thị popup chuẩn hoá:
  - Tiêu đề: *Nội dung dành cho PRO* kèm huy hiệu vương miện hoàng gia 👑.
  - Nội dung: Nêu rõ quyền lợi đặc quyền ("Nâng cấp lên gói PRO để mở khóa toàn bộ kho từ vựng B1–B2, đề thi thử ТРКИ chuẩn quốc tế, bài luyện nghe video thực tế, AI chấm bài tự luận và nhận diện phát âm không giới hạn.").
  - Đúng 2 nút lựa chọn: **`[ 👑 Tìm hiểu gói PRO → ]`** (chuyển thẳng tới trang `upgrade.html`) và **`[ Để sau ]`** (đóng popup quay lại trang hiện tại).

### 2.3. Cổng VietQR 2.0 kích hoạt tức thì:
* **Mã đơn định danh**: Sinh mã tự động kèm ID người học (`RUSI_[ordNum]_[userTag]`).
* **Đếm ngược phiên 15:00**: Đếm ngược an toàn chuẩn Napas / VietinBank.
* **Sao chép 1-chạm**: Nút copy số tài khoản, số tiền và nội dung chuyển khoản kèm thông báo `✓ Đã chép`.
* **Kích hoạt tự động thời gian thực**: Kiểm tra chữ ký điện tử sau khi người dùng bấm xác nhận và cập nhật trạng thái PRO toàn trang không cần reload.
* **Lưu trữ per-user**: Lưu trạng thái vào `trki_pro_${user.uid}`, tránh mất gói hoặc dùng chung tài khoản.

---

## 3. QUY CHUẨN RESPONSIVE MOBILE, TABLET & QUY TẮC "MORE..." OVERFLOW

> **Quy định bắt buộc:** Được quy định trong [`AGENTS.md`](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/AGENTS.md), [`GEMINI.md`](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/GEMINI.md) và Skill [`.agents/skills/responsive-design/SKILL.md`](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/SKILL.md). Áp dụng sau **mọi** thay đổi UI.

### 3.1. Tiêu chuẩn thiết bị:
* **Mobile (<= 768px & <= 480px)**:
  * Lưới đa cột bắt buộc chuyển thành 1 cột duy nhất (`grid-template-columns: 1fr`).
  * Khóa hoàn toàn thanh cuộn ngang ngoài ý muốn trên toàn trang (`overflow-x: hidden`).
  * Đệm container chuẩn: `12px - 16px`.
  * Vùng chạm cảm ứng (Tap Target) tối thiểu `44px x 44px`.
  * Cỡ chữ ô nhập liệu $\ge 16px$ để ngăn iOS Safari tự động zoom trang.
* **Tablet (768px - 1024px)**:
  * Chuyển lưới 3-4 cột thành 2 cột cân xứng. Sidebar thu gọn hoặc chuyển thành drawer/tabs.

### 3.2. Quy tắc "More..." (Tuyệt đối không để hiển thị dở dang / chém nửa chữ):
1. **Tabs & Bộ lọc**:
   * Nếu có $\ge 4$ tabs trên mobile hoặc $\ge 5$ tabs trên tablet: Không được để tab cuối bị cắt cụt lưng chừng.
   * **Bắt buộc gom vào nút "More..." / "Thêm ▾" / Dropdown `<select>`**.
   * Nếu chọn cuộn ngang (`overflow-x: auto`), bắt buộc áp dụng lớp mặt nạ làm mờ (`mask-image: linear-gradient(to right, black 85%, transparent 100%)`).
2. **Hàng nút thao tác (Action Toolbars)**:
   * Giữ 1 nút Primary và tối đa 1 nút Secondary. Các nút phụ gom vào nút ba chấm `···` (Kebab menu).
3. **Thẻ nhãn (Tags / Chips)**:
   * Giới hạn hiển thị tối đa 3-4 nhãn đầu tiên; phần còn lại hiển thị `+N khác ▾`.
4. **Văn bản & Đoạn mô tả dài**:
   * Sử dụng CSS `-webkit-line-clamp: 2` hoặc `3` kết hợp nút bấm `Xem thêm ▾` / `Thu gọn ▴`.
5. **Bộ tiện ích CSS chuẩn trong `styles.css`**:
   * `.rusi-tabs-container`, `.rusi-tab-more-dropdown`, `.rusi-tab-more-btn`, `.rusi-tab-more-menu`
   * `.rusi-action-toolbar`, `.rusi-kebab-wrapper`, `.rusi-kebab-btn`, `.rusi-kebab-menu`
   * `.rusi-truncate-box`, `.rusi-truncate-text`, `.rusi-btn-toggle-more`
   * `.rusi-chips-group`, `.rusi-chip-more`
   * `.rusi-scroll-track-faded`

---

## 4. QUẢN TRỊ ADMIN CMS & PROPAGATION ENGINE

### 4.1. Phân quyền quản trị (RBAC):
* **Super Admin**: Cấu hình toàn hệ thống, quản lý doanh thu, xem audit logs.
* **Academic Admin**: Quản lý ngân hàng đề thi TRKI, lọ từ vựng, bài tập nghe/nói/viết, bài học ngữ pháp.
* **Teacher / Reviewer**: Chấm bài viết Письмо, ghi nhận xét phát âm.
* **Operations / Support**: Quản lý đơn hàng Shop, kích hoạt PRO bù khi có sự cố chuyển khoản.

### 4.2. Cơ chế đồng bộ dữ liệu trực tiếp (Live Propagation Engine):
```text
[Admin sửa tại admin.html] ➔ [localStorage: trki_admin_data] ➔ [app.js: mergeAdminData()]
                                       │
                   ┌───────────────────┴───────────────────┐
                   ▼                                       ▼
       [window.* Datasets Mutated]              [Cross-Tab Reactivity]
        (target.splice in-place)                 (storage event broadcast)
                   │                                       │
                   ▼                                       ▼
       [Trang học viên nhận ngay]               [Mọi tab đang mở cập nhật tức thì]
```
* **Đột biến mảng In-Place (`target.splice`)**: Đảm bảo các closures trên giao diện học viên cập nhật dữ liệu mới ngay lập tức mà không cần F5.
* **Soft-Delete an toàn**: Xóa mềm qua danh sách `store.__deleted[type]`, cho phép khôi phục gốc bất kỳ lúc nào.
* **Đa tab thời gian thực**: Lắng nghe sự kiện `storage` để đồng bộ giữa các tab đang mở.

---

## 5. KIẾN TRÚC HYBRID SUPABASE & OFFLINE-FIRST

Hệ thống hoạt động theo mô hình **Đám mây là chính — Fallback ngoại tuyến 100%**:

```text
                               ┌────────────────────────────────┐
                               │   Supabase PostgreSQL Cloud    │
                               │   (nrhtdwjihnlaxrbitmcf)       │
                               └───────────────▲────────────────┘
                                               │ (REST / RLS / MCP)
                                               ▼
                               ┌────────────────────────────────┐
                               │      supabase-client.js        │
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
  1. `vocab_jars` & `jar_items` (Lọ từ vựng hệ thống & cá nhân)
  2. `trki_bank` (Ngân hàng đề thi TRKI A1 - B2)
  3. `listening_lessons` (Bài luyện nghe 4 Part)
  4. `speaking_sets` (Bộ câu luyện nói Shadowing)
  5. `writing_tasks` (Đề tả tranh & bài mẫu)
  6. `vocab_lessons` (Video hoạt hình «Хочу в Россию»)
  7. `blog_posts` (Cẩm nang du học & đời sống)
  8. `shop_products` (Sản phẩm nội địa & dịch vụ)
  9. `packages` (Bảng giá gói cước PRO)
  10. `grammar_lessons` (Bài học ngữ pháp có cấu trúc)
* **Toàn bộ trang học viên đều dùng API thống nhất**: `initVocabPage`, `initListeningPage`, `initSpeakingPage`, `initWritingPage`, `initMockTestPage`, `initBlogPage`, `initShopPage`, `initUpgradePage` đều truy vấn Supabase trước, tự động chuyển về `data.js` nếu mất kết nối.

---

## 6. BẢO MẬT HỆ THỐNG & NGUYÊN TẮC CLEAN CODE

### 6.1. Bảo mật API Keys & Bí mật (Secret Hygiene):
* **Tuyệt đối cấm commit Secret Keys**: Không bao giờ đưa Supabase Service Role Key (`sbp_...`, `service_role`), Firebase Admin Credentials hoặc Private Tokens vào mã nguồn client hay lịch sử Git.
* **Chỉ sử dụng Anon / Public Key trên Web**: Kết hợp với PostgreSQL Row Level Security (RLS) để bảo vệ dữ liệu.
* **Cấu hình MCP Supabase an toàn**: MCP Server Supabase chỉ được định nghĩa trong file cấu hình local (`~/.gemini/config/mcp_config.json`) của môi trường phát triển, không push lên Git.

### 6.2. Chống lộ đáp án & gian lận đề thi (Zero-Answer Leak):
* API đề thi chỉ cung cấp câu hỏi, hình ảnh, âm thanh và các lựa chọn; không bao giờ trả về đáp án đúng (`correct_option`) hay lời giải thích (`explanation_text`) trước khi nộp bài.
* Chấm điểm được thực hiện sau khi có hành động nộp bài chính thức.

### 6.3. Giám sát phiên & chống chia sẻ tài khoản:
* Bảng `profiles` theo dõi `current_session_id`. Nếu phát hiện phiên mới từ thiết bị khác, hệ thống tự động đăng xuất phiên cũ.

---

## 7. DATABASE SCHEMA CHI TIẾT (SUPABASE POSTGRESQL)

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. BẢNG HỒ SƠ NGƯỜI DÙNG & GAMIFICATION
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

-- 2. BẢNG TỪ VỰNG & TỪ ĐIỂN
CREATE TABLE vocabularies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word_with_stress TEXT NOT NULL,
    word_normalized TEXT NOT NULL,
    transcription TEXT,
    pos TEXT NOT NULL,
    gender CHAR(1),
    aspect TEXT,
    meaning_vi TEXT NOT NULL,
    cases_table JSONB,
    conjugation_data JSONB,
    structures JSONB,
    synonyms TEXT[],
    antonyms TEXT[],
    family_words TEXT[],
    audio_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_vocab_norm ON vocabularies USING gin (word_normalized gin_trgm_ops);

-- 3. BẢNG LỌ TỪ VỰNG CHỦ ĐỀ & SPACED REPETITION
CREATE TABLE vocab_jars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    level TEXT NOT NULL,
    level_name TEXT,
    description TEXT,
    icon TEXT DEFAULT '🫙',
    color_code TEXT DEFAULT '#0039A6',
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
    ease_factor NUMERIC(3,2) DEFAULT 2.5,
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    review_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BẢNG BÀI HỌC NGỮ PHÁP (MỚI)
CREATE TABLE grammar_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    category TEXT NOT NULL,
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

-- 5. BẢNG ĐỀ THI TRKI
CREATE TABLE trki_bank (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    level TEXT NOT NULL,
    level_name TEXT,
    duration INT NOT NULL,
    passing_score INT DEFAULT 66,
    is_vip BOOLEAN DEFAULT FALSE,
    parts JSONB NOT NULL,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BẢNG LUYỆN NGHE & NÓI
CREATE TABLE listening_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    part_type TEXT NOT NULL,
    title TEXT NOT NULL,
    level TEXT,
    audio_url TEXT NOT NULL,
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
    sentences JSONB NOT NULL,
    is_vip BOOLEAN DEFAULT FALSE,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BẢNG LUYỆN VIẾT
CREATE TABLE writing_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
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

-- 8. BẢNG BLOG & SHOP & GÓI CƯỚC
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tag TEXT,
    date TEXT,
    icon TEXT DEFAULT '🇷🇺',
    summary TEXT,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT TRUE,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shop_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    category_name TEXT,
    price INT NOT NULL,
    original_price INT,
    badge TEXT,
    image TEXT,
    description TEXT,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE packages (
    id VARCHAR(50) PRIMARY KEY,
    name TEXT NOT NULL,
    badge TEXT,
    target TEXT,
    price INT NOT NULL,
    original_price INT,
    duration_days INT,
    popular BOOLEAN DEFAULT FALSE,
    features JSONB NOT NULL,
    raw_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    package_id VARCHAR(50) REFERENCES packages(id),
    amount NUMERIC NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'VIETQR',
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);
```

---

## 8. QUY TẮC CỐT LÕI CHO AI CODING AGENT

> [!CAUTION]
> ### 🛑 QUY TẮC BẤT KHẢ XÂM PHẠM: TUYỆT ĐỐI KHÔNG TỰ Ý SỬA NỘI DUNG ĐÃ CÓ TRÊN WEB
> **Không được sửa, xóa hoặc thay đổi bất kỳ nội dung nào mà người dùng đã đặt trên web, trừ khi chính người dùng có yêu cầu đích danh mới được sửa.**
> - Toàn bộ câu từ, tiêu đề chính/phụ, đoạn mô tả hero, giới thiệu, nhãn dán, nội dung bài viết, đề thi, dữ liệu bài học... trên tất cả các trang web (`.html`, `app.js`, `pages.js`, `data.js`...) phải được **giữ nguyên vẹn 100%**.
> - Khi thực hiện các tác vụ căn chỉnh giao diện, CSS styling, responsive, sửa lỗi kỹ thuật hay tối ưu code: AI **chỉ xử lý phần kỹ thuật/style**, tuyệt đối không được tự ý lược bỏ hay viết lại nội dung của người dùng.

1. **Bảo tồn nguyên vẹn nội dung người dùng (Content Integrity)**: Tuyệt đối không xóa, sửa, rút gọn tiêu đề, mô tả, văn bản người dùng đã đặt trên web trừ khi có yêu cầu rõ ràng từ người dùng.
2. **Tuân thủ quy chuẩn Responsive & "More..."**: Trước khi báo cáo hoàn thành bất kỳ tác vụ giao diện nào, luôn kiểm tra hiển thị trên Mobile ($\le 768px$) và Tablet ($768px - 1024px$), áp dụng quy tắc "More..." cho các thành phần dài/tràn.
3. **Quy tắc bảo vệ ngôn từ UI — Cấm hiển thị từ "Trụ Cột"**:
   * Khái niệm "7 Trụ cột" chỉ là thuật ngữ cấu trúc tài liệu nội bộ; **tuyệt đối không hiển thị từ "Trụ cột" ra màn hình học viên**. Chỉ gọi tên trực tiếp: *Kho Lọ Từ Vựng, Luyện Viết Tả Tranh, Luyện Nghe 4 Part, Luyện Nói Shadowing, Luyện Thi TRKI, Shop Hàng Nga, Cẩm Nang Du Học*.
4. **Quy chuẩn Header Navigation**:
   * Cấu trúc cân đối 3 vùng: Logo bên trái sát mép, 7 chuyên mục nằm ở giữa, cụm Auth/PRO nằm bên phải.
   * Khi chưa đăng nhập: Không hiện mặc định XP hay Streak ra ngoài. Khi đã đăng nhập: Hiện trang trọng bên trong dropdown tài khoản.
5. **Theme Russian Winter Cool Blue**:
   * Cố định giao diện Sáng (`data-theme="light"` và `data-season="winter"`), nền xanh mát mẻ thanh lịch của mùa đông nước Nga (`--bg: #eef4fb;`, surface `#ffffff;`, text `#0f1f38;`, border `#d2e0f0;`).
6. **Quy chuẩn Deploy GitHub Pages & Cache-Busting**:
   * Luôn duy trì file `.nojekyll` ở thư mục gốc.
   * Nhúng file tĩnh kèm query parameter `?v=3.2` để buộc CDN Cloudflare và GitHub Pages cập nhật ngay phiên bản mới nhất.
7. **Bảo mật Git & Secret Hygiene**:
   * Không bao giờ commit API secret key, Service role key hay thông tin nhạy cảm vào Git.
8. **Quy chuẩn Chân trang (Footer Navigation)**:
   * Cố định đúng 7 liên kết chuyên mục cốt lõi trong `.footer-links`: `Từ vựng | Viết | Nghe | Nói | TRKI | Blog | Shop`. Tuyệt đối không chèn thêm các liên kết phụ trợ (`how-to-study.html`, `upgrade.html`) vào danh sách này để duy trì sự thanh thoát, cân xứng với Header.
9. **Quy chuẩn Bộ Lọc & Phân Trang (Default Level A1 & Pagination)**:
   * Các trang danh sách bài học/đề thi mặc định lọc theo cấp độ `A1` (Sơ cấp) thay vì "Tất cả", giúp người học mới bắt đầu không bị ngợp và tối ưu hóa tốc độ nạp dữ liệu.
   * Thanh công cụ lọc phải tinh gọn, hỗ trợ phân trang (Pagination) rõ ràng khi số lượng mục lớn.
10. **Phong cách Thiết kế Tối giản & Biên tập Tinh Tế (Clean Editorial Style)**:
   * Tránh lạm dụng emoji trang trí ở tiêu đề mục và nút bấm CTA (ví dụ: dùng *"Bắt đầu luyện nghe →"*, *"Bắt đầu luyện nói →"*, *"Bắt đầu học ngay hôm nay"* thay vì các biểu tượng gây xao nhãng như 🎧, 🎙️, 🚀).
   * Các nút bấm xác thực (Đăng nhập, Đăng ký) tại Header sử dụng icon SVG tối giản, thanh mảnh.
11. **Tối ưu Trang chủ (`index.html`)**:
   * **Trợ lý AI**: Ẩn khối giới thiệu tĩnh trên trang chủ, chuyển thành dạng bong bóng chat nổi tròn thông minh (`.companion-bubble`) cố định ở góc dưới bên phải màn hình.
   * **Minh chứng xã hội (Social Proof)**: Tích hợp slider/carousel tự động chạy 5 phản hồi thực tế của học viên kèm avatar, số sao 5★ và lời nhận xét chân thực.


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

Thư viện [`rusi-icons.js`](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/rusi-icons.js) được tích hợp ở thẻ `<head>` hoặc trước `app.js` trong mọi trang web HTML:

```html
<script src="rusi-icons.js?v=3.2"></script>
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

### 9.4. Quy Định Bắt Buộc Khi Tạo Mới Trang & UI Components

1. **Tuyệt đối không dùng emoji hệ điều hành làm biểu tượng tương tác**:
   * Không đặt `🎧`, `🎙️`, `✍️`, `👑`, `⚡`, `⭐`, `🗑️` làm icon nút bấm hoặc danh sách chọn.
   * Luôn gọi `RusiIcons.get(id, { size })` hoặc đặt thẻ `data-rusi-icon="id"`.
   * **Hiển thị chủ đề & phân hệ dữ liệu (Lọ từ vựng, Nghe, Nói, Viết, Đề thi, Blog, Shop, CMS)**: Không được render chuỗi raw emoji trực tiếp từ database/JSON. Bắt buộc hiển thị qua `RusiIcons.get(item.icon || defaultSlug, { size })` để luôn xuất ra SVG Lucide 24px chuẩn nét.
2. **Kế thừa màu sắc**:
   * Luôn để `color: "currentColor"` để icon tự đổi màu mượt mà theo trạng thái `:hover`, `:active`, theme Dark/Light và class cha.
3. **Tuân thủ tap target $\ge 44\times 44$px**:
   * Mặc dù icon có kích thước 16px - 24px, container nút bấm (`.dau-action-icon-btn`, `.btn-icon`) trên mobile/tablet phải có padding để đạt vùng chạm $\ge 44\times 44$px.
