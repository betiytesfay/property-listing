import { InputHTMLAttributes } from "react";
type InputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium">{label}</label>
      <input {...props} className="w-full rounded-md border px-3 py-2" />
    </div>
  );
}
