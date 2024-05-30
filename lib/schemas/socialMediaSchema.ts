import { z } from 'zod';

export const socialMediaSchema = z.object({
  whatsapp: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
});
