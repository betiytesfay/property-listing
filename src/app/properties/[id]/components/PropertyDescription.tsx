"use client";

import { useState } from "react";

type Props = { description: string };

export default function PropertyDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncated = description.slice(0, 300);
  const isTruncatable = description.length > 300;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="w-1 h-5 bg-amber-400 rounded-full inline-block" />
        <h2 className="text-xl font-semibold text-stone-800">Overview</h2>
      </div>

      <div className="relative">
        <p className="text-[15px] leading-[1.85] text-stone-500">
          {isExpanded
            ? description
            : `${truncated}${isTruncatable ? "..." : ""}`}
        </p>

        {/* Fade overlay when collapsed */}
        {!isExpanded && isTruncatable && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {isTruncatable && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-amber-600 hover:text-amber-700 transition-colors border-b border-amber-300 hover:border-amber-500 pb-0.5"
        >
          {isExpanded ? "Show less ↑" : "Read full description ↓"}
        </button>
      )}
    </div>
  );
}