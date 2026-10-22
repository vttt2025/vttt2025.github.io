import type { CollectionConfig } from 'payload';

export const TrkiTests: CollectionConfig = {
  slug: 'trki-tests',
  labels: {
    singular: 'Đề thi TRKI',
    plural: 'Ngân hàng đề thi TRKI',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'durationMin', 'passPercent', 'is_pro_only', 'updatedAt'],
    group: 'Học Tập & Khảo Thí',
    description: 'Quản lý ngân hàng đề thi chuẩn TRKI các cấp độ A1, A2, B1, B2 với 3 phần thi: Từ vựng & Ngữ pháp, Đọc hiểu, Nghe hiểu.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'Mã đề thi (ID duy nhất)',
      required: true,
      admin: {
        description: 'Ví dụ: trki_a1, trki_b1_de1, trki_b2_official',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'level',
          type: 'select',
          label: 'Cấp độ chuẩn CEFR',
          required: true,
          options: [
            { label: 'A1 (ТЭУ) — Sơ cấp', value: 'A1 (ТЭУ)' },
            { label: 'A2 (ТБУ) — Cơ bản', value: 'A2 (ТБУ)' },
            { label: 'B1 (ТРКИ-1) — Trung cấp 1', value: 'B1 (ТРКИ-1)' },
            { label: 'B2 (ТРКИ-2) — Trung cấp 2', value: 'B2 (ТРКИ-2)' },
          ],
          defaultValue: 'A1 (ТЭУ)',
          admin: { width: '50%' },
        },
        {
          name: 'levelName',
          type: 'text',
          label: 'Tên hiển thị cấp độ',
          defaultValue: 'Trình độ sơ cấp A1',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề đề thi',
      required: true,
      admin: {
        description: 'Tên gọi đầy đủ hiển thị cho học viên trên trang web.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'durationMin',
          type: 'number',
          label: 'Thời gian làm bài (phút)',
          defaultValue: 45,
          admin: { width: '33.3%' },
        },
        {
          name: 'passPercent',
          type: 'number',
          label: 'Điểm chuẩn đạt (%)',
          defaultValue: 66,
          admin: { width: '33.3%' },
        },
        {
          name: 'is_pro_only',
          type: 'checkbox',
          label: 'Khóa VIP (Chỉ dành cho tài khoản PRO)',
          defaultValue: false,
          admin: { width: '33.3%' },
        },
      ],
    },
    {
      name: 'parts',
      type: 'array',
      label: 'Các phần thi (Parts)',
      labels: {
        singular: 'Phần thi',
        plural: 'Danh sách phần thi',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'id', type: 'text', label: 'Mã phần (gram / reading / listening)', admin: { width: '30%' } },
            { name: 'name', type: 'text', label: 'Tên phần tiếng Nga', admin: { width: '35%' } },
            { name: 'vi', type: 'text', label: 'Tên phần tiếng Việt', admin: { width: '35%' } },
          ],
        },
        {
          name: 'text',
          type: 'group',
          label: 'Đoạn văn đọc hiểu (Dành cho Reading)',
          fields: [
            { name: 'ru', type: 'textarea', label: 'Đoạn văn tiếng Nga' },
            { name: 'vi', type: 'textarea', label: 'Bản dịch tiếng Việt tham khảo' },
          ],
        },
        {
          name: 'lines',
          type: 'array',
          label: 'Các lượt hội thoại audio (Dành cho Listening)',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'who', type: 'text', label: 'Người nói', admin: { width: '25%' } },
                { name: 'ru', type: 'text', label: 'Câu tiếng Nga', admin: { width: '40%' } },
                { name: 'vi', type: 'text', label: 'Dịch tiếng Việt', admin: { width: '35%' } },
              ],
            },
          ],
        },
        {
          name: 'questions',
          type: 'array',
          label: 'Danh sách câu hỏi trắc nghiệm',
          labels: {
            singular: 'Câu hỏi',
            plural: 'Các câu hỏi',
          },
          fields: [
            {
              name: 'q',
              type: 'textarea',
              label: 'Câu hỏi / Câu cần điền khuyết',
              required: true,
            },
            {
              name: 'options',
              type: 'json',
              label: 'Danh sách phương án lựa chọn (JSON Array)',
              admin: {
                description: 'Ví dụ: ["преподавателем", "преподавателя", "преподавателю", "преподаватель"]',
              },
            },
            {
              name: 'a',
              type: 'number',
              label: 'Chỉ số đáp án đúng (0 là đáp án đầu tiên)',
              defaultValue: 0,
            },
            {
              name: 'ex',
              type: 'textarea',
              label: 'Giải thích ngữ pháp chi tiết',
            },
          ],
        },
      ],
    },
  ],
};
