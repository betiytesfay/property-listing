import { z } from 'zod';

export const propertySchema = z.object({
  property_id: z.string(),
  owner_id: z.string(),

  title: z.string(),
  description: z.string().nullable().optional(),

  category: z.enum(['RESIDENTIAL', 'COMMERCIAL', 'LAND']).optional(),
  listing_type: z.enum(['FOR_SALE', 'FOR_RENT']).optional(),

  price: z.union([z.string(), z.number()]),

  address: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  media_urls: z.array(z.string()).default([]),

  listing_fee_paid: z.boolean().optional(),
  is_active: z.boolean().optional(),

  created_at: z.string(),
  updated_at: z.string(),
});

export const propertiesResponseSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  data: z.array(propertySchema),
});

export type Property = z.infer<typeof propertySchema>;