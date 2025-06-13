'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

interface AttendanceRecord {
  id: string;
  course: string;
  instructor: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  type: 'lecture' | 'lab' | 'workshop';
  duration: string;
  topic: string;
}

interface CourseAttendance {
  id: string;
  course: string;
  instructor: string;
  totalClasses: number;
  attended: number;
  absent: number;
  late: number;
  attendancePercentage: number;
  records: AttendanceRecord[];
}

const attendanceData: CourseAttendance[] = [
  {
    id: '1',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    totalClasses: 24,
    attended: 20,
    absent: 2,
    late: 2,
    attendancePercentage: 83.3,
    records: [
      {
        id: '1',
        course: 'Web Development Bootcamp',
        instructor: 'John Doe',
        date: '2024-03-19T10:00:00',
        status: 'present',
        type: 'lecture',
        duration: '2 hours',
        topic: 'Advanced React Patterns',
      },
      {
        id: '2',
        course: 'Web Development Bootcamp',
        instructor: 'John Doe',
        date: '2024-03-18T14:00:00',
        status: 'late',
        type: 'lab',
        duration: '3 hours',
        topic: 'Project Work',
      },
    ],
  },
  {
    id: '2',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    totalClasses: 20,
    attended: 18,
    absent: 1,
    late: 1,
    attendancePercentage: 90,
    records: [
      {
        id: '3',
        course: 'Data Science Fundamentals',
        instructor: 'Jane Smith',
        date: '2024-03-19T09:00:00',
        status: 'present',
        type: 'lecture',
        duration: '2 hours',
        topic: 'Machine Learning Basics',
      },
      {
        id: '4',
        course: 'Data Science Fundamentals',
        instructor: 'Jane Smith',
        date: '2024-03-18T13:00:00',
        status: 'absent',
        type: 'workshop',
        duration: '3 hours',
        topic: 'Data Visualization',
      },
    ],
  },
];

export default function AttendancePage() {
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

  const getStatusBadge = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <Badge variant="default">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge variant="secondary">Late</Badge>;
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 75) return 'text-blue-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track your class attendance and participation
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
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.4%</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">
              Out of 44 classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absences</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Attendance */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Course Attendance</h2>
        {attendanceData.map((course) => (
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
                  <span className={`text-2xl font-bold ${getAttendanceColor(course.attendancePercentage)}`}>
                    {course.attendancePercentage}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Classes Attended</p>
                    <p className="text-2xl font-bold text-green-600">
                      {course.attended}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Absences</p>
                    <p className="text-2xl font-bold text-red-600">
                      {course.absent}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Late Arrivals</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {course.late}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance Progress</span>
                    <span>{course.attendancePercentage}%</span>
                  </div>
                  <Progress value={course.attendancePercentage} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Recent Records</h3>
                  {course.records.map((record) => (
                    <div key={record.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{record.topic}</span>
                          <Badge variant="outline" className="text-xs">
                            {record.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-1" />
                            {formatDateTime(record.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {record.duration}
                          </div>
                        </div>
                      </div>
                      {getStatusBadge(record.status)}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 