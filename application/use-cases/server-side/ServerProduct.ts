'use server';

import { ProductDto, mapProductDtoToDb } from '@/application/dto/ProductDto';
import { CacheService } from '@/infrastructure/caching/CacheService';
import { CACHE_PRODUCTS_TAG } from '@/infrastructure/caching/cache-tags';
import {
  deleteImageFromCloudinary,
  updateImageFromCloudinary,
  uploadImageToCloudinary,
} from '@/infrastructure/online-storage/cloudinary';
import Product from '@/infrastructure/persistence/models/Product';
import { IProductRepository } from '@/infrastructure/persistence/repositories/ProductRepository';

export const ServerCreateProduct = async (
  context: {
    productRepository: IProductRepository;
  },
  data: {
    product: ProductDto;
  },
): Promise<boolean> => {
  let imageUrl = null;

  try {
    const { productRepository } = context;
    const { product } = data;

    imageUrl = await uploadImageToCloudinary(product.image);

    if (!imageUrl) {
      throw new Error('Error uploading image');
    }

    let newProduct = mapProductDtoToDb({ ...product, image: imageUrl });

    const result = await productRepository.createProduct(newProduct);

    if (!result) {
      throw new Error('Error creating product');
    }

    CacheService.revalidateCacheTag([CACHE_PRODUCTS_TAG]);

    return true;
  } catch (error) {
    console.error(error);

    if (imageUrl) {
      await deleteImageFromCloudinary(imageUrl);
    }

    throw new Error('Error creating product');
  }
};

export const ServerUpdateProduct = async (
  context: {
    productRepository: IProductRepository;
  },
  data: {
    product: ProductDto;
  },
): Promise<boolean> => {
  const { productRepository } = context;
  const { product } = data;

  const oldProduct = await productRepository.getProduct(product.id!);

  if (!oldProduct) {
    throw new Error('Product not found');
  }

  let imageUrl = oldProduct.image;

  if (product.image && product.image !== oldProduct.image) {
    imageUrl = await updateImageFromCloudinary(product.image, oldProduct.image);
  }

  const updatedProduct = { ...product, image: imageUrl };

  const result = await productRepository.updateProduct(updatedProduct);

  if (!result) {
    throw new Error('Error updating product');
  }

  CacheService.revalidateCacheTag([CACHE_PRODUCTS_TAG]);

  return true;
};

export const ServerDeleteProduct = async (
  context: {
    productRepository: IProductRepository;
  },
  data: {
    prodId: string;
    imageUrl: string;
  },
): Promise<boolean> => {
  const { productRepository } = context;
  const { prodId, imageUrl } = data;

  if (!prodId) {
    throw new Error('Invalid or missing product id');
  }

  //Deleting image from cloudinary
  if (imageUrl) {
    const successDeletingImage = await deleteImageFromCloudinary(imageUrl);

    if (!successDeletingImage) {
      throw new Error('Error deleting cloudinary image');
    }
  }

  const result = await productRepository.deleteProduct(prodId);

  if (!result) {
    throw new Error('Error deleting product');
  }

  CacheService.revalidateCacheTag([CACHE_PRODUCTS_TAG]);

  return true;
};