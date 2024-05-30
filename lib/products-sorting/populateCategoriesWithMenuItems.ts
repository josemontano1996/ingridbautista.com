import { IMenuItem } from '@/shared/interfaces/IMenuItem';

/**
 * Populates categories with menu items.
 *
 * @param menuItems - The array of menu items.
 * @param categories - The object containing categories as keys and arrays of menu items as values.
 * @param strictMode - A boolean indicating whether strict mode is enabled, when enabled only the items that have a matching category will be included in the object, if it is not enabled and there is not matching category for the item, a category will be created for display.
 * @returns The updated categories object with menu items added.
 */
export const populateCategoriesWithMenuItems = (
  menuItems: IMenuItem[],
  categories: Record<string, IMenuItem[]>,
  strictMode: boolean,
) => {
  const populatedCategories = menuItems.reduce((acc, item) => {
    // Check if the key exists before pushing
    const categoryKey = item.type.toLowerCase();
    if (acc.hasOwnProperty(categoryKey)) {
      // Check if the category exists in the accumulator object
      acc[categoryKey].push(item);
    } else {
      // If strict mode is enabled, do not add the item to the accumulator object
      if (!strictMode) {
        acc[categoryKey] = [item];
      }
    }
    return acc as Record<string, IMenuItem[]>;
  }, categories);
  return populatedCategories;
};
