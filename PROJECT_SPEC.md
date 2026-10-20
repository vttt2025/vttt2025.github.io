Dưới đây là bản cập nhật toàn diện cho tệp **`PROJECT_SPEC.md`**, bổ sung **Phân hệ Quản trị CMS & Giám sát Học viên (Admin Dashboard System)**, mở rộng **Database Schema (RBAC, Audit Logs, Analytics)**, và tích hợp các chính sách **Bảo mật RLS cho Quản trị viên**:

```markdown
# 🇷🇺 RUSI TRKI — ARCHITECTURE, DATABASE, SECURITY & ADMIN CMS SPECIFICATION

> **Target Audience**: AI Coding Agents (Cursor Composer, Windsurf Cascade, Claude Code, Copilot)[cite: 6].  
> **Objective**: Context-injection spec for building and operating RUSI TRKI Platform serving 10,000+ concurrent learners[cite: 3, 5].  
> **Brand & Identity**: Thiết kế hiện đại chuẩn Figma (Figma Make App), biểu tượng chữ cái Nga `Я` nền đỏ nghiêng -7°, Mascot Rusika (Blue-eyed Russian Cat), Gamification Streak & XP, 4-Season Dynamic Theme.  
> **Color Palette**: Russian Crimson Red `#c52233`, Dark Red `#991b2b`, Russian Cobalt Blue `#1757a6`, Deep Baltic Navy `#102a4c`, Warm Cream Paper `#f8f7f3`. Typography `Inter` với headline tracking đậm nét hiện đại.

---

## 1. HỆ THỐNG 7 TRỤ CỘT CHÍNH (THEO BẢN VẼ TỪ TRANG CHỦ)

```text
                           [TRANG CHỦ]
      ┌───────────┬──────────────┼──────────────┬───────────┐
      │           │              │              │           │
 [1. TRKI]     [2. SHOP]      [3. BLOG]     [4. TỪ VỰNG]  [5. LUYỆN VIẾT]
      │                                                     │
 [7. LUYỆN NÓI] ─────────────────────────────── [6. LUYỆN NGHE]

```

### [Trụ Cột 1] Luyện Thi TRKI (ТРКИ Exam Simulation)

* **Mục tiêu**: Ôn luyện và thi thử chứng chỉ tiếng Nga chuẩn quốc tế theo cấp độ (A1, A2, B1/TRKI-1, B2/TRKI-2).


* **Bộ ngân hàng câu hỏi**:
* Giao diện mô phỏng phòng thi chuẩn CEFR: Bảng câu hỏi bên phải, đồng hồ đếm ngược server-side, tự động thu bài khi hết giờ, phát hiện chuyển tab gian lận.


* Báo cáo kết quả: Điểm dự đoán TRKI, thống kê tỷ lệ đúng theo từng kỹ năng, phân tích đáp án ngữ pháp chi tiết sau nộp.




* **Paywall / Gói PRO**:
* Miễn phí: Được làm 1 đề thi mẫu Part Ngữ pháp A1/A2.


* PRO: Mở khóa trọn bộ ngân hàng đề B1/B2 và kho đáp án giải thích chi tiết.





### [Trụ Cột 2] Shop (Bán Hàng Từ Nga & Dịch Vụ)

* **Kinh doanh nội địa Nga**: Bánh kẹo Alenka, mỹ phẩm Siberia, quà lưu niệm Matryoshka...
* **Dịch vụ liên kết du học**: Cổng tư vấn hồ sơ du học Nga (hợp tác chỉ tiêu hiệp định 6730).
* **Tính năng**: Giỏ hàng rút gọn, form đặt mua nhanh, tích hợp thanh toán chuyển khoản nội địa.



### [Trụ Cột 3] Blog (Chia Sẻ Du Học & Kiến Thức Nga)

* **Kênh kéo SEO tự nhiên**:
* **Trải nghiệm du học**: Ký túc xá (KTX), review trường đại học (MGU, HSE, RUDN...), cơ sở vật chất.
* **Luật pháp & Đời sống**: Cư trú, đăng ký tạm trú, luật làm thêm, thẻ ngân hàng Mir/Sberbank.
* **Văn hóa & Ngữ pháp**: Thành ngữ thông dụng, tiếng lóng, văn hóa ứng xử Nga.


* **SEO Cluster**: Phễu dẫn link nội bộ đăng ký thi thử hoặc mua khóa học PRO.





### [Trụ Cột 4] Từ Vựng (Lọ Từ Vựng & Chuỗi Hành Động Video)

* **Mô hình "Lọ từ vựng" (Vocabulary Jars)**:
* Mỗi chủ đề là một "Lọ" (Lọ mua sắm Auchan, Thể thao, Ăn uống, Hành lý du học...).
* Mỗi từ vựng hiển thị như một "Mẩu giấy cuộn" trong lọ.
* Cho phép học viên tự tạo "Lọ từ vựng cá nhân".

* **Phương pháp học qua Video & Thuật toán ghi nhớ**:
* Học qua chuỗi hành động liên tiếp trong hoạt hình du học sinh «Хочу в Россию» (động từ + danh từ + giới từ).
* Spaced Repetition (Lặp lại ngắt quãng SM-2), Flashcard lật thẻ và Mini-game trắc nghiệm ôn tập.

* **Paywall / Gói PRO**: Mở khóa toàn bộ kho lọ từ vựng chuyên ngành và các tập video hoạt hình độc quyền.



### [Trụ Cột 5] Luyện Viết (Tả Tranh Chuẩn TRKI)

* **Format Письмо TRKI**: Đưa ra 1 hình ảnh/bối cảnh thực tế.


* **Tính năng**: Bàn phím ảo Cyrillic trên web, gợi ý từ vựng trọng tâm cần có trong bài viết.


* **AI Chấm điểm theo 4 tiêu chí**:
1. Ngữ pháp & Biến cách (Грамматика)


2. Vốn từ & Cụm từ liên kết (Лексика)


3. Bố cục bài viết (Структура)


4. Trả lời đúng trọng tâm đề (Содержание)




* Bảng đối chiếu: `[Câu gốc lỗi] ➔ [Câu sửa chuẩn] ➔ [Quy tắc ngữ pháp]`.




* **Paywall / Gói PRO**: Bản Free chấm 1 bài mẫu; gói PRO chấm không giới hạn cùng AI Rusika.



### [Trụ Cột 6] Luyện Nghe (Nghe Chép Chính Tả 4 Part Kiểu CEFR)

* **Phân cấp 4 Part bài bản**:
* **Part 1**: Nghe hiểu từng câu đơn lẻ (gõ chép chính tả từng từ).


* **Part 2**: Nghe hội thoại ngắn (đời sống du học sinh).


* **Part 3**: Nghe đoạn văn tường thuật đơn giản.


* **Part 4**: Nghe đoạn văn chuyên ngành, tin tức báo chí phức tạp.




* **Video cắt ngắn 1–2 phút**: Cắt từ YouTube/phim thực tế, phát xong hiện bài tập trắc nghiệm nghe hiểu.
* **Trình phát**: Tách audio từng câu, ẩn/hiện phụ đề song ngữ, tua chậm 0.75x–1.25x.


* **Paywall / Gói PRO**: Free nghe thử Part 1; PRO mở khóa full Part 1–4 và full transcript giải thích.



### [Trụ Cột 7] Luyện Nói (Shadowing & AI Chấm Phát Âm)

* **Phương pháp Shadowing**: Nghe câu nói mẫu từ video/YouTube, thu âm nhại theo tốc độ và ngữ điệu người bản xứ kèm sóng âm trực quan (Audio Waveform).


* **AI Chấm phát âm**: Thu âm qua MediaStream API, so sánh âm vị (Phoneme matching) để chỉ ra chính xác từ nào sai trọng âm hoặc phát âm sai phụ âm cứng/mềm.


* **Paywall / Gói PRO**: Free 2 lượt phát âm thử mỗi ngày; PRO mở khóa không giới hạn lượt nói với AI.



---

## 2. PHÂN HỆ NÂNG CẤP TRẢ TIỀN & VIETQR (MONETIZATION)

### Bảng gói cước:

1. **Gói 6 Tháng (PRO-6M)**: Mở khóa full ngân hàng đề thi TRKI A1–B1, luyện nghe Part 1–4, không giới hạn lọ từ vựng.


2. **Gói 1 Năm (PRO-1Y)**: Đầy đủ tính năng + 100 lượt AI chấm Writing tả tranh + AI luyện nói.


3. **Gói Trọn Đời (PRO-VIP)**: Toàn quyền truy cập vĩnh viễn mọi cấp độ + Tặng quà từ Shop Nga.



### Quy trình thanh toán tự động (Instant VietQR Activation):

1. **Tạo đơn**: Client chọn gói ➔ Backend tạo đơn `status: 'PENDING'` trong Supabase ➔ Sinh mã QR VietQR (kèm cú pháp định danh: `RUSI_ORD1092`).


2. **Webhook**: Học viên quét mã chuyển khoản ➔ Cổng thanh toán (PayOS/Casso/SeAPay) bắn HTTP POST Webhook về Backend.


3. **Kích hoạt tức thì**: Backend xác thực Signature, cập nhật trạng thái đơn thành `PAID` và cập nhật trường `is_pro = true` trong `profiles`.


4. **Realtime UI**: Supabase Realtime thông báo cho trình duyệt của học viên mở khóa tài khoản ngay lập tức mà không cần F5 hay chờ duyệt tay.



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

3. **`SHOP_PRODUCTS` (Shop nội địa Nga & Dịch vụ du học 6730)**:
   * 4 danh mục chính: `banh_keo` (Bánh kẹo Nga), `my_pham` (Mỹ phẩm Siberia), `luu_niem` (Quà lưu niệm Matryoshka/Cheburashka), `dich_vu_du_hoc` (Gói tư vấn hồ sơ 6730, Dịch thuật công chứng).
   * Thuộc tính: Mã định danh, Tên sản phẩm, Ngành hàng, Giá bán VNĐ, Ảnh minh họa, Huy hiệu (Bán chạy, Hot, Mới).

4. **`PACKAGES` (Bảng gói cước tài khoản PRO)**:
   * Các gói cước: Gói 6 Tháng (`pro_6m`), Gói 1 Năm (`pro_1y`), Gói Trọn Đời (`pro_vip`).
   * Thuộc tính: Tên gói, Huy hiệu thời hạn, Mô tả đối tượng học viên, Giá ưu đãi, Giá niêm yết, Đánh dấu "Phổ biến nhất", Danh sách quyền lợi.

5. **`BLOG_POSTS` (Cẩm nang du học & SEO Cluster)**:
   * Chuyên mục: Lộ trình học, KTX & Đời sống du học sinh, Học bổng Hiệp định 6730, Mẹo phát âm.
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
    category TEXT NOT NULL,              -- 'du_hoc_trai_nghiem', 'luat_cu_tru', 'ngu_phap', 'hoc_bong_6730'
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


6. **Quy chuẩn thanh điều hướng (Header Navigation)**: Thanh tiêu đề chính (Navbar) là cấu trúc phẳng, tuyệt đối không có phần con (dropdown submenu), chỉ gồm đúng 7 liên kết đơn tương ứng 7 trụ cột: `TRKI | Từ vựng | Nghe | Nói | Viết | Shop | Blog`.

7. **Quy chuẩn Deploy GitHub Pages & Cloudflare Cache Invalidation**:
* **Bắt buộc file `.nojekyll`**: Tại thư mục gốc của repository phải luôn duy trì tệp `.nojekyll` (dung lượng 0 bytes) nhằm chỉ thị GitHub Pages bỏ qua bộ xử lý Jekyll, chuyển trực tiếp các file tĩnh HTML/JS/CSS và tránh lỗi build / 403.
* **Cache-Busting Query Parameter (`?v=X.Y`)**: Mọi file HTML khi nhúng tài nguyên nội bộ (`styles.css`, `data.js`, `auth.js`, `app.js`, `pages.js`, `admin.js`, `srs.js`) bắt buộc phải gắn tham số phiên bản `?v=2.2` (hoặc mới hơn). Do Cloudflare và GitHub Pages cấu hình `Cache-Control: max-age=14400` (4 tiếng), việc gắn query parameter buộc trình duyệt và CDN nạp ngay phiên bản mới nhất, tránh tình trạng local hiển thị một kiểu nhưng website trên mạng vẫn hiện phiên bản cũ.
* **Thao tác Hard Reload cho người dùng**: Sau mỗi lần `git push`, hướng dẫn người dùng nhấn `Ctrl + F5` (hoặc `Cmd + Shift + R` trên Mac) hoặc mở tab Ẩn danh (Incognito) nếu trình duyệt còn lưu cache từ phiên trước.
```
