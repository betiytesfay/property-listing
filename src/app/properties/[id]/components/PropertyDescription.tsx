"use client";
import { useState } from "react";

type Props = { description: string };

export default function PropertyDescription({ description }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncated = description.slice(0, 250);

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Description</h3>
      <p className="text-slate-600 leading-relaxed">
        {isExpanded ? description : `${truncated}${description.length > 250 ? "..." : ""}`}
      </p>
      {description.length > 250 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm font-medium text-emerald-600 hover:underline"
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}