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

  formData.append("title", data.title);
  formData.append("category", data.category);
  formData.append("listing_type", data.listing_type);
  formData.append("price", data.price !== undefined && data.price !== null ? data.price.toString() : "");
  formData.append("address", data.address);

  if (data.description) {
    formData.append("description", data.description);
  }
  
  if (data.latitude !== undefined && data.latitude !== null && data.latitude !== "") {
    formData.append("latitude", data.latitude.toString());
  }
  
  if (data.longitude !== undefined && data.longitude !== null && data.longitude !== "") {
    formData.append("longitude", data.longitude.toString());
  }

  if (data.images && data.images.length > 0) {
    data.images.forEach((file) => {
      formData.append("images[]", file);
    });
  }

  const response = await apiClient.post<PropertyResponse>(`/properties`, formData);
  return response.data;
}

export async function initiatePropertyPayment(
  propertyId: string
): Promise<{ checkout_url: string; tx_ref: string }> {
  const response = await apiClient.post(`/payments/properties/${propertyId}/pay`);
  return response.data;
}

export async function getPropertyPaymentStatus(
  propertyId: string
): Promise<{ id: string; property_id: string; tx_ref: string; amount: string; currency: string; status: string; created_at: string; updated_at: string }> {
  const response = await apiClient.get(`/payments/properties/${propertyId}/payment-status`);
  return response.data;
}

export async function getProperty(propertyId: string): Promise<PropertyResponse> {
  const response = await apiClient.get(`/properties/${propertyId}`);
  return response.data;
}

export async function updateProperty(
  propertyId: string,
  data: Partial<Omit<CreatePropertyInput, 'images'>>
): Promise<PropertyResponse> {
  const response = await apiClient.patch<PropertyResponse>(`/properties/${propertyId}`, data);
  return response.data;
}

export async function deleteProperty(propertyId: string): Promise<void> {
  await apiClient.delete(`/properties/${propertyId}`);
}

export async function addPropertyImages(
  propertyId: string,
  images: File[]
): Promise<{ media_urls: string[] }> {
  const formData = new FormData();
  images.forEach((file) => formData.append("images[]", file));
  const response = await apiClient.post<{ media_urls: string[] }>(
    `/properties/${propertyId}/images`,
    formData
  );
  return response.data;
}

export async function deletePropertyImage(propertyId: string, filename: string): Promise<void> {
  await apiClient.delete(`/properties/${propertyId}/images/${encodeURIComponent(filename)}`);
}