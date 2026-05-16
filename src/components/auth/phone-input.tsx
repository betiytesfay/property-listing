"use client";

import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { FormError } from "@/src/components/auth/form-error";
import { cn } from "@/src/lib/utils";

interface PhoneInputProps {
  label?: string;
  name: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
}

export function PhoneInput({
  label = "Phone number",
  name,
  value,
  onChange,
  onBlur,
  error,
}: PhoneInputProps) {
  const fieldId = name;

  return (
    <section className="space-y-2">
      <Label htmlFor={fieldId}>{label}</Label>
      <div className="flex">
        <div
          className="flex h-12 items-center gap-2 rounded-l-lg border border-r-0 border-auth-outline bg-auth-surface-muted px-4 text-sm text-auth-on-surface-muted"
          aria-hidden
        >
          <span className="text-lg">🇪🇹</span>
          <span className="font-medium">+251</span>
        </div>
        <Input
          id={fieldId}
          name={name}
          type="tel"
          inputMode="numeric"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="911 234 567"
          aria-invalid={Boolean(error)}
          className={cn("rounded-l-none", error && "border-auth-error")}
        />
      </div>
      <FormError message={error} />
    </section>
  );
}
