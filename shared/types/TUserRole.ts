import { z } from 'zod';

export type TUserRole = 'admin' | 'superadmin' | undefined;

export const zodUserRoleType = z.union([
  z.literal<TUserRole>('admin'),
  z.literal<TUserRole>('superadmin'),
  z.undefined(),
]);
