'use client';

import { useState, useEffect } from 'react';
import PropertyTable from '../../../../components/admin/PropertyTable';
import usePropertyStore from '@/src/store/adminPropertyStore';
import { Property } from '../../../../types';
import { CheckCircle, XCircle } from 'lucide-react';

export default function PendingPropertiesPage() {
  const { properties, isLoading, fetchProperties } = usePropertyStore();
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    const pending = properties.filter(p => p.adminStatus === 'pending');
    setPendingProperties(pending);
  }, [properties]);

  const handleApprove = (id: string) => {
    // TODO: Connect to your API endpoint
    // await fetch(`/api/admin/properties/${id}/approve`, { method: 'POST' })
    setPendingProperties(prev => prev.filter(p => p.id !== id));
    alert(`Property ${id} approved!`);
  };

  const handleReject = (id: string) => {
    // TODO: Connect to your API endpoint
    // await fetch(`/api/admin/properties/${id}/reject`, { method: 'POST' })
    setPendingProperties(prev => prev.filter(p => p.id !== id));
    alert(`Property ${id} rejected!`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-sm text-gray-500">Loading pending properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Pending Approvals</h1>
        <p className="text-sm text-gray-500">Review properties waiting for approval ({pendingProperties.length} items)</p>
      </div>

      {pendingProperties.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">All caught up!</h2>
          <p className="text-gray-500">No properties pending approval</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Property</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Location</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Price</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Seller</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pendingProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{property.title}</p>
                      <p className="text-xs text-gray-400">{property.bedrooms} bed • {property.area} m²</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{property.city}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold">${property.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">{property.status === 'rent' ? '/month' : ''}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${property.status === 'rent' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {property.status === 'rent' ? 'For Rent' : 'For Sale'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{property.sellerName}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleApprove(property.id)} className="p-1 rounded hover:bg-green-50">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </button>
                        <button onClick={() => handleReject(property.id)} className="p-1 rounded hover:bg-red-50">
                          <XCircle className="w-5 h-5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}