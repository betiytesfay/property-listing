import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMenu } from "react-icons/md";

type NavHeaderProps = {
  brandName?: string;
  user?: {
    initials: string;
    name: string;
  };
  onMenuClick?: () => void;
  onNotificationsClick?: () => void;
};

function NavHeader({
  brandName = "Ethio-Premium",
  user = { initials: "AK", name: "Abebe Kebede" },
  onMenuClick,
  onNotificationsClick,
}: NavHeaderProps) {
  return (
    <header className="flex items-center justify-between h-14 px-5 bg-white border-b border-slate-200 shrink-0">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer" onClick={onMenuClick}>
          <MdMenu size={30} />
        </button>
        <span className="text-sm font-medium">{brandName}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center text-xs font-medium text-amber-800">
            {user.initials}
          </div>
          <span className="text-sm font-medium">{user.name}</span>
        </div>
        <button
          onClick={onNotificationsClick}
          className="flex items-center justify-center text-slate-500 hover:bg-slate-50"
        >
          <IoMdNotificationsOutline size={20} />
        </button>
      </div>
    </header>
  );
}

export default NavHeader;
