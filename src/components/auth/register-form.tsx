"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationFormFields } from "@/src/features/auth/components/registration-form-fields";
import { toRegistrationFieldHandlers } from "@/src/features/auth/utils/registration-form-bridge";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { AuthFormAlert } from "@/src/features/auth/components/auth-form-alert";
import { AUTH_ROUTES } from "@/src/features/auth/constants/routes";
import { useRegister } from "@/src/features/auth/hooks/use-register";
import { registerSchema, type RegisterFormValues } from "@/src/features/auth/schemas/auth.schemas";
import {
  getFirstErrorMessage,
  scrollToFirstFormError,
} from "@/src/features/auth/utils/form-errors";

export function RegisterForm() {
  const { register: submitRegister, isLoading, error, clearError } = useRegister();
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const password = watch("password");
  const acceptTerms = watch("acceptTerms");

  const clearMessages = () => {
    setValidationMessage(null);
    clearError();
  };

  const onSubmit = handleSubmit(
    async (data) => {
      clearMessages();
      await submitRegister(data);
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
        {/* Header - reduced spacing */}
        <div className="mb-5 text-center">
          <div className="mb-3">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
            >
              Habesha<span className="text-amber-400">Hub</span>
            </Link>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">Create an account</h1>
          <p className="mt-1 text-sm text-gray-500">List and manage your properties with ease.</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Alerts */}
          {(validationMessage || error) && (
            <AuthFormAlert
              variant="error"
              message={validationMessage ?? error ?? ""}
            />
          )}

          <RegistrationFormFields
            {...toRegistrationFieldHandlers(register, control, errors)}
            password={password}
            onFieldChange={clearMessages}
          />

          {/* Terms */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="acceptTerms"
              checked={acceptTerms}
              onCheckedChange={(checked) => {
                setValidationMessage(null);
                setValue("acceptTerms", checked === true, { shouldValidate: true });
              }}
            />
            <Label htmlFor="acceptTerms" className="text-sm font-normal text-gray-600">
              I agree to the{" "}
              <button type="button" className="font-medium text-amber-700 hover:underline">
                Terms &amp; Conditions
              </button>{" "}
              and{" "}
              <button type="button" className="font-medium text-amber-700 hover:underline">
                Privacy Policy
              </button>
            </Label>
          </div>
          {errors.acceptTerms?.message && (
            <p className="text-xs text-red-600">{errors.acceptTerms.message}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-60"
          >
            {isLoading ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href={AUTH_ROUTES.login} className="font-medium text-amber-700 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}