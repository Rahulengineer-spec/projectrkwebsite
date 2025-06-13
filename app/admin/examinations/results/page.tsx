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
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FileText,
  Users,
  Award,
  TrendingUp,
  Search,
  Download,
  Eye,
  Printer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for demonstration
const results = [
  {
    id: "R001",
    studentId: "S001",
    studentName: "John Doe",
    examId: "E001",
    examName: "Web Development Final",
    course: "Web Development",
    batch: "WD-2024",
    totalMarks: 100,
    obtainedMarks: 85,
    percentage: 85,
    grade: "A",
    status: "Passed",
    examDate: "2024-03-15",
    resultDate: "2024-03-20",
  },
  {
    id: "R002",
    studentId: "S002",
    studentName: "Jane Smith",
    examId: "E001",
    examName: "Web Development Final",
    course: "Web Development",
    batch: "WD-2024",
    totalMarks: 100,
    obtainedMarks: 92,
    percentage: 92,
    grade: "A+",
    status: "Passed",
    examDate: "2024-03-15",
    resultDate: "2024-03-20",
  },
  // Add more mock data as needed
];

export default function ExamResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isViewResultOpen, setIsViewResultOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.examName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === "all" || result.course === courseFilter;
    const matchesBatch = batchFilter === "all" || result.batch === batchFilter;
    const matchesStatus = statusFilter === "all" || result.status === statusFilter;

    return matchesSearch && matchesCourse && matchesBatch && matchesStatus;
  });

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setIsViewResultOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exam Results</h1>
          <p className="text-muted-foreground">
            View and manage examination results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Results
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Results</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              Across all exams
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50</div>
            <p className="text-xs text-muted-foreground">
              Participated in exams
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              Average pass rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              Across all exams
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
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by student or exam..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Batch</label>
              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Batches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Batches</SelectItem>
                  <SelectItem value="WD-2024">WD-2024</SelectItem>
                  <SelectItem value="DS-2024">DS-2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Passed">Passed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results List */}
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Result ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Exam</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell>{result.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{result.studentName}</span>
                      <span className="text-sm text-muted-foreground">
                        {result.studentId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{result.examName}</span>
                      <span className="text-sm text-muted-foreground">
                        {result.examDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{result.course}</TableCell>
                  <TableCell>{result.batch}</TableCell>
                  <TableCell>
                    {result.obtainedMarks}/{result.totalMarks}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={result.percentage} className="w-16" />
                      <span>{result.percentage}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        result.grade === "A+"
                          ? "default"
                          : result.grade === "A"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {result.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={result.status === "Passed" ? "default" : "destructive"}
                    >
                      {result.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewResult(result)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Result Dialog */}
      <Dialog open={isViewResultOpen} onOpenChange={setIsViewResultOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Result Details</DialogTitle>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Student Information</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span>{selectedResult.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ID:</span>
                      <span>{selectedResult.studentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Course:</span>
                      <span>{selectedResult.course}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Batch:</span>
                      <span>{selectedResult.batch}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Exam Information</h3>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Exam:</span>
                      <span>{selectedResult.examName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{selectedResult.examDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Result Date:</span>
                      <span>{selectedResult.resultDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Performance</h3>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Marks Obtained:</span>
                    <span>
                      {selectedResult.obtainedMarks}/{selectedResult.totalMarks}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Percentage:</span>
                    <span>{selectedResult.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Grade:</span>
                    <Badge
                      variant={
                        selectedResult.grade === "A+"
                          ? "default"
                          : selectedResult.grade === "A"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {selectedResult.grade}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge
                      variant={selectedResult.status === "Passed" ? "default" : "destructive"}
                    >
                      {selectedResult.status}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsViewResultOpen(false)}>
                  Close
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Result
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 