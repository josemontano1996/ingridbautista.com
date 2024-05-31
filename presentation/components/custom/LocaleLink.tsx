'use client';
import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/shared/utils/utils';



interface Props {
  children: ReactNode;
  path: string;
  isNextLink: boolean;
  styling?: string;
}

/**
 * Renders a link with the specified path and styling, taking into account the current locale.
 * The component uses the next/link component to create a client-side navigation link or a standard anchor element, depending on the isNextLink prop.
 * @component LocaleLink
 * @param  props - The component props.
 * @param  props.children - The content to be rendered inside the link.
 * @param  props.path - The path for the link.
 * @param  props.isNextLink - Indicates whether the link is a Next.js Link component.
 * @param props.styling - The additional CSS classes to apply to the link.
 * @returns  The rendered link component.
 */
const LocaleLink: FC<Props> = ({
  children,
  path,
  isNextLink,
  styling = '',
}: Props): JSX.Element => {
  const { locale } = useParams();
  return (
    <>
      {isNextLink ? (
        <Link href={`/${locale}${path}`} className={cn(styling)}>
          {children}
        </Link>
      ) : (
        <a href={`/${locale}${path}`} className={cn(styling)}>
          {children}
        </a>
      )}
    </>
  );
};

export default LocaleLink;
