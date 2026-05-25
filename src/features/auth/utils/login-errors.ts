import axios from "axios";
import { ApiError, getErrorMessage } from "@/src/lib/api/errors";

/**
 * Backend returns the same 401 detail for unknown email and wrong password.
 * Map that to clear, actionable copy without probing other APIs (no backend changes).
 *
 * When the API adds distinct codes (e.g. email_not_registered / incorrect_password),
 * extend mapLoginDetail below — no other call sites need to change.
 */
const LOGIN_API_ERROR_CODES = {
  emailNotRegistered: "email_not_registered",
  incorrectPassword: "incorrect_password",
} as const;

const INVALID_CREDENTIALS_PATTERNS = [
  /^invalid credentials$/i,
  /^could not validate credentials$/i,
];

/**
 * Shown for generic 401 "Invalid credentials" — API does not say which field failed.
 */
const SIGN_IN_FAILED_MESSAGE =
  "invalid credentials";

const EMAIL_NOT_REGISTERED_MESSAGE =
  "No account is registered with this email. Check the spelling or create a seller account.";

const INCORRECT_PASSWORD_MESSAGE =
  "The password you entered is incorrect. Try again or use Forgot password below.";

const ACCOUNT_INACTIVE_MESSAGE =
  "This account is inactive or disabled. Contact support if you believe this is a mistake.";

const RATE_LIMIT_MESSAGE =
  "Too many sign-in attempts. Please wait a few minutes and try again.";

const VALIDATION_MESSAGE =
  "Enter a valid email address and your password, then try again.";

function normalizeApiDetail(detail: unknown): string | null {
  if (typeof detail === "string") {
    return detail.trim();
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0];
    if (typeof first === "object" && first !== null && "msg" in first) {
      return String(first.msg).trim();
    }
  }

  return null;
}

function isInvalidCredentialsMessage(message: string): boolean {
  return INVALID_CREDENTIALS_PATTERNS.some((pattern) => pattern.test(message.trim()));
}

function mapLoginDetail(apiDetail: string | null): string | null {
  if (!apiDetail) {
    return null;
  }

  const normalized = apiDetail.toLowerCase();

  if (normalized === LOGIN_API_ERROR_CODES.emailNotRegistered) {
    return EMAIL_NOT_REGISTERED_MESSAGE;
  }

  if (normalized === LOGIN_API_ERROR_CODES.incorrectPassword) {
    return INCORRECT_PASSWORD_MESSAGE;
  }

  if (isInvalidCredentialsMessage(apiDetail)) {
    return SIGN_IN_FAILED_MESSAGE;
  }

  return apiDetail;
}

function mapStatusToLoginMessage(status: number, apiDetail: string | null): string | null {
  const fromDetail = mapLoginDetail(apiDetail);

  if (status === 401) {
    return fromDetail ?? SIGN_IN_FAILED_MESSAGE;
  }

  if (status === 403) {
    return fromDetail ?? ACCOUNT_INACTIVE_MESSAGE;
  }

  if (status === 422) {
    return fromDetail ?? VALIDATION_MESSAGE;
  }

  if (status === 429) {
    return RATE_LIMIT_MESSAGE;
  }

  return fromDetail;
}

export function getLoginErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    const mapped = mapStatusToLoginMessage(error.status, error.message);
    if (mapped) {
      return mapped;
    }
    return getErrorMessage(error);
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const apiDetail = normalizeApiDetail(error.response?.data?.detail);

    if (status) {
      const mapped = mapStatusToLoginMessage(status, apiDetail);
      if (mapped) {
        return mapped;
      }
    }

    if (!error.response) {
      return getErrorMessage(error);
    }

    if (status && status >= 500) {
      return getErrorMessage(error);
    }

    const fromDetail = mapLoginDetail(apiDetail);
    if (fromDetail) {
      return fromDetail;
    }
  }

  if (error instanceof Error) {
    if (error.message === "Invalid authentication response") {
      return "Sign-in succeeded but the session was invalid. Please try again or contact support.";
    }
    const fromDetail = mapLoginDetail(error.message);
    if (fromDetail) {
      return fromDetail;
    }
  }

  return SIGN_IN_FAILED_MESSAGE;
}
