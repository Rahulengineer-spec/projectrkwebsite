'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  ChevronRight,
  FileText,
  BarChart3,
} from "lucide-react";

interface Grade {
  id: string;
  course: string;
  instructor: string;
  assignments: {
    name: string;
    grade: number;
    totalMarks: number;
    type: 'assignment' | 'exam' | 'quiz';
    date: string;
  }[];
  overallGrade: number;
  status: 'active' | 'completed';
}

const grades: Grade[] = [
  {
    id: '1',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    assignments: [
      {
        name: 'HTML/CSS Project',
        grade: 85,
        totalMarks: 100,
        type: 'assignment',
        date: '2024-03-15',
      },
      {
        name: 'JavaScript Quiz',
        grade: 90,
        totalMarks: 100,
        type: 'quiz',
        date: '2024-03-10',
      },
      {
        name: 'Midterm Exam',
        grade: 88,
        totalMarks: 100,
        type: 'exam',
        date: '2024-03-05',
      },
    ],
    overallGrade: 87.6,
    status: 'active',
  },
  {
    id: '2',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    assignments: [
      {
        name: 'Data Analysis Project',
        grade: 92,
        totalMarks: 100,
        type: 'assignment',
        date: '2024-03-18',
      },
      {
        name: 'Statistics Quiz',
        grade: 85,
        totalMarks: 100,
        type: 'quiz',
        date: '2024-03-12',
      },
    ],
    overallGrade: 88.5,
    status: 'active',
  },
];

export default function GradebookPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 90) return <Badge variant="default">A</Badge>;
    if (grade >= 80) return <Badge variant="secondary">B</Badge>;
    if (grade >= 70) return <Badge variant="outline">C</Badge>;
    return <Badge variant="destructive">D</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gradebook</h1>
          <p className="text-muted-foreground">
            Track your academic performance across all courses
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8</div>
            <p className="text-xs text-muted-foreground">
              Out of 4.0
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Completed this semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exams</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Completed this semester
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Grades */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Course Grades</h2>
        {grades.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{course.course}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Instructor: {course.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${getGradeColor(course.overallGrade)}`}>
                    {course.overallGrade}%
                  </span>
                  {getGradeBadge(course.overallGrade)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.assignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{assignment.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {assignment.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(assignment.date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`font-bold ${getGradeColor(assignment.grade)}`}>
                          {assignment.grade}/{assignment.totalMarks}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getGradeBadge(assignment.grade)}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 