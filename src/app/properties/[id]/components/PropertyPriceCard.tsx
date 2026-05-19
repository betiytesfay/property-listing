type Props = {
  type: "rent" | "sell"
  price: number
}

export default function PropertyPriceCard({ type, price }: Props) {
  return (
    <div className="mt-5 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          ${price.toLocaleString()}
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${type === "rent"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-700"
            }`}
        >
          {type}
        </span>
      </div>
    </div>
  )
}