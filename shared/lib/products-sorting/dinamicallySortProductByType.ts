

/**
 * Dynamically sorts an array of products by their type.
 *
 * @param products - The array of products to be sorted.
 * @returns An object containing the sorted products grouped by type.
 */
export const dinamicallySortProductByType = (products: IMenuItem[]) => {
  const sortedByTypeProducts = products.reduce(
    (acc, item) => {
      // Check if category already exists
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, IMenuItem[]>,
  );

  return sortedByTypeProducts;
};
