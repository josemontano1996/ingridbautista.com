import { z } from 'zod';
import { IDbProduct } from '@/infrastructure/persistence/db-types';
import { zodAllergenType } from '@/shared/types/TAllergens';
import { serializeData } from '../utils/serializeData';

export const productDtoSchema = z.object({
  id: z.string().optional(),
  image: z.string(),
  type: z.string(),
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
export const mapProductDtoToDb = (data: ProductDto): IDbProduct => {
  return {
    _id: data.id,
    image: data.image,
    type: data.type,
    price: data.price,
    portion: data.portion,
    allergens: data.allergens,
    en: {
      name: data.en.name,
      description: data.en.description,
    },
    es: {
      name: data.es.name,
      description: data.es.description,
    },
    fr: {
      name: data.fr.name,
      description: data.fr.description,
    },
  };
};
