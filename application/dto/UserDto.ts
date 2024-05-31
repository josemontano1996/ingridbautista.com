import { TUserRole } from '@/shared/types/TUserRole';
import { z } from 'zod';

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: TUserRole;
};

export const updatePasswordDtoSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type updatePasswordDto = z.infer<typeof updatePasswordDtoSchema>;
