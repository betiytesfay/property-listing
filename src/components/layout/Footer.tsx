import Link from "next/link";
import { Globe, Mail, Users, Share2, Music2 } from "lucide-react";

const footerSections = [
  {
    title: "ABOUT",
    links: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "KNOWLEDGE & DATABASE",
    links: [
      { label: "Reports", href: "#" },
      { label: "Magazine", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "SERVICES",
    links: [
      { label: "Property Analytics", href: "#" },
      { label: "Tenant Discovery", href: "#" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { label: "Customer Support", href: "#" },
      { label: "Sales Department", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f5f5f5] text-slate-700">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Logo */}
        <div className="mb-14">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-slate-900"
          >
            Property<span className="text-emerald-500">Hub</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="mb-8 text-sm font-extrabold uppercase tracking-wide text-slate-900">
                {section.title}
              </h5>

              <ul className="space-y-2 mt-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-slate-600 transition hover:text-slate-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Social Section */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row lg:px-8">
          {/* Socials */}
          <div className="flex items-center gap-5">
            <span className="text-sm font-bold uppercase tracking-wide text-slate-900">
              Join Us:
            </span>

            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:bg-slate-900 hover:text-white"
              >
                <Globe size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:bg-slate-900 hover:text-white"
              >
                <Mail size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:bg-slate-900 hover:text-white"
              >
                <Users size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:bg-slate-900 hover:text-white"
              >
                <Share2 size={18} />
              </Link>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 lg:flex-row lg:px-8">
          <p>© 2026 PropertyHub. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6 font-semibold text-slate-700">
            <Link href="#" className="transition hover:text-slate-900">
              Terms of Cooperation
            </Link>

            <Link href="#" className="transition hover:text-slate-900">
              Privacy Policy
            </Link>

            <Link href="#" className="transition hover:text-slate-900">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}