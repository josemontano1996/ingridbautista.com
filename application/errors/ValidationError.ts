import { ZodError } from 'zod';
import { ICustomError } from './error-interface';

export type TZodErrorList = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export class ZodValidationError extends Error implements ICustomError {
  private errors: TZodErrorList;

  constructor(errors: ZodError, message: string) {
    super(message);
    this.name = 'ZodValidationError';
    this.errors = errors.flatten().fieldErrors;
  }

  getErrors() {
    return this.errors;
  }
}
