'use server';

import { mapDbProductCategoryListToDto } from '@/application/dto/ProductCategoryDto';
import { ServerError } from '@/application/errors/Errors';
import { IProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';

export const ServerGetProductCategories = async (context: {
  productCategoryRepository: IProductCategoryRepository;
}) => {
  try {
    const { productCategoryRepository } = context;

    const dbCategories = await productCategoryRepository.getCategories();

    if (!dbCategories) {
      return [];
    }

    return mapDbProductCategoryListToDto(dbCategories);
  } catch (error) {
    const errorInstance = new ServerError(error);
    errorInstance.logError();
    throw new Error('Error getting product categories');
  }
};
