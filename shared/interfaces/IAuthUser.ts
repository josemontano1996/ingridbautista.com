import { User } from 'next-auth';
import { TUserRole } from '@/shared/types/TUserRole';

export interface IAuthUser extends User {
  role: TUserRole;
}
