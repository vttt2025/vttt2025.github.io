import type { CollectionConfig } from 'payload';

export const Vocabularies: CollectionConfig = {
  slug: 'vocabularies',
  labels: {
    singular: 'Từ vựng',
    plural: 'Kho từ điển tổng thể',
  },
  admin: {
    useAsTitle: 'word_with_stress',
    defaultColumns: ['word_with_stress', 'meaning_vi', 'pos', 'level', 'gender', 'aspect'],
    group: 'Học Tập & Khảo Thí',
    description: 'Kho từ vựng trung tâm toàn hệ thống (2000+ từ) với trọng âm, từ loại, cấu trúc câu và ví dụ.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'UUID từ vựng',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'word_with_stress',
          type: 'text',
          label: 'Từ có dấu trọng âm (vd: студе́нт)',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'meaning_vi',
          type: 'text',
          label: 'Nghĩa tiếng Việt',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'pos',
          type: 'select',
          label: 'Từ loại',
          options: [
            { label: 'Danh từ (сущ.)', value: 'сущ.' },
            { label: 'Động từ (гл.)', value: 'гл.' },
            { label: 'Tính từ (прил.)', value: 'прил.' },
            { label: 'Phó từ (нареч.)', value: 'нареч.' },
            { label: 'Đại từ (мест.)', value: 'мест.' },
            { label: 'Giới từ (предл.)', value: 'предл.' },
            { label: 'Liên từ (союз)', value: 'союз' },
            { label: 'Khác', value: 'др.' },
          ],
          defaultValue: 'сущ.',
          admin: { width: '25%' },
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
          admin: { width: '25%' },
        },
        {
          name: 'gender',
          type: 'select',
          label: 'Giống',
          options: [
            { label: 'Giống đực (м.р.)', value: 'м.р.' },
            { label: 'Giống cái (ж.р.)', value: 'ж.р.' },
            { label: 'Giống trung (ср.р.)', value: 'ср.р.' },
          ],
          admin: { width: '25%' },
        },
        {
          name: 'aspect',
          type: 'select',
          label: 'Thể động từ',
          options: [
            { label: 'Chưa hoàn thành (НСВ)', value: 'НСВ' },
            { label: 'Hoàn thành (СВ)', value: 'СВ' },
          ],
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Ghi chú ngữ pháp & cách dùng đặc biệt',
    },
    {
      name: 'audio_url',
      type: 'text',
      label: 'URL phát âm mẫu',
    },
    {
      name: 'examples',
      type: 'json',
      label: 'Các câu ví dụ kèm dịch nghĩa',
    },
    {
      name: 'structures',
      type: 'json',
      label: 'Cấu trúc đi kèm (đòi hỏi cách mấy, giới từ gì)',
    },
  ],
};
