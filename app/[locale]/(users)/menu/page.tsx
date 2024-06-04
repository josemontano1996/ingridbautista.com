import { Menu } from '@/app/[locale]/(users)/menu/Menu';
import { MenuHeader } from '@/app/[locale]/(users)/menu/MenuHeader';
import { AdvantagesSection } from '@/app/[locale]/(users)/menu/AdvantagesSection';
import MainNavBar from '@/presentation/components/custom/NavBar/MainNavBar';
import { TLocales } from '@/shared/types/TLocales';
import MenuMidNav from '@/app/[locale]/(users)/menu/MenuMidNav';
import { Separator } from '@/presentation/components/ui/separator';
import { ServerGetMenu } from '@/application/use-cases/server-side/ServerMenu';
import { ServerGetProductCategories } from '@/application/use-cases/server-side/ServerProductCategory';
import { MenuRepository } from '@/infrastructure/persistence/repositories/MenuRepository';
import { ProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';
import { TranslatedMenuView } from '@/presentation/classes/TranslatedMenuView';

const MenuPage = async ({
  params: { locale },
}: {
  params: { locale: TLocales };
}) => {
  const menu = await ServerGetMenu({
    menuRepository: new MenuRepository(),
  });

  const categories = await ServerGetProductCategories({
    productCategoryRepository: new ProductCategoryRepository(),
  });

  return (
    <>
      <MainNavBar
        locale={locale}
        midNavBarElement={<MenuMidNav locale={locale} />}
      />
      <MenuHeader locale={locale} />
      <AdvantagesSection locale={locale} />
      <Separator className="mx-auto my-8 w-[70%]" />
      <Menu
        locale={locale}
        menuInstance={new TranslatedMenuView(locale, menu, categories)}
      />
    </>
  );
};

export default MenuPage;
