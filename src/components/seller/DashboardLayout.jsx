import Link from "next/link";
import { CiBoxList, CiHeart, CiSettings } from "react-icons/ci";
import { GrSupport } from "react-icons/gr";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdPayment } from "react-icons/md";
import { TiSupport } from "react-icons/ti";

// const navItems = [
//   { href: "/seller", label: "Overview", icon: <HiOutlineViewGrid size={18} /> },
//   {
//     href: "/seller/listings",
//     label: "My listings",
//     icon: <CiBoxList size={18} />,
//   },
//   {
//     href: "/seller/payments",
//     label: "Payments",
//     icon: <MdPayment size={18} />,
//   },
//   { href: "/seller/saved", label: "Saved homes", icon: <CiHeart size={18} /> },
//   {
//     href: "/seller/settings",
//     label: "Settings",
//     icon: <CiSettings size={18} />,
//   },
//   { href: "/seller/support", label: "Support", icon: <GrSupport size={18} /> },
// ];

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="flex items-center justify-between h-14 px-5 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-amber-700 flex items-center justify-center">
            <i className="ti ti-building-estate text-white text-sm" />
          </div>
          <span className="text-sm font-medium">Ethio-Premium</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-800">
              AK
            </div>
            <span className="text-sm font-medium">Abebe Kebede</span>
          </div>
          <button className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <IoMdNotificationsOutline size={20} />
          </button>
        </div>
      </header>

      {/* <div className="flex flex-1">
        <aside className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col p-3">
          <div className="bg-slate-50 rounded-lg p-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-amber-700 flex items-center justify-center mb-2">
              <i className="ti ti-user text-white text-base" />
            </div>
            <p className="text-sm font-medium">Akeray Portal</p>
            <span className="text-xs text-green-600 font-medium">
              Verified Seller
            </span>
            <p className="text-xs text-amber-700 font-medium mt-1">
              ETB 45,200.00
            </p>
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              {item.icon}
              <span> {item.label}</span>
            </Link>
          ))}

          <button className="mt-auto flex items-center gap-2 px-2.5 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 w-full">
            <i className="ti ti-logout text-base" />
            Sign out
          </button>
        </aside> */}

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
