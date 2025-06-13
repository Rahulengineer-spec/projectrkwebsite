"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AddCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    instructorId: "",
    classId: "",
  });
  const [instructors, setInstructors] = useState([]);
  const [classes, setClasses] = useState([]);

  // Fetch instructors and classes on component mount
  useEffect(() => {
    const fetchData = async () => {
      const instructorsData = await prisma.instructor.findMany();
      const classesData = await prisma.class.findMany();
      setInstructors(instructorsData);
      setClasses(classesData);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = await prisma.course.create({
        data: {
          name: formData.name,
          code: formData.code,
          description: formData.description,
          instructorId: formData.instructorId,
          classId: formData.classId,
        },
      });
      console.log("Course created:", newCourse);
      router.push("/admin/courses");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add New Course</h1>
          <p className="text-sm text-muted-foreground">Create a new course in the system.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="instructorId">Instructor</Label>
              <Select
                name="instructorId"
                value={formData.instructorId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, instructorId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an instructor" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((instructor) => (
                    <SelectItem key={instructor.id} value={instructor.id}>
                      {instructor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="classId">Class</Label>
              <Select
                name="classId"
                value={formData.classId}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, classId: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">Create Course</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 