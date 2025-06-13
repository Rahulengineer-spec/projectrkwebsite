import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Store analytics event in database
    await prisma.analyticsEvent.create({
      data: {
        eventName: body.eventName,
        properties: body.properties,
        timestamp: new Date(body.timestamp),
        userAgent: body.userAgent,
        url: body.url,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to store analytics event:', error);
    return NextResponse.json(
      { error: 'Failed to store analytics event' },
      { status: 500 }
    );
  }
} 