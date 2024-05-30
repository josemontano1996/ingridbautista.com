'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { IUserActionResponse } from '@/shared/interfaces/IActionResponses';
import {
  updatePasswordFormSchema,
  userFormSchema,
} from '@/shared/lib/schemas/userFormSchema';
import { IUser } from '@/shared/interfaces/IUser';
import { dbConnect, dbDisconnect } from '@/database/db';
import { getAuthSession } from '@/shared/lib/auth/getAuthSession';
import User from '@/models/User';

export const updateUserAction = async (
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

    await dbConnect();
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
  } finally {
    await dbDisconnect();
  }
};

export const updatePasswordUserAction = async (
  values: z.infer<typeof updatePasswordFormSchema>,
): Promise<IUserActionResponse> => {
  const parsed = updatePasswordFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  const password = parsed.data.password;
  const confirmPassword = parsed.data.confirmPassword;

  if (password !== confirmPassword) {
    return {
      success: false,
      message: 'Las contraseñas deben coincidir',
    };
  }

  try {
    const { user } = await getAuthSession();

    const hashedPassword = bcrypt.hashSync(password, 10);

    await dbConnect();

    const result = await User.updateOne(
      { _id: user.id },
      { password: hashedPassword },
    );
    console.log(result);

    if (!result) {
      throw new Error(result);
    }

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
  } finally {
    await dbDisconnect();
  }
};
