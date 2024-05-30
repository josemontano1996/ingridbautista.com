import { IDbProduct } from '@/shared/interfaces/IDbProduct';
import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import { TLocales } from '@/shared/types/TLocales';
import { translateAllergens } from '@/shared/utils/translateAllergens';

/**
 * Generates an array of menu items based on the provided products and locale.
 * @param products - The array of products to generate menu items from.
 * @param locale - The locale to use for retrieving the name and description of each product.
 * @returns An array of menu items.
 */
export const genenerateMenuItemsArray = (
  products: IDbProduct[],
  locale: TLocales,
): IMenuItem[] => {
  let menuItems: IMenuItem[] = products.map((product) => ({
    _id: product._id,
    name: product[locale].name,
    description: product[locale].description,
    image: product.image,
    price: product.price,
    portion: product.portion,
    type: product.type,
    allergens: product.allergens
      ? translateAllergens(product.allergens, locale)
      : null,
  }));

  menuItems.sort((a, b) => a.name.localeCompare(b.name));

  return menuItems;
};
