"use client";

import { useMemo, useState } from "react";
import { usePropertyStore } from "../../store/propertyStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { HeroSearch } from "../home/HeroSearch";

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

export function PropertyFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore();
  const [expanded, setExpanded] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.status && filters.status !== "all") count++;
    if (filters.city) count++;
    if (filters.bedrooms !== undefined) count++;
    if (filters.bathrooms !== undefined) count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.furnished !== undefined && filters.furnished !== "all") count++;
    if (filters.keyword) count++;
    return count;
  }, [filters]);

  const statusLabel = useMemo(() => {
    if (filters.status === "rent") return "For Rent";
    if (filters.status === "sale") return "For Sale";
    return "All listings";
  }, [filters.status]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Filters</h2>
            <p className="text-xs text-slate-500">{statusLabel}</p>
          </div>
          {activeFilterCount > 0 && (
            <Badge variant="featured">{activeFilterCount} active</Badge>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear all
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Fewer filters ↑" : "More filters ↓"}
          </Button>

          <HeroSearch />
        </div>
      </div>

      {/* Primary filters */}
      <div className="px-6 py-5">
        {/* Keyword search */}
        <div className="mb-5">
          <div className="relative">
            
            <input
              type="text"
              value={filters.keyword ?? ""}
              onChange={(e) => setFilters({ keyword: e.target.value || undefined })}
              placeholder="Search by keyword, neighbourhood..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Status */}
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Listing type</span>
            <select
              value={filters.status ?? "all"}
              onChange={(e) => setFilters({ status: e.target.value as "all" | "rent" | "sale" })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            >
              <option value="all">All</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </label>

          {/* City */}
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>City</span>
            <select
              value={filters.city ?? ""}
              onChange={(e) => setFilters({ city: e.target.value || undefined })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            >
              <option value="">All cities</option>
              {ETHIOPIAN_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>

          {/* Bedrooms */}
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Bedrooms</span>
            <input
              type="number"
              value={filters.bedrooms ?? ""}
              onChange={(e) => setFilters({ bedrooms: e.target.value ? Number(e.target.value) : undefined })}
              min={0}
              max={20}
              placeholder="Any"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
          </label>

          {/* Sort */}
          <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <span>Sort by</span>
            <select
              value={filters.sortBy ?? "newest"}
              onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* Expanded filters */}
      {expanded && (
        <div className="border-t border-slate-100 px-6 py-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Min price */}
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Min price (ETB)</span>
              <input
                type="number"
                value={filters.minPrice ?? ""}
                onChange={(e) => setFilters({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="0"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </label>

            {/* Max price */}
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Max price (ETB)</span>
              <input
                type="number"
                value={filters.maxPrice ?? ""}
                onChange={(e) => setFilters({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="No limit"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </label>

            {/* Bathrooms */}
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Bathrooms</span>
              <input
                type="number"
                value={filters.bathrooms ?? ""}
                onChange={(e) => setFilters({ bathrooms: e.target.value ? Number(e.target.value) : undefined })}
                min={0}
                max={10}
                placeholder="Any"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              />
            </label>

            {/* Furnished */}
            <label className="space-y-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Furnishing</span>
              <select
                value={
                  filters.furnished === true ? "true"
                  : filters.furnished === false ? "false"
                  : "all"
                }
                onChange={(e) => {
                  const v = e.target.value;
                  setFilters({ furnished: v === "all" ? "all" : v === "true" });
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
              >
                <option value="all">Any</option>
                <option value="true">Furnished</option>
                <option value="false">Unfurnished</option>
              </select>
            </label>
          </div>
        </div>
      )}

    </section>
  );
}
