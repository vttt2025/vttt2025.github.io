/**
 * supabase-config.js — Cấu hình kết nối Supabase Database cho RUSI TRKI.
 *
 * Project URL : https://nrhtdwjihnlaxrbitmcf.supabase.co
 * Project Ref : nrhtdwjihnlaxrbitmcf
 *
 * HƯỚNG DẪN LẤY ANON KEY (Khoá công khai):
 *   1. Mở trang cài đặt API của Supabase:
 *      https://supabase.com/dashboard/project/nrhtdwjihnlaxrbitmcf/settings/api
 *   2. Tại mục "Project API keys", sao chép khoá "anon" / "public" (thường bắt đầu bằng eyJhbGciOi... hoặc sb_publishable_...).
 *   3. Dán vào biến anonKey bên dưới, hoặc dán trực tiếp trong giao diện Admin > "Kết nối Supabase".
 */

(function () {
  "use strict";

  // Tự động nhận diện anonKey nếu đã lưu từ bảng điều khiển Admin
  var storedAnon = "";
  try {
    storedAnon = localStorage.getItem("rusi_supabase_anon_key") || "";
  } catch (_) {}

  window.SUPABASE_CONFIG = {
    url: "https://nrhtdwjihnlaxrbitmcf.supabase.co",
    // Dán anon key vào đây hoặc lưu qua giao diện Admin
    anonKey: storedAnon || "YOUR_SUPABASE_ANON_KEY"
  };

  /** Kiểm tra xem đã cấu hình khoá Anon Key hợp lệ chưa */
  window.isSupabaseConfigured = function () {
    var c = window.SUPABASE_CONFIG;
    return Boolean(
      c &&
      c.url &&
      c.anonKey &&
      c.anonKey !== "YOUR_SUPABASE_ANON_KEY" &&
      c.anonKey.trim().length > 20
    );
  };
})();
