"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen, Clock, Bell, Book, GraduationCap, Award, Users } from "lucide-react";

interface Course {
  id: string;
  name: string;
  instructor: string;
  progress: number;
  lastAccessed: string;
  nextLesson: string;
  upcomingDeadline: string;
}

interface DashboardData {
  stats: {
    totalCourses: number;
    completedCourses: number;
    certificates: number;
    averageGrade: number;
  };
  enrolledCourses: Course[];
  recentCourses: {
    id: string;
    name: string;
    progress: number;
    lastAccessed: string;
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    type: string;
  }[];
}

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Fetching dashboard data...');
        
        const response = await fetch('/api/student/dashboard');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const dashboardData = await response.json();
        console.log('Received data:', dashboardData);
        
        // Validate the data structure
        if (!dashboardData || typeof dashboardData !== 'object') {
          throw new Error('Invalid data format received from API');
        }
        
        if (!dashboardData.stats || !dashboardData.enrolledCourses || !dashboardData.recentCourses || !dashboardData.upcomingEvents) {
          throw new Error('Missing required data fields in API response');
        }
        
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Error Loading Dashboard</h2>
          <p className="mt-2 text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">No Data Available</h2>
          <p className="mt-2 text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.completedCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.certificates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.averageGrade}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(data.enrolledCourses) && data.enrolledCourses.map((course) => (
                <div key={course.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{course.name}</h3>
                      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {course.progress}% Complete
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Next Lesson: {course.nextLesson}</p>
                    <p>Upcoming Deadline: {new Date(course.upcomingDeadline).toLocaleDateString()}</p>
                    <p>Last Accessed: {new Date(course.lastAccessed).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(data.upcomingEvents) && data.upcomingEvents.map((event) => (
                <div key={event.id} className="border-b pb-4 last:border-0">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 