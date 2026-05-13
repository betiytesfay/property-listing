import { PropertyFilters } from "../components/property/PropertyFilters";
import { PropertyFeed } from "../components/property/PropertyFeed";

export default function PropertiesPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Marketplace</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Public property marketplace
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Browse rental and sale listings, filter by city, price, size, and contact owners directly.
        </p>
      </div>

      <PropertyFilters />
      <PropertyFeed />

    </div>
  );
}
