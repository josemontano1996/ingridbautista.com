'use client';

import { useEffect } from 'react';
import { useCategoryStore } from '@/presentation/state-management/categoryStore';
import { ProductCategoryDto } from '@/application/dto/ProductCategoryDto';

interface Props {
  categories: ProductCategoryDto[];
}

export const CategoryStoreZustandInitializer = ({ categories }: Props) => {
  const initializeCategories = useCategoryStore((state) => state.setCategories);

  useEffect(() => {
    initializeCategories(categories);
  }, [initializeCategories, categories]);

  return <></>;
};
