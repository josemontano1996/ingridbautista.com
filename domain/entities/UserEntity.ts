import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { TUserRole, zodUserRoleType } from '@/shared/types/TUserRole';
import { UserDto } from '@/application/dto/UserDto';
import { hashStringSync } from '@/shared/utils/hashString';
import { Entity } from './Entity';

export interface IUserEntity {
  getId(): string | undefined;
  getName(): string;
  getEmail(): string;
  getRole(): TUserRole;
  toDto(): UserDto;
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

    return await bcrypt.compare(hashedPassword, this.password);
  }

  static async updatePassword({
    password,
    confirmPassword,
  }: {
    password: string;
    confirmPassword: string;
  }): Promise<string> {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const hashedPassword = hashStringSync(password);

    return hashedPassword;
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

  toDto(): UserDto {
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

    Entity.validate(entitySchema, this);
    entitySchema.safeParse(this);
  }
}
