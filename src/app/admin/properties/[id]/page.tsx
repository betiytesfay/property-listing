'use client';

import { useParams, useRouter } from 'next/navigation';
import { properties } from '../../../../data/dummyProperties';
import { ArrowLeft, CheckCircle, XCircle, MapPin, DollarSign, Tag, Building } from 'lucide-react';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const property = properties.find(p => p.property_id === id);

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
              <p className="text-gray-500">{property.address}</p>
            </div>
            {/* ✅ is_active instead of adminStatus */}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${property.is_active
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
              }`}>
              {property.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* ✅ media_urls instead of images */}
            {property.media_urls && property.media_urls.length > 0 ? (
              <img
                src={property.media_urls[0]}
                alt={property.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            ) : (
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <p className="text-gray-400">No Image Available</p>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {/* ✅ Details — removed bedrooms/bathrooms/area (not in backend) */}
            <div className="border border-gray-200 rounded-2xl p-5">
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <Building className="w-5 h-5 text-gray-400" />
                  <span>{property.category}</span>
                </div>
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <span>{property.listing_type === 'FOR_RENT' ? 'For Rent' : 'For Sale'}</span>
                </div>
                <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-2 bg-gray-50">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <span>{property.listing_fee_paid ? 'Fee Paid' : 'Fee Unpaid'}</span>
                </div>
              </div>
            </div>

            {/* ✅ Additional media images */}
            {property.media_urls && property.media_urls.length > 1 && (
              <div className="border border-gray-200 rounded-2xl p-5">
                <h2 className="text-lg font-semibold mb-2">More Photos</h2>
                <div className="grid grid-cols-3 gap-2">
                  {property.media_urls.slice(1).map((url, i) => (
                    <img key={i} src={url} alt={`Photo ${i + 2}`} className="w-full h-24 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* ✅ price is a string now */}
            <div className="bg-orange/10 rounded-lg p-4">
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-2xl font-bold text-orange">
                ${Number(property.price).toLocaleString()}
                {property.listing_type === 'FOR_RENT' && <span className="text-sm">/month</span>}
              </p>
            </div>

            {/* ✅ address instead of city/subCity/neighborhood */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location
              </h3>
              <p className="text-gray-600">{property.address}</p>
              <p className="text-gray-500 text-sm mt-1">
                {property.latitude}, {property.longitude}
              </p>
            </div>

            {/* ✅ owner_id instead of contact */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Owner Info</h3>
              <p className="text-sm text-gray-600">Owner ID: {property.owner_id}</p>
              <p className="text-sm text-gray-500 mt-1">
                Listed: {new Date(property.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* ✅ is_active instead of adminStatus */}
            {!property.is_active && (
              <div className="flex gap-3">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Activate
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 flex items-center justify-center gap-2">
                  <XCircle className="w-4 h-4" /> Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}