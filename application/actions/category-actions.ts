'use server';
import { z } from 'zod';

import { revalidatePath } from 'next/cache';
import { productCategoryDtoSchema } from '../dto/ProductCategoryDto';
import { ICategoryActionResponse } from './IActionResponses';
import { validateSchema } from '@/infrastructure/validation/validateSchema';
import {
  ServerCreateCategory,
  ServerDeleteProductCategory,
  ServerUpdateProductCategory,
} from '../use-cases/server-side/ServerProductCategory';
import { ProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';

export const createCategoryAction = async (
  values: z.infer<typeof productCategoryDtoSchema>,
): Promise<ICategoryActionResponse> => {
  const parsed = validateSchema(productCategoryDtoSchema, values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  try {
    const category = parsed.data;

    const result = await ServerCreateCategory(
      { productCategoryRepository: new ProductCategoryRepository() },
      { category },
    );

    if (!result) {
      throw new Error('Error creating category');
    }

    return {
      success: true,
      payload: result,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error creating category, check if category already exists',
    };
  }
};

export const updateCategoryAction = async (
  values: z.infer<typeof productCategoryDtoSchema>,
) => {
  const parsed = validateSchema(productCategoryDtoSchema, values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  try {
    const updatedData = await ServerUpdateProductCategory(
      { productCategoryRepository: new ProductCategoryRepository() },
      { category: parsed.data },
    );

    if (!updatedData) {
      throw new Error('Error updating data on line 80. updateCategoryAction');
    }

    return {
      success: true,
      payload: updatedData,
    };
  } catch (e) {
    return {
      success: false,
      message: 'Error updating category, check if category already exists.',
    };
  }
};

export const deleteCategoryAction = async (
  categoryName: string,
): Promise<ICategoryActionResponse> => {
  if (!categoryName) {
    return {
      success: false,
      message: 'No identifier was provided.',
    };
  }
  try {
    const result = ServerDeleteProductCategory(
      { productCategoryRepository: new ProductCategoryRepository() },
      { categoryName },
    );

    if (!result) {
      throw new Error(result);
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error deleting category, try again later',
    };
  }
};
