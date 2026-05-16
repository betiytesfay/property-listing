"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "@/src/components/auth/auth-card";
import { InputField } from "@/src/components/auth/input-field";
import { PasswordInput } from "@/src/components/auth/password-input";
import { SocialLoginButtons } from "@/src/components/auth/social-login-buttons";
import { Button } from "@/src/components/ui/Button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { useFakeSubmit } from "@/src/hooks/use-fake-submit";
import { mockLogin } from "@/src/lib/auth-mock";
import { loginSchema, type LoginFormValues } from "@/src/lib/validations/auth";
export function LoginForm() {
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

  const { isLoading, isSuccess, successMessage, handleSubmit: submitMock } = useFakeSubmit(
    async (data: LoginFormValues) => mockLogin(data.email)
  );

  const rememberMe = watch("rememberMe");

  return (
    <AuthCard
      title="Sign in"
      description="Welcome back. Enter your credentials to access your account."
      footer={
        <p className="text-sm text-auth-on-surface-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-auth-primary hover:underline">
            Create account
          </Link>
        </p>
      }
    >
      <form
        className="space-y-6"
        onSubmit={handleSubmit((data) => void submitMock(data))}
        noValidate
      >
        {isSuccess && successMessage ? (
          <p
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            {successMessage}
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

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...field}
            />
          )}
        />

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setValue("rememberMe", checked === true)}
            />
            <Label
              htmlFor="rememberMe"
              className="cursor-pointer text-sm font-normal normal-case tracking-normal text-auth-on-surface"
            >
              Remember me
            </Label>
          </div>
          <Link
            href="#"
            className="text-sm font-semibold text-auth-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
          Sign in
        </Button>

        <SocialLoginButtons />
      </form>
    </AuthCard>
  );
}
