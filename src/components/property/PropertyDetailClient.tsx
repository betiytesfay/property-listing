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
            {property.imageUrl ? (
              <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-500">Image placeholder</div>
            )}
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">{property.title}</h1>
              <p className="mt-2 text-sm text-slate-600">{property.address ?? property.city ?? "Location not provided"}</p>
            </div>
            <Badge variant={property.status === "rent" ? "accent" : "success"}>
              {property.status === "rent" ? "For Rent" : "For Sale"}
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Price</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">${property.price.toLocaleString()}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Area</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{property.area} m²</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Bedrooms: {property.bedrooms}</div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">Bathrooms: {property.bathrooms}</div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">{property.furnished ? "Furnished" : "Unfurnished"}</div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Owner contact</p>
            <p className="mt-2">{property.contactName ?? "Owner name"}</p>
            <p>{property.contactPhone ?? "Phone number"}</p>
            <p>{property.contactEmail ?? "Email address"}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card className="space-y-6 p-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Property details</h2>
            <p className="mt-3 leading-7 text-slate-600">{property.description || "No description provided."}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Bedrooms</p>
              <p className="mt-2 font-semibold text-slate-900">{property.details?.bedrooms ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Bathrooms</p>
              <p className="mt-2 font-semibold text-slate-900">{property.details?.bathrooms ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-2 font-semibold text-slate-900">{property.status}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-2 font-semibold text-slate-900">{property.category ?? "N/A"}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Payment status</p>
              <p className="mt-2 font-semibold text-slate-900">
                {property.listing_fee_paid ? "Fee paid" : "Fee not paid"}
              </p>
            </div>
          </div>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900">Location</h2>
          <div className="mt-4">
            <p className="text-sm text-slate-500">{property.address ?? "Address not available."}</p>
          </div>
          <div className="mt-6 h-72 rounded-3xl bg-slate-100 text-slate-500 flex items-center justify-center">
            {property.latitude && property.longitude ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${property.latitude},${property.longitude}`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-slate-900 underline"
              >
                Open in maps
              </a>
            ) : (
              <span>Map placeholder</span>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
