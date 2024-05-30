import { Menu } from '@/app/[locale]/(users)/menu/Menu';
import { MenuHeader } from '@/app/[locale]/(users)/menu/MenuHeader';
import { AdvantagesSection } from '@/app/[locale]/(users)/menu/AdvantagesSection';
import MainNavBar from '@/components/custom/NavBar/MainNavBar';
import { dbConnect, dbDisconnect } from '@/database/db';
import { IDbProduct } from '@/shared/interfaces/IDbProduct';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';
import { TLocales } from '@/shared/types/TLocales';
import MenuMidNav from '@/app/[locale]/(users)/menu/MenuMidNav';
import { Separator } from '@/components/ui/separator';

const MenuPage = async ({
  params: { locale },
}: {
  params: { locale: TLocales };
}) => {
  let dbProducts: IDbProduct[] | null = null;
  let fetchedCategories: IFecthedCategory[] | null = null;

  try {
    await dbConnect();

    dbProducts = await Product.find().lean();
    if (!dbProducts) return null;

    fetchedCategories = await ProductCategory.find().lean().sort({ order: 1 });
    if (!fetchedCategories) return null;

    for (const product of dbProducts) {
      product._id = product._id!.toString();
    }

    for (const category of fetchedCategories) {
      category._id = category._id!.toString();
    }
  } catch (error) {
    console.error(error);
  } /* finally {
    await dbDisconnect();
  } */
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
        dbProducts={dbProducts}
        fetchedCategories={fetchedCategories}
      />
    </>
  );
};

export default MenuPage;
