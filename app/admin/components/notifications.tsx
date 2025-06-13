'use client';

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Notification } from "@/types/dashboard";
import { dashboardService } from "@/services/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getNotifications();
        setNotifications(data);
        setError(null);
      } catch (err) {
        setError('Failed to load notifications');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
    // Set up polling for new notifications
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = async (notification: Notification) => {
    try {
      await dashboardService.markNotificationAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          // Loading state
          Array(3).fill(0).map((_, i) => (
            <DropdownMenuItem key={i} className="cursor-default">
              <div className="flex flex-col space-y-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </DropdownMenuItem>
          ))
        ) : error ? (
          // Error state
          <DropdownMenuItem className="cursor-default">
            <p className="text-sm text-red-500">{error}</p>
          </DropdownMenuItem>
        ) : notifications.length === 0 ? (
          // Empty state
          <DropdownMenuItem className="cursor-default">
            <p className="text-sm text-muted-foreground">No new notifications</p>
          </DropdownMenuItem>
        ) : (
          // Notifications list
          notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id} 
              className={`cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 