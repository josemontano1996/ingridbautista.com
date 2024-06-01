'use server';

import XDraggableList from '@/presentation/components/custom/XDraggableList';
import { displayCategoryLocaleName } from '@/shared/lib/products-sorting/displayCategoryLocaleName';

import { TLocales } from '@/shared/types/TLocales';
import { AdminMenuItemCard } from './AdminMenuItemCard';
import { MenuDto } from '@/application/dto/MenuDto';
import { ProductCategoryDto } from '@/application/dto/ProductCategoryDto';
import { ServerGetMenu } from '@/application/use-cases/server-side/ServerMenu';
import { ServerGetProductCategories } from '@/application/use-cases/server-side/ServerProductCategory';
import { MenuRepository } from '@/infrastructure/persistence/respositories/MenuRepository';
import { ProductCategoryRepository } from '@/infrastructure/persistence/respositories/ProductCategoryRepository';
import { TranslatedMenuView } from '@/presentation/classes/TranslatedMenuView';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';

const AdminMenu = async ({ locale }: { locale: TLocales }) => {
  let menu: MenuDto | null = null;
  let fetchedCategories: ProductCategoryDto[] | null = null;

  let translatedMenu: Record<string, ITranslatedProduct[]> = {};

  try {
    menu = await ServerGetMenu({ menuRepository: new MenuRepository() });

    fetchedCategories = await ServerGetProductCategories({
      productCategoryRepository: new ProductCategoryRepository(),
    });

    const menuInstace = new TranslatedMenuView(locale, menu, fetchedCategories);

    translatedMenu = menuInstace.getTranslatedAndSortedMenu();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="ml-[5vw] space-y-8 sm:ml-[3vw]">
      {Object.entries(translatedMenu).map(([category, items]) => (
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
            {items.map((item: ITranslatedProduct, i) => (
              <AdminMenuItemCard key={i} item={item} locale={locale} />
            ))}
          </XDraggableList>
        </div>
      ))}
    </section>
  );
};

export default AdminMenu;
