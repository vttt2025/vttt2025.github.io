import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Cấu hình hệ thống RUSI TRKI',
  admin: {
    group: 'Hệ Thống & Quản Trị',
    description: 'Cấu hình thương hiệu, thông tin thanh toán VietQR và các tham số vận hành toàn website.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'site_title', type: 'text', label: 'Tên Website', defaultValue: 'RUSI TRKI — Nền tảng Ôn thi & Du học Nga', admin: { width: '50%' } },
        { name: 'slogan', type: 'text', label: 'Khẩu hiệu Slogan', defaultValue: 'Chinh phục tiếng Nga từ số 0 đến B2', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'contact_zalo', type: 'text', label: 'Hotline / Zalo hỗ trợ', defaultValue: '0988.xxx.xxx', admin: { width: '50%' } },
        { name: 'contact_telegram', type: 'text', label: 'Kênh Telegram', defaultValue: '@rusitrki', admin: { width: '50%' } },
      ],
    },
    {
      name: 'bank_vietqr',
      type: 'group',
      label: 'Thông tin nhận chuyển khoản VietQR',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'bank_code', type: 'text', label: 'Mã ngân hàng (ví dụ: MB, VCB)', defaultValue: 'MB', admin: { width: '33.3%' } },
            { name: 'account_number', type: 'text', label: 'Số tài khoản', defaultValue: '0988888888', admin: { width: '33.3%' } },
            { name: 'account_holder', type: 'text', label: 'Tên chủ tài khoản', defaultValue: 'RUSI TRKI VIETNAM', admin: { width: '33.3%' } },
          ],
        },
      ],
    },
    {
      name: 'supabase_integration',
      type: 'group',
      label: 'Cấu hình đồng bộ Supabase Cloud',
      fields: [
        { name: 'project_url', type: 'text', label: 'Supabase URL', defaultValue: 'https://nrhtdwjihnlaxrbitmcf.supabase.co' },
        { name: 'sync_enabled', type: 'checkbox', label: 'Bật tự động đồng bộ thời gian thực', defaultValue: true },
      ],
    },
  ],
};
