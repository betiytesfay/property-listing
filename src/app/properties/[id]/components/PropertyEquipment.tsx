type Props = {
  equipment: string[]
}

export default function PropertyEquipment({
  equipment,
}: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">
        Equipment
      </h3>

      <div className="flex flex-wrap gap-2">
        {equipment.map((item, i) => (
          <span
            key={i}
            className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-600"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}