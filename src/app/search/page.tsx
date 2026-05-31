// src/app/search/page.tsx

import { Suspense } from 'react';
import SearchContent from './searchContent';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-12">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}