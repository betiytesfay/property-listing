// Backup of the conflicting dashboard layout. Moved to src/app/(admin)/admin/overview/layout.tsx to resolve route conflict.
import type { ReactNode } from "react";
import { Footer } from "@/src/components/layout/Footer";
import { Navbar } from "@/src/components/layout/Navbar";

export default function AdminDashboardLayoutBackup({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-8rem)] flex-1 flex-col bg-slate-50 text-slate-950">
        {children}
      </main>
      <Footer />
    </>
  );
}
