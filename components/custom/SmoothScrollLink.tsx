'use client';

import { FC, ReactNode } from 'react';
import { smoothScrollToId } from '@/shared/utils/ui/smoothScrollToId';

interface Props {
  children: ReactNode;
  className?: string;
  scrollToId: string;
}

/**
 * SmoothScrollLink component.
 * Renders an anchor element that scrolls smoothly to a specified element on click.
 *
 * @component SmoothScrollLink
 * @param props - The component props.
 * @param props.children - The content to be rendered inside the anchor element.
 * @param props.className - Optional: The CSS class name for the anchor element.
 * @param props.scrollToId - The ID of the element to scroll to.
 * @returns The rendered SmoothScrollLink component.
 */
export const SmoothScrollLink: FC<Props> = ({
  children,
  className,
  scrollToId,
}: Props): JSX.Element => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent the default behavior of anchor element
    smoothScrollToId(scrollToId);
  };

  return (
    <a href={`#${scrollToId}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
};
