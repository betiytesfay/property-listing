'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/src/components/admin/AdminSidebar';
import AdminHeader from '@/src/components/admin/AdminHeader';
import { useAuthStore } from '@/src/features/auth/store/auth-store';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ SINGLE clean auth hook (important fix)
  const { user, accessToken, isHydrated } = useAuthStore();

  // mobile handling
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ WAIT until auth is fully restored (CRITICAL FIX)
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-600 border-t-transparent" />
      </div>
    );
  }

  // ✅ only block AFTER hydration is done
  if (!accessToken || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-600">Checking session...</p>
        </div>
      </div>
    );
  }

  const adminUser = {
    name: user.fullName || user.email?.split('@')[0] || 'Admin User',
    email: user.email || 'admin@example.com'
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <AdminHeader
          user={adminUser}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}