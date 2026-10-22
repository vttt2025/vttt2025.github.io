import type { CollectionConfig } from 'payload';

export const VocabJars: CollectionConfig = {
  slug: 'vocab-jars',
  labels: {
    singular: 'Lọ từ vựng',
    plural: 'Kho lọ từ vựng SRS',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['icon', 'name', 'level', 'wordCount', 'is_pro_only', 'updatedAt'],
    group: 'Học Tập & Khảo Thí',
    description: 'Quản lý các lọ từ vựng theo chủ đề sinh hoạt và giao tiếp sống còn tại Nga, tích hợp thuật toán lặp lại ngắt quãng SM-2.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'Mã lọ (ID)',
      required: true,
      admin: { description: 'Ví dụ: jar_auchan, jar_chemodan, jar_airport' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon Emoji',
          defaultValue: '🏺',
          admin: { width: '20%' },
        },
        {
          name: 'name',
          type: 'text',
          label: 'Tên lọ từ vựng',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'level',
          type: 'select',
          label: 'Trình độ',
          options: [
            { label: 'A1 (Sơ cấp)', value: 'A1' },
            { label: 'A2 (Cơ bản)', value: 'A2' },
            { label: 'B1 (Trung cấp 1)', value: 'B1' },
            { label: 'B2 (Trung cấp 2)', value: 'B2' },
          ],
          defaultValue: 'A1',
          admin: { width: '30%' },
        },
      ],
    },
    {
      name: 'desc',
      type: 'textarea',
      label: 'Mô tả ngữ cảnh sử dụng & mục tiêu',
    },
    {
      name: 'is_pro_only',
      type: 'checkbox',
      label: 'Khóa VIP (Dành riêng cho gói PRO)',
      defaultValue: false,
    },
    {
      name: 'words',
      type: 'array',
      label: 'Danh sách từ vựng trong lọ',
      labels: {
        singular: 'Từ vựng',
        plural: 'Các từ vựng',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'ru',
              type: 'text',
              label: 'Từ tiếng Nga (kèm trọng âm)',
              required: true,
              admin: { width: '40%' },
            },
            {
              name: 'vi',
              type: 'text',
              label: 'Nghĩa tiếng Việt',
              required: true,
              admin: { width: '40%' },
            },
            {
              name: 'note',
              type: 'text',
              label: 'Ghi chú (giống từ, quản cách)',
              admin: { width: '20%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'example_ru', type: 'text', label: 'Câu ví dụ tiếng Nga', admin: { width: '50%' } },
            { name: 'example_vi', type: 'text', label: 'Dịch câu ví dụ tiếng Việt', admin: { width: '50%' } },
          ],
        },
      ],
    },
  ],
};
