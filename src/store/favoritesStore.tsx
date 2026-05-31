"use client";

import { useEffect, useState } from "react";
import type { Property } from "../types/propertyTypes";

const STORAGE_KEY = "property_favorites_v1";

function readFavorites(): Property[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Property[];
  } catch {
    return [];
  }
}

function writeFavorites(items: Property[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("favorites-changed", { detail: items }));
  } catch { }
}

export function addFavorite(property: Property) {
  const items = readFavorites();
  if (items.find((p) => p.property_id === property.property_id)) return; // ✅ property_id
  items.unshift(property);
  writeFavorites(items);
}

export function removeFavorite(id: string) {
  const items = readFavorites().filter((p) => p.property_id !== id); // ✅ property_id
  writeFavorites(items);
}

export function isFavorite(id: string) {
  return readFavorites().some((p) => p.property_id === id); // ✅ property_id
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());

    function onChange(e: Event) {
      const detail = (e as CustomEvent).detail as Property[] | undefined;
      if (detail) setFavorites(detail);
      else setFavorites(readFavorites());
    }

    window.addEventListener("favorites-changed", onChange as EventListener);
    window.addEventListener("storage", onChange as EventListener);
    return () => {
      window.removeEventListener("favorites-changed", onChange as EventListener);
      window.removeEventListener("storage", onChange as EventListener);
    };
  }, []);

  return {
    favorites,
    add: (p: Property) => addFavorite(p),
    remove: (id: string) => removeFavorite(id),
    isFavorite: (id: string) => favorites.some((f) => f.property_id === id), // ✅ property_id
  };
}