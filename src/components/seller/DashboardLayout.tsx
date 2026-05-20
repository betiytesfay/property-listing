import { IoMdNotificationsOutline } from "react-icons/io";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
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
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
