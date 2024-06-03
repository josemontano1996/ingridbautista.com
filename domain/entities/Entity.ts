import { ZodValidationError } from '@/application/errors/Errors';
import { SafeParseReturnType, ZodArray, ZodError, ZodObject } from 'zod';

type schemaZodTypes =
  | ZodObject<any, any, any, any, any>
  | ZodArray<ZodObject<any, any, any, any, any>>;

export abstract class Entity {
  static validate = (
    schema: schemaZodTypes,
    values: any,
  ): SafeParseReturnType<any, any> => {
    try {
      return schema.safeParse(values);
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  };
}
