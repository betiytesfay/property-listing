import { create } from "zustand";
import { DashboardStats, dashboardStatsSchema } from "../../admin/schemas/dashboard.schema";
import { mockStats } from "@/src/mocks/stat";

interface StatsStore {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

export const useAdminStatsStore = create<StatsStore>((set) => ({
  stats: null,
  isLoading: false,
  error: null,

  fetchStats: async () => {
    set({ isLoading: true, error: null });

    try {
      // mock data (no backend needed)
      const validated = dashboardStatsSchema.parse(mockStats);

      set({
        stats: validated,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  },
}));