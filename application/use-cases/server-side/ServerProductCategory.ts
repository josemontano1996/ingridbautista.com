'use server';

import { mapDbProductCategoryListToDto } from '@/application/dto/ProductCategoryDto';
import { IProductCategoryRepository } from '@/infrastructure/persistence/respositories/ProductCategoryRepository';

export const ServerGetProductCategories = async (context: {
  productCategoryRepository: IProductCategoryRepository;
}) => {
  const { productCategoryRepository } = context;

  const dbCategories = await productCategoryRepository.getCategories();

  if (!dbCategories) {
    return [];
  }

  return mapDbProductCategoryListToDto(dbCategories);
};
