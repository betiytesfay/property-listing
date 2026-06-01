"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/features/auth/services/auth.service";
import { USER_ROLES } from "@/src/features/auth/constants/roles";
import {
  formatPhoneForApi,
  type RegisterFormValues,
} from "@/src/features/auth/schemas/auth.schemas";
import { useAuthStore } from "@/src/features/auth/store/auth-store";
import { resolvePostAuthRedirect } from "@/src/features/auth/utils/redirect";
import { userFromAccessToken } from "@/src/features/auth/utils/jwt";
import { getErrorMessage } from "@/src/lib/api/errors";

export function useRegister() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = useCallback(
    async (values: RegisterFormValues) => {
      setIsLoading(true);
      setError(null);

      try {
        const tokens = await authService.register({
          full_name: values.fullName.trim(),
          email: values.email.trim().toLowerCase(),
          phone_number: formatPhoneForApi(values.phone),
          password: values.password,
          role: USER_ROLES.OWNER,
        });

        const user = userFromAccessToken(tokens.access_token);
        if (!user) {
          throw new Error("Invalid registration response");
        }

        setSession(
          {
            user: { ...user, fullName: values.fullName.trim() },
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          },
          true
        );

        router.replace(resolvePostAuthRedirect(user.role));
        router.refresh();
        return true;
      } catch (err) {
        setError(getErrorMessage(err, "Unable to create your account. Please try again."));
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [router, setSession]
  );

  return {
    register,
    isLoading,
    error,
    clearError: () => setError(null),
  };
}