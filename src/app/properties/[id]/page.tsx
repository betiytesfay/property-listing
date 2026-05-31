"use client";

import { useParams } from "next/navigation";

import PropertyImageGallery from "./components/PropertyImageGallery";
import PropertyHeader from "./components/PropertyHeader";
import PropertySidebar from "./components/PropertySidebar";
import PropertyDescription from "./components/PropertyDescription";
import PropertyEquipment from "./components/PropertyEquipment";
import PropertyMapWrapper from "./components/PropertyMapWrapper";
import RelatedListings from "./components/RelatedListings";

import { getPropertyById, getRelatedProperties } from "../../../lib/mock/properties";

export default function Page() {
  const params = useParams();
  const id = params?.id as string;

  const property = getPropertyById(id);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-gray-500">Property not found</p>
      </div>
    );
  }

  // Format price from string to number
  const formattedPrice = parseFloat(property.price);

  // ✅ Added the missing function
  const getStatusValue = () => {
    return property.listing_type === "FOR_SALE" ? "sell" : "rent";
  };

  // Check if property has location data
  const hasLocation = property.latitude && property.longitude;
  const mapUrl = hasLocation
    ? `https://maps.google.com/?q=${property.latitude},${property.longitude}`
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-8">

          <PropertyImageGallery images={property.media_urls ?? []} />

          <PropertyHeader
            title={property.title}
            location={property.address}
            bedrooms={0}
            bathrooms={0}
            area={0}
          />

          <PropertyDescription description={property.description} />

          <PropertyEquipment equipment={[]} />

          {hasLocation && mapUrl && (
            <PropertyMapWrapper url={mapUrl} />
          )}
        </div>


        <div className="lg:col-span-1">
          <PropertySidebar
            price={formattedPrice}
            status={getStatusValue()}
            agent={{
              name: "Abenezer Tadesse",
              avatar: "/agents/abenezer.jpg",
              isVerified: true,
            }}
          />
        </div>
      </div>

      <RelatedListings
        currentId={property.property_id}
        listings={getRelatedProperties(property.property_id)}
      />
    </div>
  );
}