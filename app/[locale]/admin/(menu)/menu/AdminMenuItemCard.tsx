'use client';

import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/presentation/components/ui/card';
import { cn } from '@/shared/lib/utils';
import { truncateString } from '@/shared/utils/truncateString';
import { FooterMenuCard } from './FooterMenuCard';
import { capitalize } from '@/shared/utils/capitalize';
import CardImage from '@/presentation/components/custom/CardImage';
import { TLocales } from '@/shared/types/TLocales';

export const AdminMenuItemCard = ({
  locale,
  item,
}: {
  locale: TLocales;
  item: IMenuItem;
}) => {
  return (
    <li>
      <Card
        className={cn(
          'flex h-[675px] flex-col justify-between space-y-2 border-0 text-xl sm:w-[350px]',
        )}
      >
        <CardHeader className={cn('p-0')}>
          <CardImage name={item.name} image={item.image} />
          <CardTitle className={cn('text-2xl')}>
            {capitalize(item.name)}
          </CardTitle>
          <CardDescription className={cn('text-xl')}>
            Alérgenos:{' '}
            {item.allergens && item.allergens?.length > 0
              ? item.allergens.join(', ')
              : 'Ninguno'}
            .
          </CardDescription>
        </CardHeader>
        <CardContent className={cn('space-y-3 p-0')}>
          <p className="text-xl">{truncateString(item.description, 200)}</p>
          <p className="text-2xl">
            Precio: <span className="text-3xl"> {item.price} &euro;</span>
            <span className="ml-2 text-lg text-gray-600">{item.portion}</span>
          </p>
        </CardContent>
        <FooterMenuCard item={item} locale={locale} />
      </Card>
    </li>
  );
};
