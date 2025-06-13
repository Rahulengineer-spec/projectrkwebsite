import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const headersList = headers();
    const body = await request.json();

    // Validate the request
    if (!body.name || !body.properties) {
      return NextResponse.json(
        { error: 'Invalid analytics event' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the event data
    // 2. Transform the data if needed
    // 3. Send it to your analytics service (e.g., Google Analytics, Mixpanel, etc.)
    // 4. Store it in your database if needed

    // For now, we'll just log it
    console.log('Analytics event:', {
      name: body.name,
      properties: body.properties,
      timestamp: new Date().toISOString(),
      ip: headersList.get('x-forwarded-for') || 'unknown',
      userAgent: headersList.get('user-agent'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 