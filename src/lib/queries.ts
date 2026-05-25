

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "./api";
import type { Property, PropertyFeedResponse, PropertyFilters } from "../types/propertyTypes";

interface BackendProperty {
  property_id: string;
  owner_id: string;
  title: string;
  description: string | null;
  category: string;
  listing_type: string;
  price: string;
  address: string;
  latitude: string | null;
  longitude: string | null;
  media_urls: string[] | null;
  listing_fee_paid: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface BackendPropertyFeedResponse {
  total: number;
  skip: number;
  limit: number;
  data: BackendProperty[];
}

const MOCK_PROPERTIES: Property[] = [
  // ... your mock properties here (unchanged)
];


function mapBackendProperty(property: BackendProperty): Property {
  const addressParts = property.address?.split(",").map((part) => part.trim()).filter(Boolean) ?? [];
  const city = addressParts[0] ?? property.address ?? "Unknown location";
  const subCity = addressParts.length > 1 ? addressParts[1] : undefined;
  const neighborhood = addressParts.length > 2 ? addressParts.slice(2).join(", ") : undefined;

  return {
    id: property.property_id,
    title: property.title,
    description: property.description ?? "",
    shortDescription: property.description ?? "",
    city,
    subCity,
    neighborhood,
    featured: false,
    price: Number(property.price) || 0,
    status: property.listing_type === "FOR_RENT" ? "rent" : "sell",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: property.media_urls ?? [],
    furnished: false,
    imageUrl: property.media_urls?.[0] ?? undefined,
    details: {
      bedrooms: 0,
      bathrooms: 0,
      surfaceArea: "N/A",
      condition: property.category ?? "Unknown",
      availableFrom: new Date(property.created_at).toLocaleDateString(),
      balcony: false,
      elevator: false,
    },
    contactName: undefined,
    contactPhone: undefined,
    contactEmail: undefined,
    googleMapUrl:
      property.latitude && property.longitude
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.latitude},${property.longitude}`)}`
        : undefined,
    address: property.address,
    category: property.category,
    listing_type: property.listing_type,
    listing_fee_paid: property.listing_fee_paid,
    is_active: property.is_active,
    latitude: property.latitude,
    longitude: property.longitude,
    media_urls: property.media_urls ?? [],
    owner_id: property.owner_id,
    created_at: property.created_at,
    updated_at: property.updated_at,
  };
}

function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter((property) => {
    if (filters.featured !== undefined && property.featured !== filters.featured) return false;
    if (filters.status && filters.status !== "all" && property.status !== filters.status) return false;
    if (filters.city && property.city !== filters.city) return false;
    if (filters.minPrice !== undefined && property.price < filters.minPrice) return false;
    if (filters.maxPrice !== undefined && property.price > filters.maxPrice) return false;
    if (filters.bedrooms !== undefined && property.bedrooms !== filters.bedrooms) return false;
    if (filters.bathrooms !== undefined && property.bathrooms !== filters.bathrooms) return false;
    if (filters.furnished !== undefined && filters.furnished !== "all" && property.furnished !== filters.furnished) return false;
    if (filters.keyword && !property.title.toLowerCase().includes(filters.keyword.toLowerCase()) && !property.description.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
    return true;
  });
}

export const propertyQueryKeys = {
  all: ["properties"] as const,
  lists: (filters: PropertyFilters) => [...propertyQueryKeys.all, "list", filters] as const,
  detail: (id: string) => [...propertyQueryKeys.all, "detail", id] as const,
};

export async function fetchProperties(filters: PropertyFilters = {}): Promise<PropertyFeedResponse> {
  const limit = filters.limit ?? 12;
  const page = filters.page ?? 1;
  const skip = (page - 1) * limit;

  const params: Record<string, string | number | boolean> = {
    skip,
    limit,
  };

  
  if (filters.status && filters.status !== "all") {
    params.listing_type = filters.status === "rent" ? "FOR_RENT" : "FOR_SALE";
  }
  if (filters.city) params.address = filters.city;
  if (filters.minPrice !== undefined) params.min_price = filters.minPrice;
  if (filters.maxPrice !== undefined) params.max_price = filters.maxPrice;
  if (filters.bedrooms !== undefined) params.bedrooms = filters.bedrooms;
  if (filters.bathrooms !== undefined) params.bathrooms = filters.bathrooms;
  if (filters.furnished !== undefined && filters.furnished !== "all") params.furnished = filters.furnished;
  if (filters.featured !== undefined) params.featured = filters.featured;

  try {
    const response = await api.get<BackendPropertyFeedResponse>("/properties", { params });
    const rawList = response.data?.data ?? [];
    return {
      properties: rawList.map(mapBackendProperty),
      page,
      total: response.data?.total ?? 0,
    };
  } catch (error) {
    const filtered = applyFilters(MOCK_PROPERTIES, filters);
    const paged = filtered.slice(skip, skip + limit);
    return {
      properties: paged,
      page,
      total: filtered.length,
    };
  }
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  const response = await fetchProperties({ featured: true, limit, page: 1 });
  return (response.properties ?? []).slice(0, limit);
}

export async function getRecentProperties(limit = 4): Promise<Property[]> {
  const response = await fetchProperties({ page: 1, limit });
  return (response.properties ?? []).slice(0, limit);
}

export async function fetchPropertyById(id: string): Promise<Property> {
  try {
    const response = await api.get<BackendProperty | { data: BackendProperty }>(`/properties/${id}`);
    const data = (response.data as any)?.data ? (response.data as any).data : response.data;
    return mapBackendProperty(data as BackendProperty);
  } catch (error) {
    const fallback = MOCK_PROPERTIES.find((item) => item.id === id);
    if (fallback) return fallback;
    throw error;
  }
}

export function useProperties(filters: PropertyFilters = {}): UseQueryResult<PropertyFeedResponse, Error> {
  return useQuery<PropertyFeedResponse, Error>({
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