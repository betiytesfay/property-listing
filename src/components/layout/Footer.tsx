"use client";

import Link from "next/link";
import { Globe, Mail, Users, Share2} from "lucide-react";

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
        {/* Logo - Updated Name & Boldness */}
        <div className="mb-14 flex-shrink-0">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl transition-transform hover:scale-[1.02] inline-block"
          >
            Habesha<span className="text-amber-400">Hub</span>
          </Link>
        </div>

        {/* Links Grid - Original Layout */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h5 className="mb-8 text-sm font-extrabold uppercase tracking-wide text-slate-900">
                {section.title}
              </h5>

              <ul className="space-y-3 mt-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-slate-600 transition-all hover:text-slate-900 hover:pl-1 font-medium"
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

      {/* Middle Social Section - Upgraded Interactivity */}
      <div className="border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 lg:flex-row lg:px-8">
          <div className="flex items-center gap-5">
            <span className="text-sm font-black uppercase tracking-widest text-slate-900">
              Join Us:
            </span>

            <div className="flex items-center gap-4">
              {[
                { icon: <Globe size={18} />, color: "hover:bg-amber-500"},
                { icon: <Users size={18} />, color: "hover:bg-amber-500" },
                { icon: <Share2 size={18} />, color: "hover:bg-amber-500" },
                { icon: <Mail size={18} />, color: "hover:bg-amber-500" },
              ].map((social, i) => (
                <Link
                  key={i}
                  href="#"
                  className={`rounded-full border border-slate-300 p-2.5 transition-all duration-300 hover:text-white hover:border-transparent hover:-translate-y-1 hover:shadow-md ${social.color}`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Standardized to your Global.css */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 lg:flex-row lg:px-8 font-medium">
          <p>© 2026 HabeshaHub. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6 font-bold text-slate-700">
            <Link href="#" className="transition-colors hover:text-amber-500 underline decoration-transparent hover:decoration-amber-500/30 underline-offset-4">
              Terms of Cooperation
            </Link>

            <Link href="#" className="transition-colors hover:text-amber-500 underline decoration-transparent hover:decoration-amber-500/30 underline-offset-4">
              Privacy Policy
            </Link>

            <Link href="#" className="transition-colors hover:text-amber-500 underline decoration-transparent hover:decoration-amber-500/30 underline-offset-4">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}