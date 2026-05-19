import { cn } from "@/src/lib/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  if (!message) return null;

  return (
    <p role="alert" className={cn("text-sm text-auth-error", className)}>
      {message}
    </p>
  );
}
