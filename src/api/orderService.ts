import apiClient from '../app/api/apiClient';

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  propertyId: string;
  propertyTitle: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card';
  createdAt: string;
  updatedAt: string;
}

export const orderService = {
  async getAllOrders(): Promise<Order[]> {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  async getOrderById(id: string): Promise<Order> {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await apiClient.put(`/orders/${id}`, { status });
    return response.data;
  },
};