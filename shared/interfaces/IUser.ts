import { TUserRole } from '@/shared/types/TUserRole';

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role?: TUserRole;
  password?: string;

  createdAt?: string;
  updatedAt?: string;
}
