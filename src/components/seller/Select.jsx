export function Select({ label, options }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <select className="w-full rounded-md border px-3 py-2">
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
