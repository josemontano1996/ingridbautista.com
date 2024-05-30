'use server';
import { z } from 'zod';

import { dbConnect, dbDisconnect } from '@/database/db';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import ProductCategory from '@/models/ProductCategory';
import { ICategoryActionResponse } from '@/shared/interfaces/IActionResponses';
import { categoryFormSchema } from '@/shared/lib/schemas/categoryFormSchema';
import { revalidatePath } from 'next/cache';

export const createCategoryAction = async (
  values: z.infer<typeof categoryFormSchema>,
): Promise<ICategoryActionResponse> => {
  const parsed = categoryFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  try {
    const category: IFecthedCategory = {
      name: parsed.data.name,
      order: parsed.data.order,
      en: parsed.data.en,
      fr: parsed.data.fr,
    };

    await dbConnect();
    const newCategory = new ProductCategory(category);

    const result = await newCategory.save();

    if (!result) {
      throw new Error(result);
    }

    revalidatePath('/[locale]/(users)/menu', 'layout');
    revalidatePath('/[locale]/admin/(menu)', 'layout');
    return {
      success: true,
      payload: JSON.parse(JSON.stringify(category)),
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Error creating category, check if category already exists',
    };
  } finally {
    await dbDisconnect();
  }
};

export const updateCategoryAction = async (
  values: z.infer<typeof categoryFormSchema>,
): Promise<ICategoryActionResponse> => {
  const parsed = categoryFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: 'Invalid form data',
    };
  }

  try {
    const { name, order, en, fr, _id }: IFecthedCategory = parsed.data;

    await dbConnect();

    const updatedData = await ProductCategory.findOneAndUpdate(
      { _id },
      { name, order, en, fr },
      { new: true },
    ).lean();

    if (!updatedData) {
      throw new Error('Error updating data on line 80. updateCategoryAction');
    }

    revalidatePath('/[locale]/(users)/menu', 'layout');
    revalidatePath('/[locale]/admin/(menu)', 'layout');
    return {
      success: true,
      payload: JSON.parse(JSON.stringify(updatedData)),
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'Error updating category, check if category already exists.',
    };
  } finally {
    await dbDisconnect();
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
    await dbConnect();

    const result = await ProductCategory.deleteOne({ name: categoryName });

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
      message: 'Error deleting category, try again later',
    };
  } finally {
    await dbDisconnect();
  }
};
