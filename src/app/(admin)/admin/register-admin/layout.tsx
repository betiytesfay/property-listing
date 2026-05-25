import type { ReactNode } from "react";

/** Auth split layout provides its own Navbar/Footer — guard only here */
export default function RegisterAdminLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
