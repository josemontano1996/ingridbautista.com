import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

/**
 * A wrapper component that sets the maximum width of the content.
 * @component MaxWidthWrapper
 * @param props The component props.
 * @param props.className Optional: The custom tailwind classes for the wrapper. 
 * @param props.children The content to be wrapped.
 * @returns 
 */

const MaxWidthWrapper = ({ className, children }: { className?: string; children: ReactNode }) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
