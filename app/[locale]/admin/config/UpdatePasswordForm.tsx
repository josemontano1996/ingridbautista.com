'use client';
import { FC } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormButton } from '@/components/custom/FormButton';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { updatePasswordUserAction } from '@/actions/user-actions';
import { updatePasswordFormSchema } from '@/lib/schemas/userFormSchema';

export const UpdatePasswordForm: FC = (): JSX.Element => {
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const clearStatusStore = useStatusStore((state) => state.clearStatusStore);
  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);

  const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePasswordFormSchema>) => {
    clearStatusStore();

    if (values.password !== values.confirmPassword) {
      return setErrorStatusStore('Las contraseñas deben coincidir');
    }

    setIsLoadingStatusStore(true);

    const { success, message } = await updatePasswordUserAction(values);

    setIsLoadingStatusStore(false);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Error al actualizar constraseña',
      );
    }

    setSuccessStatusStore('Contraseña actualizada con éxito');
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirma contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton text="Submit" loadingText="Submitting..." />
      </form>
    </Form>
  );
};
