import { useStatusStore } from '@/presentation/state-management/statusStore';
import { deleteProductAction } from '@/actions/product-actions';
import { Button } from '@/presentation/components/ui/button';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';

export const DeleteProductButton = ({
  prodId,
  imageUrl,
}: {
  prodId: string;
  imageUrl: string;
}) => {
  const router = useRouter();
  const pending = useStatusStore((state) => state.isLoading);
  const setErrorStatusStore = useStatusStore((state) => state.setError);
  const clearStatusStore = useStatusStore((state) => state.clearStatusStore);
  const setIsLoadingStatusStore = useStatusStore((state) => state.setIsLoading);

  const deleteProduct = async () => {
    clearStatusStore();
    setIsLoadingStatusStore(true);
    const { success, message } = await deleteProductAction(prodId, imageUrl);

    if (!success) {
      return setErrorStatusStore(
        message ? message : 'Error al borrar el producto',
      );
    }
    clearStatusStore();
    router.refresh();
  };

  return (
    <Button
      className={cn('text-xl')}
      variant={'ghost'}
      onClick={deleteProduct}
      disabled={pending}
    >
      Delete
    </Button>
  );
};
