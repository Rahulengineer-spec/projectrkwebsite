'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Clock,
  Calendar,
  ChevronRight,
  Award,
  AlertCircle,
} from "lucide-react";

interface Exam {
  id: string;
  title: string;
  course: string;
  date: string;
  duration: string;
  totalMarks: number;
  status: 'upcoming' | 'completed';
  grade?: number;
  type: 'midterm' | 'final' | 'quiz';
}

const exams: Exam[] = [
  {
    id: '1',
    title: 'Web Development Midterm',
    course: 'Web Development Bootcamp',
    date: '2024-03-20T10:00:00',
    duration: '2 hours',
    totalMarks: 100,
    status: 'upcoming',
    type: 'midterm',
  },
  {
    id: '2',
    title: 'Data Science Quiz 3',
    course: 'Data Science Fundamentals',
    date: '2024-03-18T14:00:00',
    duration: '1 hour',
    totalMarks: 50,
    status: 'upcoming',
    type: 'quiz',
  },
  {
    id: '3',
    title: 'Machine Learning Final',
    course: 'Data Science Fundamentals',
    date: '2024-03-15T09:00:00',
    duration: '3 hours',
    totalMarks: 100,
    status: 'completed',
    grade: 85,
    type: 'final',
  },
];

export default function ExamsPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exams</h1>
          <p className="text-muted-foreground">
            Manage and track your course examinations
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          View Schedule
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exams.filter(e => e.status === 'upcoming').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Next exam in 3 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Exams</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {exams.filter(e => e.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Average grade: 85%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Tests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Available for practice
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {exams.filter(exam => exam.status === 'upcoming').map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exam.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exam.course}
                    </p>
                  </div>
                  <Badge variant="destructive">
                    {formatDateTime(exam.date)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {exam.duration}
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {exam.totalMarks} marks
                    </div>
                  </div>
                  <Button>
                    View Details
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {exams.filter(exam => exam.status === 'completed').map((exam) => (
            <Card key={exam.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exam.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {exam.course}
                    </p>
                  </div>
                  <Badge variant="default">
                    Grade: {exam.grade}/{exam.totalMarks}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {exam.duration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDateTime(exam.date)}
                    </div>
                  </div>
                  <Button variant="outline">
                    View Results
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Practice Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {['Web Development', 'Data Science', 'Machine Learning'].map((course) => (
                  <Card key={course}>
                    <CardHeader>
                      <CardTitle className="text-lg">{course}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Practice tests available for this course
                        </p>
                        <Button className="w-full">
                          Start Practice
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 