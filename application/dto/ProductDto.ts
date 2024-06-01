import { z } from 'zod';
import { IDbProduct } from '@/infrastructure/persistence/db-types';
import { zodAllergenType } from '@/shared/types/TAllergens';
import { serializeData } from '../utils/serializeData';

export const productDtoSchema = z.object({
  id: z.string().optional(),
  image: z.string(),
  type: z.string().optional(),
  price: z.number().min(0),
  portion: z.string().optional(),
  allergens: z.array(zodAllergenType).optional(),
  en: z.object({
    name: z.string(),
    description: z.string(),
  }),
  es: z.object({
    name: z.string(),
    description: z.string(),
  }),
  fr: z.object({
    name: z.string(),
    description: z.string(),
  }),
});

export type ProductDto = z.infer<typeof productDtoSchema>;

export const mapDbProductToDto = (data: IDbProduct): ProductDto => {
  const sD = serializeData(data);
  return {
    id: sD._id,
    image: sD.image,
    type: sD.type,
    price: sD.price,
    portion: sD.portion,
    allergens: sD.allergens,
    en: {
      name: sD.en.name,
      description: sD.en.description,
    },
    es: {
      name: sD.es.name,
      description: sD.es.description,
    },
    fr: {
      name: sD.fr.name,
      description: sD.fr.description,
    },
  };
};
