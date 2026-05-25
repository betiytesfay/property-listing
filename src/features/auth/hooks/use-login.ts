"use client";

import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/src/features/auth/services/auth.service";
import { AUTH_ROUTES, REDIRECT_QUERY_PARAM } from "@/src/features/auth/constants/routes";
import type { LoginFormValues } from "@/src/features/auth/schemas/auth.schemas";
import { useAuthStore } from "@/src/features/auth/store/auth-store";
import { resolvePostAuthRedirect } from "@/src/features/auth/utils/redirect";
import { userFromAccessToken } from "@/src/features/auth/utils/jwt";
import { getLoginErrorMessage } from "@/src/features/auth/utils/login-errors";

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

        const user = userFromAccessToken(tokens.access_token);
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

        const redirectTo = resolvePostAuthRedirect(
          user.role,
          searchParams.get(REDIRECT_QUERY_PARAM)
        );

        router.replace(redirectTo);
        router.refresh();
        return true;
      } catch (err) {
        setError(getLoginErrorMessage(err));
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
