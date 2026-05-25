export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
} as const;

export const PROTECTED_ROUTES = ["/dashboard", "/seller"] as const;

export const GUEST_ONLY_ROUTES = [
  AUTH_ROUTES.login,
  AUTH_ROUTES.register,
  AUTH_ROUTES.forgotPassword,
  AUTH_ROUTES.resetPassword,
] as const;

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
export const DEFAULT_LOGOUT_REDIRECT = "/";

export const REDIRECT_QUERY_PARAM = "redirect";
