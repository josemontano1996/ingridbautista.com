import NewProductForm from '@/app/[locale]/admin/(menu)/product/new/NewProductForm';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';

import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';

import { connectDB } from '@/infrastructure/persistence/database-config';
import ProductCategory from '@/infrastructure/persistence/models/ProductCategory';

const NewProductPage = async () => {
  let categories: IFecthedCategory[] = [];

  try {
    await connectDB();

    categories = await ProductCategory.find().sort({ order: 1 }).lean();

    if (categories) {
      for (const category of categories) {
        category._id = category._id!.toString();
      }
    }
  } catch (error) {
    console.error(error);
  } 

  return (
    <MaxWidthWrapper>
      <h1 className="text-center text-3xl font-bold">Nuevo producto</h1>
      <NewProductForm categories={categories} />
    </MaxWidthWrapper>
  );
};

export default NewProductPage;
