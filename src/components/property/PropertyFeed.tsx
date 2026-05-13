"use client";

import { useMemo } from "react";
import { usePropertyStore } from "../../store/propertyStore";
import { useProperties } from "../../lib/queries";
import { PropertyCard } from "./PropertyCard";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export function PropertyFeed() {
  const { filters, page, setPage } = usePropertyStore();
  const { data, isLoading, isError } = useProperties({ ...filters, page });

  const total = data?.total ?? 0;
  const properties = data?.properties ?? [];
  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / 12)), [total]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Showing latest listings</p>
          <h2 className="text-2xl font-semibold text-slate-900">Property listing feed</h2>
        </div>
        <Badge>{properties.length} properties available</Badge>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="h-72 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-900">Failed to load properties.</div>
      ) : properties.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700">No properties match current filters.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4">
        <p className="text-sm text-slate-500">Page {page} of {pageCount}</p>
        <div className="flex gap-2">
          <button
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Previous
          </button>
          <button
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => setPage(Math.min(pageCount, page + 1))}
            disabled={page >= pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
