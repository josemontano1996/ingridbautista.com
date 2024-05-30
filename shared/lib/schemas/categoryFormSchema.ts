import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string().min(3).max(40).toLowerCase(),
  order: z.coerce
    .number()
    .min(0.1, { message: 'Minimo 0.1' })
    .transform((val) => Number(val.toFixed(2))),
  en: z.string().min(3).max(40).toLowerCase(),
  fr: z.string().min(3).max(40).toLowerCase(),
  _id: z.string().optional(),
});
