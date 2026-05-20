interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
}

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium">{label}</label>
      <select {...props} className="w-full rounded-md border px-3 py-2">
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
