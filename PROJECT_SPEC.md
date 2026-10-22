Dưới đây là bản cập nhật toàn diện cho tệp **`PROJECT_SPEC.md`**, bổ sung **Phân hệ Quản trị CMS & Giám sát Học viên (Admin Dashboard System)**, mở rộng **Database Schema (RBAC, Audit Logs, Analytics)**, và tích hợp các chính sách **Bảo mật RLS cho Quản trị viên**:

```markdown
# RUSI TRKI — ARCHITECTURE, DATABASE, SECURITY & ADMIN CMS SPECIFICATION

> **Target Audience**: AI Coding Agents (Cursor Composer, Windsurf Cascade, Claude Code, Copilot)[cite: 6].  
> **Objective**: Context-injection spec for building and operating RUSI TRKI Platform serving 10,000+ concurrent learners[cite: 3, 5].  
> **Brand & Identity**: Thiết kế hiện đại chuẩn Figma (Figma Make App), biểu tượng chữ cái Nga `Я` nền đỏ nghiêng -7°, Mascot Rusika (Blue-eyed Russian Cat), Gamification Streak & XP, 4-Season Dynamic Theme.  
> **Color Palette**: Russian Crimson Red `#c52233`, Dark Red `#991b2b`, Russian Cobalt Blue `#1757a6`, Deep Baltic Navy `#102a4c`, Warm Cream Paper `#f8f7f3`. Typography `Inter` với headline tracking đậm nét hiện đại.

---

## 1. HỆ THỐNG 7 CHUYÊN MỤC CỐT LÕI (THEO THỨ TỰ ĐIỀU HƯỚNG CHUẨN)

```text
                                [TRANG CHỦ]
      ┌───────────┬──────────────┼──────────────┬───────────┐
      │           │              │              │           │
 [1. TỪ VỰNG]  [2. VIẾT]      [3. NGHE]      [4. NÓI]     [5. TRKI]
      │                                                     │
 [7. SHOP] ────────────────────────────────────────── [6. BLOG]
```

### [Chuyên Mục 1] Từ Vựng (Lọ Từ Vựng & Video Hoạt Hình)

* **Mô hình "Lọ từ vựng" (Vocabulary Jars)**:
* Mỗi chủ đề là một "Lọ" (Lọ mua sắm Auchan, Thể thao, Ăn uống, Hành lý du học...).
* Mỗi từ vựng hiển thị như một "Mẩu giấy cuộn" trong lọ.
* Cho phép học viên tự tạo "Lọ từ vựng cá nhân".

* **Phương pháp học qua Video & Thuật toán ghi nhớ**:
* Học qua chuỗi hành động liên tiếp trong hoạt hình du học sinh «Хочу в Россию» (động từ + danh từ + giới từ).
* Spaced Repetition (Lặp lại ngắt quãng SM-2), Flashcard lật thẻ và Mini-game trắc nghiệm ôn tập.

* **Paywall / Gói PRO**: Mở khóa toàn bộ kho lọ từ vựng chuyên ngành và các tập video hoạt hình độc quyền.



### [Chuyên Mục 2] Luyện Viết (Tả Tranh Chuẩn TRKI)

* **Format Письмо TRKI**: Đưa ra 1 hình ảnh/bối cảnh thực tế.

* **Tính năng**: Bàn phím ảo Cyrillic trên web, gợi ý từ vựng trọng tâm cần có trong bài viết.

* **AI Chấm điểm theo 4 tiêu chí**:
1. Ngữ pháp & Biến cách (Грамматика)
2. Vốn từ & Cụm từ liên kết (Лексика)
3. Bố cục bài viết (Структура)
4. Trả lời đúng trọng tâm đề (Содержание)

* Bảng đối chiếu: `[Câu gốc lỗi] ➔ [Câu sửa chuẩn] ➔ [Quy tắc ngữ pháp]`.

* **Paywall / Gói PRO**: Bản Free chấm 1 bài mẫu; gói PRO chấm không giới hạn cùng AI Rusika.



### [Chuyên Mục 3] Luyện Nghe (Nghe Chép Chính Tả 4 Part Kiểu CEFR)

* **Phân cấp 4 Part bài bản**:
* **Part 1**: Nghe hiểu từng câu đơn lẻ (gõ chép chính tả từng từ).
* **Part 2**: Nghe hội thoại ngắn (đời sống du học sinh).
* **Part 3**: Nghe đoạn văn tường thuật đơn giản.
* **Part 4**: Nghe đoạn văn chuyên ngành, tin tức báo chí phức tạp.

* **Video cắt ngắn 1–2 phút**: Cắt từ YouTube/phim thực tế, phát xong hiện bài tập trắc nghiệm nghe hiểu.
* **Trình phát**: Tách audio từng câu, ẩn/hiện phụ đề song ngữ, tua chậm 0.75x–1.25x.

* **Paywall / Gói PRO**: Free nghe thử Part 1; PRO mở khóa full Part 1–4 và full transcript giải thích.



### [Chuyên Mục 4] Luyện Nói (Shadowing & AI Chấm Phát Âm)

* **Phương pháp Shadowing**: Nghe câu nói mẫu từ video/YouTube, thu âm nhại theo tốc độ và ngữ điệu người bản xứ kèm sóng âm trực quan (Audio Waveform).

* **AI Chấm phát âm**: Thu âm qua MediaStream API, so sánh âm vị (Phoneme matching) để chỉ ra chính xác từ nào sai trọng âm hoặc phát âm sai phụ âm cứng/mềm.

* **Paywall / Gói PRO**: Free 2 lượt phát âm thử mỗi ngày; PRO mở khóa không giới hạn lượt nói với AI.



### [Chuyên Mục 5] Luyện Thi TRKI (ТРКИ Exam Simulation)

* **Mục tiêu**: Ôn luyện và thi thử chứng chỉ tiếng Nga chuẩn quốc tế theo cấp độ (A1, A2, B1/TRKI-1, B2/TRKI-2).

* **Bộ ngân hàng câu hỏi**:
* Giao diện mô phỏng phòng thi chuẩn CEFR: Bảng câu hỏi bên phải, đồng hồ đếm ngược server-side, tự động thu bài khi hết giờ, phát hiện chuyển tab gian lận.
* Báo cáo kết quả: Điểm dự đoán TRKI, thống kê tỷ lệ đúng theo từng kỹ năng, phân tích đáp án ngữ pháp chi tiết sau nộp.

* **Paywall / Gói PRO**:
* Miễn phí: Được làm 1 đề thi mẫu Part Ngữ pháp A1/A2.
* PRO: Mở khóa trọn bộ ngân hàng đề B1/B2 và kho đáp án giải thích chi tiết.



### [Chuyên Mục 6] Blog (Chia Sẻ Du Học & Đời Sống Nga)

* **Kênh kéo SEO tự nhiên**:
* **Trải nghiệm du học**: Ký túc xá (KTX), review trường đại học (MGU, HSE, RUDN...), cơ sở vật chất.
* **Luật pháp & Đời sống**: Cư trú, đăng ký tạm trú, luật làm thêm, thẻ ngân hàng Mir/Sberbank.
* **Văn hóa & Ngữ pháp**: Thành ngữ thông dụng, tiếng lóng, văn hóa ứng xử Nga.
* **SEO Cluster**: Phễu dẫn link nội bộ đăng ký thi thử hoặc mua khóa học PRO.



### [Chuyên Mục 7] Shop (Bán Hàng Từ Nga & Dịch Vụ Du Học)

* **Kinh doanh nội địa Nga**: Bánh kẹo Alenka, mỹ phẩm Siberia, quà lưu niệm Matryoshka...
* **Dịch vụ liên kết du học**: Cổng tư vấn hồ sơ Du học Nga uy tín.
* **Tính năng**: Giỏ hàng rút gọn, form đặt mua nhanh, tích hợp thanh toán chuyển khoản nội địa.



---

## 2. PHÂN HỆ NÂNG CẤP TRẢ TIỀN & VIETQR (MONETIZATION 2.0 CHUẨN HIỆN NAY)

### 2.1. Bảng gói cước chuẩn:
1. **Gói 6 Tháng (PRO-6M)**: Mở khóa full ngân hàng đề thi TRKI A1–A2, luyện nghe 4 Part CEFR, không giới hạn lọ từ vựng.
2. **Gói 1 Năm (PRO-1Y - Phổ biến nhất 🔥)**: Mở khóa TOÀN BỘ ngân hàng đề thi TRKI A1, A2, B1, B2 + AI Rusika chấm tự luận Viết (Письmo) + AI luyện nói & sửa lỗi phát âm + Hỗ trợ học bổng Du học Nga.
3. **Gói Trọn Đời (PRO-VIP 💎)**: Quyền truy cập VIP vĩnh viễn không giới hạn thời gian + Tặng Hộp quà Nga đặc biệt (Socola Alenka + Trà Ivan-chay) + Voucher 500k dịch vụ du học & visa Nga.

### 2.2. Cơ chế phân quyền hiển thị theo phiên đăng nhập (Auth-Aware Upgrade Flow):
* **Khi CHƯA đăng nhập (Guest)**:
  * **Header**: Tuyệt đối **không hiển thị** nút Nâng cấp PRO bừa bãi. Chỉ hiển thị nhóm nút `[Đăng nhập]` và `[Đăng ký]` chuẩn giao diện EdTech quốc tế (Coursera, Duolingo, ELSA).
  * **Bảng giá trang chủ (`index.html#pricing`)**: **Ẩn hoàn toàn (`display: none`) khi người dùng chưa đăng nhập**, giữ giao diện trang chủ tinh gọn, tập trung vào khám phá tính năng học tập. Khi người dùng đăng nhập, phần `#pricing` mới xuất hiện cùng định danh học viên và liên kết tới trang `upgrade.html`.
  * **Trang Nâng Cấp Chuyên Biệt (`upgrade.html` — Chuẩn DauEnglish)**: Khi khách vào thẳng `upgrade.html`, hiển thị khối yêu cầu đăng nhập thân thiện. Khi học viên đăng nhập, trang mở khóa toàn bộ giao diện: Hero, User Strip, Bảng 3 gói cước, Bảng so sánh 12 tiêu chí chi tiết Free vs PRO, Quy trình 3 bước VietQR, 4 Khối cam kết và FAQ Accordion.
  * **Paywall trên toàn hệ thống**: Khi khách bấm vào bài thi VIP TRKI, bài nghe/nói/viết giới hạn, hệ thống mở **Modal Yêu cầu Đăng nhập (Auth Required Modal)** với 3 lựa chọn nhanh: Đăng nhập Google/Email, Đăng ký tài khoản, hoặc *"⚡ Trải nghiệm nhanh với tư cách Khách"* (tự động tạo phiên và mở ngay thanh toán).
* **Khi ĐÃ đăng nhập (Authenticated User)**:
  * **Học viên Free (chưa nâng cấp)**:
    * **Header**: Hiển thị nổi bật nút **`[⚡ Nâng cấp PRO]`** (bấm vào điều hướng thẳng tới `upgrade.html`).
    * **User Dropdown Menu**: Hiển thị huy hiệu `Free` bên cạnh tên, kèm thẻ CTA sang trọng: `👑 Nâng cấp PRO VIP — Mở khóa 100% đề thi TRKI & AI` (dẫn tới `upgrade.html`).
    * **Bảng giá trang chủ**: Hiển thị khi đã login: `👤 Đang chọn gói cho tài khoản: [Tên] ([Email])` kèm nút `⚡ Kích hoạt qua VietQR ngay` và liên kết xem bảng so sánh chi tiết.
  * **Học viên ĐÃ LÀ PRO (Active Member)**:
    * **Header**: Hiển thị huy hiệu danh dự **`[👑 PRO MEMBER]`** (gold gradient sang trọng). Bấm vào mở Modal Quản lý gói PRO.
    * **User Dropdown Menu**: Hiển thị huy hiệu `PRO` vàng kim, kèm thẻ trạng thái: `👑 Gói PRO VIP — Hạn dùng đến dd/mm/yyyy (hoặc Trọn Đời)`.
    * **Bảng giá trang chủ & upgrade.html**: Đánh dấu huy hiệu `GÓI ĐANG DÙNG ✓` và nút `✓ Gói bạn đang sử dụng`.

### 2.3. Cổng thanh toán VietQR Checkout 2.0 (Instant Activation Standard):
1. **Gắn kết danh tính học viên**: Mã đơn hàng sinh tự động kèm định danh tài khoản (`RUSI_[ordNum]_[userTag]`), đảm bảo số tiền chuyển khoản được gán chính xác vào UID người học.
2. **Bộ chuyển đổi gói tương tác (Interactive Plan Switcher)**: Cho phép học viên chuyển đổi mượt mà giữa 3 gói cước (6 Tháng, 1 Năm, Trọn Đời) ngay trong modal thanh toán. Cập nhật realtime giá, mã VietQR và cú pháp chuyển khoản.
3. **Bộ đếm thời gian phiên (Session Countdown 15:00)**: Đếm ngược chuyên nghiệp chuẩn Napas / VietinBank.
4. **Sao chép 1-chạm thông minh**: Nút copy cho Số tài khoản (`108873919999`), Số tiền và Cú pháp chuyển khoản kèm thông báo `✓ Đã chép`.
5. **Kích hoạt tự động thời gian thực (Simulated Signature Verification)**:
   * Trạng thái nhấp nháy `🟢 Đang chờ nhận tiền chuyển khoản...`.
   * Bấm `⚡ Tôi đã chuyển khoản xong (Kích hoạt ngay)` ➔ Kích hoạt hiệu ứng kiểm tra chữ ký điện tử trong 1.2s ➔ Kích hoạt quyền PRO thành công.
   * Hiển thị màn hình chúc mừng (Celebration Confetti Screen) và cập nhật giao diện toàn trang tức thì không cần F5.
6. **Lưu trữ PRO độc lập theo tài khoản (Per-User PRO Persistence)**:
   * Lưu trạng thái vào `trki_pro_${user.uid}`, tránh tình trạng dùng chung hoặc mất gói khi chuyển đổi tài khoản. Hỗ trợ đầy đủ tính toán thời hạn hết hạn và đặc quyền Vĩnh viễn (Trọn đời).



---

## 3. PHÂN HỆ QUẢN TRỊ ADMIN CMS & CƠ CHẾ ĐẨY DỮ LIỆU ĐỒNG BỘ (LIVE CMS & DATA PROPAGATION)

### 3.1. Phân Quyền Quản Trị Hệ Thống (RBAC & Dev Mode)

* **Super Admin**: Toàn quyền cấu hình hệ thống, quản lý doanh thu, phân bổ nhân sự, xem audit logs.
* **Academic Admin (Quản trị học thuật)**: Quản lý ngân hàng đề thi TRKI, lọ từ vựng, bài tập nghe/nói/viết, chấm thi tự luận.
* **Teacher / Reviewer**: Chấm bài viết Письмо, ghi nhận xét phát âm, giải đáp thắc mắc của học viên.
* **Operations / Support**: Quản trị đơn hàng Shop, kích hoạt PRO thủ công khi có sự cố chuyển khoản VietQR, hỗ trợ học viên.
* **Xác thực Admin & Dev Mode**:
  * Kiểm tra danh sách quản trị viên qua `window.ADMIN_EMAILS` trong `firebase-config.js` (Google Auth).
  * Hỗ trợ nút kích hoạt nhanh `Dev Mode` cục bộ (`localStorage["trki_admin_dev_mode"]`) giúp lập trình viên kiểm thử toàn bộ giao diện CMS và đồng bộ dữ liệu ngoại tuyến mà không bị phụ thuộc vào domain whitelist.

### 3.2. Quản Trị Nội Dung Toàn Diện (9 Phân Hệ Dữ Liệu Cốt Lõi)

Hệ thống CMS tại `admin.html` & `admin.js` quản lý trực tiếp 9 tập dữ liệu chuẩn hoá của nền tảng:

1. **`TRKI_BANK` (Ngân hàng đề thi TRKI chuẩn CEFR)**:
   * Cấp độ chuẩn: A1 (ТЭУ), A2 (ТБУ), B1 (ТРКИ-1), B2 (ТРКИ-2).
   * Phân loại quyền: Miễn phí (Free) và Khóa VIP (Gói PRO).
   * Định dạng 3 Part chuẩn quốc tế:
     * **Part 1 (Часть 1. Лексика и грамматика)**: Câu hỏi trắc nghiệm ngữ pháp 4 phương án kèm đáp án chuẩn và giải thích ngữ pháp chi tiết từng câu.
     * **Part 2 (Часть 2. Чтение)**: Đoạn văn bản đọc hiểu song ngữ kèm bộ câu hỏi trắc nghiệm nội dung.
     * **Part 3 (Часть 3. Аудирование)**: Hội thoại thực tế phân vai kèm audio và câu hỏi kiểm tra khả năng bắt ý.
   * Tính năng "📋 Nạp mẫu 3 Part": Tự động điền khung mẫu chuẩn để biên soạn đề thi mới trong 1 chạm.

2. **`VOCAB_JARS` (Lọ từ vựng chủ đề)**:
   * Mỗi lọ đại diện cho một ngữ cảnh sống còn tại Nga (Lọ mua sắm Auchan, Lọ vali hành lý, Lọ KTX Общежитие, Lọ căng tin & Trà bánh...).
   * Mẩu giấy từ vựng: Từ vựng tiếng Nga (hỗ trợ đánh dấu trọng âm), nghĩa tiếng Việt, và ghi chú ngữ cảnh/ngữ pháp.

3. **`SHOP_PRODUCTS` (Shop nội địa Nga & Dịch vụ Du học Nga)**:
   * 4 danh mục chính: `banh_keo` (Bánh kẹo Nga), `my_pham` (Mỹ phẩm Siberia), `luu_niem` (Quà lưu niệm Matryoshka/Cheburashka), `dich_vu_du_hoc` (Gói tư vấn hồ sơ Du học Nga, Dịch thuật công chứng).
   * Thuộc tính: Mã định danh, Tên sản phẩm, Ngành hàng, Giá bán VNĐ, Ảnh minh họa, Huy hiệu (Bán chạy, Hot, Mới).

4. **`PACKAGES` (Bảng gói cước tài khoản PRO)**:
   * Các gói cước: Gói 6 Tháng (`pro_6m`), Gói 1 Năm (`pro_1y`), Gói Trọn Đời (`pro_vip`).
   * Thuộc tính: Tên gói, Huy hiệu thời hạn, Mô tả đối tượng học viên, Giá ưu đãi, Giá niêm yết, Đánh dấu "Phổ biến nhất", Danh sách quyền lợi.

5. **`BLOG_POSTS` (Cẩm nang du học & SEO Cluster)**:
   * Chuyên mục: Lộ trình học, KTX & Đời sống du học sinh, Học bổng Du học Nga, Mẹo phát âm.
   * Thuộc tính: Tiêu đề, Chuyên mục tag, Ngày đăng, Icon đại diện, Tóm tắt ngắn, Nội dung bài viết chi tiết.

6. **`LISTENING_LESSONS` (Luyện nghe 4 Part CEFR)**: Hội thoại, câu hỏi trắc nghiệm, bài tập điền từ và chính tả.
7. **`SPEAKING_SETS` (Luyện nói & Shadowing)**: Bộ câu giao tiếp chuẩn bản xứ kèm phiên âm và bản dịch.
8. **`WRITING_TASKS` (Luyện viết Письмо)**: Đề bài tả tranh / thư từ theo format TRKI kèm số từ tối thiểu và bài mẫu.
9. **`VOCAB_LESSONS` (Video Series hoạt hình «Хочу в Россию»)**: Tập phim, cốt truyện, kịch bản hội thoại và bài tập trắc nghiệm.

### 3.3. Cơ Chế Đồng Bộ Dữ Liệu Đẩy Trực Tiếp Về Trang Web (Live Propagation Engine)

```text
[Quản trị viên thao tác tại admin.html]
                  │
                  ▼
  [localStorage: "trki_admin_data"] (Lưu trữ thay đổi & soft delete)
                  │
                  ▼
         [app.js: mergeAdminData()]
                  │
  ┌───────────────┴────────────────┐
  ▼                                ▼
[window.* Datasets Mutated]    [Cross-Tab Broadcast]
(target.splice in-place)       (storage event & trki:data-updated)
  │                                │
  ▼                                ▼
[Client Pages nhận ngay]       [Mọi tab học viên đang mở]
- mock-test.html (Đề TRKI mới)  - Tự động re-merge runtime
- shop.html (Sản phẩm mới)      - Không cần F5 hay reload lại
- vocabulary.html (Lọ từ mới)
- blog.html (Bài viết mới)
- index.html (Gói PRO mới)
```

* **Đột biến mảng In-Place (`target.splice`)**:
  * Các dataset trong `data.js` được gắn tường minh vào đối tượng toàn cục `window` (`window.TRKI_BANK`, `window.VOCAB_JARS`, `window.SHOP_PRODUCTS`, `window.PACKAGES`, `window.BLOG_POSTS`...).
  * Hàm `mergeAdminData()` sử dụng `target.splice(0, target.length, ...updated)` thay vì gán đè con trỏ biến, đảm bảo tất cả hàm và closures trên các trang học viên đều nhận dữ liệu cập nhật tức thì.
* **Cơ chế Soft-Delete & Khôi phục**:
  * Mục bị xoá được ghi nhận vào `store.__deleted[type]` để loại bỏ khỏi giao diện người dùng mà không phá huỷ cấu trúc của `data.js`.
  * Quản trị viên có thể hoàn tác hoặc bấm "🗑️ Khôi phục gốc" để hoàn nguyên bất kỳ lúc nào.
* **Đồng bộ đa tab thời gian thực (Cross-Tab Reactivity)**:
  * Trình duyệt lắng nghe sự kiện `storage` đối với khóa `trki_admin_data`. Khi Admin bấm lưu ở một tab, các tab học viên đang mở sẽ tự động nạp dữ liệu mới ngay trong nền.
* **Công cụ hỗ trợ Quản trị viên**:
  * **"👁️ Xem trên web"**: Mở trực tiếp trang học viên tương ứng với phân hệ đang chọn trên tab mới để kiểm tra giao diện và luồng làm bài thực tế.
  * **"⚡ Đẩy dữ liệu về web"**: Cưỡng bức quá trình hợp nhất dữ liệu và phát tín hiệu `trki:data-updated` để các component hiển thị làm mới trạng thái.
  * **"🔍 Tìm kiếm nhanh"**: Thanh lọc nội dung thời gian thực theo tiêu đề, ID hoặc từ khóa.
  * **"📤 Export JSON / data.js"**: Xuất dữ liệu đã hợp nhất thành file JavaScript hoàn chỉnh để sẵn sàng commit vào Git repo.
  * **"📥 Import JSON"**: Nạp hàng loạt dữ liệu mới từ file JSON hoặc file sao lưu.

### 3.4. Giám Sát Học Viên & Vận Hành (Student CRM & Analytics)

* **Theo dõi tiến độ & Gian lận**:
  * Tra cứu hồ sơ học viên: Chuỗi streak ngày học, tổng XP tích lũy, cấp độ mèo Rusika.
  * Lịch sử bài thi TRKI: Thống kê điểm số theo từng lần làm, tỷ lệ hoàn thành, thời gian làm bài, cảnh báo chuyển tab gian lận (`visibilitychange`).
  * Quản lý phiên đăng nhập: Buộc đăng xuất thiết bị từ xa (Force Logout) nếu phát hiện chia sẻ tài khoản.
* **Báo cáo Doanh thu & Đơn hàng**:
  * Dashboard trực quan: Doanh thu theo ngày/tháng, tỷ lệ chuyển đổi từ gói Free sang PRO.
  * Danh sách đơn hàng: Tra cứu theo mã chuyển khoản VietQR, trạng thái kích hoạt, công cụ kích hoạt bù 1-chạm.
* **Audit Logs (Nhật ký kiểm toán)**:
  * Ghi nhận toàn bộ thao tác thêm, sửa, xóa dữ liệu đề thi, sửa điểm hoặc can thiệp trạng thái VIP của học viên kèm IP và Admin ID.





---

## 4. KIẾN TRÚC BẢO MẬT HỆ THỐNG (SECURITY & ANTI-CHEAT ARCHITECTURE)

### 4.1. Bảo Vệ Dữ Liệu & Chống Gian Lận Đề Thi TRKI

* **Zero-Answer-Leak Policy**:
* Không bao giờ trả `correct_option` hay `explanation_text` về trình duyệt học viên trước khi nộp bài.


* API đề thi chỉ cung cấp: `id`, `prompt_text`, `media_url`, `options`.


* Việc chấm điểm được tính toán 100% tại Server Action (`/api/trki/submit`) sau khi học viên bấm nộp bài.




* **Chống gian lận thời gian & Thao tác (Anti-Cheat)**:
* Đồng hồ đếm ngược được khóa theo timestamp nộp bài được ghi nhận từ server (Server-Side Timestamp Validation).


* Giám sát trạng thái chuyển tab (`visibilitychange` API): Cảnh báo nếu học viên chuyển tab quá 3 lần khi làm bài thi thử chính thức.


* Chống can thiệp gói tin: Mọi payload nộp bài thi đi kèm HMAC Signature tạo từ session token để ngăn chặn request tampering.





### 4.2. Bảo Vệ Media Bản Quyền (Cloudflare Worker & R2 Signed JWT)

* **Không Public Bucket URL**: Bucket Cloudflare R2 được đặt ở chế độ hoàn toàn riêng tư (Private Access Only).


* **Worker Gác Cổng (Edge Security Gate)**:
* Khi học viên bật nghe audio/video, Backend sinh Token JWT ngắn hạn (thời hạn sống 5 phút - 300s).


* JWT Payload chứa: `user_id`, `file_key`, `exp`, và `client_ip`.


* Cloudflare Worker tại Edge kiểm tra chữ ký bí mật (`JWT_SECRET`), đối chiếu IP người gửi và kiểm tra HTTP `Referer` (chỉ chấp nhận domain `rusitrki.com`).


* Token sai, hết hạn hoặc chia sẻ link ra ngoài sẽ bị chặn ngay lập tức với mã lỗi `403 Forbidden` tại Edge trước khi chạm vào tệp gốc.





### 4.3. Chống Chia Sẻ Tài Khoản Dùng Chung (Single Active Session)

* Bảng `profiles` lưu trữ `current_session_id` và `last_device_fingerprint`.


* Mỗi khi phát sinh đăng nhập mới từ thiết bị khác, hệ thống cập nhật `current_session_id` mới và sử dụng Supabase Realtime để buộc đăng xuất (Force Logout) phiên làm việc cũ ngay lập tức.



### 4.4. Bảo Mật Webhook Thanh Toán (Idempotency & Checksum Verification)

* **Xác thực chữ ký**: Mọi request Webhook từ cổng thanh toán phải được kiểm tra mã băm SHA256 / HMAC Signature bằng `PAYMENT_WEBHOOK_SECRET`.


* **Idempotency (Chống Replay Attack)**: Backend kiểm tra trạng thái đơn trong database trước khi xử lý. Nếu đơn hàng đã là `PAID`, trả về ngay HTTP `200 OK` mà không thực hiện nâng cấp tài khoản lặp lại.



### 4.5. Chống Bot, Cào Đề & DDoS (Rate Limiting & WAF)

* Tích hợp Cloudflare WAF chặn các dải IP bất thường hoặc quét tự động.


* Sử dụng Rate Limiting (Redis / Upstash):
* API Đăng ký / Đăng nhập: Tối đa 5 request / phút / IP.
* API Tạo mã đơn thanh toán: Tối đa 3 request / phút / user.
* API AI Luyện nói / Chấm viết: Giới hạn nghiêm ngặt theo hạn mức gói cước để chống cạn kiệt ngân sách Token API AI.





---

## 5. DATABASE SCHEMA CHI TIẾT (SUPABASE POSTGRESQL)

```sql
-- KÍCH HOẠT EXTENSION HỖ TRỢ UUID & TÌM KIẾM
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

--------------------------------------------------------------------------------
-- 1. AUTH, ROLES & GAMIFICATION (PROFILES, RBAC, STREAK)
--------------------------------------------------------------------------------
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
    mascot_level INT DEFAULT 1,          -- Cấp độ lớn dần của mèo Rusika
    current_season_outfit TEXT,          -- Trang phục theo mùa: xuân, hạ, thu, đông
    is_pro BOOLEAN DEFAULT FALSE,
    pro_expires_at TIMESTAMPTZ,
    current_session_id TEXT,             -- Quản lý Single Active Session chống share tài khoản
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 2. TỪ VỰNG & TỪ ĐIỂN OFFLINE (VOCABULARIES & DICTIONARY)
--------------------------------------------------------------------------------
CREATE TABLE vocabularies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    word_with_stress TEXT NOT NULL,      -- vd: соба́ка
    word_normalized TEXT NOT NULL,       -- vd: собака (chuyển ё về e, bỏ trọng âm để tìm kiếm)
    transcription TEXT,                  -- Phiên âm
    pos TEXT NOT NULL,                   -- Noun, Verb, Adj, Adverb, Preposition...
    gender CHAR(1),                      -- 'm' (đực), 'f' (cái), 'n' (trung)
    aspect TEXT,                         -- 'perfective' (CB) / 'imperfective' (NCB)
    meaning_vi TEXT NOT NULL,
    cases_table JSONB,                   -- Bảng chia 6 cách: { "nom": "...", "gen": "...", "dat": "...", "acc": "...", "ins": "...", "pre": "..." }
    conjugation_data JSONB,              -- Chia động từ các thì
    structures JSONB,                    -- vd: ["перекусить чем? (ăn nhẹ cái gì)"]
    synonyms TEXT[],                     -- Từ đồng nghĩa
    antonyms TEXT[],                     -- Từ trái nghĩa
    family_words TEXT[],                 -- Họ từ
    audio_url TEXT,                      -- Link audio Cloudflare R2
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_vocab_normalized ON vocabularies USING gin (word_normalized gin_trgm_ops);

--------------------------------------------------------------------------------
-- 3. LỌ TỪ VỰNG CÁ NHÂN (VOCABULARY JARS & SPACED REPETITION)
--------------------------------------------------------------------------------
CREATE TABLE vocab_jars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    jar_name TEXT NOT NULL,              -- Tên lọ: vd "Mua sắm ở Auchan", "Từ vựng KTX"
    color_code TEXT DEFAULT '#0039A6',
    is_system BOOLEAN DEFAULT FALSE,     -- Lọ hệ thống hay do học viên tự tạo
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE jar_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    jar_id UUID REFERENCES vocab_jars(id) ON DELETE CASCADE,
    vocab_id UUID REFERENCES vocabularies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    box_level INT DEFAULT 1,             -- Hộp lặp lại ngắt quãng SM-2 (1 -> 5)
    interval_days INT DEFAULT 1,
    ease_factor NUMERIC(3,2) DEFAULT 2.5,
    next_review_at TIMESTAMPTZ DEFAULT NOW(),
    review_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_jar_items_review ON jar_items (user_id, next_review_at);

--------------------------------------------------------------------------------
-- 4. BỘ ĐỀ THI THỬ TRKI & CÂU HỎI (TRKI SIMULATION)
--------------------------------------------------------------------------------
CREATE TABLE trki_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level TEXT NOT NULL,                 -- 'A1', 'A2', 'B1', 'B2'
    title TEXT NOT NULL,
    sub_test_type TEXT NOT NULL,         -- 'grammar_vocab', 'reading', 'listening', 'writing', 'speaking'
    duration_minutes INT NOT NULL,
    passing_score INT DEFAULT 66,
    is_published BOOLEAN DEFAULT FALSE,  -- Quản trị CMS: Bản nháp hoặc đã phát hành
    is_pro_only BOOLEAN DEFAULT TRUE,    -- Khóa nội dung (Content Paywall)
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE trki_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES trki_tests(id) ON DELETE CASCADE,
    part_number INT NOT NULL,            -- Part 1..4
    question_order INT NOT NULL,
    prompt_text TEXT,
    image_url TEXT,
    audio_url TEXT,
    options JSONB,                       -- vd: ["A. дом", "B. дома", "C. дому", "D. доме"]
    correct_option TEXT NOT NULL,        -- BẢO MẬT: Chỉ server/admin đọc khi chấm điểm, cấm trả về client
    explanation_text TEXT,               -- BẢO MẬT: Chỉ trả về sau khi nộp bài
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE trki_test_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    test_id UUID REFERENCES trki_tests(id) ON DELETE CASCADE,
    user_answers JSONB NOT NULL,         -- { "q_id": "A", "q_id_2": "C" }
    score_percentage NUMERIC(5,2),
    passed BOOLEAN,
    tab_switch_count INT DEFAULT 0,      -- Theo dõi hành vi gian lận chuyển tab
    time_spent_seconds INT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 5. LUYỆN NGHE & LUYỆN NÓI (AUDIO/VIDEO DICTATION & SHADOWING)
--------------------------------------------------------------------------------
CREATE TABLE listening_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    part_type TEXT NOT NULL,             -- 'part_1_single', 'part_2_dialogue', 'part_3_passage', 'part_4_specialized'
    title TEXT NOT NULL,
    video_youtube_id TEXT,
    audio_url TEXT NOT NULL,
    duration_seconds INT,
    transcript_ru TEXT NOT NULL,
    translation_vi TEXT,
    is_pro_only BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE speaking_lessons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    video_sample_url TEXT NOT NULL,
    sentence_ru TEXT NOT NULL,
    phoneme_target TEXT,
    is_pro_only BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE speaking_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES speaking_lessons(id) ON DELETE CASCADE,
    recorded_audio_url TEXT NOT NULL,
    pronunciation_score NUMERIC(4,1),
    fluency_score NUMERIC(4,1),
    mistake_words JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 6. LUYỆN VIẾT TẢ TRANH (WRITING & HUMAN/AI EVALUATION)
--------------------------------------------------------------------------------
CREATE TABLE writing_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level TEXT NOT NULL,                 -- 'A2', 'B1', 'B2'
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    suggested_words TEXT[],
    is_pro_only BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE writing_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES writing_topics(id) ON DELETE CASCADE,
    user_essay TEXT NOT NULL,
    score_grammar INT,
    score_vocab INT,
    score_structure INT,
    score_task_completion INT,
    ai_feedback_json JSONB,
    teacher_feedback TEXT,               -- Nhận xét thủ công từ giáo viên
    graded_by UUID REFERENCES profiles(id),
    status TEXT DEFAULT 'ai_graded',     -- 'pending', 'ai_graded', 'teacher_reviewed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 7. BLOG & E-COMMERCE SHOP NGA
--------------------------------------------------------------------------------
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,              -- 'du_hoc_trai_nghiem', 'luat_cu_tru', 'ngu_phap', 'hoc_bong_du_hoc'
    cover_image TEXT,
    content_markdown TEXT NOT NULL,
    published BOOLEAN DEFAULT TRUE,
    author_id UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE shop_products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    category TEXT NOT NULL,              -- 'banh_keo', 'my_pham', 'luu_niem', 'dich_vu_du_hoc'
    image_urls TEXT[],
    stock INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- 8. GÓI DỊCH VỤ, ĐƠN HÀNG & THANH TOÁN (ORDERS & VIETQR)
--------------------------------------------------------------------------------
CREATE TABLE packages (
    id VARCHAR(50) PRIMARY KEY,          -- 'PRO_6M', 'PRO_1Y', 'PRO_VIP'
    title TEXT NOT NULL,
    price NUMERIC NOT NULL,
    duration_days INT,
    features JSONB NOT NULL
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,          -- vd: 'RUSI_ORD1092' (Cú pháp CK VietQR)
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    package_id VARCHAR(50) REFERENCES packages(id),
    amount NUMERIC NOT NULL,
    payment_method VARCHAR(20) DEFAULT 'VIETQR',
    status VARCHAR(20) DEFAULT 'PENDING',-- 'PENDING', 'PAID', 'CANCELLED'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

--------------------------------------------------------------------------------
-- 9. AUDIT LOGS & SYSTEM MONITORING (NHẬT KÝ QUẢN TRỊ)
--------------------------------------------------------------------------------
CREATE TABLE admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action_type TEXT NOT NULL,           -- 'CREATE_TEST', 'UPDATE_VOCAB', 'FORCE_PRO_ACTIVATE', 'DELETE_USER'
    target_table TEXT NOT NULL,
    target_record_id TEXT NOT NULL,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

--------------------------------------------------------------------------------
-- CHÍNH SÁCH BẢO MẬT DỮ LIỆU TẦNG CƠ SỞ (ROW LEVEL SECURITY - RLS)
--------------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE jar_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE writing_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE speaking_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trki_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vocabularies ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Kiểm tra quyền quản trị
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = user_id AND role IN ('academic_admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Người dùng xem & sửa profile mình; Admin xem được danh sách học viên
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id OR is_admin(auth.uid()));
CREATE POLICY "Users can update non-sensitive profile info" ON profiles FOR UPDATE USING (auth.uid() = id)
WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT role FROM profiles WHERE id = auth.uid()) AND
    is_pro = (SELECT is_pro FROM profiles WHERE id = auth.uid())
);
CREATE POLICY "Super Admins can update all profile roles and status" ON profiles FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);

-- Orders: Học viên xem đơn của mình; Admin xem toàn bộ đơn hàng
CREATE POLICY "Users view own orders or Admin view all" ON orders FOR SELECT USING (auth.uid() = user_id OR is_admin(auth.uid()));

-- User study data: Học viên quản lý bài mình; Admin/Teacher có quyền xem và chấm bài
CREATE POLICY "Users manage own jar items" ON jar_items ALL USING (auth.uid() = user_id);
CREATE POLICY "Users or Teachers view writing submissions" ON writing_submissions FOR SELECT USING (
    auth.uid() = user_id OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'academic_admin', 'super_admin'))
);
CREATE POLICY "Teachers can update writing submissions" ON writing_submissions FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'academic_admin', 'super_admin'))
);

-- CMS Policies: Admin toàn quyền CRUD nội dung; Học viên chỉ đọc nội dung đã phát hành
CREATE POLICY "Public read published TRKI tests" ON trki_tests FOR SELECT USING (is_published = true OR is_admin(auth.uid()));
CREATE POLICY "Admins full manage TRKI tests" ON trki_tests FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Public read TRKI questions prompt" ON trki_questions FOR SELECT USING (true);
CREATE POLICY "Admins full manage TRKI questions" ON trki_questions FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Public read vocabularies" ON vocabularies FOR SELECT USING (true);
CREATE POLICY "Admins full manage vocabularies" ON vocabularies FOR ALL USING (is_admin(auth.uid()));

CREATE POLICY "Super Admins view audit logs" ON admin_audit_logs FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
);

```

---

## 6. QUY TẮC CỐT LÕI CHO VIBE CODING AGENT (CURSOR / WINDSURF)

1. **Module hóa theo 7 thư mục route học viên và phân khu Admin tách biệt**:
* `app/(routes)/trki/`
* `app/(routes)/shop/`
* `app/(routes)/blog/`
* `app/(routes)/tu-vung/`
* `app/(routes)/luyen-viet/`
* `app/(routes)/luyen-nghe/`
* `app/(routes)/luyen-noi/`
* `app/admin/(routes)/[dashboard | students | tests | vocab | writing-review | orders | audit]/`


2. **Quy tắc bảo mật đáp án TRKI**:
* Client API đề thi tuyệt đối `SELECT` bỏ trường `correct_option` và `explanation_text`.


* Chỉ khi học viên gửi payload câu trả lời lên Server Action `/api/trki/submit` thì Server mới chấm điểm và trả kết quả.




3. **Quy tắc bảo vệ Audio/Video trên Cloudflare R2**:
* Không xuất URL thô của Bucket R2.


* Luôn gọi Cloudflare Worker `stream.rusitrki.com` kèm JWT Token hết hạn sau 5 phút và kiểm tra cờ `is_pro` của học viên.




4. **Quy chuẩn tìm kiếm Cyrillic**: Luôn sử dụng hàm chuẩn hóa ký tự `replace(/ё/g, 'е')` trước khi tìm kiếm hoặc lọc bài học.


5. **Ghi nhận Audit Log**: Mọi thao tác cập nhật dữ liệu của Admin (Thêm/Sửa/Xóa Đề, Kích hoạt đơn PRO thủ công) bắt buộc phải ghi 1 bản ghi vào bảng `admin_audit_logs`.


6. **Quy chuẩn bố cục Header Navigation (Chuẩn dauenglish.com)**:
* **Cấu trúc 3 khu vực cân đối (Grid `1fr auto 1fr`)**:
  - **Bên trái (`.header-left`)**: Logo & Thương hiệu `Я RusiTRKI` cố định sát mép trái, không bị khoảng đệm trống đẩy vào giữa.
  - **Chính giữa (`.header-center`)**: Cố định đúng 7 chuyên mục cân đối hoàn hảo ở trung tâm: `Từ vựng | Viết | Nghe | Nói | TRKI | Blog | Shop`. Nếu số lượng liên kết nhiều hơn 7, hệ thống tự động gom các mục thừa vào menu dropdown `More ▾` (Thêm).
  - **Bên phải (`.header-right`)**:
    - Nút / Huy hiệu Gói PRO.
    - **Khi chưa đăng nhập**: Bỏ nút "Học miễn phí". Hiển thị 2 nút rõ ràng: **Đăng nhập** (nút outline/ghost) và **Đăng ký** (nút primary đỏ nổi bật). Tuyệt đối **không hiển thị mặc định điểm XP và chuỗi Streak** ra ngoài thanh header khi chưa đăng nhập.
    - **Khi đã đăng nhập**: Hiển thị Avatar + Tên + Dropdown tài khoản. **Điểm XP và chuỗi ngày Streak được hiển thị trang trọng, đẹp mắt bên trong menu tài khoản học viên**.
* **Đồng bộ Learning Hub 7 Khối Kỹ Năng (`.hub-grid`) & Chân trang (`footer-links`)**:
  - Thứ tự 7 khối nội dung trên trang chủ:
    - **Card 01**: Lọ Từ Vựng & Video (`vocabulary.html`)
    - **Card 02**: Luyện Viết Tả Tranh (`writing.html`)
    - **Card 03**: Luyện Nghe 4 Part (`listening.html`)
    - **Card 04**: Luyện Nói Shadowing (`speaking.html`)
    - **Card 05**: Luyện Thi TRKI (`mock-test.html` — thẻ lớn màu đỏ tiêu điểm, chiếm 2 cột `grid-column: span 2`)
    - **Card 06**: Blog Du Học & Đời Sống (`blog.html`)
    - **Card 07**: Shop Hàng Nga & Du Học (`shop.html` — thẻ màu xanh Baltic Navy)
  - Hệ lưới 4 cột desktop cân bằng tuyệt đối: Hàng 1 gồm 4 thẻ kỹ năng nền tảng (1x4 = 4 cột); Hàng 2 gồm TRKI (2 cột) + Blog (1 cột) + Shop (1 cột) = 4 cột, lấp đầy 8 ô trên 2 hàng gọn gàng.
  - Toàn bộ liên kết chân trang `footer-links` tuân thủ đồng nhất 100% thứ tự này.

7. **Quy chuẩn Giao diện Sáng cố định (Russian Winter Cool Blue)**:
* **Chỉ sử dụng giao diện Sáng**: Loại bỏ hoàn toàn tính năng đổi sáng/tối để mang lại trải nghiệm học tập nhất quán, tinh tế và tập trung cao độ.
* **Nền mùa đông màu xanh mát mẻ**: Luôn giữ sắc xanh thanh lịch của tuyết mùa đông nước Nga (`--bg: #eef4fb;`, surface `#ffffff;`, text `#0f1f38;`, border `#d2e0f0;`). Giao diện cố định 100% chế độ Sáng (`data-theme="light"` và `data-season="winter"`), không bị ảnh hưởng bởi theme của hệ điều hành.

8. **Quy tắc bảo vệ ngôn từ UI — Cấm hiển thị từ "Trụ Cột"**:
* Khái niệm "7 Trụ cột" là kiến trúc tư duy, phân hệ module logic trong tài liệu kỹ thuật dành cho đội ngũ phát triển; **tuyệt đối không hiển thị các từ ngữ "Trụ cột" / "7 trụ cột" / "Trụ cột 1:..." ra giao diện người dùng (Learner UI)**.
* Các tiêu đề, chip, banner chỉ gọi trực tiếp tên kỹ năng hoặc nghiệp vụ: `Luyện thi TRKI`, `Lọ từ vựng & Video`, `Luyện nghe chép chính tả`, `Luyện nói Shadowing`, `Luyện viết tả tranh`, `Shop Hàng Nga`, `Cẩm nang Du học`.

9. **Quy chuẩn Deploy GitHub Pages & Cloudflare Cache Invalidation**:
* **Bắt buộc file `.nojekyll`**: Tại thư mục gốc của repository phải luôn duy trì tệp `.nojekyll` (dung lượng 0 bytes) nhằm chỉ thị GitHub Pages bỏ qua bộ xử lý Jekyll, chuyển trực tiếp các file tĩnh HTML/JS/CSS và tránh lỗi build / 403.
* **Cache-Busting Query Parameter (`?v=X.Y`)**: Mọi file HTML khi nhúng tài nguyên nội bộ (`styles.css`, `data.js`, `auth.js`, `app.js`, `pages.js`, `admin.js`, `srs.js`) bắt buộc phải gắn tham số phiên bản (hiện tại: `?v=2.8`). Do Cloudflare và GitHub Pages cấu hình `Cache-Control: max-age=14400` (4 tiếng), việc gắn query parameter buộc trình duyệt và CDN nạp ngay phiên bản mới nhất, tránh tình trạng local hiển thị một kiểu nhưng website trên mạng vẫn hiện phiên bản cũ.
* **Thao tác Hard Reload cho người dùng**: Sau mỗi lần `git push`, hướng dẫn người dùng nhấn `Ctrl + F5` (hoặc `Cmd + Shift + R` trên Mac) hoặc mở tab Ẩn danh (Incognito) nếu trình duyệt còn lưu cache từ phiên trước.

10. **Quy chuẩn Typography & Xử lý Font tiếng Việt / tiếng Nga**:
* **Phông chữ chủ đạo**: Tải đầy đủ bộ ký tự `Inter` (weights 300 đến 900) đồng bộ trên **toàn bộ các trang HTML** qua thẻ `<link>` và nạp dự phòng qua `@import` tại đầu tệp `styles.css`. Đảm bảo font chữ thương hiệu `RusiTRKI` ở Header và toàn bộ văn bản luôn cố định 100%, tuyệt đối không bị nhảy phông sang Arial/Segoe UI khi chuyển trang qua Viết, Nghe, Nói, Shop, Blog,...
* **Quy chuẩn nút bấm CTA (`.button`, `.button-primary`, `.button-light`)**: Các nút bấm hành động chính như "Bắt đầu học ngay", "Luyện thi thử miễn phí" bắt buộc phải có `display: inline-flex; align-items: center; justify-content: center; gap: 12px;` kèm định kiểu kích thước icon SVG (`width: 18px; height: 18px; stroke: currentColor; fill: none;`), đảm bảo độ cao chuẩn `min-height: 56px`, căn giữa chữ và mũi tên hoàn hảo.
* **Cấm negative pixel tracking trên tiêu đề**: Tuyệt đối không dùng các giá trị `letter-spacing` âm theo đơn vị pixel cố định (như `-3.5px`, `-3.2px`, `-2.5px`). Trong tiếng Việt và tiếng Nga Cyrillic, việc thu hẹp khoảng cách bằng pixel cố định sẽ khiến các nguyên âm có dấu đôi (`Ễ, Ế, Ể, Ộ, Ứ, Ử, Ữ`) và các phụ âm Nga bè rộng (`Ж, Ш, Щ, Ю`) bị đè dính hoặc đâm vào nhau gây vỡ phông. Chỉ sử dụng khoảng cách tương đối nhẹ (`letter-spacing: -0.005em;` hoặc `normal`).
* **Chiều cao dòng (`line-height`) an toàn**: `line-height` của các thẻ tiêu đề `h1, h2` tối thiểu phải đạt `1.22` đến `1.26` để đảm bảo các dấu thanh tiếng Việt nằm trên cao (`~`, `^`, `?`, `'`) có đủ không gian hiển thị, không bị cắt ngọn (clipping) bởi đường bao của dòng trên hoặc dính vào dòng dưới.
* **Quy chuẩn Tiêu đề Hero `<h1>` (Chống dính & rối chữ)**:
  - **Sentence Case thanh thoát**: Tiêu đề trang chủ sử dụng Sentence Case (`Học tiếng Nga có hệ thống<br /><span>cùng RUSI</span>`), tuyệt đối không viết HOA toàn bộ câu tiếng Việt có nhiều dấu kép (`Ọ, Ế, Ó, Ệ, Ố`) vì sẽ tạo thành mảng mực đặc gây rối mắt và nặng nề.
  - **Cỡ chữ vừa vặn khung hình**: Sử dụng `font-size: clamp(36px, 4.8vw, 60px)` kết hợp `text-wrap: balance`, giúp dòng 1 không vượt quá `max-width: 720px` và không bị rớt chữ lẻ loi xuống dòng thứ 2.
  - **Nhịp thở thị giác**: Thẻ `span` có `display: block; margin-top: 6px;` để tách biệt rõ ràng 2 vế tiêu đề.

11. **Phân hệ Xác thực Chuyên biệt — Trang Đăng nhập & Đăng ký (Chuẩn dauenglish.com)**:
* **Đường dẫn chuẩn**: `login.html?redirect=...` và `signup.html?redirect=...` (hỗ trợ cả alias `/login` và `/signup` qua cấu trúc thư mục tĩnh & `404.html` SPA fallback).
* **Kiến trúc bố cục 2 cột (Split-Screen Architecture)**:
  - **Cột trái (`.auth-col-form`, 50% desktop, 100% mobile)**:
    - Logo thương hiệu `Я RusiTRKI` với biểu tượng nghiêng -6° chuẩn hệ thống.
    - Tiêu đề & phụ đề:
      - Đăng nhập: *"Chào mừng trở lại"* — *"Đăng nhập nhanh bằng Google để tiếp tục học."*
      - Đăng ký: *"Tạo tài khoản"* — *"Đăng ký nhanh chóng và an toàn bằng tài khoản Google của bạn."*
    - Nút Google Sign-In 1-click kích thước lớn, hiệu ứng đổ bóng mượt mà.
    - Accordion mở rộng Email & Mật khẩu:
      - Mặc định thu gọn tinh gọn với icon chevron quay 180° khi mở (`aria-expanded`).
      - Hỗ trợ đầy đủ đăng nhập / đăng ký qua Firebase Email Auth và chế độ mô phỏng offline.
    - Nút trải nghiệm nhanh với tư cách Khách (`Auth.continueAsGuest()`).
    - Liên kết chéo bảo lưu tham số điều hướng: `Chưa có tài khoản? Đăng ký` <-> `Đã có tài khoản? Đăng nhập`.
    - Liên kết quay về trang chủ: `← Quay lại trang chủ`.
    - **Tối ưu Mobile Responsive (`max-width: 480px`)**: Thu hẹp đệm `.auth-col-form` về `30px 18px`, cỡ chữ tiêu đề `24px` và nút bấm Google `14.5px`, không gây tràn màn hình thiết bị nhỏ.
  - **Cột phải (`.auth-col-showcase`, ẩn trên mobile, 50% desktop)**:
    - Nền gradient Russian Winter sâu thẳm (`#091326` -> `#0d2042` -> `#17386d`) cùng 2 khối cầu phát sáng Radial Orb.
    - Biểu tượng thương hiệu `Я` kích thước 52x52px.
    - Tiêu đề: *"Luyện tập khoa học và phát triển tiếng Nga toàn diện"*.
    - Mô tả: *"Từ cơ bản đến nâng cao. Từ 'priviet' đến chinh phục chứng chỉ TRKI (TORFL — Test of Russian as a Foreign Language)."*.
    - Lưới 4 thẻ tính năng 2x2 frosted glass: Học từ vựng bằng phương pháp khoa học, Phát triển toàn diện 4 kỹ năng, Trợ lý AI luyện Nói & Viết, Đồng bộ đa thiết bị.
    - Danh sách 3 cam kết học tập (tính năng thông minh & không ngừng nâng cấp, không cần thẻ tín dụng, lưu tiến độ đa nền tảng).
    - Huy hiệu minh chứng xã hội: *"5,000+ học viên đang đồng hành cùng RusiTRKI"*.
* **Cơ chế Điều hướng Tự động (`?redirect=...`) & Chống Flash**:
  - Trích xuất tham số `redirect` từ URL hoặc lấy từ `localStorage.getItem("auth_redirect")`, mặc định về `index.html`.
  - Chống vòng lặp redirect (loại trừ các URL `/login`, `/signup`, `login.html`, `signup.html`).
  - **Chống Flash nút Đăng nhập**: Ngay khi đăng nhập thành công qua Google hoặc Email, lưu phiên `STORE.set("auth_user", user)` trực tiếp vào `localStorage` TRƯỚC KHI chuyển hướng, đảm bảo trang đích nạp avatar ngay lập tức.
  - **Toàn cục hóa `window.STORE`**: Khai báo `window.STORE = STORE;` trong `app.js` để các module xác thực hoạt động ổn định mọi thời điểm.
* **Xử lý Phiên Khách & Đổi Tài Khoản (Guest Resilience & Account Switch)**:
  - **Bảo lưu phiên Khách**: Khi Firebase khởi tạo và kích hoạt `onAuthStateChanged(null)`, hệ thống không ghi đè xóa phiên khách cục bộ; chỉ đăng xuất khi người dùng chủ động bấm "Đăng xuất".
  - **Chống bẫy Khách trên trang Auth**: Người dùng Khách mở `login.html` / `signup.html` sẽ không bị ép chuyển hướng, mà nhận được lời nhắc nhẹ nhàng hướng dẫn nâng cấp tài khoản chính thức.
  - **Đổi tài khoản linh hoạt**: Nếu tài khoản thật đã đăng nhập mà người dùng mở `login.html`, giao diện cung cấp nút *"Đổi tài khoản"* (gọi `Auth.signOut()` tại chỗ) và nút *"Tiếp tục học →"* kèm hẹn giờ tự chuyển tiếp 1.5s.
* **Xử lý Lỗi & Tương thích Toàn diện**:
  - Bắt các lỗi Firebase chi tiết: `auth/operation-not-allowed` (hướng dẫn bật Email/Password trên Firebase Console), `auth/network-request-failed` và regex kiểm tra email client-side.
  - SPA Fallback & 404 Routing trong `404.html`: Hỗ trợ Clean URLs cho tất cả chuyên mục chính (`/login`, `/signup`, `/vocabulary`, `/writing`, `/listening`, `/speaking`, `/mock-test`, `/blog`, `/shop`, `/admin`). Khi người dùng nhập sai đường dẫn hoặc tìm kiếm trang không tồn tại, tự động chuyển hướng và giữ chân tại giao diện chuyên biệt `404.html` với đầy đủ Brand Russian Header/Footer, Mascot Rusika và phím tắt điều hướng nhanh về 7 phân hệ.

---

## 7. QUY CHUẨN SEO TOÀN DIỆN & TỐI ƯU HÓA CÔNG CỤ TÌM KIẾM (TECHNICAL SEO & SEARCH ENGINE SPECIFICATION)

Nhằm đảm bảo nền tảng **RUSI TRKI** đạt vị thế dẫn đầu trong kết quả tìm kiếm tự nhiên (Organic Search Rankings) cho các từ khóa học tiếng Nga, luyện thi chứng chỉ ТРКИ và học bổng Du học Nga, toàn bộ hệ thống tuân thủ các quy chuẩn Technical SEO khắt khe sau:

### 7.1. Chiến Lược Từ Khóa Cốt Lõi (Keyword Matrix)
* **Từ khóa thương hiệu (Brand Keywords)**: `RUSI TRKI`, `Rusi TRKI`, `Mascot Rusika`, `Mèo Rusika`, `Lọ từ vựng Rusi`.
* **Từ khóa thi chứng chỉ (Certification Keywords)**: `luyện thi TRKI`, `đề thi thử TRKI`, `chứng chỉ TORFL`, `TRKI A1`, `TRKI A2`, `TRKI B1`, `TRKI B2`, `bài tập ngữ pháp tiếng Nga TRKI`.
* **Từ khóa 4 kỹ năng (Skills Keywords)**: `từ vựng tiếng Nga Spaced Repetition`, `lọ từ vựng`, `luyện nghe chép chính tả tiếng Nga`, `luyện nói Shadowing tiếng Nga`, `AI chấm phát âm tiếng Nga`, `luyện viết tả tranh tiếng Nga`, `học tiếng Nga từ con số 0`.
* **Từ khóa Du học & Đời sống (Study Abroad & Lifestyle)**: `học bổng du học Nga`, `du học Nga`, `KTX MGU`, `thẻ ngân hàng Mir Sberbank`, `thủ tục cư trú Nga`, `hàng Nga nội địa`.

---

### 7.2. Chuẩn Hóa Thẻ Meta & Mạng Xã Hội (Per-Page Metadata & Social Sharing)
Mọi trang HTML trên hệ thống bắt buộc phải sở hữu cấu trúc thẻ Meta định danh đầy đủ, tuân thủ nghiêm ngặt chuẩn W3C, Open Graph (Facebook/Zalo) và Twitter Cards:

```html
<!-- Bộ thẻ chuẩn trên mỗi trang HTML -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>[Tên Trang Cụ Thể] — [Từ Khóa Bổ Trợ] | RUSI TRKI</title>
<meta name="description" content="[Mô tả hấp dẫn, súc tích 130-160 ký tự chứa từ khóa chính và lời kêu gọi hành động]" />
<meta name="keywords" content="[Danh sách 6-10 từ khóa trọng tâm phân cách bằng dấu phẩy]" />
<meta name="author" content="RUSI TRKI Team" />
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
<link rel="canonical" href="https://rusitrki.com/[tên-trang].html" />

<!-- Open Graph / Zalo / Facebook -->
<meta property="og:site_name" content="RUSI TRKI" />
<meta property="og:type" content="website" />
<meta property="og:title" content="[Tiêu đề trang đồng bộ]" />
<meta property="og:description" content="[Mô tả trang đồng bộ]" />
<meta property="og:url" content="https://rusitrki.com/[tên-trang].html" />
<meta property="og:image" content="https://rusitrki.com/assets/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="RUSI TRKI - Nền Tảng Học Tiếng Nga & Luyện Thi ТРКИ Chuẩn Quốc Tế" />
<meta property="og:locale" content="vi_VN" />

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Tiêu đề trang]" />
<meta name="twitter:description" content="[Mô tả ngắn]" />
<meta name="twitter:image" content="https://rusitrki.com/assets/og-image.jpg" />

<!-- Thiết bị di động & PWA Theme Color -->
<meta name="theme-color" content="#c52233" />
<meta name="application-name" content="RUSI TRKI" />
<meta name="apple-mobile-web-app-title" content="RUSI TRKI" />
```

* **Quy định đối với ảnh Social Banner (`assets/og-image.jpg`)**:
  - Kích thước vàng: **1200 x 630 pixel** (tỷ lệ 1.91:1) chuẩn mực cho Facebook, Zalo, LinkedIn, Twitter/X và iMessage.
  - Phối màu Russian Crimson Red `#c52233`, Cobalt Blue `#1757a6`, biểu tượng chữ cái Nga `Я`, slogan *"Chinh Phục Tiếng Nga Từ Con Số 0 Đến B2"* và các gạch đầu dòng tính năng chủ đạo.

---

### 7.3. Dữ Liệu Có Cấu Trúc Schema.org (JSON-LD Structured Data)
Nhằm kích hoạt các tính năng hiển thị nâng cao (Rich Snippets, Breadcrumbs, FAQ Accordions, Course Badges) trên Google Search:

1. **`WebSite` & `EducationalOrganization` (`index.html`)**: Khai báo danh tính tổ chức giáo dục RUSI TRKI, logo vector `rusi-logo.svg`, kênh email hỗ trợ `support@rusitrki.com` và các tên gọi thay thế.
2. **`FAQPage` (`index.html`)**: Đóng gói các câu hỏi thường gặp (bắt đầu từ số 0, thời gian học mỗi ngày, độ sát thực của đề thi TRKI) thành schema `FAQPage` để mở rộng tối đa diện tích hiển thị trên SERP.
3. **`Course` & `BreadcrumbList`**:
   - `vocabulary.html`: Khóa học "Kho Lọ Từ Vựng Tiếng Nga Spaced Repetition".
   - `mock-test.html`: Chương trình "Luyện Thi Thử Chứng Chỉ Tiếng Nga Quốc Tế ТРКИ".
   - `listening.html`: Khóa học "Luyện Nghe Tiếng Nga 4 Part Toàn Diện".
   - `speaking.html`: Khóa học "Luyện Nói Tiếng Nga Shadowing Cùng AI".
   - `writing.html`: Khóa học "Luyện Viết Tiếng Nga Chuẩn TRKI".
4. **`HowTo` & `BreadcrumbList` (`how-to-study.html`)**: Hướng dẫn 4 bước quy trình học tiếng Nga có hệ thống.
5. **`Blog` (`blog.html`)**: Bộ sưu tập các bài viết cẩm nang du học và đời sống Nga.
6. **`Store` (`shop.html`)**: Danh mục sản phẩm đặc sản Nga và cổng tư vấn Du học Nga.
7. **`Product` & `AggregateOffer` (`upgrade.html`)**: Chi tiết gói học viên RUSI PRO với khoảng giá rõ ràng từ 199.000đ đến 999.000đ.

---

### 7.4. Chỉ Thị Thu Thập Dữ Liệu & Bản Đồ Trang Web (Robots & Sitemap)

1. **Tệp `robots.txt`**:
   ```txt
   # Robots.txt for RUSI TRKI (https://rusitrki.com)
   User-agent: *
   Allow: /
   Disallow: /admin.html
   Disallow: /admin
   Disallow: /admin/
   Disallow: /scripts/
   Disallow: /*.sql

   Sitemap: https://rusitrki.com/sitemap.xml
   ```
   * *Mục tiêu*: Ngăn chặn bot tìm kiếm lập chỉ mục phân hệ Admin, tệp SQL nhạy cảm và các mã script bảo mật, tập trung 100% crawl budget vào các trang bài học công khai.

2. **Tệp `sitemap.xml`**:
   * Định dạng chuẩn XML Sitemap 0.9, khai báo 12 trang nội dung chính yếu với mức độ ưu tiên (`priority`) và tần suất cập nhật (`changefreq`):
     - `https://rusitrki.com/`: `priority 1.0` — `daily`
     - `https://rusitrki.com/vocabulary.html`: `priority 0.9` — `daily`
     - `https://rusitrki.com/mock-test.html`: `priority 0.9` — `weekly`
     - `https://rusitrki.com/listening.html`: `priority 0.8` — `weekly`
     - `https://rusitrki.com/speaking.html`: `priority 0.8` — `weekly`
     - `https://rusitrki.com/writing.html`: `priority 0.8` — `weekly`
     - `https://rusitrki.com/how-to-study.html`: `priority 0.8` — `weekly`
     - `https://rusitrki.com/blog.html`: `priority 0.8` — `daily`
     - `https://rusitrki.com/shop.html`: `priority 0.7` — `weekly`
     - `https://rusitrki.com/upgrade.html`: `priority 0.7` — `monthly`
     - `https://rusitrki.com/login.html`: `priority 0.5` — `monthly`
     - `https://rusitrki.com/signup.html`: `priority 0.5` — `monthly`

3. **Chính Sách Lập Chỉ Mục Riêng Từng Trang (Robots Meta Tag)**:
   - Các trang nội dung công khai: `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.
   - Phân hệ quản trị `admin.html`: `noindex, nofollow` (bảo mật tuyệt đối, không xuất hiện trên Google).
   - Trang lỗi `404.html` và trang chuyển hướng `login/index.html`, `signup/index.html`: `noindex, follow` (không lập chỉ mục trang báo lỗi hoặc trang rỗng nhưng cho phép bot lần theo các liên kết nội bộ).

---

### 7.5. Chiến Lược Canonical & Chống Trùng Lặp Nội Dung (Canonicalization)
* **Thẻ Canonical cố định 100%**: Mọi trang web đều khai báo thẻ `<link rel="canonical" href="https://rusitrki.com/...">`.
* **Triệt tiêu lỗi Duplicate Content**:
  - Hợp nhất truy cập giữa tên miền có `www` và không `www`, giữa giao thức `http` và `https`.
  - Hợp nhất giữa tên miền chính `rusitrki.com` và tên miền mặc định của GitHub Pages `[username].github.io/rusitrki/`.
  - Hợp nhất các Clean URLs (`/vocabulary`, `/trki`, `/login`) về đúng tệp chuẩn SEO gốc.

---

### 7.6. Chuẩn Hóa Cấu Trúc Ngữ Nghĩa & Hình Ảnh (Semantic & Image SEO)
1. **Duy nhất một thẻ `<h1>` trên mỗi trang**: Tiêu đề `<h1>` đại diện cho chủ đề duy nhất của trang, sử dụng Sentence Case dễ đọc, không viết hoa toàn bộ và không bẻ chữ đột ngột.
2. **Cấu trúc phân cấp tiêu đề logic**: `<h1>` (Chủ đề chính) ➔ `<h2>` (Các phân khúc nội dung) ➔ `<h3>` (Các đầu mục bài học / tính năng chi tiết). Tuyệt đối không nhảy cấp từ `<h1>` xuống `<h3>`.
3. **Quy chuẩn thẻ hình ảnh (`<img>`)**:
   - Bắt buộc thuộc tính `alt` mô tả giàu thông tin (Ví dụ: `alt="Quảng trường Đỏ Moscow Nga — Nền tảng học tiếng Nga RUSI TRKI"` thay vì `alt="ảnh"`).
   - Bắt buộc khai báo tường minh `width` và `height` trên thẻ `<img>` nhằm giúp trình duyệt cấp phát không gian bố cục trước khi ảnh tải xong, ngăn chặn triệt để hiện tượng xô lệch giao diện (Cumulative Layout Shift - CLS < 0.1).
   - Áp dụng `loading="eager"` cho ảnh Hero đầu trang (LCP element) và `loading="lazy"` cho các ảnh nội dung bên dưới màn hình cuộn.

---

### 7.7. Tối Ưu Hóa Mạng Lưới Liên Kết Nội Bộ (Internal Link Equity)
* **Xóa bỏ hoàn toàn "Trang mồ côi" (Orphan Pages)**: Toàn bộ 7 chuyên mục chính cùng trang phương pháp học tập (`how-to-study.html`) và gói hội viên (`upgrade.html`) đều được kết nối trực tiếp trong menu Điều hướng Header (`NAV_LINKS`) và Chân trang Footer (`footer-links`).
* Bot tìm kiếm có thể di chuyển qua lại giữa tất cả các trang chỉ trong tối đa 1 cú click từ bất kỳ vị trí nào trên website.
```
