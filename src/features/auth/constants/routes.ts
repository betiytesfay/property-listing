export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;
export const ADMIN_ROUTES = {
  dashboard: "/admin/dashboard",
  registerAdmin: "/admin/register-admin",
} as const;

export const OWNER_ROUTES = {
  dashboard: "/dashboard",
  seller: "/seller",
} as const;

export const PROTECTED_ROUTES = [
  OWNER_ROUTES.dashboard,
  OWNER_ROUTES.seller,
  ADMIN_ROUTES.dashboard,
  ADMIN_ROUTES.registerAdmin,
] as const;

export const ADMIN_ONLY_ROUTES = [
  ADMIN_ROUTES.dashboard,
  ADMIN_ROUTES.registerAdmin,
] as const;

export const OWNER_ONLY_ROUTES = [OWNER_ROUTES.dashboard, OWNER_ROUTES.seller] as const;

export const GUEST_ONLY_ROUTES = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.register,
  AUTH_ROUTES.forgotPassword,
  AUTH_ROUTES.resetPassword,
] as const;

/** @deprecated Use resolvePostAuthRedirect with user role instead */
export const DEFAULT_LOGIN_REDIRECT = OWNER_ROUTES.dashboard;
export const DEFAULT_LOGOUT_REDIRECT = "/";

export const REDIRECT_QUERY_PARAM = "redirect";
