export type PropertyStatus = "rent" | "sale";

export interface Property {
  id: string;
  title: string;
  description: string;
  city: string;
  neighborhood?: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  status: PropertyStatus;
  imageUrl?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface PropertyFilters {
  status?: PropertyStatus | "all";
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  furnished?: boolean | "all";
  page?: number;
}

export interface PropertyFeedResponse {
  properties: Property[];
  page: number;
  total: number;
}
