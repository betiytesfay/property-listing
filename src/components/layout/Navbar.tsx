"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, Menu, User, Search, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  // Track which mobile accordion sections are open
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setMobileOpen(false);
      router.replace("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setOpenSections({});
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl"
            >
              Habesha<span className="text-amber-400">Hub</span>
            </Link>
          </div>

          {/* CENTER: DESKTOP NAVIGATION */}
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

          {/* RIGHT: SEARCH + AUTH + MOBILE TOGGLE */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div
              className={`relative flex items-center transition-all duration-300 ease-in-out ${
                showSearch ? "w-40 sm:w-56" : "w-11"
              }`}
            >
              <div className="flex items-center w-full relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Toggle Search"
                >
                  {showSearch ? <X size={18} /> : <Search size={18} />}
                </button>

                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  className={`h-11 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-amber-400 focus:bg-white ${
                    showSearch ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
              </div>
            </div>

            {/* Desktop Auth */}
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
                    style={{ backgroundColor: "var(--auth-secondary-soft)" }}
                    className="rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 lg:hidden"
              title="Open Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ────────────────────────────────────────────── */}

      {/* Backdrop */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[300px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-5">
          <Link
            href="/"
            onClick={closeMobile}
            className="text-xl font-black tracking-tight text-slate-900"
          >
            Habesha<span className="text-amber-400">Hub</span>
          </Link>
          <button
            title="Close Menu"
            onClick={closeMobile}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Nav — scrollable */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navigation.map((item) => {
            const isOpen = openSections[item.label] ?? false;
            return (
              <div key={item.label} className="rounded-2xl overflow-hidden">
                {/* Section Toggle */}
                <button
                  onClick={() => toggleSection(item.label)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Submenu — accordion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="mx-2 mb-2 rounded-xl bg-slate-50 py-1">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={closeMobile}
                        className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm transition-all"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Drawer Footer — Auth */}
        <div className="border-t border-slate-100 px-4 py-5 space-y-3">
          {!hasMounted || !isHydrated ? null : isAuthenticated && user ? (
            <>
              <Link
                href={getDashboardPathForRole(user.role)}
                onClick={closeMobile}
                className="flex items-center gap-2 w-full rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <User size={16} />
                <span className="truncate">{user.email.split("@")[0]}</span>
              </Link>
              <button
                onClick={() => void handleLogout()}
                disabled={isLoggingOut || isLoading}
                className="flex items-center justify-center gap-2 w-full rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                <LogOut size={16} />
                {isLoggingOut ? "Logging out…" : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link
                href={AUTH_ROUTES.login}
                onClick={closeMobile}
                className="block w-full rounded-full border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href={AUTH_ROUTES.register}
                onClick={closeMobile}
              
                className="block w-full rounded-full px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-amber-600 "
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}