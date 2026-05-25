import { AUTH_COOKIE_NAME } from "@/src/features/auth/constants/storage";

const MAX_AGE_REMEMBER_SECONDS = 60 * 60 * 24 * 30;

export function setAuthCookie(rememberMe: boolean): void {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const maxAge = rememberMe ? `; Max-Age=${MAX_AGE_REMEMBER_SECONDS}` : "";
  document.cookie = `${AUTH_COOKIE_NAME}=1; Path=/; SameSite=Lax${maxAge}${secure}`;
}

export function clearAuthCookie(): void {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function hasAuthCookie(cookieHeader: string | undefined): boolean {
  if (!cookieHeader) {
    return false;
  }

  return cookieHeader.split(";").some((part) => part.trim().startsWith(`${AUTH_COOKIE_NAME}=1`));
}
