import { FaFilter } from "react-icons/fa";

interface ListingsToolbarProps {
  search: string;
  onSearch: (value: string) => void;
}

export function ListingsToolbar({ search, onSearch }: ListingsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
      <h2 className="text-2xl font-bold text-slate-800">Active Listings</h2>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
          className="h-10 w-56 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-300 focus:bg-white"
        />
        <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
          <FaFilter size={14} />
          Filter
        </button>
      </div>
    </div>
  );
}
