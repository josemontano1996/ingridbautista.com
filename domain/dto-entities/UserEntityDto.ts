import { TUserRole } from '@/shared/types/TUserRole';
import { UserEntity } from '../entities/UserEntity';

export type NoPasswordUserDto = {
  _id: string;
  name: string;
  email: string;
  role: TUserRole;
};

export const mapperUserEntityNoPasswordDto = (
  data: UserEntity,
): NoPasswordUserDto => {
  return {
    _id: data.getId()!,
    name: data.getName(),
    email: data.getEmail(),
    role: data.getRole(),
  };
};
