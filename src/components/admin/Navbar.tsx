'use client';

import { useState } from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg flex-1 max-w-md bg-gray-50">
            <Search className="w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search properties, customers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-sm w-full" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-orange rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center text-white font-bold">JD</div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
          </div>
        </div>
      </div>

      <div className="md:hidden px-6 pb-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none text-sm w-full" />
        </div>
      </div>
    </header>
  );
}