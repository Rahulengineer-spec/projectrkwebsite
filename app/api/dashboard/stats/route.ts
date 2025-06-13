import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockStats = {
    totalStudents: 150,
    totalInstructors: 12,
    activeCourses: 25,
    totalRevenue: 150000,
    activeBatches: 8,
    upcomingExams: 5,
    pendingAdmissions: 3,
    todayRevenue: 5000,
    monthlyRevenue: 45000,
  };

  return NextResponse.json(mockStats);
} 