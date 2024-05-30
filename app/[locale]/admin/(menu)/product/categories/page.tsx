import { CreateCategoryForm } from '@/app/[locale]/admin/(menu)/product/categories/CreateCategoryForm';
import { ManageCategorySection } from '@/app/[locale]/admin/(menu)/product/categories/ManageCategorySection';
import { CategoryStoreZustandInitializer } from '@/components/zustand-initializer/CategoryStoreZustandInitializer';
import { dbConnect } from '@/database/db';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import ProductCategory from '@/models/ProductCategory';

const CategoryManagementPage = async () => {
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
  }
 */
  return (
    <div className="px-[3vw]">
      <CategoryStoreZustandInitializer fetchedCategories={categories} />

      <h1 className="py-2 text-center text-4xl font-semibold">
        Administracion de Categorias
      </h1>

      <div className="mt-8 flex justify-between space-x-8">
        <section className="w-[300px]">
          <h2 className="mb-2 text-3xl">Crear Categoria</h2>
          <CreateCategoryForm />
        </section>

        <div className="border"></div>

        <section className="w-[20vw] flex-1">
          <h2 className="mb-2 text-3xl">Lista de Categorias</h2>
          <ManageCategorySection />
        </section>
      </div>
    </div>
  );
};

export default CategoryManagementPage;
