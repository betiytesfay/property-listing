"use client";

import type { ReactNode } from "react";
import { Navbar } from "@/src/components/layout/Navbar";
import { AuthGuard } from "@/src/features/auth/components/auth-guard";
import SideNavigation from "../../components/seller/SideNavigation";

interface LayoutProps {
  children: ReactNode;
}

export default function ProtectedSellerLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />

      {/* Main content area with side navigation */}
      <div className="flex min-h-[calc(100vh-8rem)] flex-1 flex-col bg-slate-50 text-slate-950">
        <div className="flex flex-1">
          <SideNavigation />
          <main className="flex-1 p-8">
            <AuthGuard>{children}</AuthGuard>
          </main>
        </div>
      </div>

    </>
  );
}
