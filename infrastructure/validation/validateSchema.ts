import { ZodValidationError } from '@/application/errors/Errors';
import { SafeParseReturnType, ZodError, ZodObject, ZodRawShape, z } from 'zod';

export const validateSchema = <T extends ZodRawShape, Y>(
  schema: ZodObject<T>,
  values: Y,
): SafeParseReturnType<Y, z.infer<typeof schema>> => {
  try {
    return schema.safeParse(values) as SafeParseReturnType<
      Y,
      z.infer<typeof schema>
    >;
  } catch (e) {
    const error = e as ZodError;
    throw new ZodValidationError(error, 'Validation error');
  }
};
