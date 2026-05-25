'use client';

import { useState } from 'react';
import PropertyTable from '../../../components/admin/PropertyTable';
import FilterBar from '../../../components/admin/FilterBar';
import { properties } from '../../../data/dummyProperties';
import { Property } from '../../../types';

export default function PropertiesPage() {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);

  const handleFilterChange = (filters: any) => {
    let filtered = [...properties];

    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(p => p.adminStatus === filters.status);
    }
    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(p => p.status === filters.type);
    }
    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (filters.sortBy === 'price_high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'price_low') {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProperties(filtered);
  };

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