import AdminMenu from '@/app/[locale]/admin/(menu)/menu/AdminMenu';
import { ServerGetMenu } from '@/application/use-cases/server-side/ServerMenu';
import { ServerGetProductCategories } from '@/application/use-cases/server-side/ServerProductCategory';
import initTranslations from '@/infrastructure/i18n/i18n';
import { MenuRepository } from '@/infrastructure/persistence/repositories/MenuRepository';
import { ProductCategoryRepository } from '@/infrastructure/persistence/repositories/ProductCategoryRepository';
import { TranslatedMenuView } from '@/presentation/classes/TranslatedMenuView';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import TranslationsProvider from '@/presentation/components/providers/TranslationsProvider';
import { TLocales } from '@/shared/types/TLocales';
import AdminMenuNav from './AdminMenuNav';

const AdminMenuPage = async ({
  params: { locale },
}: {
  params: { locale: TLocales };
}) => {
  const { t, resources } = await initTranslations(locale, ['menu-page']);

  const menu = await ServerGetMenu({
    menuRepository: new MenuRepository(),
  });

  const categories = await ServerGetProductCategories({
    productCategoryRepository: new ProductCategoryRepository(),
  });

  return (
    <TranslationsProvider locale={locale} namespaces={[]} resources={resources}>
      <MaxWidthWrapper>
        <h1 className="py-4 text-center text-4xl font-semibold sm:text-5xl lg:text-6xl">
          Administracion del Menú
        </h1>
        <AdminMenuNav locale={locale} />
      </MaxWidthWrapper>
      <AdminMenu
        locale={locale}
        menuInstance={new TranslatedMenuView(locale, menu, categories)}
      />
    </TranslationsProvider>
  );
};

export default AdminMenuPage;
