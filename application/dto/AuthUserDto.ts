import { z } from 'zod';
import { ZodValidationError } from '../errors/ValidationError';

export const AuthUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type TAuthUserDto = z.infer<typeof AuthUserDtoSchema>;

export function createLoginAuthUserDto(data: any): TAuthUserDto {
  const mappedData = mapLoginAuthUserDto(data);

  const result = AuthUserDtoSchema.safeParse(mappedData);

  if (!result.success) {
    throw new ZodValidationError(result.error, result.error.message);
  }
  return result.data;
}

function mapLoginAuthUserDto(data: any): TAuthUserDto {
  return {
    email: data.email,
    password: data.password,
  };
}
