"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { FormError } from "@/src/components/auth/form-error";
import { cn } from "@/src/lib/utils";

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, id, name, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const fieldId = id ?? name ?? "password";

    return (
      <section className="space-y-2">
        <Label htmlFor={fieldId}>{label}</Label>
        <div className="relative">
          <Input
            ref={ref}
            id={fieldId}
            name={name}
            type={visible ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${fieldId}-error` : undefined}
            className={cn("pr-12", className)}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-pressed={visible}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-auth-on-surface-muted transition-colors hover:text-auth-on-surface"
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <FormError message={error} />
      </section>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
