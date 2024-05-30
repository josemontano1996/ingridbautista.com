import { create } from 'zustand';

import { IFecthedCategory } from '@/shared/interfaces/IFetchedCategory';

type TCategoryStore = {
  categories: IFecthedCategory[] | null;
  setCategories: (cat?: IFecthedCategory[] | null) => void;
  appendCategory: (cat: IFecthedCategory) => void;
  updateCategories: (cat: IFecthedCategory) => void;
  deleteCategory: (categoryName: string) => void;
};

export const useCategoryStore = create<TCategoryStore>((set) => ({
  categories: [],
  setCategories: (cat?: IFecthedCategory[] | null) =>
    set((state) => ({ ...state, categories: cat })),
  appendCategory: (cat: IFecthedCategory) =>
    set((state) => {
      const newCategories = state.categories
        ? [...state.categories, cat]
        : [cat];
      return {
        ...state,
        categories: newCategories.sort((a, b) => a.order - b.order),
      };
    }),
  updateCategories: (cat: IFecthedCategory) =>
    set((state) => {
      const updatedCategories = state.categories?.map((category) => {
        if (category._id === cat._id) {
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
