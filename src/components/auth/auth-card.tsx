import type { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

interface AuthCardProps {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <article
      className={cn(
        "w-full max-w-md rounded-2xl bg-auth-card p-1 shadow-[var(--auth-shadow-card)] sm:p-2",
        className
      )}
    >
      <header className="mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-auth-primary sm:text-3xl">{title}</h1>
        <p className="text-base text-auth-on-surface-muted">{description}</p>
      </header>
      {children}
      {footer ? <footer className="mt-8 border-t border-auth-outline pt-8 text-center">{footer}</footer> : null}
    </article>
  );
}
