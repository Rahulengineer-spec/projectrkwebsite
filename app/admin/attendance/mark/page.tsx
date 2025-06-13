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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Building2,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const students = [
  {
    id: "STU001",
    name: "John Doe",
    course: "Web Development",
    batch: "Batch 2024",
    status: "Present",
    checkIn: "09:00 AM",
  },
  {
    id: "STU002",
    name: "Jane Smith",
    course: "Data Science",
    batch: "Batch 2024",
    status: "Absent",
    checkIn: "-",
  },
  // Add more mock data as needed
];

export default function MarkAttendance() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [attendanceRecords, setAttendanceRecords] = useState(students);

  const handleStatusChange = (studentId: string, newStatus: string) => {
    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.id === studentId
          ? {
              ...record,
              status: newStatus,
              checkIn: newStatus === "Present" ? "09:00 AM" : "-",
            }
          : record
      )
    );
  };

  const handleSaveAttendance = () => {
    // TODO: Implement save functionality
    console.log("Saving attendance records:", attendanceRecords);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mark Attendance</h1>
          <p className="text-muted-foreground">
            Record student attendance for today
          </p>
        </div>
        <Button onClick={handleSaveAttendance}>
          <Save className="mr-2 h-4 w-4" />
          Save Attendance
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Select Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
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
              <label className="text-sm font-medium">Batch</label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batch-2024">Batch 2024</SelectItem>
                  <SelectItem value="batch-2023">Batch 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>Student List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceRecords.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{student.course}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{student.batch}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        student.status === "Present"
                          ? "default"
                          : student.status === "Late"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.checkIn}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={student.status === "Present" ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(student.id, "Present")}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={student.status === "Late" ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(student.id, "Late")}
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={student.status === "Absent" ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => handleStatusChange(student.id, "Absent")}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
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