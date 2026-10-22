import type { CollectionConfig } from 'payload';

export const ShopProducts: CollectionConfig = {
  slug: 'shop-products',
  labels: {
    singular: 'Sản phẩm',
    plural: 'Shop hàng Nga & Du học',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'badge', 'updatedAt'],
    group: 'Kinh Doanh & Dịch Vụ',
    description: 'Quản lý sản phẩm bánh kẹo, mỹ phẩm Nga và các gói dịch vụ hỗ trợ du học.',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'id', type: 'text', label: 'Mã SKU / ID sản phẩm', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          type: 'select',
          label: 'Ngành hàng',
          required: true,
          options: [
            { label: '🍬 Bánh kẹo & Thực phẩm Nga', value: 'banh_keo' },
            { label: '🌿 Mỹ phẩm Siberia & Chăm sóc da', value: 'my_pham' },
            { label: '🪆 Quà lưu niệm & Búp bê Matryoshka', value: 'luu_niem' },
            { label: '🎓 Dịch vụ & Hồ sơ Du học Nga', value: 'dich_vu_du_hoc' },
          ],
          defaultValue: 'banh_keo',
          admin: { width: '50%' },
        },
        { name: 'categoryName', type: 'text', label: 'Tên ngành hàng hiển thị', admin: { width: '50%' } },
      ],
    },
    { name: 'title', type: 'text', label: 'Tên sản phẩm / dịch vụ', required: true },
    { name: 'desc', type: 'textarea', label: 'Mô tả chi tiết' },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'number', label: 'Giá bán (VNĐ)', required: true, admin: { width: '33.3%' } },
        { name: 'priceOld', type: 'number', label: 'Giá niêm yết cũ (VNĐ)', admin: { width: '33.3%' } },
        { name: 'badge', type: 'text', label: 'Huy hiệu (Bán chạy, Mới, Hot)', admin: { width: '33.3%' } },
      ],
    },
    { name: 'image', type: 'text', label: 'Đường dẫn ảnh sản phẩm' },
  ],
};
