import { create } from 'zustand';
import axios from 'axios';
import useAuthStore from './authStore';
import type { Property, PropertyResponse } from '@/src/types/propertyTypes'; // ✅ import from types

interface PropertyState {
  properties: Property[];
  total: number;
  isLoading: boolean;

  fetchProperties: () => Promise<void>;
  addProperty: (property: Partial<Property>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

const API_BASE = 'http://localhost:8000/api/v1/properties';

const getAuthHeader = () => {
  const token = useAuthStore.getState().token; // ✅ token not accessToken
  return { Authorization: `Bearer ${token}` };
};

const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  total: 0,
  isLoading: false,

  fetchProperties: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get<PropertyResponse>(API_BASE, {
        headers: getAuthHeader(),
      });

      set({
        properties: response.data.data,
        total: response.data.total,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  addProperty: async (property) => {
    set({ isLoading: true });
    try {
      const response = await axios.post<Property>(API_BASE, property, {
        headers: getAuthHeader(),
      });

      set((state) => ({
        properties: [response.data, ...state.properties],
        total: state.total + 1,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  updateProperty: async (id, property) => {
    set({ isLoading: true });
    try {
      const response = await axios.put<Property>(
        `${API_BASE}/${id}`,
        property,
        { headers: getAuthHeader() }
      );

      set((state) => ({
        properties: state.properties.map((p) =>
          p.property_id === id ? response.data : p
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  deleteProperty: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${API_BASE}/${id}`, {
        headers: getAuthHeader(),
      });

      set((state) => ({
        properties: state.properties.filter((p) => p.property_id !== id),
        total: state.total - 1,
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));

export default usePropertyStore;