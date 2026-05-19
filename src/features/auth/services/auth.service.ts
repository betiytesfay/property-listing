import apiClient from "@/src/lib/api/client";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LogoutRequest,
  MessageResponse,
  RegisterRequest,
  RefreshTokenRequest,
  ResetPasswordRequest,
  TokenResponse,
} from "@/src/features/auth/types/auth.types";

const AUTH_BASE = "/auth";

export const authService = {
  async login(data: LoginRequest): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(`${AUTH_BASE}/login`, data);
    return response.data;
  },

  async register(data: RegisterRequest): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(`${AUTH_BASE}/register`, data);
    return response.data;
  },

  async refresh(data: RefreshTokenRequest): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(`${AUTH_BASE}/refresh`, data);
    return response.data;
  },

  async logout(data: LogoutRequest): Promise<MessageResponse> {
    const response = await apiClient.post<MessageResponse>(`${AUTH_BASE}/logout`, data);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    const response = await apiClient.post<ForgotPasswordResponse>(`${AUTH_BASE}/forgot-password`, data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest): Promise<MessageResponse> {
    const response = await apiClient.post<MessageResponse>(`${AUTH_BASE}/reset-password`, data);
    return response.data;
  },
};
