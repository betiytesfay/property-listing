"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { usePropertyStore } from "../../store/propertyStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

export function ListFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (filters.listing_type && filters.listing_type !== "all") count++;
    if (filters.keyword) count++;
    if (filters.minPrice !== undefined) count++;
    if (filters.maxPrice !== undefined) count++;
    if (filters.category) count++;
    if (filters.is_active !== undefined) count++;

    return count;
  }, [filters]);

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-slate-100 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-slate-700" />
              <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Refine your property search
            </p>
          </div>

          {activeFilterCount > 0 && (
            <Badge variant="featured">{activeFilterCount} active</Badge>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-rose-600 transition hover:text-rose-700"
          >
            <X size={16} />
            Clear all filters
          </button>
        )}
      </div>

      {/* FILTER CONTENT */}
      <div className="space-y-6 px-6 py-6">
        {/* KEYWORD */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Search
          </label>
          <input
            type="text"
            value={filters.keyword ?? ""}
            onChange={(e) =>
              setFilters({
                keyword: e.target.value || undefined,
              })
            }
            placeholder="Search by title, description, address..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
          />
        </div>

        {/* LISTING TYPE - matches backend listing_type */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Listing Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "All", value: "all" },
              { label: "For Rent", value: "FOR_RENT" },
              { label: "For Sale", value: "FOR_SALE" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() =>
                  setFilters({
                    listing_type: item.value as "all" | "FOR_RENT" | "FOR_SALE",
                  })
                }
                className={`
                  rounded-2xl border px-4 py-3 text-sm font-semibold transition
                  ${filters.listing_type === item.value ||
                    (!filters.listing_type && item.value === "all")
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* PRICE RANGE - matches backend price field */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Price Range (ETB)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.minPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  minPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Min Price"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            />
            <input
              type="number"
              value={filters.maxPrice ?? ""}
              onChange={(e) =>
                setFilters({
                  maxPrice: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              placeholder="Max Price"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            />
          </div>
        </div>

        {/* ADVANCED FILTERS */}
        <div className="border-t border-slate-100 pt-5">
          <button
            onClick={() => setShowAdvanced((prev) => !prev)}
            className="text-sm font-semibold text-slate-700 transition hover:text-slate-900"
          >
            {showAdvanced ? "Hide advanced filters" : "Show advanced filters"}
          </button>

          {showAdvanced && (
            <div className="mt-5 space-y-5">
              {/* SORT OPTIONS */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Sort By
                </label>
                <select
                  value={filters.sortBy ?? "newest"}
                  onChange={(e) =>
                    setFilters({
                      sortBy: e.target.value as typeof filters.sortBy,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* CATEGORY - from backend */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Category
                </label>
                <select
                  value={filters.category ?? ""}
                  onChange={(e) =>
                    setFilters({
                      category: e.target.value as "RESIDENTIAL" | "COMMERCIAL" | "LAND" | "INDUSTRIAL" | undefined,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                >
                  <option value="">All Categories</option>
                  <option value="RESIDENTIAL">Residential</option>
                  <option value="COMMERCIAL">Commercial</option>
                  <option value="LAND">Land</option>
                  <option value="INDUSTRIAL">Industrial</option>
                </select>
              </div>

              {/* ACTIVE STATUS */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </label>
                <select
                  value={filters.is_active === true ? "active" : filters.is_active === false ? "inactive" : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters({
                      is_active: value === "" ? undefined : value === "active",
                    });
                  }}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                >
                  <option value="">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* APPLY BUTTON */}
        <Button className="w-full rounded-2xl py-3 text-sm font-semibold">
          Apply Filters
        </Button>
      </div>
    </section>
  );
}