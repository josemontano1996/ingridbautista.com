'use client';

import { buttonVariants } from '@/presentation/components/ui/button';
import { CardFooter } from '@/presentation/components/ui/card';
import { MenuItemInfoDialog } from '../../../../../presentation/components/custom/MenuItemInfoDialog';

import LocaleLink from '@/presentation/components/custom/LocaleLink';
import { DeleteProductButton } from './DeleteProductButton';
import { TLocales } from '../../../../../shared/types/TLocales';
import { cn } from '@/shared/utils/utils';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';

export const FooterMenuCard = ({
  locale,
  item,
}: {
  locale: TLocales;
  item: ITranslatedProduct;
}) => {
  return (
    <CardFooter className={cn('flex justify-between p-0 py-2')}>
      <MenuItemInfoDialog item={item} />

      <LocaleLink
        styling={cn(buttonVariants({ variant: 'secondary' }), 'text-xl')}
        path={`/admin/product/${item.id}`}
        isNextLink={false}
      >
        Edit
      </LocaleLink>
      <DeleteProductButton prodId={item.id as string} imageUrl={item.image} />
    </CardFooter>
  );
};
