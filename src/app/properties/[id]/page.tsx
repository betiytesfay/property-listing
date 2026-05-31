"use client";

import { useParams } from "next/navigation";

import PropertyImageGallery from "./components/PropertyImageGallery";
import PropertyHeader from "./components/PropertyHeader";
import PropertySidebar from "./components/PropertySidebar";
import PropertyDetailsGrid from "./components/PropertyDetailsGrid";
import PropertyEquipment from "./components/PropertyEquipment";
import PropertyDescription from "./components/PropertyDescription";
import PropertyMapWrapper from "./components/PropertyMapWrapper";
import RelatedListings from "./components/RelatedListings";

import {
  getPropertyById,
  getRelatedProperties
} from "../../../lib/mock/properties";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const property = getPropertyById(id);

  if (!property) {
    return <p className="p-6">Property not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">

          <PropertyImageGallery images={property.images ?? []} />

          <PropertyHeader
            title={property.title}
            location={`${property.city}${property.neighborhood ? ", " + property.neighborhood : ""}`}
            bedrooms={property.details?.bedrooms ?? property.bedrooms}
            bathrooms={property.details?.bathrooms ?? property.bathrooms}
            area={property.area}
          />

          <PropertyDescription description={property.description} />

          <PropertyEquipment equipment={property.equipment ?? []} />

          {property.googleMapUrl && (
            <PropertyMapWrapper url={property.googleMapUrl} />
          )}
        </div>

        {/* Sidebar */}
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

      <RelatedListings
        currentId={property.id}
        listings={getRelatedProperties(property.id)}
      />
    </div>
  );
}