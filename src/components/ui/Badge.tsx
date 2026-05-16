import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "success" | "accent" | "featured" | "muted";
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        {
          "bg-slate-100 text-slate-700": variant === "neutral",
          "bg-emerald-100 text-emerald-800": variant === "success",
          "bg-sky-100 text-sky-800": variant === "accent",
          "bg-amber-100 text-amber-800": variant === "featured",
          "bg-slate-200 text-slate-600": variant === "muted",
        },
        className
      )}
      {...props}
    />
  );
}
