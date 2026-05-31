'use client';

import { Property } from '../../types/propertyTypes';
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

  const formatPrice = (price: string, listing_type: string) => {
    const numPrice = parseFloat(price);
    if (listing_type === 'FOR_RENT') return `${numPrice.toLocaleString()} ETB/month`;
    return `${numPrice.toLocaleString()} ETB`;
  };


  const getAdminStatus = (is_active: boolean) => {
    return is_active ? 'approved' : 'pending';
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
            <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Owner</th>
            {showActions && <th className="text-left px-6 py-3 text-xs font-medium text-gray-500">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {properties.map((property) => (

            <tr key={property.property_id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <p className="text-sm font-medium text-gray-800">{property.title}</p>

                <p className="text-xs text-gray-400">{property.category}</p>
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">{property.address}</td>
              <td className="px-6 py-4">

                <p className="text-sm font-semibold text-gray-800">{formatPrice(property.price, property.listing_type)}</p>
              </td>
              <td className="px-6 py-4">

                <StatusBadge status={getAdminStatus(property.is_active)} />
              </td>

              <td className="px-6 py-4 text-sm text-gray-600">{property.owner_id.slice(0, 8)}...</td>
              {showActions && (
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">

                    {onView && <button onClick={() => onView(property.property_id)} className="p-1 rounded hover:bg-gray-100"><Eye className="w-5 h-5 text-gray-400" /></button>}

                    {!property.is_active && (
                      <>
                        {onApprove && <button onClick={() => onApprove(property.property_id)} className="p-1 rounded hover:bg-green-50"><CheckCircle className="w-5 h-5 text-green-500" /></button>}
                        {onReject && <button onClick={() => onReject(property.property_id)} className="p-1 rounded hover:bg-red-50"><XCircle className="w-5 h-5 text-red-500" /></button>}
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