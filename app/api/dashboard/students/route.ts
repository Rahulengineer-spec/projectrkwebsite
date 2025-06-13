import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockStudents = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      course: 'Web Development',
      batch: 'WD-2024-01',
      status: 'ACTIVE',
      joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      course: 'Data Science',
      batch: 'DS-2024-01',
      status: 'ACTIVE',
      joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      course: 'Mobile Development',
      batch: 'MD-2024-01',
      status: 'INACTIVE',
      joinDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return NextResponse.json(mockStudents);
} 