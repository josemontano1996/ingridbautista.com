'use client';

import { useTranslation } from 'react-i18next';
import { capitalize } from '@/shared/utils/capitalize';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/presentation/components/ui/dialog';

import { buttonVariants } from '@/presentation/components/ui/button';
import CardImage from './CardImage';
import { cn } from '@/shared/utils/utils';
import { ITranslatedProduct } from '@/shared/interfaces/ITranslatedMenu';

export const MenuItemInfoDialog = ({ item }: { item: ITranslatedProduct }) => {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants(), 'text-xl')}>
        {capitalize(t('info'))}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader className="py-6">
          <CardImage name={item.name} image={item.image} />
          <DialogTitle className={cn('text-3xl')}>
            {capitalize(item.name)}
          </DialogTitle>
          {item.allergens && item.allergens?.length > 0 && (
            <DialogDescription className={cn('text-2xl')}>
              {capitalize(t('allergens'))}: {item.allergens.join(', ')}.
            </DialogDescription>
          )}
          <p className="text-2xl">{item.description}</p>
          <p className="text-2xl">
            {capitalize(t('price'))}:{' '}
            <span className="text-3xl"> {item.price} &euro;</span>
            <span className="ml-2 text-lg text-gray-600">{item.portion}</span>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
