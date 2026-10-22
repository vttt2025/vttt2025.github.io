import type { CollectionConfig } from 'payload';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: {
    singular: 'Bài viết',
    plural: 'Cẩm nang du học & Blog',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'date', 'published', 'updatedAt'],
    group: 'Kinh Doanh & Dịch Vụ',
    description: 'Quản lý các bài viết kinh nghiệm xin học bổng, đời sống ký túc xá và thủ tục du học Nga.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Slug URL (đường dẫn)',
      required: true,
      admin: { description: 'Ví dụ: kinh-nghiem-xin-hoc-bong-nga-2026' },
    },
    { name: 'title', type: 'text', label: 'Tiêu đề bài viết', required: true },
    {
      type: 'row',
      fields: [
        { name: 'tag', type: 'text', label: 'Chuyên mục / Thẻ tag', admin: { width: '40%' } },
        { name: 'date', type: 'text', label: 'Thời gian đăng', admin: { width: '40%' } },
        { name: 'icon', type: 'text', label: 'Emoji đại diện', defaultValue: '🇷🇺', admin: { width: '20%' } },
      ],
    },
    { name: 'excerpt', type: 'textarea', label: 'Tóm tắt bài viết' },
    { name: 'content', type: 'textarea', label: 'Nội dung bài viết đầy đủ (Hỗ trợ HTML/Markdown)', required: true },
    { name: 'published', type: 'checkbox', label: 'Đã xuất bản lên web', defaultValue: true },
  ],
};
