'use client';

import { useEffect } from 'react';
import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';

interface Props {
  fetchedCategories: IFecthedCategory[] | null;
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
