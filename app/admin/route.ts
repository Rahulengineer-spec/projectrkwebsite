import { NextResponse } from 'next/server';

// Base admin route handler
export async function GET() {
  return NextResponse.json({ message: 'Admin API route' });
}

// Route handlers for specific admin sections
export async function POST() {
  return NextResponse.json({ message: 'Admin API route' });
}

// Add route handlers for specific admin routes
export async function PUT() {
  return NextResponse.json({ message: 'Admin API route' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Admin API route' });
}

// Error handling
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 