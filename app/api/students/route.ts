import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: List all students
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { class: true },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Create a new student
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const student = await prisma.student.create({
      data: {
        name: data.name,
        email: data.email,
        classId: data.classId,
        enrollmentDate: data.enrollmentDate ? new Date(data.enrollmentDate) : undefined,
        // Add other fields as needed
      },
    });
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update a student
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const student = await prisma.student.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        classId: data.classId,
        enrollmentDate: data.enrollmentDate ? new Date(data.enrollmentDate) : undefined,
        // Add other fields as needed
      },
    });
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a student
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    await prisma.student.delete({ where: { id: data.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 