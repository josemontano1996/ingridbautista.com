'use server';

import { z } from 'zod';
import { IUserActionResponse } from '@/shared/interfaces/IActionResponses';
import { updatePasswordDtoSchema } from '@/application/dto/UserDto';
import { UserRepository } from '../../infrastructure/persistence/respositories/UserRepository';
import { ServerUpdateUserPassword } from '@/application/use-cases/server-side/ServerUserAccount';

export const updatePasswordUserAction = async (
  values: z.infer<typeof updatePasswordDtoSchema>,
): Promise<IUserActionResponse> => {
  const parsed = updatePasswordDtoSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  const password = parsed.data.password;
  const confirmPassword = parsed.data.confirmPassword;

  try {
    
    await ServerUpdateUserPassword(
      { userRepository: new UserRepository() },
      { passwords: { password, confirmPassword } },
    );

    return {
      success: true,
      message: 'Constraseña actualizada con éxito',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error al actualizar contraseña',
    };
  }
};

/* export const updateUserAction = async (
  values: z.infer<typeof userFormSchema>,
): Promise<IUserActionResponse> => {
  const parsed = userFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Datos de formulario invalidos',
    };
  }

  let user: IUser = {
    name: parsed.data.name,
    email: parsed.data.email,
  };

  try {
    const sessionUser = await getAuthSession();

    await connectDB();
    const result = await User.updateOne(
      {
        _id: sessionUser.user.id,
      },
      {
        ...user,
      },
    );

    if (!result) {
      throw new Error(result);
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Error al actualizar usuario',
    };
  }
}; */
