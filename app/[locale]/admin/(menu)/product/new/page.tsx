import NewProductForm from '@/app/[locale]/admin/(menu)/product/new/NewProductForm';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';

import { ServerGetProductCategories } from '@/application/use-cases/server-side/ServerProductCategory';
import { TLocales } from '@/shared/types/TLocales';
import { ProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';
import { serverRedirect } from '@/application/utils/serverRedirection';

const NewProductPage = async ({
  params: { locale },
}: {
  params: { locale: TLocales };
}) => {
  const categories = await ServerGetProductCategories({
    productCategoryRepository: new ProductCategoryRepository(),
  });

  if (!categories) {
    return serverRedirect({
      url: '/admin/menu',
      message:
        'No hay categorías disponibles, por favor crea una antes de agregar un producto.',
      locale,
      success: false,
    });
  }

  return (
    <MaxWidthWrapper>
      <h1 className="text-center text-3xl font-bold">Nuevo producto</h1>
      <NewProductForm categories={categories} />
    </MaxWidthWrapper>
  );
};

export default NewProductPage;
