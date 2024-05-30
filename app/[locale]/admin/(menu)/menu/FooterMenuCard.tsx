'use client';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { MenuItemInfoDialog } from '../../../../../components/custom/MenuItemInfoDialog';
import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import LocaleLink from '@/components/custom/LocaleLink';
import { DeleteProductButton } from './DeleteProductButton';
import { TLocales } from '../../../../../shared/types/TLocales';

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