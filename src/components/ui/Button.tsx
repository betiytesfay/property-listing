import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900",
        {
          "bg-slate-900 text-white hover:bg-slate-800": variant === "primary",
          "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50": variant === "outline",
        },
        className
      )}
      {...props}
    />
  );
}
