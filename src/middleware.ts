import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_ROUTES,
  GUEST_ONLY_ROUTES,
  PROTECTED_ROUTES,
  REDIRECT_QUERY_PARAM,
} from "@/src/features/auth/constants/routes";
import { AUTH_COOKIE_NAME } from "@/src/features/auth/constants/storage";
import { getRoleFromCookieHeader } from "@/src/features/auth/utils/cookies";
import { getDashboardPathForRole } from "@/src/features/auth/utils/redirect";
import type { UserRole } from "@/src/features/auth/types/auth.types";

function isGuestRoute(pathname: string): boolean {
  return GUEST_ONLY_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function hasAuthCookie(request: NextRequest): boolean {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value === "1";
}

function getRoleFromRequest(request: NextRequest): UserRole | null {
  return (
    getRoleFromCookieHeader(request.headers.get("cookie") ?? undefined) ??
    (request.cookies.get("hp_role")?.value as UserRole | undefined) ??
    null
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasAuthCookie(request);
  const role = getRoleFromRequest(request);

  if (authenticated && isGuestRoute(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = role ? getDashboardPathForRole(role) : "/dashboard";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (!authenticated && isProtectedRoute(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = AUTH_ROUTES.login;
    loginUrl.searchParams.set(
      REDIRECT_QUERY_PARAM,
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/dashboard/:path*",
    "/seller/:path*",
    "/admin/:path*",
  ],
};