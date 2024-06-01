'use server';

import { z } from 'zod';
import { ProductDto, productDtoSchema } from '../dto/ProductDto';
import { ProductRepository } from '@/infrastructure/persistence/repositories/ProductRepository';
import {
  ServerCreateProduct,
  ServerDeleteProduct,
  ServerUpdateProduct,
} from '../use-cases/server-side/ServerProduct';
import { IProductActionResponse } from './IActionResponses';

export const createProductAction = async (
  values: z.infer<typeof productDtoSchema>,
): Promise<IProductActionResponse> => {
  try {
    const parsed = productDtoSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid form data',
      };
    }

    const result = await ServerCreateProduct(
      { productRepository: new ProductRepository() },
      { product: parsed.data },
    );

    if (!result) {
      throw new Error('Error creating product');
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Error creating category, try again later.',
    };
  }
};

export const updateProductAction = async (
  values: ProductDto,
): Promise<IProductActionResponse> => {
  try {
    const parsed = productDtoSchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: 'Invalid form data',
      };
    }

    const result = await ServerUpdateProduct(
      { productRepository: new ProductRepository() },
      { product: parsed.data },
    );

    if (!result) {
      throw new Error('Error updating product');
    }

    return {
      success: true,
    };
  } catch (e) {
    console.error(e);

    return {
      success: false,
      message: 'Error updating product, try again later.',
    };
  }
};

export const deleteProductAction = async (
  prodId: string,
  imageUrl: string,
): Promise<IProductActionResponse> => {
  try {
    const result = await ServerDeleteProduct(
      { productRepository: new ProductRepository() },
      { prodId, imageUrl },
    );

    if (!result) {
      throw new Error('Error deleting product');
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: 'Error deleting product',
    };
  }
};
