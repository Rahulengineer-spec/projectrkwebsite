import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Mock data for student dashboard
    const dashboardData = {
      stats: {
        totalCourses: 5,
        completedCourses: 2,
        certificates: 3,
        averageGrade: 85,
      },
      enrolledCourses: [
        {
          id: '1',
          name: 'Web Development Bootcamp',
          instructor: 'John Doe',
          progress: 75,
          lastAccessed: new Date().toISOString(),
          nextLesson: 'React Hooks',
          upcomingDeadline: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
        },
        {
          id: '2',
          name: 'React Fundamentals',
          instructor: 'Jane Smith',
          progress: 45,
          lastAccessed: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          nextLesson: 'State Management',
          upcomingDeadline: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
        },
        {
          id: '3',
          name: 'Node.js Backend Development',
          instructor: 'Mike Johnson',
          progress: 30,
          lastAccessed: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          nextLesson: 'Express.js',
          upcomingDeadline: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
        },
      ],
      recentCourses: [
        {
          id: '1',
          name: 'Web Development Bootcamp',
          progress: 75,
          lastAccessed: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'React Fundamentals',
          progress: 45,
          lastAccessed: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: '3',
          name: 'Node.js Backend Development',
          progress: 30,
          lastAccessed: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ],
      upcomingEvents: [
        {
          id: '1',
          title: 'Web Development Project Submission',
          date: new Date(Date.now() + 86400000).toISOString(), // 1 day from now
          type: 'Assignment',
        },
        {
          id: '2',
          title: 'React Fundamentals Quiz',
          date: new Date(Date.now() + 172800000).toISOString(), // 2 days from now
          type: 'Quiz',
        },
        {
          id: '3',
          title: 'Live Coding Session',
          date: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
          type: 'Live Class',
        },
      ],
    };

    console.log('API Response:', JSON.stringify(dashboardData, null, 2));
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 