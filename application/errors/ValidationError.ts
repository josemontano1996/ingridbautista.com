import { ZodError } from 'zod';

export type TZodErrorList = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export class ZodValidationError extends Error {
  constructor(errors: ZodError, message: string) {
    super(message);
    this.name = 'ZodValidationError';
    this.cause = errors.flatten().fieldErrors;
    this.stack = errors.stack;
  }
}
