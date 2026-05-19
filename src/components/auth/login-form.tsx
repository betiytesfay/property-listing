"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/src/components/auth/input-field";
import { PasswordInput } from "@/src/components/auth/password-input";
import { Button } from "@/src/components/ui/Button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { AuthFormAlert } from "@/src/features/auth/components/auth-form-alert";
import { AUTH_ROUTES } from "@/src/features/auth/constants/routes";
import { useLogin } from "@/src/features/auth/hooks/use-login";
import { loginSchema, type LoginFormValues } from "@/src/features/auth/schemas/auth.schemas";

function LoginFormFields() {
  const { login, isLoading, error, clearError } = useLogin();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
    mode: "onBlur",
  });

  const rememberMe = watch("rememberMe");

  return (
    <div className="flex h-full w-full items-center justify-center py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
            Habesha Property Hub
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Seller sign in</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back. Sign in to manage your property listings and dashboard.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(async (data) => {
            clearError();
            await login(data);
          })}
          className="space-y-5"
          noValidate
        >
          {error && <AuthFormAlert variant="error" message={error} />}

          <div className="space-y-4">
            <InputField
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              error={errors.email?.message}
              {...register("email", { onChange: () => clearError() })}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <PasswordInput
                  label="Password"
                  autoComplete="current-password"
                  error={errors.password?.message}
                  {...field}
                  onChange={(event) => {
                    clearError();
                    field.onChange(event);
                  }}
                />
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
              />
              <Label
                htmlFor="rememberMe"
                className="cursor-pointer text-sm font-normal text-gray-600"
              >
                Remember me
              </Label>
            </div>
            <Link
              href={AUTH_ROUTES.forgotPassword}
              className="text-sm font-medium text-amber-700 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="auth" size="lg" fullWidth isLoading={isLoading}>
            Sign in
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href={AUTH_ROUTES.register} className="font-medium text-amber-700 hover:underline">
            Create seller account
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center py-12">
          <div className="w-full max-w-md">
            <div className="mb-6 text-center">
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
                Habesha Property Hub
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">Seller sign in</h1>
              <p className="mt-1 text-sm text-gray-500">Loading sign-in form…</p>
            </div>
            <div className="h-48 animate-pulse rounded-lg bg-gray-100" />
          </div>
        </div>
      }
    >
      <LoginFormFields />
    </Suspense>
  );
}