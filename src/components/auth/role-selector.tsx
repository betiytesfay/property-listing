"use client";

import { Building2, UserRound } from "lucide-react";
import { Label } from "@/src/components/ui/label";
import { FormError } from "@/src/components/auth/form-error";
import { cn } from "@/src/lib/utils";

export type AccountRole = "buyer" | "seller";

interface RoleSelectorProps {
  value: AccountRole;
  onChange: (role: AccountRole) => void;
  error?: string;
}

const ROLES: { id: AccountRole; label: string; description: string; icon: typeof UserRound }[] = [
  {
    id: "buyer",
    label: "Buyer",
    description: "Browse and save listings",
    icon: UserRound,
  },
  {
    id: "seller",
    label: "Seller",
    description: "List and manage properties",
    icon: Building2,
  },
];

export function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <section className="space-y-3">
      <Label id="role-label">Account type</Label>
      <div
        role="radiogroup"
        aria-labelledby="role-label"
        className="grid grid-cols-2 gap-3"
      >
        {ROLES.map((role) => {
          const Icon = role.icon;
          const selected = value === role.id;
          return (
            <button
              key={role.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(role.id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                selected
                  ? "border-auth-primary bg-auth-primary/5 shadow-sm ring-1 ring-auth-primary/20"
                  : "border-auth-outline bg-auth-card hover:border-auth-primary/40"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  selected ? "text-auth-primary" : "text-auth-on-surface-muted"
                )}
              />
              <span className="text-sm font-semibold text-auth-on-surface">{role.label}</span>
              <span className="text-xs text-auth-on-surface-muted">{role.description}</span>
            </button>
          );
        })}
      </div>
      <FormError message={error} />
    </section>
  );
}
