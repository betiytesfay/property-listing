"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { InputField } from "@/src/components/auth/input-field";
import { PasswordInput } from "@/src/components/auth/password-input";
import { PasswordStrengthIndicator } from "@/src/components/auth/password-strength-indicator";
import { PhoneInput } from "@/src/components/auth/phone-input";
import type { RegisterFormValues } from "@/src/features/auth/schemas/auth.schemas";

/** Shared field set for seller and admin registration forms */
export type RegistrationFieldValues = Pick<
  RegisterFormValues,
  "fullName" | "email" | "phone" | "password" | "confirmPassword"
>;

interface RegistrationFormFieldsProps {
  register: UseFormRegister<RegistrationFieldValues>;
  control: Control<RegistrationFieldValues>;
  errors: FieldErrors<RegistrationFieldValues>;
  password: string;
  onFieldChange: () => void;
}

export function RegistrationFormFields({
  register,
  control,
  errors,
  password,
  onFieldChange,
}: RegistrationFormFieldsProps) {
  return (
    <div className="space-y-3">
      <InputField
        label="Full name"
        placeholder="Enter full name"
        autoComplete="name"
        error={errors.fullName?.message}
        {...register("fullName", { onChange: onFieldChange })}
      />

      <InputField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register("email", { onChange: onFieldChange })}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <PhoneInput
            hint="9 digits, e.g. 911 234 567 (without +251)"
            error={errors.phone?.message}
            {...field}
            onChange={(event) => {
              onFieldChange();
              field.onChange(event);
            }}
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
            onChange={(event) => {
              onFieldChange();
              field.onChange(event);
            }}
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
            onChange={(event) => {
              onFieldChange();
              field.onChange(event);
            }}
          />
        )}
      />
    </div>
  );
}