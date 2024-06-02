import { ServerGetProductCategories } from '@/application/use-cases/server-side/ServerProductCategory';
import { ProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';
import { CategoryStoreZustandInitializer } from '@/presentation/components/zustand-initializer/CategoryStoreZustandInitializer';
import { CreateCategoryForm } from './CreateCategoryForm';
import { ManageCategorySection } from './ManageCategorySection';

const CategoryManagementPage = async () => {
  const categories = await ServerGetProductCategories({
    productCategoryRepository: new ProductCategoryRepository(),
  });

  return (
    <div className="px-[3vw]">
      <CategoryStoreZustandInitializer categories={categories} />

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
