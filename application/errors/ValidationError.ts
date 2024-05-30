import { SafeParseReturnType, ZodError } from 'zod';

export type TZodErrorList = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export class ZodValidationError extends Error {
  private errors: TZodErrorList;

  constructor(errors: ZodError, message: string) {
    super(message);
    this.errors = errors.flatten().fieldErrors;
  }

  getErrors() {
    return this.errors;
  }
}
