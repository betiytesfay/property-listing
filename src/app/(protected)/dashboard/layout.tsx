// src/app/(protected)/dashboard/layout.tsx

import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="flex justify-center py-12">Loading...</div>}>
      {children}
    </Suspense>
  );
}