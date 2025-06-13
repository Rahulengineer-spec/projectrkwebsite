'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="text-muted-foreground">
          Add a new course to the curriculum
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseName">Course Name</Label>
              <Input id="courseName" placeholder="Enter course name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter course description" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (months)</Label>
                <Input id="duration" type="number" placeholder="Enter duration" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee">Course Fee</Label>
                <Input id="fee" type="number" placeholder="Enter course fee" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructor">Select Instructor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites</Label>
              <Textarea id="prerequisites" placeholder="Enter course prerequisites" />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Create Course</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 