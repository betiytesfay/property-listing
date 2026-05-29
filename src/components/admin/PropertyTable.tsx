'use client';

import { Property } from '../../types';
import StatusBadge from './StatusBadge';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

interface PropertyTableProps {
  properties: Property[];
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onView?: (id: string) => void;
  showActions?: boolean;
}

export default function PropertyTable({ properties, onApprove, onReject, onView, showActions = true }: PropertyTableProps) {
  const formatPrice = (price: number, status: string) => {
    if (status === 'rent') return `$${price.toLocaleString()}/month`;
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Property</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Location</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Price</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Status</th>
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Seller</th>
            {showActions && <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {properties.map((property) => (
            <tr key={property.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-800">{property.title}</p>
                <p className="text-xs text-gray-400">{property.bedrooms} bed • {property.area} m²</p>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{property.city}</td>
              <td className="px-6 py-4">
                <p className="text-sm font-semibold text-gray-800">{formatPrice(property.price, property.status)}</p>
              </td>
              <td className="px-6 py-4"><StatusBadge status={property.adminStatus} /></td>
              <td className="px-6 py-4 text-sm text-gray-600">{property.sellerName}</td>
              {showActions && (
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {onView && <button onClick={() => onView(property.id)} className="p-1 rounded hover:bg-gray-100"><Eye className="w-5 h-5 text-gray-400" /></button>}
                    {property.adminStatus === 'pending' && (
                      <>
                        {onApprove && <button onClick={() => onApprove(property.id)} className="p-1 rounded hover:bg-green-50"><CheckCircle className="w-5 h-5 text-green-500" /></button>}
                        {onReject && <button onClick={() => onReject(property.id)} className="p-1 rounded hover:bg-red-50"><XCircle className="w-5 h-5 text-red-500" /></button>}
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}