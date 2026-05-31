"use client";

import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { Property } from "../../types/propertyTypes";
import { StatChip } from "../ui/StatChip";
import { useFavorites } from "../../store/favoritesStore";

function formatPrice(price: string): string {
  const num = Number(price);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)}K`;
  return num.toLocaleString();
}

function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="text-center">
        <span className="text-3xl">🏢</span>
        <p className="mt-1 text-xs text-slate-400 line-clamp-1 px-2">{title}</p>
      </div>
    </div>
  );
}

function FavoriteButton({ property }: { property: Property }) {
  const fav = useFavorites();
  const isFav = fav.isFavorite(property.property_id); // ✅

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFav) fav.remove(property.property_id); // ✅
    else fav.add(property);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isFav ? "Remove favorite" : "Save listing"}
      className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${isFav ? "bg-rose-500 text-white" : "bg-white/90 text-slate-500"} shadow-sm backdrop-blur-sm transition hover:scale-105`}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.property_id}`} className="group block"> {/* ✅ */}
      <Card className="overflow-hidden">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-slate-100">
          {property.media_urls?.[0] ? ( // ✅
            <img
              src={property.media_urls[0]}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder title={property.title} />
          )}

          {/* Overlay badges */}
          <div className="absolute left-3 top-3 flex gap-1.5">
            <Badge variant={property.listing_type === "FOR_RENT" ? "accent" : "success"}> {/* ✅ */}
              {property.listing_type === "FOR_RENT" ? "For Rent" : "For Sale"}
            </Badge>
          </div>

          <FavoriteButton property={property} />
        </div>

        {/* Body */}
        <div className="space-y-3 p-4">
          <div>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <span>📍</span>
              {property.address} {/* ✅ */}
            </p>
            <h3 className="mt-0.5 truncate text-base font-bold text-secondary group-hover:text-amber-600 transition-colors">
              {property.title}
            </h3>
          </div>

          <p className="text-sm leading-5 text-slate-500 line-clamp-2">{property.description}</p>

          {/* ✅ Removed bedrooms/bathrooms/area — not in backend */}
          <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-3">
            <StatChip icon="🏢" value={property.category} label="" />
            <StatChip icon="📋" value={property.listing_type === "FOR_RENT" ? "Rent" : "Sale"} label="" />
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-black tracking-tight text-slate-900">
                {formatPrice(property.price)} {/* ✅ string price */}
                <span className="ml-1 text-sm font-semibold text-amber-600">ETB</span>
              </p>
              {property.listing_type === "FOR_RENT" && ( // ✅
                <p className="text-xs text-slate-400">/month</p>
              )}
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
              {property.listing_fee_paid ? "Fee Paid" : "Fee Unpaid"} {/* ✅ */}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function FeaturedPropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.property_id}`} className="group block"> {/* ✅ */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
        <div className="relative h-72 sm:h-80">
          {property.media_urls?.[0] ? ( // ✅
            <img
              src={property.media_urls[0]}
              alt={property.title}
              className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
              <span className="text-6xl opacity-30">🏠</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
        </div>

        <div className="absolute left-4 top-4 flex gap-2">
          <Badge variant={property.listing_type === "FOR_RENT" ? "accent" : "success"}> {/* ✅ */}
            {property.listing_type === "FOR_RENT" ? "For Rent" : "For Sale"}
          </Badge>
        </div>

        <FavoriteButton property={property} />

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                {property.title}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-300">
                <span>📍</span>
                {property.address} {/* ✅ */}
              </p>
              <div className="mt-3 flex gap-4">
                <StatChip icon="🏢" value={property.category} label="" />
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <p className="text-2xl font-black text-white">
                {formatPrice(property.price)} {/* ✅ */}
              </p>
              <p className="text-sm font-semibold text-amber-400">ETB</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CompactPropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.property_id}`} className="group block"> {/* ✅ */}
      <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
        <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          {property.media_urls?.[0] ? ( // ✅
            <img
              src={property.media_urls[0]}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder title={property.title} />
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <span>📍</span>
            {property.address} {/* ✅ */}
          </p>
          <h4 className="truncate text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
            {property.title}
          </h4>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{property.category}</span> {/* ✅ */}
            <span>·</span>
            <span>{property.listing_type === "FOR_RENT" ? "Rent" : "Sale"}</span>
          </div>
          <p className="text-sm font-bold text-slate-900">
            {formatPrice(property.price)} {/* ✅ */}
            <span className="ml-1 text-xs font-semibold text-amber-600">ETB</span>
          </p>
        </div>
      </div>
    </Link>
  );
}