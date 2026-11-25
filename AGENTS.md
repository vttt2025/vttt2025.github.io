# RUSI TRKI — Hướng dẫn cho AI agent

> Nguồn duy nhất cho mọi công cụ (Claude Code, Gemini/Antigravity, Codex, Cursor...). `CLAUDE.md` và `GEMINI.md` chỉ import file này — sửa hướng dẫn tại đây.

Nền tảng luyện thi chứng chỉ tiếng Nga ТРКИ. Web tĩnh (HTML + JS thuần, không build/bundler), deploy GitHub Pages (`rusitrki.com`), backend Supabase (Auth, Postgres + RLS, RPC, Edge Function `supabase/functions/ai-review`).
Đặc tả chi tiết (schema bảng, RLS, luồng nghiệp vụ): `PROJECT_SPEC.md` — đọc phần liên quan trước khi sửa logic dữ liệu.

## Lệnh

- Chạy local: `python server.py [port]` (mặc định 8000, có SPA fallback + no-cache).
- Kiểm tra trước khi xong việc: `npm test` (cú pháp JS, JSON, đường dẫn HTML, Zero-Answer Leak, secret) và `node scripts/test_runtime_logic.js`.
- Sửa `styles.css` → chạy `node scripts/build_min_css.js` (HTML nạp `styles.min.css?v=...`; tăng `v` khi cần phá cache).

## Bản đồ code

- `app.js`, `pages.js`, `js/pages/page-*.js`: giao diện học viên (mỗi trang một file trong `js/pages/`).
- `admin.js` + `admin.html`: CMS quản trị; `SupabaseSyncEngine.MAPPINGS` định nghĩa `toRow`/`fromRow` cho từng bảng.
- `auth.js`: đăng nhập, Device Guard (giới hạn thiết bị tài khoản PRO).
- `supabase-client.js`: mọi truy vấn Supabase. `data.js`: dữ liệu nhẹ + `RusiDataLoader`. `data/modules/*.json`: dữ liệu lớn.
- Escape HTML bằng `esc()` (`app.js`) trước khi chèn chuỗi vào `innerHTML`.

## Quy tắc bất khả xâm phạm

1. **Không tự ý sửa nội dung trên web** (tiêu đề, câu chữ, mô tả, bài viết, từ vựng, đề thi) trừ khi người dùng yêu cầu đích danh. Sửa CSS/JS/responsive thì giữ nguyên 100% chữ và dữ liệu.
2. **Phân quyền chỉ dựa vào role phía server** (`profiles.role`: `student`, `teacher`, `admin`, `super_admin`) và RLS. Không bao giờ cấp quyền theo email, domain email hay cờ trong `localStorage`. Kiểm tra ở client chỉ để ẩn/hiện UI.
3. **Zero-Answer Leak:** không đưa đáp án đúng (`correct_option`, `answer_key`...) xuống client; chấm thi qua RPC `rusi_grade_trki_exam`.
4. **Không secret trong code:** chỉ dùng Supabase anon key; không service role key, token, mật khẩu.

## Dữ liệu & 0-Egress (quota Supabase 5GB/tháng)

- Dữ liệu lớn nằm trong `data/modules/*.json`, nạp theo trang qua `RusiDataLoader.prepareForCurrentPage()` / `load(key)` (RAM → IndexedDB `rusi_offline_db` → file tĩnh). Không nhồi lại vào `data.js`.
- Không thêm truy vấn quét cả bảng (`select("*")` không giới hạn) chạy lúc tải trang hay warmup. Supabase dùng cho Auth, tiến độ người dùng, đơn hàng, RPC chấm thi.
- Nội dung PRO khóa bằng `Monetization.isPro()` **và** RLS.
- Migration SQL nằm trong `supabase/migrations/` (hiện có Device Guard: bảng `user_device_sessions` + RPC `rusi_*device*`). Phần lớn schema/RPC khác (`current_user_is_admin`, `rusi_grade_trki_exam`...) chưa có file SQL. Khi thêm hoặc đổi RPC/cột, ghi migration mới, idempotent; không đoán kiểu cột — tra `PROJECT_SPEC.md`.

## Cách làm việc

- **Thay đổi nhỏ nhất mà đầy đủ:** tái sử dụng helper sẵn có; không thêm abstraction, tùy chọn, thư viện mới nếu không được yêu cầu. Sửa lỗi thì tìm mọi nơi gọi hàm và sửa ở gốc.
- **Sửa đúng chỗ:** không format lại, không refactor, không xóa comment hay dead code ngoài phạm vi yêu cầu.
- **Mơ hồ thì hỏi**, hoặc nêu rõ giả định trước khi làm.
- Code đã có file rất lớn (`admin.js` >10k dòng): không cố tách nhỏ khi không được yêu cầu, nhưng code mới đáng kể thì đặt trong file/module riêng.
- Không thêm `catch` rỗng mới cho lỗi có thể gây mất dữ liệu hoặc sai trạng thái; báo lỗi rõ ràng (toast/console).
- Phím tắt trong trang phải bỏ qua khi có `Ctrl`/`Cmd`/`Alt` và khi focus đang ở ô nhập liệu.

## Responsive (mọi thay đổi UI)

- Mobile ≤768px: lưới về 1 cột, không cuộn ngang, padding 12–16px, vùng chạm ≥44px, input font ≥16px. Tablet 768–1024px: 2 cột, sidebar thu thành drawer/tabs.
- Không để tab/nút/nhãn bị cắt dở ở mép: gom vào "Thêm ▾" / menu `···`; tối đa 1 nút chính + 1 nút phụ; nhãn hiển thị tối đa 3–4 rồi `+N`; đoạn dài dùng `line-clamp` + "Xem thêm".
- Chi tiết: [responsive-design](.agents/skills/responsive-design/SKILL.md), [checklist](.agents/skills/responsive-design/references/mobile-tablet-checklist.md), [mẫu code](.agents/skills/responsive-design/references/overflow-patterns.md).

## Skill & rule chi tiết (đọc khi việc liên quan)

| Khi nào | Tài liệu |
|---|---|
| Viết/sửa code (tối giản, sửa đúng chỗ) | [karpathy](.agents/skills/andrej-karpathy-skills/SKILL.md), [ponytail](.agents/skills/ponytail/SKILL.md), [rules/ponytail](.agents/rules/ponytail.md) |
| Quy trình Plan → Implement → Review → Verify | [ecc](.agents/skills/ecc/SKILL.md), [rules/ecc](.agents/rules/ecc.md) |
| Bảo mật, kiểm toán | [security-audit](.agents/skills/security-audit/SKILL.md), [rules/security-audit](.agents/rules/security-audit.md) |
| Thiết kế/làm đẹp UI | [impeccable](.agents/skills/impeccable/SKILL.md); landing page/marketing: [taste-skill](.agents/skills/taste-skill/SKILL.md) |

Nếu skill mâu thuẫn với file này, file này thắng (đặc biệt: quy tắc giữ nguyên nội dung và sửa đúng chỗ).

## Trước khi báo xong

Chạy `npm test`, xem `git diff` tìm thay đổi ngoài ý muốn, với UI thì kiểm tra ở 3 viewport (mobile/tablet/desktop). Báo rõ phần nào chưa kiểm chứng được.
