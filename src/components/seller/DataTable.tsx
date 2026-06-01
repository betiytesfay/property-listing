type Column<T> = {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  data: T[];
  rowKey?: keyof T;
};

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey = "id" as keyof T,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 ${col.align === "center" ? "text-center" : "text-left"
                  }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={String(row[rowKey] ?? i)}
              className="border-b border-slate-50 transition hover:bg-slate-50"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-4 py-4 text-sm text-slate-700 ${col.align === "center" ? "text-center" : "text-left"
                    }`}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}