'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormButton } from '@/presentation/components/custom/FormButton';
import { Form } from '@/presentation/components/ui/form';
import { TableCell } from '@/presentation/components/ui/table';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteCategoryAction } from '@/application/actions/category-actions';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { useStatusStore } from '@/presentation/state-management/statusStore';

const formSchema = z.object({});

export const DeleteCategory = ({ categoryName }: { categoryName: string }) => {
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);

  const deleteCategoryStore = useCategoryStore((state) => state.deleteCategory);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async () => {
    const { success, message } = await deleteCategoryAction(categoryName);

    if (!success) {
      setErrorStatusStore(message ? message : 'An error ocurred.');
    }

    setSuccessStatusStore('Category deleted successfully');
    deleteCategoryStore(categoryName);
  };
  return (
    <TableCell>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <div className="flex flex-col items-center">
            <FormButton
              form={form}
              text="Borrar"
              loadingText="Borrando..."
              variant="secondary"
            />
          </div>
        </form>
      </Form>
    </TableCell>
  );
};
