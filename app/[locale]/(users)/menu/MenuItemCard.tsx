import initTranslations from '@/lib/i18n';
import { TLocales } from '@/shared/types/TLocales';
import { cn } from '@/lib/utils';
import { IMenuItem } from '@/shared/interfaces/IMenuItem';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { truncateString } from '@/shared/utils/truncateString';
import { capitalize } from '@/shared/utils/capitalize';
import CardImage from '@/components/custom/CardImage';
import { MenuItemInfoDialog } from '@/components/custom/MenuItemInfoDialog';

export const MenuItemCard = async ({
  locale,
  item,
}: {
  locale: TLocales;
  item: IMenuItem;
}) => {
  const { t } = await initTranslations(locale, ['menu-page']);

  return (
    <li className="w-[75vw] sm:w-[350px]">
      <Card
        className={cn(
          'flex h-full flex-col justify-between space-y-2 border-0 pb-4',
        )}
      >
        <CardHeader className={cn('p-0')}>
          <CardImage name={item.name} image={item.image} />
          <CardTitle className={cn('text-2xl')}>
            {capitalize(item.name)}
          </CardTitle>
          {item.allergens && item.allergens?.length > 0 && (
            <CardDescription className={cn('text-xl')}>
              {capitalize(t('allergens'))}: {item.allergens.join(', ')}.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className={cn('space-y-3 p-0')}>
          <p className="text-xl">{truncateString(item.description, 200)}</p>
          <p className="text-2xl">
            {capitalize(t('price'))}:{' '}
            <span className="text-3xl"> {item.price} &euro;</span>
            <span className="ml-2 text-lg text-gray-600">{item.portion}</span>
          </p>
        </CardContent>
        <CardFooter className={cn('flex flex-col items-center pt-3')}>
          <MenuItemInfoDialog item={item} locale={locale} />
        </CardFooter>
      </Card>
    </li>
  );
};
