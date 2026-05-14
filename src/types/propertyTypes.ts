export type PropertyStatus = "rent" | "sell"

export interface Property {
  id: string
  title: string
  description: string
  shortDescription?: string

  city: string
  neighborhood?: string

  price: number
  status: PropertyStatus

  area: number
  furnished: boolean

  images: string[]

  details: {
    bedrooms: number
    bathrooms: number
    surfaceArea: string
    condition: string
    availableFrom: string
    balcony: boolean
    elevator: boolean
  }

  equipment?: string[]

  contactName?: string
  contactPhone?: string
  contactEmail?: string

  googleMapUrl?: string
}