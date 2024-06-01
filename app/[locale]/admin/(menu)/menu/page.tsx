import AdminMenu from '@/app/[locale]/admin/(menu)/menu/AdminMenu';
import LocaleLink from '@/presentation/components/custom/LocaleLink';
import MaxWidthWrapper from '@/presentation/components/custom/wrappers/MaxWidthWrapper';
import { buttonVariants } from '@/presentation/components/ui/button';
import { TLocales } from '@/shared/types/TLocales';
import { cn } from '@/shared/utils/utils';

const AdminMenuPage = async ({
  params: { locale },
}: {
  params: { locale: TLocales };
}) => {
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
      <AdminMenu locale={locale} />
    </>
  );
};

export default AdminMenuPage;
