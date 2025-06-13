import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockInstructors = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      specialization: 'Web Development',
      courses: ['React', 'Node.js', 'JavaScript'],
      status: 'ACTIVE',
      joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      name: 'David Brown',
      email: 'david@example.com',
      specialization: 'Data Science',
      courses: ['Python', 'Machine Learning', 'Data Analysis'],
      status: 'ACTIVE',
      joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Emily Chen',
      email: 'emily@example.com',
      specialization: 'Mobile Development',
      courses: ['React Native', 'iOS', 'Android'],
      status: 'INACTIVE',
      joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return NextResponse.json(mockInstructors);
} 