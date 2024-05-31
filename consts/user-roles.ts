import { TUserRole } from '@/shared/types/TUserRole';

type TRoleKey = 'admin' | 'superadmin' | 'user';

type TUserRolesObject = Record<TRoleKey, TUserRole>;

export const USER_ROLES: TUserRolesObject = {
  admin: 'admin',
  superadmin: 'superadmin',
  user: undefined,
};
