import { create } from 'zustand';
import axios from 'axios';

import {
  Customer,
  customerSchema,
  customersArraySchema
} from '../../customers/schemas/customer.schema';

import { mockCustomers } from "@/src/mocks/customers";

// OPTIONAL: use shared API instance if you have it
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1"
});

interface CustomerStore {
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  fetchCustomers: () => Promise<void>;
  fetchCustomerById: (id: string) => Promise<Customer | null>;
}

export const useAdminCustomerStore = create<CustomerStore>((set, get) => ({
  customers: [],
  isLoading: false,
  error: null,

  // ✅ FIXED: no /users endpoint anymore
  fetchCustomers: async () => {
    set({ isLoading: true, error: null });

    try {
      // OPTION A: if backend exists later
      const response = await api.get('/customers');

      const validated = customersArraySchema.parse(response.data);

      set({
        customers: validated,
        isLoading: false,
      });

    } catch (error) {
      console.warn("Backend customers not ready, using mock data");

      // OPTION B: fallback to mock data (safe for now)
      set({
        customers: mockCustomers as Customer[],
        isLoading: false,
        error: null,
      });
    }
  },

  fetchCustomerById: async (id: string) => {
    try {
      const response = await api.get(`/customers/${id}`);

      return customerSchema.parse(response.data);
    } catch (error) {
      set({
        error: axios.isAxiosError(error)
          ? error.message
          : 'Failed to fetch customer'
      });

      return null;
    }
  },
}));