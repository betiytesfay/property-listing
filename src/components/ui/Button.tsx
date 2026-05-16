import clsx from "clsx";
import type { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
        {
          "px-3 py-2 text-xs font-semibold": size === "sm",
          "px-5 py-2.5 text-sm font-semibold": size === "md",
          "px-6 py-3 text-base font-bold": size === "lg",
          "w-full": fullWidth,
          "bg-slate-900 text-white hover:bg-slate-800": variant === "primary",
          "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50": variant === "outline",
          "bg-transparent text-slate-900 hover:bg-slate-50": variant === "ghost",
          "bg-amber-500 text-white hover:bg-amber-600": variant === "gold",
        },
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" ? <span className="mr-2 inline-flex">{icon}</span> : null}
      {children}
      {icon && iconPosition === "right" ? <span className="ml-2 inline-flex">{icon}</span> : null}
    </button>
  );
}
