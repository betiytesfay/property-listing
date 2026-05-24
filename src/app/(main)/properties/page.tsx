import { PropertyFilters } from "../../../components/property/PropertyFilters";
import { PropertyFeed } from "../../../components/property/PropertyFeed";
import { ListFilters } from "../../../components/property/ListFilters";

export default function PropertiesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <ListFilters />
        </aside>

        <main className="lg:col-span-3">
          <PropertyFeed />
        </main>
      </div>
    </div>
  );
}
