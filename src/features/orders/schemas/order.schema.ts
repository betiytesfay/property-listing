import { z } from 'zod';

export const orderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  propertyId: z.string(),
  propertyTitle: z.string(),
  amount: z.number().positive(),
  status: z.enum(['pending', 'completed', 'cancelled']),
  paymentMethod: z.enum(['bank_transfer']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ordersArraySchema = z.array(orderSchema);
export type Order = z.infer<typeof orderSchema>;