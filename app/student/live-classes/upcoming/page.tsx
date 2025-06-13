'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Video,
  Users,
  BookOpen,
  ChevronRight,
  Bell,
  BellOff,
  CalendarDays,
  MapPin,
} from "lucide-react";

interface LiveClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  startTime: string;
  duration: string;
  type: 'lecture' | 'workshop' | 'q&a';
  status: 'upcoming' | 'starting-soon' | 'in-progress';
  participants: number;
  description: string;
  topics: string[];
  meetingLink?: string;
  isReminderSet: boolean;
}

const upcomingClasses: LiveClass[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    startTime: '2024-03-20T10:00:00',
    duration: '2 hours',
    type: 'lecture',
    status: 'upcoming',
    participants: 45,
    description: 'Learn advanced React patterns and best practices for building scalable applications.',
    topics: ['Custom Hooks', 'Context API', 'Performance Optimization'],
    meetingLink: 'https://meet.example.com/class1',
    isReminderSet: true,
  },
  {
    id: '2',
    title: 'Data Visualization Workshop',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    startTime: '2024-03-20T14:00:00',
    duration: '3 hours',
    type: 'workshop',
    status: 'starting-soon',
    participants: 30,
    description: 'Hands-on workshop on creating effective data visualizations using Python.',
    topics: ['Matplotlib', 'Seaborn', 'Plotly'],
    meetingLink: 'https://meet.example.com/class2',
    isReminderSet: false,
  },
];

export default function UpcomingClassesPage() {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const getStatusBadge = (status: LiveClass['status']) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="default">Upcoming</Badge>;
      case 'starting-soon':
        return <Badge variant="secondary">Starting Soon</Badge>;
      case 'in-progress':
        return <Badge variant="destructive">In Progress</Badge>;
    }
  };

  const getTypeBadge = (type: LiveClass['type']) => {
    switch (type) {
      case 'lecture':
        return <Badge variant="default">Lecture</Badge>;
      case 'workshop':
        return <Badge variant="secondary">Workshop</Badge>;
      case 'q&a':
        return <Badge variant="outline">Q&A Session</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upcoming Classes</h1>
          <p className="text-muted-foreground">
            View and join your scheduled live classes
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          View Calendar
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Classes scheduled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starting Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Next class in 30 mins
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75</div>
            <p className="text-xs text-muted-foreground">
              Across all classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Types</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Different formats
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Classes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Scheduled Classes</h2>
        {upcomingClasses.map((class_) => (
          <Card key={class_.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{class_.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {class_.course} • {class_.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(class_.status)}
                  {getTypeBadge(class_.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {class_.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDateTime(class_.startTime)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {class_.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {class_.participants} participants
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {class_.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Video className="mr-2 h-4 w-4" />
                    Join Class
                  </Button>
                  <Button variant="outline">
                    {class_.isReminderSet ? (
                      <>
                        <BellOff className="mr-2 h-4 w-4" />
                        Remove Reminder
                      </>
                    ) : (
                      <>
                        <Bell className="mr-2 h-4 w-4" />
                        Set Reminder
                      </>
                    )}
                  </Button>
                  <Button variant="ghost">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 