import { useStatusStore } from '@/presentation/state-management/statusStore';
import { deleteProductAction } from '@/application/actions/product-actions';
import { Button, buttonVariants } from '@/presentation/components/ui/button';

import { useRouter } from 'next/navigation';
import { cn } from '@/shared/utils/utils';
import { Form } from '@/presentation/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
