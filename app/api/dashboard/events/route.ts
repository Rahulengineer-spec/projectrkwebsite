import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockEvents = [
    {
      id: '1',
      type: 'EXAM',
      title: 'JavaScript Final Exam',
      date: new Date(Date.now() + 86400000).toISOString(),
      course: 'Web Development',
      location: 'Room 101',
    },
    {
      id: '2',
      type: 'MEETING',
      title: 'Student Progress Review',
      date: new Date(Date.now() + 172800000).toISOString(),
      course: 'All Courses',
      location: 'Conference Room',
    },
    {
      id: '3',
      type: 'BATCH_EVENT',
      title: 'New Batch Orientation',
      date: new Date(Date.now() + 259200000).toISOString(),
      course: 'Web Development',
      location: 'Main Hall',
    },
  ];

  return NextResponse.json(mockEvents);
} 