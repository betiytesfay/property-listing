import { apiClient } from "./client";

export interface SellerListing {
  property_id: string;
  owner_id: string;
  title: string;
  description: string;
  category: string;
  listing_type: string;
  price: string;
  address: string;
  latitude?: string;
  longitude?: string;
  media_urls: string[];
  listing_fee_paid: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SellerListingResponse {
  total: number;
  skip: number;
  limit: number;
  data: SellerListing[];
}

export async function getSellerListings(skip = 0, limit = 20): Promise<SellerListingResponse> {
  const response = await apiClient.get<SellerListingResponse>("/properties/me/listings", {
    params: { skip, limit },
  });
  return response.data;
}

export async function getSavedProperties(skip = 0, limit = 20): Promise<SellerListingResponse> {
  const response = await apiClient.get<SellerListingResponse>("/properties/saved", {
    params: { skip, limit },
  });
  return response.data;
}

export interface InitiatePaymentResponse {
  checkout_url: string;
  tx_ref: string;
  amount: string;
  currency: string;
}

export async function initiatePropertyPayment(propertyId: string): Promise<InitiatePaymentResponse> {
  const response = await apiClient.post<InitiatePaymentResponse>(
    `/payments/properties/${propertyId}/pay`,
    {},
  );
  return response.data;
}
