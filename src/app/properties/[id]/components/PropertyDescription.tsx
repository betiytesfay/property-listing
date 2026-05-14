type Props = {
  description: string
}

export default function PropertyDescription({ description }: Props) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-slate-900 mb-2">
        Description
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed">
        {description.slice(0, 180)}...
      </p>

      <button className="mt-2 text-sm font-medium text-emerald-600 hover:underline">
        Show more
      </button>
    </div>
  )
}