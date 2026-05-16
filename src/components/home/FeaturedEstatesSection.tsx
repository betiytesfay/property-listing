import Link from "next/link";
import { FeaturedPropertyCard } from "../property/PropertyCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import type { Property } from "../../types/propertyTypes";


interface FeaturedEstatesSectionProps {
  properties: Property[];
}

export function FeaturedEstatesSection({ properties }: FeaturedEstatesSectionProps) {
  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Featured homes"
        title="Premium properties you’ll love"
        description="Discover a curated collection of our top listings, handpicked for quality and value."
        action={
          <Link href="/properties">
            <Button variant="outline" className="text-slate-900">
              Browse all listings
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {properties.map((property) => (
          <FeaturedPropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
