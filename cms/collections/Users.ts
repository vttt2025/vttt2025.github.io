import type { CollectionConfig } from 'payload';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Người dùng',
    plural: 'Danh sách học viên & Quản trị',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'full_name', 'role', 'is_pro', 'streak_days'],
    group: 'Hệ Thống & Quản Trị',
  },
  auth: true,
  fields: [
    { name: 'full_name', type: 'text', label: 'Họ và tên học viên' },
    {
      name: 'role',
      type: 'select',
      label: 'Vai trò tài khoản',
      options: [
        { label: 'Học viên (Student)', value: 'student' },
        { label: 'Giáo viên chấm bài (Teacher)', value: 'teacher' },
        { label: 'Quản trị học thuật (Academic Admin)', value: 'academic_admin' },
        { label: 'Tổng quản trị (Super Admin)', value: 'super_admin' },
      ],
      defaultValue: 'student',
      required: true,
    },
    { name: 'is_pro', type: 'checkbox', label: 'Kích hoạt tài khoản PRO', defaultValue: false },
    { name: 'streak_days', type: 'number', label: 'Số ngày học liên tiếp (Streak)', defaultValue: 0 },
    { name: 'xp', type: 'number', label: 'Điểm kinh nghiệm (XP)', defaultValue: 0 },
  ],
};
