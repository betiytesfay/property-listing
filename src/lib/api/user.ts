import { apiClient } from "./client";

export interface ForgotPasswordResponse {
  message: string;
  reset_token?: string;
  expires_at?: string;
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
  const response = await apiClient.post<ForgotPasswordResponse>("/auth/forgot-password", {
    email,
  });
  return response.data;
}
