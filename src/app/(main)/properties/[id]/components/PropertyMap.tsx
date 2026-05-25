type Props = { url: string };

export default function PropertyMap({ url }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Location on map</h3>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <iframe title="Property location" className="h-64 w-full" src={url} loading="lazy" />
      </div>
    </div>
  );
}