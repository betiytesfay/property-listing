"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/src/components/auth/auth-card";
import { InputField } from "@/src/components/auth/input-field";
import { PasswordInput } from "@/src/components/auth/password-input";
import { PasswordStrengthIndicator } from "@/src/components/auth/password-strength-indicator";
import { Button } from "@/src/components/ui/Button";
import { AuthFormAlert } from "@/src/features/auth/components/auth-form-alert";
import { AUTH_ROUTES } from "@/src/features/auth/constants/routes";
import { authService } from "@/src/features/auth/services/auth.service";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/src/features/auth/schemas/auth.schemas";
import { getErrorMessage } from "@/src/lib/api/errors";
export const dynamic = 'force-dynamic';
export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tokenFromQuery = searchParams.get("token") ?? "";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: tokenFromQuery,
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const password = watch("password");

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await authService.resetPassword({
        token: values.token.trim(),
        new_password: values.password,
      });

      setSuccess(response.message || "Password reset successful. You can now sign in.");
      setTimeout(() => {
        router.replace(AUTH_ROUTES.login);
      }, 2000);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to reset your password. The link may have expired."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset password"
      description="Enter your new password below to regain access to your account."
      footer={
        <p className="text-sm text-auth-on-surface-muted">
          <Link href={AUTH_ROUTES.login} className="font-semibold text-auth-primary hover:underline">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        {error ? <AuthFormAlert variant="error" message={error} /> : null}
        {success ? <AuthFormAlert variant="success" message={success} /> : null}

        <InputField
          label="Reset token"
          type="text"
          autoComplete="off"
          placeholder="Paste your reset token"
          error={errors.token?.message}
          {...register("token")}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="New password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <PasswordStrengthIndicator password={password} />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Confirm new password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />

        <Button type="submit" variant="auth" size="lg" fullWidth isLoading={isLoading} disabled={Boolean(success)}>
          Update password
        </Button>
      </form>
    </AuthCard>
  );
}
