"use client";

import { forwardRef } from "react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { FormError } from "@/src/components/auth/form-error";
import { cn } from "@/src/lib/utils";

export interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label = "Phone number", error, hint, className, id, name, ...props }, ref) => {
    const fieldId = id ?? name ?? "phone";

    return (
      <section className="space-y-2">
        <Label htmlFor={fieldId}>{label}</Label>

        <div className="flex">
          {/* Country Code - NO rounding on right side */}
          <div
            className="flex h-12 items-center gap-2 rounded-l-lg rounded-r-none border border-r-0 border-auth-outline bg-auth-surface-muted px-4 text-sm text-auth-on-surface-muted"
            aria-hidden
          >
            <span className="text-lg">🇪🇹</span>
            <span className="font-medium">+251</span>
          </div>

          {/* Input - FORCE no left rounding, right rounded */}
          <Input
            ref={ref}
            id={fieldId}
            name={name}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="911 234 567"
            aria-invalid={Boolean(error)}
            className={cn(
              "h-12 !rounded-l-none rounded-r-lg", // ← ! forces left radius to 0
              error && "border-auth-error",
              className
            )}
            {...props}
          />
        </div>

        

        <FormError message={error} />
      </section>
    );
  }
);

PhoneInput.displayName = "PhoneInput";