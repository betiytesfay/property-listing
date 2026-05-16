type Props = { equipment: string[] };

export default function PropertyEquipment({ equipment }: Props) {
  if (!equipment.length) return null;
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Equipment & features</h3>
      <div className="flex flex-wrap gap-2">
        {equipment.map((item) => (
          <span key={item} className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}