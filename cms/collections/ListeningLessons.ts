import type { CollectionConfig } from 'payload';

export const ListeningLessons: CollectionConfig = {
  slug: 'listening-lessons',
  labels: {
    singular: 'Bài luyện nghe',
    plural: 'Khóa luyện nghe 4 Part',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'vi', 'level', 'part', 'is_pro_only'],
    group: 'Học Tập & Khảo Thí',
    description: 'Hệ thống bài nghe 4 Part và Shadowing video kèm lời thoại song ngữ, trắc nghiệm nghe hiểu.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'ID bài nghe',
      required: true,
      admin: { description: 'Ví dụ: l1, l2, l_shadow_01' },
    },
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', label: 'Tiêu đề tiếng Nga', required: true, admin: { width: '50%' } },
        { name: 'vi', type: 'text', label: 'Tiêu đề tiếng Việt', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'level',
          type: 'select',
          label: 'Trình độ',
          options: [
            { label: 'A1 (ТЭУ)', value: 'A1' },
            { label: 'A2 (ТБУ)', value: 'A2' },
            { label: 'B1 (ТРКИ-1)', value: 'B1' },
            { label: 'B2 (ТРКИ-2)', value: 'B2' },
          ],
          defaultValue: 'A1',
          admin: { width: '33.3%' },
        },
        {
          name: 'part',
          type: 'select',
          label: 'Phân loại Part',
          options: [
            { label: 'Part 1: Nghe tranh & hình ảnh', value: 'part1' },
            { label: 'Part 2: Hội thoại ngắn phản xạ', value: 'part2' },
            { label: 'Part 3: Hội thoại dài tình huống', value: 'part3' },
            { label: 'Part 4: Bài nói thông báo / tin tức', value: 'part4' },
          ],
          defaultValue: 'part1',
          admin: { width: '33.3%' },
        },
        {
          name: 'is_pro_only',
          type: 'checkbox',
          label: 'Chỉ dành cho PRO',
          defaultValue: false,
          admin: { width: '33.3%' },
        },
      ],
    },
    {
      name: 'youtube_id',
      type: 'text',
      label: 'YouTube Video ID (nếu có)',
      admin: { description: 'ID 11 ký tự của video (ví dụ: dQw4w9WgXcQ)' },
    },
    {
      name: 'lines',
      type: 'array',
      label: 'Danh sách các câu thoại / Shadowing Studio',
      labels: {
        singular: 'Câu thoại',
        plural: 'Các câu thoại',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'who', type: 'text', label: 'Người nói (Anna, Maksim...)', admin: { width: '25%' } },
            { name: 'ru', type: 'textarea', label: 'Câu tiếng Nga', required: true, admin: { width: '40%' } },
            { name: 'vi', type: 'textarea', label: 'Dịch tiếng Việt', required: true, admin: { width: '35%' } },
          ],
        },
      ],
    },
    {
      name: 'questions',
      type: 'array',
      label: 'Câu hỏi trắc nghiệm kiểm tra nghe hiểu',
      fields: [
        { name: 'q', type: 'textarea', label: 'Câu hỏi (Tiếng Việt)', required: true },
        {
          type: 'row',
          fields: [
            { name: 'a0', type: 'text', label: 'Đáp án đúng (A0)', required: true, admin: { width: '50%' } },
            { name: 'a1', type: 'text', label: 'Đáp án sai 1', admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'a2', type: 'text', label: 'Đáp án sai 2', admin: { width: '50%' } },
            { name: 'a3', type: 'text', label: 'Đáp án sai 3', admin: { width: '50%' } },
          ],
        },
        { name: 'ex', type: 'textarea', label: 'Giải thích chi tiết vì sao chọn đáp án này' },
      ],
    },
  ],
};
