export { useAuth } from "@/src/features/auth/hooks/use-auth";
export { useCurrentUser } from "@/src/features/auth/hooks/use-current-user";
export { useLogin } from "@/src/features/auth/hooks/use-login";
export { useRegister } from "@/src/features/auth/hooks/use-register";
export { useRegisterAdmin } from "@/src/features/auth/hooks/use-register-admin";
export { useSession } from "@/src/features/auth/hooks/use-session";
export { useProtectedRoute } from "@/src/features/auth/hooks/use-protected-route";
export { AuthGuard } from "@/src/features/auth/components/auth-guard";
export { AdminGuard } from "@/src/features/auth/components/admin-guard";
export { OwnerGuard } from "@/src/features/auth/components/owner-guard";
export { GuestOnlyGuard } from "@/src/features/auth/components/guest-only-guard";
export { authService } from "@/src/features/auth/services/auth.service";
export { USER_ROLES, ROLE_LABELS } from "@/src/features/auth/constants/roles";
export {
  AUTH_ROUTES,
  ADMIN_ROUTES,
  OWNER_ROUTES,
} from "@/src/features/auth/constants/routes";
export { isAdmin, isOwner, hasRole } from "@/src/features/auth/utils/roles";
export {
  getDashboardPathForRole,
  resolvePostAuthRedirect,
} from "@/src/features/auth/utils/redirect";
export type { AuthUser, UserRole } from "@/src/features/auth/types/auth.types";
