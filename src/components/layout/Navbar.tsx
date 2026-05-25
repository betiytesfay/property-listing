"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Heart, LogOut, Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/Button";
import {
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "@/src/features/auth/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/use-auth";
import { SearchModal } from "@/src/components/ui/SearchModal";

const navigation = [
  {
    label: "Buy",
    href: "/buy",
    submenu: [
      {
        label: "🏠 Property",
        href: "/buy/property",
        subSubmenu: [
          { label: "Apartments", href: "/buy/property/apartments" },
          { label: "Houses", href: "/buy/property/houses" },
          { label: "Villas", href: "/buy/property/villas" },
          { label: "Commercial", href: "/buy/property/commercial" },
        ],
      },
      {
        label: "🚗 Vehicles",
        href: "/buy/vehicles",
        subSubmenu: [
          { label: "Cars", href: "/buy/vehicles/cars" },
          { label: "SUVs", href: "/buy/vehicles/suvs" },
          { label: "Trucks", href: "/buy/vehicles/trucks" },
        ],
      },
    ],
  },

  {
    label: "Rent",
    href: "/rent",
    submenu: [
      {
        label: "🏠 Property",
        href: "/rent/property",
        subSubmenu: [
          { label: "Apartments", href: "/rent/property/apartments" },
          { label: "Houses", href: "/rent/property/houses" },
          { label: "Villas", href: "/rent/property/villas" },
        ],
      },
      {
        label: "🚗 Vehicles",
        href: "/rent/vehicles",
        subSubmenu: [
          { label: "Cars", href: "/rent/vehicles/cars" },
          { label: "SUVs", href: "/rent/vehicles/suvs" },
        ],
      },
    ],
  },

  {
    label: "Sell",
    href: "/sell",
    submenu: [
      {
        label: "🏠 Property",
        href: "/sell/property",
        subSubmenu: [
          { label: "Apartments", href: "/sell/property/apartments" },
          { label: "Houses", href: "/sell/property/houses" },
          { label: "Villas", href: "/sell/property/villas" },
        ],
      },
      {
        label: "🚗 Vehicles",
        href: "/sell/vehicles",
        subSubmenu: [
          { label: "Cars", href: "/sell/vehicles/cars" },
          { label: "SUVs", href: "/sell/vehicles/suvs" },
        ],
      },
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
  const router = useRouter();
  const { user, isAuthenticated, isHydrated, logout, isLoading } = useAuth();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      router.replace("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LEFT: LOGO */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
        >
          Habesha<span className="text-amber-400">Hub</span>
        </Link>





        {/* NAVIGATION */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <div key={item.label} className="group relative">
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

        {/* RIGHT SIDE */}
        <div className="hidden items-center gap-3 lg:flex">

          {/* Favorites */}
          <Link
            href="/favorites"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            <Heart size={18} />
          </Link>

          {/* AUTH */}
          {!hasMounted || !isHydrated ? (
            <span className="h-11 w-40" />
          ) : isAuthenticated && user ? (
            <>
              <Link
                href={DEFAULT_LOGIN_REDIRECT}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <User size={16} />
                <span className="max-w-[120px] truncate">
                  {user.email.split("@")[0]}
                </span>
              </Link>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void handleLogout()}
                isLoading={isLoggingOut || isLoading}
                icon={<LogOut size={16} />}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href={AUTH_ROUTES.login}
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                href={AUTH_ROUTES.register}
                className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden"
        >
          <Menu size={20} />
        </button>

      </div>
    </header>
  );
}