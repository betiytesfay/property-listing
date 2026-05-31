'use client'

import { Bell, User, Menu, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/src/features/auth/store/auth-store'

interface User {
  name: string
  email: string
}

interface AdminHeaderProps {
  user: User
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function AdminHeader({
  user,
  sidebarOpen,
  setSidebarOpen,
}: AdminHeaderProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">

          {/* LEFT */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>

            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Welcome back, {user.name}
            </h2>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4 relative">

            {/* Notification */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* USER DROPDOWN */}
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-full"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md overflow-hidden">

                  <div className="px-4 py-2 text-sm text-gray-600 border-b">
                    {user.email}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </header>
  )
}