'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  Award,
  TrendingUp,
  Calendar,
} from "lucide-react";

interface CourseProgress {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  lastAccessed: string;
  grade: number;
  status: 'active' | 'completed' | 'upcoming';
}

const courseProgress: CourseProgress[] = [
  {
    id: '1',
    title: 'Web Development Bootcamp',
    instructor: 'John Doe',
    progress: 75,
    completedModules: 9,
    totalModules: 12,
    lastAccessed: '2024-03-19T14:30:00',
    grade: 85,
    status: 'active',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    progress: 30,
    completedModules: 4,
    totalModules: 16,
    lastAccessed: '2024-03-18T10:15:00',
    grade: 78,
    status: 'active',
  },
];

export default function ProgressPage() {
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

  const getStatusBadge = (status: CourseProgress['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary">In Progress</Badge>;
      case 'completed':
        return <Badge variant="default">Completed</Badge>;
      case 'upcoming':
        return <Badge variant="outline">Upcoming</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Progress</h1>
          <p className="text-muted-foreground">
            Track your learning journey and achievements
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          View Timeline
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Currently enrolled
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">
              Across all assessments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Course Progress</h2>
        {courseProgress.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instructor: {course.instructor}
                  </p>
                </div>
                {getStatusBadge(course.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Completed Modules</p>
                    <p className="text-2xl font-bold">
                      {course.completedModules}/{course.totalModules}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Current Grade</p>
                    <p className="text-2xl font-bold">{course.grade}%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Last accessed: {formatDateTime(course.lastAccessed)}
                  </div>
                  <Button variant="outline">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Achievements</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Perfect Score</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Achieved 100% in Web Development Quiz
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Learner</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Completed 5 modules in one week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Consistent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Maintained 5-day study streak
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 