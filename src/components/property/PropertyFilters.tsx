"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

import { usePropertyStore } from "../../store/propertyStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { SearchBar } from "../ui/SearchBar";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

export function PropertyFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.listing_type && filters.listing_type !== "all") count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.keyword) count++;
    return count;
  }, [filters]);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="mb-5">
          <SearchBar />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Listing Type - maps directly to listing_type */}
          <select
            value={filters.listing_type ?? "all"}
            onChange={(e) =>
              setFilters({
                listing_type: e.target.value as "all" | "FOR_SALE" | "FOR_RENT",
              })
            }
            className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            <option value="all">All Listings</option>
            <option value="FOR_RENT">For Rent</option>
            <option value="FOR_SALE">For Sale</option>
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy ?? "newest"}
            onChange={(e) =>
              setFilters({
                sortBy: e.target.value as typeof filters.sortBy,
              })
            }
            className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Advanced Filters Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="h-11 rounded-full px-5"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            More
            {activeFilterCount > 0 && (
              <span className="ml-2">
                <Badge variant="featured">{activeFilterCount}</Badge>
              </span>
            )}
            {showAdvanced ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>

          {/* Clear */}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-11 rounded-full"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-slate-100 px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Min Price */}
            <input
              type="number"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Min Price"
              className="h-11 w-36 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm placeholder:text-slate-400 transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
            />

            {/* Max Price */}
            <input
              type="number"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Max Price"
              className="h-11 w-36 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm placeholder:text-slate-400 transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
            />
          </div>
        </div>
      )}
    </section>
  );
}