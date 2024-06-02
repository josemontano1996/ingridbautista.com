'use server';

import { z } from 'zod';

import {
  SocialMediaDto,
  socialMediaDtoSchema,
} from '@/application/dto/SocialMediaDto';
import { ServerUpdateSocialMedia } from '@/application/use-cases/server-side/ServerSocialMedia';
import { SocialMediaRepository } from '@/infrastructure/persistence/repositories/SocialDataRespository';
import { IActionResponse } from './IActionResponses';

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
      return {
        success: false,
        message: 'Error al actualizar datos',
      };
    }

    return {
      success: true,
      message: 'Datos actualizados correctamente',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Ha ocurrido un error',
    };
  }
};
