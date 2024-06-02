import LocaleLink from '@/presentation/components/custom/LocaleLink';
import { buttonVariants } from '@/presentation/components/ui/button';
import { cn } from '@/shared/utils/utils';
import { TLocales } from '../../../../../shared/types/TLocales';

const AdminMenuNav = ({ locale }: { locale: TLocales }) => {
  return (
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
  );
};

export default AdminMenuNav;
