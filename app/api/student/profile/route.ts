import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock profile data
  const mockProfile = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=John',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate about web development and learning new technologies.',
    education: [
      {
        id: '1',
        degree: 'Bachelor of Computer Science',
        institution: 'Tech University',
        year: '2023',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    courses: [
      {
        id: '1',
        name: 'Web Development',
        progress: 75,
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        name: 'Database Management',
        progress: 45,
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    achievements: [
      {
        id: '1',
        title: 'Top Performer',
        description: 'Achieved highest grade in Web Development course',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    totalCourses: 2,
    completedCourses: 1,
    certificates: 3,
    averageGrade: 92,
    joinDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  };

  return NextResponse.json(mockProfile);
}

export async function PATCH(request: Request) {
  try {
    const data = await request.json();
    // Mock successful profile update
    return NextResponse.json({ ...data, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
} 