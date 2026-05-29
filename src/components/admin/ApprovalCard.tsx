'use client';

import { Property } from '../../types';
import { CheckCircle, XCircle, MapPin, DollarSign } from 'lucide-react';

interface ApprovalCardProps {
  property: Property;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ApprovalCard({ property, onApprove, onReject }: ApprovalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
          Image
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{property.title}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {property.city}, {property.subCity}</p>
          <p className="text-sm text-gray-600 mt-1">{property.shortDescription}</p>
          <div className="flex items-center gap-4 mt-2">
            <p className="text-sm font-semibold text-orange flex items-center gap-1"><DollarSign className="w-3 h-3" /> {property.price.toLocaleString()}{property.status === 'rent' && '/month'}</p>
            <p className="text-xs text-gray-400">Seller: {property.sellerName}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={() => onApprove(property.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
            <CheckCircle className="w-4 h-4" /> Approve
          </button>
          <button onClick={() => onReject(property.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
            <XCircle className="w-4 h-4" /> Reject
          </button>
        </div>
      </div>
    </div>
  );
}