import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-auth-primary/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-auth-primary text-white shadow-sm hover:bg-auth-primary-hover active:scale-[0.98]",
        primary: "rounded-full bg-slate-900 text-white hover:bg-slate-800",
        secondary: "rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200",
        outline:
          "border border-auth-outline bg-auth-card text-auth-on-surface hover:bg-auth-surface-muted",
        ghost: "text-auth-on-surface-muted hover:bg-auth-surface-muted hover:text-auth-on-surface",
        social:
          "border border-auth-outline bg-auth-card text-auth-on-surface hover:bg-auth-surface-muted h-11",
      },
      size: {
        default: "h-11 px-5",
        lg: "h-14 px-6 text-base",
        sm: "h-9 px-4 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
