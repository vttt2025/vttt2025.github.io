# Mobile & Tablet Quality Verification Checklist

Danh sách kiểm tra chi tiết dành cho trợ lý AI và lập trình viên trước khi hoàn tất bất kỳ thay đổi nào liên quan đến giao diện web (HTML, CSS, JS) trong dự án RUSI TRKI.

---

## 1. Kiểm tra Bố cục Màn hình (Viewport & Breakpoints)

- [ ] **Thẻ Meta Viewport:** Đảm bảo tất cả các file HTML đều có:
  `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`.
- [ ] **Kiểm tra 375px (iPhone SE, Small Mobile):**
  - Container không tràn lề (padding tối thiểu `12px` - `16px`).
  - Tiêu đề `<h1>`, `<h2>` không quá to, tự co nhỏ hoặc ngắt từ hợp lý (`word-break: break-word; hyphens: auto`).
  - Không có khoảng trắng thừa ở mép phải trang web.
- [ ] **Kiểm tra 768px (iPad dọc, Android Tablet):**
  - Bố cục 3-4 cột chuyển sang 2 cột cân xứng.
  - Sidebar chính thu gọn hoặc chuyển thành tab/bottom bar nếu cần.
- [ ] **Kiểm tra 1024px (iPad ngang, Small Laptop):**
  - Không bị co rúm nội dung, menu thanh điều hướng không chồng lấn lên logo.

---

## 2. Kiểm tra Nguyên Tắc "More..." / Overflow

- [ ] **Tabs & Danh mục lọc:**
  - Nếu có $\ge 4$ tabs, trên mobile có gom vào nút `Thêm ▾` hoặc chuyển thành `<select>` không?
  - Có tab nào bị che mất 1/2 chữ trông nham nhở không?
- [ ] **Hàng Nút Hành động (Action Buttons):**
  - Trên màn hình hẹp, các nút phụ có được chuyển vào menu ba chấm `···` không?
  - Các nút có bị ép méo hoặc chữ bị rớt dòng lửng lơ không?
- [ ] **Thẻ Card & Đoạn văn bản dài:**
  - Có áp dụng `line-clamp` kèm nút `Xem thêm ▾` cho các đoạn mô tả dài không?
- [ ] **Bảng & Danh sách dữ liệu:**
  - Bảng 6 Cách tiếng Nga hoặc bảng điểm có cuộn mượt mà hoặc chuyển dạng Card không?

---

## 3. Kiểm tra Trải nghiệm Cảm ứng (Touch & Usability)

- [ ] **Kích thước vùng bấm (Tap Target):** Tất cả các nút bấm, icon mở modal, link menu phải có kích thước tối thiểu `44px x 44px` (chuẩn Apple Human Interface Guidelines).
- [ ] **Khoảng cách giữa các nút:** Tối thiểu `8px` để tránh ngón tay chạm nhầm 2 nút cùng lúc.
- [ ] **Font size ô nhập liệu (Input Fields):** Trên mobile, `font-size` của input phải $\ge 16px$ để ngăn trình duyệt Safari/Chrome trên iOS tự động zoom cận cảnh trang web khi chạm vào.
- [ ] **Bàn phím ảo:** Khi bàn phím ảo bật lên trên điện thoại, modal hoặc form không bị che khuất nút "Gửi" / "Nộp bài".

---

## 4. Kiểm tra Modal & Popup (Overlays)

- [ ] Modal có `max-height: 90vh` và `overflow-y: auto` để học viên luôn cuộn tới được nút đóng / nút xác nhận.
- [ ] Nút đóng modal `✕` nằm ở vị trí dễ bấm, cố định hoặc luôn nhìn thấy được ở góc trên cùng.
- [ ] Khi modal mở, body không bị cuộn ngầm phía sau (`document.body.style.overflow = "hidden"`).
