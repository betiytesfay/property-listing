// src/features/auth/hooks/use-protected-route-content.ts

'use client';

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AUTH_ROUTES,
  REDIRECT_QUERY_PARAM,
} from "../../../features/auth/constants/routes";
import { useAuth } from "../../../features/auth/hooks/use-auth";

interface UseProtectedRouteOptions {
  roles?: Array<"OWNER" | "ADMIN">;
  redirectTo?: string;
}

// This hook uses useSearchParams - it must be wrapped in Suspense
export function useProtectedRouteContent(options: UseProtectedRouteOptions = {}) {
  const { user, isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const redirectTo = options.redirectTo ?? AUTH_ROUTES.login;

  const hasRequiredRole =
    !options.roles?.length || (user?.role && options.roles.includes(user.role));

  const isAuthorized = isAuthenticated && hasRequiredRole;
  const isChecking = !isHydrated;

  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated) {
      const query = searchParams.toString();
      const current = query ? `${pathname}?${query}` : pathname;
      const loginUrl = `${redirectTo}?${REDIRECT_QUERY_PARAM}=${encodeURIComponent(current)}`;
      router.replace(loginUrl);
      return;
    }

    if (!hasRequiredRole) {
      router.replace("/");
    }
  }, [
    hasRequiredRole,
    isAuthenticated,
    isHydrated,
    pathname,
    redirectTo,
    router,
    searchParams,
  ]);

  return {
    user,
    isAuthorized,
    isChecking,
    isHydrated,
  };
}