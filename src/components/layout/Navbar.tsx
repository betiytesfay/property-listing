"use client";

import Link from "next/link";
import {
  Bell,
  ChevronDown,
  Heart,
  Menu,
} from "lucide-react";

const navigation = [
  {
    label: "Buy",
    href: "/buy",
    submenu: [
      { label: "Apartments", href: "/buy/apartments" },
      { label: "Houses", href: "/buy/houses" },
      { label: "Villas", href: "/buy/villas" },
      { label: "Commercial", href: "/buy/commercial" },
    ],
  },
  {
    label: "Rent",
    href: "/rent",
    submenu: [
      { label: "Apartments", href: "/rent/apartments" },
      { label: "Houses", href: "/rent/houses" },
      { label: "Studios", href: "/rent/studios" },
    ],
  },
  {
    label: "Commercial",
    href: "/commercial",
    submenu: [
      { label: "Offices", href: "/commercial/offices" },
      { label: "Shops", href: "/commercial/shops" },
      { label: "Warehouses", href: "/commercial/warehouses" },
    ],
  },
  {
    label: "Agents",
    href: "/agents",
    submenu: [
      { label: "Find Agents", href: "/agents/find" },
      { label: "Top Rated", href: "/agents/top-rated" },
      { label: "Become Agent", href: "/agents/join" },
    ],
  },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LEFT */}
        <div className="flex items-center">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            Property<span className="text-amber-400">Hub</span>
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className="hidden items-center gap-10 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="group relative"
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className="transition duration-200 group-hover:rotate-180"
                />
              </Link>

              {/* DROPDOWN */}
              <div className="invisible absolute left-1/2 top-10 z-50 w-56 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:top-12 group-hover:opacity-100">
                <div className="flex flex-col gap-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/favorites" aria-label="Favorites" className="relative flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            <Heart size={18} />
          </Link>

          <Link
            href="/login"
            className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Login
          </Link>
        </div>

        {/* MOBILE */}
        <button
          title="Open Menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}