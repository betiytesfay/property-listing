import { z } from 'zod';

export const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  type: z.enum(['buyer', 'seller', 'both']),
  joinedAt: z.string(),
  totalSpent: z.number().default(0),
  propertiesCount: z.number().default(0),
});

export const customersArraySchema = z.array(customerSchema);
export type Customer = z.infer<typeof customerSchema>;