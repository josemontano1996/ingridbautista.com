'use server';

import { z } from 'zod';

import { IActionResponse } from '@/shared/interfaces/IActionResponses';

import SocialMedia from '@/infrastructure/persistence/models/SocialMedia';
import { connectDB } from '@/infrastructure/persistence/database-config';
import {
  SocialMediaDto,
  socialMediaDtoSchema,
} from '@/application/dto/SocialMediaDto';
import { ServerUpdateSocialMedia } from '@/application/use-cases/server-side/ServerSocialMedia';
import { SocialMediaRepository } from '@/infrastructure/persistence/respositories/SocialDataRespository';

export const updateSocialMediaAction = async (
  values: z.infer<typeof socialMediaDtoSchema>,
): Promise<IActionResponse> => {
  const parsed = socialMediaDtoSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Datos invalidos',
    };
  }

  try {
    let socialMedia: SocialMediaDto = { ...parsed.data };

    const result = await ServerUpdateSocialMedia(
      { socialMediaRepository: new SocialMediaRepository() },
      { socialMedia },
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
