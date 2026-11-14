# Security Audit Guidelines (Cloudflare Security Audit Standard)

Khi xây dựng, mở rộng, kiểm tra hoặc sửa đổi bất kỳ thành phần web, API, script hay tính năng nào trong dự án, trợ lý AI **BẮT BUỘC** áp dụng tiêu chuẩn bảo mật theo bộ kỹ năng [security-audit](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/SKILL.md) từ Cloudflare:

## 1. Nguyên Tắc Cốt Lõi (Core Principles)
1. **Xác thực tại ranh giới tin cậy (Trust Boundary Enforcement):**
   - Mọi dữ liệu nhận từ người dùng, URL query/hash, biểu mẫu, `localStorage`, `sessionStorage`, hoặc tin nhắn `postMessage` đều là **không tin cậy (untrusted)**.
   - Bắt buộc qua hàm lọc/escape (ví dụ: `esc()`, chuẩn hóa kiểu dữ liệu) trước khi render trực tiếp vào DOM để triệt tiêu lỗ hổng Cross-Site Scripting (XSS / DOM-XSS).
2. **Bảo mật phiên đăng nhập & Phân quyền (Authentication & Authorization):**
   - Không dựa hoàn toàn vào kiểm tra ở client-side để ra quyết định bảo mật nhạy cảm. Mọi tài nguyên người dùng (tiến độ học tập, điểm số, từ vựng lưu trữ cá nhân) phải được bảo vệ bởi Row Level Security (RLS) trên Supabase hoặc kiểm tra quyền hợp lệ.
   - Không cho phép người dùng chưa đăng nhập ghi đè hoặc can thiệp vào các bảng dữ liệu cá nhân của người khác (ngăn chặn IDOR / BOLA).
3. **Cô lập dữ liệu nhạy cảm (Data Isolation & Secret Protection):**
   - Tuyệt đối không hardcode Supabase Service Role Key, JWT secret, hoặc mật khẩu quản trị vào client code hay file tĩnh công khai. Chỉ sử dụng Anon / Public Key được cấp phép cho ứng dụng web công khai.
4. **Sửa lỗi bảo mật tối thiểu, chính xác (Smallest Effective Fix):**
   - Khi phát hiện rủi ro an ninh, luôn ưu tiên giải pháp sửa lỗi gọn gàng, cục bộ và có tính kiểm chứng cao, không tạo ra các lớp abstraction phức tạp hoặc làm thay đổi logic người dùng.

## 2. Tài Liệu Tra Cứu Chuyên Sâu Của Skill
- Tổng quan & Quy trình kiểm toán: [SKILL.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/SKILL.md)
- Bảo mật Web Protocol & Xác thực Auth: [WEB-PROTOCOL-AND-AUTH.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/WEB-PROTOCOL-AND-AUTH.md)
- Bảo mật Client-side & Trình duyệt: [CLIENT-SIDE.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/CLIENT-SIDE.md)
- Cô lập dữ liệu & Vòng đời thông tin: [DATA-ISOLATION-AND-LIFECYCLE.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/DATA-ISOLATION-AND-LIFECYCLE.md)
- Các lớp tấn công & kiểm tra: [ATTACK-CLASSES.md](file:///E:/OneDrive%20-%20Hoc%20vien%20Ky%20thuat%20mat%20ma/Projects/rusitrki/.agents/skills/security-audit/ATTACK-CLASSES.md)
