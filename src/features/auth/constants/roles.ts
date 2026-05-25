import type { UserRole } from "@/src/features/auth/types/auth.types";

export const USER_ROLES = {
  OWNER: "OWNER",
  ADMIN: "ADMIN",
} as const satisfies Record<string, UserRole>;

export const ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.OWNER]: "Property seller",
  [USER_ROLES.ADMIN]: "Administrator",
};
