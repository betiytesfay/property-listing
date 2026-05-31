'use client';

import { useState, useEffect } from 'react';
import PropertyTable from '../../../components/admin/PropertyTable';
import FilterBar from '../../../components/admin/FilterBar';
import usePropertyStore from '@/src/store/adminPropertyStore';

export default function PropertiesPage() {
  const { properties, isLoading, fetchProperties } = usePropertyStore();
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  const handleFilterChange = (filters: any) => {
    let filtered = [...properties];

    // Filter by status (is_active)
    if (filters.status && filters.status !== 'all') {
      const isActive = filters.status === 'approved';
      filtered = filtered.filter(p => p.is_active === isActive);
    }

    // Filter by listing type
    if (filters.type && filters.type !== 'all') {
      const listingType = filters.type === 'sale' ? 'FOR_SALE' : 'FOR_RENT';
      filtered = filtered.filter(p => p.listing_type === listingType);
    }

    // Sort by date (with safe handling for undefined created_at)
    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => {
        if (!a.created_at && !b.created_at) return 0;
        if (!a.created_at) return 1;
        if (!b.created_at) return -1;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    } else if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => {
        if (!a.created_at && !b.created_at) return 0;
        if (!a.created_at) return 1;
        if (!b.created_at) return -1;
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
    } else if (filters.sortBy === 'price_high') {
      filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (filters.sortBy === 'price_low') {
      filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    setFilteredProperties(filtered);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">All Properties</h1>
        <p className="text-sm text-gray-500">Manage all property listings</p>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Properties ({filteredProperties.length})</h2>
        </div>
        <PropertyTable properties={filteredProperties} showActions={true} />
      </div>
    </div>
  );
}