import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "./api";
import type { Property, PropertyFeedResponse, PropertyFilters } from "../types/propertyTypes";

export const propertyQueryKeys = {
  all: ["properties"] as const,
  lists: (filters: PropertyFilters) => [...propertyQueryKeys.all, "list", filters] as const,
  detail: (id: string) => [...propertyQueryKeys.all, "detail", id] as const,
};

export async function fetchProperties(filters: PropertyFilters = {}): Promise<PropertyFeedResponse> {
  const params: Record<string, string | number | boolean> = {
    page: filters.page ?? 1,
  };

  if (filters.status && filters.status !== "all") params.status = filters.status;
  if (filters.city) params.city = filters.city;
  if (filters.minPrice) params.minPrice = filters.minPrice;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
  if (filters.bedrooms) params.bedrooms = filters.bedrooms;
  if (filters.bathrooms) params.bathrooms = filters.bathrooms;
  if (filters.furnished && filters.furnished !== "all") params.furnished = filters.furnished;

  const response = await api.get<PropertyFeedResponse>("/properties", { params });
  return response.data;
}

export async function fetchPropertyById(id: string): Promise<Property> {
  const response = await api.get<Property>(`/properties/${id}`);
  return response.data;
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
