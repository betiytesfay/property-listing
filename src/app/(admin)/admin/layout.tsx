import type { ReactNode } from "react";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";
import { AdminGuard } from "@/src/features/auth/components/admin-guard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-8rem)] flex-1 flex-col bg-slate-50 text-slate-950">
        <AdminGuard>{children}</AdminGuard>
      </main>
      <Footer />
    </>
  );
}
