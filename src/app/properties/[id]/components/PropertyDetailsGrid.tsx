"use client";

import { Bed, Bath, Ruler, Wrench, Calendar, Wind, Building2 } from "lucide-react";

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

const BooleanBadge = ({ value }: { value: boolean }) => (
  <span
    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${value
        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
        : "bg-stone-100 text-stone-400 border border-stone-200"
      }`}
  >
    {value ? "Yes" : "No"}
  </span>
);

export default function PropertyDetailsGrid({ details }: Props) {
  const items = [
    {
      label: "Bedrooms",
      value: details.bedrooms,
      icon: <Bed className="w-4 h-4 text-amber-500" />,
      large: true,
    },
    {
      label: "Bathrooms",
      value: details.bathrooms,
      icon: <Bath className="w-4 h-4 text-amber-500" />,
      large: true,
    },
    {
      label: "Surface Area",
      value: details.surfaceArea,
      icon: <Ruler className="w-4 h-4 text-amber-500" />,
      large: true,
    },
    {
      label: "Condition",
      value: details.condition,
      icon: <Wrench className="w-4 h-4 text-amber-500" />,
      large: true,
    },
    {
      label: "Available From",
      value: details.availableFrom,
      icon: <Calendar className="w-4 h-4 text-amber-500" />,
      large: true,
    },
    {
      label: "Balcony",
      value: details.balcony,
      icon: <Wind className="w-4 h-4 text-amber-500" />,
      isBool: true,
    },
    {
      label: "Elevator",
      value: details.elevator,
      icon: <Building2 className="w-4 h-4 text-amber-500" />,
      isBool: true,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="w-1 h-5 bg-amber-400 rounded-full inline-block" />
        <h2 className="text-xl font-semibold text-stone-800">Property Details</h2>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map(({ label, value, icon, isBool }) => (
          <div
            key={label}
            className="flex items-start gap-3 p-5 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 hover:bg-amber-50/30 transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-stone-100 flex items-center justify-center shrink-0 shadow-sm">
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-400 mb-1">
                {label}
              </p>
              {isBool ? (
                <BooleanBadge value={value as boolean} />
              ) : (
                <p className="text-[17px] font-bold text-stone-900 leading-tight truncate">
                  {value as string | number}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}