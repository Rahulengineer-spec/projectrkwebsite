'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  MoreHorizontal,
  FileText,
  Upload,
  Download,
  File,
  Folder,
  Link,
  Trash,
  Edit,
  Eye,
} from "lucide-react";

// Mock data for demonstration
const materials = [
  {
    id: "MAT001",
    title: "Introduction to Web Development",
    type: "PDF",
    course: "Web Development",
    size: "2.5 MB",
    uploadDate: "2024-03-15",
    status: "Published",
    downloads: 45,
  },
  {
    id: "MAT002",
    title: "HTML & CSS Basics",
    type: "Video",
    course: "Web Development",
    size: "150 MB",
    uploadDate: "2024-03-16",
    status: "Published",
    downloads: 38,
  },
  // Add more mock data as needed
];

export default function CourseMaterials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "all" || material.type === typeFilter;
    const matchesCourse =
      courseFilter === "all" || material.course === courseFilter;
    const matchesStatus =
      statusFilter === "all" || material.status === statusFilter;

    return matchesSearch && matchesType && matchesCourse && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Materials</h1>
          <p className="text-muted-foreground">
            Manage and organize course materials
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Material
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Upload Course Material</DialogTitle>
              <DialogDescription>
                Add new material to the course library
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Material Title</label>
                  <Input placeholder="Enter material title" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Course</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="data-science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Material Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF Document</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Link">External Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">File</label>
                  <div className="flex items-center gap-2">
                    <Input type="file" />
                    <Button variant="outline" size="sm">
                      Browse
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsUploadDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button>Upload Material</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Link">Link</SelectItem>
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Materials List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow key={material.id}>
                  <TableCell>{material.id}</TableCell>
                  <TableCell className="font-medium">{material.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {material.type === "PDF" ? (
                        <FileText className="mr-2 h-4 w-4" />
                      ) : material.type === "Video" ? (
                        <File className="mr-2 h-4 w-4" />
                      ) : (
                        <Link className="mr-2 h-4 w-4" />
                      )}
                      {material.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{material.course}</TableCell>
                  <TableCell>{material.size}</TableCell>
                  <TableCell>{material.uploadDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        material.status === "Published"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {material.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{material.downloads}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 