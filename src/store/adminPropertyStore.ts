// src/store/adminPropertyStore.ts

import { create } from 'zustand';

// This matches your backend and form schema
export interface Property {
  property_id?: string;  // Optional for new properties
  title: string;
  description: string;
  price: string;
  address: string;
  latitude: string;
  longitude: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "INDUSTRIAL";
  listing_type: "FOR_SALE" | "FOR_RENT";
  media_urls: string[];
  listing_fee_paid: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface AdminPropertyStore {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
  addProperty: (property: Omit<Property, 'property_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
}

const usePropertyStore = create<AdminPropertyStore>((set, get) => ({
  properties: [],
  isLoading: false,
  error: null,

  fetchProperties: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/admin/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      const data = await response.json();
      set({ properties: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addProperty: async (property) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      });

      if (!response.ok) throw new Error('Failed to add property');

      const newProperty = await response.json();
      set((state) => ({
        properties: [...state.properties, newProperty],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  updateProperty: async (id, property) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property),
      });

      if (!response.ok) throw new Error('Failed to update property');

      const updatedProperty = await response.json();
      set((state) => ({
        properties: state.properties.map((p) =>
          p.property_id === id ? updatedProperty : p
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },

  deleteProperty: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/admin/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete property');

      set((state) => ({
        properties: state.properties.filter((p) => p.property_id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
    }
  },
}));

export default usePropertyStore;