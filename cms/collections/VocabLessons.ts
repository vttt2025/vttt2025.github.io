import type { CollectionConfig } from 'payload';

export const VocabLessons: CollectionConfig = {
  slug: 'vocab-lessons',
  labels: {
    singular: 'Tập phim từ vựng',
    plural: 'Series video «Хочу в Россию»',
  },
  admin: {
    useAsTitle: 'vi',
    defaultColumns: ['scene', 'ep', 'ru', 'vi', 'type'],
    group: 'Học Tập & Khảo Thí',
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: 'id', type: 'text', label: 'ID bài học', required: true },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Loại bài',
          options: [
            { label: 'Series hoạt hình theo tập', value: 'series' },
            { label: 'Chủ đề sinh hoạt', value: 'topic' },
          ],
          defaultValue: 'series',
          admin: { width: '33.3%' },
        },
        { name: 'ep', type: 'number', label: 'Số tập (Episode)', admin: { width: '33.3%' } },
        { name: 'scene', type: 'text', label: 'Emoji cảnh phim (🎬, 🚊, 🏬)', admin: { width: '33.3%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ru', type: 'text', label: 'Tiêu đề tiếng Nga', required: true, admin: { width: '50%' } },
        { name: 'vi', type: 'text', label: 'Tiêu đề tiếng Việt', required: true, admin: { width: '50%' } },
      ],
    },
    { name: 'story', type: 'textarea', label: 'Bối cảnh & Cốt truyện' },
    {
      name: 'words',
      type: 'array',
      label: 'Từ vựng trọng tâm trong tập',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'ru', type: 'text', label: 'Từ tiếng Nga', required: true, admin: { width: '40%' } },
            { name: 'vi', type: 'text', label: 'Nghĩa tiếng Việt', required: true, admin: { width: '40%' } },
            { name: 'note', type: 'text', label: 'Ghi chú', admin: { width: '20%' } },
          ],
        },
      ],
    },
  ],
};
