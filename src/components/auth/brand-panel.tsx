import Image from "next/image";
import { AUTH_HERO_IMAGE, BRAND_NAME } from "@/src/lib/auth-constants";
import { ShieldCheck, TrendingUp, Users } from "lucide-react";

export type BrandPanelVariant = "login" | "register";

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
};

export function BrandPanel({ variant }: BrandPanelProps) {
  const content = COPY[variant];

  return (
    <aside className="relative hidden overflow-hidden lg:block lg:w-1/2">
      <Image
        src={AUTH_HERO_IMAGE}
        alt="Luxury modern villa in Ethiopia at golden hour"
        fill
        priority
        className="object-cover"
        sizes="50vw"
      />
      <div className="absolute inset-0 bg-auth-primary/30 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-auth-primary/90 via-auth-primary/20 to-transparent" />
      <div className="absolute bottom-16 left-10 right-10 text-white">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white">{BRAND_NAME}</p>
        <h2 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
          {content.headline}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white">{content.subline}</p>
        <ul className="mt-8 space-y-3">
          {content.bullets.map((item) => (
            <li key={item.text} className="flex items-center gap-3 text-sm text-white">
              <item.icon className="h-5 w-5 shrink-0 text-auth-accent" aria-hidden />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
