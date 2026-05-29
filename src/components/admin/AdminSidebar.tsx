'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Clock,
  Users,
  ShoppingBag,
  CreditCard,
  HelpCircle
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
      {/* Mobile backdrop */}
      {!sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative z-30 h-full w-64 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        style={{ backgroundColor: '#1e3a5f' }}
      >
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(249, 115, 22, 0.2)' }}>
          <h1 className="text-2xl font-bold text-white">
            <span className="text-orange">Property</span>Admin
          </h1>
          <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Manage your listings
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                    ? 'bg-orange text-white'
                    : 'text-gray-300 hover:bg-orange/20 hover:text-white'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Help section */}
        <div className="absolute bottom-6 left-0 right-0 px-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
            <HelpCircle className="w-5 h-5 text-orange mb-2" />
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Need help?</p>
            <p className="text-sm text-white mt-1">Contact support</p>
          </div>
        </div>
      </div>
    </>
  );
}