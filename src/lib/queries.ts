import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import api from "./api";
import type {
  Property,
  PropertyFilters,
  PropertyFeedResponse,
} from "../types/propertyTypes";

interface BackendProperty {
  property_id: string;
  owner_id: string;
  title: string;
  description: string;

  category: "RESIDENTIAL" | "COMMERCIAL" | "INDUSTRIAL" | "LAND";
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

interface BackendPropertyFeedResponse {
  total: number;
  skip: number;
  limit: number;
  data: BackendProperty[];
}

function mapBackendProperty(p: BackendProperty): Property {
  return {
    property_id: p.property_id,
    owner_id: p.owner_id,
    title: p.title,
    description: p.description,

    category: p.category,
    listing_type: p.listing_type,

    price: p.price,
    address: p.address,
    latitude: p.latitude,
    longitude: p.longitude,

    media_urls: p.media_urls,
    listing_fee_paid: p.listing_fee_paid,
    is_active: p.is_active,

    created_at: p.created_at,
    updated_at: p.updated_at,
  };
}


const MOCK_PROPERTIES: Property[] = [];


function applyFilters(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  return properties.filter((property) => {
    if (
      filters.listing_type &&
      filters.listing_type !== "all" &&
      property.listing_type !== filters.listing_type
    )
      return false;

    if (filters.category && property.category !== filters.category)
      return false;

    if (
      filters.address &&
      !property.address.toLowerCase().includes(filters.address.toLowerCase())
    )
      return false;

    if (
      filters.minPrice !== undefined &&
      Number(property.price) < filters.minPrice
    )
      return false;

    if (
      filters.maxPrice !== undefined &&
      Number(property.price) > filters.maxPrice
    )
      return false;

    if (
      filters.is_active !== undefined &&
      property.is_active !== filters.is_active
    )
      return false;

    if (filters.keyword) {
      const k = filters.keyword.toLowerCase();
      if (
        !property.title.toLowerCase().includes(k) &&
        !(property.description ?? "").toLowerCase().includes(k)
      )
        return false;
    }

    return true;
  });
}

/* -----------------------------
   QUERY KEYS
------------------------------ */

export const propertyQueryKeys = {
  all: ["properties"] as const,
  lists: (filters: PropertyFilters) =>
    [...propertyQueryKeys.all, "list", filters] as const,
  detail: (id: string) =>
    [...propertyQueryKeys.all, "detail", id] as const,
};

/* -----------------------------
   FETCH PROPERTIES (MAIN)
------------------------------ */

export async function fetchProperties(
  filters: PropertyFilters = {}
): Promise<PropertyFeedResponse> {
  const page = filters.page ?? 1;
  const limit = filters.limit ?? 10;
  const skip = (page - 1) * limit;

  const params: Record<string, string | number | boolean> = {
    skip,
    limit,
  };

  if (filters.listing_type && filters.listing_type !== "all")
    params.listing_type = filters.listing_type;

  if (filters.category)
    params.category = filters.category;

  if (filters.minPrice !== undefined)
    params.minPrice = filters.minPrice;

  if (filters.maxPrice !== undefined)
    params.maxPrice = filters.maxPrice;

  if (filters.is_active !== undefined)
    params.is_active = filters.is_active;

  const response = await api.get<BackendPropertyFeedResponse>(
    "/properties",
    { params }
  );

  const raw = response.data?.data ?? [];

  return {
    data: raw.map(mapBackendProperty),
    total: response.data?.total ?? 0,
    skip,
    limit,
  };
}

/* -----------------------------
   FEATURED
------------------------------ */

export async function getFeaturedProperties(
  limit = 3
): Promise<Property[]> {
  const res = await fetchProperties({
    is_active: true,
    limit,
    page: 1,
  });

  return res.data.slice(0, limit);
}

/* -----------------------------
   RECENT
------------------------------ */

export async function getRecentProperties(
  limit = 4
): Promise<Property[]> {
  const res = await fetchProperties({
    limit,
    page: 1,
  });

  return res.data.slice(0, limit);
}

/* -----------------------------
   BY ID
------------------------------ */

export async function fetchPropertyById(
  id: string
): Promise<Property> {
  const response = await api.get<
    BackendProperty | { data: BackendProperty }
  >(`/properties/${id}`);

  const data = (response.data as any)?.data ?? response.data;

  return mapBackendProperty(data);
}

/* -----------------------------
   REACT QUERY HOOKS
------------------------------ */

export function useProperties(
  filters: PropertyFilters = {}
): UseQueryResult<PropertyFeedResponse, Error> {
  return useQuery({
    queryKey: propertyQueryKeys.lists(filters),
    queryFn: () => fetchProperties(filters),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 2,
  });
}

export function usePropertyById(
  id?: string
): UseQueryResult<Property, Error> {
  return useQuery({
    queryKey: propertyQueryKeys.detail(id ?? ""),
    queryFn: () => fetchPropertyById(id ?? ""),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}