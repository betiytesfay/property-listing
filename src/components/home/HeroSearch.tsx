"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePropertyStore } from "../../store/propertyStore";

export function HeroSearch() {
  const router = useRouter();
  const { filters } = usePropertyStore();

  const handleSearch = () => {
    const params = new URLSearchParams();

    // ✅ LISTING_TYPE (changed from status)
    if (filters.listing_type && filters.listing_type !== "all") {
      params.set("listing_type", filters.listing_type);
    }

    // ✅ KEYWORD (search term)
    if (filters.keyword) {
      params.set("search", filters.keyword);
    }

    // ✅ CATEGORY
    if (filters.category) {
      params.set("category", filters.category);
    }

    // MIN PRICE
    if (filters.minPrice) {
      params.set("min_price", String(filters.minPrice));
    }

    // MAX PRICE
    if (filters.maxPrice) {
      params.set("max_price", String(filters.maxPrice));
    }

    // ❌ REMOVED: city, bedrooms, bathrooms, furnished (not in your backend)

    // REDIRECT
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <button
    title="Search Properties"
      onClick={handleSearch}
      className="
        flex items-center justify-center gap-2
        rounded-2xl bg-slate-900
        px-6 py-4
        text-sm font-semibold text-white
        transition
        hover:bg-slate-800
      "
    >
      <Search size={18} />
      Search Properties
    </button>
  );
}