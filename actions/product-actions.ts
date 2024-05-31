'use server';

import { z } from 'zod';
import { IProductActionResponse } from '@/shared/interfaces/IActionResponses';
import {
  createProductFormSchema,
  updateProductFormSchema,
} from '@/shared/lib/schemas/productFormSchemas';

import { IDbProduct } from '@/shared/interfaces/IDbProduct';

import { revalidatePath } from 'next/cache';
import {
  deleteImageFromCloudinary,
  updateImageFromCloudinary,
  uploadImageToCloudinary,
} from '@/infrastructure/online-storage/cloudinary';
import Product from '@/infrastructure/persistence/models/Product';
import { connectDB } from '@/infrastructure/persistence/database-config';

export const createProductAction = async (
  values: z.infer<typeof createProductFormSchema>,
): Promise<IProductActionResponse> => {
  const parsed = createProductFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  let imageUrl = null;

  try {
    imageUrl = await uploadImageToCloudinary(parsed.data.image as string);

    if (!imageUrl) {
      return {
        success: false,
        message: 'Error uploading image',
      };
    }

    const productInstance: any = new Product({
      ...parsed.data,
      image: imageUrl,
    });

    await connectDB();

    const result = await productInstance.save();

    if (!result) {
      if (imageUrl) {
        await deleteImageFromCloudinary(imageUrl);
      }
      throw new Error(result);
    }

    revalidatePath('/[locale]/(users)/menu', 'layout');
    revalidatePath('/[locale]/admin/(menu)', 'layout');
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    if (imageUrl) {
      await deleteImageFromCloudinary(imageUrl);
    }

    return {
      success: false,
      message: 'Error creating category, try again later.',
    };
  }
};

export const updateProductAction = async (
  values: z.infer<typeof updateProductFormSchema>,
  id: string,
): Promise<IProductActionResponse> => {
  const parsed = updateProductFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  let imageUrl = null;

  try {
    await connectDB();
    const oldProduct = await Product.findOne({ _id: id }).lean();

    if (!oldProduct) {
      return {
        success: false,
        message: 'Product could not be found',
      };
    }

    if (parsed.data.image && parsed.data.image !== oldProduct.image) {
      imageUrl = await updateImageFromCloudinary(
        parsed.data.image as string,
        oldProduct.image,
      );
    } else {
      imageUrl = oldProduct.image;
    }

    const result = await Product.updateOne(
      { _id: id },
      {
        ...parsed.data,
        image: imageUrl,
      },
    );

    if (!result) {
      throw new Error(result);
    }

    revalidatePath('/[locale]/(users)/menu', 'layout');
    revalidatePath('/[locale]/admin/(menu)', 'layout');
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
  if (!prodId) {
    return {
      success: false,
      message: 'Invalid data',
    };
  }

  try {
    //I am doing this if check in case something went wrong and the image was deleted
    //but we had an error deleting the product in the DB, giving an empty imageUrl
    if (imageUrl) {
      const successDeletingImage = deleteImageFromCloudinary(imageUrl);

      if (!successDeletingImage) {
        return {
          success: false,
          message: 'Error deleting image',
        };
      }
    }
    await connectDB();
    const result = await Product.deleteOne({ _id: prodId });

    if (!result) {
      throw new Error(result);
    }

    revalidatePath('/[locale]/(users)/menu', 'layout');
    revalidatePath('/[locale]/admin/(menu)', 'layout');
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
