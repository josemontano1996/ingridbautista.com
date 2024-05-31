import { IDbSocialMedia } from '@/infrastructure/persistence/db-types';
import { z } from 'zod';

export const socialMediaDtoSchema = z.object({
  whatsapp: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});

export type SocialMediaDto = z.infer<typeof socialMediaDtoSchema>;

export const mapDbSocialMediaToDto = (data: IDbSocialMedia): SocialMediaDto => {
  return {
    whatsapp: data.whatsapp,
    facebook: data.facebook,
    instagram: data.instagram,
  };
};
