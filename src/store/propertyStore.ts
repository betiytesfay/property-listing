import { create } from "zustand";
import type { PropertyFilters } from "../types/propertyTypes";

interface PropertyState {
  filters: PropertyFilters;
  page: number;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
}

const defaultFilters: PropertyFilters = {
  status: "all",
  city: "",
  minPrice: undefined,
  maxPrice: undefined,
  bedrooms: undefined,
  bathrooms: undefined,
  furnished: "all",
};

export const usePropertyStore = create<PropertyState>((set) => ({
  filters: defaultFilters,
  page: 1,
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters }, page: 1 })),
  setPage: (page) => set(() => ({ page })),
  resetFilters: () => set(() => ({ filters: defaultFilters, page: 1 })),
}));
