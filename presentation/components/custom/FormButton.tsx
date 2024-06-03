'use client';

import { Button } from '../ui/button';

import { TButtonVariant } from '@/shared/types/TButtonVariant';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { FC, useEffect } from 'react';
import { cn } from '@/shared/utils/utils';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<any>;
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
 * @param props.form - The form object to handle the button action.
 * @param props.text - The text to display on the button.
 * @param props.loadingText - The text to display when the button is in a loading state.
 * @param props.variant - The variant of the button.
 * @param props.action - The action type of the button.
 * @param props.styling - The styling class name for the button.
 * @returns The rendered FormButton component.
 */
export const FormButton: FC<Props> = ({
  form,
  text,
  loadingText,
  variant = 'default',
  action = 'submit',
  styling = 'text-xl',
}): JSX.Element => {
  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);
  const loading = useStatusStore((state) => state.isLoading);

  useEffect(() => {
    if (form?.formState?.isSubmitting) {
      setIsLoadingStatusStore(true);
      console.log('loading');
    } else {
      console.log('not loading');
      setIsLoadingStatusStore(false);
    }
  }, [form.formState.isSubmitting, setIsLoadingStatusStore]);

  return (
    <Button
      disabled={loading}
      variant={variant}
      type={action}
      className={cn(styling)}
    >
      {loading ? loadingText : text}
    </Button>
  );
};
