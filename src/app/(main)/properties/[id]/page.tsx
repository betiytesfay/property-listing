
import type { PropertyResponse } from "@/src/lib/api/property";
import { notFound } from "next/navigation";
import { getProperty, getProperties, formatPrice, normaliseListingType } from "@/src/lib/api/property";

import { PropertyImageGallery } from "../../../../components/property-detail/PropertyImageGallery";
import { PropertyHeader } from "../../../../components/property-detail/PropertyHeader";
import { PropertyDescription } from "../../../../components/property-detail/PropertyDescription";
import { PropertyDetailsGrid } from "../../../../components/property-detail/PropertyDetailsGrid";
import { PropertySidebar } from "../../../../components/property-detail/PropertySidebar";
import { RelatedListings } from "../../../../components/property-detail/RelatedListings";


interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;                          
  const property = await getProperty(id);
  if (!property) return { title: "Property not found" };
  return {
    title: `${property.title} — Ethio-Premium`,
    description: property.description?.slice(0, 155) ?? undefined,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;                        
  const property = await getProperty(id);
  if (!property) notFound();

  const relatedData = await getProperties({
    listing_type: property.listing_type,
    limit: 4,
  });

  const related = (relatedData.data ?? [])
    .filter((p) => p.property_id !== property.property_id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Breadcrumb */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-6 py-4 sm:px-10 lg:px-12">
          <nav className="flex items-center gap-2 text-xs text-stone-400 font-sans">
            <a href="/properties" className="hover:text-stone-700 transition-colors">
              Listings
            </a>
            <span>/</span>
            <span className="text-stone-500">{property.address}</span>
            <span>/</span>
            <span className="text-stone-600 font-medium truncate max-w-[240px]">
              {property.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main layout */}
      <div className="mx-auto max-w-screen-xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">

          {/* Left column */}
          <div className="min-w-0 flex-1 space-y-8">
            <PropertyImageGallery
              images={property.media_urls ?? []}
              title={property.title}
            />
            <PropertyHeader property={property} />
            <PropertyDetailsGrid property={property} />
            <PropertyDescription description={property.description ?? ""} />
          </div>

          {/* Sticky sidebar */}
          <aside className="w-full lg:w-[340px] xl:w-[360px] flex-shrink-0">
            <div className="sticky top-6">
              <PropertySidebar property={property} />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <RelatedListings properties={related} />
          </div>
        )}
      </div>
    </div>
  );
}