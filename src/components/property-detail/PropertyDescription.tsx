"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  description: string;
  amenities?: string[];
}

const PREVIEW_CHARS = 320;

export function PropertyDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > PREVIEW_CHARS;
  const shown = isLong && !expanded
    ? description.slice(0, PREVIEW_CHARS).trimEnd() + "…"
    : description;

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 space-y-4">
      <h2 className="font-serif text-xl font-light text-stone-900">
        About this property
      </h2>

      <div className="relative">
        <p className="text-sm leading-relaxed text-stone-600 font-sans whitespace-pre-line">
          {shown}
        </p>

        {/* Fade mask when collapsed */}
        {isLong && !expanded && (
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 font-sans hover:text-amber-700 transition-colors"
        >
          {expanded ? (
            <>
              <ChevronUp size={14} /> Show less
            </>
          ) : (
            <>
              <ChevronDown size={14} /> Read more
            </>
          )}
        </button>
      )}
    </section>
  );
}
