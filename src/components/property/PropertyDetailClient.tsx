"use client";

import { usePropertyById } from "../../lib/queries";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

interface PropertyDetailClientProps {
  id: string;
}

export function PropertyDetailClient({ id }: PropertyDetailClientProps) {
  const { data: property, isLoading, isError } = usePropertyById(id);

  if (isLoading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-10 text-slate-500">Loading property...</div>;
  }

  if (isError || !property) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-rose-900">Property not found.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <div className="h-96 bg-slate-100">
            {property.media_urls?.[0] ? ( // ✅
              <img src={property.media_urls[0]} alt={property.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">No image available</div>
            )}
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{property.title}</h1>
              <p className="mt-2 text-sm text-slate-600">{property.address}</p> {/* ✅ */}
            </div>
            <Badge variant={property.listing_type === "FOR_RENT" ? "accent" : "success"}> {/* ✅ */}
              {property.listing_type === "FOR_RENT" ? "Rent" : "Sale"}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {Number(property.price).toLocaleString()} ETB {/* ✅ price is string */}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{property.category}</p> {/* ✅ */}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              Listing: {property.listing_type === "FOR_RENT" ? "For Rent" : "For Sale"} {/* ✅ */}
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              Fee: {property.listing_fee_paid ? "Paid" : "Unpaid"} {/* ✅ */}
            </div>
          </div>
          {/* ✅ owner_id instead of contactName/contactPhone/contactEmail */}
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Owner Info</p>
            <p className="mt-2">Owner ID: {property.owner_id}</p>
            <p>Listed: {new Date(property.created_at).toLocaleDateString()}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-6 p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Property details</h2>
            <p className="mt-3 leading-7 text-slate-600">{property.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-2 font-semibold text-slate-900">{property.category}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Type</p>
              <p className="mt-2 font-semibold text-slate-900">
                {property.listing_type === "FOR_RENT" ? "For Rent" : "For Sale"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-2 font-semibold text-slate-900">
                {property.is_active ? "Active" : "Inactive"} {/* ✅ */}
              </p>
            </div>
          </div>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Location</h2>
          <p className="mt-2 text-sm text-slate-600">{property.address}</p>
          <p className="text-xs text-slate-400">{property.latitude}, {property.longitude}</p>
          <div className="mt-4 h-72 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center">
            Map placeholder
          </div>
        </Card>
      </div>
    </div>
  );
}