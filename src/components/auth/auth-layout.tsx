import Link from "next/link";
import type { ReactNode } from "react";
import { BrandPanel, type BrandPanelVariant } from "@/src/components/auth/brand-panel";
import { BRAND_NAME, BRAND_SHORT } from "@/src/lib/auth-constants";

interface AuthLayoutProps {
  children: ReactNode;
  variant: BrandPanelVariant;
}

const MOBILE_COPY: Record<BrandPanelVariant, { headline: string; subline: string }> = {
  login: {
    headline: "Welcome back to Ethiopia's premium property marketplace.",
    subline: "Sign in to manage saved listings, inquiries, and your seller dashboard.",
  },
  register: {
    headline: "Partner with the best in Ethiopia.",
    subline: "Create your account to start listing properties.",
  },
  adminRegister: {
    headline: "Admin Access Required",
    subline: "Please authenticate with your administrator credentials.",
  },
};

export function AuthLayout({ children, variant }: AuthLayoutProps) {
  const mobile = MOBILE_COPY[variant];

  return (
    <div className="flex min-h-screen flex-col bg-auth-surface text-auth-on-surface">
      <header className="z-50 flex h-16 items-center justify-between border-b border-auth-outline/50 bg-auth-card/90 px-6 shadow-sm backdrop-blur-md lg:px-12">
        <Link href="/" className="text-lg font-bold tracking-tight text-auth-primary">
          {BRAND_SHORT}{" "}
          <span className="font-semibold text-auth-secondary">Property Hub</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#"
            className="text-xs font-semibold uppercase tracking-wide text-auth-on-surface-muted transition-colors hover:text-auth-primary"
          >
            Support
          </Link>
          <Link
            href="#"
            className="text-xs font-semibold uppercase tracking-wide text-auth-on-surface-muted transition-colors hover:text-auth-primary"
          >
            Help Center
          </Link>
        </nav>
      </header>

      <section className="border-b border-auth-outline/50 bg-auth-primary px-6 py-8 lg:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{BRAND_NAME}</p>
        <h2 className="mt-3 text-xl font-bold leading-snug text-white">{mobile.headline}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white">{mobile.subline}</p>
      </section>

      <main className="flex flex-1 flex-col lg:flex-row">
        <BrandPanel variant={variant} />
        <section className="flex w-full flex-1 items-center justify-center px-6 py-10 lg:w-1/2 lg:px-12 lg:py-16">
          {children}
        </section>
      </main>

      <footer className="border-t border-auth-outline/50 bg-auth-card px-6 py-4 text-center text-xs text-auth-on-surface-muted lg:px-12">
        © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </footer>
    </div>
  );
}
