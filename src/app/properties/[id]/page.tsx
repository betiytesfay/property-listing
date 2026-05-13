import { dummyProperty } from "@/src/data/dummyProperties"

export default function PropertyDetailPage() {
  const property = dummyProperty

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{property.title}</h1>

      <p className="text-gray-600">{property.city}</p>

      <h2 className="text-xl mt-4">${property.price}</h2>

      <p className="mt-4">{property.description}</p>
    </div>
  )
}