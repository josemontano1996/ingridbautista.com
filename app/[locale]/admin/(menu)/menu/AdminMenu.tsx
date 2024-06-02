'use server';

import XDraggableList from '@/presentation/components/custom/XDraggableList';
import { TLocales } from '@/shared/types/TLocales';
import { AdminMenuItemCard } from './AdminMenuItemCard';
import { ITranslatedMenuView } from '@/presentation/classes/TranslatedMenuView';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';
import { capitalize } from '../../../../../shared/utils/capitalize';

type Props = {
  locale: TLocales;
  menuInstance: ITranslatedMenuView;
};

const AdminMenu = async ({ locale, menuInstance }: Props) => {
  const translatedMenu: Record<string, ITranslatedProduct[]> =
    menuInstance.getTranslatedAndSortedMenu();

  return (
    <section className="ml-[5vw] space-y-8 sm:ml-[3vw]">
      {Object.entries(translatedMenu).map(([category, items]) => (
        <div key={category}>
          <h2 className="py-5 text-4xl font-semibold">
            {capitalize(menuInstance.displayCategoryLocaleName(category) || '')}
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
