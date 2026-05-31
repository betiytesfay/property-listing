"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/src/features/auth/services/auth.service";
import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  REDIRECT_QUERY_PARAM,
} from "@/src/features/auth/constants/routes";
import type { LoginFormValues } from "@/src/features/auth/schemas/auth.schemas";
import { useAuthStore } from "@/src/features/auth/store/auth-store";
import { userFromAccessToken } from "@/src/features/auth/utils/jwt";
import { getErrorMessage } from "@/src/lib/api/errors";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(
    async (values: LoginFormValues) => {
      setIsLoading(true);
      setError(null);

      try {
        const tokens = await authService.login({
          email: values.email.trim().toLowerCase(),
          password: values.password,
        });

        console.log("Raw tokens:", tokens); // DEBUG

        const user = userFromAccessToken(tokens.access_token);
        console.log("Extracted user object:", user); // DEBUG
        console.log("User role:", user?.role); // DEBUG
        console.log("User role type:", typeof user?.role); // DEBUG

        if (!user) {
          throw new Error("Invalid authentication response");
        }

        setSession(
          {
            user,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          },
          Boolean(values.rememberMe)
        );

        // Determine redirect based on user role
        const userRole = user.role?.toUpperCase();

        const redirectFromQuery = searchParams.get(REDIRECT_QUERY_PARAM);

        const redirectTo =
          userRole === "ADMIN"
            ? "/admin/dashboard"
            : redirectFromQuery || "/dashboard";

        console.log("Final redirect to:", redirectTo);

        router.replace(redirectTo);
        router.refresh();
        return true;
      } catch (err) {
        console.error("Login error:", err); // DEBUG
        setError(getErrorMessage(err, "Unable to sign in. Check your credentials."));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [router, searchParams, setSession]
  );

  return {
    login,
    isLoading,
    error,
    clearError: () => setError(null),
    loginPath: AUTH_ROUTES.login,
  };
}