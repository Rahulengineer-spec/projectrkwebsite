'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Bell,
  Check,
  Trash2,
  Settings,
  Filter,
  Calendar,
  Clock,
  MessageSquare,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle,
  Info,
  ChevronRight,
} from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'assignment' | 'announcement' | 'message' | 'achievement' | 'alert';
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  isRead: boolean;
  link?: string;
  course?: string;
  sender?: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment Posted',
    message: 'React Hooks Implementation assignment is now available. Due date: March 25, 2024',
    type: 'assignment',
    priority: 'high',
    timestamp: '2 hours ago',
    isRead: false,
    link: '/assignments/react-hooks',
    course: 'Web Development Bootcamp',
  },
  {
    id: '2',
    title: 'Course Announcement',
    message: 'Next week\'s live session will be rescheduled to Thursday at 2 PM.',
    type: 'announcement',
    priority: 'medium',
    timestamp: '5 hours ago',
    isRead: true,
    course: 'Data Science Fundamentals',
  },
  {
    id: '3',
    title: 'New Message',
    message: 'John Doe replied to your question about useEffect.',
    type: 'message',
    priority: 'low',
    timestamp: '1 day ago',
    isRead: false,
    link: '/discussion/forums',
    sender: 'John Doe',
  },
  {
    id: '4',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You\'ve completed 10 assignments.',
    type: 'achievement',
    priority: 'medium',
    timestamp: '2 days ago',
    isRead: true,
  },
  {
    id: '5',
    title: 'Assignment Due Soon',
    message: 'Your Data Visualization project is due in 24 hours.',
    type: 'alert',
    priority: 'high',
    timestamp: '3 days ago',
    isRead: false,
    link: '/assignments/data-viz',
    course: 'Data Science Fundamentals',
  },
];

export default function NotificationsPage() {
  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'assignment':
        return <BookOpen className="h-4 w-4" />;
      case 'announcement':
        return <Info className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'achievement':
        return <Award className="h-4 w-4" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with your course activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notifications..."
          className="pl-8"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Notifications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              New notifications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Important alerts
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">
              Viewed notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`${
              !notification.isRead ? 'border-primary' : ''
            }`}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    notification.isRead ? 'bg-muted' : 'bg-primary/10'
                  }`}>
                    {getTypeIcon(notification.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">
                        {notification.title}
                      </CardTitle>
                      {!notification.isRead && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      {notification.course && (
                        <div className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {notification.course}
                        </div>
                      )}
                      {notification.sender && (
                        <div className="flex items-center">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          {notification.sender}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {notification.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(notification.priority)}
                  <Button variant="ghost" size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {notification.link && (
              <CardContent>
                <Button variant="link" className="p-0 h-auto">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
} 