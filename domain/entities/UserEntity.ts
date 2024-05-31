import bcrypt from 'bcryptjs';
import { ZodError, z } from 'zod';
import { ZodValidationError } from '@/application/errors/ValidationError';
import { TUserRole, zodUserRoleType } from '@/shared/types/TUserRole';
import { UserDto } from '@/application/dto/UserDto';

export interface IUserEntity {
  getId(): string | undefined;
  getName(): string;
  getEmail(): string;
  getRole(): TUserRole;
  toUserDto(): UserDto;
  verifyPassword(hashedPassword: string): Promise<boolean>;
}

export class UserEntity implements IUserEntity {
  constructor(
    private id: string | undefined = undefined,
    private name: string,
    private email: string,
    private role: TUserRole,
    private password: string | undefined = undefined,
  ) {
    this.id = id?.toString();
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;

    this.validate();
  }

  async verifyPassword(hashedPassword: string): Promise<boolean> {
    if (!this.password) throw new Error('Password is not set');
    return await bcrypt.compare(this.password, hashedPassword);
  }

  getId(): string | undefined {
    return this.id;
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

  toUserDto(): UserDto {
    return {
      id: this.getId()!,
      name: this.getName(),
      email: this.getEmail(),
      role: this.getRole(),
    };
  }
  private validate() {
    const entitySchema = z.object({
      id: z.string().optional(),
      name: z.string().min(1),
      email: z.string().email(),
      role: zodUserRoleType,
      password: z.string().min(8).optional(),
    });

    try {
      entitySchema.safeParse(this);
    } catch (e) {
      const error = e as ZodError;
      throw new ZodValidationError(error, 'Validation error');
    }
  }
}
