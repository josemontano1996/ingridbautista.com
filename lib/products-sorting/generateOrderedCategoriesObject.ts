import { IMenuItem } from '@/shared/interfaces/IMenuItem';

/**
 * Generates an ordered categories object based on the given categories array.
 * The categories are sorted based on the 'order' property and returned as an object
 * with category names as keys and empty arrays as values.
 *
 * @param categories - An array of category objects with 'name' and 'order' properties.
 * @returns An object with category names as keys and empty arrays as values.
 */
export const generateOrderedCategoriesObject = (
  categories: { name: string; order: number }[],
) => {
  const fetchedCategories = categories.sort((a, b) => a.order - b.order);

  const orderedCategoriesObject = fetchedCategories.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name.toLowerCase()]: [],
    }),
    {} as Record<string, IMenuItem[]>,
  );

  return orderedCategoriesObject;
};
