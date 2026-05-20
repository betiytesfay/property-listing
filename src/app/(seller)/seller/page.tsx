import SellerCard from "../../../components/seller/SellerCard";
import SellerHeader from "../../../components/seller/SellerHeader";
import { FaHome, FaWallet } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import ActiveListing from "../../../components/seller/ActiveListing";

interface StatDescription {
  text: string;
  color: string;
}

interface SellerStat {
  title: string;
  icon: React.ReactNode;
  amount: string;
  description: StatDescription;
}

const sellerStats: SellerStat[] = [
  {
    title: "Total Listings",
    icon: <FaHome />,
    amount: "12",
    description: { text: "+2 this month", color: "text-green-600" },
  },
  {
    title: "Property Views",
    icon: <MdOutlineRemoveRedEye />,
    amount: "3,450",
    description: { text: "15% increase", color: "text-green-600" },
  },
  {
    title: "Active Leads",
    icon: <HiOutlineUsers />,
    amount: "24",
    description: { text: "Across all listings", color: "text-gray-500" },
  },
  {
    title: "Total Earned",
    icon: <FaWallet />,
    amount: "ETB 1.2M",
    description: { text: "Verified payout", color: "text-amber-500" },
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <SellerHeader />
      <div className="flex items-center gap-8">
        {sellerStats.map((stat: SellerStat) => (
          <SellerCard
            key={stat.title}
            title={stat.title}
            icon={stat.icon}
            amount={stat.amount}
            description={stat.description}
          />
        ))}
      </div>
      <ActiveListing />
    </div>
  );
}
