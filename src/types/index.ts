// ✅ Re-export everything from propertyTypes so imports from "../types" still work
export type { Property, PropertyResponse, PropertyFeedResponse, PropertyFilters } from './propertyTypes';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'buyer' | 'seller' | 'both';
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
  avatar?: string;
}

export interface Order {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'failed';
  createdAt: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalPropertiesForRent: number;
  totalPropertiesForSale: number;
  totalCustomers: number;
  totalOrders: number;
  pendingApprovals: number;
  totalRevenue: number;
  monthlyGrowth: number;
}