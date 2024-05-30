'use client';

import { useEffect, useRef } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { cn } from '@/shared/lib/utils';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { useSearchParams } from 'next/navigation';

/**
 * Component for displaying success and error dialogs based on query parameters.
 */
const AppStatusDialog = () => {
  const successDialog = useRef<HTMLButtonElement>(null);
  const errorDialog = useRef<HTMLButtonElement>(null);
  const queries = useSearchParams();
  const errorQuery = queries.get('error');
  const successQuery = queries.get('success');

  const setIsSuccess = useStatusStore((state) => state.setSuccess);
  const isSuccess = useStatusStore((state) => state.success);

  const isError = useStatusStore((state) => state.error);
  const setIsError = useStatusStore((state) => state.setError);

  useEffect(() => {
    /*  Set the error or success state based on the query parameters. */

    if (errorQuery) {
      setIsError(errorQuery);
    } else if (successQuery) {
      setIsSuccess(successQuery);
    }
  }, [errorQuery, setIsError, setIsSuccess, successQuery]);

  useEffect(() => {
    /*  Trigger the success dialog if the isSuccess state is true. */

    isSuccess ? successDialog.current?.click() : null;
  }, [isSuccess]);

  useEffect(() => {
    /*  Trigger the error dialog if the isError state is true. */

    isError ? errorDialog.current?.click() : null;
  }, [isError]);

  return (
    <>
      <Dialog>
        <DialogTrigger ref={successDialog}></DialogTrigger>
        <DialogContent className={cn('text-center text-primary')}>
          <DialogTitle className="text-5xl">Éxito</DialogTitle>
          <DialogDescription className="text-3xl">
            {isSuccess}
          </DialogDescription>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger ref={errorDialog}></DialogTrigger>
        <DialogContent className={cn('text-center text-red-500')}>
          <DialogTitle className="text-5xl">Error</DialogTitle>
          <DialogDescription className="text-3xl">{isError}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppStatusDialog;
