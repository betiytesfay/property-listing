import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type {
  AdminRegisterFormValues,
  RegisterFormValues,
} from "@/src/features/auth/schemas/auth.schemas";
import type { RegistrationFieldValues } from "@/src/features/auth/components/registration-form-fields";

type AnyRegistrationForm = RegisterFormValues | AdminRegisterFormValues;

/**
 * Bridges a full registration form (seller includes acceptTerms) to shared field props.
 * React Hook Form types are invariant; this centralizes the narrow cast to shared fields only.
 */
export function toRegistrationFieldHandlers<T extends AnyRegistrationForm>(
  register: UseFormRegister<T>,
  control: Control<T>,
  errors: FieldErrors<T>
): {
  register: UseFormRegister<RegistrationFieldValues>;
  control: Control<RegistrationFieldValues>;
  errors: FieldErrors<RegistrationFieldValues>;
} {
  return {
    register: register as unknown as UseFormRegister<RegistrationFieldValues>,
    control: control as unknown as Control<RegistrationFieldValues>,
    errors: errors as unknown as FieldErrors<RegistrationFieldValues>,
  };
}
