import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "./api";
import type { Property, PropertyResponse } from "../types/propertyTypes"; // ✅ updated type

// ✅ Updated mock data to match backend shape
const MOCK_PROPERTIES: Property[] = [
  {
    property_id: "fallback-1",
    owner_id: "owner-001",
    title: "Luxury 3-Bedroom Apartment",
    description: "An upscale apartment with premium finishes and city views.",
    category: "RESIDENTIAL",
    listing_type: "FOR_SALE",
    price: "12500000",
    address: "Bole, Addis Ababa",
    latitude: "9.0054",
    longitude: "38.7636",
    media_urls: ["https://images.unsplash.com/photo-1560185127-6c7b2d8d81e9?auto=format&fit=crop&w=1400&q=80"],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    property_id: "fallback-2",
    owner_id: "owner-002",
    title: "Modern Studio Apartment",
    description: "Compact living with stylish amenities near the city center.",
    category: "RESIDENTIAL",
    listing_type: "FOR_RENT",
    price: "4200000",
    address: "Kazanchis, Addis Ababa",
    latitude: "9.0200",
    longitude: "38.7614",
    media_urls: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-16T10:00:00Z",
    updated_at: "2024-01-16T10:00:00Z",
  },
  {
    property_id: "fallback-3",
    owner_id: "owner-003",
    title: "Family House with Garden",
    description: "A family-ready home with an open plan living area and private garden.",
    category: "RESIDENTIAL",
    listing_type: "FOR_SALE",
    price: "22000000",
    address: "Lake View, Bahir Dar",
    latitude: "11.5742",
    longitude: "37.3614",
    media_urls: ["https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-17T10:00:00Z",
    updated_at: "2024-01-17T10:00:00Z",
  },
  {
    property_id: "fallback-4",
    owner_id: "owner-004",
    title: "Cozy 2-Bedroom Townhouse",
    description: "Affordable townhouse offering comfortable living and easy access to amenities.",
    category: "RESIDENTIAL",
    listing_type: "FOR_SALE",
    price: "6800000",
    address: "Mekina, Gondar",
    latitude: "12.6030",
    longitude: "37.4521",
    media_urls: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80"],
    listing_fee_paid: false,
    is_active: true,
    created_at: "2024-01-18T10:00:00Z",
    updated_at: "2024-01-18T10:00:00Z",
  },
  {
    property_id: "fallback-5",
    owner_id: "owner-005",
    title: "Bright Rental Apartment",
    description: "Fresh rental space with plenty of natural light and modern finishes.",
    category: "RESIDENTIAL",
    listing_type: "FOR_RENT",
    price: "3100000",
    address: "Kebena, Dire Dawa",
    latitude: "9.5931",
    longitude: "41.8661",
    media_urls: ["https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80"],
    listing_fee_paid: true,
    is_active: true,
    created_at: "2024-01-19T10:00:00Z",
    updated_at: "2024-01-19T10:00:00Z",
  },
];

// ✅ Updated filter to use new field names
function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    if (filters.listing_type && filters.listing_type !== "all" && property.listing_type !== filters.listing_type) return false;
    if (filters.category && property.category !== filters.category) return false;
    if (filters.address && !property.address.toLowerCase().includes(filters.address.toLowerCase())) return false;
    if (filters.minPrice !== undefined && Number(property.price) < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && Number(property.price) > filters.maxPrice) return false;
    if (filters.is_active !== undefined && property.is_active !== filters.is_active) return false;
    if (filters.keyword &&
      !property.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      !property.description.toLowerCase().includes(filters.keyword.toLowerCase())
    ) return false;
    return true;
  });
}

export interface PropertyFilters {
  listing_type?: "FOR_SALE" | "FOR_RENT" | "all";
  category?: "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "INDUSTRIAL";
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  is_active?: boolean;
  keyword?: string;
  page?: number;
  limit?: number;
}

export const propertyQueryKeys = {
  all: ["properties"] as const,
  lists: (filters: PropertyFilters) => [...propertyQueryKeys.all, "list", filters] as const,
  detail: (id: string) => [...propertyQueryKeys.all, "detail", id] as const,
};

// ✅ Updated to match backend response shape
export async function fetchProperties(filters: PropertyFilters = {}): Promise<PropertyResponse> {
  const params: Record<string, string | number | boolean> = {
    skip: ((filters.page ?? 1) - 1) * (filters.limit ?? 10),
    limit: filters.limit ?? 10,
  };

  if (filters.listing_type && filters.listing_type !== "all") params.listing_type = filters.listing_type;
  if (filters.category) params.category = filters.category;
  if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
  if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
  if (filters.is_active !== undefined) params.is_active = filters.is_active;

  try {
    const response = await api.get<PropertyResponse>("/properties", { params });
    return response.data;
  } catch (error) {
    const filtered = applyFilters(MOCK_PROPERTIES, filters);
    const limit = filters.limit ?? filtered.length;
    const paged = filtered.slice(0, limit);
    return {
      data: paged,        // ✅ data not properties
      total: filtered.length,
      skip: 0,
      limit,
    };
  }
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  const response = await fetchProperties({ is_active: true, limit, page: 1 });
  return response?.data?.slice(0, limit) || []; // ✅ data not properties
}

export async function getRecentProperties(limit = 4): Promise<Property[]> {
  const response = await fetchProperties({ page: 1, limit });
  return response?.data?.slice(0, limit) || []; // ✅ data not properties
}

export async function fetchPropertyById(id: string): Promise<Property> {
  try {
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
  } catch (error) {
    const fallback = MOCK_PROPERTIES.find((item) => item.property_id === id); // ✅ property_id not id
    if (fallback) return fallback;
    throw error;
  }
}

export function useProperties(filters: PropertyFilters = {}): UseQueryResult<PropertyResponse, Error> {
  return useQuery<PropertyResponse, Error>({
    queryKey: propertyQueryKeys.lists(filters),
    queryFn: () => fetchProperties(filters),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
  });
}

export function usePropertyById(id?: string): UseQueryResult<Property, Error> {
  return useQuery<Property, Error>({
    queryKey: propertyQueryKeys.detail(id ?? ""),
    queryFn: () => fetchPropertyById(id ?? ""),
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5,
  });
}