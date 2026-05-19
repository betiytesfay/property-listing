"use client";

import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { useProtectedRoute } from "@/src/features/auth/hooks/use-protected-route";
import type { UserRole } from "@/src/features/auth/types/auth.types";

interface AuthGuardProps {
  children: ReactNode;
  roles?: UserRole[];
}

export function AuthGuard({ children, roles }: AuthGuardProps) {
  const { isAuthorized, isChecking } = useProtectedRoute({ roles });

  if (isChecking) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-600">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" aria-hidden />
        <p className="text-sm font-medium">Verifying your session…</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
