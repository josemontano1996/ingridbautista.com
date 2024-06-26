'use server';

import { updatePasswordDto } from '@/application/dto/UserDto';
import { ServerErrorHandler } from '@/application/errors/Errors';
import { UserEntity } from '@/domain/entities/UserEntity';
import { getAuthSession } from '@/infrastructure/authentication/getAuthSession';
import { IUserRepository } from '@/infrastructure/persistence/repositories/UserRepository';

export const ServerUpdateUserPassword = async (
  context: {
    userRepository: IUserRepository;
  },
  data: { passwords: updatePasswordDto },
): Promise<boolean> => {
  try {
    const { user } = await getAuthSession();

    if (!user) {
      throw new Error('User not found');
    }

    const { userRepository } = context;
    const { passwords } = data;

    const hashedPassword = await UserEntity.updatePassword(passwords);

    const result = await userRepository.updateUserPassword(
      user.id,
      hashedPassword,
      true,
    );

    if (!result) {
      throw new Error(result);
    }

    return true;
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    throw new Error('Error updating password');
  }
};
