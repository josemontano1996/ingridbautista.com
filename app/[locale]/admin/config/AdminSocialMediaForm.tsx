'use client';

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
import { updateSocialMediaAction } from '@/application/actions/social-media-actions';
import {
  SocialMediaDto,
  socialMediaDtoSchema,
} from '@/application/dto/SocialMediaDto';

interface Props {
  data: SocialMediaDto;
}

export const AdminSocialMediaForm = ({ data }: Props) => {
  if (!data) {
    data = { facebook: '', instagram: '', whatsapp: '' };
  }
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);
  const setErrorStatusStore = useStatusStore((state) => state.setError);

  const form = useForm<z.infer<typeof socialMediaDtoSchema>>({
    resolver: zodResolver(socialMediaDtoSchema),
    defaultValues: {
      facebook: data.facebook,
      instagram: data.instagram,
      whatsapp: data.whatsapp,
    },
  });

  const onSubmit = async (values: z.infer<typeof socialMediaDtoSchema>) => {
    const { success, message } = await updateSocialMediaAction(values);

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
        <FormButton form={form} text="Submit" loadingText="Submitting..." />
      </form>
    </Form>
  );
};
