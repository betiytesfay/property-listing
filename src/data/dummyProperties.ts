import type { Property } from "@/src/types/propertyTypes"

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Apartment in Bole",
    description:
      "A modern and spacious apartment located in the heart of Bole. Close to transport, supermarkets, and restaurants. High-quality finishing and ideal for families or professionals.",

    shortDescription: "Modern apartment in prime location",

    city: "Addis Ababa",
    neighborhood: "Bole",

    price: 18000,
    status: "rent",

    area: 110,
    furnished: true,

    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    ],

    details: {
      bedrooms: 3,
      bathrooms: 2,
      surfaceArea: "110m²",
      condition: "New",
      availableFrom: "Feb 2026",
      balcony: true,
      elevator: true,
    },

    equipment: ["Kitchen", "WiFi", "Parking", "Security"],

    googleMapUrl: "https://www.google.com/maps/@39.774769,-74.86084,18z",
  },

  {
    id: "2",
    title: "Luxury Villa in Kazanchis",
    description:
      "High-end luxury villa with premium finishing, large rooms, and a private garden. Perfect for families seeking comfort and exclusivity in a prime area.",

    shortDescription: "Luxury villa with premium finishing",

    city: "Addis Ababa",
    neighborhood: "Kazanchis",

    price: 4500000,
    status: "sell",

    area: 250,
    furnished: true,

    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    ],

    details: {
      bedrooms: 5,
      bathrooms: 4,
      surfaceArea: "250m²",
      condition: "Excellent",
      availableFrom: "Immediately",
      balcony: true,
      elevator: false,
    },

    equipment: ["Garage", "Garden", "Security", "Storage Room"],

    googleMapUrl: "",
  },

  {
    id: "3",
    title: "Affordable Apartment in CMC",
    description:
      "Affordable apartment ideal for small families or individuals. Provides essential amenities, good security, and easy access to transport and shopping centers.",

    shortDescription: "Affordable apartment with essentials",

    city: "Addis Ababa",
    neighborhood: "CMC",

    price: 12000,
    status: "rent",

    area: 85,
    furnished: false,

    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    ],

    details: {
      bedrooms: 2,
      bathrooms: 1,
      surfaceArea: "85m²",
      condition: "Good",
      availableFrom: "Now",
      balcony: false,
      elevator: true,
    },

    equipment: ["Kitchen", "WiFi", "Security"],

    googleMapUrl: "",
  },
]