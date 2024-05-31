'use client';


import { Button, buttonVariants } from '@/presentation/components/ui/button';
import { CardFooter } from '@/presentation/components/ui/card';
import { MenuItemInfoDialog } from '../../../../../presentation/components/custom/MenuItemInfoDialog';
import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import LocaleLink from '@/presentation/components/custom/LocaleLink';
import { DeleteProductButton } from './DeleteProductButton';
import { TLocales } from '../../../../../shared/types/TLocales';
import { cn } from '@/shared/utils/utils';

export const FooterMenuCard = ({
  locale,
  item,
}: {
  locale: TLocales;
  item: IMenuItem;
}) => {
  return (
    <CardFooter className={cn('flex justify-between p-0 py-2')}>
      <MenuItemInfoDialog item={item} locale={locale} />

      <LocaleLink
        styling={cn(buttonVariants({ variant: 'secondary' }), 'text-xl')}
        path={`/admin/product/${item._id}`}
        isNextLink={false}
      >
        Edit
      </LocaleLink>
      <DeleteProductButton prodId={item._id as string} imageUrl={item.image} />
    </CardFooter>
  );
};
