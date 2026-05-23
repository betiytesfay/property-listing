// import { useQuery, type UseQueryResult } from "@tanstack/react-query";
// import api from "./api";
// import type { Property, PropertyFeedResponse, PropertyFilters } from "../types/propertyTypes";

// const MOCK_PROPERTIES: Property[] = [
//   {
//     id: "fallback-1",
//     title: "Luxury 3-Bedroom Apartment",
//     description: "An upscale apartment with premium finishes and city views.",
//     city: "Addis Ababa",
//     subCity: "Bole",
//     featured: true,
//     price: 12500000,
//     bedrooms: 3,
//     bathrooms: 2,
//     area: 165,
//     furnished: true,
//     status: "sale",
//     imageUrl: "https://images.unsplash.com/photo-1560185127-6c7b2d8d81e9?auto=format&fit=crop&w=1400&q=80",
//   },
//   {
//     id: "fallback-2",
//     title: "Modern Studio Apartment",
//     description: "Compact living with stylish amenities near the city center.",
//     city: "Addis Ababa",
//     subCity: "Kazanchis",
//     featured: true,
//     price: 4200000,
//     bedrooms: 1,
//     bathrooms: 1,
//     area: 65,
//     furnished: false,
//     status: "rent",
//     imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
//   },
//   {
//     id: "fallback-3",
//     title: "Family House with Garden",
//     description: "A family-ready home with an open plan living area and private garden.",
//     city: "Bahir Dar",
//     subCity: "Lake View",
//     featured: true,
//     price: 22000000,
//     bedrooms: 4,
//     bathrooms: 3,
//     area: 280,
//     furnished: true,
//     status: "sale",
//     imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
//   },
//   {
//     id: "fallback-4",
//     title: "Cozy 2-Bedroom Townhouse",
//     description: "Affordable townhouse offering comfortable living and easy access to amenities.",
//     city: "Gondar",
//     subCity: "Mekina",
//     featured: false,
//     price: 6800000,
//     bedrooms: 2,
//     bathrooms: 2,
//     area: 120,
//     furnished: false,
//     status: "sale",
//     imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
//   },
//   {
//     id: "fallback-5",
//     title: "Bright Rental Apartment",
//     description: "Fresh rental space with plenty of natural light and modern finishes.",
//     city: "Dire Dawa",
//     subCity: "Kebena",
//     featured: false,
//     price: 3100000,
//     bedrooms: 2,
//     bathrooms: 1,
//     area: 90,
//     furnished: true,
//     status: "rent",
//     imageUrl: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
//   },
// ];

// function applyFilters(properties: Property[], filters: PropertyFilters): Property[] {
//   return properties.filter((property) => {
//     if (filters.featured !== undefined && property.featured !== filters.featured) return false;
//     if (filters.status && filters.status !== "all" && property.status !== filters.status) return false;
//     if (filters.city && property.city !== filters.city) return false;
//     if (filters.minPrice !== undefined && property.price < filters.minPrice) return false;
//     if (filters.maxPrice !== undefined && property.price > filters.maxPrice) return false;
//     if (filters.bedrooms !== undefined && property.bedrooms !== filters.bedrooms) return false;
//     if (filters.bathrooms !== undefined && property.bathrooms !== filters.bathrooms) return false;
//     if (filters.furnished !== undefined && filters.furnished !== "all" && property.furnished !== filters.furnished) return false;
//     if (filters.keyword && !property.title.toLowerCase().includes(filters.keyword.toLowerCase()) && !property.description.toLowerCase().includes(filters.keyword.toLowerCase())) return false;
//     return true;
//   });
// }

// export const propertyQueryKeys = {
//   all: ["properties"] as const,
//   lists: (filters: PropertyFilters) => [...propertyQueryKeys.all, "list", filters] as const,
//   detail: (id: string) => [...propertyQueryKeys.all, "detail", id] as const,
// };

// export async function fetchProperties(filters: PropertyFilters = {}): Promise<PropertyFeedResponse> {
//   const params: Record<string, string | number | boolean> = {
//     page: filters.page ?? 1,
//   };

//   if (filters.status && filters.status !== "all") params.status = filters.status;
//   if (filters.city) params.city = filters.city;
//   if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
//   if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
//   if (filters.bedrooms !== undefined) params.bedrooms = filters.bedrooms;
//   if (filters.bathrooms !== undefined) params.bathrooms = filters.bathrooms;
//   if (filters.furnished !== undefined && filters.furnished !== "all") params.furnished = filters.furnished;
//   if (filters.featured !== undefined) params.featured = filters.featured;
//   if (filters.limit !== undefined) params.limit = filters.limit;

//   try {
//     const response = await api.get<PropertyFeedResponse>("/properties", { params });
//     return response.data;
//   } catch (error) {
//     const filtered = applyFilters(MOCK_PROPERTIES, filters);
//     const paged = filters.limit !== undefined ? filtered.slice(0, filters.limit) : filtered;
//     return {
//       properties: paged,
//       page: 1,
//       total: filtered.length,
//     };
//   }
// }

// export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
//   const response = await fetchProperties({ featured: true, limit, page: 1 });
//   return response.properties.slice(0, limit);
// }

// export async function getRecentProperties(limit = 4): Promise<Property[]> {
//   const response = await fetchProperties({ page: 1, limit });
//   return response.properties.slice(0, limit);
// }

// export async function fetchPropertyById(id: string): Promise<Property> {
//   try {
//     const response = await api.get<Property>(`/properties/${id}`);
//     return response.data;
//   } catch (error) {
//     const fallback = MOCK_PROPERTIES.find((item) => item.id === id);
//     if (fallback) return fallback;
//     throw error;
//   }
// }

// export function useProperties(filters: PropertyFilters = {}): UseQueryResult<PropertyFeedResponse, Error> {
//   return useQuery<PropertyFeedResponse, Error>({
//     queryKey: propertyQueryKeys.lists(filters),
//     queryFn: () => fetchProperties(filters),
//     placeholderData: (previousData) => previousData,
//     staleTime: 1000 * 60 * 2,
//   });
// }

// export function usePropertyById(id?: string): UseQueryResult<Property, Error> {
//   return useQuery<Property, Error>({
//     queryKey: propertyQueryKeys.detail(id ?? ""),
//     queryFn: () => fetchPropertyById(id ?? ""),
//     enabled: Boolean(id),
//     staleTime: 1000 * 60 * 5,
//   });
// }


import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "./api";
import type { Property, PropertyFeedResponse, PropertyFilters } from "../types/propertyTypes";

const MOCK_PROPERTIES: Property[] = [
  // ... your mock properties here (unchanged)
];

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
  const params: Record<string, string | number | boolean> = {
    page: filters.page ?? 1,
  };

  if (filters.status && filters.status !== "all") params.status = filters.status;
  if (filters.city) params.city = filters.city;
  if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
  if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
  if (filters.bedrooms !== undefined) params.bedrooms = filters.bedrooms;
  if (filters.bathrooms !== undefined) params.bathrooms = filters.bathrooms;
  if (filters.furnished !== undefined && filters.furnished !== "all") params.furnished = filters.furnished;
  if (filters.featured !== undefined) params.featured = filters.featured;
  if (filters.limit !== undefined) params.limit = filters.limit;

  try {
    const response = await api.get<PropertyFeedResponse>("/properties", { params });
    // Ensure properties is always an array
    return {
      ...response.data,
      properties: response.data?.properties ?? [],
    };
  } catch (error) {
    const filtered = applyFilters(MOCK_PROPERTIES, filters);
    const paged = filters.limit !== undefined ? filtered.slice(0, filters.limit) : filtered;
    return {
      properties: paged,
      page: 1,
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
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
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
