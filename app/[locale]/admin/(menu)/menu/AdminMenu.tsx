import { IDbProduct } from '@/shared/interfaces/IDbProduct';
import { IMenuItem } from '@/shared/interfaces/IMenuItem';

import { genenerateMenuItemsArray } from '@/shared/lib/products-sorting/generarteMenuItemsArrayWithLocale';
import { generateTypeOrderedMenu } from '@/shared/lib/products-sorting/generateTypeOrderedMenu';

import XDraggableList from '@/presentation/components/custom/XDraggableList';

import { displayCategoryLocaleName } from '@/shared/lib/products-sorting/displayCategoryLocaleName';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';

import { TLocales } from '@/shared/types/TLocales';
import { AdminMenuItemCard } from './AdminMenuItemCard';

const AdminMenu = ({
  locale,
  dbProducts,
  fetchedCategories,
}: {
  locale: TLocales;
  dbProducts: IDbProduct[] | null;
  fetchedCategories: IFecthedCategory[] | null;
}) => {
  if (!dbProducts || !fetchedCategories) return null;

  const menuItems = genenerateMenuItemsArray(dbProducts, locale);

  const orderedByTypeMenu = generateTypeOrderedMenu(
    menuItems,
    fetchedCategories,
  );

  return (
    <section className="ml-[5vw] space-y-8 sm:ml-[3vw]">
      {Object.entries(orderedByTypeMenu).map(([category, items]) => (
        <div key={category}>
          <h2 className="py-5 text-4xl font-semibold">
            {displayCategoryLocaleName(locale, category, fetchedCategories)
              ? displayCategoryLocaleName(
                  locale,
                  category,
                  fetchedCategories,
                )?.toUpperCase()
              : null}
          </h2>
          <XDraggableList styling="flex gap-16 overflow-x-hidden">
            {items.map((item: IMenuItem, i) => (
              <AdminMenuItemCard key={i} item={item} locale={locale} />
            ))}
          </XDraggableList>
        </div>
      ))}
    </section>
  );
};

export default AdminMenu;
