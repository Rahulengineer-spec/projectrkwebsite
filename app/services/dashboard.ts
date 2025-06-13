import { DashboardStats, Activity } from "@/types/dashboard";

export interface Notification {
  id: string;
  type: 'admission' | 'payment' | 'batch' | 'exam';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'exam' | 'event' | 'meeting';
}

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
  },

  async getNotifications(): Promise<Notification[]> {
    try {
      const response = await fetch('/api/dashboard/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      return response.json();
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  },

  async getUpcomingEvents(): Promise<Event[]> {
    try {
      const response = await fetch('/api/dashboard/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      return response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      const response = await fetch('/api/dashboard/notifications/' + notificationId + '/read', {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to mark notification as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
}; 