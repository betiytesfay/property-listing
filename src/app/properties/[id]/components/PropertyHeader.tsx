import { MapPin, Bed, Bath, Ruler } from "lucide-react";

type Props = {
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
};

export default function PropertyHeader({ title, location, bedrooms, bathrooms, area }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">{title}</h1>
        <div className="flex items-center gap-2 text-slate-600 text-lg">
          <MapPin className="w-5 h-5 text-amber-600" />
          {location}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bedrooms</p>
          <div className="flex items-center gap-2">
            <Bed className="w-6 h-6 text-amber-600" />
            <span className="text-2xl font-bold text-slate-900">{bedrooms}</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bathrooms</p>
          <div className="flex items-center gap-2">
            <Bath className="w-6 h-6 text-amber-600" />
            <span className="text-2xl font-bold text-slate-900">{bathrooms}</span>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Area</p>
          <div className="flex items-center gap-2">
            <Ruler className="w-6 h-6 text-amber-600" />
            <span className="text-2xl font-bold text-slate-900">{area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}