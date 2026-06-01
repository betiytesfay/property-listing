import type { ReactNode } from "react";
import Link from "next/link";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { BrandPanel, type BrandPanelVariant } from "@/src/components/auth/brand-panel";
import { DatabaseStatusBanner } from "@/src/features/auth/components/database-status-banner";
import { ArrowLeft } from "lucide-react";

export type AuthPageVariant = BrandPanelVariant | "forgotPassword";

interface AuthSplitLayoutProps {
  children: ReactNode;
  variant: AuthPageVariant;
}

const MOBILE_COPY: Record<AuthPageVariant, { headline: string; subline: string }> = {
  login: {
    headline: "Welcome back to Ethiopia's premium property marketplace.",
    subline: "Sign in to manage saved listings, inquiries, and your seller dashboard.",
  },
  register: {
    headline: "Partner with the best in Ethiopia.",
    subline: "Create your seller account and start listing properties today.",
  },
  forgotPassword: {
    headline: "Account recovery made simple.",
    subline: "We'll help you regain access to your seller dashboard securely.",
  },
  adminRegister: {
    headline: "Build a trusted admin team.",
    subline: "Invite administrators to manage the platform securely and at scale.",
  },
};

export function AuthSplitLayout({ children, variant }: AuthSplitLayoutProps) {
  const mobile = MOBILE_COPY[variant];

  return (
    <div className="flex min-h-screen flex-col bg-auth-surface text-auth-on-surface">
  
      <DatabaseStatusBanner />

      <section className="border-b border-auth-outline/40 bg-auth-primary px-6 py-8 lg:hidden">
        <div className="mb-2">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-white sm:text-3xl"
          >
            Habesha<span className="text-amber-400">Hub</span>
          </Link>
        </div>
        <h2 className="mt-3 text-xl font-bold leading-snug text-white">{mobile.headline}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/90">{mobile.subline}</p>
      </section>

      <main className="flex flex-1 flex-col lg:flex-row">
        <BrandPanel
          variant={
            variant === "forgotPassword" ? "login" : variant === "adminRegister" ? "adminRegister" : variant
          }
        />
        <section className="relative flex w-full flex-1 items-center justify-center bg-slate-50 px-6 py-10 lg:w-1/2 lg:px-12 lg:py-16">
          <div className="absolute top-6 left-6 lg:top-8 lg:left-12">
            <Link
              href="/"
              className="group flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-amber-500"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </div>
          {children}
        </section>
      </main>

 
    </div>
  );
}