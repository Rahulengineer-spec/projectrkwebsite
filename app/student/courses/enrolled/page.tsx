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
} from "lucide-react";

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  duration: string;
  students: number;
  category: string;
  status: 'active' | 'completed' | 'upcoming';
  thumbnail: string;
}

const enrolledCourses: EnrolledCourse[] = [
  {
    id: '1',
    title: 'Web Development Bootcamp',
    instructor: 'John Doe',
    progress: 75,
    duration: '12 weeks',
    students: 1200,
    category: 'Programming',
    status: 'active',
    thumbnail: '/course-thumbnails/web-dev.jpg',
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    progress: 30,
    duration: '16 weeks',
    students: 850,
    category: 'Data Science',
    status: 'active',
    thumbnail: '/course-thumbnails/data-science.jpg',
  },
];

export default function EnrolledCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Enrollments</h1>
          <p className="text-muted-foreground">
            Track your enrolled courses and progress
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {enrolledCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="object-cover w-full h-full"
              />
              <Badge
                variant={
                  course.status === 'completed'
                    ? 'default'
                    : course.status === 'active'
                    ? 'secondary'
                    : 'outline'
                }
                className="absolute top-2 right-2"
              >
                {course.status}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Instructor: {course.instructor}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} students
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  Continue Learning
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 