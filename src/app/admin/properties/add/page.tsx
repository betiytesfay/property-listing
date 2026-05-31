'use client';
import nextDynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the actual component with SSR disabled
const AddPropertyForm = nextDynamic(
  () => import('./AddPropertyForm'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading form...</div>
      </div>
    )
  }
);

export const dynamic = 'force-dynamic';

export default function AdminAddPropertyPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
      <AddPropertyForm />
    </Suspense>
  );
}