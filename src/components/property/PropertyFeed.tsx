"use client";

import { useMemo, useState } from "react";
import { usePropertyStore } from "../../store/propertyStore";
import { useProperties } from "../../lib/queries";
import { PropertyCard } from "./PropertyCard";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";
import type { Property } from "../../types/propertyTypes"; // ✅

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="h-52 animate-pulse bg-slate-100" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        <div className="flex gap-3 pt-2">
          <div className="h-4 w-12 animate-pulse rounded bg-slate-100" />
          <div className="h-4 w-12 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="h-7 w-24 animate-pulse rounded bg-slate-100" />
          <div className="h-5 w-20 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </div>
  );
}

export function PropertyFeed() {
  const { filters, page, setPage } = usePropertyStore();
  const { data, isLoading, isError } = useProperties({ ...filters, page });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const total = data?.total ?? 0;
  const properties: Property[] = data?.data ?? []; // ✅ data.data not data.properties
  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / 12)), [total]);

  return (
    <section className="space-y-5">
      {/* Feed header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Property Listings</h2>
          <p className="text-sm text-slate-500">
            {isLoading ? "Loading..." : `${total.toLocaleString()} properties found`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={properties.length > 0 ? "success" : "muted"}>
            {properties.length} on this page
          </Badge>
          <div className="flex overflow-hidden rounded-lg border border-slate-200 bg-white">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm transition ${viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
              aria-label="Grid view"
            >⊞</button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm transition ${viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}
              aria-label="List view"
            >☰</button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={`grid gap-5 ${viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
          <p className="text-lg font-semibold text-rose-800">Failed to load listings</p>
          <p className="mt-1 text-sm text-rose-600">Please try again or refresh the page.</p>
        </div>
      ) : properties.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No properties found"
          description="Try adjusting your filters or broadening your search criteria."
          action={
            <Button variant="secondary" onClick={() => usePropertyStore.getState().resetFilters()}>
              Clear all filters
            </Button>
          }
        />
      ) : (
        <div className={`grid gap-5 ${viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}>
          {properties.map((property: Property) => ( // ✅ typed
            <PropertyCard key={property.property_id} property={property} /> // ✅
          ))}
        </div>
      )}

      {!isLoading && !isError && pageCount > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">
            Page <span className="font-semibold text-slate-900">{page}</span> of{" "}
            <span className="font-semibold text-slate-900">{pageCount}</span>
          </p>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page <= 1}>
              ← Previous
            </Button>
            <div className="hidden sm:flex gap-1">
              {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                const p = Math.max(1, Math.min(pageCount - 4, page - 2)) + i;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-8 w-8 rounded-lg text-sm font-semibold transition ${p === page ? "bg-slate-900 text-white" : "border border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                  >{p}</button>
                );
              })}
            </div>
            <Button variant="secondary" size="sm" onClick={() => setPage(Math.min(pageCount, page + 1))} disabled={page >= pageCount}>
              Next →
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}