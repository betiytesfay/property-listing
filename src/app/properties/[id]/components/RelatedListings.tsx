import type { Property } from "@/src/types/propertyTypes";  // ✅ Fixed import path
import Link from "next/link";

type Props = {
  currentId: string;
  listings: Property[];
};

export default function RelatedListings({ currentId, listings }: Props) {
  // ✅ Fixed: p.id → p.property_id
  const filtered = listings.filter((p) => p.property_id !== currentId).slice(0, 3);

  if (filtered.length === 0) return null;

  // Helper to format price
  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString();
  };

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
          // ✅ Fixed: property.id → property.property_id
          <Link
            key={property.property_id}
            href={`/property/${property.property_id}`}
            className="group block"
          >
            <div className="overflow-hidden rounded-xl border border-slate-200 transition hover:shadow-lg">
              <div className="aspect-[3/2] overflow-hidden bg-slate-100">
                {/* ✅ Fixed: images[0] → media_urls[0] */}
                <img
                  src={property.media_urls?.[0] || "/placeholder-image.jpg"}
                  alt={property.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-image.jpg";
                  }}
                />
              </div>
              <div className="p-4">
                {/* ✅ Fixed: price.toLocaleString() → parseFloat(price).toLocaleString() */}
                <p className="text-lg font-bold text-slate-900">
                  {formatPrice(property.price)} ETB
                </p>
                <p className="text-sm text-slate-500 line-clamp-1">{property.title}</p>
                <div className="mt-2 flex gap-3 text-xs text-slate-500">
                  {/* ✅ Fixed: removed non-existent fields */}
                  <span>{property.category}</span>
                  <span>{property.listing_type === "FOR_SALE" ? "For Sale" : "For Rent"}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}