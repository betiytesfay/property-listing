"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormAlert } from "@/src/features/auth/components/auth-form-alert";
import { RegistrationFormFields } from "@/src/features/auth/components/registration-form-fields";
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
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Administration</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Register administrator</h1>
        <p className="mt-2 text-sm text-slate-600">
          Create a new platform admin account. Only existing administrators can access this page.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" noValidate>
        {validationMessage ? <AuthFormAlert variant="error" message={validationMessage} /> : null}
        {error ? <AuthFormAlert variant="error" message={error} /> : null}
        {successMessage ? <AuthFormAlert variant="success" message={successMessage} /> : null}

        <RegistrationFormFields
          register={register}
          control={control}
          errors={errors}
          password={password}
          onFieldChange={clearMessages}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating administrator…" : "Create administrator"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link href={ADMIN_ROUTES.dashboard} className="font-semibold text-amber-600 hover:underline">
          Back to admin dashboard
        </Link>
      </p>
    </div>
  );
}
