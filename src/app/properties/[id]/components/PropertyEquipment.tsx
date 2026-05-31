type Props = { equipment: string[] };

export default function PropertyEquipment({ equipment }: Props) {
  if (!equipment.length) return null;
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Amenities & Features</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {equipment.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover:shadow-md transition-shadow"
          >
            <div className="w-2 h-2 rounded-full bg-amber-600" />
            <span className="text-sm font-medium text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}