import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock help data
  const mockHelpData = {
    faqs: [
      {
        id: '1',
        question: 'How do I submit an assignment?',
        answer: 'You can submit assignments through the course page. Click on the assignment and use the upload button to submit your work.',
        category: 'Assignments',
      },
      {
        id: '2',
        question: 'How do I join a live class?',
        answer: 'Live classes can be joined through the calendar or live classes page. Click the join button 5 minutes before the scheduled time.',
        category: 'Live Classes',
      },
      {
        id: '3',
        question: 'How do I download my certificate?',
        answer: 'Certificates can be downloaded from the certificates page once you complete a course with a passing grade.',
        category: 'Certificates',
      },
    ],
    supportTickets: [
      {
        id: '1',
        title: 'Technical Issue with Video Player',
        status: 'OPEN',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Technical',
      },
      {
        id: '2',
        title: 'Course Access Problem',
        status: 'RESOLVED',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        category: 'Access',
      },
    ],
    contactInfo: {
      email: 'support@example.com',
      phone: '+1 (555) 987-6543',
      hours: 'Monday - Friday, 9 AM - 6 PM EST',
    },
  };

  return NextResponse.json(mockHelpData);
}

export async function POST(request: Request) {
  // Mock successful ticket creation
  return NextResponse.json({ success: true, id: '3' });
} 