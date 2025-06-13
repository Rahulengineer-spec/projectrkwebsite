"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Video, BookOpen, Download, Search } from "lucide-react";
import useSWR from "swr";

interface Material {
  id: string;
  title: string;
  type: "document" | "video" | "ebook";
  course: string;
  uploadedAt: string;
  fileUrl: string;
  fileSize?: string;
  duration?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const { data: materials, error, mutate } = useSWR<Material[]>("/api/student/materials", fetcher);

  if (error) return <div>Failed to load materials</div>;
  if (!materials) return <div>Loading...</div>;

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || material.type === typeFilter;
    const matchesCourse = courseFilter === "all" || material.course === courseFilter;
    return matchesSearch && matchesType && matchesCourse;
  });

  const courses = Array.from(new Set(materials.map((m) => m.course)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Study Materials</h1>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Download All
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="document">Documents</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="ebook">E-Books</SelectItem>
          </SelectContent>
        </Select>
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{material.title}</CardTitle>
              <div className="flex items-center gap-2">
                {material.type === "document" && <FileText className="w-4 h-4 text-muted-foreground" />}
                {material.type === "video" && <Video className="w-4 h-4 text-muted-foreground" />}
                {material.type === "ebook" && <BookOpen className="w-4 h-4 text-muted-foreground" />}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Course</p>
                  <p className="font-medium">{material.course}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Uploaded</p>
                  <p className="font-medium">{material.uploadedAt}</p>
                </div>
                {material.fileSize && (
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-medium">{material.fileSize}</p>
                  </div>
                )}
                {material.duration && (
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{material.duration}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 