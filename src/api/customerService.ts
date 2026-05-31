import apiClient from '../app/api/apiClient';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'buyer' | 'seller' | 'both';
  joinedAt: string;
  totalSpent: number;
  propertiesCount: number;
}

export const customerService = {
  async getAllCustomers(): Promise<Customer[]> {
    const response = await apiClient.get('/customers');
    return response.data;
  },

  async getCustomerById(id: string): Promise<Customer> {
    const response = await apiClient.get(`/customers/${id}`);
    return response.data;
  },

  async getCustomersByType(type: 'buyer' | 'seller'): Promise<Customer[]> {
    const response = await apiClient.get(`/customers?type=${type}`);
    return response.data;
  },
};