"use client";

import type { ReactNode } from "react";
import { USER_ROLES } from "@/src/features/auth/constants/roles";
import { AuthGuard } from "@/src/features/auth/components/auth-guard";

interface OwnerGuardProps {
  children: ReactNode;
}

export function OwnerGuard({ children }: OwnerGuardProps) {
  return <AuthGuard roles={[USER_ROLES.OWNER]}>{children}</AuthGuard>;
}