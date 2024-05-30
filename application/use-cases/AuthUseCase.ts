'use server';

import { createLoginAuthUserDto } from '@/application/dto/AuthUserDto';
import { mapperUserEntityNoPasswordDto } from '@/domain/dto-entities/UserEntityDto';

import { UserEntity } from '@/domain/entities/UserEntity';
import { UserRepository } from '@/infrastructure/persistence/respositories/UserRepository';

export class AuthUseCase {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async loginUser(email: string, password: string) {
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

      return mapperUserEntityNoPasswordDto(user);
    } catch (error) {
      console.error('Error during login', error);
      return null;
    }
  }
}
