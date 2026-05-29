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
      className={`
        group overflow-hidden rounded-3xl bg-white
        border border-stone-200/70
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl
        ${wide ? "flex flex-col lg:flex-row gap-0" : "flex-col"}
      `}
    >
      <div
        className={`
          animate-pulse bg-stone-100
          ${wide ? "h-72 sm:h-96 lg:h-auto lg:w-3/5 flex-shrink-0" : "h-80 sm:h-96 w-full"}
        `}
      />

      <div className="flex-1 space-y-4 p-6">
        <div className="h-2.5 w-1/4 animate-pulse rounded-full bg-stone-100" />

        <div className="h-5 w-3/5 animate-pulse rounded bg-stone-100" />

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-stone-100" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-stone-100" />
        </div>

        <div className="flex gap-3 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-5 w-14 animate-pulse rounded-full bg-stone-100"
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="h-7 w-28 animate-pulse rounded bg-stone-100" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-stone-100" />
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
        inline-flex h-10 min-w-[40px] items-center justify-center
        rounded-2xl px-4 text-sm font-semibold
        transition-all duration-200
        ${
          active
            ? "bg-stone-900 text-white shadow-md"
            : disabled
            ? "cursor-not-allowed text-stone-300"
            : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:border-stone-300 hover:shadow-sm"
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

  const pageCount = useMemo(
    () => Math.max(1, Math.ceil(total / 12)),
    [total]
  );

  return (
    <section className="space-y-8">
      {/* Feed header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-serif font-light tracking-tight text-stone-900">
            {isLoading ? (
              <span className="inline-block h-6 w-56 animate-pulse rounded bg-stone-200" />
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
            <p className="mt-1 text-sm text-stone-400">
              Showing {properties.length} on this page
            </p>
          )}
        </div>

        {/* View mode */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex overflow-hidden rounded-2xl border border-stone-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`
                flex items-center gap-2 rounded-xl px-4 py-2.5
                text-xs font-semibold transition-all duration-200
                ${
                  viewMode === "grid"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-500 hover:bg-stone-50"
                }
              `}
            >
              <LayoutGrid size={14} />
              Grid
            </button>

            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`
                flex items-center gap-2 rounded-xl px-4 py-2.5
                text-xs font-semibold transition-all duration-200
                ${
                  viewMode === "list"
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-500 hover:bg-stone-50"
                }
              `}
            >
              <List size={14} />
              List
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div
          className={`grid gap-7 ${
            viewMode === "grid"
              ? "sm:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} wide={viewMode === "list"} />
          ))}
        </div>
      ) : isError ? (
        <div
          className="
            rounded-3xl border border-rose-100 bg-white
            px-8 py-14 text-center shadow-sm
          "
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
            <span className="text-2xl">⚠</span>
          </div>

          <p className="font-semibold text-rose-800">
            Failed to load listings
          </p>

          <p className="mt-2 text-sm text-rose-500">
            Please try again or refresh the page.
          </p>
        </div>
      ) : properties.length === 0 ? (
        <div
          className="
            rounded-3xl border border-stone-200 bg-white
            px-8 py-20 text-center shadow-sm
          "
        >
          <p className="mb-4 text-4xl">🔍</p>

          <p className="font-semibold text-stone-800">
            No properties found
          </p>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-400">
            Try adjusting your filters or broadening your search criteria.
          </p>

          <button
            onClick={() => usePropertyStore.getState().resetFilters()}
            className="
              mt-6 rounded-2xl border border-stone-200
              bg-white px-6 py-3 text-sm font-semibold
              text-stone-700 transition-all duration-200
              hover:bg-stone-50 hover:shadow-sm
            "
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div
          className={`grid gap-7 ${
            viewMode === "grid"
              ? "sm:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {properties.map((property) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              viewMode={viewMode} 
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && pageCount > 1 && (
        <div
          className="
            flex flex-wrap items-center justify-between gap-4
            rounded-3xl border border-stone-200 bg-white
            px-6 py-5 shadow-sm
          "
        >
          <p className="text-sm text-stone-400">
            Page{" "}
            <span className="font-semibold text-stone-700">{page}</span>
            {" "}of{" "}
            <span className="font-semibold text-stone-700">
              {pageCount}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <PageButton
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page <= 1}
            >
              ← Prev
            </PageButton>

            <div className="hidden sm:flex gap-2">
              {Array.from(
                { length: Math.min(5, pageCount) },
                (_, i) => {
                  const p =
                    Math.max(
                      1,
                      Math.min(pageCount - 4, page - 2)
                    ) + i;

                  return (
                    <PageButton
                      key={p}
                      active={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </PageButton>
                  );
                }
              )}
            </div>

            <PageButton
              onClick={() =>
                setPage(Math.min(pageCount, page + 1))
              }
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