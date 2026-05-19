"use client";

import { useAuth } from "@/src/features/auth/hooks/use-auth";

export function useCurrentUser() {
  const { user, isAuthenticated, isHydrated } = useAuth();

  return {
    user,
    isAuthenticated,
    isReady: isHydrated,
  };
}
