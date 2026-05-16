interface StatChipProps {
  icon: string;
  value: string | number;
  label: string;
}

export function StatChip({ icon, value, label }: StatChipProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-slate-600">
      <span className="text-base">{icon}</span>
      <span className="font-medium">{value}</span>
      <span className="text-slate-400">{label}</span>
    </div>
  );
}
