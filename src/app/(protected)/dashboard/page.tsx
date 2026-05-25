"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  CreditCard,
  Home,
  Plus,
  RefreshCw,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import { getSellerListings, type SellerListing } from "@/src/lib/api/dashboard";
import { apiClient } from "@/src/lib/api/client";
import { PropertyCreationModal } from "@/src/components/seller/PropertyCreationModal";

export default function SellerOverviewPage() {
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDashboardData = useCallback(async (silent = false) => {
    try {
      if (silent) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setFetchError(null);
      const response = await getSellerListings(0, 100);
      setListings(response?.data || []);
    } catch (error: any) {
      console.error(error);
      setFetchError(error?.message || "Unable to load seller dashboard.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ===============================
  // Dashboard Metrics
  // ===============================
  const metrics = useMemo(() => {
    const total = listings.length;
    const live = listings.filter((p) => p.is_active && p.listing_fee_paid).length;
    const pendingPayments = listings.filter((p) => !p.listing_fee_paid).length;
    const inactive = listings.filter((p) => !p.is_active).length;
    const portfolioValue = listings.reduce((acc, property) => acc + Number(property.price || 0), 0);

    return { total, live, pendingPayments, inactive, portfolioValue };
  }, [listings]);

  // ===============================
  // Recent Listings
  // ===============================
  const recentListings = useMemo(() => {
    return [...listings]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [listings]);

  // ===============================
  // Pending Payments
  // ===============================
  const pendingPaymentListings = useMemo(() => {
    return listings.filter((p) => !p.listing_fee_paid).slice(0, 5);
  }, [listings]);

  // ===============================
  // Portfolio Insights
  // ===============================
  const insights = useMemo(() => {
    if (!listings.length) {
      return { highest: null, lowest: null, newest: null };
    }

    const sortedByPrice = [...listings].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    const sortedByDate = [...listings].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return {
      highest: sortedByPrice[0],
      lowest: sortedByPrice[sortedByPrice.length - 1],
      newest: sortedByDate[0],
    };
  }, [listings]);

  // ===============================
  // Payment Status Checker
  // ===============================
  async function checkPaymentStatus(propertyId: string) {
    try {
      const response = await apiClient.get(`/api/v1/payments/properties/${propertyId}/payment-status`);
      const payment = response.data;
      alert(`Payment Status: ${payment.status}\nReference: ${payment.tx_ref}`);
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.detail || "Unable to fetch payment status.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto p-2">
        <div className="h-48 animate-pulse rounded-[32px] bg-slate-100" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
        <div className="h-32 animate-pulse rounded-3xl bg-slate-100" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-red-700">Failed to load dashboard</h2>
          <p className="mt-3 text-sm text-red-600">{fetchError}</p>
          <button
            onClick={() => fetchDashboardData()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition shadow-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto p-1 text-slate-800">
      
      {/* HERO HEADER MANAGEMENT WORKSPACE */}
      <section className="rounded-[32px] border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#002045]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#002045]">
              <TrendingUp className="h-3.5 w-3.5" />
              Habesha Property Hub Workspace
            </div>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Monitor intelligence analytics, track real-time marketplace values, and process incoming property assets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              onClick={() => fetchDashboardData(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <RefreshCw className={`h-4 w-4 text-slate-500 ${isRefreshing ? "animate-spin" : ""}`} />
              Sync 
            </button>

           
          </div>
        </div>
        <PropertyCreationModal isOpen={isOpen} onClose={() => { setIsOpen(false); fetchDashboardData(true); }} />
      </section>

         
      <section className="rounded-[24px] border border-slate-800 bg-gradient-to-br from-[] to-[#001229] p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <p className="text-xs font-bold uppercase tracking-wider text-blue-300">
          Aggregated Portfolio Value
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-white">
          ETB {metrics.portfolioValue.toLocaleString()}
        </h2>
        <p className="mt-2 max-w-xl text-xs text-blue-100/70 leading-relaxed">
          The cumulative valuation parameters of all standard marketplace assets managed under this deployment domain.
        </p>
      </section>


      {/* CORE METRIC COUNTERS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <DashboardCard
          title="Total Properties"
          value={metrics.total}
          description="Entire system portfolio balance"
          icon={<Building2 className="h-5 w-5" />}
        />
        <DashboardCard
          title="Live Marketplace Listings"
          value={metrics.live}
          description="Published and discoverable"
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="emerald"
        />
        <DashboardCard
          title="Awaiting Verification"
          value={metrics.pendingPayments}
          description="Pending fee validation metrics"
          icon={<Clock3 className="h-5 w-5" />}
          accent="amber"
        />
        
      </section>



      {/*  REAL-TIME PORTFOLIO INSIGHTS  */}
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-indigo-50 p-1.5 text-indigo-600">
            <Sparkles className="h-4 w-4" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Strategic Portfolio Insights
          </h3>
        </div>
        
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <InsightCard
            label="Highest Valuation Asset"
            value={insights.highest?.title || "No data active"}
            subValue={insights.highest ? `ETB ${Number(insights.highest.price || 0).toLocaleString()}` : "N/A"}
            variant="highest"
          />
          <InsightCard
            label="Baseline Valuation Asset"
            value={insights.lowest?.title || "No data active"}
            subValue={insights.lowest ? `ETB ${Number(insights.lowest.price || 0).toLocaleString()}` : "N/A"}
            variant="lowest"
          />
          <InsightCard
            label="Most Recent Directory Sync"
            value={insights.newest?.title || "No data active"}
            subValue={insights.newest ? new Date(insights.newest.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : "N/A"}
            variant="newest"
          />
        </div>
      </section>

    

      {/*  DATA GRIDS  */}
      <section className="grid gap-6 xl:grid-cols-2">
        
        {/* Recent Listings Grid Component */}
        <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Index Activities</h3>
                <p className="text-xs text-slate-400 mt-0.5">View newest database instances</p>
              </div>
              <Link
                href="/dashboard/listings"
                className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white  transition shadow-sm"
              >
                View All
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {recentListings.length === 0 ? (
                <EmptyState text="No listings available inside database workspace indices yet." />
              ) : (
                recentListings.map((property) => (
                  <StaticPropertyRow key={property.property_id} property={property} />
                ))
              )}
            </div>
          </div>
        </div>
{/* Pending Fee Processing Grid Component */}
<div className="rounded-[24px] border border-amber-200 bg-amber-50/40 p-6 shadow-sm flex flex-col justify-between">
  <div>
    {/* Header wrapper with layout alignment fix */}
    <div className="flex items-center justify-between border-b border-amber-200/60 pb-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-700 border border-amber-200/40 shrink-0">
          <CreditCard className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Pending Gateways</h3>
          <p className="text-xs text-amber-700/80 mt-0.5">Awaiting instant verification parameters</p>
        </div>
      </div>

      {/* Button refactored into a structured Link layout redirecting to listings */}
      <Link 
        href="/dashboard/listings" 
        className="inline-flex items-center gap-1.5 rounded-xl  px-3.5 py-2 text-xs font-bold text-white transition shadow-sm shrink-0 whitespace-nowrap"
      >
        Check Status
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>

    {/* Content Loop List */}
    <div className="mt-4 space-y-3">
      {pendingPaymentListings.length === 0 ? (
        <EmptyState text="Clear network profile. No pending actions needed." />
      ) : (
        pendingPaymentListings.map((property) => (
          <div
            key={property.property_id}
            className="rounded-xl border border-amber-100 bg-white p-4 shadow-xs hover:border-amber-200 transition"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-slate-900 text-sm truncate">
                  {property.title}
                </h4>
                <p className="mt-0.5 text-xs font-bold text-amber-700">
                  ETB {Number(property.price || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
</div>
      </section>
    </div>
  );
}

/* ===================================================== */
/* Inner Components Framework                           */
/* ===================================================== */

function DashboardCard({
  title,
  value,
  description,
  icon,
  accent = "default",
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  accent?: "default" | "emerald" | "amber" | "slate";
}) {
  const styles = {
    default: "border-slate-200 bg-white text-slate-900",
    emerald: "border-emerald-100 bg-gradient-to-br from-emerald-50/30 to-white text-slate-900",
    amber: "border-amber-100 bg-gradient-to-br from-amber-50/30 to-white text-slate-900",
    slate: "border-slate-200 bg-slate-50/60 text-slate-900",
  };

  return (
    <div className={`rounded-2xl border p-5 shadow-xs flex flex-col justify-between transition hover:shadow-md ${styles[accent]}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {title}
        </p>
        <div className="text-slate-400 shrink-0">{icon}</div>
      </div>
      <div>
        <h3 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
          {value}
        </h3>
        <p className="mt-1 text-xs text-slate-400 font-medium">
          {description}
        </p>
      </div>
    </div>
  );
}

// RESTRICTED ROW: Does not link outwards to keep control focused on "View All" redirection bar
function StaticPropertyRow({ property }: { property: SellerListing }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-100 p-2.5 bg-slate-50/40">
      <img
        src={property.media_urls?.[0] || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"}
        alt={property.title}
        className="h-12 w-16 rounded-lg object-cover shrink-0 border border-slate-200/60"
      />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-sm font-bold text-slate-900">
          {property.title}
        </h4>
        <p className="mt-0.5 text-xs font-semibold text-slate-500">
          ETB {Number(property.price || 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function InsightCard({
  label,
  value,
  subValue,
  variant,
}: {
  label: string;
  value: string;
  subValue: string;
  variant: "highest" | "lowest" | "newest";
}) {
  const outlineStyles = {
    highest: "border-emerald-100 bg-emerald-50/10",
    lowest: "border-blue-100 bg-blue-50/10",
    newest: "border-purple-100 bg-purple-50/10"
  };

  return (
    <div className={`rounded-xl border p-4 shadow-2xs ${outlineStyles[variant]}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <h4 className="mt-2 line-clamp-1 text-sm font-bold text-slate-900 tracking-tight">
        {value}
      </h4>
      <p className="mt-1 text-xs font-black text-[#002045]">
        {subValue}
      </p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-xs text-slate-400 font-medium">
      {text}
    </div>
  );
}