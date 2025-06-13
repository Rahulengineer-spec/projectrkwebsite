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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  BookOpen,
  Hash,
  Tag,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

// Mock data for demonstration
const questions = [
  {
    id: "Q001",
    question: "What is React? Explain its key features.",
    type: "Long Answer",
    course: "Web Development",
    topic: "React Basics",
    difficulty: "Medium",
    marks: 10,
    status: "Active",
  },
  {
    id: "Q002",
    question: "Explain the concept of closures in JavaScript.",
    type: "Short Answer",
    course: "Web Development",
    topic: "JavaScript",
    difficulty: "Hard",
    marks: 5,
    status: "Active",
  },
  // Add more mock data as needed
];

export default function QuestionBank() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [isAddQuestionOpen, setIsAddQuestionOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === "all" || question.course === courseFilter;
    const matchesType = typeFilter === "all" || question.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "all" || question.difficulty === difficultyFilter;

    return matchesSearch && matchesCourse && matchesType && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Question Bank</h1>
          <p className="text-muted-foreground">
            Manage examination questions and answers
          </p>
        </div>
        <Dialog open={isAddQuestionOpen} onOpenChange={setIsAddQuestionOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Tabs defaultValue="long-answer" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="long-answer">Long Answer</TabsTrigger>
                  <TabsTrigger value="short-answer">Short Answer</TabsTrigger>
                  <TabsTrigger value="mcq">MCQ</TabsTrigger>
                </TabsList>
                <TabsContent value="long-answer" className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question</label>
                    <Textarea placeholder="Enter your question" />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
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
                      <label className="text-sm font-medium">Topic</label>
                      <Input placeholder="Enter topic" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Difficulty</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marks</label>
                      <Input type="number" placeholder="Enter marks" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Model Answer</label>
                    <Textarea placeholder="Enter model answer" />
                  </div>
                </TabsContent>
                <TabsContent value="short-answer" className="space-y-4">
                  {/* Similar structure for short answer questions */}
                </TabsContent>
                <TabsContent value="mcq" className="space-y-4">
                  {/* Similar structure for MCQ questions */}
                </TabsContent>
              </Tabs>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddQuestionOpen(false)}>
                  Cancel
                </Button>
                <Button>Save Question</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Questions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200</div>
            <p className="text-xs text-muted-foreground">
              80% of total questions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Topics Covered</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Question Types</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Long, Short, MCQ
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
                  placeholder="Search questions..."
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
              <label className="text-sm font-medium">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Long Answer">Long Answer</SelectItem>
                  <SelectItem value="Short Answer">Short Answer</SelectItem>
                  <SelectItem value="MCQ">MCQ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Difficulties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Difficulties</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question ID</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Topic</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.id}</TableCell>
                  <TableCell className="max-w-md truncate">
                    {question.question}
                  </TableCell>
                  <TableCell>{question.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{question.course}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{question.topic}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        question.difficulty === "Easy"
                          ? "default"
                          : question.difficulty === "Medium"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {question.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell>{question.marks}</TableCell>
                  <TableCell>
                    <Badge
                      variant={question.status === "Active" ? "default" : "secondary"}
                    >
                      {question.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
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