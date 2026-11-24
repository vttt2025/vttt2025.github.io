import type { Access, FieldAccess } from 'payload';

export const isSuperAdmin: Access = ({ req: { user } }) => Boolean(user?.role === 'super_admin');

export const isSuperAdminField: FieldAccess = ({ req: { user } }) => Boolean(user?.role === 'super_admin');

export const isAdmin: Access = ({ req: { user } }) =>
  Boolean(user && (user.role === 'super_admin' || user.role === 'academic_admin'));

export const isTeacherOrAdmin: Access = ({ req: { user } }) =>
  Boolean(user && (user.role === 'super_admin' || user.role === 'academic_admin' || user.role === 'teacher'));

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);

export const anyoneCanRead: Access = () => true;
