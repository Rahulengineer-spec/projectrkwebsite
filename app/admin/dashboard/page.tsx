'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  BookOpen, 
  GraduationCap, 
  DollarSign,
  Clock, 
  Calendar,
  AlertCircle,
  UserPlus,
  UserMinus,
  TrendingUp,
  FileText,
  Bell,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Notifications } from "../components/notifications";
import { UpcomingEvents } from "../components/upcoming-events";
import { useEffect, useState } from "react";
import { dashboardService } from "../../../services/dashboard";
import { DashboardStats, Activity } from "@/types/dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    students: 0,
    instructors: 0,
    courses: 0,
    revenue: 0,
    batches: 0,
    exams: 0,
    pendingAdmissions: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, activityData] = await Promise.all([
          dashboardService.getStats(),
          dashboardService.getRecentActivity(),
        ]);
        setStats(statsData);
        setRecentActivity(activityData);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Refresh data every 5 minutes
    const interval = setInterval(fetchDashboardData, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleQuickAction = (path: string) => {
    router.push(path);
  };

  const renderStatCard = (
    title: string,
    value: number,
    icon: React.ReactNode,
    subtitle: string,
    loading: boolean
  ) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <>
            <div className="text-2xl font-bold">
              {typeof value === 'number' ? value.toLocaleString() : value}
    </div>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to the admin dashboard
          </p>
        </div>
        <div className="flex gap-2">
          <Notifications />
          <Button variant="outline" onClick={() => handleQuickAction('/admin/reports')}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button onClick={() => handleQuickAction('/admin/students/new')}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
            </Button>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-2 rounded-md">
          {error}
                </div>
      )}

      {/* Main Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {renderStatCard(
          "Total Students",
          stats.students,
          <Users className="h-4 w-4 text-muted-foreground" />,
          "+12% from last month",
          loading
        )}
        {renderStatCard(
          "Total Instructors",
          stats.instructors,
          <GraduationCap className="h-4 w-4 text-muted-foreground" />,
          "+2 new this month",
          loading
        )}
        {renderStatCard(
          "Active Courses",
          stats.courses,
          <BookOpen className="h-4 w-4 text-muted-foreground" />,
          "Across all departments",
          loading
        )}
        {renderStatCard(
          "Total Revenue",
          stats.revenue,
          <DollarSign className="h-4 w-4 text-muted-foreground" />,
          "+20% from last month",
          loading
        )}
        {renderStatCard(
          "Active Batches",
          stats.batches,
          <Building2 className="h-4 w-4 text-muted-foreground" />,
          "Currently running",
          loading
        )}
        {renderStatCard(
          "Examinations",
          stats.exams,
          <FileText className="h-4 w-4 text-muted-foreground" />,
          "Scheduled this month",
          loading
        )}
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Admissions</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats.pendingAdmissions}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">New: 15</Badge>
                  <Badge variant="secondary">Review: 8</Badge>
                      </div>
                <div className="flex items-center mt-2">
                  <Clock className="h-3 w-3 text-yellow-500 mr-1" />
                  <p className="text-xs text-yellow-500">5 urgent applications</p>
                    </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">${stats.todayRevenue.toLocaleString()}</div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    Today: ${stats.todayRevenue.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    This Month: ${stats.monthlyRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-xs text-green-500">+8.2% from last month</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              // Loading state
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center mb-4">
                  <div className="ml-4 space-y-2 w-full">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))
            ) : recentActivity.length === 0 ? (
              // Empty state
              <div className="text-sm text-muted-foreground text-center py-4">
                No recent activity
              </div>
            ) : (
              // Activity list
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.details}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">{activity.time}</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('/admin/students/new')}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Student
                  </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('/admin/courses/new')}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create New Course
                  </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('/admin/batches/new')}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule New Batch
              </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('/admin/instructors/new')}
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Add New Instructor
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('/admin/fees/payments/new')}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Record Payment
            </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => handleQuickAction('/admin/reports')}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>

          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
} 