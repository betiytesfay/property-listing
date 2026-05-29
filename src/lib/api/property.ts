import { CreatePropertyInput } from "@/src/lib/validations/property";
import apiClient from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropertyResponse {
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
  media_urls: string[];
  listing_fee_paid: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ─── Properties list response ─────────────────────────────────────────────────

export interface PropertiesListResponse {
  total: number;
  skip: number;
  limit: number;
  data: PropertyResponse[];
}

export interface PropertyListParams {
  skip?: number;
  limit?: number;
  category?: string;
  listing_type?: string;
  address?: string;
  min_price?: number;
  max_price?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────


export function normaliseListingType(raw: string): "sale" | "rent" {
  return raw.toUpperCase().includes("RENT") ? "rent" : "sale";
}

export function formatPrice(
  priceStr: string,
  listingType?: string
): string {
  const n = parseFloat(priceStr);

  if (isNaN(n)) return priceStr;

  const formatted = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(n);

  return listingType &&
    normaliseListingType(listingType) === "rent"
    ? `${formatted} / mo`
    : formatted;
}

// ─── Property CRUD ────────────────────────────────────────────────────────────

export async function createProperty(
  data: CreatePropertyInput
): Promise<PropertyResponse> {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("listing_type", data.listing_type);

  formData.append(
    "price",
    data.price !== undefined && data.price !== null
      ? data.price.toString()
      : ""
  );

  formData.append("address", data.address);

  if (data.description) {
    formData.append("description", data.description);
  }

  if (
    data.latitude !== undefined &&
    data.latitude !== null &&
    data.latitude !== ""
  ) {
    formData.append("latitude", data.latitude.toString());
  }

  if (
    data.longitude !== undefined &&
    data.longitude !== null &&
    data.longitude !== ""
  ) {
    formData.append("longitude", data.longitude.toString());
  }

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("images[]", file);
    });
  }

  const response = await apiClient.post<PropertyResponse>(
    `/properties`,
    formData
  );

  return response.data;
}

export async function getProperty(
  propertyId: string
): Promise<PropertyResponse | null> {
  try {
    const response = await apiClient.get<PropertyResponse>(
      `/properties/${propertyId}`
    );

    return response.data;
  } catch {
    return null;
  }
}

export async function getProperties(
  params: PropertyListParams = {}
): Promise<PropertiesListResponse> {
  const response = await apiClient.get<PropertiesListResponse>(
    `/properties`,
    {
      params,
    }
  );

  return response.data;
}

export async function updateProperty(
  propertyId: string,
  data: Partial<Omit<CreatePropertyInput, "images">>
): Promise<PropertyResponse> {
  const response = await apiClient.patch<PropertyResponse>(
    `/properties/${propertyId}`,
    data
  );

  return response.data;
}

export async function deleteProperty(
  propertyId: string
): Promise<void> {
  await apiClient.delete(`/properties/${propertyId}`);
}

// ─── Property Images ──────────────────────────────────────────────────────────

export async function addPropertyImages(
  propertyId: string,
  images: File[]
): Promise<{ media_urls: string[] }> {
  const formData = new FormData();

  images.forEach((file) => {
    formData.append("images[]", file);
  });

  const response = await apiClient.post<{
    media_urls: string[];
  }>(`/properties/${propertyId}/images`, formData);

  return response.data;
}

export async function deletePropertyImage(
  propertyId: string,
  filename: string
): Promise<void> {
  await apiClient.delete(
    `/properties/${propertyId}/images/${encodeURIComponent(filename)}`
  );
}

// ─── Property Payments ────────────────────────────────────────────────────────

export async function initiatePropertyPayment(
  propertyId: string
): Promise<{
  checkout_url: string;
  tx_ref: string;
}> {
  const response = await apiClient.post(
    `/payments/properties/${propertyId}/pay`
  );

  return response.data;
}

export async function getPropertyPaymentStatus(
  propertyId: string
): Promise<{
  id: string;
  property_id: string;
  tx_ref: string;
  amount: string;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
}> {
  const response = await apiClient.get(
    `/payments/properties/${propertyId}/payment-status`
  );

  return response.data;
}