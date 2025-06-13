import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockActivity = [
    {
      id: '1',
      type: 'COURSE_ACCESS',
      description: 'Accessed Web Development Course',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'ASSIGNMENT_SUBMITTED',
      description: 'Submitted React Assignment',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '3',
      type: 'QUIZ_COMPLETED',
      description: 'Completed JavaScript Quiz',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  return NextResponse.json(mockActivity);
} 