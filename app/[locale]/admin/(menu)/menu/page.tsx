import AdminMenu from '@/app/[locale]/admin/(menu)/menu/AdminMenu';
import { connectDB } from '@/infrastructure/persistence/database-config';
import Product from '@/infrastructure/persistence/models/Product';
import ProductCategory from '@/infrastructure/persistence/models/ProductCategory';
import LocaleLink from '@/presentation/components/custom/LocaleLink';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import { buttonVariants } from '@/presentation/components/ui/button';

import { IDbProduct } from '@/shared/interfaces/IDbProduct';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';

import { TLocales } from '@/shared/types/TLocales';
import { cn } from '@/shared/utils/utils';

const AdminMenuPage = async ({
  params: { locale },
}: {
  params: { locale: TLocales };
}) => {
  let dbProducts: IDbProduct[] | null = null;
  let fetchedCategories: IFecthedCategory[] | null = null;

  try {
    await connectDB();

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
  } 
  
  return (
    <>
      <MaxWidthWrapper>
        <h1 className="py-4 text-center text-4xl font-semibold sm:text-5xl lg:text-6xl">
          Administracion del Menú
        </h1>
        <div className="flex items-center justify-center space-x-3">
          <LocaleLink
            isNextLink={false}
            path="/admin/product/categories"
            styling={cn(buttonVariants(), 'text-2xl')}
          >
            Categorias
          </LocaleLink>
          <LocaleLink
            isNextLink={false}
            path="/admin/product/new"
            styling={cn(buttonVariants(), 'text-2xl')}
          >
            Nuevo Producto
          </LocaleLink>
        </div>
      </MaxWidthWrapper>
      <AdminMenu
        locale={locale}
        dbProducts={dbProducts}
        fetchedCategories={fetchedCategories}
      />
    </>
  );
};

export default AdminMenuPage;
