import { ZodError, z } from 'zod';
import { ZodValidationError } from '@/application/errors/ValidationError';
import { verifyPassword } from '@/infrastructure/authentication/utils';
import { TUserRole, zodUserRoleType } from '@/shared/types/TUserRole';

export class UserEntity {
  constructor(
    private _id: string | undefined = undefined,
    private name: string,
    private email: string,
    private role: TUserRole,
    private password: string | undefined = undefined,
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;

    this.validate();
  }

  async verifyPassword(password: string): Promise<boolean> {
    if (!this.password) throw new Error('Password is not set');
    return await verifyPassword(password, this.password);
  }

  getId(): string | undefined {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getRole(): TUserRole {
    return this.role;
  }

  private validate() {
    const entitySchema = z.object({
      _id: z.string().optional(),
      name: z.string().min(1),
      email: z.string().email(),
      role: zodUserRoleType,
      password: z.string().optional(),
    });

    try {
      entitySchema.safeParse(this);
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  }
}
