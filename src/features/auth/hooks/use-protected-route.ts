"use client";

import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AUTH_ROUTES,
  REDIRECT_QUERY_PARAM,
} from "@/src/features/auth/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/use-auth";
import { getUnauthorizedRedirectPath } from "@/src/features/auth/utils/redirect";
import type { UserRole } from "@/src/features/auth/types/auth.types";

interface UseProtectedRouteOptions {
  /** Required roles; omit to allow any authenticated user */
  roles?: UserRole[];
  redirectTo?: string;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
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
    if (!isHydrated) {
      return;
    }

    if (!isAuthenticated) {
      const query = searchParams.toString();
      const current = query ? `${pathname}?${query}` : pathname;
      const loginUrl = `${redirectTo}?${REDIRECT_QUERY_PARAM}=${encodeURIComponent(current)}`;
      router.replace(loginUrl);
      return;
    }

    if (!hasRequiredRole) {
      router.replace(getUnauthorizedRedirectPath(user?.role));
    }
  }, [
    hasRequiredRole,
    isAuthenticated,
    isHydrated,
    pathname,
    redirectTo,
    router,
    searchParams,
    user?.role,
  ]);

  return {
    user,
    isAuthorized,
    isChecking,
    isHydrated,
  };
}
