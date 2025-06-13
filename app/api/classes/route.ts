import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: List all classes
export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        students: true,
        courses: true,
      },
    });
    return NextResponse.json(classes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch classes' }, { status: 500 });
  }
}

// POST: Create a new class
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newClass = await prisma.class.create({
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        level: data.level,
      },
    });
    return NextResponse.json(newClass);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}

// PUT: Update a class
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const updatedClass = await prisma.class.update({
      where: { id: data.id },
      data: {
        name: data.name,
        code: data.code,
        description: data.description,
        level: data.level,
      },
    });
    return NextResponse.json(updatedClass);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update class' }, { status: 500 });
  }
}

// DELETE: Delete a class
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await prisma.class.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 });
  }
} 