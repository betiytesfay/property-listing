import { USER_ROLES } from "@/src/features/auth/constants/roles";
import type { UserRole } from "@/src/features/auth/types/auth.types";

export function isAdmin(role?: UserRole | null): boolean {
  return role === USER_ROLES.ADMIN;
}

export function isOwner(role?: UserRole | null): boolean {
  return role === USER_ROLES.OWNER;
}

export function hasRole(userRole: UserRole | undefined | null, allowed: UserRole[]): boolean {
  return Boolean(userRole && allowed.includes(userRole));
}