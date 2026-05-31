import { z } from 'zod';

export const dashboardStatsSchema = z.object({
  totalProperties: z.number(),
  availableProperties: z.number(),
  soldProperties: z.number(),
  rentedProperties: z.number(),
  totalCustomers: z.number(),
  totalOrders: z.number(),
  pendingApprovals: z.number(),
  totalRevenue: z.number(),
  revenueChange: z.string().optional(),
  propertiesChange: z.string().optional(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;