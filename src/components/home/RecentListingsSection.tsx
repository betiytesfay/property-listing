import Link from "next/link";
import { CompactPropertyCard } from "../property/PropertyCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import type { Property } from "../../types/propertyTypes";

interface RecentListingsSectionProps {
  properties: Property[];
}

export function RecentListingsSection({ properties }: RecentListingsSectionProps) {
  // Split: first 4 compact cards in a 2-col grid
  const recentGrid = properties.slice(0, 4);

  return (
    <section className="grid gap-8 lg:grid-cols-3">
      {/* Left: listing grid */}
      <div className="space-y-5 lg:col-span-2">
        <SectionHeader
          eyebrow="Updated daily"
          title="Recent Listings"
          description="Stay updated with the latest additions to our portfolio."
          action={
            <Link href="/properties">
              <Button variant="ghost" size="sm" iconPosition="right" icon={<span>→</span>}>
                View all
              </Button>
            </Link>
          }
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {recentGrid.map((property) => (
            <CompactPropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* Right: Sell your property CTA card */}
      <div>
        <SellCTACard />
      </div>
    </section>
  );
}

function SellCTACard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white">
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/10" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-amber-500/5" />

      <div className="relative space-y-5">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-2xl">
          🏡
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            List with Akeray
          </p>
          <h3 className="text-2xl font-black leading-tight">
            Sell Your<br />Property
          </h3>
          <p className="text-sm leading-6 text-slate-400">
            List your home with Ethiopia's most trusted premium real estate network.
            Reach thousands of serious buyers and renters across the country.
          </p>
        </div>

        <ul className="space-y-2 text-sm text-slate-300">
          {[
            "✓ Verified audience of serious buyers",
            "✓ Listings live within 24 hours",
            "✓ Direct inquiries to your inbox",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Link href="/list-property">
          <Button variant="gold" size="lg" fullWidth>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
