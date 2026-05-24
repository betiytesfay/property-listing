import { CreatePropertyInput } from "@/src/lib/validations/property";
import apiClient from "./client";


export interface PropertyResponse {
  property_id: string;
  owner_id: string;
  title: string;
  description: string;
  category: string;
  listing_type: string;
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

export async function createProperty(data: CreatePropertyInput): Promise<PropertyResponse> {
  const formData = new FormData();

  // 1. Core Text Fields (Guaranteed by Zod validation, but coerced safely)
  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("listing_type", data.listing_type);
  
  // Safe coercion for price even if it's parsed as a native number or string
  formData.append("price", data.price !== undefined && data.price !== null ? data.price.toString() : "");
  formData.append("address", data.address);

  // 2. Optional Fields - Only append and call .toString() if they actually exist
  if (data.description) {
    formData.append("description", data.description);
  }
  
  if (data.latitude !== undefined && data.latitude !== null && data.latitude !== "") {
    formData.append("latitude", data.latitude.toString());
  }
  
  if (data.longitude !== undefined && data.longitude !== null && data.longitude !== "") {
    formData.append("longitude", data.longitude.toString());
  }

  // 3. Image Binary Arrays
  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  const response = await apiClient.post<PropertyResponse>(`/properties`, formData);
  return response.data;
}
/**
 * Initiate payment for a property listing
 * Returns checkout URL to redirect user to payment gateway
 */
export async function initiatePropertyPayment(
  propertyId: string
): Promise<{ checkout_url: string; tx_ref: string }> {
  const response = await apiClient.post(`/payments/properties/${propertyId}/pay`);
  return response.data;
}

/**
 * Get payment status for a property
 */
export async function getPropertyPaymentStatus(
  propertyId: string
): Promise<{ id: string; property_id: string; tx_ref: string; amount: string; currency: string; status: string; created_at: string; updated_at: string }> {
  const response = await apiClient.get(`/payments/properties/${propertyId}/payment-status`);
  return response.data;
}
