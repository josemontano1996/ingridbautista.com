'use client';

import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import useStore from '@/presentation/state-management/useStore';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { EditCategoryForm } from './EditCategoryForm';
import { cn } from '../../../../../../lib/utils';
import { DeleteCategory } from './DeleteCategory';

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
          <TableRow key={cat._id}>
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
