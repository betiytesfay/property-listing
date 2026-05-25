import { TbLogout } from "react-icons/tb";
import SideNavLink from "./SideNavLink";

function SideNavigation() {
  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col p-3">
      <div className="bg-slate-50 rounded-lg p-3 mb-5">
        <div className="w-9 h-9 rounded-lg bg-amber-700 flex items-center justify-center mb-2">
          <i className="ti ti-user text-white text-base" />
        </div>
        <p className="text-sm font-medium">Property Owner Portal</p>
        <span className="text-xs text-green-600 font-medium">
          Verified 
        </span>
      </div>
      <SideNavLink />
      
    </aside>
  );
}

export default SideNavigation;
