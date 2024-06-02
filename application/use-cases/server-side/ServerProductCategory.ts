'use server';

import {
  ProductCategoryDto,
  mapDbProductCategoryListToDto,
} from '@/application/dto/ProductCategoryDto';
import { ServerErrorHandler } from '@/application/errors/Errors';
import { IProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';

export type IServerGetProductCategories = (context: {
  productCategoryRepository: IProductCategoryRepository;
}) => Promise<ProductCategoryDto[]>;

export const ServerGetProductCategories: IServerGetProductCategories =
  async (context: {
    productCategoryRepository: IProductCategoryRepository;
  }): Promise<ProductCategoryDto[]> => {
    try {
      const { productCategoryRepository } = context;

      const dbCategories = await productCategoryRepository.getCategories();

      if (!dbCategories) {
        throw new Error('Categories not found');
      }

      return mapDbProductCategoryListToDto(dbCategories);
    } catch (error) {
      const errorInstance = new ServerErrorHandler(error);
      errorInstance.logError();

      return [];
    }
  };
