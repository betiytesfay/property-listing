"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormAlert } from "@/src/features/auth/components/auth-form-alert";
import { RegistrationFormFields } from "@/src/features/auth/components/registration-form-fields";
import { toRegistrationFieldHandlers } from "@/src/features/auth/utils/registration-form-bridge";
import { ADMIN_ROUTES } from "@/src/features/auth/constants/routes";
import { useRegisterAdmin } from "@/src/features/auth/hooks/use-register-admin";
import {
  adminRegisterSchema,
  type AdminRegisterFormValues,
} from "@/src/features/auth/schemas/auth.schemas";
import {
  getFirstErrorMessage,
  scrollToFirstFormError,
} from "@/src/features/auth/utils/form-errors";

export function AdminRegisterForm() {
  const {
    registerAdmin,
    isLoading,
    error,
    successMessage,
    clearError,
    clearSuccess,
  } = useRegisterAdmin();
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const password = watch("password");

  const clearMessages = () => {
    setValidationMessage(null);
    clearError();
    clearSuccess();
  };

  const onSubmit = handleSubmit(
    async (data) => {
      clearMessages();
      const ok = await registerAdmin(data);
      if (ok) {
        reset();
      }
    },
    (fieldErrors) => {
      const message =
        getFirstErrorMessage(fieldErrors) ??
        "Please fix the highlighted fields before continuing.";
      setValidationMessage(message);
      scrollToFirstFormError(fieldErrors);
    }
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-5 text-center">
          <div className="mb-3">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
            >
              Habesha<span className="text-amber-400">Hub</span>
            </Link>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Register administrator</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create a new admin account for platform management.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {validationMessage ? (
            <AuthFormAlert variant="error" message={validationMessage} />
          ) : null}
          {error ? <AuthFormAlert variant="error" message={error} /> : null}
          {successMessage ? <AuthFormAlert variant="success" message={successMessage} /> : null}

          <RegistrationFormFields
            {...toRegistrationFieldHandlers(register, control, errors)}
            password={password}
            onFieldChange={clearMessages}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60"
          >
            {isLoading ? "Creating administrator…" : "Create administrator"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href={ADMIN_ROUTES.dashboard} className="font-medium text-amber-700 hover:underline">
            Back to admin dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}