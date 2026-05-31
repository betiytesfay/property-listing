// src/app/admin/properties/add/page.tsx

'use client';

import { useForm, useController } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import usePropertyStore from '../../../../store/adminPropertyStore';

const propertySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().min(1, 'Price is required'),
  address: z.string().min(3, 'Address is required'),
  latitude: z.string().default(''),
  longitude: z.string().default(''),
  category: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL']),
  listing_type: z.enum(['FOR_SALE', 'FOR_RENT']),
  media_urls: z.array(z.string()).default([]),
  listing_fee_paid: z.boolean().default(false),
  is_active: z.boolean().default(true),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function AddProperty() {
  const router = useRouter();
  const { addProperty, isLoading } = usePropertyStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      category: 'RESIDENTIAL',
      listing_type: 'FOR_SALE',
      listing_fee_paid: false,
      is_active: true,
      media_urls: [],
      latitude: '',
      longitude: '',
    },
  });

  const { field: mediaUrlsField } = useController({
    name: 'media_urls',
    control,
  });

  // Fix: Make sure this returns Promise<void> or void
  const onSubmit = async (data: PropertyFormData): Promise<void> => {
    try {
      await addProperty(data);
      router.push('/admin/properties');
    } catch (error) {
      console.error('Failed to add property:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Property</h1>

      {/* Fix: Explicitly type the onSubmit handler */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (ETB)</label>
            <input
              type="text"
              {...register('price')}
              placeholder="e.g. 15000"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              {...register('address')}
              placeholder="e.g. Bole, Addis Ababa"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Latitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input
              {...register('latitude')}
              placeholder="e.g. 9.0054"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input
              {...register('longitude')}
              placeholder="e.g. 38.7636"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="LAND">Land</option>
              <option value="INDUSTRIAL">Industrial</option>
            </select>
          </div>

          {/* Listing Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
            <select
              {...register('listing_type')}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="FOR_SALE">For Sale</option>
              <option value="FOR_RENT">For Rent</option>
            </select>
          </div>

          {/* Media URLs */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Media URLs <span className="text-gray-400 text-xs">(comma separated)</span>
            </label>
            <input
              type="text"
              placeholder="https://image1.jpg, https://image2.jpg"
              onChange={(e) => {
                const urls = e.target.value
                  .split(',')
                  .map(url => url.trim())
                  .filter(Boolean);
                mediaUrlsField.onChange(urls);
              }}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {mediaUrlsField.value.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {mediaUrlsField.value.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`preview ${i}`}
                    className="w-16 h-16 object-cover rounded-lg border"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Listing Fee Paid */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('listing_fee_paid')}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Listing Fee Paid</label>
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('is_active')}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Active Listing</label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );
}