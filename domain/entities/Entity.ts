import { ZodValidationError } from '@/application/errors/Errors';
import {
  SafeParseReturnType,
  ZodArray,
  ZodError,
  ZodObject,
  ZodRawShape,
  z,
} from 'zod';

export abstract class Entity {
  static validate = <T extends ZodRawShape, Y>(
    schema: ZodObject<T> | ZodArray<ZodObject<T>>,
    values: Y,
  ): SafeParseReturnType<Y, z.infer<typeof schema>> => {
    try {
      return schema.safeParse(values) as SafeParseReturnType<Y, z.infer<typeof schema>>;
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  };
}
