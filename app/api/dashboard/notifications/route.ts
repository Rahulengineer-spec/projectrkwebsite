import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockNotifications = [
    {
      id: '1',
      title: 'New Course Available',
      message: 'Web Development Bootcamp is now available for enrollment',
      type: 'INFO',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Assignment Due',
      message: 'React Project submission is due in 2 days',
      type: 'WARNING',
      read: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '3',
      title: 'Live Class Reminder',
      message: 'JavaScript Fundamentals class starts in 30 minutes',
      type: 'INFO',
      read: true,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];

  return NextResponse.json(mockNotifications);
}

export async function PATCH(request: Request) {
  const { id } = await request.json();
  
  // Mock successful update
  return NextResponse.json({ success: true });
} 