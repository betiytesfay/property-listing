"use client";

import { useAuthStore } from "@/src/features/auth/store/auth-store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const logout = useAuthStore((state) => state.logout);
  const setSession = useAuthStore((state) => state.setSession);

  return {
    user,
    isAuthenticated,
    isHydrated,
    isLoading,
    logout,
    setSession,
  };
}
