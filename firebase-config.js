/**
 * Cấu hình Firebase cho dự án Đậu TRKI.
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
  apiKey: "AIzaSyCbjQcPKcH2j41ZuHqY-X7cYyhl0b-PJIQ",
  authDomain: "dau-trki.firebaseapp.com",
  projectId: "dau-trki",
  storageBucket: "dau-trki.firebasestorage.app",
  messagingSenderId: "854191764938",
  appId: "1:854191764938:web:3bfa382f40b45aab950b33"
};

/**
 * Cờ bật/tắt toàn bộ tính năng đăng nhập.
 * Nếu chưa cấu hình Firebase (config vẫn là "REPLACE_ME_*"), hệ thống sẽ
 * tự động chuyển sang chế độ "khách" và hiển thị thông báo hướng dẫn.
 */
window.FIREBASE_ENABLED = !String(window.FIREBASE_CONFIG.apiKey || "").startsWith("REPLACE_ME");
