'use client';

import { useEffect } from 'react';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { IDbCategory } from '@/infrastructure/persistence/db-types';

interface Props {
  fetchedCategories: IDbCategory[] | null;
}

export const CategoryStoreZustandInitializer = ({
  fetchedCategories,
}: Props) => {
  const initializeCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    initializeCategories(fetchedCategories);
  }, [initializeCategories, fetchedCategories]);

  return <></>;
};
