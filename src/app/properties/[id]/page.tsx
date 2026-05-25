import PropertyImageGallery from "../../(main)/properties/[id]/components/PropertyImageGallery";
import PropertyHeader from "../../(main)/properties/[id]/components/PropertyHeader";
import PropertySidebar from "../../(main)/properties/[id]/components/PropertySidebar";
import PropertyDetailsGrid from "../../(main)/properties/[id]/components/PropertyDetailsGrid";
import PropertyEquipment from "../../(main)/properties/[id]/components/PropertyEquipment";
import PropertyDescription from "../../(main)/properties/[id]/components/PropertyDescription";
import PropertyMapWrapper from "../../(main)/properties/[id]/components/PropertyMapWrapper"; // ✅ use wrapper
import RelatedListings from "../../(main)/properties/[id]/components/RelatedListings";

import { properties } from "@/src/data/dummyProperties";
import type { Property } from "@/src/types/propertyTypes";

export default function Page() {
  const property: Property = properties[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column – main content */}
        <div className="lg:col-span-2 space-y-8">
          <PropertyImageGallery images={property.images} />
          <PropertyHeader
            title={property.title}
            location={`${property.city}${property.neighborhood ? ", " + property.neighborhood : ""}`}
            bedrooms={property.details?.bedrooms ?? 0}
            bathrooms={property.details?.bathrooms ?? 0}
            area={property.area}
          />
          <PropertyDescription description={property.description} />
          <PropertyDetailsGrid details={property.details!} />
          <PropertyEquipment equipment={property.equipment ?? []} />
          {/* ✅ Use the client wrapper here */}
          {property.googleMapUrl && <PropertyMapWrapper url={property.googleMapUrl} />}
        </div>

        {/* Right column – sticky sidebar */}
        <div className="lg:col-span-1">
          <PropertySidebar
            price={property.price}
            status={property.status}
            agent={{
              name: "Abenezer Tadesse",
              avatar: "/agents/abenezer.jpg",
              isVerified: true,
            }}
          />
        </div>
      </div>

      <RelatedListings currentId={property.id} listings={properties.slice(1, 4)} />
    </div>
  );
}