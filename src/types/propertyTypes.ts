// ✅ ONE Property interface — matches backend exactly
export interface Property {
  property_id: string;
  owner_id: string;
  title: string;
  description: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "INDUSTRIAL";
  listing_type: "FOR_SALE" | "FOR_RENT";
  price: string;
  address: string;
  latitude: string;
  longitude: string;
  media_urls: string[];
  listing_fee_paid: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ✅ Backend paginated response
export interface PropertyResponse {
  total: number;
  skip: number;
  limit: number;
  data: Property[];
}

// ✅ Frontend feed response (for queries.ts)
export interface PropertyFeedResponse {
  data: Property[];
  total: number;
  skip: number;
  limit: number;
}

// ✅ Updated filters to match new Property fields
export interface PropertyFilters {
  listing_type?: "FOR_SALE" | "FOR_RENT" | "all";
  category?: "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "INDUSTRIAL";
  address?: string;
  keyword?: string;
  sortBy?: "newest" | "oldest" | "price_asc" | "price_desc";
  minPrice?: number;
  maxPrice?: number;
  is_active?: boolean;
  limit?: number;
  page?: number;
  listing_type_filter?: string;
}

// ✅ Kept as is — not related to Property backend model
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