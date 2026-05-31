'use client'

import { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import { useAuth } from '@/src/features/auth/hooks/use-auth'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isHydrated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  if (!isHydrated) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-sm font-medium text-gray-600">Loading admin dashboard…</p>
      </div>
    )
  }

  const demoUser = {
    name: 'Admin User',
    email: 'admin@test.com',
  }

  const useDemo = !isAuthenticated || !user
  const displayUser = user
    ? { name: user.fullName ?? user.email, email: user.email }
    : demoUser

  if (!isAuthenticated && !user) {
    return (
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* ✅ Fixed: Added sidebarOpen and setSidebarOpen props */}
          <AdminHeader
            user={displayUser}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 overflow-y-auto p-6">
            <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              Demo admin mode: backend authentication is unavailable, so this preview uses a dummy admin account.
            </div>
            {children}
          </main>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user || user.role !== 'ADMIN') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 px-4 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Access denied</h1>
          <p className="mt-2 text-sm text-gray-600">
            You must sign in with an admin account to access this section.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ✅ Fixed: Added sidebarOpen and setSidebarOpen props */}
        <AdminHeader
          user={{
            name: user.fullName ?? user.email,
            email: user.email,
          }}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}