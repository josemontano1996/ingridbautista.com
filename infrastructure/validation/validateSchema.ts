import { SafeParseReturnType, ZodObject } from 'zod';

export const validateSchema = (
  schema: ZodObject<any, any, any, any, any>,
  values: any,
): SafeParseReturnType<any, any> => {
  return schema.safeParse(values);
};
