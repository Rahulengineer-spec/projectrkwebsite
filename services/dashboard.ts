import { DashboardStats, Activity } from "@/types/dashboard";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await fetch('/api/dashboard/stats');
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  async getRecentActivity(): Promise<Activity[]> {
    const response = await fetch('/api/dashboard/activity');
    if (!response.ok) throw new Error('Failed to fetch activity');
    return response.json();
  }
}; 