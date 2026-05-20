import { TbLogout } from "react-icons/tb";
import SideNavLink from "./SideNavLink";

function SideNavigation() {
  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col p-3">
      <div className="bg-slate-50 rounded-lg p-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-amber-700 flex items-center justify-center mb-2">
          <i className="ti ti-user text-white text-base" />
        </div>
        <p className="text-sm font-medium">Akeray Portal</p>
        <span className="text-xs text-green-600 font-medium">
          Verified Seller
        </span>
        <p className="text-xs text-amber-700 font-medium mt-1">ETB 45,200.00</p>
      </div>
      <SideNavLink />
      <button className="mt-auto flex items-center gap-2 px-2.5 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 w-full">
        <TbLogout />
        <span>Sign out</span>
      </button>
    </aside>
  );
}

export default SideNavigation;
