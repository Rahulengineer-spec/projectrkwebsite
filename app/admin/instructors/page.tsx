"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Plus, Filter } from "lucide-react";

interface Instructor {
  id: string;
  name: string;
  email: string;
  department: string;
  status: "active" | "inactive";
  joiningDate: string;
}

export default function InstructorsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [instructors] = useState<Instructor[]>([
    {
      id: "1",
      name: "Dr. Alice Brown",
      email: "alice@university.edu",
      department: "Mathematics",
      status: "active",
      joiningDate: "2023-08-01",
    },
    {
      id: "2",
      name: "Prof. Bob Green",
      email: "bob@university.edu",
      department: "Physics",
      status: "inactive",
      joiningDate: "2022-09-15",
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Instructors</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all instructor records
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Instructor
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Instructors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instructors.map((instructor) => (
                <TableRow key={instructor.id}>
                  <TableCell className="font-medium">{instructor.name}</TableCell>
                  <TableCell>{instructor.email}</TableCell>
                  <TableCell>{instructor.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={instructor.status === "active" ? "default" : "secondary"}
                    >
                      {instructor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{instructor.joiningDate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Documents</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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