import NavHeader from "../../../components/seller/NavHeader";
import SideNavigation from "../../../components/seller/SideNavigation";
export default function layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <NavHeader />
      <div className="flex flex-1">
        <SideNavigation />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
