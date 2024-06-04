import { EditProductForm } from '@/app/[locale]/admin/(menu)/product/[prodId]/EditProductForm';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import { ServerGetProductById } from '@/application/use-cases/server-side/ServerProduct';
import { ServerGetProductCategories } from '@/application/use-cases/server-side/ServerProductCategory';
import { ProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';
import { ProductRepository } from '@/infrastructure/persistence/repositories/ProductRepository';
import { redirect } from 'next/navigation';
import { serverRedirect } from '@/application/utils/serverRedirection';
import { TLocales } from '@/shared/types/TLocales';

interface Props {
  params: { prodId: string; locale: TLocales };
}

export const revalidate = 0;

const EditProductPage = async ({ params: { locale, prodId } }: Props) => {
  const product = await ServerGetProductById(
    { productRepository: new ProductRepository() },
    { prodId },
  );

  const categories = await ServerGetProductCategories({
    productCategoryRepository: new ProductCategoryRepository(),
  });

  if (!product) {
    return serverRedirect({
      url: '/admin/menu',
      message: 'Producto no encontrado',
      locale,
      success: false,
    });
  }

  if (categories.length === 0) {
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
      <EditProductForm product={product} categories={categories} />
    </MaxWidthWrapper>
  );
};

export default EditProductPage;
