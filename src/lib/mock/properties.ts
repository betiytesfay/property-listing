import { properties } from "@/src/data/dummyProperties";
import type { Property } from "@/src/types/propertyTypes";


export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getRelatedProperties(currentId: string, limit = 3): Property[] {
  return properties
    .filter((p) => p.id !== currentId)
    .slice(0, limit);
}
export type { Property };