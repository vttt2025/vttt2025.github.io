import type { CollectionConfig } from 'payload';

export const Packages: CollectionConfig = {
  slug: 'packages',
  labels: {
    singular: 'Gói cước',
    plural: 'Bảng giá & Gói cước PRO',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'badge', 'price', 'popular'],
    group: 'Kinh Doanh & Dịch Vụ',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'id', type: 'text', label: 'Mã gói (pro_6m, pro_1y, pro_vip)', required: true },
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', label: 'Tên gói cước', required: true, admin: { width: '50%' } },
        { name: 'badge', type: 'text', label: 'Huy hiệu thời hạn', admin: { width: '50%' } },
      ],
    },
    { name: 'desc', type: 'textarea', label: 'Mô tả mục tiêu phù hợp' },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', label: 'Giá ưu đãi (VNĐ)', required: true, admin: { width: '33.3%' } },
        { name: 'priceOld', type: 'number', label: 'Giá gốc (VNĐ)', admin: { width: '33.3%' } },
        { name: 'popular', type: 'checkbox', label: 'Đánh dấu gói Nổi bật nhất', admin: { width: '33.3%' } },
      ],
    },
    {
      name: 'features',
      type: 'json',
      label: 'Danh sách tính năng quyền lợi (JSON Array)',
    },
  ],
};
