/**
 * ============================================================================
 * RUSI TRKI — HỆ THỐNG VECTOR ICON LUCIDE 24px CHUẨN HOÁ
 * Nguồn: rusi_trki_lucide_icon_system.html & Lucide Icons Spec
 * Quy chuẩn: 24x24 viewBox, stroke: currentColor, stroke-width: 2, 
 *             stroke-linecap: round, stroke-linejoin: round, fill: none
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.RUSI_ICONS = factory().RUSI_ICONS;
    root.RusiIcons = factory().RusiIcons;
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ==========================================================================
   * 1. KHO SVG GỐC TỪ RUSI_TRKI_LUCIDE_ICON_SYSTEM.HTML & LUCIDE ICONS
   * ========================================================================== */
  var RUSI_ICONS = {
    // --- 7 CHUYÊN MỤC CỐT LÕI (PILLARS) ---
    "headphones": {
      name: "Luyện Nghe (Headphones)",
      category: "pillars",
      paths: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"></path>'
    },
    "archive-jar": {
      name: "Lọ Từ Vựng (Jar / Bottle)",
      category: "pillars",
      paths: '<path d="M5 6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Z"/><path d="M6 8v11a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V8"/><path d="M10 12h4"/><path d="M10 16h4"/>'
    },
    "pen-tool": {
      name: "Luyện Viết (Writing Pen)",
      category: "pillars",
      paths: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'
    },
    "mic-speaking": {
      name: "Luyện Nói (Mic Shadowing)",
      category: "pillars",
      paths: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/><line x1="8" x2="16" y1="22" y2="22"/>'
    },
    "graduation-cap": {
      name: "Thi Chứng Chỉ TRKI (Exam)",
      category: "pillars",
      paths: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>'
    },
    "book-open-blog": {
      name: "Blog Du Học Nga (Cẩm Nang)",
      category: "pillars",
      paths: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'
    },
    "shopping-bag-shop": {
      name: "Shop Hàng Nga & Dịch Vụ",
      category: "pillars",
      paths: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'
    },

    // --- GAMIFICATION & MASCOT RUSIKA ---
    "flame-streak": {
      name: "Chuỗi Streak Ngày Học",
      category: "gamification",
      paths: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>'
    },
    "zap-xp": {
      name: "Điểm Kinh Nghiệm (XP)",
      category: "gamification",
      paths: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
    },
    "trophy-reward": {
      name: "Cúp Xếp Hạng & Danh Hiệu",
      category: "gamification",
      paths: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'
    },
    "cat-mascot": {
      name: "Mèo Nga Rusika (Mascot)",
      category: "gamification",
      paths: '<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7A10 10 0 0 1 21 15c0 4.42-4.03 8-9 8s-9-3.58-9-8c0-1.77.64-3.41 1.74-4.75 0 0-1.82-6.42-.42-7 1.39-.58 4.64.26 6.42 2.26.65-.17 1.33-.26 2-.26z"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M10 18c1.33.67 2.67.67 4 0"/>'
    },
    "award-badge": {
      name: "Huy Hiệu Chứng Nhận",
      category: "gamification",
      paths: '<circle cx="12" cy="8" r="6"/><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.204 0l-3.58 2.687a.5.5 0 0 1-.81-.47l1.514-8.526"/>'
    },
    "crown-vip": {
      name: "Thành Viên VIP / PRO",
      category: "gamification",
      paths: '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>'
    },

    // --- PHÒNG THI TRKI & HỌC TẬP THÔNG MINH ---
    "timer-clock": {
      name: "Đồng Hồ Đếm Ngược Thi",
      category: "exam",
      paths: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>'
    },
    "bot-rusika": {
      name: "Trợ Lý AI Rusika",
      category: "exam",
      paths: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>'
    },
    "keyboard-cyrillic": {
      name: "Bàn Phím Ảo Cyrillic",
      category: "exam",
      paths: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/>'
    },
    "waveform-audio": {
      name: "Sóng Âm Thanh (Waveform)",
      category: "exam",
      paths: '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>'
    },
    "flashcards-layers": {
      name: "Thẻ Lật Flashcard",
      category: "exam",
      paths: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
    },
    "sparkles-clean": {
      name: "Gợi Ý & Chỉnh Sửa AI",
      category: "exam",
      paths: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>'
    },
    "shield-anti-cheat": {
      name: "Chống Gian Lận Thi",
      category: "exam",
      paths: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'
    },
    "check-circle-correct": {
      name: "Đáp Án Đúng / Đạt",
      category: "exam",
      paths: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
    },

    // --- SHOP & VIETQR THANH TOÁN ---
    "qr-code-vietqr": {
      name: "Mã VietQR Tức Thì",
      category: "shop_payment",
      paths: '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>'
    },
    "credit-card": {
      name: "Thẻ Ngân Hàng Mir / ATM",
      category: "shop_payment",
      paths: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>'
    },
    "copy-clipboard": {
      name: "Sao Chép Cú Pháp / Số TK",
      category: "shop_payment",
      paths: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'
    },
    "package-order": {
      name: "Đơn Hàng & Kiện Hàng Nga",
      category: "shop_payment",
      paths: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'
    },
    "truck-shipping": {
      name: "Vận Chuyển Du Học & Hàng",
      category: "shop_payment",
      paths: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>'
    },

    // --- ADMIN CMS & QUẢN TRỊ AN NINH ---
    "layout-dashboard": {
      name: "Bảng Điều Khiển Admin",
      category: "admin",
      paths: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'
    },
    "users-students": {
      name: "Quản Lý Học Viên (CRM)",
      category: "admin",
      paths: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
    },
    "database-tests": {
      name: "Ngân Hàng Đề Thi & Từ Điển",
      category: "admin",
      paths: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>'
    },
    "history-audit": {
      name: "Audit Logs (Kiểm Toán)",
      category: "admin",
      paths: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>'
    },
    "settings-gear": {
      name: "Cấu Hình Hệ Thống",
      category: "admin",
      paths: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'
    },

    // --- ĐIỀU HƯỚNG & UI CONTROLS ---
    "lock-pro": {
      name: "Khóa PRO Paywall",
      category: "controls",
      paths: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
    },
    "play-control": {
      name: "Phát Bài Nghe (Play)",
      category: "controls",
      paths: '<polygon points="5 3 19 12 5 21 5 3"/>'
    },
    "pause-control": {
      name: "Tạm Dừng (Pause)",
      category: "controls",
      paths: '<rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>'
    },
    "volume-high": {
      name: "Âm Lượng (Volume)",
      category: "controls",
      paths: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>'
    },
    "arrow-right": {
      name: "Mũi Tên Tiếp Theo (Next)",
      category: "controls",
      paths: '<line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/>'
    },
    "arrow-left": {
      name: "Mũi Tên Quay Lại (Back)",
      category: "controls",
      paths: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'
    },
    "chevron-down": {
      name: "Mở Rộng Menu (Chevron Down)",
      category: "controls",
      paths: '<polyline points="6 9 12 15 18 9"/>'
    },
    "log-out": {
      name: "Đăng Xuất (Log Out)",
      category: "controls",
      paths: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'
    },
    "search-icon": {
      name: "Tra Cứu Từ Điển Cyrillic",
      category: "controls",
      paths: '<circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/>'
    },

    // --- TIỆN ÍCH MỞ RỘNG (UTILITIES) ---
    "star": {
      name: "Đánh Dấu Sao (Star)",
      category: "controls",
      paths: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'
    },
    "trash-2": {
      name: "Xóa Bản Ghi (Trash)",
      category: "controls",
      paths: '<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>'
    },
    "check": {
      name: "Hoàn Thành (Check)",
      category: "controls",
      paths: '<polyline points="20 6 9 17 4 12"/>'
    },
    "x": {
      name: "Đóng / Hủy (Close)",
      category: "controls",
      paths: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
    },
    "plus": {
      name: "Thêm Mới (Plus)",
      category: "controls",
      paths: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'
    },
    "edit-3": {
      name: "Chỉnh Sửa (Edit)",
      category: "controls",
      paths: '<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>'
    },
    "refresh-cw": {
      name: "Làm Mới / Đồng Bộ (Refresh/Sync)",
      category: "controls",
      paths: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>'
    },
    "file-text": {
      name: "Văn Bản / Tài Liệu (Document)",
      category: "controls",
      paths: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'
    },
    "external-link": {
      name: "Mở Liên Kết Ngoài",
      category: "controls",
      paths: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'
    },
    "info": {
      name: "Thông Tin (Info)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>'
    },
    "help-circle": {
      name: "Hỏi Đáp / Trợ Giúp (Help)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>'
    },
    "filter": {
      name: "Bộ Lọc (Filter)",
      category: "controls",
      paths: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'
    },
    "eye": {
      name: "Xem Trước (Preview / Eye)",
      category: "controls",
      paths: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
    },
    "calendar": {
      name: "Lịch Học (Calendar)",
      category: "controls",
      paths: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'
    },
    "radio": {
      name: "Đài Tiếng Nói / Radio Nga",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>'
    },
    "brain": {
      name: "Não Bộ / Thuật Toán Ghi Nhớ",
      category: "controls",
      paths: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v13"/><path d="M15 9h2"/><path d="M7 9h2"/><path d="M15 13h2"/><path d="M7 13h2"/>'
    },
    "trending-up": {
      name: "Tiến Độ Tăng Trưởng (Progress)",
      category: "controls",
      paths: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>'
    },
    "target": {
      name: "Mục Tiêu Học Tập (Target)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'
    },
    "save": {
      name: "Lưu Trữ (Save)",
      category: "controls",
      paths: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>'
    },
    "moon": {
      name: "Chế Độ Ban Đêm (Moon)",
      category: "controls",
      paths: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
    },
    "sun": {
      name: "Chế Độ Ban Ngày (Sun)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>'
    },
    "cloud-upload": {
      name: "Đẩy Dữ Liệu Lên Cloud",
      category: "admin",
      paths: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>'
    },
    "cloud-download": {
      name: "Kéo Dữ Liệu Về Cục Bộ",
      category: "admin",
      paths: '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/>'
    },
    "frown": {
      name: "Mức Độ Khó (Frown)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>'
    },
    "smile": {
      name: "Mức Độ Tốt (Smile)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>'
    },
    "folder": {
      name: "Thư Mục / Bộ Sưu Tập (Folder)",
      category: "controls",
      paths: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'
    },
    "inbox": {
      name: "Hộp Thư Rỗng / Trống (Inbox)",
      category: "controls",
      paths: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>'
    },
    "bar-chart-2": {
      name: "Biểu Đồ Thống Kê (Bar Chart)",
      category: "controls",
      paths: '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>'
    },
    "shuffle": {
      name: "Xáo Trộn Thẻ (Shuffle)",
      category: "controls",
      paths: '<polyline points="16 3 21 3 21 8"/><line x1="4" x2="21" y1="20" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" x2="21" y1="15" y2="21"/><line x1="4" x2="9" y1="4" y2="9"/>'
    },
    "maximize-2": {
      name: "Phóng To Toàn Màn Hình (Maximize)",
      category: "controls",
      paths: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" x2="14" y1="3" y2="10"/><line x1="3" x2="10" y1="21" y2="14"/>'
    },
    "minimize-2": {
      name: "Thu Nhỏ Màn Hình (Minimize)",
      category: "controls",
      paths: '<polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/><line x1="14" x2="21" y1="10" y2="3"/><line x1="3" x2="10" y1="21" y2="14"/>'
    },
    "circle-dot": {
      name: "Nút Radio Tròn (Circle Dot)",
      category: "controls",
      paths: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="1"/>'
    }
  };

  /* ==========================================================================
   * 2. BẢNG MÃ ÁNH XẠ EMOJI & TỪ KHÓA TƯƠNG ĐƯƠNG VỀ ICON CHUẨN
   * ========================================================================== */
  var ALIAS_MAP = {
    // 7 Pillars
    "headphones": "headphones", "listening": "headphones", "audio": "headphones", "nghe": "headphones", "🎧": "headphones",
    "archive-jar": "archive-jar", "jar": "archive-jar", "vocab": "archive-jar", "vocabulary": "archive-jar", "tuvung": "archive-jar", "🫙": "archive-jar", "🏺": "archive-jar",
    "pen-tool": "pen-tool", "writing": "pen-tool", "pen": "pen-tool", "pismo": "pen-tool", "viet": "pen-tool", "✍️": "pen-tool", "✍": "pen-tool", "✏️": "pen-tool", "📝": "pen-tool",
    "mic-speaking": "mic-speaking", "speaking": "mic-speaking", "mic": "mic-speaking", "shadowing": "mic-speaking", "noi": "mic-speaking", "🎙️": "mic-speaking", "🎙": "mic-speaking", "🎤": "mic-speaking",
    "graduation-cap": "graduation-cap", "exam": "graduation-cap", "trki": "graduation-cap", "torfl": "graduation-cap", "mock-test": "graduation-cap", "thi": "graduation-cap", "🎓": "graduation-cap", "🏛️": "graduation-cap", "🏛": "graduation-cap",
    "book-open-blog": "book-open-blog", "blog": "book-open-blog", "book": "book-open-blog", "doc": "book-open-blog", "reading": "book-open-blog", "cam-nang": "book-open-blog", "📖": "book-open-blog", "📰": "book-open-blog", "📚": "book-open-blog",
    "shopping-bag-shop": "shopping-bag-shop", "shop": "shopping-bag-shop", "cart": "shopping-bag-shop", "bag": "shopping-bag-shop", "store": "shopping-bag-shop", "🛍️": "shopping-bag-shop", "🛍": "shopping-bag-shop", "🛒": "shopping-bag-shop",

    // Gamification
    "flame-streak": "flame-streak", "streak": "flame-streak", "flame": "flame-streak", "fire": "flame-streak", "lua": "flame-streak", "🔥": "flame-streak",
    "zap-xp": "zap-xp", "xp": "zap-xp", "zap": "zap-xp", "energy": "zap-xp", "diem": "zap-xp", "lightning": "zap-xp", "⚡": "zap-xp",
    "trophy-reward": "trophy-reward", "trophy": "trophy-reward", "cup": "trophy-reward", "rank": "trophy-reward", "leaderboard": "trophy-reward", "🏆": "trophy-reward", "📈": "trophy-reward",
    "cat-mascot": "cat-mascot", "mascot": "cat-mascot", "rusika": "cat-mascot", "cat": "cat-mascot", "meo": "cat-mascot", "🐱": "cat-mascot", "🐈": "cat-mascot", "🐾": "cat-mascot",
    "award-badge": "award-badge", "badge": "award-badge", "award": "award-badge", "medal": "award-badge", "huy-hieu": "award-badge", "🎖️": "award-badge", "🏅": "award-badge",
    "crown-vip": "crown-vip", "vip": "crown-vip", "pro": "crown-vip", "crown": "crown-vip", "👑": "crown-vip",

    // Exam & AI
    "timer-clock": "timer-clock", "timer": "timer-clock", "clock": "timer-clock", "time": "timer-clock", "dong-ho": "timer-clock", "⏱️": "timer-clock", "⏰": "timer-clock", "⏳": "timer-clock",
    "bot-rusika": "bot-rusika", "bot": "bot-rusika", "ai": "bot-rusika", "robot": "bot-rusika", "🤖": "bot-rusika",
    "keyboard-cyrillic": "keyboard-cyrillic", "keyboard": "keyboard-cyrillic", "ban-phim": "keyboard-cyrillic", "⌨️": "keyboard-cyrillic", "⌨": "keyboard-cyrillic",
    "waveform-audio": "waveform-audio", "waveform": "waveform-audio", "soundwave": "waveform-audio",
    "flashcards-layers": "flashcards-layers", "flashcards": "flashcards-layers", "flashcard": "flashcards-layers", "layers": "flashcards-layers",
    "sparkles-clean": "sparkles-clean", "sparkles": "sparkles-clean", "magic": "sparkles-clean", "clean": "sparkles-clean", "✨": "sparkles-clean",
    "shield-anti-cheat": "shield-anti-cheat", "shield": "shield-anti-cheat", "anti-cheat": "shield-anti-cheat", "security": "shield-anti-cheat", "bao-mat": "shield-anti-cheat", "🛡️": "shield-anti-cheat",
    "check-circle-correct": "check-circle-correct", "check-circle": "check-circle-correct", "correct": "check-circle-correct", "dung": "check-circle-correct", "dat": "check-circle-correct", "✅": "check-circle-correct",

    // Commerce
    "qr-code-vietqr": "qr-code-vietqr", "qr": "qr-code-vietqr", "vietqr": "qr-code-vietqr", "qrcode": "qr-code-vietqr",
    "credit-card": "credit-card", "card": "credit-card", "the": "credit-card", "bank": "credit-card", "atm": "credit-card", "💳": "credit-card",
    "copy-clipboard": "copy-clipboard", "copy": "copy-clipboard", "clipboard": "copy-clipboard", "sao-chep": "copy-clipboard", "📋": "copy-clipboard",
    "package-order": "package-order", "package": "package-order", "order": "package-order", "don-hang": "package-order", "box": "package-order", "📦": "package-order",
    "truck-shipping": "truck-shipping", "truck": "truck-shipping", "shipping": "truck-shipping", "ship": "truck-shipping", "van-chuyen": "truck-shipping", "🚚": "truck-shipping",

    // Admin & Controls
    "layout-dashboard": "layout-dashboard", "dashboard": "layout-dashboard", "overview": "layout-dashboard", "tong-quan": "layout-dashboard", "📊": "layout-dashboard",
    "users-students": "users-students", "users": "users-students", "students": "users-students", "hoc-vien": "users-students", "crm": "users-students", "account": "users-students", "👥": "users-students", "👤": "users-students",
    "database-tests": "database-tests", "database": "database-tests", "db": "database-tests", "ngan-hang-de": "database-tests", "🗄️": "database-tests",
    "history-audit": "history-audit", "audit": "history-audit", "logs": "history-audit", "history": "history-audit", "kiem-toan": "history-audit", "📜": "history-audit",
    "settings-gear": "settings-gear", "settings": "settings-gear", "gear": "settings-gear", "cai-dat": "settings-gear", "config": "settings-gear", "⚙️": "settings-gear", "⚙": "settings-gear", "🛠️": "settings-gear", "🔧": "settings-gear",
    "lock-pro": "lock-pro", "lock": "lock-pro", "khoa": "lock-pro", "paywall": "lock-pro", "🔒": "lock-pro",
    "play-control": "play-control", "play": "play-control", "phat": "play-control", "▶️": "play-control", "▶": "play-control",
    "pause-control": "pause-control", "pause": "pause-control", "dung": "pause-control", "⏸️": "pause-control", "⏸": "pause-control",
    "volume-high": "volume-high", "volume": "volume-high", "sound": "volume-high", "am-luong": "volume-high", "loa": "volume-high", "speak": "volume-high", "🔊": "volume-high", "🔈": "volume-high",
    "arrow-right": "arrow-right", "arrow": "arrow-right", "next": "arrow-right", "tiep": "arrow-right", "→": "arrow-right",
    "arrow-left": "arrow-left", "back": "arrow-left", "quay-lai": "arrow-left", "←": "arrow-left",
    "chevron-down": "chevron-down", "chevron": "chevron-down", "down": "chevron-down", "caret": "chevron-down", "▾": "chevron-down", "▼": "chevron-down",
    "log-out": "log-out", "logout": "log-out", "signout": "log-out", "exit": "log-out", "dang-xuat": "log-out", "🚪": "log-out",
    "search-icon": "search-icon", "search": "search-icon", "tim-kiem": "search-icon", "tra-cuu": "search-icon", "🔍": "search-icon", "🔎": "search-icon",

    // Utilities
    "star": "star", "sao": "star", "starred": "star", "⭐": "star", "★": "star",
    "trash-2": "trash-2", "trash": "trash-2", "delete": "trash-2", "del": "trash-2", "xoa": "trash-2", "🗑️": "trash-2", "🗑": "trash-2",
    "check": "check", "tick": "check", "done": "check", "✓": "check", "✔": "check",
    "x": "x", "close": "x", "clear": "x", "dong": "x", "✕": "x", "✖": "x",
    "plus": "plus", "add": "plus", "them": "plus", "+": "plus", "➕": "plus",
    "edit-3": "edit-3", "edit": "edit-3", "sua": "edit-3",
    "refresh-cw": "refresh-cw", "refresh": "refresh-cw", "sync": "refresh-cw", "reload": "refresh-cw", "dong-bo": "refresh-cw", "🔄": "refresh-cw", "🔁": "refresh-cw",
    "file-text": "file-text", "file": "file-text", "doc": "file-text", "document": "file-text", "tai-lieu": "file-text", "📄": "file-text",
    "external-link": "external-link", "external": "external-link", "↗": "external-link",
    "info": "info", "information": "info", "thong-tin": "info", "ℹ️": "info", "💡": "sparkles-clean",
    "help-circle": "help-circle", "help": "help-circle", "tro-giup": "help-circle", "❓": "help-circle",
    "filter": "filter", "loc": "filter",
    "eye": "eye", "preview": "eye", "xem": "eye", "👁️": "eye", "👁": "eye",
    "calendar": "calendar", "lich": "calendar", "📅": "calendar",
    "radio": "radio", "phat-thanh": "radio", "📻": "radio", "📡": "waveform-audio", "🛂": "shield-anti-cheat",
    "brain": "brain", "🧠": "brain",
    "trending-up": "trending-up", "progress": "trending-up",
    "target": "target", "🎯": "target",
    "save": "save", "💾": "save",
    "moon": "moon", "🌙": "moon",
    "sun": "sun", "☀️": "sun", "☀": "sun",
    "cloud-upload": "cloud-upload", "upload": "cloud-upload", "cloud-up": "cloud-upload", "☁️": "cloud-upload",
    "cloud-download": "cloud-download", "download": "cloud-download", "cloud-down": "cloud-download", "📥": "cloud-download",
    "frown": "frown", "😣": "frown", "kho": "frown",
    "smile": "smile", "🙂": "smile", "tot": "smile", "de": "star", "😎": "star",
    "folder": "folder", "thu-muc": "folder", "📂": "folder", "📁": "folder",
    "inbox": "inbox", "hop-thu": "inbox", "📭": "inbox", "📫": "inbox", "📪": "inbox",
    "bar-chart-2": "bar-chart-2", "chart": "bar-chart-2", "barchart": "bar-chart-2",
    "shuffle": "shuffle", "xao-tron": "shuffle", "🔀": "shuffle",
    "maximize-2": "maximize-2", "maximize": "maximize-2", "full": "maximize-2", "fullscreen": "maximize-2", "⛶": "maximize-2",
    "minimize-2": "minimize-2", "minimize": "minimize-2",
    "circle-dot": "circle-dot", "trac-nghiem": "circle-dot", "🔘": "circle-dot",
    "🎉": "trophy-reward", "🆕": "sparkles-clean", "🟢": "check-circle-correct", "👍": "check", "❌": "x", "💎": "crown-vip"
  };

  /* ==========================================================================
   * 3. HELPER API & ENGINE (RusiIcons)
   * ========================================================================== */
  var RusiIcons = {
    icons: RUSI_ICONS,
    aliases: ALIAS_MAP,

    /**
     * Chuẩn hoá tên icon từ alias, emoji hoặc id trực tiếp
     */
    resolveId: function (name) {
      if (!name) return "sparkles-clean";
      var clean = String(name).trim().toLowerCase();
      if (ALIAS_MAP[clean]) return ALIAS_MAP[clean];
      if (RUSI_ICONS[clean]) return clean;
      var noDash = clean.replace(/[\s_-]+/g, '');
      for (var k in ALIAS_MAP) {
        if (k.replace(/[\s_-]+/g, '') === noDash) return ALIAS_MAP[k];
      }
      return "sparkles-clean";
    },

    /**
     * Sinh chuỗi SVG hoàn chỉnh
     */
    get: function (name, opts) {
      opts = opts || {};
      var id = this.resolveId(name);
      var def = RUSI_ICONS[id] || RUSI_ICONS["sparkles-clean"];
      var size = opts.size || 24;
      var stroke = opts.strokeWidth !== undefined ? opts.strokeWidth : 2;
      var color = opts.color || "currentColor";
      var cls = "rusi-icon rusi-icon-" + id + (opts.className ? " " + opts.className : "");
      var aria = opts.ariaHidden === false ? '' : ' aria-hidden="true"';
      var styleAttr = opts.style ? ' style="' + opts.style + '"' : '';

      return '<svg class="' + cls + '"' +
        ' width="' + size + '"' +
        ' height="' + size + '"' +
        ' viewBox="0 0 24 24"' +
        ' fill="none"' +
        ' stroke="' + color + '"' +
        ' stroke-width="' + stroke + '"' +
        ' stroke-linecap="round"' +
        ' stroke-linejoin="round"' +
        ' data-icon="' + id + '"' +
        aria +
        styleAttr +
        '>' +
        def.paths +
        '</svg>';
    },

    /**
     * Tạo phần tử DOM SVG thực thụ
     */
    render: function (name, opts) {
      var html = this.get(name, opts);
      var t = document.createElement("template");
      t.innerHTML = html.trim();
      return t.content.firstElementChild;
    },

    /**
     * Quét và thay thế toàn bộ thẻ đánh dấu trên trang:
     * - <span data-rusi-icon="name"></span>
     * - <i data-rusi-icon="name"></i>
     * - <rusi-icon name="name"></rusi-icon>
     * - <i data-lucide="name"></i> (tương thích Lucide API)
     */
    replace: function (root) {
      var scope = root || document;
      if (!scope || !scope.querySelectorAll) return;

      var targets = scope.querySelectorAll('[data-rusi-icon], rusi-icon, [data-lucide]');
      for (var i = 0; i < targets.length; i++) {
        var el = targets[i];
        var name = el.getAttribute('data-rusi-icon') || 
                   el.getAttribute('data-lucide') || 
                   el.getAttribute('name');
        if (!name) continue;

        var size = parseInt(el.getAttribute('data-size') || el.getAttribute('size'), 10) || 24;
        var stroke = parseFloat(el.getAttribute('data-stroke') || el.getAttribute('stroke')) || 2;
        var color = el.getAttribute('data-color') || el.getAttribute('color') || 'currentColor';
        var extraClass = el.getAttribute('class') || '';

        var svgHtml = this.get(name, {
          size: size,
          strokeWidth: stroke,
          color: color,
          className: extraClass
        });

        var t = document.createElement('template');
        t.innerHTML = svgHtml.trim();
        var svgEl = t.content.firstElementChild;

        if (svgEl) {
          el.parentNode.replaceChild(svgEl, el);
        }
      }
    },

    /**
     * Tự động quan sát DOM để thay thế các icon được nạp động
     */
    observe: function () {
      if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
      var self = this;
      var observer = new MutationObserver(function (mutations) {
        var needsReplace = false;
        for (var i = 0; i < mutations.length; i++) {
          var m = mutations[i];
          if (m.addedNodes && m.addedNodes.length > 0) {
            for (var j = 0; j < m.addedNodes.length; j++) {
              var node = m.addedNodes[j];
              if (node.nodeType === 1) { // ELEMENT_NODE
                if (node.hasAttribute && (node.hasAttribute('data-rusi-icon') || node.hasAttribute('data-lucide') || node.tagName === 'RUSI-ICON')) {
                  needsReplace = true;
                  break;
                }
                if (node.querySelector && node.querySelector('[data-rusi-icon], [data-lucide], rusi-icon')) {
                  needsReplace = true;
                  break;
                }
              }
            }
          }
          if (needsReplace) break;
        }
        if (needsReplace) {
          self.replace();
        }
      });
      observer.observe(document.body || document.documentElement, {
        childList: true,
        subtree: true
      });
    },

    /**
     * Đăng ký bổ sung icon động nếu cần
     */
    register: function (id, paths, aliases) {
      if (!id || !paths) return;
      RUSI_ICONS[id] = {
        name: id,
        category: "custom",
        paths: paths
      };
      if (aliases && Array.isArray(aliases)) {
        for (var i = 0; i < aliases.length; i++) {
          ALIAS_MAP[aliases[i]] = id;
        }
      }
    }
  };

  // Tự động kích hoạt khi DOM sẵn sàng và kích hoạt Observer
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        RusiIcons.replace();
        RusiIcons.observe();
      });
    } else {
      RusiIcons.replace();
      RusiIcons.observe();
    }
  }

  return {
    RUSI_ICONS: RUSI_ICONS,
    RusiIcons: RusiIcons
  };
});
