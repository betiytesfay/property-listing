import Link from "next/link";
import { FeaturedPropertyCard } from "../property/PropertyCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import type { Property } from "../../types/propertyTypes";
import { ArrowRight } from "lucide-react";


interface FeaturedEstatesSectionProps {
  properties: Property[];
}

export function FeaturedEstatesSection({ properties }: FeaturedEstatesSectionProps) {
  console.log(properties)
  return (
    <section className="space-y-8">
      <SectionHeader
        eyebrow="Featured homes"
        title="Premium properties you’ll love"
        description="Discover a curated collection of our top listings, handpicked for quality and value."
        action={
          <Link href="/properties" className="inline-block group">
            <Button
              variant="secondary"
              className="rounded-full font-bold px-5 bg-(--auth-primary) hover:bg-(--auth-primary-hover) shadow-sm transition-all active:scale-95 flex items-center"
            >
              All listings
              <ArrowRight className="ml-2 transition-transform duration-200 group-hover:translate-x-1" size={16} />
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {properties.map((property) => (
          <FeaturedPropertyCard key={property.property_id} property={property} />
        ))}
      </div>
    </section>
  );
}
