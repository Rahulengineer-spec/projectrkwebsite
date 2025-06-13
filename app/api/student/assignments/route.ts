import { NextResponse } from "next/server";

export async function GET() {
  // Return mock data instead of querying database
  const mockAssignments = [
    {
      id: "1",
      title: "React Components Project",
      description: "Create a responsive dashboard using React components",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      course: "Web Development",
      status: "PENDING",
      submittedAt: null,
      grade: null,
    },
    {
      id: "2",
      title: "Node.js API Development",
      description: "Build a RESTful API using Node.js and Express",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      course: "Backend Development",
      status: "SUBMITTED",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      grade: "A",
    },
    {
      id: "3",
      title: "Database Design",
      description: "Design and implement a database schema for an e-commerce platform",
      dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      course: "Database Management",
      status: "PENDING",
      submittedAt: null,
      grade: null,
    },
  ];

  return NextResponse.json(mockAssignments);
} 