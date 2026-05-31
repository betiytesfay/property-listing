'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Home,
  Clock,
  Users,
  ShoppingBag,
  CreditCard,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Properties', href: '/admin/properties', icon: Home },
    { name: 'Pending Approval', href: '/admin/properties/pending', icon: Clock },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile menu button - only visible on mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#1e3a5f] text-white shadow-lg hover:bg-[#1e3a5f]/90 transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 lg:hidden ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-50 h-full w-64 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        style={{ backgroundColor: '#1e3a5f' }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(249, 115, 22, 0.2)' }}>
          <h1 className="text-2xl font-bold text-white">
            <span className="text-orange-500">Property</span>Admin
          </h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Manage your listings
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)} // Close sidebar on mobile when clicking a link
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-300 hover:bg-orange-500/20 hover:text-white'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Help section */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div
            className="p-4 rounded-lg transition-all hover:scale-[1.02] cursor-pointer"
            style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)' }}
          >
            <HelpCircle className="w-5 h-5 text-orange-500 mb-2" />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Need help?</p>
            <p className="text-sm text-white mt-1">Contact support</p>
          </div>
        </div>
      </div>
    </>
  );
}