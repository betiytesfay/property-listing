"use client";

import { useEffect } from "react";
import { configureApiClient } from "@/src/lib/api/client";
import { useAuthStore } from "@/src/features/auth/store/auth-store";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const restoreSession = useAuthStore((state) => state.restoreSession);

  useEffect(() => {
    configureApiClient({
      getAccessToken: () => useAuthStore.getState().accessToken,
      refreshAccessToken: () => useAuthStore.getState().refreshSession(),
      onUnauthorized: () => useAuthStore.getState().clearSession(),
    });

    void restoreSession();
  }, [restoreSession]);

  return <>{children}</>;
}
