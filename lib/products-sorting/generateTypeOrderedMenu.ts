import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import { generateOrderedCategoriesObject } from './generateOrderedCategoriesObject';
import { populateCategoriesWithMenuItems } from './populateCategoriesWithMenuItems';

/**
 * Generates a type-ordered menu based on the provided menu items and categories.
 * @param menuItems - An array of menu items.
 * @param categories - An array of category objects containing the name and order of each category.
 * @returns A record object where the keys are category names and the values are arrays of menu items belonging to each category.
 */
export const generateTypeOrderedMenu = (
  menuItems: IMenuItem[],
  categories: { name: string; order: number }[],
  strictMode: boolean = false,
): Record<string, IMenuItem[]> => {
  const orderedCategoriesObject = generateOrderedCategoriesObject(categories);

  const populatedCategories = populateCategoriesWithMenuItems(
    menuItems,
    orderedCategoriesObject,
    strictMode,
  );

  return populatedCategories;
};
