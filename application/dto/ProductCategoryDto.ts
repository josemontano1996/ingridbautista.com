import { z } from 'zod';
import { IDbProductCategory } from '@/infrastructure/persistence/db-types';
import { serializeData } from '../utils/serializeData';

export const productCategoryDtoSchema = z.object({
  name: z.string().min(3).max(40).toLowerCase(),
  order: z.number().int().min(0),
  en: z.string().min(3).max(40).toLowerCase(),
  fr: z.string().min(3).max(40).toLowerCase(),
  id: z.string().optional(),
});

export type ProductCategoryDto = z.infer<typeof productCategoryDtoSchema>;

export const mapDbProductCategoryToDto = (
  data: IDbProductCategory,
): ProductCategoryDto => {
  const sD = serializeData(data);

  return {
    id: sD._id,
    name: sD.name,
    order: sD.order,
    en: sD.en,
    fr: sD.fr,
  };
};
export const mapProductCategoryDtoToDb = (
  data: ProductCategoryDto,
): IDbProductCategory => {
  return {
    _id: data.id,
    name: data.name,
    order: data.order,
    en: data.en,
    fr: data.fr,
  };
};

export const mapDbProductCategoryArrayToDto = (
  data: IDbProductCategory[],
): ProductCategoryDto[] => {
  return data.map((category) => mapDbProductCategoryToDto(category));
};
export const mapProductCategoryArrayDtoToDb = (
  data: ProductCategoryDto[],
): IDbProductCategory[] => {
  return data.map((category) => mapDbProductCategoryToDto(category));
};
