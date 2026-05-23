"use client";

import { Search } from "lucide-react";

import { useRouter } from "next/navigation";
import { usePropertyStore } from "../../store/propertyStore";

export function HeroSearch() {
  const router = useRouter();
  const { filters } = usePropertyStore();

  const handleSearch = () => {
    const params = new URLSearchParams();

    // STATUS
    if (filters.status && filters.status !== "all") {
      params.set("status", filters.status);
    }

    // CITY
    if (filters.city) {
      params.set("city", filters.city);
    }

    // BEDROOMS
    if (filters.bedrooms) {
      params.set("bedrooms", String(filters.bedrooms));
    }

    // BATHROOMS
    if (filters.bathrooms) {
      params.set("bathrooms", String(filters.bathrooms));
    }

    // MIN PRICE
    if (filters.minPrice) {
      params.set("minPrice", String(filters.minPrice));
    }

    // MAX PRICE
    if (filters.maxPrice) {
      params.set("maxPrice", String(filters.maxPrice));
    }

    // FURNISHED
    if (filters.furnished !== "all") {
      params.set("furnished", String(filters.furnished));
    }

    // REDIRECT
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <button
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


    </button>
  );
}