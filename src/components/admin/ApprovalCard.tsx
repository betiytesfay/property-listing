'use client';

import { Property } from '../../types/propertyTypes';
import { CheckCircle, XCircle, MapPin, DollarSign } from 'lucide-react';

interface ApprovalCardProps {
  property: Property;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ApprovalCard({ property, onApprove, onReject }: ApprovalCardProps) {
  // Helper function to format price
  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString();
  };

  // Helper to get listing type label
  const getListingTypeLabel = (type: string) => {
    return type === 'FOR_RENT' ? '/month' : '';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Property Image */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          {property.media_urls?.[0] ? (
            <img
              src={property.media_urls[0]}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            'No Image'
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{property.title}</h3>

          {/* ✅ Changed: use address instead of city/subCity */}
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="w-3 h-3" /> {property.address}
          </p>

          {/* ✅ Changed: use description instead of shortDescription */}
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{property.description}</p>

          <div className="flex items-center gap-4 mt-2">
            {/* ✅ Fixed: price is string, need to parse; status is listing_type */}
            <p className="text-sm font-semibold text-orange flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {formatPrice(property.price)} ETB
              {getListingTypeLabel(property.listing_type)}
            </p>

            {/* ✅ Changed: sellerName doesn't exist, show owner_id or remove */}
            <p className="text-xs text-gray-400">Owner ID: {property.owner_id.slice(0, 8)}...</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => onApprove(property.property_id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
          >
            <CheckCircle className="w-4 h-4" /> Approve
          </button>
          <button
            onClick={() => onReject(property.property_id)}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
          >
            <XCircle className="w-4 h-4" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}