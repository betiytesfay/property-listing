import { ListFilters } from "../../../components/property/ListFilters";
import { PropertyFeed } from "../../../components/property/PropertyFeed";

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Page Header */}
      

      {/* Main Content */}
      <div className="mx-auto w-full max-w-screen-xl px-6 py-10 sm:px-10 lg:px-12">
        <div className="flex gap-8 lg:items-start">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 xl:w-80 flex-shrink-0">
            <div className="sticky top-6">
              <ListFilters />
            </div>
          </aside>

          {/* Feed */}
          <main className="min-w-0 flex-1">
            <PropertyFeed />
          </main>
        </div>
      </div>
    </div>
  );
}
