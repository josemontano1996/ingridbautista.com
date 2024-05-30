import XDraggableList from '@/presentation/components/custom/XDraggableList';
import { IDbProduct } from '@/shared/interfaces/IDbProduct';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import { displayCategoryLocaleName } from '@/shared/lib/products-sorting/displayCategoryLocaleName';
import { genenerateMenuItemsArray } from '@/shared/lib/products-sorting/generarteMenuItemsArrayWithLocale';
import { generateTypeOrderedMenu } from '@/shared/lib/products-sorting/generateTypeOrderedMenu';
import { MenuItemCard } from './MenuItemCard';
import { TLocales } from '@/shared/types/TLocales';
import { Separator } from '@/presentation/components/ui/separator';

export const Menu = ({
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
    true,
  );

  return (
    <section id="menu" className="ml-[5vw] space-y-8 sm:ml-[3vw]">
      {Object.entries(orderedByTypeMenu).map(
        ([category, items]) =>
          items.length > 0 && (
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
              <XDraggableList styling="grid w-[92vw] grid-flow-col auto-cols-min gap-12 overflow-x-scroll lg:overflow-x-hidden">
                {items.map((item: IMenuItem, i) => (
                  <MenuItemCard key={i} item={item} locale={locale} />
                ))}
              </XDraggableList>
              <Separator className="mx-auto my-8 hidden w-[70%] lg:block" />
            </div>
          ),
      )}
    </section>
  );
};
