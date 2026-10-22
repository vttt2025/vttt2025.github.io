# RUSI TRKI — Workspace Agent Guidelines & Directives

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

📖 **Tài liệu hướng dẫn & mẫu code chi tiết xem tại:**
- Skill: [SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/SKILL.md)
- Mẫu code UI: [overflow-patterns.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/references/overflow-patterns.md)
- Bảng kiểm tra: [mobile-tablet-checklist.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/responsive-design/references/mobile-tablet-checklist.md)
