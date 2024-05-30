import NewProductForm from '@/app/[locale]/admin/(menu)/product/new/NewProductForm';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import { dbConnect } from '@/database/db';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import ProductCategory from '@/models/ProductCategory';

const NewProductPage = async () => {
  let categories: IFecthedCategory[] = [];

  try {
    await dbConnect();

    categories = await ProductCategory.find().sort({ order: 1 }).lean();

    if (categories) {
      for (const category of categories) {
        category._id = category._id!.toString();
      }
    }
  } catch (error) {
    console.error(error);
  } /* finally {
    await dbDisconnect();
  } */

  return (
    <MaxWidthWrapper>
      <h1 className="text-center text-3xl font-bold">Nuevo producto</h1>
      <NewProductForm categories={categories} />
    </MaxWidthWrapper>
  );
};

export default NewProductPage;
