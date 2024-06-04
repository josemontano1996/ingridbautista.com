'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useStatusStore } from '@/presentation/state-management/statusStore';
import { deleteProductAction } from '@/application/actions/product-actions';
import { useRouter } from 'next/navigation';
import { Form } from '@/presentation/components/ui/form';
import { FormButton } from '@/presentation/components/custom/FormButton';

const formSchema = z.object({});

export const DeleteProductButton = ({
  prodId,
  imageUrl,
}: {
  prodId: string;
  imageUrl: string;
}) => {
  const router = useRouter();
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const setSuccessStatusStore = useStatusStore((state) => state.setSuccess);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const deleteProduct = async () => {
    const { success, message } = await deleteProductAction(prodId, imageUrl);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Error al borrar el producto',
      );
    }
    setSuccessStatusStore('Producto borrado correctamente');
    router.refresh();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(deleteProduct)} className="space-y-4 ">
        <FormButton
          form={form}
          text="Borrar"
          loadingText="Borrando..."
          variant="ghost"
        />
      </form>
    </Form>
  );
};
