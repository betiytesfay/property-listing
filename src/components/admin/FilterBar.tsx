'use client';

import { useState, useEffect } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
  activeFilterCount?: number;
  onClearFilters?: () => void;
  initialFilters?: {
    status?: string;
    type?: string;
    sortBy?: string;
  };
}

export default function FilterBar({ onFilterChange, onClearFilters, initialFilters = {} }: FilterBarProps) {
  const [statusFilter, setStatusFilter] = useState(initialFilters.status || '');
  const [typeFilter, setTypeFilter] = useState(initialFilters.type || '');
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'newest');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'rent', label: 'For Rent' },
    { value: 'sell', label: 'For Sale' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'price_low', label: 'Price: Low to High' },
  ];

  const totalActiveFilters = (statusFilter ? 1 : 0) + (typeFilter ? 1 : 0);

  const handleFilterChange = () => {
    onFilterChange({ status: statusFilter, type: typeFilter, sortBy });
  };

  const clearAllFilters = () => {
    setStatusFilter('');
    setTypeFilter('');
    setSortBy('newest');
    if (onClearFilters) onClearFilters();
    onFilterChange({ status: '', type: '', sortBy: 'newest' });
  };

  useEffect(() => {
    const timer = setTimeout(handleFilterChange, 300);
    return () => clearTimeout(timer);
  }, [statusFilter, typeFilter, sortBy]);

  return (
    <>
      <div className="lg:hidden mb-4">
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-orange" />
            <span className="text-sm font-medium">Filters</span>
            {totalActiveFilters > 0 && <span className="px-2 py-0.5 text-xs rounded-full bg-orange text-white">{totalActiveFilters}</span>}
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"} />
          </svg>
        </button>
      </div>

      <div className={`${isMobileOpen ? 'block' : 'hidden'} lg:block bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6`}>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange">
              {statusOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange">
              {typeOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="flex-1 min-w-[160px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange">
              {sortOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          {totalActiveFilters > 0 && (
            <div className="flex items-end">
              <button onClick={clearAllFilters} className="flex items-center gap-1 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50">
                <X className="w-4 h-4" /> Clear ({totalActiveFilters})
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}