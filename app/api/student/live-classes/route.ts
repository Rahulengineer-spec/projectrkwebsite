import { NextResponse } from "next/server";

export async function GET() {
  // Return mock data instead of querying database
  const mockLiveClasses = [
    {
      id: '1',
      title: 'Advanced React Patterns',
      instructor: 'Sarah Wilson',
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      duration: 120,
      course: 'Web Development',
      status: 'UPCOMING',
      meetingLink: 'https://meet.example.com/class1',
      description: 'Learn advanced React patterns and best practices for building scalable applications',
    },
    {
      id: '2',
      title: 'Database Optimization',
      instructor: 'David Brown',
      startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      duration: 90,
      course: 'Database Management',
      status: 'UPCOMING',
      meetingLink: 'https://meet.example.com/class2',
      description: 'Techniques for optimizing database performance and query efficiency',
    },
    {
      id: '3',
      title: 'Mobile App Development',
      instructor: 'Emily Chen',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      duration: 120,
      course: 'Mobile Development',
      status: 'COMPLETED',
      meetingLink: 'https://meet.example.com/class3',
      description: 'Building cross-platform mobile applications using React Native',
      recordingUrl: 'https://recordings.example.com/class3',
    },
  ];

  return NextResponse.json(mockLiveClasses);
} 