import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, ...props }: TextareaProps) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <textarea
        {...props}
        className="min-h-24 w-full rounded-md border px-3 py-2"
      />
    </div>
  );
}
