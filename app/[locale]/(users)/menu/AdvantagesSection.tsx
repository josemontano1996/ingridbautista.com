import React from 'react';
import {
  ChefHatIcon,
  CookingPotIcon,
  BadgeCheckIcon,
  MapPinnedIcon,
} from 'lucide-react';
import { TLocales } from '@/shared/types/TLocales';
import { AdvantageCard } from '@/app/[locale]/(users)/menu/AdvantageCard';
import { IAdvantage } from '@/shared/interfaces/IAdvantage';

interface Props {
  locale: TLocales;
}

const AdvantagesArray: IAdvantage[] = [
  {
    icon: ChefHatIcon,
    title: 'Experience',
    text: 'Over 30 years professional experience as a Chef',
  },
  {
    icon: CookingPotIcon,
    title: 'Eat slow, cook slow',
    text: 'Enjoy the best slow cooked traditional food',
  },
  {
    icon: BadgeCheckIcon,
    title: 'Eat fresh',
    text: 'We only use the best quality fresh ingredients',
  },
  {
    icon: MapPinnedIcon,
    title: 'Support local produce',
    text: 'We only supply from the best local producers',
    className: 'hidden sm:flex lg:hidden',
  },
];

export const AdvantagesSection: React.FC<Props> = () => {
  return (
    <section className="my-12 text-center">
      <h2 className="mb-12 text-4xl font-semibold">Satifaction Guaranteed</h2>
      <ul className="grid grid-cols-1 items-center justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
        {AdvantagesArray.map((ad, i) => (
          <AdvantageCard
            key={i}
            icon={ad.icon}
            title={ad.title}
            text={ad.text}
            className={ad.className ? ad.className : ''}
          />
        ))}
      </ul>
    </section>
  );
};
