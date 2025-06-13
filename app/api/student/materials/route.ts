import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      where: {
        course: {
          enrollments: {
            some: {
              studentId: "current-student-id", // Replace with actual student ID from session
            },
          },
        },
      },
      include: {
        course: true,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    const formattedMaterials = materials.map((material) => ({
      id: material.id,
      title: material.title,
      type: material.type,
      course: material.course.name,
      uploadedAt: material.uploadedAt.toLocaleDateString(),
      fileUrl: material.fileUrl,
      fileSize: material.fileSize,
      duration: material.duration,
    }));

    return NextResponse.json(formattedMaterials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    return NextResponse.json(
      { error: "Failed to fetch materials" },
      { status: 500 }
    );
  }
} 