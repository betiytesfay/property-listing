"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

import { usePropertyStore } from "../../store/propertyStore";

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { SearchBar } from "../ui/SearchBar";

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

  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.status && filters.status !== "all") count++;
    if (filters.city) count++;
    if (filters.bedrooms !== undefined) count++;
    if (filters.bathrooms !== undefined) count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;

    if (
      filters.furnished !== undefined &&
      filters.furnished !== "all"
    ) {
      count++;
    }

    if (filters.keyword) count++;

    return count;
  }, [filters]);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="mb-5">
          <SearchBar />
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Listing Type */}
          <select
            value={filters.status ?? "all"}
            onChange={(e) =>
              setFilters({
                status: e.target.value as "all" | "rent" | "sale",
              })
            }
            className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            <option value="all">All Listings</option>
            <option value="rent">For Rent</option>
            <option value="sale">For Sale</option>
          </select>

          {/* City */}
          <select
            value={filters.city ?? ""}
            onChange={(e) =>
              setFilters({
                city: e.target.value || undefined,
              })
            }
            className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
          >
            <option value="">All Cities</option>

            {ETHIOPIAN_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Bedrooms */}
          <input
            type="number"
            min={0}
            max={20}
            placeholder="Bedrooms"
            value={filters.bedrooms ?? ""}
            onChange={(e) =>
              setFilters({
                bedrooms: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              })
            }
            className="h-11 w-32 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm placeholder:text-slate-400 transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
          />

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
                <Badge variant="featured">
                  {activeFilterCount}
                </Badge>
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
                  minPrice: e.target.value
                    ? Number(e.target.value)
                    : undefined,
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
                  maxPrice: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              placeholder="Max Price"
              className="h-11 w-36 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm placeholder:text-slate-400 transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
            />

            {/* Bathrooms */}
            <input
              type="number"
              min={0}
              max={10}
              value={filters.bathrooms ?? ""}
              onChange={(e) =>
                setFilters({
                  bathrooms: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              placeholder="Bathrooms"
              className="h-11 w-32 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm placeholder:text-slate-400 transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
            />

            {/* Furnished */}
            <select
              value={
                filters.furnished === true
                  ? "true"
                  : filters.furnished === false
                    ? "false"
                    : "all"
              }
              onChange={(e) => {
                const value = e.target.value;

                setFilters({
                  furnished:
                    value === "all"
                      ? "all"
                      : value === "true",
                });
              }}
              className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
            >
              <option value="all">Any Furnishing</option>
              <option value="true">Furnished</option>
              <option value="false">Unfurnished</option>
            </select>
          </div>
        </div>
      )}
    </section>
  );
}