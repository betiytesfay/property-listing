import { ADMIN_ROUTES, OWNER_ROUTES } from "@/src/features/auth/constants/routes";
import { USER_ROLES } from "@/src/features/auth/constants/roles";
import { isAdmin } from "@/src/features/auth/utils/roles";
import type { UserRole } from "@/src/features/auth/types/auth.types";

export function getDashboardPathForRole(role: UserRole): string {
  return isAdmin(role) ? ADMIN_ROUTES.dashboard : OWNER_ROUTES.dashboard;
}

function canAccessRedirectPath(role: UserRole, path: string): boolean {
  if (path.startsWith("/admin")) {
    return isAdmin(role);
  }

  if (path.startsWith("/dashboard") || path.startsWith("/seller")) {
    return role === USER_ROLES.OWNER;
  }

  return true;
}

/**
 * Resolves where to send the user after login/register based on JWT role.
 * Honors ?redirect= only when the role is allowed to access that path.
 */
export function resolvePostAuthRedirect(
  role: UserRole,
  requestedRedirect?: string | null
): string {
  const defaultPath = getDashboardPathForRole(role);

  if (!requestedRedirect || !requestedRedirect.startsWith("/")) {
    return defaultPath;
  }

  if (canAccessRedirectPath(role, requestedRedirect)) {
    return requestedRedirect;
  }

  return defaultPath;
}

export function getUnauthorizedRedirectPath(role?: UserRole | null): string {
  if (!role) {
    return "/";
  }

  return getDashboardPathForRole(role);
}
