/* 'use client';
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
import { userFormSchema } from '@/shared/lib/schemas/userFormSchema';
import { updateUserAction } from '@/actions/user-actions';
import { IUser } from '@/shared/interfaces/IUser';

interface Props {
  user: IUser;
}

export const AccountDataForm: FC<Props> = ({ user }): JSX.Element => {
  const { name, email } = user;

  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const clearStatusStore = useStatusStore((state) => state.clearStatusStore);
  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: name!,
      email: email!,
    },
  });

  const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
    clearStatusStore();
    setIsLoadingStatusStore(true);

    const { success, message } = await updateUserAction(values);

    setIsLoadingStatusStore(false);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Error al actualizar usuario',
      );
    }

    setSuccessStatusStore('Usuario actualizado con éxito');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton text="Submit" loadingText="Submitting..." />
      </form>
    </Form>
  );
}; */
