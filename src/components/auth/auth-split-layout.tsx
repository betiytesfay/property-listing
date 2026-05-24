import type { ReactNode } from "react";
// Intentionally no global Navbar/Footer here — auth pages should be chrome-free
import { BrandPanel, type BrandPanelVariant } from "@/src/components/auth/brand-panel";
import { DatabaseStatusBanner } from "@/src/features/auth/components/database-status-banner";

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
};

export function AuthSplitLayout({ children, variant }: AuthSplitLayoutProps) {
  const mobile = MOBILE_COPY[variant];

  return (
    <div className="flex min-h-screen flex-col bg-auth-surface text-auth-on-surface">
      <DatabaseStatusBanner />

      <section className="border-b border-auth-outline/40 bg-auth-primary px-6 py-8 lg:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Habesha Property Hub</p>
        <h2 className="mt-3 text-xl font-bold leading-snug text-white">{mobile.headline}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/90">{mobile.subline}</p>
      </section>

      <main className="flex flex-1 flex-col lg:flex-row">
        <BrandPanel variant={variant === "forgotPassword" ? "login" : variant} />
        <section className="flex w-full flex-1 items-center justify-center bg-slate-50 px-6 py-10 lg:w-1/2 lg:px-12 lg:py-16">
          {children}
        </section>
      </main>

    </div>
  );
}
