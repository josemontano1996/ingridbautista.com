'use server';

import { UserEntity } from '@/domain/entities/UserEntity';
import { UserRepository } from '@/infrastructure/persistence/respositories/UserRepository';

import { createLoginAuthUserDto } from '../../dto/AuthUserDto';
import { UserDto } from '../../dto/UserDto';
import { Console } from 'console';
import { ConsoleError } from '@/application/errors/ConsoleError';
import { ZodValidationError } from '@/application/errors/ValidationError';
import { ZodError } from 'zod';

export class ServerAuthUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async loginUser(email: string, password: string): Promise<UserDto | null> {
    try {
      const authUserDto = createLoginAuthUserDto({ email, password });

      const dbUser = await this.userRepository.getUserByEmail(
        authUserDto.email,
      );

      if (!dbUser) {
        throw new Error('Invalid email or password');
      }

      const user = new UserEntity(
        dbUser._id,
        dbUser.name,
        dbUser.email,
        dbUser.role,
        dbUser.password,
      );

      const passwordMatch = await user.verifyPassword(authUserDto.password);

      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      return user.toUserDto();
    } catch (error) {
      ConsoleError.logError(error as Error);
     
      return null;
    }
  }
}
