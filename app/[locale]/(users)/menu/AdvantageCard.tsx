import React from 'react';
import { IAdvantage } from '@/shared/interfaces/IAdvantage';
import { cn } from '@/shared/lib/utils';

/**
 * Renders a card component for displaying an advantage.
 */

export const AdvantageCard: React.FC<IAdvantage> = ({
  className,
  icon: Icon,
  title,
  text,
  iconSize = 24,
}) => {
  return (
    <li
      className={cn(
        'flex h-full w-[250px] flex-col items-center space-y-1 text-center',
        className,
      )}
    >
      <Icon size={iconSize} />
      <h4 className="text-3xl font-medium italic">{title}</h4>
      <p className="text-lg text-neutral-700 lg:text-xl">{text}</p>
    </li>
  );
};
