# Mẫu Triển Khai Kỹ Thuật: "More..." & Overflow Handling

Tài liệu này cung cấp các đoạn mã mẫu (HTML / CSS / JS) chuẩn hóa cho dự án RUSI TRKI để áp dụng cơ chế "More..." (Xem thêm / Thu gọn / Dropdown).

---

## 1. Mẫu Tab Overflow ("Thêm ▾" Dropdown)

### HTML:
```html
<div class="rusi-tabs-container">
  <!-- Các tab chính luôn hiển thị -->
  <button class="rusi-tab active" data-tab="all">Tất cả</button>
  <button class="rusi-tab" data-tab="a1">Sơ cấp A1</button>
  <button class="rusi-tab" data-tab="a2">Sơ trung A2</button>
  
  <!-- Các tab mở rộng gom vào nút Thêm -->
  <div class="rusi-tab-more-dropdown" id="tabMoreWrapper">
    <button type="button" class="rusi-tab rusi-tab-more-btn" id="btnTabMore" aria-expanded="false">
      <span>Thêm</span>
      <span class="rusi-caret">▾</span>
    </button>
    <div class="rusi-tab-more-menu hidden" id="tabMoreMenu">
      <button class="rusi-tab-more-item" data-tab="b1">Trung cấp B1</button>
      <button class="rusi-tab-more-item" data-tab="b2">Trung cao B2</button>
      <button class="rusi-tab-more-item" data-tab="c1">Cao cấp C1</button>
      <button class="rusi-tab-more-item" data-tab="special">Chuyên ngành</button>
    </div>
  </div>
</div>
```

### CSS:
```css
.rusi-tabs-container {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  position: relative;
  overflow: visible;
}

.rusi-tab-more-dropdown {
  position: relative;
  display: inline-block;
}

.rusi-tab-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font-weight: 600;
  cursor: pointer;
}

.rusi-tab-more-menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 180px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  padding: 6px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rusi-tab-more-menu.hidden {
  display: none;
}

.rusi-tab-more-item {
  width: 100%;
  text-align: left;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  color: var(--text);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.rusi-tab-more-item:hover,
.rusi-tab-more-item:focus {
  background: var(--red-soft);
  color: var(--primary);
}
```

---

## 2. Mẫu Hàng Nút Thao Tác (Kebab Menu `···`)

### HTML:
```html
<div class="rusi-action-toolbar">
  <!-- Nút chính quan trọng nhất -->
  <button class="btn btn-primary btn-sm">▶️ Bắt đầu học</button>
  <button class="btn btn-soft btn-sm">🃏 Lật thẻ</button>

  <!-- Nút 3 chấm gom các thao tác phụ -->
  <div class="rusi-kebab-wrapper">
    <button type="button" class="btn btn-soft btn-sm btn-icon" id="btnKebabMore" title="Thao tác khác" aria-label="Thao tác khác">
      •••
    </button>
    <div class="rusi-kebab-menu hidden" id="kebabMenu">
      <button type="button" class="kebab-item">⭐ Đánh dấu yêu thích</button>
      <button type="button" class="kebab-item">📤 Chia sẻ lọ từ</button>
      <button type="button" class="kebab-item">📥 Tải danh sách PDF</button>
      <div class="kebab-divider"></div>
      <button type="button" class="kebab-item text-danger">🗑️ Xóa lọ từ</button>
    </div>
  </div>
</div>
```

---

## 3. Mẫu Cụm Chips / Tags với `+N khác`

### HTML & JS:
```javascript
function renderTagsWithOverflow(tags, maxVisible = 3) {
  if (!tags || !tags.length) return "";
  
  const visible = tags.slice(0, maxVisible);
  const remaining = tags.slice(maxVisible);
  
  let html = visible.map(t => `<span class="rusi-chip">${esc(t)}</span>`).join("");
  
  if (remaining.length > 0) {
    const remainingText = remaining.map(esc).join(", ");
    html += `
      <span class="rusi-chip rusi-chip-more" title="${remainingText}" onclick="alert('${remainingText}')">
        +${remaining.length} khác ▾
      </span>
    `;
  }
  return `<div class="rusi-chips-group">${html}</div>`;
}
```

---

## 4. Mẫu Đoạn Văn Bản Cắt Gọn (Line-Clamp + "Xem thêm")

### CSS:
```css
.rusi-truncate-box {
  position: relative;
}

.rusi-truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.25s ease;
}

.rusi-truncate-text.expanded {
  -webkit-line-clamp: unset;
}

.rusi-btn-toggle-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--primary);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  padding: 4px 0;
  margin-top: 4px;
}
```

### JS:
```javascript
document.querySelectorAll(".rusi-btn-toggle-more").forEach(btn => {
  btn.onclick = () => {
    const target = btn.previousElementSibling;
    const isExpanded = target.classList.toggle("expanded");
    btn.textContent = isExpanded ? "Thu gọn ▴" : "Xem thêm ▾";
  };
});
```

---

## 5. Mẫu Cuộn Ngang Có Mặt Nạ Mờ (Scroll Gradient Mask)

Dành cho trường hợp giữ danh sách cuộn ngang nhưng không để phần tử bị cắt cụt cứng nhắc:

```css
.rusi-scroll-wrapper {
  position: relative;
  width: 100%;
}

.rusi-scroll-track {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
  /* Mặt nạ làm mờ dần ở mép phải trên điện thoại để báo hiệu còn nội dung */
  mask-image: linear-gradient(to right, black 85%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 85%, transparent 100%);
}

.rusi-scroll-track::-webkit-scrollbar {
  height: 4px;
}

.rusi-scroll-track::-webkit-scrollbar-thumb {
  background: var(--border);
  border-radius: 4px;
}
```
