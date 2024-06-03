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
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { FormButton } from '@/presentation/components/custom/FormButton';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { updatePasswordUserAction } from '@/application/actions/user-actions';
import { updatePasswordDtoSchema } from '@/application/dto/UserDto';

export const UpdatePasswordForm: FC = (): JSX.Element => {
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);
  const setErrorStatusStore = useStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof updatePasswordDtoSchema>>({
    resolver: zodResolver(updatePasswordDtoSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePasswordDtoSchema>) => {
    if (values.password !== values.confirmPassword) {
      return setErrorStatusStore('Las contraseñas deben coincidir');
    }

    const { success, message } = await updatePasswordUserAction(values);

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
        <FormButton form={form} text="Submit" loadingText="Submitting..." />
      </form>
    </Form>
  );
};
