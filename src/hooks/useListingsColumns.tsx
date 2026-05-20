import { Listing } from "../data/listings";
import ActionButtons from "../components/seller/ActionButtons";
import PropertyCell from "../components/seller/PropertyCell";
import StatusBadge from "../components/seller/StatusBadge";

interface Column {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: Listing) => React.ReactNode;
}

interface UseListingsColumnsProps {
  onEdit: (row: Listing) => void;
  onDelete: (row: Listing) => void;
}

export function useListingsColumns({
  onEdit,
  onDelete,
}: UseListingsColumnsProps): Column[] {
  return [
    {
      key: "name",
      label: "Property",
      render: (_: any, row: Listing) => (
        <PropertyCell
          image={row.image}
          name={row.name}
          dateAdded={row.dateAdded}
        />
      ),
    },
    { key: "location", label: "Location" },
    {
      key: "price",
      label: "Price",
      render: (value: string) => (
        <span className="font-bold text-slate-800">{value}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} />,
    },
    {
      key: "views",
      label: "Views",
      align: "center",
      render: (value: number) => (
        <span className="font-medium">{value.toLocaleString()}</span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "center",
      render: (_: any, row: Listing) => (
        <ActionButtons
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row)}
        />
      ),
    },
  ];
}
