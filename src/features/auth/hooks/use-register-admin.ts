"use client";

import { useCallback, useState } from "react";
import { authService } from "@/src/features/auth/services/auth.service";
import { USER_ROLES } from "@/src/features/auth/constants/roles";
import {
  formatPhoneForApi,
  type AdminRegisterFormValues,
} from "@/src/features/auth/schemas/auth.schemas";
import { getErrorMessage } from "@/src/lib/api/errors";

export function useRegisterAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const registerAdmin = useCallback(async (values: AdminRegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await authService.register({
        full_name: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        phone_number: formatPhoneForApi(values.phone),
        password: values.password,
        role: USER_ROLES.ADMIN,
      });

      setSuccessMessage(
        `Administrator account created for ${values.email.trim().toLowerCase()}. They can sign in from the login page.`
      );
      return true;
    } catch (err) {
      setError(getErrorMessage(err, "Unable to create the administrator account. Please try again."));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    registerAdmin,
    isLoading,
    error,
    successMessage,
    clearError: () => setError(null),
    clearSuccess: () => setSuccessMessage(null),
  };
}
