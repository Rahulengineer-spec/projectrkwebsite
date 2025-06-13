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
  Download,
  FileText,
  BarChart3,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const attendanceReports = [
  {
    id: "REP001",
    studentId: "STU001",
    studentName: "John Doe",
    course: "Web Development",
    batch: "Batch 2024",
    month: "January 2024",
    totalDays: 22,
    present: 20,
    absent: 1,
    late: 1,
    attendancePercentage: 90.9,
  },
  {
    id: "REP002",
    studentId: "STU002",
    studentName: "Jane Smith",
    course: "Data Science",
    batch: "Batch 2024",
    month: "January 2024",
    totalDays: 22,
    present: 18,
    absent: 2,
    late: 2,
    attendancePercentage: 81.8,
  },
  // Add more mock data as needed
];

export default function AttendanceReports() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = attendanceReports.filter((report) => {
    const matchesSearch =
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = !selectedMonth || report.month === selectedMonth;
    const matchesCourse = !selectedCourse || report.course === selectedCourse;
    const matchesBatch = !selectedBatch || report.batch === selectedBatch;

    return matchesSearch && matchesMonth && matchesCourse && matchesBatch;
  });

  const handleExportReport = () => {
    // TODO: Implement export functionality
    console.log("Exporting attendance report");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Reports</h1>
          <p className="text-muted-foreground">
            View and analyze student attendance records
          </p>
        </div>
        <Button onClick={handleExportReport}>
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="January 2024">January 2024</SelectItem>
                  <SelectItem value="February 2024">February 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
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
                  <SelectItem value="Batch 2024">Batch 2024</SelectItem>
                  <SelectItem value="Batch 2023">Batch 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Total Days</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Late</TableHead>
                <TableHead>Attendance %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.studentId}</TableCell>
                  <TableCell className="font-medium">{report.studentName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{report.course}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{report.batch}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.month}</TableCell>
                  <TableCell>{report.totalDays}</TableCell>
                  <TableCell>{report.present}</TableCell>
                  <TableCell>{report.absent}</TableCell>
                  <TableCell>{report.late}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        report.attendancePercentage >= 90
                          ? "default"
                          : report.attendancePercentage >= 75
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {report.attendancePercentage}%
                    </Badge>
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