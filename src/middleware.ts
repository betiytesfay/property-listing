import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  GUEST_ONLY_ROUTES,
  PROTECTED_ROUTES,
  REDIRECT_QUERY_PARAM,
} from "@/src/features/auth/constants/routes";
import { AUTH_COOKIE_NAME } from "@/src/features/auth/constants/storage";

function isGuestRoute(pathname: string): boolean {
  return GUEST_ONLY_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function hasAuthCookie(request: NextRequest): boolean {
  return request.cookies.get(AUTH_COOKIE_NAME)?.value === "1";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = hasAuthCookie(request);

  if (authenticated && isGuestRoute(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = DEFAULT_LOGIN_REDIRECT;
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (!authenticated && isProtectedRoute(pathname)) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = AUTH_ROUTES.login;
    loginUrl.searchParams.set(REDIRECT_QUERY_PARAM, `${pathname}${request.nextUrl.search}`);
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
  ],
};
