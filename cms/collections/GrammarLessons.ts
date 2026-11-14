import type { CollectionConfig } from 'payload';

export const GrammarLessons: CollectionConfig = {
  slug: 'grammar-lessons',
  labels: {
    singular: 'Bài học ngữ pháp',
    plural: 'Khóa học & Bài giảng Ngữ pháp',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'topic', 'sort_order', 'is_published'],
    group: 'Học Tập & Khảo Thí',
    description: 'Quản lý 27+ bài giảng chuyên sâu ngữ pháp tiếng Nga theo chuẩn TRKI A1-B2.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'UUID bài học',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề bài học ngữ pháp',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'topic',
          type: 'text',
          label: 'Chủ đề ngữ pháp (Cách 1-6, Động từ chuyển động...)',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'level',
          type: 'select',
          label: 'Cấp độ',
          options: [
            { label: 'A1 (Sơ cấp)', value: 'A1' },
            { label: 'A2 (Cơ bản)', value: 'A2' },
            { label: 'B1 (Trung cấp 1)', value: 'B1' },
            { label: 'B2 (Trung cấp 2)', value: 'B2' },
          ],
          defaultValue: 'A1',
          admin: { width: '33.3%' },
        },
        {
          name: 'sort_order',
          type: 'number',
          label: 'Thứ tự bài học',
          defaultValue: 1,
          admin: { width: '33.3%' },
        },
        {
          name: 'is_published',
          type: 'checkbox',
          label: 'Xuất bản công khai',
          defaultValue: true,
          admin: { width: '33.3%' },
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Tóm tắt quy tắc & nội dung ngắn gọn',
    },
    {
      name: 'content_md',
      type: 'textarea',
      label: 'Toàn bộ nội dung bài giảng Markdown (Bảng biến cách, ví dụ so sánh, lưu ý)',
      admin: {
        description: 'Hỗ trợ định dạng Markdown, bảng biểu và block chú thích [!NOTE] / [!TIP].',
      },
    },
  ],
};
