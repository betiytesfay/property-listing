import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import type { Property } from "../../types/propertyTypes";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-slate-100" aria-hidden="true">
        {property.imageUrl ? (
          <img src={property.imageUrl} alt={property.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Image placeholder
          </div>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500">{property.city}</p>
            <h3 className="text-lg font-semibold text-slate-900">{property.title}</h3>
          </div>
          <Badge variant={property.status === "rent" ? "accent" : "success"}>
            {property.status === "rent" ? "Rent" : "Sale"}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-slate-600 line-clamp-2">{property.description}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span>{property.bedrooms} bd</span>
          <span>•</span>
          <span>{property.bathrooms} ba</span>
          <span>•</span>
          <span>{property.area} m²</span>
        </div>
        <div className="flex items-center justify-between gap-4 pt-2">
          <p className="text-xl font-semibold text-slate-900">${property.price.toLocaleString()}</p>
          <span className="text-sm text-slate-500">{property.furnished ? "Furnished" : "Unfurnished"}</span>
        </div>
      </div>
    </Card>
  );
}
