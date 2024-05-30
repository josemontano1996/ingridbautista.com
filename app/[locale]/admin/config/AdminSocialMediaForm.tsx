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
import { ISocialData } from '@/shared/interfaces/ISocialData';
import { socialMediaSchema } from '@/lib/schemas/socialMediaSchema';
import { updateSocialMediaAction } from '@/actions/social-media-actions';

interface Props {
  data: ISocialData;
}

export const AdminSocialMediaForm: FC<Props> = ({ data }): JSX.Element => {
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const clearStatusStore = useStatusStore((state) => state.clearStatusStore);
  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);

  const form = useForm<z.infer<typeof socialMediaSchema>>({
    resolver: zodResolver(socialMediaSchema),
    defaultValues: {
      facebook: data.facebook,
      instagram: data.instagram,
      whatsapp: data.whatsapp,
    },
  });

  const onSubmit = async (values: z.infer<typeof socialMediaSchema>) => {
    clearStatusStore();
    setIsLoadingStatusStore(true);

    const { success, message } = await updateSocialMediaAction(values);

    setIsLoadingStatusStore(false);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Error al actualizar datos',
      );
    }

    setSuccessStatusStore('Datos actualizados correctamente');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
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
};
