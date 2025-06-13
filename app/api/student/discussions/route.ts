import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock discussions data
  const mockDiscussions = [
    {
      id: '1',
      title: 'React Hooks Best Practices',
      course: 'Web Development',
      author: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://example.com/avatars/john.jpg',
      },
      content: 'What are the best practices for using React Hooks in large applications?',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      replies: [
        {
          id: '1',
          author: {
            id: '2',
            name: 'Sarah Wilson',
            avatar: 'https://example.com/avatars/sarah.jpg',
          },
          content: 'Always use the dependency array correctly and avoid infinite loops.',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      tags: ['react', 'hooks', 'best-practices'],
    },
    {
      id: '2',
      title: 'Database Optimization Tips',
      course: 'Database Management',
      author: {
        id: '3',
        name: 'Mike Johnson',
        avatar: 'https://example.com/avatars/mike.jpg',
      },
      content: 'Looking for tips on optimizing MongoDB queries for better performance.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      replies: [
        {
          id: '2',
          author: {
            id: '4',
            name: 'David Brown',
            avatar: 'https://example.com/avatars/david.jpg',
          },
          content: 'Use proper indexing and avoid large documents.',
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
      tags: ['mongodb', 'optimization', 'performance'],
    },
  ];

  return NextResponse.json(mockDiscussions);
}

export async function POST(request: Request) {
  // Mock successful post creation
  return NextResponse.json({ success: true, id: '3' });
} 