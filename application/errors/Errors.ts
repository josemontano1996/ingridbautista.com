'use server';

import { Error } from 'mongoose';
import { ZodError } from 'zod';

export class ServerError {
  constructor(private error: Error) {
    if (typeof window !== 'undefined') {
      throw new Error('Server error can not be logged to client.');
    }
    this.error = error;
  }
  public logError() {
    return console.error(this.error);
  }
}

export type TZodErrorList = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

export class CustomError extends Error {
  constructor(error: Error, message: string, name: string) {
    super(message);
    this.name = name;
    this.cause = error.cause;
    this.stack = error.stack;
  }
}

export class ZodValidationError extends CustomError {
  constructor(error: ZodError, message?: string) {
    super(error, message || 'Zod validation error', 'ZodValidationError');
  }
}
export class DatabaseConnectionError extends CustomError {
  constructor(error: Error, message?: string) {
    super(
      error,
      message || 'Error connecting to MongoDB',
      'DatabaseConnectionError',
    );
  }
}
