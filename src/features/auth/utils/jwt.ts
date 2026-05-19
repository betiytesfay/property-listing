import type { AuthUser, JwtPayload, UserRole } from "@/src/features/auth/types/auth.types";

const JWT_PARTS = 3;

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== JWT_PARTS) {
      return null;
    }

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof window !== "undefined"
        ? atob(base64)
        : Buffer.from(base64, "base64").toString("utf-8");

    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string, skewSeconds = 30): boolean {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) {
    return true;
  }

  const expiresAtMs = payload.exp * 1000;
  return Date.now() >= expiresAtMs - skewSeconds * 1000;
}

export function userFromAccessToken(token: string): AuthUser | null {
  const payload = decodeJwtPayload(token);
  if (!payload?.sub || !payload.email || !payload.role) {
    return null;
  }

  if (payload.type && payload.type !== "access") {
    return null;
  }

  return {
    userId: payload.sub,
    email: payload.email,
    role: payload.role as UserRole,
  };
}
