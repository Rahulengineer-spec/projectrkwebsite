import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock certificates data
  const mockCertificates = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      course: 'Web Development',
      grade: 'A',
      certificateUrl: 'https://example.com/certificates/web-dev-fundamentals.pdf',
      status: 'ISSUED',
      instructor: 'Sarah Wilson',
    },
    {
      id: '2',
      title: 'Database Management',
      issueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      course: 'Database Management',
      grade: 'A+',
      certificateUrl: 'https://example.com/certificates/database-management.pdf',
      status: 'ISSUED',
      instructor: 'David Brown',
    },
    {
      id: '3',
      title: 'Backend Development',
      issueDate: null,
      course: 'Backend Development',
      grade: null,
      certificateUrl: null,
      status: 'IN_PROGRESS',
      instructor: 'Emily Chen',
    },
  ];

  return NextResponse.json(mockCertificates);
} 