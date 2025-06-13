"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, Clock } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded";
  grade?: number;
}

export default function AssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/student/assignments");
        if (response.ok) {
          const data = await response.json();
          setAssignments(data);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Submit Assignment
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              <Badge variant={
                assignment.status === "pending" ? "secondary" :
                assignment.status === "submitted" ? "default" : "default"
              }>
                {assignment.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{assignment.course}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{assignment.dueDate}</p>
                </div>
                {assignment.grade && (
                  <div>
                    <p className="text-sm text-muted-foreground">Grade</p>
                    <p className="font-medium">{assignment.grade}%</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {assignment.status === "pending" && (
                  <Button size="sm">
                    Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 