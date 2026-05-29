import { MapPin, CalendarDays, Tag } from "lucide-react";
import { normaliseListingType, formatPrice } from "@/src/lib/api/property";
import type { PropertyResponse } from "@/src/lib/api/property";

interface Props {
  property: PropertyResponse;
}

// Turns "FOR_SALE" → "For Sale", "RESIDENTIAL" → "Residential"
function humanise(str: string): string {
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function PropertyHeader({ property }: Props) {
  const status = normaliseListingType(property.listing_type); // "sale" | "rent"
  const isRent = status === "rent";

  const listedDate = property.created_at
    ? new Date(property.created_at).toLocaleDateString("en-ET", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <section className="space-y-4">
      {/* Pills row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Listing type */}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-sans border ${
            isRent
              ? "bg-sky-50 text-sky-700 border-sky-200"
              : "bg-emerald-50 text-emerald-700 border-emerald-200"
          }`}
        >
          <Tag size={10} />
          {isRent ? "For Rent" : "For Sale"}
        </span>

        {/* Category: RESIDENTIAL, VEHICLE, COMMERCIAL, etc. */}
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-sans bg-stone-100 text-stone-600 border border-stone-200">
          {humanise(property.category)}
        </span>

        {/* Verified listing */}
        {property.listing_fee_paid && (
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider font-sans bg-amber-50 text-amber-700 border border-amber-200">
            ✓ Verified
          </span>
        )}

        {listedDate && (
          <span className="ml-auto flex items-center gap-1.5 text-xs text-stone-400 font-sans">
            <CalendarDays size={12} />
            Listed {listedDate}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="font-serif text-3xl font-light leading-tight tracking-tight text-stone-900 sm:text-4xl">
        {property.title}
      </h1>

      {/* Price — prominent, under title */}
      <p className="font-sans text-2xl font-bold text-stone-900">
        {formatPrice(property.price, property.listing_type)}
        {!isRent && (
          <span className="ml-2 text-sm font-normal text-stone-400">Negotiable</span>
        )}
      </p>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-stone-500">
        <MapPin size={14} className="flex-shrink-0 text-amber-500" />
        <span className="text-sm font-sans">{property.address}</span>
      </div>
    </section>
  );
}
