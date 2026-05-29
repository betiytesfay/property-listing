import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { normaliseListingType, formatPrice } from "@/src/lib/api/property";
import type { PropertyResponse } from "@/src/lib/api/property";

interface Props {
  properties: PropertyResponse[];
}

function humanise(str: string): string {
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function RelatedCard({ property }: { property: PropertyResponse }) {
  const thumb = property.media_urls?.[0];
  const status = normaliseListingType(property.listing_type);
  const isRent = status === "rent";

  return (
    <Link
      href={`/properties/${property.property_id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-stone-100">
        {thumb ? (
          <Image
            src={thumb}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          // Placeholder when no image
          <div className="flex h-full w-full items-center justify-center bg-stone-100">
            <span className="text-3xl text-stone-300">🏷</span>
          </div>
        )}
        {/* Status badge */}
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider font-sans ${
            isRent ? "bg-sky-600 text-white" : "bg-emerald-600 text-white"
          }`}
        >
          {isRent ? "Rent" : "Sale"}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {/* Category */}
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400 font-sans">
          {humanise(property.category)}
        </p>

        <p className="font-serif text-lg font-light leading-snug text-stone-900 group-hover:text-amber-700 transition-colors">
          {property.title}
        </p>

        <p className="flex items-center gap-1 text-xs text-stone-400 font-sans">
          <MapPin size={11} className="text-amber-400 flex-shrink-0" />
          {property.address}
        </p>

        {/* Price */}
        <div className="mt-auto border-t border-stone-100 pt-3">
          <span className="font-sans text-base font-bold text-stone-900">
            {formatPrice(property.price, property.listing_type)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function RelatedListings({ properties }: Props) {
  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between border-b border-stone-200 pb-4">
        <h2 className="font-serif text-2xl font-light text-stone-900">
          Similar listings
        </h2>
        <Link
          href="/properties"
          className="text-xs font-bold uppercase tracking-wider text-amber-600 font-sans hover:text-amber-700 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <RelatedCard key={p.property_id} property={p} />
        ))}
      </div>
    </section>
  );
}
