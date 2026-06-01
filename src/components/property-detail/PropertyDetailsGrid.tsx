import { MapPin, Tag, Calendar, BadgeCheck, Hash } from "lucide-react";
import type { PropertyResponse } from "@/src/lib/api/property";
import { normaliseListingType } from "@/src/lib/api/property";

interface Props {
  property: PropertyResponse;
}

function humanise(str: string): string {
  return str
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

interface DetailItem {
  icon: React.ElementType;
  label: string;
  value: string;
}

export function PropertyDetailsGrid({ property }: Props) {
  const details: DetailItem[] = [
    {
      icon: Hash,
      label: "Reference ID",
      value: property.property_id.slice(0, 8).toUpperCase(),
    },
    {
      icon: Tag,
      label: "Category",
      value: humanise(property.category),
    },
    {
      icon: Tag,
      label: "Listing type",
      value: normaliseListingType(property.listing_type) === "rent"
        ? "For Rent"
        : "For Sale",
    },
    {
      icon: MapPin,
      label: "Address",
      value: property.address,
    },
    {
      icon: BadgeCheck,
      label: "Verified listing",
      value: property.listing_fee_paid ? "Yes" : "No",
    },
    {
      icon: Calendar,
      label: "Listed on",
      value: new Date(property.created_at).toLocaleDateString("en-ET", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
  ];

  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6 space-y-5">
      <h2 className="font-serif text-xl font-light text-stone-900">
        Listing details
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {details.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex items-start gap-3 rounded-xl border border-stone-100 bg-stone-50 px-4 py-3"
          >
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white border border-stone-200">
              <Icon size={14} className="text-amber-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-stone-400 font-sans">
                {label}
              </p>
              <p className="mt-0.5 text-sm font-medium text-stone-800 font-sans truncate">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
