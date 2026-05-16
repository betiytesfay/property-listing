import Link from "next/link";
import { Menu } from "lucide-react";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-black tracking-tight text-slate-900">
            Habesha<span className="text-[#1a365d]">Property</span>
          </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
            Listings
          </Link>
          <Link href="/browse" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
            Browse
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-[#002045] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a365d]"
          >
            Create account
          </Link>
        </nav>
        <button title="Menu" className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-100 md:hidden">
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
