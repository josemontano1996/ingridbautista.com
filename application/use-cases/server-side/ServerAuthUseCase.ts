'use server';

import { UserEntity } from '@/domain/entities/UserEntity';
import { UserRepository } from '@/infrastructure/persistence/respositories/UserRepository';
import { ConsoleError } from '@/application/errors/ConsoleError';
import { serializeData } from '@/application/utils/serializeData';
import { createLoginAuthUserDto } from '@/application/dto/AuthUserDto';
import { UserDto } from '@/application/dto/UserDto';

export const serverLogInUseCase = async (
  context: { userRepository: UserRepository },
  data: { email: string; password: string },
): Promise<UserDto | null> => {
  try {
    const { userRepository } = context;
    const { email, password } = data;

    const authUserDto = createLoginAuthUserDto({ email, password });

    const dbUser = await userRepository.getUserByEmail(authUserDto.email);

    if (!dbUser) {
      throw new Error('Invalid email or password');
    }

    const serializedData = serializeData(dbUser);

    const user = new UserEntity(
      serializedData._id,
      serializedData.name,
      serializedData.email,
      serializedData.role,
      serializedData.password,
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
};

/* 
export const registerUser = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<boolean> => {
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!email || !password || !name) {
    return null;
  }

  if (email.length < 5 || password.length < 8) {
    return false;
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: "client",
  });

  try {
    await dbConnect();
    const result = await user.save();

    if (!result) {
      return false;
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    await dbDisconnect();
  }
}; */
