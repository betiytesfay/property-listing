type Props = {
  images: string[]
}

export default function PropertyImageGallery({ images }: Props) {
  return (
    <div className="space-y-2">
      <img
        src={images[0]}
        alt="Property"
        className="w-full h-72 object-cover rounded-xl"
      />

      <div className="flex gap-2">
        {images.slice(1, 4).map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Property ${i}`}
            className="w-20 h-20 object-cover rounded-lg"
          />
        ))}

        {images.length > 4 && (
          <div className="w-20 h-20 bg-slate-900 text-white flex items-center justify-center rounded-lg text-sm">
            +{images.length - 4}
          </div>
        )}
      </div>
    </div>
  )
}