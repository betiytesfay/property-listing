"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { OwnerGuard } from "@/src/features/auth/components/owner-guard";
import SideNavigation from "../../components/seller/SideNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function ProtectedSellerLayout({
  children,
}: LayoutProps) {
  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-8rem)] flex-1 flex-col bg-slate-50 text-slate-950">
        <OwnerGuard>
          <div className="flex flex-1">
            <SideNavigation />

            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </OwnerGuard>
      </div>
    </>
  );
}