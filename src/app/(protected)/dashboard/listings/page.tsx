"use client";
/// <reference types="react" />

import React, { useEffect, useMemo, useState } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
import Link from "next/link";
import { Download, Plus, Search, Home, Filter, Loader2, CreditCard, Trash2, CheckCircle2, X, AlertTriangle, Edit } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/lib/api/client";

import DataTable from "@/src/components/seller/DataTable";
import Pagination from "@/src/components/seller/Pagination";
import PropertyCell from "@/src/components/seller/PropertyCell";
import StatusBadge from "@/src/components/seller/StatusBadge";
import { PropertyCreationModal } from "@/src/components/seller/PropertyCreationModal";
import { getSellerListings, type SellerListing } from "@/src/lib/api/dashboard";
import { TrendingUp } from "lucide-react";

export default function ListingPage() {
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; title: string } | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [deletedPropertyName, setDeletedPropertyName] = useState("");

  async function fetchListings() {
    try {
      setIsLoading(true);
      const response = await getSellerListings(page * limit, limit);
      setListings(response.data);
      setTotal(response.total);
      setFetchError(null);
    } catch (error: any) {
      setFetchError(error?.message || "Unable to load listings.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, [page, limit]);

  const initiatePaymentMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      const response = await apiClient.post(`/payments/properties/${propertyId}/pay`);
      return response.data;
    },
    onSuccess: (data: any) => {
      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        alert("Payment initialized, but checkout URL is missing from server response.");
      }
    },
    onError: (err: any) => {
      console.error("Chapa initiation failed:", err);
      const errMsg = err?.response?.data?.detail || "Failed to initialize payment gateway.";
      alert(typeof errMsg === "object" ? JSON.stringify(errMsg) : errMsg);
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: async (propertyId: string) => {
      const response = await apiClient.delete(`/api/v1/properties/${propertyId}`);
      return response.data;
    },
    onSuccess: (_: any, propertyId: string) => {
      const matchingItem = listings.find((item: SellerListing) => item.property_id === propertyId);
      const targetName = matchingItem?.title ?? "Property Listing";
      setListings((prev: SellerListing[]) => prev.filter((item: SellerListing) => item.property_id !== propertyId));
      setDeletedPropertyName(targetName);
      setPropertyToDelete(null);
      setShowDeleteSuccess(true);
    },
    onError: (err: any) => {
      console.error("Backend delete action failed:", err);
      const errMsg = err?.response?.data?.detail || "Failed to delete property listing from backend storage.";
      alert(typeof errMsg === "object" ? JSON.stringify(errMsg) : errMsg);
    },
  });

  const totalCount = total;
  const activeListings = useMemo(() => listings.filter((item: SellerListing) => item.is_active).length, [listings]);
  const pendingListings = useMemo(() => listings.filter((item: SellerListing) => !item.listing_fee_paid).length, [listings]);

  const filteredListings = useMemo(() => {
    return listings.filter((item: SellerListing) => {
      const searchValue = `${item.title} ${item.address} ${item.category}`.toLowerCase();
      const matchesSearch = searchValue.includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "pending"
          ? !item.listing_fee_paid
          : item.is_active;
      return matchesSearch && matchesStatus;
    });
  }, [listings, search, statusFilter]);

  function exportListingsCsv() {
    try {
      if (!filteredListings || filteredListings.length === 0) return;
      const headers = ["Title", "Category", "Price", "Address", "Status", "Created At"];
      const escapeCsvValue = (val: any) => {
        if (val === null || val === undefined) return "";
        const stringVal = String(val).trim();
        if (stringVal.includes(",") || stringVal.includes('"') || stringVal.includes("\n")) {
          return `"${stringVal.replace(/"/g, '""')}"`;
        }
        return stringVal;
      };
      const formatDate = (dateStr: any) => {
        if (!dateStr) return "N/A";
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
      };
      const rows = filteredListings.map((listing: SellerListing) => {
        if (!listing) return ["", "", "0", "", "Unknown", "N/A"];
        return [
          escapeCsvValue(listing.title ?? "Untitled"),
          escapeCsvValue(listing.category ?? "Uncategorized"),
          listing.price ? Number(listing.price) : 0,
          escapeCsvValue(listing.address ?? "No Address"),
          listing.listing_fee_paid ? "Published" : "Pending Payment",
          formatDate(listing.created_at),
        ];
      });
      const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `seller-listings-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("CSV Export Handler error:", err);
    }
  }

  const columns = [
    {
      key: "title",
      label: "Property",
      render: (_value: unknown, row: SellerListing) => (
        <PropertyCell
          image={row.media_urls?.[0]}
          name={row.title ?? "Unknown property"}
          dateAdded={new Date(row.created_at).toLocaleDateString()}
        />
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (value: unknown) => (
        <span className="text-sm font-medium capitalize text-slate-700">
          {String(value)}
        </span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (value: unknown) => (
        <span className="text-sm font-semibold text-slate-900">
          ETB {Number(value).toLocaleString()}
        </span>
      ),
    },
    {
      key: "listing_fee_paid",
      label: "Status",
      align: "center" as const,
      render: (_value: unknown, row: SellerListing) => (
        <StatusBadge status={row.listing_fee_paid ? "Published" : "Pending Payment"} />
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center" as const,
      render: (_value: unknown, row: SellerListing) => {
        const isCurrentPaying = initiatePaymentMutation.isPending && initiatePaymentMutation.variables === row.property_id;

        return (
          <div className="flex items-center justify-center gap-3">
            {!row.listing_fee_paid && (
              <button
                type="button"
                disabled={initiatePaymentMutation.isPending || deletePropertyMutation.isPending}
                onClick={() => initiatePaymentMutation.mutate(row.property_id)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black shadow-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[130px] justify-center"
              >
                {isCurrentPaying ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CreditCard className="h-3.5 w-3.5" />}
                {isCurrentPaying ? "Processing..." : "Complete Payment"}
              </button>
            )}

            <Link
              href={`/dashboard/listings/${row.property_id}`}
              className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/50 transition shadow-sm"
              title="Edit property"
            >
              <Edit className="h-4 w-4" />
            </Link>

            <button
              type="button"
              disabled={initiatePaymentMutation.isPending || deletePropertyMutation.isPending}
              onClick={() => setPropertyToDelete({ id: row.property_id, title: row.title ?? "This property" })}
              className="inline-flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition shadow-sm disabled:opacity-40"
              title="Soft delete listing"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#002045]/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#002045]">
              <TrendingUp className="h-3.5 w-3.5" />
              HabeshaHub Workspace
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Property Listings
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
              Manage listings, complete payments, monitor publishing status, and maintain your property inventory.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportListingsCsv}
              disabled={filteredListings.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#002045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a365d]"
            >
              <Plus className="h-4 w-4" />
              Add property
            </button>
          </div>
        </div>
        <PropertyCreationModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2 transition-all focus-within:border-[#002045]/20 focus-within:bg-white focus-within:ring-1 focus-within:ring-[#002045]">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder="Search listings, categories, addresses..."
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="w-full sm:w-[180px] shrink-0 items-center gap-2.50">
            <select
              value={statusFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer appearance-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Listings</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">{totalCount}</h3>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-emerald-700">Active Listings</p>
          <h3 className="mt-3 text-3xl font-bold text-emerald-900">{activeListings}</h3>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <p className="text-sm font-medium text-amber-700">Pending Payments</p>
          <h3 className="mt-3 text-3xl font-bold text-amber-900">{pendingListings}</h3>
        </div>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        {fetchError ? (
          <div className="flex min-h-[300px] items-center justify-center p-8 text-center">
            <div>
              <p className="text-lg font-semibold text-red-600">Failed to load listings</p>
              <p className="mt-2 text-sm text-slate-500">{fetchError}</p>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-4 p-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-16 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
            <div className="rounded-full bg-slate-100 p-5">
              <Home className="h-8 w-8 text-slate-500" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-slate-900">No listings found</h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Create your first property listing to begin publishing homes on the marketplace.
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#002045] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00152e]"
            >
              <Plus className="h-4 w-4" />
              Add Property
            </button>
          </div>
        ) : (
          <>
            <DataTable columns={columns as any} data={filteredListings as any} rowKey="property_id" />
            <Pagination
              showing={filteredListings.length}
              total={totalCount}
              onPrev={() => setPage((current: number) => Math.max(0, current - 1))}
              onNext={() => setPage((current: number) => current + 1)}
              canPrev={page > 0}
              canNext={(page + 1) * limit < totalCount}
            />
          </>
        )}
      </section>

      {propertyToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-100 mx-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-red-100 p-3 text-red-600 shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Delete Property Listing?</h3>
                <p className="text-sm text-slate-500">
                  Are you sure you want to soft delete <span className="font-semibold text-slate-800">&ldquo;{propertyToDelete.title}&rdquo;</span>? This will remove it from the active database system.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled={deletePropertyMutation?.isPending}
                onClick={() => setPropertyToDelete(null)}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletePropertyMutation?.isPending}
                onClick={() => propertyToDelete && deletePropertyMutation?.mutate(propertyToDelete.id)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 shadow-sm disabled:opacity-50 min-w-[100px]"
              >
                {deletePropertyMutation?.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Delete Listing"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md scale-100 rounded-2xl bg-white p-6 shadow-xl border border-slate-100 mx-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Listing Deleted Successfully</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Database record soft-deleted</p>
                </div>
              </div>
              <button 
                onClick={() => setShowDeleteSuccess(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
              <p className="text-sm font-medium text-slate-700 break-all">
                &ldquo;{deletedPropertyName}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                The record has been clean-removed on your FastAPI server. Total counters and listings indexes have updated instantly.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteSuccess(false)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black transition"
              >
                Dismiss View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}