type DetailItem = {
  label: string;
  value: string | number | boolean;
};

type Props = {
  details: {
    bedrooms: number;
    bathrooms: number;
    surfaceArea: string;
    condition: string;
    availableFrom: string;
    balcony: boolean;
    elevator: boolean;
  };
};

export default function PropertyDetailsGrid({ details }: Props) {
  const items: DetailItem[] = [
    { label: "Bedrooms", value: details.bedrooms },
    { label: "Bathrooms", value: details.bathrooms },
    { label: "Surface", value: details.surfaceArea },
    { label: "Condition", value: details.condition },
    { label: "Available from", value: details.availableFrom },
    { label: "Balcony", value: details.balcony ? "Yes" : "No" },
    { label: "Elevator", value: details.elevator ? "Yes" : "No" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-slate-900">Property details</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-lg border border-slate-100 p-3">
            <p className="text-xs text-slate-500">{item.label}</p>
            <p className="font-medium text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}