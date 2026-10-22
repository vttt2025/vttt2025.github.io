import type { CollectionConfig } from 'payload';

export const WritingTasks: CollectionConfig = {
  slug: 'writing-tasks',
  labels: {
    singular: 'Đề bài viết',
    plural: 'Khóa luyện viết Письмо TRKI',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'minWords', 'is_pro_only'],
    group: 'Học Tập & Khảo Thí',
    description: 'Các đề luyện viết tả tranh và thư từ chuẩn TRKI kèm gợi ý từ khóa, mẹo và bài mẫu.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'ID đề bài viết',
      required: true,
      admin: { description: 'Ví dụ: wr_pic_01, wr_letter_friend' },
    },
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', label: 'Tên đề bài', required: true, admin: { width: '50%' } },
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
          admin: { width: '25%' },
        },
        {
          name: 'minWords',
          type: 'number',
          label: 'Số từ tối thiểu',
          defaultValue: 50,
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'image_url',
      type: 'text',
      label: 'URL hình ảnh tranh minh họa (nếu có)',
    },
    {
      name: 'prompt',
      type: 'textarea',
      label: 'Yêu cầu đề bài bằng tiếng Nga',
      required: true,
    },
    {
      name: 'vi',
      type: 'textarea',
      label: 'Dịch đề bài tiếng Việt',
      required: true,
    },
    {
      name: 'tips',
      type: 'json',
      label: 'Danh sách gợi ý & mẹo làm bài (JSON Array)',
    },
    {
      name: 'suggested_words',
      type: 'json',
      label: 'Từ vựng bắt buộc hoặc gợi ý đưa vào bài (JSON Array)',
    },
    {
      name: 'model',
      type: 'textarea',
      label: 'Bài viết mẫu tham khảo (Model Essay)',
    },
    {
      name: 'is_pro_only',
      type: 'checkbox',
      label: 'Khóa PRO',
      defaultValue: false,
    },
  ],
};
