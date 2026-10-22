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
* **Mô hình "Lọ từ vựng" (Thematic Action Clusters)**:
  * Không học từ A-Z mà gom từ theo chuỗi hành động ngữ cảnh sống còn (*Lọ mua sắm Auchan*, *Lọ vali du học*, *Lọ sân bay Sheremetyevo*, *Lọ ký túc xá*...).
  * 18 lọ hệ thống chuẩn A1 - B2 chứa từ vựng cốt lõi kèm trọng âm, chú thích giống (он/она/оно) và ví dụ câu thực tế.
  * **Thiết kế thẻ lọ nhỏ gọn tối giản (`.dau-card-compact`)**: Hiển thị số lượng từ, cấp độ (A1-B2), gắn huy hiệu `👑 PRO` cho các lọ B1, B2 và lọ chuyên sâu.
  * **Cấu trúc 2 nút thao tác riêng biệt trên mỗi lọ**:
    1. Nút `[📋 Xem từ (N)]`: Mở ngay giao diện danh sách chi tiết các từ có trong lọ.
    2. Nút `[⚡ Học]`: Khởi động ngay chế độ học Flashcard 3D theo thuật toán SRS.
  * **Hiển thị danh sách từ dạng thẻ ô (`vocab-word-card`)**: Mỗi từ 1 ô độc lập gồm từ tiếng Nga có trọng âm chuẩn, từ loại, nút phát âm 🔊, định nghĩa tiếng Việt, câu ví dụ song ngữ kèm audio 🔊, từ đồng nghĩa, nút `[🏺 + Lọ của tôi]` (lưu vào lọ từ cá nhân) và nút `[📖 Tra 6 cách]` (tra cứu bảng biến cách TFlat).
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
* **Giao diện thẻ tối giản (`.dau-card-compact`)**: Nhỏ gọn, hiển thị số từ tối thiểu, thời gian ước tính, huy hiệu `👑 PRO` cho bài B1/B2, kiểm tra quyền PRO khi mở bài.
* **Format chuẩn quốc tế**: Đưa ra 1 hình ảnh hoặc bối cảnh thực tế tại Nga.
* **Hỗ trợ người học**: Bàn phím ảo Cyrillic, danh sách từ vựng gợi ý cần xuất hiện trong bài.
* **AI Chấm điểm theo 4 tiêu chí CEFR**:
  1. Ngữ pháp & Biến cách 6 Cách (Грамматика)
  2. Vốn từ & Cụm từ liên kết (Лексика)
  3. Bố cục mạch lạc (Структура)
  4. Hoàn thành nhiệm vụ đề bài (Содержание)
* Bảng đối chiếu chi tiết: `[Câu gốc lỗi] ➔ [Câu sửa chuẩn] ➔ [Giải thích ngữ pháp]`.

### [Module 3] Luyện Nghe (Nghe Hiểu 4 Part & Video YouTube 1-5 Phút Chuẩn TRKI)
* **Giao diện thẻ tối giản (`.dau-card-compact`)**: Gắn huy hiệu `👑 PRO` cho các bài học B1/B2, kiểm tra quyền PRO trước khi vào luyện nghe.
* **Tích hợp Xem Video YouTube Thực Tế (1-5 phút)**:
  * Trích xuất các đoạn hội thoại thực tế ngắn 1-5 phút (thông số `startSec` & `endSec`) chuẩn giọng Moscow từ YouTube.
  * Bộ chỉnh tốc độ video linh hoạt (0.75x, 1.0x, 1.25x) tương tác trực tiếp qua postMessage API.
  * Tùy chọn Ẩn/Hiện kịch bản lời thoại song ngữ Nga - Việt.
  * **Bài trắc nghiệm kiểm tra sau khi xem video**: Bộ câu hỏi đo lường mức độ nghe hiểu tình huống, phản hồi đúng/sai tức thì kèm giải thích chi tiết, tự động chấm điểm và thưởng +20 XP khi đạt $\ge 60\%$.
* **Phân cấp 4 Part bài bản theo định dạng đề thi chứng chỉ ТРКИ**:
  * **Level 01 (Nghe mô tả tranh)**: Học viên quan sát một bức tranh, nghe các câu mô tả bằng tiếng Nga và lựa chọn câu phù hợp nhất với nội dung hình ảnh.
  * **Level 02 (Nghe hội thoại ngắn)**: Học viên nghe một câu hỏi hoặc lời nói bằng tiếng Nga, sau đó lựa chọn câu trả lời phù hợp nhất trong các phương án được đưa ra.
  * **Level 03 (Nghe hội thoại dài)**: Học viên nghe một đoạn hội thoại giữa hai hoặc nhiều người, sau đó trả lời các câu hỏi về nội dung, thông tin chi tiết, mục đích giao tiếp hoặc ý định của người nói.
  * **Level 04 (Nghe bài nói ngắn)**: Học viên nghe một bài nói của một người (thông báo ga tàu/sân bay, tin tức, lời giới thiệu, hướng dẫn hoặc bài trình bày ngắn), rồi trả lời các câu hỏi liên quan.
* **Trình phát chuyên dụng**: Tách audio từng câu, ẩn/hiện phụ đề song ngữ, tua chậm 0.75x - 1.25x, lặp lại câu.
* **Giao diện tinh gọn**: Nút CTA điều hướng rõ ràng ("Vào luyện nghe →"), loại bỏ biểu tượng rườm rà.

### [Module 4] Luyện Nói (Shadowing & AI Phân Tích Âm Vị)
* **Giao diện thẻ tối giản (`.dau-card-compact`)**: Gắn huy hiệu `👑 PRO` cho các chủ đề nâng cao B1/B2, kiểm tra quyền PRO khi truy cập.
* **Phương pháp Shadowing**: Nghe mẫu từ người bản xứ, thu âm nhại theo tốc độ, trọng âm và ngữ điệu kèm hiển thị sóng âm trực quan (Audio Waveform).
* **Phân tích âm vị (Phoneme Matching)**: Phân tích lỗi sai trọng âm và nhầm lẫn phụ âm cứng/mềm (ví dụ: `б - п`, `д - т`, `в - ф`).

### [Module 5] Luyện Thi TRKI (ТРКИ Exam Simulation)
* **Giao diện thẻ tối giản (`.dau-card-compact`)**: Gắn huy hiệu `👑 PRO` cho các đề thi nâng cao, kiểm tra quyền PRO trước khi vào phòng thi.
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
    icon TEXT DEFAULT '🏺',
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

1. **Tuân thủ quy chuẩn Responsive & "More..."**: Trước khi báo cáo hoàn thành bất kỳ tác vụ giao diện nào, luôn kiểm tra hiển thị trên Mobile ($\le 768px$) và Tablet ($768px - 1024px$), áp dụng quy tắc "More..." cho các thành phần dài/tràn.
2. **Quy tắc bảo vệ ngôn từ UI — Cấm hiển thị từ "Trụ Cột"**:
   * Khái niệm "7 Trụ cột" chỉ là thuật ngữ cấu trúc tài liệu nội bộ; **tuyệt đối không hiển thị từ "Trụ cột" ra màn hình học viên**. Chỉ gọi tên trực tiếp: *Kho Lọ Từ Vựng, Luyện Viết Tả Tranh, Luyện Nghe 4 Part, Luyện Nói Shadowing, Luyện Thi TRKI, Shop Hàng Nga, Cẩm Nang Du Học*.
3. **Quy chuẩn Header Navigation**:
   * Cấu trúc cân đối 3 vùng: Logo bên trái sát mép, 7 chuyên mục nằm ở giữa, cụm Auth/PRO nằm bên phải.
   * Khi chưa đăng nhập: Không hiện mặc định XP hay Streak ra ngoài. Khi đã đăng nhập: Hiện trang trọng bên trong dropdown tài khoản.
4. **Theme Russian Winter Cool Blue**:
   * Cố định giao diện Sáng (`data-theme="light"` và `data-season="winter"`), nền xanh mát mẻ thanh lịch của mùa đông nước Nga (`--bg: #eef4fb;`, surface `#ffffff;`, text `#0f1f38;`, border `#d2e0f0;`).
5. **Quy chuẩn Deploy GitHub Pages & Cache-Busting**:
   * Luôn duy trì file `.nojekyll` ở thư mục gốc.
   * Nhúng file tĩnh kèm query parameter `?v=3.2` để buộc CDN Cloudflare và GitHub Pages cập nhật ngay phiên bản mới nhất.
6. **Bảo mật Git & Secret Hygiene**:
   * Không bao giờ commit API secret key, Service role key hay thông tin nhạy cảm vào Git.
7. **Quy chuẩn Chân trang (Footer Navigation)**:
   * Cố định đúng 7 liên kết chuyên mục cốt lõi trong `.footer-links`: `Từ vựng | Viết | Nghe | Nói | TRKI | Blog | Shop`. Tuyệt đối không chèn thêm các liên kết phụ trợ (`how-to-study.html`, `upgrade.html`) vào danh sách này để duy trì sự thanh thoát, cân xứng với Header.
8. **Quy chuẩn Bộ Lọc & Phân Trang (Default Level A1 & Pagination)**:
   * Các trang danh sách bài học/đề thi mặc định lọc theo cấp độ `A1` (Sơ cấp) thay vì "Tất cả", giúp người học mới bắt đầu không bị ngợp và tối ưu hóa tốc độ nạp dữ liệu.
   * Thanh công cụ lọc phải tinh gọn, hỗ trợ phân trang (Pagination) rõ ràng khi số lượng mục lớn.
9. **Phong cách Thiết kế Tối giản & Biên tập Tinh Tế (Clean Editorial Style)**:
   * Tránh lạm dụng emoji trang trí ở tiêu đề mục và nút bấm CTA (ví dụ: dùng *"Bắt đầu luyện nghe →"*, *"Bắt đầu luyện nói →"*, *"Bắt đầu học ngay hôm nay"* thay vì các biểu tượng gây xao nhãng như 🎧, 🎙️, 🚀).
   * Các nút bấm xác thực (Đăng nhập, Đăng ký) tại Header sử dụng icon SVG tối giản, thanh mảnh.
10. **Tối ưu Trang chủ (`index.html`)**:
   * **Trợ lý AI**: Ẩn khối giới thiệu tĩnh trên trang chủ, chuyển thành dạng bong bóng chat nổi tròn thông minh (`.companion-bubble`) cố định ở góc dưới bên phải màn hình.
   * **Minh chứng xã hội (Social Proof)**: Tích hợp slider/carousel tự động chạy 5 phản hồi thực tế của học viên kèm avatar, số sao 5★ và lời nhận xét chân thực.
