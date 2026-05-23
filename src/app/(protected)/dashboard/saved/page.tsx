"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Heart,
  Search,
  MapPin,
  ArrowRight,
  Home,
  Compass,
} from "lucide-react";

import { SellerListing } from "@/src/lib/api/dashboard";

export default function SavedHomesPage() {
  const [search, setSearch] = useState("");
  const [savedProperties, setSavedProperties] = useState<SellerListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadSavedProperties() {
      setIsLoading(true);
      setError(null);

      try {
        // NOTE: Backend handler is currently pending implementation.
        // We bypass the network request entirely to prevent unhandled 422 errors.
        if (isMounted) {
          setSavedProperties([]);
        }
      } catch (err: any) {
        if (isMounted) {
          // Kept safe for future backend implementation integration
          setSavedProperties([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadSavedProperties();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProperties = useMemo(() => {
    return savedProperties.filter((property) => {
      const target = `
        ${property.title}
        ${property.address}
        ${property.category}
      `.toLowerCase();

      return target.includes(search.toLowerCase());
    });
  }, [savedProperties, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
              <Heart className="h-3.5 w-3.5 fill-rose-600 text-rose-600" />
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Saved Properties
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Quickly access homes and properties you've bookmarked while browsing.
            </p>
          </div>

          {/* Search */}
          {savedProperties.length > 0 && (
            <div className="flex w-full max-w-md items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:bg-white focus-within:border-slate-400 transition-all">
              <Search className="h-5 w-5 text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search saved properties..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 text-slate-800"
              />
            </div>
          )}
        </div>
      </section>

      {/* Loading */}
      {isLoading ? (
        <section className="rounded-[28px] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-[#002045] animate-spin" />
            <p className="mt-5 text-sm font-medium text-slate-600">
              Loading your saved homes...
            </p>
          </div>
        </section>
      ) : error ? (
        /* Error State */
        <section className="rounded-[28px] border border-rose-200 bg-rose-50 p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Heart className="h-7 w-7 text-rose-500" />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-rose-900">
            Something went wrong
          </h2>

          <p className="mt-3 text-sm text-rose-700">{error}</p>
        </section>
      ) : filteredProperties.length === 0 ? (
        /* Empty States */
        <section className="flex min-h-[520px] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-gradient-to-b from-white to-slate-50 p-10 text-center shadow-sm">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-rose-100 blur-2xl opacity-60" />

            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm border border-slate-200">
              {savedProperties.length === 0 ? (
                <Heart className="h-10 w-10 text-rose-500" />
              ) : (
                <Search className="h-10 w-10 text-slate-400" />
              )}
            </div>
          </div>

          <h2 className="mt-8 text-3xl font-bold tracking-tight text-slate-900">
            {savedProperties.length === 0 ? "No saved homes yet" : "No matching properties"}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500">
            {savedProperties.length === 0
              ? "When you discover properties you like, save them to easily revisit and compare them later."
              : "We couldn't find any saved properties matching your search keywords."}
          </p>

          {savedProperties.length === 0 ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f3f4f5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#43474e]"
              >
                <Compass className="h-4 w-4" />
                Explore Properties
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <Home className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
          ) : (
            <button
              onClick={() => setSearch("")}
              className="mt-8 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Clear Search
            </button>
          )}
        </section>
      ) : (
        /* Property Grid */
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProperties.map((property) => {
            const imageUrl =
              property.media_urls?.[0] ||
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80";

            return (
              <div
                key={property.property_id}
                className="group relative flex flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={imageUrl}
                    alt={property.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bottom-4 left-4 rounded-lg bg-[#002045] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    {property.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="text-xl font-bold text-slate-900">
                    ETB {Number(property.price || 0).toLocaleString()}
                  </div>

                  <h3 className="mt-2 text-base font-semibold text-slate-800 line-clamp-1">
                    {property.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{property.address}</span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <Link
                      href={`/properties/${property.property_id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002045] transition hover:text-[#1a365d]"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}