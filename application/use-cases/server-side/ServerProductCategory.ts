'use server';

import {
  ProductCategoryDto,
  mapDbProductCategoryArrayToDto,
  mapDbProductCategoryToDto,
  mapProductCategoryDtoToDb,
} from '@/application/dto/ProductCategoryDto';
import { ServerErrorHandler } from '@/application/errors/Errors';
import { IProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';
import { CacheService } from '../../../infrastructure/caching/CacheService';
import { CACHE_PRODUCT_CATEGORIES_TAG } from '@/infrastructure/caching/cache-tags';

export const ServerCreateCategory = async (
  context: {
    productCategoryRepository: IProductCategoryRepository;
  },
  data: {
    category: ProductCategoryDto;
  },
): Promise<ProductCategoryDto | undefined> => {
  try {
    const { productCategoryRepository } = context;
    const dbCategory = mapProductCategoryDtoToDb(data.category);

    const result = await productCategoryRepository.createCategory(dbCategory);

    if (!result) {
      throw new Error('Categories not found');
    }

    CacheService.revalidateCacheTag([CACHE_PRODUCT_CATEGORIES_TAG]);

    return mapDbProductCategoryToDto(result);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    return undefined;
  }
};

export const ServerGetProductCategories = async (context: {
  productCategoryRepository: IProductCategoryRepository;
}): Promise<ProductCategoryDto[]> => {
  try {
    const { productCategoryRepository } = context;

    const dbCategories = await CacheService.cacheQuery(
      productCategoryRepository.getOrderedCategories,
      [CACHE_PRODUCT_CATEGORIES_TAG],
    );
    if (!dbCategories) {
      throw new Error('Categories not found');
    }

    return mapDbProductCategoryArrayToDto(dbCategories);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    return [];
  }
};
export const ServerUpdateProductCategory = async (
  context: {
    productCategoryRepository: IProductCategoryRepository;
  },
  data: {
    category: ProductCategoryDto;
  },
): Promise<ProductCategoryDto | undefined> => {
  try {
    const { productCategoryRepository } = context;
    const { category } = data;

    const dbCat = mapProductCategoryDtoToDb(category);

    const updatedCat = await productCategoryRepository.findOneAndUpdate(
      dbCat._id!,
      dbCat,
    );

    if (!updatedCat) {
      throw new Error('Error updating category');
    }
    CacheService.revalidateCacheTag([CACHE_PRODUCT_CATEGORIES_TAG]);

    return mapDbProductCategoryToDto(updatedCat);
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    return undefined;
  }
};
export const ServerDeleteProductCategory = async (
  context: {
    productCategoryRepository: IProductCategoryRepository;
  },
  data: {
    categoryName: string;
  },
): Promise<boolean> => {
  try {
    const { productCategoryRepository } = context;
    const { categoryName } = data;

    const result = await productCategoryRepository.deleteCategory(categoryName);

    if (!result) {
      throw new Error('Error deleting category');
    }

    CacheService.revalidateCacheTag([CACHE_PRODUCT_CATEGORIES_TAG]);

    return true;
  } catch (error) {
    const errorInstance = new ServerErrorHandler(error);
    errorInstance.logError();

    return false;
  }
};
