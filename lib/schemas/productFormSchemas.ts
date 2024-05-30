import { z } from 'zod';
export const createProductFormSchema = z.object({
  image: z.any(),
  type: z.string(),
  portion: z.string().optional(),
  price: z.coerce
    .number()
    .min(0.1, { message: 'Minimo 0.1' })
    .transform((val) => Number(val.toFixed(2))),
  allergens: z
    .array(
      z.enum([
        'gluten',
        'crustaceos',
        'huevo',
        'pescado',
        'cacahuete',
        'soja',
        'leche',
        'frutosSecos',
        'apio',
        'mostaza',
        'sesamo',
        'so2',
        'altramuces',
        'moluscos',
      ]),
    )
    .optional(),
  en: z.object({
    name: z.string().min(1, { message: 'Campo requerido' }),
    description: z.string().min(1, { message: 'Campo requerido' }),
  }),
  es: z.object({
    name: z.string().min(1, { message: 'Campo requerido' }),
    description: z.string().min(1, { message: 'Campo requerido' }),
  }),
  fr: z.object({
    name: z.string().min(1, { message: 'Campo requerido' }),
    description: z.string().min(1, { message: 'Campo requerido' }),
  }),
});
export const updateProductFormSchema = z.object({
  image: z.any().optional(),
  type: z.string(),
  portion: z.string(),
  price: z.coerce
    .number()
    .min(0.1, { message: 'Minimo 0.1' })
    .transform((val) => Number(val.toFixed(2))),
  allergens: z
    .array(
      z.enum([
        'gluten',
        'crustaceos',
        'huevo',
        'pescado',
        'cacahuete',
        'soja',
        'leche',
        'frutosSecos',
        'apio',
        'mostaza',
        'sesamo',
        'so2',
        'altramuces',
        'moluscos',
      ]),
    )
    .optional(),
  en: z.object({
    name: z.string().min(1, { message: 'Campo requerido' }),
    description: z.string().min(1, { message: 'Campo requerido' }),
  }),
  es: z.object({
    name: z.string().min(1, { message: 'Campo requerido' }),
    description: z.string().min(1, { message: 'Campo requerido' }),
  }),
  fr: z.object({
    name: z.string().min(1, { message: 'Campo requerido' }),
    description: z.string().min(1, { message: 'Campo requerido' }),
  }),
});
