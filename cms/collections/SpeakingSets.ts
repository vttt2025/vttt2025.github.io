import type { CollectionConfig } from 'payload';

export const SpeakingSets: CollectionConfig = {
  slug: 'speaking-sets',
  labels: {
    singular: 'Bộ luyện nói',
    plural: 'Khóa luyện nói phản xạ & Shadowing',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'sentenceCount', 'is_pro_only'],
    group: 'Học Tập & Khảo Thí',
    description: 'Kho mẫu câu luyện nói phản xạ, ngữ điệu và phát âm tiếng Nga có AI chấm điểm âm vị.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'ID bộ luyện nói',
      required: true,
      admin: { description: 'Ví dụ: spk_greeting, spk_shopping, spk_metro' },
    },
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', label: 'Tên chủ đề luyện nói', required: true, admin: { width: '50%' } },
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
          admin: { width: '25%' },
        },
        {
          name: 'is_pro_only',
          type: 'checkbox',
          label: 'Khóa PRO',
          defaultValue: false,
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Danh sách các câu luyện nói',
      fields: [
        { name: 'ru', type: 'textarea', label: 'Câu tiếng Nga (kèm trọng âm)', required: true },
        { name: 'vi', type: 'textarea', label: 'Dịch nghĩa tiếng Việt', required: true },
        { name: 'phoneme_note', type: 'text', label: 'Lưu ý trọng âm & nối âm' },
      ],
    },
  ],
};
