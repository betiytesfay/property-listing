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
        <span className="text-2xl opacity-40">🏢</span>
        <p className={`mt-1 text-[10px] font-medium line-clamp-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>{title}</p>
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
      className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-sm backdrop-blur-md transition-all hover:scale-110 ${
        isFav ? "bg-rose-500 text-white" : "bg-white/80 text-slate-600 hover:bg-white"
      }`}
    >
      <span className="text-base leading-none">{isFav ? "♥" : "♡"}</span>
    </button>
  );
}

interface PropertyCardProps {
  property: Property;
  viewMode?: "grid" | "list";
}


export function PropertyCard({ property, viewMode = "grid" }: PropertyCardProps) {
  const isList = viewMode === "list";

  return (
    <Link href={`/properties/${property.id}`} className="group block h-full">
      <Card
        className={`
          overflow-hidden rounded-3xl border border-slate-200/70
          bg-white shadow-sm transition-all duration-300
          hover:-translate-y-1 hover:shadow-2xl
          h-full flex
          ${isList ? "flex-col md:flex-row" : "flex-col"}
        `}
      >
        {/* IMAGE SECTION */}
        <div
          className={`
            relative overflow-hidden bg-slate-900 flex-shrink-0
            ${
              isList
                ? "h-72 md:h-auto md:w-[58%]"
                : "h-80 w-full"
            }
          `}
        >
          {property.imageUrl ? (
            <img
              src={property.imageUrl}
              alt={property.title}
              className="
                h-full w-full object-cover
                transition-transform duration-700
                group-hover:scale-105
              "
            />
          ) : (
            <ImagePlaceholder title={property.title} />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {property.featured && (
              <Badge variant="featured">⭐ Featured</Badge>
            )}

            <Badge
              variant={
                property.status === "rent"
                  ? "accent"
                  : "success"
              }
            >
              For {property.status === "rent" ? "Rent" : "Sale"}
            </Badge>
          </div>

          <FavoriteButton property={property} />
        </div>

        {/* CONTENT SECTION */}
        <div
          className={`
            flex flex-1 flex-col justify-between
            bg-white transition-colors duration-300
            group-hover:bg-slate-900
            ${isList ? "p-5 md:max-w-[42%]" : "p-5"}
          `}
        >
          <div className="space-y-3">
            {/* Location */}
            <p
              className="
                flex items-center gap-1
                text-[10px] font-bold uppercase tracking-wider
                text-slate-400 transition-colors
                group-hover:text-slate-500
              "
            >
              <span>📍</span>
              {property.subCity
                ? `${property.subCity}, `
                : ""}
              {property.city}
            </p>

            {/* Title */}
            <h3
              className="
                line-clamp-2 text-lg font-black leading-tight
                text-slate-900 transition-colors
                group-hover:text-white
              "
            >
              {property.title}
            </h3>

            {/* SMALLER DESCRIPTION */}
            <p
              className="
                max-w-[92%]
                text-xs leading-relaxed
                text-slate-500 line-clamp-2
                transition-colors
                group-hover:text-slate-400
              "
            >
              {property.description}
            </p>
          </div>

          {/* FOOTER */}
          <div
            className="
              mt-5 flex items-center justify-between
              border-t border-slate-100 pt-4
              transition-colors
              group-hover:border-slate-800
            "
          >
            <div>
              <p
                className="
                  text-2xl font-black tracking-tight
                  text-slate-900 transition-colors
                  group-hover:text-white
                "
              >
                {formatPrice(property.price)}

                <span className="ml-1 text-xs font-bold text-amber-500">
                  ETB
                </span>

                {property.status === "rent" && (
                  <span className="ml-1 text-[11px] font-medium text-slate-400">
                    /mo
                  </span>
                )}
              </p>
            </div>

            <span
              className="
                rounded-xl bg-slate-50
                px-2.5 py-1 text-[10px]
                font-bold uppercase tracking-wide
                text-slate-500 transition-colors
                group-hover:bg-slate-800
                group-hover:text-slate-400
              "
            >
              {property.furnished
                ? "Furnished"
                : "Unfurnished"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}


export function FeaturedPropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl transition-all duration-500">
        <div className="relative h-80">
          {property.imageUrl ? (
            <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
          ) : (
            <ImagePlaceholder title={property.title} dark />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-black text-white truncate">{property.title}</h3>
          <p className="text-lg font-bold text-white">{formatPrice(property.price)} <span className="text-xs text-amber-500">ETB</span></p>
        </div>
        <FavoriteButton property={property} />
      </div>
    </Link>
  );
}

export function CompactPropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`} className="block">
      <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-2 shadow-sm">
        <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
          {property.imageUrl ? <img title={property.title} src={property.imageUrl} className="h-full w-full object-cover" /> : <ImagePlaceholder title={property.title} />}
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-sm font-bold text-slate-900">{property.title}</h4>
          <p className="text-sm font-black text-slate-900">{formatPrice(property.price)} <span className="text-[10px] text-amber-600">ETB</span></p>
        </div>
      </div>
    </Link>
  );
}