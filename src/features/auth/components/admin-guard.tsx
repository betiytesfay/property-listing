"use client";

import type { ReactNode } from "react";
import { USER_ROLES } from "@/src/features/auth/constants/roles";
import { AuthGuard } from "@/src/features/auth/components/auth-guard";

interface AdminGuardProps {
  children: ReactNode;
}

export function AdminGuard({ children }: AdminGuardProps) {
  return <AuthGuard roles={[USER_ROLES.ADMIN]}>{children}</AuthGuard>;
}