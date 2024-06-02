import { z } from 'zod';
import { ZodValidationError } from '../errors/f';

export const AuthUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type AuthUserDto = z.infer<typeof AuthUserDtoSchema>;

export function createLoginAuthUserDto(data: any): AuthUserDto {
  const mappedData = mapLoginAuthUserDto(data);

  const result = AuthUserDtoSchema.safeParse(mappedData);

  if (!result.success) {
    throw new ZodValidationError(result.error, result.error.message);
  }
  return result.data;
}

function mapLoginAuthUserDto(data: any): AuthUserDto {
  return {
    email: data.email,
    password: data.password,
  };
}
