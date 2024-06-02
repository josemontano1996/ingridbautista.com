import { Error } from 'mongoose';
import { ZodError } from 'zod';

export const ZOD_VALIDATION_ERROR = 'ZodValidationError' as const;
export const DATABASE_CONNECTION_ERROR = 'DatabaseConnectionError' as const;

export interface IErrorHandler {
  logError(): void;
}

/**
 * Represents a server error, only works in the server.
 * Implements the IErrorHandler interface.
 */
export class ServerError implements IErrorHandler {
  /**
   * Creates a new instance of the ServerError class.
   * @param error - The error object.
   * @throws Error - If running in a browser environment.
   */
  constructor(private error: any) {
    if (typeof window !== 'undefined') {
      throw new Error('Server error can not be logged to client.');
    }
    this.error = error;
  }

  /**
   * Logs the error to the console.
   */
  public logError() {
    return console.error(this.error);
  }
}

/**
 * Represents a client error.
 * Implements the IErrorHandler interface.
 */

export class ClientError implements IErrorHandler {
  constructor(private message: string) {
    this.message = message;
  }
  public logError() {
    return console.error(this.message);
  }
}

/**
 * Represents a custom error.
 * Extends the Error class.
 */
export class CustomError extends Error {
  constructor(error: Error, message: string, name: string) {
    super(message);
    this.name = name;
    this.cause = error.cause;
    this.stack = error.stack;
  }
}

export type TZodErrorList = {
  [x: string]: string[] | undefined;
  [x: number]: string[] | undefined;
  [x: symbol]: string[] | undefined;
};

/**
 * Represents a Zod validation error.
 * Extends the CustomError class.
 */
export class ZodValidationError extends CustomError {
  constructor(error: ZodError, message?: string) {
    super(error, message || ZOD_VALIDATION_ERROR, ZOD_VALIDATION_ERROR);
  }
}

/**
 * Represents a database connection error.
 * Extends the CustomError class.
 */
export class DatabaseConnectionError extends CustomError {
  constructor(error: Error, message?: string) {
    super(
      error,
      message || DATABASE_CONNECTION_ERROR,
      DATABASE_CONNECTION_ERROR,
    );
  }
}
