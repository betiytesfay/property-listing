"use client";

import { useMemo } from "react";
import { usePropertyStore } from "../../store/propertyStore";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const cities = ["Lagos", "Abuja", "Rivers", "Kano"];

export function PropertyFilters() {
  const { filters, setFilters, resetFilters } = usePropertyStore();

  const statusLabel = useMemo(() => {
    if (filters.status === "rent") return "For Rent";
    if (filters.status === "sale") return "For Sale";
    return "Rent or Sale";
  }, [filters.status]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Marketplace filters</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Find property fast</h2>
        </div>
        <Badge>{statusLabel}</Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Rent / Sale</span>
          <select
            value={filters.status ?? "all"}
            onChange={(event) => setFilters({ status: event.target.value as "all" | "rent" | "sale" })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <option value="all">All listings</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span>City</span>
          <select
            value={filters.city}
            onChange={(event) => setFilters({ city: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span>Bedrooms</span>
          <input
            type="number"
            value={filters.bedrooms ?? ""}
            onChange={(event) => setFilters({ bedrooms: event.target.value ? Number(event.target.value) : undefined })}
            min={0}
            placeholder="Any"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          <span>Bathrooms</span>
          <input
            type="number"
            value={filters.bathrooms ?? ""}
            onChange={(event) => setFilters({ bathrooms: event.target.value ? Number(event.target.value) : undefined })}
            min={0}
            placeholder="Any"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm text-slate-700">
            <span>Min price</span>
            <input
              type="number"
              value={filters.minPrice ?? ""}
              onChange={(event) => setFilters({ minPrice: event.target.value ? Number(event.target.value) : undefined })}
              placeholder="0"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Max price</span>
            <input
              type="number"
              value={filters.maxPrice ?? ""}
              onChange={(event) => setFilters({ maxPrice: event.target.value ? Number(event.target.value) : undefined })}
              placeholder="Any"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-700">
            <span>Furnished</span>
            <select
              value={filters.furnished === true ? "true" : filters.furnished === false ? "false" : "all"}
              onChange={(event) => {
                const value = event.target.value;
                setFilters({ furnished: value === "all" ? "all" : value === "true" });
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <option value="all">All</option>
              <option value="true">Furnished</option>
              <option value="false">Unfurnished</option>
            </select>
          </label>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" type="button" onClick={resetFilters}>
            Reset filters
          </Button>
        </div>
      </div>
    </section>
  );
}
