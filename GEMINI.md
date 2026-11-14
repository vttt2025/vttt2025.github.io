# RUSI TRKI — Workspace Agent Guidelines & Rules

## 🛑 QUY TẮC BẤT KHẢ XÂM PHẠM: KHÔNG TỰ Ý SỬA NỘI DUNG ĐÃ ĐẶT TRÊN WEB

- **Tuyệt đối KHÔNG ĐƯỢC tự ý sửa, xóa, rút gọn hoặc thay đổi bất kỳ nội dung nào người dùng đã đặt trên web (tiêu đề, câu chữ, đoạn mô tả hero/eyebrow, bài viết, dữ liệu từ vựng/đề thi...) trừ khi người dùng có yêu cầu đích danh mới được sửa.**
- Khi nhận yêu cầu tinh chỉnh giao diện, CSS, responsive, sửa lỗi JavaScript hay refactor: **chỉ tác động đến phần code kỹ thuật/styling**, bắt buộc giữ nguyên vẹn 100% nội dung chữ và dữ liệu gốc của trang web.

---

## 🧠 NGUYÊN TẮC LẬP TRÌNH CHUẨN XÁC THEO ANDREJ KARPATHY (KARPATHY GUIDELINES)

Mỗi khi viết code, refactor hoặc sửa lỗi kỹ thuật, trợ lý AI **BẮT BUỘC** phải tuân thủ 4 nguyên tắc từ Andrej Karpathy:
- **Vị trí skill:** [.agents/skills/andrej-karpathy-skills/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/andrej-karpathy-skills/SKILL.md)

1. **Suy nghĩ trước khi code (Think Before Coding):**
   * Không tự ý suy diễn hoặc ngầm giả định. Nếu có điểm mơ hồ hoặc nhiều cách hiểu khác nhau, phải hỏi người dùng hoặc nêu rõ phương án đánh đổi trước khi làm.
   * Nếu có cách giải quyết đơn giản hơn, hãy đề xuất và phản biện khi cần thiết. Nếu thấy điểm bất hợp lý, dừng lại và hỏi rõ.
2. **Đơn giản là trên hết (Simplicity First):**
   * Viết lượng code tối thiểu cần thiết để giải quyết đúng vấn đề được giao.
   * Tuyệt đối không tạo abstraction thừa thãi cho đoạn code chỉ dùng 1 lần, không thêm các cấu hình hoặc tính năng suy đoán tương lai chưa được yêu cầu. Nếu việc cần làm chỉ cần 50 dòng, không được viết 200 dòng.
3. **Tác động chuẩn xác, tối thiểu (Surgical Changes):**
   * Chỉ can thiệp vào đúng những dòng code và file trực tiếp liên quan đến yêu cầu.
   * Tuyệt đối không "tiện tay" sửa hoặc format lại code lân cận, không sửa đổi/xóa comment hiện có, không refactor những phần đang chạy ổn định.
   * Chỉ dọn dẹp các biến/import thừa do chính mình tạo ra; không xóa dead code cũ nếu không được yêu cầu.
4. **Thực thi định hướng mục tiêu (Goal-Driven Execution):**
   * Xác định rõ tiêu chí thành công và kiểm chứng trước khi kết thúc (kiểm tra test, kiểm tra console log, thẩm định trực quan các viewport).
   * Lặp lại quy trình kiểm tra cho đến khi đạt kết quả mong muốn một cách nhất quán.

---

## 🧘 NGUYÊN TẮC PONYTAIL (LAZY SENIOR DEVELOPER - DIETRICH GEBERT)

- **Vị trí skill:** [.agents/skills/ponytail/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/ponytail/SKILL.md)
- **Quy tắc rules:** [.agents/rules/ponytail.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/rules/ponytail.md)
- **Triết lý cốt lõi:** *"The best code is the code you never wrote."* (Đoạn code tuyệt vời nhất là đoạn code không bao giờ phải viết).
- **Thang đánh giá giải pháp tối thiểu (Smallest Complete Change):**
  1. *Tính năng có thực sự cần tồn tại?* Loại bỏ ngay các tùy chọn, cấu hình thừa thãi người dùng không yêu cầu.
  2. *Đã có sẵn trong codebase?* Tái sử dụng helper, component, service hiện có theo đúng quy chuẩn dự án.
  3. *Có sẵn trong Web Platform / Standard Library?* Ưu tiên tính năng chuẩn native của trình duyệt.
  4. *Đã có trong dependency hiện tại?* Dùng thư viện đã cài, tuyệt đối không cài thêm thư viện mới chỉ vì vài dòng code.
  5. *Có thể viết thành 1 dòng code dễ hiểu?* Ưu tiên giải pháp ngắn gọn, trực diện nhất.
  6. *Luôn kiểm tra tác động toàn diện:* Kiểm tra mọi hàm gọi liên quan (callers), test suite, dữ liệu người dùng trước khi kết thúc.

---

## 📱 QUY TẮC BẮT BUỘC: RESPONSIVE CHO MOBILE, TABLET & XỬ LÝ TRÀN VIỀN ("MORE...")

Mỗi khi thực hiện bất kỳ thay đổi nào liên quan đến giao diện người dùng (HTML, CSS, JavaScript trong `pages.js`, `app.js`, `styles.css`, hoặc các file `.html`), trợ lý AI **BẮT BUỘC** phải tuân thủ và kích hoạt các quy tắc sau:

### 1. Tối Ưu Bắt Buộc Cho Điện Thoại & Máy Tính Bảng
- **Mobile (<= 768px & <= 480px):**
  * Bố cục lưới nhiều cột phải tự động chuyển thành 1 cột duy nhất.
  * Tuyệt đối không để phát sinh thanh cuộn ngang ngoài ý muốn trên toàn trang (`overflow-x: hidden`).
  * Chiều rộng container padding từ 12px đến 16px.
  * Vùng chạm (tap target) tối thiểu 44x44px, font size ô nhập liệu $\ge 16px$ tránh tự động zoom trên iOS.
- **Tablet (768px - 1024px):**
  * Chuyển đổi linh hoạt giữa 2 cột cân đối, thanh bên (sidebar) thu gọn hoặc biến thành drawer/tabs khi cần.

### 2. Quy Tắc "More..." (Tuyệt Đối Không Để Hiện Dở Dang / Nham Nhở)
- **Tabs & Bộ Lọc:**
  * Nếu có nhiều hơn 3-4 tabs trên điện thoại hoặc nhiều hơn 5 tabs trên máy tính bảng: **KHÔNG ĐƯỢC** để tab cuối bị cắt cụt một nửa chừng mép màn hình.
  * **PHẢI GOM VÀO NÚT "MORE..." / "THÊM ▾" / DROPDOWN SELECT** chứa các tab phụ còn lại.
  * Nếu dùng cuộn ngang, phải có hiệu ứng mờ viền (gradient mask) để người dùng nhận biết có thể cuộn, không để chữ bị chém ngang.
- **Hàng Nút Thao Tác (Action Buttons):**
  * Chỉ giữ 1 nút chính (Primary) và tối đa 1 nút phụ (Secondary).
  * Tất cả các nút phụ khác phải gom vào nút ba chấm `···` (Kebab / More actions menu).
- **Tags & Badges:**
  * Giới hạn hiển thị tối đa 3-4 nhãn, các nhãn còn lại hiển thị dạng `+N khác ▾`.
- **Đoạn Văn & Mô Tả Dài:**
  * Dùng CSS `line-clamp` (2-3 dòng) kết hợp nút `Xem thêm ▾` / `Thu gọn ▴`.

---

## 🛡️ NGUYÊN TẮC BẢO MẬT WEB CHUẨN CLOUDFLARE (SECURITY AUDIT SKILL)

Mỗi khi xây dựng, tinh chỉnh logic, tạo mới API endpoint, xử lý dữ liệu người dùng hoặc kiểm tra mã nguồn, trợ lý AI **BẮT BUỘC** phải tuân thủ và kích hoạt các quy tắc bảo mật từ bộ kỹ năng của Cloudflare:
- **Vị trí skill:** [.agents/skills/security-audit/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/SKILL.md)
- **Quy tắc rules:** [.agents/rules/security-audit.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/rules/security-audit.md)
- **Các tiêu chuẩn bắt buộc:**
  1. *Ranh giới tin cậy (Trust Boundary & Input Validation):* Mọi dữ liệu từ người dùng, URL query, hash, `localStorage` hay `postMessage` đều là không tin cậy. Phải được escape (`esc()`) hoặc validate chặt chẽ trước khi render vào DOM để loại bỏ triệt để XSS/DOM-XSS.
  2. *Xác thực & Phân quyền (Auth & Access Control):* Quyền truy cập nội dung nhạy cảm hoặc ghi dữ liệu bắt buộc phải được bảo vệ bởi phiên xác thực và RLS (Row Level Security). Ngăn chặn tuyệt đối lỗ hổng IDOR/BOLA.
  3. *Bảo vệ khóa bí mật (Secret Isolation):* Không hardcode service keys, private tokens hay credentials bí mật vào client-side code hay repository công khai.
  4. *Sửa lỗi tối thiểu & có kiểm chứng (Smallest Effective Fix):* Áp dụng giải pháp sửa lỗi bảo mật tối thiểu, chính xác tại gốc rễ vấn đề, không gây ảnh hưởng đến trải nghiệm người dùng.

---

## 🎨 QUY TẮC THIẾT KẾ GIAO DIỆN CHẤT LƯỢNG CAO (ANTI-SLOP & HIGH-CRAFT DESIGN)

Mỗi khi thiết kế mới, tinh chỉnh, thẩm định hoặc làm đẹp giao diện người dùng (UI/UX), bắt buộc kích hoạt và áp dụng nguyên lý từ 2 bộ kỹ năng:

### 1. Impeccable Design Skill (`impeccable.style`)
- **Vị trí skill:** [.agents/skills/impeccable/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/impeccable/SKILL.md)
- **Tiêu chuẩn:**
  * **Loại bỏ hoàn toàn AI-slop:** Tránh dùng font mặc định cẩu thả, màu gradient tím-xanh rập khuôn, các thẻ icon 3 cột sáo rỗng.
  * **Hệ thống phân cấp thị giác:** Typography rõ ràng, tỷ lệ bước đệm (spacing scale) chuẩn xác, độ tương phản đáp ứng WCAG a11y.
  * **Chế độ bề mặt (Surface Mode):** Phân biệt rõ giữa *Persuade* (Landing page, giới thiệu), *Operate* (Giao diện học tập, làm bài, bảng điều khiển), và *Read* (Bài đọc, tài liệu) để tối ưu công năng.
  * **Hoàn thiện từng chi tiết (Polish & Harden):** Xử lý đầy đủ trạng thái rỗng (empty state), trạng thái tải (loading skeleton), hover/focus/active và vi tương tác (micro-interactions).

### 2. Taste Skill (`tasteskill.dev`)
- **Vị trí skill:** [.agents/skills/taste-skill/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/taste-skill/SKILL.md)
- **Tiêu chuẩn:**
  * **Định hướng nghệ thuật có chủ đích:** Giao diện có cá tính riêng, bố cục cân xứng mang tính biên tập xuất bản (editorial layout), không tạo cảm giác trang web "AI tự sinh".
  * **Tự kiểm tra giao diện (Self-Inspection):** Luôn tự thẩm định trực quan các viewport (Desktop, Tablet, Mobile) sau khi code để đảm bảo mọi khối hiển thị ăn khớp, không lỗi vỡ khung hay khoảng trắng vô lý.

---

📖 **Tài liệu hướng dẫn & kỹ năng workspace:**
- Andrej Karpathy Skills: [andrej-karpathy-skills/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/andrej-karpathy-skills/SKILL.md)
- Ví dụ thực tế Karpathy: [andrej-karpathy-skills/EXAMPLES.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/andrej-karpathy-skills/EXAMPLES.md)
- Responsive Skill: [responsive-design/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/SKILL.md)
- Impeccable Skill: [impeccable/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/impeccable/SKILL.md)
- Taste Skill: [taste-skill/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/taste-skill/SKILL.md)
- Mẫu code UI: [overflow-patterns.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/references/overflow-patterns.md)
- Bảng kiểm tra: [mobile-tablet-checklist.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/references/mobile-tablet-checklist.md)
- Ponytail Skill: [ponytail/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/ponytail/SKILL.md)
- Ponytail Review: [ponytail-review/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/ponytail-review/SKILL.md)
- Security Audit Skill: [security-audit/SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/SKILL.md)
- Quy tắc bảo mật Cloudflare: [security-audit.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/rules/security-audit.md)
