"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface Props {
  images: string[];
  title: string;
}

export function PropertyImageGallery({ images, title }: Props) {
  const imgs = images?.length ? images : [];
  const hasImages = imgs.length > 0;

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = () => setActive((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setActive((i) => (i + 1) % imgs.length);

  return (
    <>
      <section className="space-y-3">
        {/* Hero */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-stone-200 group">
          {hasImages ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgs[active]}
              alt={`${title} — photo ${active + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-stone-400 text-sm font-sans">No images available</span>
            </div>
          )}

          {/* Bottom gradient */}
          {hasImages && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          )}

          {/* Counter */}
          {hasImages && (
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-xs font-bold text-white font-sans">
                {active + 1} / {imgs.length}
              </span>
            </div>
          )}

          {/* Expand */}
          {hasImages && (
            <button
              onClick={() => setLightbox(true)}
              className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            >
              <Expand size={13} />
              <span className="text-xs font-bold font-sans">All photos</span>
            </button>
          )}

          {/* Prev / Next */}
          {imgs.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-stone-800 shadow backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-stone-800 shadow backdrop-blur-sm transition hover:bg-white opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {imgs.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {imgs.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl transition-all duration-200 ${
                  i === active
                    ? "ring-2 ring-amber-500 ring-offset-1"
                    : "opacity-60 hover:opacity-90"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
        >
          {/* Prevent click-through on the image area */}
          <div
            className="relative flex h-[90vh] w-[95vw] max-w-6xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(false)}
              className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <X size={20} />
            </button>

            {/* Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imgs[active]}
              alt={`${title} — photo ${active + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl"
            />

            {/* Prev */}
            {imgs.length > 1 && (
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next */}
            {imgs.length > 1 && (
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm font-sans text-white/60">
            {active + 1} / {imgs.length}
          </p>
        </div>
      )}
    </>
  );
}