"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { DEFAULT_LOGIN_REDIRECT } from "@/src/features/auth/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/use-auth";

interface GuestOnlyGuardProps {
  children: ReactNode;
}

/**
 * Always renders children on the server and first client paint to avoid hydration mismatch.
 * Redirect runs in useEffect after session restore (middleware also guards guest routes).
 */
export function GuestOnlyGuard({ children }: GuestOnlyGuardProps) {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(DEFAULT_LOGIN_REDIRECT);
    }
  }, [isAuthenticated, isHydrated, router]);

  if (isHydrated && isAuthenticated) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-auth-on-surface-muted">
        <Loader2 className="h-7 w-7 animate-spin text-auth-primary" aria-hidden />
        <p className="text-sm font-medium">Redirecting…</p>
      </div>
    );
  }

  return <>{children}</>;
}
