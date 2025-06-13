import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock calendar data
  const mockCalendarEvents = [
    {
      id: '1',
      title: 'Web Development Class',
      type: 'CLASS',
      start: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      course: 'Web Development',
      instructor: 'Sarah Wilson',
      location: 'Room 101',
      description: 'Advanced React Patterns and State Management',
    },
    {
      id: '2',
      title: 'Assignment Due: React Project',
      type: 'ASSIGNMENT',
      start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      course: 'Web Development',
      description: 'Submit your React components project',
    },
    {
      id: '3',
      title: 'Database Exam',
      type: 'EXAM',
      start: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 50 * 60 * 60 * 1000).toISOString(),
      course: 'Database Management',
      location: 'Exam Hall',
      description: 'Final examination for Database Management course',
    },
    {
      id: '4',
      title: 'Group Project Meeting',
      type: 'MEETING',
      start: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 73 * 60 * 60 * 1000).toISOString(),
      course: 'Web Development',
      location: 'Conference Room',
      description: 'Team meeting to discuss project progress',
    },
  ];

  return NextResponse.json(mockCalendarEvents);
} 