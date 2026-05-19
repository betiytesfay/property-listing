export type UserRole = "OWNER" | "ADMIN";

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
}

export interface AuthUser {
  userId: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  type: "access" | "refresh";
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone_number: string | null;
  password: string;
  role: UserRole;
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface LogoutRequest {
  refresh_token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface MessageResponse {
  message: string;
}

export interface ForgotPasswordResponse extends MessageResponse {
  reset_token?: string;
  expires_at?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  isLoading: boolean;
}
