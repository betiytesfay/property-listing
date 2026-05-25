import type { ReactNode } from "react";
import { AdminGuard } from "@/src/features/auth/components/admin-guard";

/** Root admin guard — page-level layouts add dashboard chrome or auth split layout */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
