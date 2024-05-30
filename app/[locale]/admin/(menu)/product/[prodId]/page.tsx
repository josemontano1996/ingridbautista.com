import { redirect } from 'next/navigation';
import { dbConnect, dbDisconnect } from '@/database/db';
import EditProductForm from '@/app/[locale]/admin/(menu)/product/[prodId]/EditProductForm';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';

interface Props {
  params: { prodId: string };
}

export const revalidate = 0;

const EditProductPage = async ({ params: { prodId } }: Props) => {
  let categories: IFecthedCategory[] = [];
  let product = null;

  try {
    await dbConnect();

    product = await Product.findOne({ _id: prodId }).lean();

    product ? (product._id = product._id!.toString()) : null;

    categories = await ProductCategory.find().sort({ order: 1 }).lean();

    if (categories) {
      for (const category of categories) {
        category._id = category._id!.toString();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    await dbDisconnect();
  }

  if (!product) {
    //redirect throws error so it should be called outsite of trycatch
    return redirect('/admin/menu?error=Producto no encontrado');
  }

  return (
    <MaxWidthWrapper>
      <h1 className="text-center text-3xl font-bold">Nuevo producto</h1>
      <EditProductForm product={product} categories={categories} />
    </MaxWidthWrapper>
  );
};

export default EditProductPage;
