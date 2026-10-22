# RUSI TRKI — Payload CMS Headless Content Engine (Open Source)

Hệ thống quản trị nội dung Headless CMS mã nguồn mở xây dựng trên **Payload CMS v3** và **Next.js 15**, kết nối trực tiếp với Cơ sở dữ liệu PostgreSQL của **Supabase** (`nrhtdwjihnlaxrbitmcf`).

---

## 🚀 Cấu trúc hệ thống Collections & Globals

Hệ thống quản trị định nghĩa đầy đủ 10 Collections và 1 Global theo chuẩn của [PayloadCMS.com](https://payloadcms.com):

1. **`TrkiTests`**: Ngân hàng đề thi chuẩn TRKI A1, A2, B1, B2 (3 Part: Từ vựng & Ngữ pháp, Đọc hiểu, Nghe hiểu).
2. **`VocabJars`**: Kho lọ từ vựng theo chủ đề sinh hoạt và giao tiếp sống còn tại Nga, tích hợp thuật toán SM-2.
3. **`ListeningLessons`**: 4 Part bài luyện nghe CEFR và Shadowing Studio có phụ đề song ngữ.
4. **`SpeakingSets`**: Kho mẫu câu luyện nói phản xạ có AI chấm âm vị.
5. **`WritingTasks`**: Đề bài luyện viết Письмо theo chuẩn TRKI kèm từ khóa và bài mẫu.
6. **`VocabLessons`**: Series video hoạt hình «Хочу в Россию».
7. **`ShopProducts`**: Sản phẩm shop bánh kẹo, mỹ phẩm Nga và dịch vụ du học.
8. **`Packages`**: Bảng giá và quyền lợi các gói hội viên PRO.
9. **`BlogPosts`**: Cẩm nang du học, ký túc xá, thủ tục visa và học bổng Nga.
10. **`Users`**: Tài khoản học viên, quản trị viên, chuỗi streak và điểm XP.
11. **`SiteSettings` (Global)**: Cấu hình thông tin thương hiệu, tài khoản VietQR và cổng kết nối Supabase.

---

## 🛠️ Hướng dẫn cài đặt & Khởi chạy

### Cách 1: Khởi chạy nhanh bằng Docker Compose

```bash
cd cms
docker-compose up -d
```
Truy cập giao diện quản trị tại: `http://localhost:3000/admin`.

---

### Cách 2: Chạy trực tiếp qua Node.js (Yêu cầu Node >= 18.20.2 hoặc Node 20+)

1. Cài đặt các gói thư viện:
```bash
cd cms
npm install
```

2. Tạo tệp `.env` từ `.env.example`:
```bash
cp .env.example .env
```
Điền chuỗi kết nối PostgreSQL Supabase vào `DATABASE_URI`.

3. Khởi động môi trường phát triển:
```bash
npm run dev
```

4. Tạo TypeScript types tự động từ schema:
```bash
npm run generate:types
```

---

## ⚡ Tích hợp song song với Payload Web Studio (`admin.html`)

Dự án cung cấp 2 giải pháp quản trị đồng thời:
1. **Payload Web Studio (`admin.html`)**: Chạy trực tiếp trên trình duyệt, không cần Node.js, đồng bộ dữ liệu tức thì về trang web qua cơ chế Reactive Storage và Supabase Client.
2. **Payload CMS Headless Engine (`/cms`)**: Bản mã nguồn mở chính thống chạy trên Node.js/Next.js cho phép mở rộng API REST/GraphQL, xác thực đa yếu tố và triển khai lên Docker/Vercel/Railway.
