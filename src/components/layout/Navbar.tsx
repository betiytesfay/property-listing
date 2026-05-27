"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Heart, LogOut, Menu, User, Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/src/components/ui/Button";
import { AUTH_ROUTES } from "@/src/features/auth/constants/routes";
import { useAuth } from "@/src/features/auth/hooks/use-auth";
import { getDashboardPathForRole } from "@/src/features/auth/utils/redirect";

const navigation = [
  {
    label: "Property",
    href: "/property",
    submenu: [
      { label: "Buy Property", href: "/buy/property" },
      { label: "Rent Property", href: "/rent/property" },
      { label: "Sell Property", href: "/sell/property" },
    ],
  },
  {
    label: "Vehicles",
    href: "/vehicles",
    submenu: [
      { label: "Buy Vehicles", href: "/buy/vehicles" },
      { label: "Rent Vehicles", href: "/rent/vehicles" },
      { label: "Sell Vehicles", href: "/sell/vehicles" },
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
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

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
        
        
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
          >
            Habesha<span className="text-amber-400">Hub</span>
          </Link>
        </div>

        {/* CENTER: NAVIGATION */}
        <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
              >
                {item.label}
                <ChevronDown size={14} className="transition duration-200 group-hover:rotate-180" />
              </Link>

              <div className="invisible absolute left-1/2 top-10 z-50 w-48 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:top-8 group-hover:opacity-100">
                <div className="flex flex-col">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          
          <div  className={`relative flex items-center transition-all duration-300 ease-in-out ${
   showSearch 
      ? 'w-40 sm:w-56' 
      : 'w-11'
  }`}
>
  <input
    ref={searchInputRef}
    type="text"
    placeholder="Search..."
    className={`h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white ${
      showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  />
  <button
    onClick={() => setShowSearch(!showSearch)}
    className="absolute left-0 flex h-11 w-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
  >
    {showSearch ? <X size={18} /> : <Search size={18} />}
  </button>
</div>

          {/* Favorites */}
          {/* <Link
            href="/favorites"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 sm:flex"
          >
            <Heart size={18} />
          </Link> */}

          {/* AUTH */}
          <div className="hidden lg:flex items-center gap-3">
            {!hasMounted || !isHydrated ? (
              <span className="h-11 w-20" />
            ) : isAuthenticated && user ? (
              <>
                <Link
                  href={getDashboardPathForRole(user.role)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <User size={16} />
                  <span className="max-w-[100px] truncate">{user.email.split("@")[0]}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => void handleLogout()}
                  isLoading={isLoggingOut || isLoading}
                >
                  <LogOut size={16} />
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
                  style={{ backgroundColor: 'var(--auth-secondary-soft)' }}
                  className="rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}