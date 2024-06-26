'use server';

import {
  SocialMediaDto,
  mapDbSocialMediaToDto,
} from '@/application/dto/SocialMediaDto';
import { ServerErrorHandler } from '@/application/errors/Errors';

import { CacheService } from '@/infrastructure/caching/CacheService';
import { CACHE_SOCIAL_MEDIA_TAG } from '@/infrastructure/caching/cache-tags';
import { ISocialMediaRepository } from '@/infrastructure/persistence/repositories/SocialMediaRespository';

export const ServerGetSocialMedia = async (context: {
  socialMediaRepository: ISocialMediaRepository;
}): Promise<SocialMediaDto> => {
  try {
    const { socialMediaRepository } = context;

    const dbSocialMedia = await CacheService.cacheQuery(
      socialMediaRepository.getSocialMedia,
      [CACHE_SOCIAL_MEDIA_TAG],
    );

    if (!dbSocialMedia) {
      throw new Error('Social media not found');
    }

    return mapDbSocialMediaToDto(dbSocialMedia);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();
    return {};
  }
};

export const ServerUpdateSocialMedia = async (
  context: {
    socialMediaRepository: ISocialMediaRepository;
  },
  data: { socialMedia: SocialMediaDto },
): Promise<SocialMediaDto> => {
  try {
    const { socialMediaRepository } = context;
    const { socialMedia } = data;

    const result = await socialMediaRepository.updateSocialMedia(socialMedia);

    if (!result) {
      throw new Error('Error updating social media');
    }

    CacheService.revalidateCacheTag([CACHE_SOCIAL_MEDIA_TAG]);

    return mapDbSocialMediaToDto(result);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    return {};
  }
};
