import type { CollectionConfig } from 'payload';

export const TrkiQuestionBank: CollectionConfig = {
  slug: 'trki-question-bank',
  labels: {
    singular: 'Câu hỏi TRKI',
    plural: 'Ngân hàng câu hỏi TRKI chi tiết',
  },
  admin: {
    useAsTitle: 'prompt',
    defaultColumns: ['test_code', 'level', 'sub_test_type', 'question_number', 'prompt', 'correct_index', 'is_active'],
    group: 'Học Tập & Khảo Thí',
    description: 'Kho lưu trữ từng câu trắc nghiệm riêng biệt (1870+ câu) theo từng mã đề thi và kỹ năng (subtest).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      label: 'UUID câu hỏi',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'test_code',
          type: 'text',
          label: 'Mã đề thi (Test Code)',
          required: true,
          admin: { width: '33.3%' },
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
          admin: { width: '33.3%' },
        },
        {
          name: 'sub_test_type',
          type: 'select',
          label: 'Phần thi (Subtest)',
          options: [
            { label: 'Từ vựng & Ngữ pháp (Subtest 1)', value: 'subtest1' },
            { label: 'Đọc hiểu (Subtest 2)', value: 'subtest2' },
            { label: 'Nghe hiểu (Subtest 3)', value: 'subtest3' },
            { label: 'Viết (Subtest 4)', value: 'subtest4' },
            { label: 'Nói (Subtest 5)', value: 'subtest5' },
          ],
          defaultValue: 'subtest1',
          admin: { width: '33.3%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'question_number',
          type: 'number',
          label: 'Số thứ tự câu',
          defaultValue: 1,
          admin: { width: '33.3%' },
        },
        {
          name: 'points',
          type: 'number',
          label: 'Điểm số',
          defaultValue: 1,
          admin: { width: '33.3%' },
        },
        {
          name: 'is_active',
          type: 'checkbox',
          label: 'Kích hoạt / Sử dụng trong đề',
          defaultValue: true,
          admin: { width: '33.3%' },
        },
      ],
    },
    {
      name: 'instruction',
      type: 'textarea',
      label: 'Chỉ dẫn / Hướng dẫn làm bài',
    },
    {
      name: 'reading_text',
      type: 'textarea',
      label: 'Đoạn văn đọc hiểu (Reading Text)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'audio_url',
          type: 'text',
          label: 'URL File nghe (Supabase Storage)',
          admin: { width: '50%' },
        },
        {
          name: 'audio_transcript',
          type: 'textarea',
          label: 'Bản gỡ băng nghe (Transcript)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'prompt',
      type: 'textarea',
      label: 'Câu hỏi / Câu chưa hoàn chỉnh (Prompt)',
      required: true,
    },
    {
      name: 'options',
      type: 'json',
      label: 'Danh sách đáp án lựa chọn [A, B, C, ...]',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'correct_index',
          type: 'number',
          label: 'Chỉ số đáp án đúng (0 = A, 1 = B, 2 = C...)',
          defaultValue: 0,
          admin: { width: '50%' },
        },
        {
          name: 'correct_answer',
          type: 'text',
          label: 'Nội dung đáp án đúng',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'explanation',
      type: 'textarea',
      label: 'Giải thích chi tiết ngữ pháp / căn cứ chọn đáp án',
    },
  ],
};
