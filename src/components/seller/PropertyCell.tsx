interface PropertyCellProps {
  image?: string;
  name: string;
  dateAdded: string;
}

export default function PropertyCell({
  image,
  name,
  dateAdded,
}: PropertyCellProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14 overflow-hidden rounded-xl bg-slate-200 flex-shrink-0">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-indigo-200 to-indigo-400" />
        )}
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-800">{name}</h4>
        <p className="mt-1 text-xs text-slate-400">{dateAdded}</p>
      </div>
    </div>
  );
}
