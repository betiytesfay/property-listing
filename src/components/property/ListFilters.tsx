"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";

import { usePropertyStore } from "../../store/propertyStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const ETHIOPIAN_CITIES = [
  "Addis Ababa",
  "Dire Dawa",
  "Mekelle",
  "Bahir Dar",
  "Hawassa",
  "Adama",
  "Gondar",
  "Jimma",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "most_rooms", label: "Most rooms" },
];

const inputClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 transition-all duration-200 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100";

const selectClass =
  "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium text-stone-900 transition-all duration-200 focus:border-amber-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100 appearance-none cursor-pointer";

function FilterLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400 mb-2">
      {children}
    </label>
  );
}

function Divider() {
  return <div className="border-t border-stone-100" />;
}

export function ListFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore();
  const [showAdvanced, setShowAdvanced] = useState(true);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status && filters.status !== "all") count++;
    if (filters.city) count++;
    if (filters.keyword) count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.bedrooms !== undefined) count++;
    if (filters.bathrooms !== undefined) count++;
    if (filters.furnished !== undefined && filters.furnished !== "all") count++;
    return count;
  }, [filters]);

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)]">

      {/* Header */}
      <div className="px-6 py-5 border-b border-stone-100 bg-stone-50/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 border border-amber-100">
              <SlidersHorizontal size={14} className="text-amber-600" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-stone-800 leading-none">Filters</h2>
              <p className="mt-0.5 text-xs text-stone-400">Refine your search</p>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-rose-500 transition hover:text-rose-600"
          >
            <X size={12} />
            Clear all filters
          </button>
        )}
      </div>

      {/* Body */}
      <div className="divide-y divide-stone-100">

        {/* Keyword search */}
        <div className="px-6 py-5">
          <FilterLabel>Search</FilterLabel>
          <input
            type="text"
            value={filters.keyword ?? ""}
            onChange={(e) => setFilters({ keyword: e.target.value || undefined })}
            placeholder="Neighbourhood, keyword…"
            className={inputClass}
          />
        </div>

        {/* Status */}
        <div className="px-6 py-5">
          <FilterLabel>Listing Type</FilterLabel>
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Rent", value: "rent" },
              { label: "Sale", value: "sale" },
            ].map((item) => {
              const isActive =
                filters.status === item.value ||
                (!filters.status && item.value === "all");
              return (
                <button
                  key={item.value}
                  onClick={() =>
                    setFilters({ status: item.value as "all" | "rent" | "sale" })
                  }
                  className={`
                    rounded-xl border py-2.5 text-xs font-bold tracking-wide transition-all duration-150
                    ${
                      isActive
                        ? "border-stone-800 bg-stone-800 text-white shadow-sm"
                        : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* City */}
        <div className="px-6 py-5">
          <FilterLabel>City</FilterLabel>
          <div className="relative">
            <select
              value={filters.city ?? ""}
              onChange={(e) => setFilters({ city: e.target.value || undefined })}
              className={selectClass}
            >
              <option value="">All cities</option>
              {ETHIOPIAN_CITIES.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
          </div>
        </div>

        {/* Price range */}
        <div className="px-6 py-5">
          <FilterLabel>Price Range</FilterLabel>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Min"
              className={inputClass}
            />
            <input
              type="number"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Max"
              className={inputClass}
            />
          </div>
        </div>

        {/* Rooms */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FilterLabel>Bedrooms</FilterLabel>
              <input
                type="number"
                value={filters.bedrooms ?? ""}
                onChange={(e) =>
                  setFilters({
                    bedrooms: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                placeholder="Any"
                className={inputClass}
              />
            </div>
            <div>
              <FilterLabel>Bathrooms</FilterLabel>
              <input
                type="number"
                value={filters.bathrooms ?? ""}
                onChange={(e) =>
                  setFilters({
                    bathrooms: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
                placeholder="Any"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Advanced toggle */}
        <div className="px-6 py-4">
          <button
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="flex w-full items-center justify-between text-xs font-bold uppercase tracking-[0.12em] text-stone-500 transition hover:text-stone-700"
          >
            <span>Advanced filters</span>
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {showAdvanced && (
          <>
            {/* Furnished */}
            <div className="px-6 py-5">
              <FilterLabel>Furnishing</FilterLabel>
              <div className="relative">
                <select
                  value={
                    filters.furnished === true
                      ? "true"
                      : filters.furnished === false
                      ? "false"
                      : "all"
                  }
                  onChange={(e) => {
                    const v = e.target.value;
                    setFilters({
                      furnished: v === "all" ? "all" : v === "true",
                    });
                  }}
                  className={selectClass}
                >
                  <option value="all">Any</option>
                  <option value="true">Furnished</option>
                  <option value="false">Unfurnished</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="px-6 py-5">
              <FilterLabel>Sort By</FilterLabel>
              <div className="relative">
                <select
                  value={filters.sortBy ?? "newest"}
                  onChange={(e) =>
                    setFilters({
                      sortBy: e.target.value as typeof filters.sortBy,
                    })
                  }
                  className={selectClass}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>
            </div>
          </>
        )}

        {/* Apply */}
        <div className="px-6 py-5 bg-stone-50/40">
          <Button className="w-full rounded-xl bg-stone-900 py-3 text-sm font-bold tracking-wide text-white transition hover:bg-stone-800 active:scale-[0.98]">
            Apply Filters
          </Button>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="mt-3 w-full text-center text-xs text-stone-400 transition hover:text-stone-600"
            >
              Reset all
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
