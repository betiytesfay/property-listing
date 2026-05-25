"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CgSupport } from "react-icons/cg";
import {
  CiBoxList,
  CiCreditCard1,
  CiGrid41,
  CiHeart,
  CiSettings,
} from "react-icons/ci";
import React from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: <CiGrid41 size={20} /> },
  {
    href: "/dashboard/listings",
    label: "My listings",
    icon: <CiBoxList size={20} />,
  },
  {
    href: "/dashboard/saved",
    label: "Saved ",
    icon: <CiHeart size={20} />,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <CiSettings size={18} />,
  },
  {
    href: "/dashboard/support",
    label: "Support",
    icon: <CgSupport size={20} />,
  },
];

function SideNavLink() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col items-start gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${
              isActive
                ? "bg-slate-50 text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </ul>
  );
}

export default SideNavLink;
