import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data instead of querying database
  const mockSettings = {
    instituteName: 'Tech Academy',
    contactEmail: 'contact@techacademy.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Education Street, Tech City, TC 12345',
    timezone: 'UTC-5',
    currency: 'USD',
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    features: {
      onlineClasses: true,
      assignments: true,
      exams: true,
      certificates: true,
    },
  };

  return NextResponse.json(mockSettings);
}

export async function PATCH(request: Request) {
  // Mock successful update
  return NextResponse.json({ success: true });
} 