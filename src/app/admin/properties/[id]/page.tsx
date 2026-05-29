'use client';

import { useParams, useRouter } from 'next/navigation';
import { properties } from '../../../../data/dummyProperties';
import StatusBadge from '../../../../components/admin/StatusBadge';
import { ArrowLeft, CheckCircle, XCircle, MapPin, Bed, Bath, Square, DollarSign, User, Phone, Mail } from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Property not found</p>
        <button onClick={() => router.back()} className="mt-4 text-orange hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-orange mb-6">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
              <p className="text-gray-500">{property.shortDescription}</p>
            </div>
            <StatusBadge status={property.adminStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Images */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-400">Property Image Placeholder</p>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* Details */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <Bed className="w-5 h-5 text-gray-400" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <Bath className="w-5 h-5 text-gray-400" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <Square className="w-5 h-5 text-gray-400" />
                  <span>{property.area} m²</span>
                </div>
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span>{property.furnished ? 'Furnished' : 'Unfurnished'}</span>
                </div>
              </div>
            </div>

            {/* Equipment */}
            {property.equipment && property.equipment.length > 0 && (
              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-lg font-semibold mb-2">Equipment</h2>
                <div className="flex flex-wrap gap-2">
                  {property.equipment.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price */}
            <div className="bg-orange/10 rounded-lg p-4">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-orange">${property.price.toLocaleString()}{property.status === 'rent' && <span className="text-sm">/month</span>}</p>
            </div>

            {/* Location */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</h3>
              <p className="text-gray-600">{property.city}, {property.subCity}</p>
              <p className="text-gray-500 text-sm">{property.neighborhood}</p>
            </div>

            {/* Contact */}
            {property.contact && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Contact Seller</h3>
                {property.contact.name && <p className="flex items-center gap-2 text-sm mb-1"><User className="w-4 h-4" /> {property.contact.name}</p>}
                {property.contact.phone && <p className="flex items-center gap-2 text-sm mb-1"><Phone className="w-4 h-4" /> {property.contact.phone}</p>}
                {property.contact.email && <p className="flex items-center gap-2 text-sm"><Mail className="w-4 h-4" /> {property.contact.email}</p>}
              </div>
            )}

            {/* Actions */}
            {property.adminStatus === 'pending' && (
              <div className="flex gap-3">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4" /> Approve</button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2"><XCircle className="w-4 h-4" /> Reject</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}