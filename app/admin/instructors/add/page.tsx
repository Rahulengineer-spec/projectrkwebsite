"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function AddInstructorPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    joiningDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInstructor = await prisma.instructor.create({
        data: {
          name: formData.name,
          email: formData.email,
          department: formData.department,
          joiningDate: new Date(formData.joiningDate),
        },
      });
      console.log("Instructor created:", newInstructor);
      router.push("/admin/instructors");
    } catch (error) {
      console.error("Error creating instructor:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Add New Instructor</h1>
          <p className="text-sm text-muted-foreground">Create a new instructor in the system.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Instructor Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Instructor Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="joiningDate">Joining Date</Label>
              <Input
                id="joiningDate"
                name="joiningDate"
                type="date"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit">Create Instructor</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 