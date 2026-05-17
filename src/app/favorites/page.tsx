"use client";

import { useFavorites } from "../../store/favoritesStore";
import { PropertyCard } from "../../components/property/PropertyCard";
import { EmptyState } from "../../components/ui/EmptyState";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved properties</h1>
          <p className="text-sm text-slate-500">Your saved favorites for quick access.</p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon="💖"
            title="No saved properties"
            description="Save properties you like and they will appear here for easy access."
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {favorites.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
