'use server';

import { z } from 'zod';

import { IActionResponse } from '@/shared/interfaces/IActionResponses';
import { ISocialData } from '@/shared/interfaces/ISocialData';
import { socialMediaSchema } from '@/shared/lib/schemas/socialMediaSchema';
import SocialMedia from '@/infrastructure/persistence/models/SocialMedia';
import { connectDB } from '@/infrastructure/persistence/database-config';

export const updateSocialMediaAction = async (
  values: z.infer<typeof socialMediaSchema>,
): Promise<IActionResponse> => {
  const parsed = socialMediaSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Datos invalidos',
    };
  }

  try {
    let socialData: ISocialData = { ...parsed.data };
    await connectDB();

    const result = await SocialMedia.findOneAndUpdate(
      {},
      { ...socialData },
      { upsert: true, new: true },
    );

    if (!result) {
      throw new Error(result);
    }

    return {
      success: true,
      message: 'Datos actualizados correctamente',
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Ha ocurrido un error',
    };
  }
};
