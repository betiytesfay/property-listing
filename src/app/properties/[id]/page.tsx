import PropertyImageGallery from "./components/PropertyImageGallery"
import PropertyHeader from "./components/PropertyHeader"
import PropertyPriceCard from "./components/PropertyPriceCard"
import PropertyDetailsGrid from "./components/PropertyDetailsGrid"
import PropertyEquipment from "./components/PropertyEquipment"
import PropertyDescription from "./components/PropertyDescription"
import PropertyMap from "./components/PropertyMap"

import { properties } from "@/src/data/dummyProperties"
import type { Property } from "@/src/types/propertyTypes"

export default function Page() {
  const property: Property = properties[0]

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* IMAGE */}
      <PropertyImageGallery images={property.images} />

      {/* HEADER */}
      <PropertyHeader
        location={`${property.city}${property.neighborhood ? ", " + property.neighborhood : ""}`}
        shortDescription={property.shortDescription ?? property.title}
      />

      {/* PRICE */}
      <PropertyPriceCard
        type={property.status}
        price={property.price}
      />

      {/* DETAILS */}
      <PropertyDetailsGrid
        details={property.details ?? {
          surfaceArea: `${property.area} m²`,
          condition: "Unknown",
          availableFrom: "N/A",
          balcony: false,
          elevator: false,
        }}
      />

      {/* EQUIPMENT */}
      <PropertyEquipment
        equipment={property.equipment ?? []}
      />

      {/* DESCRIPTION */}
      <PropertyDescription
        description={property.description}
      />

      {/* MAP */}
      {property.googleMapUrl && (
        <PropertyMap url={property.googleMapUrl} />
      )}

    </div>
  )
}