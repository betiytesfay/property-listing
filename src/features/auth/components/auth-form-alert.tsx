import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface AuthFormAlertProps {
  variant: "error" | "success";
  message: string;
  className?: string;
}

export function AuthFormAlert({ variant, message, className }: AuthFormAlertProps) {
  const isError = variant === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        isError
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800",
        className
      )}
    >
      {isError ? (
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      ) : (
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      )}
      <span>{message}</span>
    </div>
  );
}
