import type { CollectionConfig } from 'payload';

export const TopicArticles: CollectionConfig = {
  slug: 'topic-articles',
  labels: {
    singular: 'Bài học chủ đề',
    plural: 'Bài đọc chủ đề & Hội thoại',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'id', 'level', 'audioUrl'],
    group: 'Học Tập & Khảo Thí',
    description: 'Bài học tổng hợp theo tình huống thực tế kèm hội thoại, chuỗi hành động và văn hóa Nga.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'Mã bài học (slug/id)',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Tiêu đề bài học',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'level',
          type: 'select',
          label: 'Cấp độ',
          options: [
            { label: 'A1', value: 'A1' },
            { label: 'A2', value: 'A2' },
            { label: 'B1', value: 'B1' },
            { label: 'B2', value: 'B2' },
          ],
          defaultValue: 'A1',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Lời giới thiệu & Mục tiêu bài học',
    },
    {
      name: 'audioUrl',
      type: 'text',
      label: 'URL file âm thanh phát âm mẫu',
    },
    {
      name: 'culturalTip',
      type: 'textarea',
      label: 'Góc văn hóa Nga (Cultural Tip)',
    },
    {
      name: 'content_md',
      type: 'textarea',
      label: 'Nội dung bài học Markdown',
    },
    {
      name: 'dialogues',
      type: 'json',
      label: 'Hội thoại mẫu (Speaker, Role, Ru, Vi)',
    },
    {
      name: 'grammarNotes',
      type: 'json',
      label: 'Ghi chú ngữ pháp trọng điểm',
    },
    {
      name: 'actionChains',
      type: 'json',
      label: 'Chuỗi phản xạ hành động thực tế',
    },
  ],
};
