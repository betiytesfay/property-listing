import { type ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
}

export function SectionHeader({ eyebrow, title, description, action, centered = false }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${centered ? "text-center sm:text-left" : ""}`}>
      <div className="space-y-1.5">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">{eyebrow}</p>
        )}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
        {description && (
          <p className="max-w-xl text-sm leading-6 text-slate-500">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
