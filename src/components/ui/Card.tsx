import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div className={clsx("overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm", className)} {...props} />
  );
}
