---
name: responsive-design
description: >-
  Use this skill whenever modifying, creating, or reviewing web pages, UI components, HTML, CSS, or JS in this project.
  Ensures all UI adapts seamlessly to mobile (<= 768px) and tablet (768px - 1024px) screens.
  Enforces the "More..." / overflow rule: any tabs, menus, action buttons, tags, or long content that exceeds screen width
  must collapse cleanly into a "More..." (Xem thêm / ▾ / ···) dropdown, drawer, or toggle instead of clipping halfway, wrapping awkwardly, or overflowing.
---

# Responsive Design & "More..." Overflow Handling Skill

> **Quy chuẩn bắt buộc:** Áp dụng sau **mọi** thao tác tạo mới hoặc chỉnh sửa giao diện web (HTML, CSS, JS) trong toàn bộ dự án RUSI TRKI. Đảm bảo giao diện hoàn hảo trên Điện thoại (Mobile) và Máy tính bảng (Tablet), xử lý triệt để hiện tượng tràn viền, hiện dở dang bằng cơ chế "More..." / Xem thêm.

---

## 🎯 2 Nguyên Tắc Bất Di Bất Dịch

1. **Chuẩn Responsive Đa Kích Thước:**
   - Mọi trang (`index.html`, `vocabulary.html`, `listening.html`, `admin.html`, v.v.) phải thích ứng hoàn hảo trên 3 nhóm thiết bị:
     - 📱 **Mobile nhỏ & chuẩn (<= 480px, <= 768px):** iPhone, Android.
     - 📟 **Tablet (768px - 1024px):** iPad dọc, iPad ngang, Android tablets.
     - 💻 **Desktop (> 1024px):** Laptop, PC.
   - Tuyệt đối **không** để xuất hiện thanh cuộn ngang ngoài ý muốn trên toàn trang (`overflow-x: hidden` trên body/container).

2. **Quy Tắc "More..." (Tuyệt Đối Không Để Hiện Dở Dang / Nham Nhở):**
   - Khi một thành phần giao diện (danh sách tab, thanh công cụ nút bấm, cụm nhãn tags, danh mục lọc, thẻ thông tin) có nhiều mục hoặc nội dung quá dài vượt quá độ rộng màn hình:
     - ❌ **CẤM:** Để chữ hoặc thẻ bị cắt cụt một nửa mép phải màn hình, hoặc rớt dòng lộn xộn không kiểm soát.
     - ✅ **BẮT BUỘC:** Gom các mục thừa vào nút **"More..." / "Thêm ▾" / Menu ba chấm `···` / Dropdown / Modal / Drawer**.

---

## 📱 Quy Trình 4 Bước Sau Mỗi Lần Sửa Web

```
┌────────────────────────────────────────────────────────┐
│ BƯỚC 1: KIỂM TRA BỐ CỤC (LAYOUT BREAKPOINTS)           │
│   • Desktop (> 1024px)   • Tablet (768px - 1024px)     │
│   • Mobile (<= 768px)    • Small Mobile (<= 390px)     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ BƯỚC 2: RÀ SOÁT TRÀN VIỀN & HIỂN THỊ DỞ DANG            │
│   • Có thanh cuộn ngang ngoài ý muốn trên body?        │
│   • Có tab/chữ/card nào bị cắt nửa chừng mép màn hình? │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ BƯỚC 3: ÁP DỤNG QUY TẮC "MORE..." / THU GỌN             │
│   • Tabs quá 3-4 mục trên mobile ➜ Cho vào "Thêm ▾"    │
│   • Hàng nút hành động dài ➜ Gom nút phụ vào "···"     │
│   • Tags/chips quá nhiều ➜ Hiện N cái + "+X khác"      │
│   • Đoạn văn/mô tả dài ➜ line-clamp + "Xem thêm"       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ BƯỚC 4: KIỂM TRA ĐIỀU KHIỂN CẢM ỨNG (TOUCH TARGETS)    │
│   • Nút bấm / icon cảm ứng tối thiểu 44 x 44px         │
│   • Khoảng cách giữa các nút bấm tối thiểu 8px         │
└────────────────────────────────────────────────────────┘
```

---

## 🧩 5 Mẫu Thiết Kế "More..." Chuẩn RUSI TRKI

Chi tiết mã nguồn CSS và JS có tại: [overflow-patterns.md](./references/overflow-patterns.md).

### 1. Thanh Tab Điều Hướng (Tabs Overflow)
*   **Khi nào dùng:** Khi có nhiều hơn 3-4 tabs (ví dụ: A1, A2, B1, B2, C1, Đề thi, Ngữ pháp, Từ vựng...).
*   **Cách xử lý:**
    - Trên Desktop: Hiển thị đủ tất cả các tabs.
    - Trên Tablet (768px - 1024px): Hiển thị 4 tabs chính, các tabs còn lại đưa vào menu dropdown **`Thêm ▾`**.
    - Trên Mobile (<= 768px): Hiển thị 2-3 tabs chính + nút **`Khác ▾`**, hoặc chuyển toàn bộ thành thẻ dropdown `<select class="dau-tab-select">`.
    - Nếu chọn cuộn ngang (`overflow-x: auto`), **bắt buộc** có lớp mờ viền phải (gradient fade mask) để người dùng nhận biết có thể cuộn, không để chữ bị cắt phẳng lì nửa chừng.

### 2. Hàng Nút Hành Động & Công Cụ (Action Toolbars)
*   **Khi nào dùng:** Cụm nút thao tác (Ví dụ: `[Luyện tập] [Làm bài test] [Gắn sao] [Chia sẻ] [Xóa] [Tải PDF]`).
*   **Cách xử lý:**
    - Giữ lại 1 nút Primary (màu nổi bật) và tối đa 1 nút Secondary.
    - Toàn bộ các thao tác còn lại gom vào nút biểu tượng ba chấm **`···` (Kebab button)**. Khi chạm vào sẽ mở popover menu hoặc Action Sheet từ dưới lên.

### 3. Cụm Nhãn & Thẻ Từ Khóa (Tags / Chips / Badges)
*   **Khi nào dùng:** Thẻ bài viết, card từ vựng hoặc kết quả tìm kiếm có nhiều thẻ danh mục/ngữ pháp.
*   **Cách xử lý:**
    - Chỉ hiển thị tối đa 3 chips đầu tiên.
    - Chip cuối cùng là badge số dư: **`+3 mục khác`**. Bấm vào sẽ mở popover/modal xem trọn vẹn danh sách tags.

### 4. Văn Bản & Đoạn Mô Tả Dài (Long Content Truncation)
*   **Khi nào dùng:** Lời giải thích, chú giải ngữ pháp, tóm tắt bài thi hoặc review học viên.
*   **Cách xử lý:**
    - Sử dụng CSS `-webkit-line-clamp: 2` hoặc `3` với `text-overflow: ellipsis`.
    - Đặt nút bấm nhỏ bên dưới: **`Xem thêm ▾` / `Thu gọn ▴`** để người đọc chủ động mở rộng khi cần.

### 5. Bảng Dữ Liệu & Khung So Sánh (Tables & Data Grids)
*   **Khi nào dùng:** Bảng 6 Cách tiếng Nga, bảng chia động từ, bảng điểm bài thi.
*   **Cách xử lý:**
    - Trên Mobile: Tuyệt đối không để vỡ cột (column squishing).
    - Giải pháp 1: Bọc trong wrapper cuộn ngang có chỉ báo cuộn (`table-responsive-wrapper`).
    - Giải pháp 2: Chuyển bảng dạng 2D thành dạng thẻ danh sách đứng (Card List) xếp chồng lên nhau.

---

## 📐 Bảng Thông Số Kỹ Thuật (Responsive Breakpoints)

| Thiết bị | Breakpoint | Thay đổi Layout | Xử lý "More..." |
| :--- | :--- | :--- | :--- |
| **Desktop** | `> 1024px` | 3 - 4 cột, sidebar hiển thị cố định | Hiện đầy đủ các mục |
| **Tablet** | `768px - 1024px` | 2 cột, sidebar thu gọn dạng drawer | Tabs > 4 mục ➜ gom vào `Thêm ▾` |
| **Mobile** | `481px - 768px` | 1 cột đơn, full-width container | Tabs > 3 mục ➜ dropdown `<select>` |
| **Small Mobile** | `<= 480px` | 1 cột, padding 12px, font tiêu đề co nhỏ | Action bar ➜ 1 nút chính + `···` |

---

## 📋 Danh Sách Tự Kiểm Tra (Self-Checklist)

Sau mỗi lần sửa giao diện web, trước khi hoàn tất, hãy xác nhận:
- [ ] Mở thử nghiệm ở độ rộng 375px (iPhone), 768px (iPad dọc) và 1024px (iPad ngang).
- [ ] Không có thanh cuộn ngang ngoài ý muốn xuất hiện ở chân trang (`body`).
- [ ] Không có nút, chữ, card nào bị che mất 1 nửa trông thiếu thẩm mỹ.
- [ ] Toàn bộ các danh sách/thao tác dài đã có nút "More..." / "Xem thêm" hoặc dropdown tương ứng.
- [ ] Vùng chạm (tap target) cho ngón tay tối thiểu 44 x 44px, không bị bấm nhầm nút bên cạnh.
- [ ] Modal / Popover không bị tràn ra ngoài màn hình điện thoại (tối đa `max-height: 90vh; overflow-y: auto`).
