'use client';

import { buttonVariants } from '@/presentation/components/ui/button';
import { Dialog, DialogTrigger } from '@/presentation/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/presentation/components/ui/table';
import useStore from '@/presentation/state-management/useStore';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { EditCategoryForm } from './EditCategoryForm';
import { DeleteCategory } from './DeleteCategory';
import { cn } from '@/shared/utils/utils';

export const ManageCategorySection = () => {
  const categories = useStore(useCategoryStore, (state) => state.categories);

  return !categories ? null : (
    <Table className="text-2xl">
      <TableHeader>
        <TableRow>
          <TableHead>ES</TableHead>
          <TableHead>Orden</TableHead>
          <TableHead>FR</TableHead>
          <TableHead>EN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((cat) => (
          <TableRow key={cat.id}>
            <TableCell>{cat.name}</TableCell>
            <TableCell>{cat.order}</TableCell>
            <TableCell>{cat.fr}</TableCell>
            <TableCell>{cat.en}</TableCell>
            <Dialog>
              <DialogTrigger asChild>
                <TableCell>
                  <div
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'text-lg hover:cursor-pointer',
                    )}
                  >
                    Editar
                  </div>
                </TableCell>
              </DialogTrigger>
              <EditCategoryForm category={cat} />
            </Dialog>
            <DeleteCategory categoryName={cat.name} />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
