export type PropertyStatus = "rent" | "sell"

export interface Property {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  city: string;
  subCity?: string;
  neighborhood?: string;
  featured?: boolean;
  price: number;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  images?: string[];
  details?: {
    bedrooms: number;
    bathrooms: number;
    surfaceArea?: string;
    condition?: string;
    availableFrom?: string;
    balcony?: boolean;
    elevator?: boolean;
  };
  equipment?: string[];
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  googleMapUrl?: string;
  createdAt: string;
  updatedAt: string;
  adminStatus: 'pending' | 'approved' | 'rejected';
  sellerId: string;
  sellerName: string;
}

export interface PropertyFilters {
  status?: PropertyStatus | "all";
  city?: string;
  subCity?: string;
  neighborhood?: string;
  keyword?: string;
  sortBy?: "newest" | "oldest" | "price_asc" | "price_desc";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnished?: boolean | "all";
  featured?: boolean;
  limit?: number;
  page?: number;
}

export interface PropertyFeedResponse {
  properties: Property[];
  page: number;
  total: number;
}

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