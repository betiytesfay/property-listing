"use client";

import { getPasswordStrength, type PasswordStrength } from "@/src/lib/validations/auth";
import { cn } from "@/src/lib/utils";

const STRENGTH_COLORS: Record<PasswordStrength, string> = {
  weak: "bg-auth-error",
  fair: "bg-orange-400",
  good: "bg-auth-secondary",
  strong: "bg-emerald-600",
};

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) return null;

  const { level, label } = getPasswordStrength(password);
  const segments = 4;
  const filled =
    level === "weak" ? 1 : level === "fair" ? 2 : level === "good" ? 3 : 4;

  return (
    <section className="space-y-2" aria-live="polite">
      <div className="flex gap-1.5">
        {Array.from({ length: segments }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index < filled ? STRENGTH_COLORS[level] : "bg-auth-outline/60"
            )}
          />
        ))}
      </div>
      <p className="text-xs text-auth-on-surface-muted">
        Password strength: <span className="font-medium text-auth-on-surface">{label}</span>
      </p>
    </section>
  );
}
