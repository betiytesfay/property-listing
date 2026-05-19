"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "@/src/components/auth/auth-card";
import { InputField } from "@/src/components/auth/input-field";
import { Button } from "@/src/components/ui/Button";
import { AuthFormAlert } from "@/src/features/auth/components/auth-form-alert";
import { AUTH_ROUTES } from "@/src/features/auth/constants/routes";
import { authService } from "@/src/features/auth/services/auth.service";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/src/features/auth/schemas/auth.schemas";
import { getErrorMessage } from "@/src/lib/api/errors";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [devResetLink, setDevResetLink] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setDevResetLink(null);

    try {
      const response = await authService.forgotPassword({
        email: values.email.trim().toLowerCase(),
      });

      setSuccess(
        response.message ||
          "If an account exists for this email, you will receive password reset instructions."
      );

      if (response.reset_token) {
        const resetUrl = `${AUTH_ROUTES.resetPassword}?token=${encodeURIComponent(response.reset_token)}`;
        setDevResetLink(resetUrl);
      }
    } catch (err) {
      setError(getErrorMessage(err, "Unable to process your request. Please try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Forgot password"
      description="Enter the email associated with your seller account and we'll help you reset your password."
      footer={
        <p className="text-sm text-auth-on-surface-muted">
          Remember your password?{" "}
          <Link href={AUTH_ROUTES.login} className="font-semibold text-auth-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {error ? <AuthFormAlert variant="error" message={error} /> : null}
        {success ? <AuthFormAlert variant="success" message={success} /> : null}

        {devResetLink ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Development reset link:{" "}
            <Link href={devResetLink} className="font-semibold underline">
              Reset password
            </Link>
          </p>
        ) : null}

        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button type="submit" variant="auth" size="lg" fullWidth isLoading={isLoading}>
          Send reset instructions
        </Button>
      </form>
    </AuthCard>
  );
}
