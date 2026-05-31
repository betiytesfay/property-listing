import axios from 'axios';
import { create } from 'zustand';
import { Order, ordersArraySchema } from '../../orders/schemas/order.schema';

interface OrderStore {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
}

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
});

export const useAdminOrderStore = create<OrderStore>((set) => ({
  orders: [],
  isLoading: false,
  error: null,

  fetchOrders: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await api.get('/properties');

      const validated = ordersArraySchema.parse(response.data);

      set({
        orders: validated,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: axios.isAxiosError(error)
          ? error.message
          : 'Unknown error',
        isLoading: false,
      });
    }
  },

  updateOrderStatus: async (
    id: string,
    status: Order['status']
  ) => {
    try {
      await api.put(`/properties/${id}`, {
        status,
      });

      set((state) => ({
        orders: state.orders.map((order) =>
          order.id === id
            ? { ...order, status }
            : order
        ),
      }));
    } catch (error) {
      set({
        error: axios.isAxiosError(error)
          ? error.message
          : 'Update failed',
      });
    }
  },
}));