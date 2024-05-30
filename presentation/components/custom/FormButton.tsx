'use client';

import { Button } from '../ui/button';
import { cn } from '@/shared/lib/utils';
import { TButtonVariant } from '@/shared/types/TButtonVariant';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { FC } from 'react';

interface Props {
  text: string;
  loadingText: string;
  variant?: TButtonVariant;
  action?: 'submit' | 'reset' | 'button';
  styling?: string;
}

/**
 * Renders a form button component.
 *
 * @component
 * @param props - The component props.
 * @param props.text - The text to display on the button.
 * @param props.loadingText - The text to display when the button is in a loading state.
 * @param props.variant - The variant of the button.
 * @param props.action - The action type of the button.
 * @param props.styling - The styling class name for the button.
 * @returns The rendered FormButton component.
 */
export const FormButton: FC<Props> = ({
  text,
  loadingText,
  variant = 'default',
  action = 'submit',
  styling = 'text-xl',
}): JSX.Element => {
  const pending = useStatusStore((state) => state.isLoading);

  return (
    <Button
      disabled={pending}
      variant={variant}
      type={action}
      className={cn(styling)}
    >
      {pending ? loadingText : text}
    </Button>
  );
};
