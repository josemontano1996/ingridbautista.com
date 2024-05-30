import { create } from 'zustand';

type TStatusStore = {
  success: string | null;
  error: string | null;
  isLoading: boolean;
  setSuccess: (success: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  clearStatusStore: () => void;
};

export const useStatusStore = create<TStatusStore>((set) => ({
  success: null,
  error: null,
  isLoading: false,
  setSuccess: (success: string) =>
    set((state) => ({ ...state, success, error: null, isLoading: false })),
  setError: (error: string) =>
    set((state) => ({ ...state, error, isLoading: false, success: null })),
  setIsLoading: (isLoading: boolean) =>
    set((state) => ({ ...state, isLoading })),
  clearStatusStore: () =>
    set((state) => ({
      ...state,
      success: null,
      error: null,
      isLoading: false,
    })),
}));
