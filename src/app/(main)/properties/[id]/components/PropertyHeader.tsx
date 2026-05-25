type Props = {
  location: string
  shortDescription: string
}

export default function PropertyHeader({
  location,
  shortDescription,
}: Props) {
  return (
    <div className="mt-4 space-y-1">
      <h1 className="text-xl font-semibold text-slate-900">
        {location}
      </h1>

      <p className="text-sm text-slate-500">
        {shortDescription}
      </p>
    </div>
  )
}