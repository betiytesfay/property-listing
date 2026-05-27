import Image from "next/image";
import { AUTH_HERO_IMAGE, BRAND_NAME } from "@/src/lib/auth-constants";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";

export type BrandPanelVariant = "login" | "register" | "adminRegister";

interface BrandPanelProps {
  variant: BrandPanelVariant;
}

const COPY: Record<
  BrandPanelVariant,
  { headline: string; subline: string; bullets: { icon: typeof ShieldCheck; text: string }[] }
> = {
  login: {
    headline: "Welcome back to Ethiopia's premium property marketplace.",
    subline: "Sign in to manage saved listings, inquiries, and your seller dashboard.",
    bullets: [
      { icon: ShieldCheck, text: "Verified listings and trusted sellers" },
      { icon: Users, text: "Reach diaspora and local buyers" },
      { icon: TrendingUp, text: "Insights built for modern PropTech" },
    ],
  },
  register: {
    headline: "Partner with the best in Ethiopia.",
    subline:
      "Join Habesha Property Hub's verified network and reach thousands of diaspora and local high-value buyers today.",
    bullets: [
      { icon: ShieldCheck, text: "List villas, apartments, and land" },
      { icon: Users, text: "Connect with qualified buyers" },
      { icon: TrendingUp, text: "Grow with premium marketplace tools" },
    ],
  },
  adminRegister: {
    headline: "Build a trusted admin team.",
    subline:
      "Invite administrators to help manage listings, sellers, and platform operations across Habesha Property Hub.",
    bullets: [
      { icon: ShieldCheck, text: "Secure, role-based access" },
      { icon: Users, text: "Onboard trusted platform admins" },
      { icon: TrendingUp, text: "Scale operations with confidence" },
    ],
  },
};

export function BrandPanel({ variant }: BrandPanelProps) {
  const content = COPY[variant];

  return (
    <aside className="relative hidden overflow-hidden lg:block lg:w-1/2 lg:max-h-[100vh] lg:my-4 lg:shadow-2xl">
      <Image
        src={AUTH_HERO_IMAGE}
        alt="Luxury modern villa in Ethiopia at golden hour"
        fill
        priority
        unoptimized
        className="object-cover"
        sizes="50vw"
      />
      {/* Dark overlay for text contrast - no blur, keeps image sharp */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      
      {/* Text container - adjusted bottom spacing for reduced height */}
      <div className="absolute bottom-24 left-10 right-10 !text-white">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] !text-white">
          {BRAND_NAME}
        </p>
        <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight !text-white xl:text-4xl">
          {content.headline}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed !text-white">
          {content.subline}
        </p>
        <ul className="mt-8 space-y-3">
          {content.bullets.map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-sm !text-white">
              <item.icon className="h-5 w-5 shrink-0 !text-white" aria-hidden />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}