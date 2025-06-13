import { NextResponse } from "next/server";

export async function GET() {
  // Return mock data instead of querying database
  const mockCourses = [
    {
      id: "1",
      title: "Web Development Bootcamp",
      description: "Comprehensive course covering HTML, CSS, JavaScript, and modern frameworks",
      instructor: "Sarah Wilson",
      progress: 75,
      totalModules: 12,
      completedModules: 9,
      startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "IN_PROGRESS",
    },
    {
      id: "2",
      title: "Backend Development with Node.js",
      description: "Learn server-side programming with Node.js, Express, and MongoDB",
      instructor: "David Brown",
      progress: 45,
      totalModules: 10,
      completedModules: 4.5,
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: "IN_PROGRESS",
    },
    {
      id: "3",
      title: "Database Management",
      description: "Master SQL and NoSQL databases, data modeling, and optimization",
      instructor: "Emily Chen",
      progress: 100,
      totalModules: 8,
      completedModules: 8,
      startDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "COMPLETED",
    },
  ];

  return NextResponse.json(mockCourses);
} 