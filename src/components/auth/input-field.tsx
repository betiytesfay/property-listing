"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { FormError } from "@/src/components/auth/form-error";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const fieldId = id ?? props.name;

    return (
      <section className="space-y-2">
        <Label htmlFor={fieldId}>{label}</Label>
        <Input
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          className={className}
          {...props}
        />
        {hint && !error ? (
          <p id={`${fieldId}-hint`} className="text-xs text-auth-on-surface-muted">
            {hint}
          </p>
        ) : null}
        <FormError message={error} />
      </section>
    );
  }
);

InputField.displayName = "InputField";
