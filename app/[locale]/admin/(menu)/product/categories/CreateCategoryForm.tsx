'use client';

import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { Input } from '@/presentation/components/ui/input';
import { categoryFormSchema } from '@/shared/lib/schemas/categoryFormSchema';
import { createCategoryAction } from '@/actions/category-actions';
import { FormButton } from '@/presentation/components/custom/FormButton';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { useStatusStore } from '@/presentation/state-management/statusStore';

export const CreateCategoryForm = () => {
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const clearStatusStore = useStatusStore((state) => state.clearStatusStore);
  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);

  const appendCategoryStore = useCategoryStore((state) => state.appendCategory);

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: '',
      order: 0,
      en: '',
      fr: '',
    },
  });

  async function onSubmit(data: z.infer<typeof categoryFormSchema>) {
    clearStatusStore();
    setIsLoadingStatusStore(true);

    const { success, payload, message } = await createCategoryAction(data);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Ha ocurrido un error al crear la categoria.',
      );
    }
    appendCategoryStore(payload!);
    form.reset();
    clearStatusStore();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Nombre categoria</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" />
              </FormControl>
              <FormDescription>
                Nombre de la categoria en español.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Posición</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" type="number" />
              </FormControl>
              <FormDescription>
                Posicion de la categoria en la lista.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fr"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Trad. Francés</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" />
              </FormControl>
              <FormDescription>
                Nombre de la categoria en francés.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="en"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Trad. Inglés</FormLabel>
              <FormControl>
                <Input {...field} className="text-xl" />
              </FormControl>
              <FormDescription>
                Nombre de la categoria en inglés.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col items-center">
          <FormButton text="Crear categoria" loadingText="Creando..." />
        </div>
      </form>
    </Form>
  );
};
