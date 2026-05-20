type Status = keyof typeof statusStyles;

const statusStyles = {
  Published: "bg-green-50 text-green-600 border border-green-200",
  "Pending Payment": "bg-amber-50 text-amber-700 border border-amber-200",
  Draft: "bg-slate-50 text-slate-500 border border-slate-200",
};

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${
        statusStyles[status] || statusStyles.Draft
      }`}
    >
      {status}
    </span>
  );
}
