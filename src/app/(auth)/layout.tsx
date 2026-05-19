import type { ReactNode } from "react";
import { GuestOnlyGuard } from "@/src/features/auth/components/guest-only-guard";

export default function AuthRouteLayout({ children }: { children: ReactNode }) {
  return <GuestOnlyGuard>{children}</GuestOnlyGuard>;
}
