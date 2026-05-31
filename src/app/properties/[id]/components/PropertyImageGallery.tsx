"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = { images: string[] };

export default function PropertyImageGallery({ images }: Props) {
  const [selected, setSelected] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handlePrevious = () => {
    setSelected((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelected((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-slate-200 flex items-center justify-center">
          <p className="text-slate-400">No image available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 group">
        <img
          key={images[selected]}
          src={images[selected]}
          alt="Property main view"
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
          onLoad={() => setImageError(false)}
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {selected + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg transition-all ${selected === idx
                  ? "ring-2 ring-amber-600 ring-offset-2 scale-105"
                  : "hover:scale-105 border-2 border-transparent"
                }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="h-full w-full object-cover"
              />
              {idx === 3 && images.length > 4 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-sm font-bold">
                  +{images.length - 4}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}