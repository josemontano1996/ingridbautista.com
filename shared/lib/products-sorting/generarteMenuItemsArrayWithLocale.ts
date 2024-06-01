import { MenuDto } from '@/application/dto/MenuDto';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';

import { TLocales } from '@/shared/types/TLocales';
import { translateAllergens } from '@/shared/utils/translateAllergens';

/**
 * Generates an array of menu items based on the provided products and locale.
 * @param products - The array of products to generate menu items from.
 * @param locale - The locale to use for retrieving the name and description of each product.
 * @returns An array of menu items.
 */
export const genenerateMenuItemsArray = (
  products: MenuDto,
  locale: TLocales,
): ITranslatedProduct[] => {
  let menuItems: ITranslatedProduct[] = products.map((product) => ({
    id: product.id!,
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
