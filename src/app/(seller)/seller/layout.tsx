import NavHeader from "../../../components/seller/NavHeader";
import SideNavigation from "../../../components/seller/SideNavigation";
import { OwnerGuard } from "@/src/features/auth/components/owner-guard";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <OwnerGuard>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <NavHeader />
        <div className="flex flex-1">
          <SideNavigation />
          <main className="flex-1 p-8">{children}</main>
        </div>
      </div>
    </OwnerGuard>
  );
}
