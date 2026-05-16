"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "@/src/components/auth/auth-card";
import { InputField } from "@/src/components/auth/input-field";
import { PasswordInput } from "@/src/components/auth/password-input";
import { PasswordStrengthIndicator } from "@/src/components/auth/password-strength-indicator";
import { PhoneInput } from "@/src/components/auth/phone-input";
import { RoleSelector } from "@/src/components/auth/role-selector";
import { Button } from "@/src/components/ui/Button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import { useFakeSubmit } from "@/src/hooks/use-fake-submit";
import { mockRegister } from "@/src/lib/auth-mock";
import { registerSchema, type RegisterFormValues } from "@/src/lib/validations/auth";

export function RegisterForm() {
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
      role: "seller",
      acceptTerms: false,
    },
    mode: "onBlur",
  });

  const { isLoading, isSuccess, successMessage, handleSubmit: submitMock } = useFakeSubmit(
    async (data: RegisterFormValues) => mockRegister(data.email)
  );

  const password = watch("password");
  const acceptTerms = watch("acceptTerms");

  return (
    <AuthCard
      title="Seller registration"
      description="Create your account to start listing properties on Habesha Property Hub."
      footer={
        <p className="text-sm text-auth-on-surface-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-auth-primary hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <form
        className="space-y-5"
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
          label="Full name"
          placeholder="Enter your full name"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <InputField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <PhoneInput
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <RoleSelector
              value={field.value}
              onChange={field.onChange}
              error={errors.role?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              label="Password"
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
              label="Confirm password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...field}
            />
          )}
        />

        <section className="flex items-start gap-3">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setValue("acceptTerms", checked === true, { shouldValidate: true })}
          />
          <Label
            htmlFor="acceptTerms"
            className="cursor-pointer text-sm font-normal normal-case leading-relaxed tracking-normal text-auth-on-surface-muted"
          >
            I agree to the{" "}
            <Link href="#" className="font-semibold text-auth-primary hover:underline">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-semibold text-auth-primary hover:underline">
              Privacy Policy
            </Link>
          </Label>
        </section>
        {errors.acceptTerms?.message ? (
          <p role="alert" className="-mt-2 text-sm text-auth-error">
            {errors.acceptTerms.message}
          </p>
        ) : null}

        <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
          Create account
        </Button>
      </form>
    </AuthCard>
  );
}
