"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";

import { usePropertyStore } from "../../store/propertyStore";
import { useProperties } from "../../lib/queries";
import { PropertyCard } from "./PropertyCard";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";

function SkeletonCard({ wide = false }: { wide?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-stone-200 bg-white ${
        wide ? "flex gap-0" : ""
      }`}
    >
      <div
        className={`animate-pulse bg-stone-100 ${
          wide ? "w-52 flex-shrink-0" : "h-52 w-full"
        }`}
      />
      <div className="flex-1 space-y-3 p-5">
        <div className="h-2.5 w-1/4 animate-pulse rounded-full bg-stone-100" />
        <div className="h-4 w-3/5 animate-pulse rounded bg-stone-100" />
        <div className="h-3 w-full animate-pulse rounded bg-stone-100" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-stone-100" />
        <div className="flex gap-3 pt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-3.5 w-12 animate-pulse rounded-full bg-stone-100" />
          ))}
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-24 animate-pulse rounded bg-stone-100" />
          <div className="h-4 w-16 animate-pulse rounded-full bg-stone-100" />
        </div>
      </div>
    </div>
  );
}

function PageButton({
  active,
  onClick,
  children,
  disabled,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex h-9 min-w-[36px] items-center justify-center rounded-xl px-3 text-sm font-semibold transition-all duration-150
        ${
          active
            ? "bg-stone-900 text-white shadow-sm"
            : disabled
            ? "cursor-not-allowed text-stone-300"
            : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:border-stone-300"
        }
      `}
    >
      {children}
    </button>
  );
}

export function PropertyFeed() {
  const { filters, page, setPage } = usePropertyStore();
  const { data, isLoading, isError } = useProperties({ ...filters, page });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const total = data?.total ?? 0;
  const properties = data?.properties ?? [];
  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / 12)), [total]);

  return (
    <section className="space-y-6">

      {/* Feed header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-serif font-light text-stone-900 tracking-tight">
            {isLoading ? (
              <span className="inline-block w-48 h-5 animate-pulse rounded bg-stone-200" />
            ) : (
              <>
                {total.toLocaleString()}{" "}
                <span className="text-stone-400">
                  {total === 1 ? "property" : "properties"} found
                </span>
              </>
            )}
          </h2>
          {!isLoading && properties.length > 0 && (
            <p className="mt-0.5 text-xs text-stone-400">
              Showing {properties.length} on this page
            </p>
          )}
        </div>

        {/* View mode */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex overflow-hidden rounded-xl border border-stone-200 bg-white p-0.5 gap-0.5">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                viewMode === "grid"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-500 hover:bg-stone-50"
              }`}
            >
              <LayoutGrid size={13} />
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                viewMode === "list"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "text-stone-500 hover:bg-stone-50"
              }`}
            >
              <List size={13} />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className={`grid gap-5 ${
            viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} wide={viewMode === "list"} />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 px-8 py-12 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
            <span className="text-xl">⚠</span>
          </div>
          <p className="font-semibold text-rose-800">Failed to load listings</p>
          <p className="mt-1 text-sm text-rose-500">
            Please try again or refresh the page.
          </p>
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white px-8 py-16 text-center">
          <p className="text-3xl mb-3">🔍</p>
          <p className="font-semibold text-stone-800">No properties found</p>
          <p className="mt-1 text-sm text-stone-400 max-w-xs mx-auto">
            Try adjusting your filters or broadening your search criteria.
          </p>
          <button
            onClick={() => usePropertyStore.getState().resetFilters()}
            className="mt-5 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-5 ${
            viewMode === "grid" ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          }`}
        >
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && pageCount > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-200 bg-white px-5 py-4">
          <p className="text-sm text-stone-400">
            Page{" "}
            <span className="font-semibold text-stone-700">{page}</span>
            {" "}of{" "}
            <span className="font-semibold text-stone-700">{pageCount}</span>
          </p>

          <div className="flex items-center gap-1.5">
            <PageButton
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
            >
              ← Prev
            </PageButton>

            <div className="hidden sm:flex gap-1">
              {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                const p = Math.max(1, Math.min(pageCount - 4, page - 2)) + i;
                return (
                  <PageButton
                    key={p}
                    active={p === page}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </PageButton>
                );
              })}
            </div>

            <PageButton
              onClick={() => setPage(Math.min(pageCount, page + 1))}
              disabled={page >= pageCount}
            >
              Next →
            </PageButton>
          </div>
        </div>
      )}
    </section>
  );
}
