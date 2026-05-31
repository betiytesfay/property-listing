'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Make all fields required in the schema
const propertySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND', 'INDUSTRIAL']),
  listing_type: z.enum(['FOR_SALE', 'FOR_RENT']),
  price: z.string().min(1, 'Price is required'),
  address: z.string().min(1, 'Address is required'),
  latitude: z.string().min(1, 'Latitude is required'),
  longitude: z.string().min(1, 'Longitude is required'),
  media_urls: z.array(z.string()).min(0),
  listing_fee_paid: z.boolean(),
  is_active: z.boolean(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export default function AddPropertyForm() {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      category: 'RESIDENTIAL',
      listing_type: 'FOR_SALE',
      price: '',
      address: '',
      latitude: '',
      longitude: '',
      media_urls: [],
      listing_fee_paid: false,
      is_active: true,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: PropertyFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to add property');

      router.push('/admin/properties');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add property');
    } finally {
      setIsLoading(false);
    }
  };

  const mediaUrls = watch('media_urls');
  const [newMediaUrl, setNewMediaUrl] = useState('');

  const addMediaUrl = () => {
    if (newMediaUrl && newMediaUrl.trim()) {
      setValue('media_urls', [...mediaUrls, newMediaUrl]);
      setNewMediaUrl('');
    }
  };

  const removeMediaUrl = (index: number) => {
    const newUrls = [...mediaUrls];
    newUrls.splice(index, 1);
    setValue('media_urls', newUrls);
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input {...register('title')} className="w-full border p-2 rounded" />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea {...register('description')} rows={4} className="w-full border p-2 rounded" />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Category</label>
            <select {...register('category')} className="w-full border p-2 rounded">
              <option value="RESIDENTIAL">Residential</option>
              <option value="COMMERCIAL">Commercial</option>
              <option value="LAND">Land</option>
              <option value="INDUSTRIAL">Industrial</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Listing Type</label>
            <select {...register('listing_type')} className="w-full border p-2 rounded">
              <option value="FOR_SALE">For Sale</option>
              <option value="FOR_RENT">For Rent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Price</label>
            <input {...register('price')} type="number" className="w-full border p-2 rounded" />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>

          <div>
            <label className="block mb-2">Address</label>
            <input {...register('address')} className="w-full border p-2 rounded" />
            {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Latitude</label>
            <input {...register('latitude')} className="w-full border p-2 rounded" />
            {errors.latitude && <p className="text-red-500 text-sm">{errors.latitude.message}</p>}
          </div>

          <div>
            <label className="block mb-2">Longitude</label>
            <input {...register('longitude')} className="w-full border p-2 rounded" />
            {errors.longitude && <p className="text-red-500 text-sm">{errors.longitude.message}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-2">Media URLs</label>
          <div className="flex gap-2">
            <input
              value={newMediaUrl}
              onChange={(e) => setNewMediaUrl(e.target.value)}
              className="flex-1 border p-2 rounded"
              placeholder="Enter image URL"
            />
            <button type="button" onClick={addMediaUrl} className="bg-blue-500 text-white px-4 rounded">
              Add
            </button>
          </div>
          {mediaUrls.map((url, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input value={url} readOnly className="flex-1 border p-2 rounded bg-gray-100" />
              <button type="button" onClick={() => removeMediaUrl(index)} className="bg-red-500 text-white px-4 rounded">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('listing_fee_paid')} />
            Listing Fee Paid
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('is_active')} />
            Active Listing
          </label>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={isLoading} className="bg-green-500 text-white px-6 py-2 rounded">
            {isLoading ? 'Adding...' : 'Add Property'}
          </button>
          <button type="button" onClick={() => router.back()} className="bg-gray-500 text-white px-6 py-2 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}