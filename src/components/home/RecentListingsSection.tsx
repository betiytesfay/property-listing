"use client";

import Link from "next/link";
import { CompactPropertyCard } from "../property/PropertyCard";
import { SectionHeader } from "../ui/SectionHeader";
import { Button } from "../ui/Button";
import type { Property } from "../../types/propertyTypes";

interface RecentListingsSectionProps {
  properties: Property[];
}

export function RecentListingsSection({ properties }: RecentListingsSectionProps) {
  const recentGrid = properties.slice(0, 4);

  return (
    <section className="grid gap-8 lg:grid-cols-3" style={{ color: "var(--text-primary)" }}>
      {/* Left: listing grid */}
      <div className="space-y-5 lg:col-span-2">
        <SectionHeader
          eyebrow="Updated daily"
          title="Recent Listings"
          description="Stay updated with the latest additions to our portfolio."
          action={
           <Link href="/properties" className="inline-block">
 
  <Button 
    variant="secondary"
    size="sm" 
    iconPosition="right" 
    icon={<span className="transition-transform group-hover:translate-x-1">→</span>}
    className="rounded-full font-bold px-5 bg-[var(--auth-primary)] hover:bg-[var(--auth-primary-hover)] shadow-sm transition-all active:scale-95 group"
  >
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
    <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 !text-white">
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-amber-500/10" />
      <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-amber-500/5" />

      <div className="relative space-y-5 !text-white">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 text-2xl">
          🏡
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            List with Akeray
          </p>

          <h3 className="!text-white text-2xl font-black leading-tight">
            Sell Your Property
          </h3>

          <p className="!text-white text-sm leading-6">
            List your home with Ethiopia's most trusted premium real estate network.
            Reach thousands of serious buyers and renters across the country.
          </p>
        </div>

        <ul className="space-y-2 !text-white text-sm">
          {[
            "✓ Verified audience of serious buyers",
            "✓ Listings live within 24 hours",
            "✓ Direct inquiries to your inbox",
          ].map((item) => (
            <li key={item} className="!text-white">
              {item}
            </li>
          ))}
        </ul>

        <Link href="/register" className="!text-white">
          <Button variant="gold" size="lg" fullWidth>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}