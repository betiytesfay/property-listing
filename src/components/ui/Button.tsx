import clsx from "clsx";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold" | "auth" | "social";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        {
          "px-3 py-2 text-xs font-semibold": size === "sm",
          "px-5 py-2.5 text-sm font-semibold": size === "md",
          "px-6 py-3 text-base font-bold": size === "lg",
          "w-full": fullWidth,
          "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-900": variant === "primary",
          "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-400": variant === "secondary",
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400":
            variant === "outline",
          "bg-transparent text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400": variant === "ghost",
          "bg-amber-500 text-white hover:bg-amber-600 focus-visible:ring-amber-500": variant === "gold",
          "bg-auth-primary text-white hover:bg-auth-primary-hover focus-visible:ring-auth-primary":
            variant === "auth",
          "border border-auth-outline bg-white text-auth-on-surface hover:bg-auth-surface-muted focus-visible:ring-auth-primary":
            variant === "social",
        },
        isDisabled && "cursor-not-allowed opacity-70",
        className
      )}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
      ) : (
        icon && iconPosition === "left" ? <span className="mr-2 inline-flex">{icon}</span> : null
      )}
      {children}
      {!isLoading && icon && iconPosition === "right" ? (
        <span className="ml-2 inline-flex">{icon}</span>
      ) : null}
    </button>
  );
}
