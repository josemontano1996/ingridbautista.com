'use client';

import { useRef } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/presentation/components/ui/input';
import {
  DialogClose,
  DialogContent,
} from '@/presentation/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/presentation/components/ui/form';
import { FormButton } from '@/presentation/components/custom/FormButton';
import { updateCategoryAction } from '@/application/actions/category-actions';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import {
  ProductCategoryDto,
  productCategoryDtoSchema,
} from '@/application/dto/ProductCategoryDto';

interface Props {
  category: ProductCategoryDto;
}

export const EditCategoryForm = ({ category }: Props) => {
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);

  const updateCategoryStore = useCategoryStore(
    (state) => state.updateCategories,
  );

  const form = useForm<z.infer<typeof productCategoryDtoSchema>>({
    resolver: zodResolver(productCategoryDtoSchema),
    defaultValues: {
      name: category.name,
      order: category.order,
      en: category.en,
      fr: category.fr,
      id: category.id,
    },
  });

  const onSubmit = async (values: z.infer<typeof productCategoryDtoSchema>) => {
    const { success, payload, message } = await updateCategoryAction(values);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Error al actualizar la categoria',
      );
    }

    updateCategoryStore(payload!);
    setSuccessStatusStore('Categoria actualizada con éxito');
    closeRef.current?.click();
  };

  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <DialogContent>
      <DialogClose ref={closeRef} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="text-xl"
                    value={category.id}
                    type="hidden"
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
            <FormButton form={form} text="Editar" loadingText="Cargando..." />
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};
