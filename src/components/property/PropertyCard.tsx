"use client";

import Link from "next/link";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { Property } from "../../types/propertyTypes";
import { useFavorites } from "../../store/favoritesStore";

// --- Helpers ---

function formatPrice(price: number): string {
  if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `${(price / 1_000).toFixed(0)}K`;
  return price.toLocaleString();
}

function ImagePlaceholder({ title, dark = false }: { title: string; dark?: boolean }) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${dark ? "from-slate-700 to-slate-900" : "from-slate-100 to-slate-200"}`}>
      <div className="text-center px-4">
        <span className="text-3xl opacity-40">🏢</span>
        <p className={`mt-2 text-xs font-medium line-clamp-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>{title}</p>
      </div>
    </div>
  );
}

function FavoriteButton({ property }: { property: Property }) {
  const fav = useFavorites();
  const isFav = fav.isFavorite(property.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFav) fav.remove(property.id);
    else fav.add(property);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isFav ? "Remove favorite" : "Save listing"}
      className={`absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full shadow-sm backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${
        isFav ? "bg-rose-500 text-white" : "bg-white/80 text-slate-600 hover:bg-white"
      }`}
    >
      <span className="text-lg leading-none">{isFav ? "♥" : "♡"}</span>
    </button>
  );
}

interface PropertyCardProps {
  property: Property;
}

// --- Components ---

/** Standard Grid Card */
export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <Card className="overflow-hidden border-slate-200 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-56 overflow-hidden bg-slate-900">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
            />
          ) : (
            <ImagePlaceholder title={property.title} />
          )}

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {property.featured && <Badge variant="featured">⭐ Featured</Badge>}
            <Badge variant={property.status === "rent" ? "accent" : "success"}>
              For {property.status === "rent" ? "Rent" : "Sale"}
            </Badge>
          </div>
          <FavoriteButton property={property} />
        </div>

        <div className="space-y-3 p-4 bg-white transition-colors duration-300 group-hover:bg-slate-900">
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-colors">
              <span>📍</span> {property.subCity ? `${property.subCity}, ` : ""}{property.city}
            </p>
            <h3 className="mt-1 truncate text-lg font-bold text-slate-900 transition-colors group-hover:text-white">
              {property.title}
            </h3>
          </div>

          <p className="text-sm leading-relaxed text-slate-500 line-clamp-2 min-h-[40px] transition-colors group-hover:text-slate-300">
            {property.description}
          </p>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 group-hover:border-slate-800 transition-colors">
            <div>
              <p className="text-xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-white">
                {formatPrice(property.price)}
                <span className="ml-1 text-xs font-bold text-amber-500 group-hover:text-amber-400 transition-colors">ETB</span>
                {property.status === "rent" && <span className="text-xs font-medium text-slate-400 group-hover:text-slate-400">/mo</span>}
              </p>
            </div>
            <span className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-slate-600 transition-colors group-hover:bg-slate-800 group-hover:text-slate-200">
              {property.furnished ? "Furnished" : "Unfurnished"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

/** Hero / Highlighted Card */
export function FeaturedPropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-2xl transition-all duration-500 hover:shadow-slate-950/40">
        
        {/* Media Container */}
        <div className="relative h-80 sm:h-96">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              className="h-full w-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-80"
            />
          ) : (
            <ImagePlaceholder title={property.title} dark />
          )}
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        </div>

        {/* Top Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          {property.featured && <Badge variant="featured">⭐ Featured</Badge>}
          <Badge variant={property.status === "rent" ? "accent" : "success"}>
            For {property.status === "rent" ? "Rent" : "Sale"}
          </Badge>
        </div>
        
        <FavoriteButton property={property} />

        {/* Bottom Content Area */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
  {/* 1. Deepen the local background specifically behind the text */}
  <div className="absolute inset-0 bg-slate-950/60 blur-2xl -z-10 translate-y-4" />

  <div className="flex items-end justify-between gap-4">
    <div className="min-w-0 flex-1">
      <p className="flex items-center gap-1.5 text-xs font-bold text-white/80 drop-shadow-md">
        <span>📍</span> {property.subCity ? `${property.subCity}, ` : ""}{property.city}
      </p>
      
      {/* 2. Added drop-shadow and ensured font weight is heavy */}
      <h3 className="mt-1 truncate text-2xl font-black text-white drop-shadow-xl tracking-tight">
        {property.title}
      </h3>
    </div>

    <div className="text-right">
      <p className="text-2xl font-black text-white leading-none drop-shadow-2xl">
        {formatPrice(property.price)}
      </p>
      <p className="text-[10px] font-black text-white/90 uppercase mt-1 tracking-widest drop-shadow-md">
        ETB {property.status === "rent" ? "/ MONTH" : "TOTAL"}
      </p>
    </div>
  </div>
</div>
      </div>
    </Link>
  );
}

/** List / Sidebar Card - Static Version (No Hover) */
export function CompactPropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="block">
      <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md">
        {/* Thumbnail */}
        <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImagePlaceholder title={property.title} />
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {property.city}
          </p>
          <h4 className="truncate text-sm font-bold text-slate-900">
            {property.title}
          </h4>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] font-medium text-slate-500">
            <span>{property.bedrooms} bed</span>
            <span>·</span>
            <span>{property.area} m²</span>
          </div>
          <p className="mt-1 text-sm font-black text-slate-900">
            {formatPrice(property.price)}
            <span className="ml-1 text-[10px] font-bold text-amber-600">ETB</span>
          </p>
        </div>
      </div>
    </Link>
  );
}