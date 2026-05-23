import { z } from "zod";

export const PropertyCategory = z.enum([
  "RESIDENTIAL",
  "COMMERCIAL",
  "INDUSTRIAL",
  "AGRICULTURAL",
]);

export const ListingType = z.enum(["FOR_SALE", "FOR_RENT"]);

export const createPropertySchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  category: PropertyCategory,
  listing_type: ListingType,
  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid positive number",
    }),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(255, "Address must not exceed 255 characters"),
  description: z
    .string()
    .max(2000, "Description must not exceed 2000 characters")
    .optional()
    .transform((val) => val || ""),
  latitude: z
    .string()
    .optional()
    .transform((val) => val || ""),
  longitude: z
    .string()
    .optional()
    .transform((val) => val || ""),
  images: z
    .array(z.instanceof(File))
    .max(10, "Maximum 10 images allowed")
    .optional()
    .default([]),
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
