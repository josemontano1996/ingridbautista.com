import { TUserRole } from '@/shared/types/TUserRole';

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
};
