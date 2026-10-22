/**
 * Cấu hình Firebase cho dự án Rusi TRKI.
 *
 * HƯỚNG DẪN LẤY CONFIG (chỉ làm 1 lần, khoảng 5 phút):
 *   1. Truy cập https://console.firebase.google.com/ và tạo project mới.
 *   2. Vào Build > Authentication > Get started, bật provider "Google".
 *   3. Vào Project settings (biểu tượng bánh răng) > General > "Your apps",
 *      bấm nút </> để thêm Web app. Đặt tên tuỳ ý, KHÔNG cần bật Firebase Hosting.
 *   4. Sao chép đoạn "firebaseConfig" mà Firebase hiển thị và dán vào biến
 *      bên dưới (thay các giá trị "REPLACE_ME").
 *   5. Vào Authentication > Settings > Authorized domains, thêm
 *      "localhost" (nếu chạy thử cục bộ) và domain thật khi deploy.
 *
 * Lưu ý: apiKey ở đây là khoá CÔNG KHAI (chỉ định danh dự án), KHÔNG phải
 * bí mật. Tuy nhiên bạn vẫn nên hạn chế chia sẻ nếu dùng gói Blaze.
 */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyAbpH1U_z_qqx2nGx-BM0dKpWOsBhW7SgE",
  authDomain: "rusitrki.firebaseapp.com",
  projectId: "rusitrki",
  storageBucket: "rusitrki.firebasestorage.app",
  messagingSenderId: "893392774690",
  appId: "1:893392774690:web:67653b3b3734fe01accc7b"
};

/**
 * Cờ bật/tắt toàn bộ tính năng đăng nhập.
 * Nếu chưa cấu hình Firebase (config vẫn là "REPLACE_ME_*"), hệ thống sẽ
 * tự động chuyển sang chế độ "khách" và hiển thị thông báo hướng dẫn.
 */
window.FIREBASE_ENABLED = !String(window.FIREBASE_CONFIG.apiKey || "").startsWith("REPLACE_ME");

/**
 * DANH SÁCH EMAIL ĐƯỢC PHÉP VÀO TRANG QUẢN TRỊ (/admin.html).
 *
 * Chỉ những tài khoản Google có email nằm trong danh sách này mới có thể
 * thêm/sửa/xoá dữ liệu. User đăng nhập Gmail khác vẫn thấy các trang học
 * bình thường, nhưng vào /admin.html sẽ bị từ chối.
 *
 * So sánh theo lowercase, KHÔNG phân biệt hoa/thường.
 * Để trống [] = chặn tất cả (khoá admin tạm thời).
 *
 * Cách thêm admin:
 *   1. Đăng nhập bằng tài khoản Google bạn muốn cấp quyền.
 *   2. Mở Firebase Console > Authentication > Users — copy email.
 *   3. Thay "your-email@example.com" bằng email thật, push lên GitHub.
 *   4. User đó đăng nhập lại là vào được admin.
 */
window.ADMIN_EMAILS = [
  "tuadenzettt@gmail.com"
  // "another-admin@example.com",
];
