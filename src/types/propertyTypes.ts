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

  images?: string[];
  furnished: boolean;
  imageUrl?: string;

  address?: string;
  category?: string;
  listing_type?: string;
  listing_fee_paid?: boolean;
  is_active?: boolean;
  latitude?: string | number | null;
  longitude?: string | number | null;
  media_urls?: string[];
  owner_id?: string;
  created_at?: string;
  updated_at?: string;

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

  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;

  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };

  googleMapUrl?: string;
}

export interface PropertyFilters {
  status?: PropertyStatus | "all";

  city?: string;
  subCity?: string;
  neighborhood?: string;

  keyword?: string;

  sortBy?:
    | "newest"
    | "oldest"
    | "price_asc"
    | "price_desc";

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