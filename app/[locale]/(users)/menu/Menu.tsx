import XDraggableList from '@/presentation/components/custom/XDraggableList';
import { MenuItemCard } from './MenuItemCard';
import { Separator } from '@/presentation/components/ui/separator';
import { capitalize } from '@/shared/utils/capitalize';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';
import { ITranslatedMenuView } from '@/presentation/classes/TranslatedMenuView';
import { TLocales } from '@/shared/types/TLocales';

type Props = {
  locale: TLocales;
  menuInstance: ITranslatedMenuView;
};

export const Menu = ({ locale, menuInstance }: Props) => {
  const translatedMenu: Record<string, ITranslatedProduct[]> =
    menuInstance.getTranslatedAndSortedMenu();

  return (
    <section id="menu" className="ml-[5vw] space-y-8 sm:ml-[3vw]">
      {Object.entries(translatedMenu).map(
        ([category, items]) =>
          items.length > 0 && (
            <div key={category}>
              <h2 className="py-5 text-4xl font-semibold">
                {capitalize(
                  menuInstance.displayCategoryLocaleName(category) || '',
                )}
              </h2>
              <XDraggableList styling="grid w-[92vw] grid-flow-col auto-cols-min gap-12 overflow-x-scroll lg:overflow-x-hidden">
                {items.map((item: ITranslatedProduct, i) => (
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
