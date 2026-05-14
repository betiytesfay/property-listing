export default function PropertyMap({ url }: { url: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
      <iframe className="h-64 w-full" src={url} />
    </div>
  )
}