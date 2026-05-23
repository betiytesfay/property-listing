import type { Property } from "@/src/types/propertyTypes";
import Link from "next/link";

type Props = {
  currentId: string | number;
  listings: Property[];
};

export default function RelatedListings({ currentId, listings }: Props) {
  const filtered = listings.filter((p) => p.id !== currentId).slice(0, 3);
  if (filtered.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-xl font-bold text-slate-900">Similar properties</h2>
        <Link href="/listings" className="text-sm text-emerald-600 hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((property) => (
          <Link key={property.id} href={`/property/${property.id}`} className="group block">
            <div className="overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-lg">
              <div className="aspect-[3/2] overflow-hidden bg-slate-100">
                <img
                  src={property.images?.[0]}
                  alt={property.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-bold text-slate-900">
                  ${property.price.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 line-clamp-1">{property.title}</p>
                <div className="mt-2 flex gap-3 text-xs text-slate-500">
                  <span>{property.details?.bedrooms ?? 0} beds</span>
                  <span>{property.details?.bathrooms ?? 0} baths</span>
                  <span>{property.area} m²</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}