type Props = {
  details: {
    bedrooms: number
    bathrooms: number
    surfaceArea: string
    condition: string
    availableFrom: string
    balcony: boolean
    elevator: boolean
  }
}

export default function PropertyDetailsGrid({ details }: Props) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-lg border border-slate-100 p-3">
        <p className="text-xs text-slate-500">Bedrooms</p>
        <p className="font-medium text-slate-900">{details.bedrooms}</p>
      </div>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className="text-xs text-slate-500">Bathrooms</p>
        <p className="font-medium text-slate-900">{details.bathrooms}</p>
      </div>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className="text-xs text-slate-500">Surface</p>
        <p className="font-medium text-slate-900">{details.surfaceArea}</p>
      </div>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className="text-xs text-slate-500">Condition</p>
        <p className="font-medium text-slate-900">{details.condition}</p>
      </div>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className="text-xs text-slate-500">Available</p>
        <p className="font-medium text-slate-900">
          {details.availableFrom}
        </p>
      </div>

      <div className="rounded-lg border border-slate-100 p-3">
        <p className="text-xs text-slate-500">Balcony</p>
        <p className="font-medium text-slate-900">
          {details.balcony ? "Yes" : "No"}
        </p>
      </div>
    </div>
  )
}