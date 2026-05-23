"use client";

import {
  Building2,
  Clock3,
  Eye,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import { PropertyCreationModal } from "./PropertyCreationModal";

interface SellerHeaderProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  query: string;
  setQuery: (q: string) => void;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
  liveCounts: {
    total: number;
    published: number;
    pending: number;
    inactive: number;
  };
  onRefresh: () => void;
}

export default function SellerHeader({
  isOpen,
  setIsOpen,
  query,
  setQuery,
  activeFilter,
  setActiveFilter,
  liveCounts,
  onRefresh,
}: SellerHeaderProps) {
  const metrics = [
    {
      label: "Total Listings",
      value: liveCounts.total,
      description: "All created properties",
      icon: Building2,
      color: "text-slate-700",
      bg: "bg-slate-50",
      border: "border-slate-200",
    },
    {
      label: "Published",
      value: liveCounts.published,
      description: "Currently visible on marketplace",
      icon: Eye,
      color: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      label: "Pending Payments",
      value: liveCounts.pending,
      description: "Awaiting payment completion",
      icon: Clock3,
      color: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      label: "Inactive Listings",
      value: liveCounts.inactive,
      description: "Disabled or hidden listings",
      icon: Building2,
      color: "text-rose-700",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
  ];

  const toggleFilter = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white px-6 py-7 shadow-sm">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#002045]/15 bg-[#002045]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#002045]">
            <Sparkles className="h-4 w-4" />
            Seller Dashboard
          </div>

          <h1 className="text-3xl font-semibold text-slate-900">
            Property Control Center
          </h1>

          <p className="text-sm leading-6 text-slate-600">
            Manage listings, monitor publication status, and complete pending property payments.
          </p>
        </div>

        
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <button
              key={metric.label}
              type="button"
              onClick={() => toggleFilter(metric.label)}
              className={`rounded-3xl border p-5 text-left transition-all duration-200 hover:shadow-sm ${metric.bg} ${metric.border} ${
                activeFilter === metric.label
                  ? "ring-2 ring-[#002045]/15 scale-[1.01]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {metric.label}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold text-slate-900">
                    {metric.value}
                  </h3>
                </div>

                <div className="rounded-2xl bg-white/80 p-3 shadow-sm">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>

              <p className={`mt-4 text-sm font-medium ${metric.color}`}>
                {metric.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <label className="flex-1">
          <span className="sr-only">Search dashboard</span>

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#002045]/20 focus-within:border-[#002045]">
            <Search className="h-4 w-4 text-slate-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search listings by title or address..."
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </label>
      </div>

      
    </section>
  );
}
