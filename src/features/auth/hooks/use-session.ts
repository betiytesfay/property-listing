"use client";

import { useAuthStore } from "@/src/features/auth/store/auth-store";

export function useSession() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const refreshSession = useAuthStore((state) => state.refreshSession);

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
    isHydrated,
    restoreSession,
    refreshSession,
  };
}
