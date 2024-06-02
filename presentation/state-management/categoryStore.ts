import { ProductCategoryDto } from '@/application/dto/ProductCategoryDto';

import { create } from 'zustand';

type TCategoryStore = {
  categories: ProductCategoryDto[] | null;
  setCategories: (cat?: ProductCategoryDto[] | null) => void;
  appendCategory: (cat: ProductCategoryDto) => void;
  updateCategories: (cat: ProductCategoryDto) => void;
  deleteCategory: (categoryName: string) => void;
};

export const useCategoryStore = create<TCategoryStore>((set) => ({
  categories: [],
  setCategories: (cat?: ProductCategoryDto[] | null) =>
    set((state) => ({ ...state, categories: cat })),
  appendCategory: (cat: ProductCategoryDto) =>
    set((state) => {
      const newCategories = state.categories
        ? [...state.categories, cat]
        : [cat];
      return {
        ...state,
        categories: newCategories.sort((a, b) => a.order - b.order),
      };
    }),
  updateCategories: (cat: ProductCategoryDto) =>
    set((state) => {
      const updatedCategories = state.categories?.map((category) => {
        if (category.id === cat.id) {
          return cat;
        }
        return category;
      });
      return {
        ...state,
        categories: updatedCategories?.sort((a, b) => a.order - b.order),
      };
    }),
  deleteCategory: (categoryName: string) =>
    set((state) => {
      const updatedCategories = state.categories?.filter(
        (category) => category.name !== categoryName,
      );
      return {
        ...state,
        categories: updatedCategories?.sort((a, b) => a.order - b.order),
      };
    }),
}));
